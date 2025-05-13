const promesa1 = Promise.resolve(5)
const promesa2 = Promise((resolve)=>setTimeout(resolve,2000,10))
const promesa3 = Promise.resolve(15)

Promise.all([promesa1, promesa2, promesa3])
    .then((resultados) => { 
        console.log(resultados);
    })