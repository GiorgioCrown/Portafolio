const Contact = () => (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6">Contacto</h2>
      <form className="max-w-xl grid gap-3">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Nombre</label>
          <input className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Email</label>
          <input type="email" className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Mensaje</label>
          <textarea rows="4" className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
        <button className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2 font-medium text-white transition">
          Enviar
        </button>
      </form>
    </section>
  );
  
  export default Contact;
  