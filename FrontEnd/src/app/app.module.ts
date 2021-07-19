import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './layout/auth/auth.module';
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
import { EmailComponent } from './modules/email/email.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LandingPageComponent } from './layout/landing-page/landing-page.component'
import { LandingPageModule } from './layout/landing/landing-page.module';

@NgModule({
    imports: [
        // angular
        BrowserModule,

        // 3rd party
        GoogleMapsModule,

        // core & shared
        CoreModule,
        SharedModule,

        // app
        AppRoutingModule,
        AuthModule,
        LandingPageModule,

        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        AuthLayoutComponent,
        AdminLayoutComponent,
        LandingPageComponent,
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
        EmailComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
