import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, delay, finalize } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { FormType } from '../../../../shared/enums/form-types.enum';
import { LoginUser } from '../../../../data/schema/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
    isLoading: boolean;
    loginForm: FormGroup;
    formTypes = FormType;

    private sub = new Subscription();

    constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
        this.buildForm();
    }

    public login(): void {
        this.isLoading = true;

        var user = new LoginUser();
        Object.keys(this.loginForm.controls).forEach(key => {
            user[key] = this.loginForm.controls[key].value;
        });

        this.sub = this.authService.login(user)
            .pipe(
                delay(1500),
                tap(user => {
                    if (user != null) {
                        this.router.navigate(['/dashboard'])
                    }
                }),
                finalize(() => this.isLoading = false))
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