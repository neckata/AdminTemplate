import { Role } from "../../shared/enums/role.enums";

export class User {
    userName: string;
    token: string;
    id: number;
    role: Role;
}

export interface LoginContextInterface {
    userName: string;
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

export class UserFullInfo {
    id: number;
    role: Role;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    adress: string;
    city: string;
    country: string;
    code: string;
    info: string;
}