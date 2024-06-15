// Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"

function reverseString(str) {
  return str.split('').reverse().join('');
}

let text = "NEGIE1";
let lastChar = text.substring(text.length -1);
let extractedString = text.substring(0, text.length - 1);
let endResult = reverseString(extractedString) + lastChar;

console.log(endResult);
