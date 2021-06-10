import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from '../../../../data/schema/user';
import { UserService } from '../../../../data/service/user.service';
import { FormType } from '../../../../shared/enums/form-types.enum';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerForm: FormGroup;
    formTypes = FormType;

    constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
        this.buildForm();
    }

    public register(): void {
        var registerUser = new RegisterUser();

        Object.keys(this.registerForm.controls).forEach(key => {
            registerUser[key] = this.registerForm.controls[key].value;
        });

        this.userService.register(registerUser).subscribe(user => {
            if (user != null) {
                this.router.navigate(["/auth/login"]);
            }
        });
    }

    private buildForm(): void {
        this.registerForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
        });
    }
}
