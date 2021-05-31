import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../schema/user';
import { JsonApiService } from './json-api.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private jsonApiService: JsonApiService) {
    }

    public getUsers(): Observable<UserInfo[]> {
        return this.jsonApiService.get("/users");
    }
}
