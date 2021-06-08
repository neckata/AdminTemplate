import { Injectable } from '@angular/core';
import { of, throwError, Observable} from 'rxjs';
import 'rxjs/add/operator/map';

import { LoginContextInterface, User } from '../../data/schema/user';
import { UserService } from '../../data/service/user.service';
import { CacheService } from './cache.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    currentUser: User;

    constructor(public userService: UserService, private cacheService: CacheService) {
        this.currentUser = this.cacheService.load("user");
    }

    login(loginContext: LoginContextInterface): Observable<any> {
        return this.userService.login(loginContext.userName, loginContext.password)
            .map(user => {
                if (user != null) {
                    this.currentUser = user;
                    return user;
                }

                return throwError('Invalid username or password');
            });
    }

    logout(): Observable<boolean> {
        return of(false);
    }

    isUserIn() {
        return this.currentUser != null;
    }
}