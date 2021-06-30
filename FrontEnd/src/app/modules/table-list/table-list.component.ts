import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { UserInfo } from '../../data/schema/user';
import { UserService } from '../../data/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Colum } from '../../data/schema/colum';

@Component({
    selector: 'app-table-list',
    templateUrl: './table-list.component.html',
    styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements AfterViewInit {
    displayColumns: Colum[] = [new Colum("ID"), new Colum("Name"), new Colum("Country"), new Colum("City"), new Colum("Salary")];

    data: UserInfo[] = [];
    dataSource: MatTableDataSource<UserInfo>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private userService: UserService) {
        this.userService.getUsers().subscribe((data: UserInfo[]) => {
            this.data = data;
            this.dataSource = new MatTableDataSource(data);
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
