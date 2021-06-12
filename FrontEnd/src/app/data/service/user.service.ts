import { Injectable, isDevMode } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClientService } from '../../core/services/http-client.service';
import { LoginUser, RegisterUser, LoggedUser, UserFullInfo, UserInfo } from '../schema/user';
import { JsonApiService } from './json-api.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private jsonApiService: JsonApiService, private http: HttpClientService) {
    }

    public getUsers(): Observable<UserInfo[]> {
        return this.jsonApiService.get("/users");
    }

    public getUser(userId: number): Observable<UserFullInfo> {
        return this.jsonApiService.get("/users/id", userId);
    }

    public login(userName: string, password: string): Observable<LoggedUser> {
        if (isDevMode()) {
            var user = new LoginUser();
            user.password = password;
            user.userName = userName;

            return this.http.post<LoggedUser>({ url: 'Login/Authenticate', body: user })
        }
        else {
            return this.jsonApiService.get("/login", userName, password);
        }
    }

    public register(user: RegisterUser): Observable<RegisterUser> {
        if (isDevMode()) {
            return this.http.post<RegisterUser>({ url: 'Login/Register', body: user, snackBarMessage: "SuccessRegister" })
        }
        else {
            var userReg = new RegisterUser();
            return of(userReg);
        }
    }
}
