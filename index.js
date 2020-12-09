const populares = document.getElementById("populares");
const formBusqueda = document.getElementById("formBusqueda");
const inputBusqueda = document.getElementById("inputBusqueda");
const resultados = document.getElementById("resultados");
const body = document.getElementById("tbody")

dibujarPopulares = ({ results = [] }) => {
  results.forEach((peli) => {
    const div = document.createElement("div");
    div.classList.add("col-xl-3", "col-lg-3", "col-md-4", "col-sm-6", "mb-4");
    div.innerHTML = `
        <div class="card shadow">
        <img
              src="https://image.tmdb.org/t/p/w500${peli.poster_path}"
              alt=""
              class="card-img-top"
            />
          <div class="card-body">
            <h5 class="card-title"> ${peli.original_title}</h5>
            <p class="card-text">
              ${peli.overview.substr(0, 50)}....
              <a href="#">Leer más</a>
            </p>
            <small class="text-muted">
                ${peli.release_date}
            </small>
          </div>
        `;
    populares.appendChild(div);
  });
};

const getPeliculasPopulares = () => {
  const urlTMDB =
    "https://api.themoviedb.org/3/movie/popular?api_key=8b0da0d83835a85892f69e5000338de6&language=es-EN&page=1";
  fetch(urlTMDB).then((peticion) => {
    peticion.json().then((data) => {
      dibujarPopulares(data);
    });
  });
};

getPeliculasPopulares();

dibujarResultados = ({ results = [] }) => {
  // tbody.innerHTML =""
  resultados.innerHTML = ""
  const texto = document.createElement("h2")
  texto.innerHTML = "Resultados de Búsqueda"   
  results.forEach((peliEncontrada) => {
    const div1 = document.createElement("div");
    div1.classList.add("col-xl-3", "col-lg-3", "col-md-4", "col-sm-6", "mb-3");
    div1.innerHTML = `
  <div class="card shadow">
            <img
              src="https://image.tmdb.org/t/p/w500${peliEncontrada.poster_path}"
              alt=""
              class="imagenes"
              class="card-img-top"
            />
            <div class="card-body">
              <h5 class="card-title">${peliEncontrada.original_title}</h5>
              <p class="card-text">
                ${peliEncontrada.overview.substr(0, 100)}....
              </p>
              <small class="text-muted">
                  ${peliEncontrada.release_date}
              </small>
            </div>
          </div>
  `;
  resultados.appendChild(div1)
});
resultados.appendChild(texto)
};

formBusqueda.onsubmit = (e) => {
  e.preventDefault();
  let busqueda = inputBusqueda.value;
  let busquedaUrl = encodeURI(busqueda);
  /**
   * endodeURI(STRING_cON_ESPACIOS_Y_SIMBOLOS)
   * CODIFICA UN STRING PARA QUE PUEDA VIAJAR A TRAVÉS DE UNA URL
   * EL VALOR CODIFICADO ES RETORNADO
   */

  console.log(busquedaUrl);
  let url = `https://api.themoviedb.org/3/search/movie?api_key=8b0da0d83835a85892f69e5000338de6&language=es-EN&query="${busquedaUrl}"&page=1&include_adult=false`;

  fetch(url).then((peticion) => {
    peticion.json().then((data) => {
      console.log(data);
      dibujarResultados(data)
    });
  });
  /***
   * TODO:
   * HACER FETCH A LA URL Y DIBUJAR EL RESULTADO DE LAS PELICULAS QUE COINCIDAN CON LA BÚSQUEDA
   */
};
