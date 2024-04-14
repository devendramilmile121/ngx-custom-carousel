export interface PaginatedUser {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

export interface User {
    id: number;
    firstName: string;
    age: number;
    lastName: string;
    email: string;
    image: string;
    company: Company;
}

export interface Company {
    address: Address;
    department: string;
    name: string;
    title: string;
}

export interface Address {
    address: string;
    city: string;
    coordinates: Coordinates;
    postalCode: string;
    state: string;
}

export interface Coordinates {
    lat: number;
    lng: number;
}
