const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

let HastaFechaPersonalizada = new Date();
let DesdeFechaPersonalizada;

DesdeFechaPersonalizada = new Date();
DesdeFechaPersonalizada.setDate(HastaFechaPersonalizada.getDate() - 1);

console.log(` DesdeFechaPersonalizada es: ${DesdeFechaPersonalizada}`);
console.log(` HastaFechaPersonalizadaes: ${HastaFechaPersonalizada}`);

export {};
