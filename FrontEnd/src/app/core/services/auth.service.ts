import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { LoggedUser, LoginUser } from '../../data/schema/user';
import { UserService } from '../../data/service/user.service';
import { CacheService } from './cache.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    currentUser: LoggedUser;

    constructor(public userService: UserService, private cacheService: CacheService) {
        this.currentUser = this.cacheService.load("user");
    }

    login(loginContext: LoginUser): Observable<any> {
        return this.userService.login(loginContext.userName, loginContext.password)
            .map(user => {
                if (user != null && user.token != null) {
                    this.cacheService.save({
                        key: "user",
                        data: user,
                        expirationMins: 60
                    });

                    this.currentUser = user;
                    return user;
                }
            });
    }

    logout(): Observable<boolean> {
        return of(false);
    }

    isUserIn() {
        return this.currentUser != null;
    }
}