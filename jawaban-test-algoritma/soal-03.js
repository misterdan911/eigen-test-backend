//Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT

function countQueryWords(input, query) {
    // Buat array untuk menyimpan hasil
    let output = [];

    // Iterasi melalui setiap kata dalam QUERY
    for (let q of query) {
        // Hitung berapa kali kata q muncul dalam INPUT
        let count = input.filter(word => word === q).length;
        // Masukkan hasil ke array output
        output.push(count);
    }

    // Kembalikan array output
    return output;
}

// Contoh penggunaan
let input = ['xc', 'dz', 'bbb', 'dz'];
let query = ['bbb', 'ac', 'dz'];
let result = countQueryWords(input, query);

console.log(result);  // Output: [1, 0, 2]
