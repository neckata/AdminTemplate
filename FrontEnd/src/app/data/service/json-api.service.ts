import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CacheService } from '../../core/services/cache.service';
import { Role } from '../../shared/enums/role.enums';
import { LoggedUser, User } from '../schema/user';
import data from '../service/json/data.json';

@Injectable({
    providedIn: 'root'
})
export class JsonApiService {
    constructor(private cacheService: CacheService) {
    }

    get(url: string, ...params: any): Observable<any> {
        switch (url) {
            case '/users':
                return of(data.users);
            case '/users/id':
                return of(data.usersFullInfo.find(u => u.id == 1));
            case '/login':
                {
                    var defaultUser = {
                        username: 'admin',
                        password: 'admin',
                        token: '12345',
                        id: 1,
                        role: Role.Admin
                    };

                    var user = new LoggedUser();

                    if (params[0] == defaultUser.username && params[1] == defaultUser.password) {
                        user.token = defaultUser.token;
                        user.user = new User();
                        user.user.id = defaultUser.id;
                        user.user.userName = defaultUser.username;
                        user.user.roles = [];
                        user.user.roles.push(defaultUser.role);

                        this.cacheService.save({
                            key: "user",
                            data: user,
                            expirationMins: 60
                        });
                    }

                    return of(user);

                }
            case '/dashboard/bugs':
                return of(data.dashboard.list.bugs);
            case '/dashboard/website':
                return of(data.dashboard.list.website);
            case '/dashboard/server':
                return of(data.dashboard.list.server);
            default:
                const id = url.substring(url.lastIndexOf('/') + 1);
                return of(data.users[id]);
        }
    }
}