//  Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN

function diagonalDifference(matrix) {
    let primaryDiagonalSum = 0;
    let secondaryDiagonalSum = 0;
    
    // Iterasi melalui baris-baris dalam matriks
    for (let i = 0; i < matrix.length; i++) {
        primaryDiagonalSum += matrix[i][i]; // Elemen diagonal utama
        secondaryDiagonalSum += matrix[i][matrix.length - 1 - i]; // Elemen diagonal sekunder
    }
    
    // Hitung perbedaan antara jumlah diagonal utama dan diagonal sekunder
    let difference = primaryDiagonalSum - secondaryDiagonalSum;
    
    return difference;
}

// Contoh penggunaan
let matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
];
let result = diagonalDifference(matrix);

console.log(result);  // Output: 3
