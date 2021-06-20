import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Email, EmailResponse } from '../../data/schema/email';

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    constructor(
        private http: HttpClient,
        private _snackBar: MatSnackBar,
        private _translateService: TranslateService
    ) { }

    sendEmail(email: Email): Observable<boolean> {
        //TODO file upload
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post('https://formspree.io/f/xrgrkdlr',
            { name: email.name, replyto: email.email, message: email.message },
            { 'headers': headers })
            .pipe(
                switchMap((response: EmailResponse) => {
                    if (response != null && response.ok == true) {
                        this.openSnackBar(false);
                        return of(true)
                    }
                    this.openSnackBar(true);
                    return of(false);
                }),
                catchError(() => {
                    this.openSnackBar(true);
                    return of(false);
                }))
    }


    private openSnackBar(isError: boolean) {
        var translatedMessage = isError ? this._translateService.instant("email.error") : this._translateService.instant("email.success");
        var transaltedAction = "OK";

        this._snackBar.open(translatedMessage, transaltedAction, {
            duration: isError ? 10000 : 5000,
            panelClass: isError ? ['alert-danger'] : ['alert-success']
        });
    }
}