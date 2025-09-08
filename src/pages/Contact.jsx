import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Honeypot simple anti-spam
    if (formRef.current?.bot_field?.value) return;

    setLoading(true);
    setStatus(null);
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      setStatus({ ok: true, msg: "Mensaje enviado. ¡Gracias!" });
      formRef.current.reset();
    } catch (err) {
      setStatus({
        ok: false,
        msg: "❌ Hubo un problema al enviar. Intenta de nuevo.",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6">Contacto</h2>

      <form ref={formRef} onSubmit={handleSubmit} className="max-w-xl grid gap-3">
        {/* honeypot */}
        <input type="text" name="bot_field" className="hidden" tabIndex={-1} autoComplete="off" />

        <div>
          <label className="block text-sm text-slate-400 mb-1" htmlFor="name">Nombre</label>
          <input
            id="name"
            name="from_name"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="reply_to"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1" htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            rows="4"
            name="message"
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2 font-medium text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {status && (
          <p
            className={`mt-2 text-sm ${status.ok ? "text-green-400" : "text-red-400"}`}
            aria-live="polite"
          >
            {status.msg}
          </p>
        )}
      </form>
    </section>
  );
};

export default Contact;
