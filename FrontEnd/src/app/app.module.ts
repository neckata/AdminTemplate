import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './modules/auth/auth.module';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UserProfileComponent } from './modules/user-profile/user-profile.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { TableListComponent } from './modules/table-list/table-list.component';
import { TypographyComponent } from './modules/typography/typography.component';
import { MapsComponent } from './modules/maps/maps.component';
import { NotificationsComponent } from './modules/notifications/notifications.component';
import { CardStatsComponent } from './modules/dashboard/card-stats/card-stats.component';
import { CardChartComponent } from './modules/dashboard/card-chart/card-chart.component';
import { CardListComponent } from './modules/dashboard/card-list/card-list.component';
import { CardTableComponent } from './modules/dashboard/card-table/card-table.component';
import { CalendarComponent } from './modules/calendar/calendar.component';

@NgModule({
    imports: [
        // angular
        BrowserModule,

        // 3rd party
        AuthModule,

        // core & shared
        CoreModule,
        SharedModule,

        // app
        AppRoutingModule,

        BrowserAnimationsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyALlmqcnvJgWug07siV2jV0BNFsHqve1dw'
        })
    ],
    declarations: [
        AppComponent,
        AuthLayoutComponent,
        AdminLayoutComponent,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,

        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        MapsComponent,
        NotificationsComponent,
        CardStatsComponent,
        CardChartComponent,
        CardListComponent,
        CardTableComponent,
        CalendarComponent,

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
