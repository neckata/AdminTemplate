import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CardComponent } from './components/card/card.component';
import { LandingPageUIComponent } from './components/landing-page-ui/landing-page-ui.component';
import { NavbarLandingComponent } from './components/navbar/navbar.component';
import { LandingPageRoutingModule } from './landing-page.routing';

@NgModule({
    declarations: [CardComponent, LandingPageUIComponent, NavbarLandingComponent],
    exports: [CardComponent, LandingPageUIComponent, NavbarLandingComponent],
    imports: [LandingPageRoutingModule, SharedModule]
})
export class LandingPageModule { }