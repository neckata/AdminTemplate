import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationService } from '../../../shared/service/validation.service';

@Component({
    selector: 'validation-errors',
    templateUrl: './validation-errors.component.html',
    styleUrls: ['./validation-errors.component.css']
})

export class ValidationErrorsComponent {
    @Input() control: AbstractControl;
    @Input() labelName?: string;

    constructor(public validationService: ValidationService) {
    }

    get errorMessage(): string {

        for (const propertyName in this.control.errors) {
            if (
                this.control.errors.hasOwnProperty(propertyName) &&
                this.control.touched
            ) {
                return this.validationService.getValidationErrorMessage(
                    propertyName,
                    this.control.errors[propertyName],
                    this.labelName
                );
            }
        }

        return undefined;
    }
}