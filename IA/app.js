const GEMINI_API_KEY = 'AIzaSyDHXI-o5Seo3QuEanDaH6JgkbBRlc1OqZc';
const COHERE_API_KEY = '2sy7eJfUd45D8bkeVzVCYssQIQgBkP4lTOhCZy4W';
const MISTRAL_API_KEY = 'CgXElZTmC2BtyE9adPIEwtXsgjKHjjbg';

async function llamarGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  
  const body = {
    contents: [{ parts: [{ text: prompt + " Por favor responde en español. Respondeme si el comentario es Negativo o Positivo." }] }]
  };

  

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });




  const data = await res.json();
  const texto= data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta de Gemini.';

  if (texto.toLowerCase().includes("positivo")) {
    alert ("Su mensaje es positivo")  
  }else if (texto.toLowerCase().includes("negativo")) {
    alert ("Su mensaje es negativo")
  }

  return texto;

  
}

async function llamarCohere(prompt) {
  const url = 'https://api.cohere.ai/v1/generate';

  const body = {
    model: 'command-r-plus',
    prompt: prompt + " Por favor responde en español. Respondeme si el comentario es Negativo o Positivo.",
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
  const texto= data?.generations?.[0]?.text?.trim() || 'Sin respuesta de Cohere.';

  if (texto.toLowerCase().includes("positivo")) {
    alert ("Su mensaje es positivo")  
  }else if (texto.toLowerCase().includes("negativo")) {
    alert ("Su mensaje es negativo")
  }

  return texto;

}

async function llamarMistral(prompt) {
  const url = 'https://api.mistral.ai/v1/chat/completions';

  const body = {
    model: 'mistral-small',
    messages: [{ role: 'user', content: prompt + " Por favor responde en español. Respondeme si el comentario es Negativo o Positivo." }],
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
  const texto = data?.choices?.[0]?.message?.content || 'Sin respuesta de Mistral.';

  if (texto.toLowerCase().includes("positivo")) {
    alert ("Su mensaje es positivo")  
  }else if (texto.toLowerCase().includes("negativo")) {
    alert ("Su mensaje es negativo")
  }

  return texto;
}

async function consultarIA() {
  const prompt = document.getElementById('prompt').value.trim();
  const respuesta = document.getElementById('respuesta');

  if (!prompt) {
    respuesta.innerHTML = '<strong>Por favor escribe algo.</strong>';
    return;
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
}
