import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.css', '../auth/scss/material-dashboard.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthLayoutComponent implements AfterViewInit {

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
                        style.disabled = true;
                        break;
                    }
                    if (rule.selectorText == ".admin-layout-class-define") {
                        style.disabled = false;
                        break;
                    }
                }
            }
        }
    }
}