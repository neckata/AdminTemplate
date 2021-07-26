import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardListContentLine } from '../schema/dashboard/card-list.model';
import { JsonApiService } from './json-api.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(private jsonApiService: JsonApiService) {
    }

    public getUsers(): Observable<CardListContentLine[]> {
        return this.jsonApiService.get("/dashboard/users");
    }

    public getTasks(): Observable<CardListContentLine[]> {
        return this.jsonApiService.get("/dashboard/tasks");
    }

    public getServer(): Observable<CardListContentLine[]> {
        return this.jsonApiService.get("/dashboard/server");
    }
}
