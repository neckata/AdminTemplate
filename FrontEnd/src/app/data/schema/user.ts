import { Role } from "../../shared/enums/role.enums";

export class RegisterUser {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
}

export class LoginUser {
    userName: string;
    password: string;
}

export class LoggedUser {
    token: string;
    user: User;
}

export class User {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    roles: Role[];
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