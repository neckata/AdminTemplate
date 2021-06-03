import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../schema/user';
import data from '../service/json/data.json';

@Injectable({
    providedIn: 'root'
})
export class JsonApiService {
    get(url: string, ...params: any): Observable<any> {
        switch (url) {
            case '/users':
                return of(data.users);
            case '/users/id':
                return of(data.usersFullInfo.find(u => u.id == params[0]));
            case '/login':
                {
                    var defaultUser = {
                        username: 'admin',
                        password: 'admin',
                        token: '12345',
                        id: 1,
                        role: 0
                    };

                    if (params[0] == defaultUser.username && params[1] == defaultUser.password) {
                        var user = new User();
                        user.id = defaultUser.id;
                        user.userName = defaultUser.username;
                        user.token = defaultUser.token;
                        user.role = defaultUser.role;

                        return of(user);
                    }

                    return null;
                }
            default:
                const id = url.substring(url.lastIndexOf('/') + 1);
                return of(data.users[id]);
        }
    }
}