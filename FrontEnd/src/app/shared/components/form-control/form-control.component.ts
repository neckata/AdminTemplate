import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup} from '@angular/forms';
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
    @Input() placeholderStartRange: string = "Start Date";
    @Input() placeholderEndRange: string = "End Date";
    @Input() isDisabled: boolean;
    @Input() options: string[];

    control: AbstractControl;
    controlStart?: AbstractControl;
    controlEnd?: AbstractControl;
    formTypes = FormType;

    ngOnInit(): void {
        //We disable DateRange in HTML
        if (this.formType != FormType.DateRange) {
            this.control = this.group.controls[this.name];
            if (this.isDisabled)
                this.group.get(this.name).disable();
        }
        else {
            this.controlStart = this.group.controls[this.startName];
            this.controlEnd = this.group.controls[this.endName];
        }   
    }

    hasErrors(): boolean {
        if (this.formType == FormType.DateRange) {
            return this.group.get(this.startName).status === 'INVALID' || this.group.get(this.endName).status === 'INVALID';
        }
        else {
            return this.group.get(this.name).status === 'INVALID';
        }
    }
}
