import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserFullInfo, UserInfo } from '../schema/user';
import { JsonApiService } from './json-api.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private jsonApiService: JsonApiService) {
    }

    public login(userName: string, password: string): Observable<User> {
        return this.jsonApiService.get("/login", userName, password);
    }

    public getUsers(): Observable<UserInfo[]> {
        return this.jsonApiService.get("/users");
    }

    public getUser(userId: number): Observable<UserFullInfo> {
        return this.jsonApiService.get("/users/id", userId);
    }
}
