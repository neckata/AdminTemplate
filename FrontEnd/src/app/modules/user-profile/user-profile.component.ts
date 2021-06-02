import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormType } from '../../shared/enums/form-types.enum';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    profileForm = new FormGroup({
        complete: new FormControl(''),
        username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        adress: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        country: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
        code: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
        info: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    });

    formTypes = FormType;

    ngOnInit(): void {
        this.profileForm.patchValue({
            firstName: "test"
        });
    }

    onSubmit(): void {
        debugger;
    }
}
