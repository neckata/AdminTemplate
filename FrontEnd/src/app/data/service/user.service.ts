import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../schema/user';
import { JsonApiService } from './json-api.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private jsonApiService: JsonApiService) {
    }

    public getUsers(): Observable<User> {
        return this.jsonApiService.get("/users");
    }
}
