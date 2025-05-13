const promesa1 = new Promise((resolve)=>setTimeout(resolve,2000,10))
const promesa2 = new Promise((resolve)=>setTimeout(resolve,5000,15))

Promise.race([promesa1, promesa2])
    .then((resultado)=>{
        console.log(resultado);      
    })
    .catch((Error)=>{
        console.log(Error);    
    })