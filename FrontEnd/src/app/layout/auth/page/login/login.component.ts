import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, delay, finalize, catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { FormType } from '../../../../shared/enums/form-types.enum';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
    error: string;
    isLoading: boolean;
    loginForm: FormGroup;
    formTypes = FormType;

    private sub = new Subscription();

    constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
        this.buildForm();
    }

    public login(): void {
        this.isLoading = true;

        const credentials = this.loginForm.value;

        this.sub = this.authService
            .login(credentials)
            .pipe(
                delay(1500),
                tap(() => this.router.navigate(['/dashboard'])),
                finalize(() => (this.isLoading = false)),
                catchError(error => of((this.error = error)))
            )
            .subscribe();
    }

    private buildForm(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}