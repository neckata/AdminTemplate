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
    @Input() formType: FormType;
    @Input() placeholder: string;
    @Input() isDisabled: boolean;

    control: AbstractControl;
    formTypes = FormType;

    ngOnInit(): void {
        this.control = this.group.controls[this.name];
        if (this.isDisabled)
            this.group.get(this.name).disable();
    }

    hasErrors(): boolean {
        return this.group.get(this.name).status === 'INVALID';
    }

    getErrors(): ValidationErrors {
        return this.group.get(this.name).errors;
    }
}
