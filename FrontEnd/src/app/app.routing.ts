import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MapsComponent } from './modules/maps/maps.component';
import { TableListComponent } from './modules/table-list/table-list.component';
import { UserProfileComponent } from './modules/user-profile/user-profile.component';
import { TypographyComponent } from './modules/typography/typography.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { NotificationsComponent } from './modules/notifications/notifications.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'user-profile', component: UserProfileComponent },
            { path: 'table-list', component: TableListComponent },
            { path: 'typography', component: TypographyComponent },
            { path: 'maps', component: MapsComponent },
            { path: 'notifications', component: NotificationsComponent }
        ]
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    // Fallback when no prior routes is matched
    { path: '**', redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            relativeLinkResolution: 'legacy'
        })
    ]
})
export class AppRoutingModule {
}
