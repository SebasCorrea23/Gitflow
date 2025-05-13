const miPromesa = (valor)=>{
     return new Promise((resolve, reject) => {
        if (valor>=0.5) {
        resolve(`Promesa Cumple`)
    }else{
        reject(`Promesa rechazada`)
    }
})
}

miPromesa(0.4)
    .then((mensaje)=>{
        console.log(mensaje);      
    })
    .catch((Error)=>{
        console.log(Error);
    })