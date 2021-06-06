import { Component, Input } from '@angular/core';
import { CardList } from '../../../data/schema/dashboard/card-list.model';

@Component({
    selector: 'card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.css']
})
export class CardListComponent {

    @Input() data: CardList;

    public edit(id: number): void {

    }

    public delete(id: number): void {

    }
}
