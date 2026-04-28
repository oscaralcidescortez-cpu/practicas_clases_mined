// ESTRUCTURAS QUE TOMAN DECISIONES

// if - else (lo utilizamos cuando solo evaluamos UNA condicion)
let edad = 15;
if(edad >= 18){
    console.log("Felicidades, puedes votar");
}else{
    console.log("Aun no puedes votar, intenta en 5 años");
}

// if - else if - else (lo utilizamos cuando tenemos VARIAS condiciones)
// evaluando la nota del estudiantes
let nota = 4;

if(nota >= 9 && nota <= 10) {
	console.log('Excelente');
} else if(nota >= 7 && nota < 9) {
	console.log('Bueno');
} else if(nota >= 5 && nota < 7) {
	console.log('Regular');
} else {
	console.log('Reprobado');
}

// switch (se utiliza cuando tenemos casos certeros a evaluar)
// formas de pago
let forma_pago = "bitcoin";
switch(forma_pago){
    case "efectivo":
        console.log("Tu forma de pago es en efectivo 💵");
        break;

    case "tarjeta":
        console.log("Tu forma de pago es en tarjeta de credito 💳");
        break;

    case "bitcoin":
        console.log("Tu forma de pago es en bitcoin 🪙");
        break;

    default:
        console.log("No existe esa forma de pago ⚠️");
}