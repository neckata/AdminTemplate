import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
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

    formTypes = FormType;

    ngOnInit(): void {
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
