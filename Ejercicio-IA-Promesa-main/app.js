const GEMINI_API_KEY = 'AIzaSyDHXI-o5Seo3QuEanDaH6JgkbBRlc1OqZc';
const COHERE_API_KEY = '2sy7eJfUd45D8bkeVzVCYssQIQgBkP4lTOhCZy4W';
const MISTRAL_API_KEY = 'CgXElZTmC2BtyE9adPIEwtXsgjKHjjbg';

async function llamarGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const body = {
    contents: [{ parts: [{ text: prompt + " Por favor responde en español, quiero que me clasifiques el comentario en que si es positivo o negativo." }] }]
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta de Gimini.';

  if (text.toLowerCase().includes("positivo")) {
  Swal.fire({
    title: '¡Mensaje positivo!',
    text: 'Su mensaje es positivo 😊',
    icon: 'success',
    confirmButtonText: 'Aceptar',
    background: '#e6f9f0',
    color: '#333'
  });
} else if (text.toLowerCase().includes("negativo")) {
  Swal.fire({
    title: 'Mensaje negativo',
    text: 'Su mensaje es negativo 😞',
    icon: 'error',
    confirmButtonText: 'Aceptar',
    background: '#ffe6e6',
    color: '#333'
  });
}

return text;
  
}

async function llamarCohere(prompt) {
  const url = 'https://api.cohere.ai/v1/generate';

  const body = {
    model: 'command-r-plus',
    prompt: prompt + " Por favor responde en español, quiero que me clasifiques el comentario en que si es positivo o negativo",
    max_tokens: 300,
    temperature: 0.7
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${COHERE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta de Cohere.';

  if (text.toLowerCase().includes("positivo")) {
    alert("Su mensaje es positivo");
  } else if (text.toLowerCase().includes("negativo")) {
    alert("Su mensaje es negativo");
  }

  return text;
}

async function llamarMistral(prompt) {
  const url = 'https://api.mistral.ai/v1/chat/completions';

  const body = {
    model: 'mistral-small',
    messages: [{ role: 'user', content: prompt + " Por favor responde en español, quiero que me clasifiques el comentario en que si es positivo o negativo" }],
    temperature: 0.7,
    max_tokens: 300
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${MISTRAL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta de Mistral.';

 if (text.toLowerCase().includes("positivo")) {
  Swal.fire({
    title: '¡Mensaje positivo!',
    text: 'Su mensaje es positivo 😊',
    icon: 'success',
    confirmButtonText: 'Aceptar',
    background: '#e6f9f0',
    color: '#333'
  });
} else if (text.toLowerCase().includes("negativo")) {
  Swal.fire({
    title: 'Mensaje negativo',
    text: 'Su mensaje es negativo 😞',
    icon: 'error',
    confirmButtonText: 'Aceptar',
    background: '#ffe6e6',
    color: '#333'
  });
}

return text;
}

async function consultarIA() {
  const prompt = document.getElementById('prompt').value.trim();
  const respuesta = document.getElementById('respuesta');

  if (prompt.toLowerCase().includes("enviar mensaje a discord")) {
    await enviarMensajeADiscord(prompt);
    }

  respuesta.innerHTML = 'Consultando a Gemini, Cohere y Mistral...';

  try {
    const [respuestaGemini, respuestaCohere, respuestaMistral] = await Promise.all([
      llamarGemini(prompt),
      llamarCohere(prompt),
      llamarMistral(prompt)
    ]);

    respuesta.innerHTML = `
      <h3>Gemini responde:</h3>
      <p>${respuestaGemini}</p>
      <h3>Cohere responde:</h3>
      <p>${respuestaCohere}</p>
      <h3>Mistral responde:</h3>
      <p>${respuestaMistral}</p>
    `;
  } catch (error) {
    respuesta.innerHTML = `<strong>Error:</strong> ${error.message}`;
    console.error(error);
  }

  async function enviarMensajeADiscord(mensaje) {
    const webhookURL = "https://discord.com/api/webhooks/1377079748144005130/0r_EWvn7WFpBFi5-eNV_oaozEE1e_SWHSP5Qqz2shp_SuUhUstwAt8G305ZD3RuA7IRT"; // ← reemplaza con tu URL real

    const payload = {
        content: `💬 Mensaje desde la app web: ${mensaje}`
    };

    try {
        const res = await fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
        });

        if (res.ok) {
        alert("✅ Mensaje enviado al Discord");
        } else {
        alert("❌ Error al enviar el mensaje a Discord");
        }
    } catch (err) {
        alert("⚠️ Hubo un problema al conectarse con Discord");
        console.error("Error al enviar a Discord:", err);
    }
    }
}