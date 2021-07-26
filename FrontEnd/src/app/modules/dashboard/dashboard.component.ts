import { AfterViewInit, Component } from '@angular/core';
import * as Chartist from 'chartist';
import { Colum } from '../../data/schema/colum';
import { CardChart } from '../../data/schema/dashboard/card-chart.model';
import { CardList, CardListContent, CardListContentLine, CardListTab } from '../../data/schema/dashboard/card-list.model';
import { CardStats } from '../../data/schema/dashboard/card-stats.model';
import { CardTable } from '../../data/schema/dashboard/card-table.model';
import { UserInfo } from '../../data/schema/user';
import { DashboardService } from '../../data/service/dashboard.service';
import { UserService } from '../../data/service/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

    charts: CardChart[] = [];
    stats: CardStats[] = [];
    tables: CardTable[] = [];
    lists: CardList[] = [];

    constructor(private userService: UserService, private dashbaordService: DashboardService) {
        this.charts.push(new CardChart("dailySalesChart", "dashboard.chart1.title", "dashboard.chart1.description", "dashboard.chart1.footer", "access_time", "card-header-success", "55%", "fa-long-arrow-up"));
        this.charts.push(new CardChart("websiteViewsChart", "dashboard.chart2.title", "dashboard.chart2.description", "dashboard.chart2.footer", "access_time", "card-header-warning"));
        this.charts.push(new CardChart("completedTasksChart", "dashboard.chart3.title", "dashboard.chart3.description", "dashboard.chart3.footer", "access_time", "card-header-danger"));

        this.stats.push(new CardStats("dashboard.stats1.title", "dashboard.stats1.category", "dashboard.stats1.footer", "warning", "content_copy", "card-header-warning"));
        this.stats.push(new CardStats("dashboard.stats2.title", "dashboard.stats2.category", "dashboard.stats2.footer", "date_range", "store", "card-header-success"));
        this.stats.push(new CardStats("dashboard.stats3.title", "dashboard.stats3.category", "dashboard.stats3.footer", "local_offer", "info_outline", "card-header-danger"));
        this.stats.push(new CardStats("dashboard.stats4.title", "dashboard.stats4.category", "dashboard.stats4.footer", "update", null, "card-header-info", "fa-users"));

        userService.getUsers().subscribe((data: UserInfo[]) => {
            var displayColumns: Colum[] = [new Colum("ID"), new Colum("Name"), new Colum("Country"), new Colum("City"), new Colum("Salary"), new Colum("Date")];
            this.tables.push(new CardTable("dashboard.table1.title", "dashboard.table1.category", displayColumns, data, "card-header-warning", "text-warning"));
        });

        var tabs: CardListTab[] = [];
        tabs.push(new CardListTab("dashboard.list1.tab1.header", "people", "#users"));
        tabs.push(new CardListTab("dashboard.list1.tab2.header", "task", "#jobs"));
        tabs.push(new CardListTab("dashboard.list1.tab3.header", "cloud", "#settings"));

        var content: CardListContent[] = [];
        dashbaordService.getUsers().subscribe((data: CardListContentLine[]) => {
            content.push(new CardListContent("users", data));
        });
        dashbaordService.getTasks().subscribe((data: CardListContentLine[]) => {
            content.push(new CardListContent("jobs", data));
        });
        dashbaordService.getServer().subscribe((data: CardListContentLine[]) => {
            content.push(new CardListContent("settings", data));
        });

        this.lists.push(new CardList("dashboard.list1.header", "card-header-primary", tabs, content));
    }

    startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    };

    startAnimationForBarChart(chart) {
        let seq2: any, delays2: any, durations2: any;

        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    };

    ngAfterViewInit() {
        /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

        var dailySalesData = [12, 17, 7, 17, 23, 18, 38];

        const dataDailySalesChart: any = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                dailySalesData
            ]
        };

        const optionsDailySalesChart: any = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50,
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        this.startAnimationForLineChart(dailySalesChart);

        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

        var completedTasks = [230, 750, 450, 300, 280, 240, 200, 190];

        const dataCompletedTasksChart: any = {
            labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
            series: [
                completedTasks
            ]
        };

        const optionsCompletedTasksChart: any = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 1000,
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
        }

        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

        // start animation for the Completed Tasks Chart - Line Chart
        this.startAnimationForLineChart(completedTasksChart);

        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

        var emailSubscriptionsData = [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895];

        var datawebsiteViewsChart = {
            labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
            series: [
                emailSubscriptionsData
            ]
        };

        var optionswebsiteViewsChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
        };

        var responsiveOptions: any[] = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];

        var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

        //start animation for the Emails Subscription Chart
        this.startAnimationForBarChart(websiteViewsChart);
    }
}
