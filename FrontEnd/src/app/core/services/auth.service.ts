import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';

import { LoginContextInterface, User } from '../../data/schema/user';

const defaultUser = {
    username: 'admin',
    password: 'admin',
    token: '12345'
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    token: string;
    currentUser: User;

    login(loginContext: LoginContextInterface): Observable<User> {
        const isDefaultUser =
            loginContext.username === defaultUser.username &&
            loginContext.password === defaultUser.password;

        if (isDefaultUser) {
            this.token = defaultUser.token;
            return of(defaultUser);
        }

        return throwError('Invalid username or password');
    }

    logout(): Observable<boolean> {
        return of(false);
    }

    isUserIn() {
        return this.token != null && this.token != "";
    }
}