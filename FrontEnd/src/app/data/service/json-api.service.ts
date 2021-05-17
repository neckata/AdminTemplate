import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import data from '../service/json/data.json';

@Injectable({
    providedIn: 'root'
})
export class JsonApiService {

    get(url: string): Observable<any> {
        switch (url) {
            case '/users':
                return of(data.users);
            default:
                const id = url.substring(url.lastIndexOf('/') + 1);
                return of(data.users[id]);
        }
    }
}