import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CardTable } from '../../../data/schema/dashboard/card-table.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'card-table',
    templateUrl: './card-table.component.html',
    styleUrls: ['./card-table.component.css']
})
export class CardTableComponent implements AfterViewInit {
    @Input() data: CardTable;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
        this.data.dataSource.paginator = this.paginator;
        this.data.dataSource.sort = this.sort;
    }
}
