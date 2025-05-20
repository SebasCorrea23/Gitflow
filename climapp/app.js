// Coordenadas de Medellín
const lat = 6.25184;
const lon = -75.56359;

// API URLs
const apiOpenMeteo = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
const apiMetNo = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;

// Función para consultar desde open-meteo (principal)
async function fetchFromOpenMeteo() {
  const response = await fetch(apiOpenMeteo);
  const data = await response.json();
  const temperature = data.current_weather.temperature;

  return {
    fuente: 'open-meteo',
    temperatura: temperature
  };
}

// Función para consultar desde met.no (respaldo)
async function fetchFromMetNo() {
  const response = await fetch(apiMetNo, {
    headers: {
      // met.no requiere un User-Agent (esto puede fallar en navegador)
      'User-Agent': 'clase-promesas-ejemplo/1.0'
    }
  });
  const data = await response.json();
  const temperature = data.properties.timeseries[0].data.instant.details.air_temperature;

  return {
    fuente: 'met.no',
    temperatura: temperature
  };
}

// Usamos Promise.race pero ignoramos errores individuales
Promise.race([
  fetchFromOpenMeteo().catch(() => null),  // principal
  fetchFromMetNo().catch(() => null)      // respaldo
])
.then(resultado => {
  if (resultado) {
    document.getElementById('clima').textContent =
      `Temperatura en Medellín: ${resultado.temperatura}°C (fuente: ${resultado.fuente})`;
  } else {
    document.getElementById('clima').textContent =
      'No se pudo obtener el clima desde ninguna fuente.';
  }
})
.catch(error => {
  console.error(error);
  document.getElementById('clima').textContent = 'Error inesperado.';
});


