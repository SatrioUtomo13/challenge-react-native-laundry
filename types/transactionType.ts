// export interface Transaction {
//     id: string;
//     name: string;
//     phoneNumber: string;
//     qty: number;
//     createdAt: string;
//     updatedAt: string;
// }

export interface Customer {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface BillDetail {
    // Sesuaikan dengan struktur data yang benar dari billDetails
    id: string;
    description: string;
    amount: number;
}

export interface Transaction {
    id: string;
    billDate: string;
    createdAt: string;
    updatedAt: string;
    customer: Customer;
    user: User;
    billDetails: BillDetail[];
}
