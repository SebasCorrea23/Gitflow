const miPromesa = new Promise((resolve, reject) => {
        const exito = true;
        if (exito) {
            //el argumento de resolve es un valor de resolucion que puede ser String, Entero, etc...
            //SI se CUMPLE la promesa, no se resuelve el rechazo
            resolve("¡Operación completada con éxito!");//valor de resolucion de la promesa
        } else {
            //SI se RECHAZA no se resuelve la promesa
            //El arugmento de reject es una Infromacion del error
            reject("Hubo un error en la operación.");//Informacion del error
        }
    });

// Usando la promesa

    //Then es  cuando la promesa es resuelta
    miPromesa.then((mensaje) => {
        console.log(mensaje); //El mensaje que haya en Resolve
    })
    //Catch es cuando la promesa tiene un error
    .catch((error) => {
        console.error(error); //El mensaje que haya en reject
    });