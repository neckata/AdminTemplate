import { Component, Input } from '@angular/core';
import { CardStats } from '../../../data/schema/dashboard/card-stats.model';

@Component({
    selector: 'card-stats',
    templateUrl: './card-stats.component.html',
    styleUrls: ['./card-stats.component.css']
})
export class CardStatsComponent {
    @Input() data: CardStats;
}
