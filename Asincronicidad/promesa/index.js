const promesa = new Promise((resolve)=>{
    const bandera= true
    return setTimeout(() => {
        resolve(`Promesa cumplida.`)
    }, 2000);
   
})

promesa
    .then((mensaje)=>{
        console.log(mensaje);
}).catch((error)=>{
    console.log(error);
})