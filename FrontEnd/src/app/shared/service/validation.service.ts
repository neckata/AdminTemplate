import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {
    public static translateService: TranslateService;
    constructor(public translate: TranslateService) {
        ValidationService.translateService = translate;
    }

    public static getValidationErrorMessage(validatorName: string, validatorValue?: any, labelName?: string): string {
        const config = {
            required: this.translateService.instant("errors.required"),
            invalidPassword: this.translateService.instant("errors.invalidPassword"),
            maxlength: this.translateService.instant("errors.maxlength", { requiredLength: validatorValue.requiredLength}),
            minlength: this.translateService.instant("errors.minlength", { requiredLength: validatorValue.requiredLength })
        };

        return config[validatorName];
    }

    public static passwordValidator(control: AbstractControl): any {
        if (!control.value) { return; }

        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        // (?!.*\s)          - Spaces are not allowed
        return (control.value.match(/^(?=.*\d)(?=.*[a-zA-Z!@#$%^&*])(?!.*\s).{6,100}$/)) ? '' : { invalidPassword: true };
    }
}