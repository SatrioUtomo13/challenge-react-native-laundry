import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosInstance = axios.create({
    baseURL: "http://192.168.119.217:8888/api/v1"
}) 

/* === Auth === */
// Login
export const login = async (username: string, password: string) => {

    if (!username || !password) {
        alert('Email dan password harus diisi');
        return
    }

    try {
        const response = await axiosInstance.post('/auth/login', {
            username,
            password
        })

        if (response.status == 201) {
            const token = response.data.data.token
            await AsyncStorage.setItem('token', token)
        } else {
            alert('Login gagal')
        }

        return response.data.data

    } catch (error) {
        console.error('Login error :', error)
        alert('Terjadi Kesalahan')
    }
}

// Register
export const register = async (name: string, email: string, username: string, password: string, role: string) => {

    if (!name || !email || !username || !password || !role) {
        alert('Semua field harus diisi');
        return
    }

    try {
        const response = await axiosInstance.post('/auth/register', {
            name,
            email,
            username,
            password,
            role
        })

        if (response.status == 201) {
            return response.data.data
        } else {
            alert('Register gagal')
        }
    } catch (error) {
        console.error('Registrasi error :', error)
        alert('Terjadi Kesalahan')
    }
}

/* === Product === */
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

/* === Customer === */

// fetch data customer
export const fetchCustomer = async () => {

    const token = await AsyncStorage.getItem('token');

    if (!token) {
        console.error("Token tidak ditemukan");
        return;
    }

    try {
        const response = await axiosInstance.get('/customers/', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.data.data
    } catch (error: any) {
        console.log(error)
    }
};

// create customer
export const createCustomer = async (name:string, phoneNumber:string, address:string) => {
    const token = await AsyncStorage.getItem('token')

    if (!token) {
        console.error("Token tidak ditemukan")
        return []
    }

    try {
        const response = await axiosInstance.post('/customers/', {
            name,
            phoneNumber,
            address
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        return response.data.data
    } catch (error) {
        console.error('Gagal menambahkan customer', error)   
        return []     
    }
}

// delete customer
export const deleteCustomer = async (id:string) => {
    const token = await AsyncStorage.getItem('token');

    if(!token) {
        console.error("Token tidak ditemukan")
        return []
    }

    try {
        const response = await axiosInstance.delete(`/customers/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        return response.data
    } catch (error) {
        console.error('Gagal menghapus customer', error)
    }
}

// update customer
export const updateCustomer = async (id: string, name: string, phoneNumber: string, address: string) => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
        console.error("Token tidak ditemukan")
        return []
    }

    try {
        const response = await axiosInstance.put('/customers/', {
            id,
            name,
            phoneNumber,
            address
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        return response.data
    } catch (error) {
        throw new Error('Gagal memperbaharui customer')
    }
}

/* === Transaction === */

// fetch data transaction
export const fetchTransaction = async () => {
    const token = await AsyncStorage.getItem('token')

    if (!token) {
        console.error("Token tidak ditemukan")
        return []
    }

    try {
        const response = await axiosInstance.get('/bills/', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        return response.data.data
    } catch (error: any) {
        console.log('Gagal mengambil transaksi', error)
        return []
    }
}

// create transaction
export const createTransaction = async (customerId: string, productId: string, qty: number) => {
    const token = await AsyncStorage.getItem('token')

    if (!token) {
        console.error("Token tidak ditemukan")
        return []
    }

    try {
        const response = await axiosInstance.post('/bills/', {
            customerId,
            billDetails: [ 
                {
                    product: {
                        id: productId
                    },
                    qty
                }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        return response.data.data
    } catch (error) {
        console.error('Gagal menambahkan transaksi', error)
        return []
    }
}
