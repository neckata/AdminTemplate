export interface User {
    username: string;
    password: string;
    token: string;
}

export interface LoginContextInterface {
    username: string;
    password: string;
    token: string;
}

export class UserInfo {
    id: number;
    name: string;
    country: string;
    city: string;
    salary: string;
}