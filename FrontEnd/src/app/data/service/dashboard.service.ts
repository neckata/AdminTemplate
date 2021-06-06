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

    public getBugs(): Observable<CardListContentLine[]> {
        return this.jsonApiService.get("/dashboard/bugs");
    }

    public getWebsite(): Observable<CardListContentLine[]> {
        return this.jsonApiService.get("/dashboard/website");
    }

    public getServer(): Observable<CardListContentLine[]> {
        return this.jsonApiService.get("/dashboard/server");
    }
}
