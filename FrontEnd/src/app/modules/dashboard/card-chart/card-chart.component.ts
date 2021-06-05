import { Component, Input } from '@angular/core';
import { CardChart } from '../../../data/schema/dashboard/card-chart.model';

@Component({
    selector: 'card-chart',
    templateUrl: './card-chart.component.html',
    styleUrls: ['./card-chart.component.css']
})
export class CardChartComponent {
    @Input() data: CardChart;
}
