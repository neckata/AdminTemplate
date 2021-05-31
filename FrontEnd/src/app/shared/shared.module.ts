import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';

import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ColumnsToArrayPipe } from './pipes/columns-to-array.pipe';
import { ValuesPipe } from './pipes/values.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        TranslateModule,
        CommonModule,
        FormsModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        ColumnsToArrayPipe,
        ValuesPipe,
        ControlMessagesComponent,
        SpinnerComponent
    ],
    declarations: [
        ControlMessagesComponent,
        SpinnerComponent,
        ColumnsToArrayPipe,
        ValuesPipe
    ]
})
export class SharedModule {
    constructor(translate: TranslateService) {
        translate.addLangs(["en", "bg"]);
        translate.setDefaultLang('en');

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|bg/) ? browserLang : 'en');
    }
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}