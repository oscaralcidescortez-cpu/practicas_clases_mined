// Repetir bloques de codigo (bucles)

// ciclo for
// imprimiendo los numeros del 1 al 10
/**
 * primer elemento = indica el inicio
 * segundo elemento = condicion (hasta donde voy a terminar)
 * tercer elemento = incremento/decremento
 */
console.log("-------------------- uso del FOR -----------------------")
for (let i = 0; i <= 10; i++) {
    console.log(i);
}

console.log("-------------------- uso del WHILE -----------------------")
// ciclo while -> cuando no sabemos hasta donde va llegar el bucle
// funciones con parametros
function utilizarWhile(contador){
    // imprimiendo los numeros del 1 al 10
    while(contador <= 10){ //una condicion
        console.log(contador);
        contador++;
    }
}

utilizarWhile(5) //pasando argumentos
console.log("-------------------")
utilizarWhile(1) //pasando argumentos


console.log("-------------------- uso del DO WHILE -----------------------")

// funciones/metodos
function utilizarDoWhile(){
    // ciclo do while -> la primera iteracion siempre pasa (verdadera)
    let k = 11;
    do{
        console.log(k);
        k++;
    }while(k <= 10)
}

utilizarDoWhile()
utilizarDoWhile()