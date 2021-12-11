import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Option } from 'app/data/schema/option';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormType } from '../../enums/form-types.enum';

@Component({
    selector: 'form-control',
    templateUrl: './form-control.component.html',
    styleUrls: ['./form-control.component.scss']
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
    @Input() complexOptions: Option<any>[];

    control: AbstractControl;
    controlStart?: AbstractControl;
    controlEnd?: AbstractControl;
    formTypes = FormType;
    collectionData: Observable<Option<any>[]>;

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

        if (this.formType == FormType.AutoComplete) {
            this.collectionData = this.control.valueChanges
                .pipe(
                    startWith(''),
                    map(parameter => typeof parameter === 'string' ? parameter : parameter.text),
                    map(value => value ? this.filter(value) : this.complexOptions.slice())
                );
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

    private filter(value: string): Option<any>[] {
        const filterValue = value.toLowerCase();

        return this.complexOptions.filter(option => option.text.toLowerCase().includes(filterValue));
    }

    displayFnCollection(option: Option<any>): string {
        return option && option.text ? option.text : '';
    }
}
