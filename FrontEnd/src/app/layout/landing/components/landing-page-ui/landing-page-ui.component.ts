import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../../models/item.model';

@Component({
    selector: 'landing-page-ui',
    templateUrl: './landing-page-ui.component.html',
    styleUrls: ['./landing-page-ui.component.scss', '../../assets/sass/styles.scss']

})
export class LandingPageUIComponent implements OnInit, OnDestroy {
    public focus: boolean;
    public focus1: boolean;
    public focus2: boolean;

    public email: string;
    public contact: string;

    public next = 0;
    public staggeringApproaches = [];

    public firstParts: Item[] = [];
    public secondParts: Item[] = [];
    public thirdParts: Item[] = [];
    public fourthParts: Item[] = [];

    constructor(config: NgbAccordionConfig) {
        config.closeOthers = true;
        config.type = 'info';
    }

    ngOnInit() {
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('index-page');

        for (let i = 0; i < 3; i++) {
            this.firstParts.push(new Item("item.headline1", "item.description1", "logo.png"));
            this.secondParts.push(new Item("item.headline2", "item.description2", "logo.png"));
            this.thirdParts.push(new Item("item.headline3", "item.description3", "logo.png"));
            this.fourthParts.push(new Item("item.headline4", "item.description4", "logo.png"));
        }
    }

    ngOnDestroy() {
        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }

    scroll(el: string) {
        const element = document.getElementById(el);
        element.scrollIntoView({ behavior: 'smooth' });
    }

    isInView(el): boolean {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)

        );
    }
}

