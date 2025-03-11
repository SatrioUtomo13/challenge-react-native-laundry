import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosInstance = axios.create({
    baseURL: "http://192.168.1.2:8888/api/v1"
})

// login 
export const login = async (form: {username: string, password: string}, router: any) => {

    if (!form.username || !form.password) {
        alert('Email dan password harus diisi');
        return
    }

    try {
        const response = await axiosInstance.post('/auth/login', form)

        if (response.status == 201) {
            const token = response.data.data.token
            await AsyncStorage.setItem('token', token)
            router.push('/customer');
        } else {
            alert('Login gagal')
        }
    } catch (error) {
        console.error('Login error :', error)
        alert('Terjadi Kesalahan')
    }
}


// fetch data product
export const fetchProduk = async () => {

    const token = await AsyncStorage.getItem('token')

    if (!token) {
        console.error("Token tidak ditemukan")
        return []
    }

    try {
        const response = await axiosInstance.get('products/', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        return response.data.data; // Kembalikan data produk
    } catch (error: any) {
        console.error(`Gagal mengambil produk`, error)
        return []
    }
}

// create product
export const createProduct = async (name:string, price:string, type:string) => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
        console.error("Token tidak ditemukan")
        return []
    }

    try {
        const response = await axiosInstance.post('/products/', {
            name,
            price: parseFloat(price),
            type
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        return response.data.data

    } catch (error) {
        console.error('Gagal menambahkan produk', error)
        return []
    }
}

// update product
export const updateProduct = async (id:string, name:string, price:number, type:string) => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
        console.error("Token tidak ditemukan")
        return []
    }
    try {
        const response = await axiosInstance.put('/products/', {
            id,
            name,
            price,
            type
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        return response.data
    } catch (error) {
        throw new Error('Gagal memperbaharui produk')
    }
}

// export const updateProduct = async (id: string, name: string, price: number, type: string) => {
//     const token = await AsyncStorage.getItem('token');

//     if (!token) {
//         console.error("Token tidak ditemukan")
//         return []
//     }

//     try {
//         const response = await axiosInstance.put(`/products/${id}`, { // Pastikan ID ada di URL
//             name,
//             price,
//             type
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         });

//         return response.data;
//     } catch (error) {
//         throw new Error('Terjadi kesalahan saat memperbarui produk');
//     }
// };


// delete product
export const deleteProduct = async (id:string) => {
    const token = await AsyncStorage.getItem('token');

    if(!token) {
        console.error("Token tidak ditemukan")
        return []
    }

    try {
        const response = await axiosInstance.delete(`/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        return response.data
    } catch (error) {
        console.error('Gagal menghapus produk', error)
    }
}