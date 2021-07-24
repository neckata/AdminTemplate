import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormType } from '../../enums/form-types.enum';

@Component({
    selector: 'form-control',
    templateUrl: './form-control.component.html',
    styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {
    @Input() group: FormGroup;
    @Input() name: string;
    @Input() startName: string;
    @Input() endName: string;
    @Input() formType: FormType;
    @Input() placeholder: string;
    @Input() placeholderStartRange: string;
    @Input() placeholderEndRange: string;
    @Input() isDisabled: boolean;
    @Input() options: string[];
    control: AbstractControl;
    formTypes = FormType;

    ngOnInit(): void {
        if (this.formType == FormType.DateRange) {
            //TODO
        }
        else {
            this.control = this.group.controls[this.name];
            if (this.isDisabled)
                this.group.get(this.name).disable();
        }
    }

    hasErrors(): boolean {
        if (this.formType == FormType.DateRange) {
            //TODO + html after check
            return false;
        }
        else {
            return this.group.get(this.name).status === 'INVALID';
        }
    }

    getErrors(): ValidationErrors {
        if (this.formType == FormType.DateRange) {
              //TODO + html after check
            return null;
        }
        else {
            return this.group.get(this.name).errors;
        }
    }
}
