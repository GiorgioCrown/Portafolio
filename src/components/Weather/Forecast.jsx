import { useEffect, useState, useMemo } from "react";

// --- utils ---
const formatDate = (timestamp, tz) => {
  // OpenWeather usa segundos; sumamos timezone (segundos) y convertimos a ms
  const local = new Date((timestamp + tz) * 1000);
  return local.toLocaleDateString("es-ES", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

// Agrupa slots (cada 3h) por día local de la ciudad (YYYY-MM-DD)
const groupByDay = (list, tz) => {
  const map = new Map();
  const dayKey = (dt) => new Date((dt + tz) * 1000).toISOString().slice(0, 10);

  const nowSec = Math.floor(Date.now() / 1000);
  const todayKey = dayKey(nowSec);

  for (const it of list) {
    const k = dayKey(it.dt);

    // si es hoy, omite slots pasados respecto a ahora
    if (k === todayKey && it.dt < nowSec) continue;

    if (!map.has(k)) map.set(k, []);
    map.get(k).push(it);
  }
  return map;
};

// Para cada día elegimos el slot más cercano a las 12:00 locales
const pickNoon = (slots, tz) => {
  let best = slots[0];
  let bestDelta = Infinity;
  for (const it of slots) {
    const hourLocal = new Date((it.dt + tz) * 1000).getUTCHours(); // ya sumamos tz
    const delta = Math.abs(hourLocal - 12);
    if (delta < bestDelta) {
      bestDelta = delta;
      best = it;
    }
  }
  return best;
};

// icono/descripcion más común dentro del día
const mostCommonWeather = (slots) => {
  const count = new Map();
  for (const it of slots) {
    const code = it.weather?.[0]?.icon || "01d";
    count.set(code, (count.get(code) || 0) + 1);
  }
  let best = "01d";
  let max = -1;
  for (const [k, v] of count) {
    if (v > max) {
      max = v;
      best = k;
    }
  }
  const any = slots.find((s) => s.weather?.[0]?.icon === best) || slots[0];
  return {
    icon: best,
    desc: any?.weather?.[0]?.description || "",
  };
};

const iconUrl = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

// --- component ---
const Forecast = ({ city, apiKey }) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let abort = false;
    const run = async () => {
      if (!city) return;
      setLoading(true);
      setErr(null);
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          city
        )}&appid=${apiKey}&units=metric&lang=es`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(
            res.status === 404 ? "Pronóstico no encontrado" : `Error ${res.status}`
          );
        }
        const data = await res.json();
        if (!abort) setForecastData(data);
      } catch (e) {
        if (!abort) setErr(e.message);
      } finally {
        if (!abort) setLoading(false);
      }
    };
    run();
    return () => {
      abort = true;
    };
  }, [city, apiKey]);

  const days = useMemo(() => {
    if (!forecastData?.list?.length) return [];
    const tz = forecastData.city.timezone; // segundos
    const byDay = groupByDay(forecastData.list, tz);
    // ordenar por fecha y tomar próximos 5
    const entries = Array.from(byDay.entries()).sort(([a], [b]) =>
      a.localeCompare(b)
    );
    return entries.slice(0, 5).map(([dateKey, slots]) => {
      const rep = pickNoon(slots, tz);
      const avgTemp = Math.round(
        slots.reduce((s, x) => s + x.main.temp, 0) / slots.length
      );
      const avgHumidity = Math.round(
        slots.reduce((s, x) => s + x.main.humidity, 0) / slots.length
      );
      const { icon, desc } = mostCommonWeather(slots);
      return {
        key: dateKey,
        tz,
        rep,
        avgTemp,
        avgHumidity,
        icon,
        desc,
      };
    });
  }, [forecastData]);

  if (loading)
    return (
      <div className="mt-8 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );

  if (err)
    return (
      <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-red-800">{err}</p>
      </div>
    );

  if (!forecastData || days.length === 0) return null;

  return (
    <section className="mt-8">
      <h3 className="text-xl font-semibold text-white drop-shadow mb-4">
        Pronóstico (5 días)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {days.map((d) => (
          <div key={d.key} className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="font-semibold text-gray-900 mb-2">
              {formatDate(d.rep.dt, d.tz)}
            </p>
            <img
              src={iconUrl(d.icon)}
              alt={d.desc}
              className="mx-auto w-16 h-16"
              loading="lazy"
            />
            <p className="text-xl font-bold text-gray-900 mt-1">
              {d.avgTemp}°C
            </p>
            <p className="capitalize text-gray-700">{d.desc}</p>
            <p className="text-sm text-gray-500 mt-1">
              Humedad: {d.avgHumidity}%
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Forecast;
