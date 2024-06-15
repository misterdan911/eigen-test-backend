// Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu

function getLongestWord(sentence) {
    // Split the sentence into an array of words
    const words = sentence.split(' ');
    
    // Initialize a variable to keep track of the longest word
    let longestWord = '';
    
    // Iterate through each word in the array
    for (let word of words) {
        // If the current word is longer than the longest word found so far, update the longest word
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }
    
    // Return the longest word
    return longestWord;
}

let sentence = "Saya sangat senang mengerjakan soal algoritma";
let longestWord = getLongestWord(sentence);

console.log(longestWord + ': ' + (longestWord.length) + ' character');  // Output: "jumped"
