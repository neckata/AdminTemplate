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
    @Input() controlStart?: AbstractControl;
    @Input() controlEnd?: AbstractControl;

    constructor(public validationService: ValidationService) {
    }

    get errorMessage(): string {
        //We are not showing mutiple errors
        if (this.control != null) {
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
        }
        else {
            for (const propertyName in this.controlStart.errors) {
                if (
                    this.controlStart.errors.hasOwnProperty(propertyName) &&
                    this.controlStart.touched
                ) {
                    return this.validationService.getValidationErrorMessage(
                        propertyName,
                        this.controlStart.errors[propertyName],
                        this.labelName
                    );
                }
            }

            for (const propertyName in this.controlEnd.errors) {
                if (
                    this.controlEnd.errors.hasOwnProperty(propertyName) &&
                    this.controlEnd.touched
                ) {
                    return this.validationService.getValidationErrorMessage(
                        propertyName,
                        this.controlEnd.errors[propertyName],
                        this.labelName
                    );
                }
            }
        }

        return undefined;
    }
}