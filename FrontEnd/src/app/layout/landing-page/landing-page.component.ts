import { AfterViewInit, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Component, ViewEncapsulation} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavbarLandingComponent } from '../landing/components/navbar/navbar.component';
import AOS from 'aos';
import { Location } from '@angular/common';

@Component({
    selector: 'landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss', '../landing/assets/sass/landing.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LandingPageComponent implements OnInit, AfterViewInit {
    @ViewChild(NavbarLandingComponent) navbar: NavbarLandingComponent;

    constructor(private renderer: Renderer2, private router: Router, private element: ElementRef, public location: Location) {
    }

    ngAfterViewInit(): void {
        const styleSheets = Array.from(document.styleSheets).filter(
            (styleSheet) => !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
        );
        for (let style of styleSheets) {
            if (style instanceof CSSStyleSheet && style.cssRules) {
                var rules = style.cssRules;
                for (let i = 0; i < rules.length; i++) {
                    var rule = rules[i] as CSSStyleRule;
                    if (rule.selectorText == ".landing-page-class-define") {
                        style.disabled = false;
                        break;
                    }
                    if (rule.selectorText == ".admin-layout-class-define") {
                        style.disabled = true;
                        break;
                    }
                }
            }
        }
    }

    ngOnInit() {
        AOS.init();

        var navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(() => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            } else {
                window.document.activeElement.scrollTop = 0;
            }
            this.navbar.sidebarClose();

            this.renderer.listen('window', 'scroll', () => {
                const number = window.scrollY;
                var _location = this.location.path();
                _location = _location.split('/')[2];

                if (number > 150 || window.pageYOffset > 150) {
                    navbar.classList.remove('navbar-transparent');
                } else if (_location !== 'login' && this.location.path() !== '/nucleoicons') {

                    navbar.classList.add('navbar-transparent');
                }
            });
        });
    }
}

