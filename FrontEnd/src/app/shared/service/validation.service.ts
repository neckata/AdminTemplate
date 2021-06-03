import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {
    public  translateService: TranslateService;
    constructor(public translate: TranslateService) {
        this.translateService = translate;
    }

    public  getValidationErrorMessage(validatorName: string, validatorValue?: any, labelName?: string): string {
        const config = {
            required: this.translateService.instant("errors.required", { field: labelName }),
            invalidPassword: this.translateService.instant("errors.invalidPassword"),
            maxlength: this.translateService.instant("errors.maxlength", { requiredLength: validatorValue.requiredLength, field: labelName}),
            minlength: this.translateService.instant("errors.minlength", { requiredLength: validatorValue.requiredLength, field: labelName })
        };

        return config[validatorName];
    }

    public  passwordValidator(control: AbstractControl): any {
        if (!control.value) { return; }

        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        // (?!.*\s)          - Spaces are not allowed
        return (control.value.match(/^(?=.*\d)(?=.*[a-zA-Z!@#$%^&*])(?!.*\s).{6,100}$/)) ? '' : { invalidPassword: true };
    }
}