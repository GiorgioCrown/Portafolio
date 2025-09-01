const Projects = () => (
    <section id="projects" className="py-5 bg-light text-dark">
      <div className="container">
        <h2 className="mb-4">Proyectos</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Proyecto 1</h5>
                <p className="card-text">
                  Breve descripción de lo que hiciste en este proyecto.
                </p>
                <a href="#" className="btn btn-primary btn-sm">
                  Ver más
                </a>
              </div>
            </div>
          </div>
          {/* Puedes añadir más proyectos aquí */}
        </div>
      </div>
    </section>
  );
  
  export default Projects;
  