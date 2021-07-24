import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { UserInfo } from '../../data/schema/user';
import { UserService } from '../../data/service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Colum } from '../../data/schema/colum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormType } from '../../shared/enums/form-types.enum';

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

    filterGroup = new FormGroup({
        country: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        startDate: new FormControl('', [Validators.required]),
        endDate: new FormControl('', [Validators.required])
    });

    countries: string[] = [];
    cities: string[] = []
    date = new Date(2021, 10, 5);

    formTypes = FormType;

    constructor(private userService: UserService) {
        this.userService.getUsers().subscribe((data: UserInfo[]) => {
            this.data = data;
            this.dataSource = new MatTableDataSource(data);
            this.countries = data.map(x => x.country);
            this.cities = data.map(x => x.city);
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

    filterData() {
        //TODO
        this.dataSource = new MatTableDataSource(this.data.filter(x => x.country == this.filterGroup.get("country").value));

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
