import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { My_profilePage } from '../pages/my_profile/my_profile';
import { Sign_inPage } from '../pages/sign_in/sign_in';
import { Sign_upPage } from '../pages/sign_up/sign_up';
import { SupportPage } from '../pages/support/support';
import { Terms_conditionsPage } from '../pages/terms_conditions/terms_conditions';
import { Pdf_viewPage } from '../pages/pdf_view/pdf_view';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { APP_CONFIG, BaseAppConfig } from './app.config';
import { ManagelanguagePage } from '../pages/managelanguage/managelanguage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    My_profilePage,
    Sign_inPage,
    Sign_upPage,
    SupportPage,
    Terms_conditionsPage,
	Pdf_viewPage,
    ManagelanguagePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    My_profilePage,
    Sign_inPage,
    Sign_upPage,
    SupportPage,
    Pdf_viewPage,
    Terms_conditionsPage,
    ManagelanguagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	BarcodeScanner,
    { provide: APP_CONFIG, useValue: BaseAppConfig },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
