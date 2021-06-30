import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CacheService } from './cache.service'
import { Observable, of } from 'rxjs'
import { switchMap, catchError } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core'
import { LoggedUser } from '../../data/schema/user'

export enum Verbs {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
}

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': ''
    });

    private domain = "https://localhost:44395/api/";

    constructor(
        private http: HttpClient,
        private _cacheService: CacheService,
        private _snackBar: MatSnackBar,
        private _translateService: TranslateService
    ) { }

    get<T>(options: HttpOptions): Observable<T> {
        return this.httpCall(Verbs.GET, options)
    }

    delete<T>(options: HttpOptions): Observable<T> {
        return this.httpCall(Verbs.DELETE, options)
    }

    post<T>(options: HttpOptions): Observable<T> {
        return this.httpCall(Verbs.POST, options)
    }

    put<T>(options: HttpOptions): Observable<T> {
        return this.httpCall(Verbs.PUT, options)
    }

    private httpCall<T>(verb: Verbs, options: HttpOptions): Observable<T> {

        // Setup default values
        options.body = options.body || null
        options.cacheMins = options.cacheMins || 0

        if (options.cacheMins > 0) {
            // Get data from cache
            const data = this._cacheService.load(options.url)
            // Return data from cache
            if (data !== null) {
                return of<T>(data)
            }
        }

        var cachedUser = this._cacheService.load("user");
        if (cachedUser != null) {
            var currentToken = (cachedUser as LoggedUser).token;
            this.headers = this.headers.set("Authorization", `Bearer ${currentToken}`);
        }
        return this.http.request<T>(verb, this.domain + options.url, {
            body: options.body,
            headers: this.headers
        })
            .pipe(
                switchMap(response => {
                    if (options.cacheMins > 0) {
                        // Data will be cached
                        this._cacheService.save({
                            key: options.url,
                            data: response,
                            expirationMins: options.cacheMins
                        })
                    }

                    if (options.snackBarMessage != null) {
                        this.openSnackBar(options.snackBarMessage, options.snackBarAction);
                    }

                    return of<T>(response)
                }),
                catchError(error => {
                    this.openSnackBar(error.error, null, true);
                    return of(null);
                })
            )
    }

    private openSnackBar(message: string, action?: string, isError?: boolean) {
        var translatedMessage = isError ? message : this._translateService.instant("messages." + message);
        var transaltedAction = action != null ? this._translateService.instant("messages." + action) : "OK";

        this._snackBar.open(translatedMessage, transaltedAction, {
            duration: isError ? 10000 : 5000,
            panelClass: isError ? ['alert-danger'] : ['alert-success']
        });
    }
}

export class HttpOptions {
    url: string;
    body?: any;
    cacheMins?: number;
    snackBarMessage?: string;
    snackBarAction?: string;
}