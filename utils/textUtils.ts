export function getInitials(name: string) {
    return name
        .split(/\s+/) // Memisahkan berdasarkan spasi
        .filter(word => /^[a-zA-Z]/.test(word)) // Hanya menyertakan kata yang dimulai dengan huruf
        .map(word => word[0].toUpperCase()) // Ambil huruf pertama dan jadikan uppercase
        .join(""); // Gabungkan hasilnya
}