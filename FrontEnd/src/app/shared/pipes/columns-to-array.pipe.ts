import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'columnsToArray'
})
export class ColumnsToArrayPipe implements PipeTransform {
    transform(value: any): any {
        return value.map(d => d.field);
    }
}