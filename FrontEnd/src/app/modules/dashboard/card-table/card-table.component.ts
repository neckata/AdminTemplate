import { Component, Input } from '@angular/core';
import { CardTable } from '../../../data/schema/dashboard/card-table.model';

@Component({
    selector: 'card-table',
    templateUrl: './card-table.component.html',
    styleUrls: ['./card-table.component.css']
})
export class CardTableComponent {
    @Input() data: CardTable;
}
