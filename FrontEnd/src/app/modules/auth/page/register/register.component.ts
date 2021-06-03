import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormType } from '../../../../shared/enums/form-types.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {
    registerForm: FormGroup;
    formTypes = FormType;

    constructor(private formBuilder: FormBuilder) {
        this.buildForm();
    }

    public register(): void {

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
