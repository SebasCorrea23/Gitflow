const contador = (i)=>{
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(i)
        }, 1000);
        
})
}

contador(1)
    .then((resultado)=>{
        console.log(`El contador va en:${resultado}`);
        return contador(resultado + 1)
    })
    .then((resultado2)=>{
        console.log(`El contador va en:${resultado2}`);
        return contador(resultado2 + 1)
    })
    .then((resultado3)=>{
        console.log(`El contador va en:${resultado3}`);
        return contador(resultado3 + 1)
    })


