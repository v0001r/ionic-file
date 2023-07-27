import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Events, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { My_profilePage } from '../pages/my_profile/my_profile';
import { HomePage } from '../pages/home/home';
import { Terms_conditionsPage } from '../pages/terms_conditions/terms_conditions';
import { SupportPage } from '../pages/support/support';
import { Sign_inPage } from '../pages/sign_in/sign_in';
import { Pdf_viewPage } from '../pages/pdf_view/pdf_view';
import { TranslateService} from '../../node_modules/@ngx-translate/core';
import { AppConfig, APP_CONFIG } from './app.config';
import { Constants } from '../models/constants.models';
import { ManagelanguagePage } from '../pages/managelanguage/managelanguage';
@Component({
  templateUrl: 'app.html' 
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rtlSide: string = "left"
  rootPage: any;
  agent_id: any;
  agent_name: any;
  pages: Array<{title: string, component: any}>;

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private platform: Platform, private statusBar: StatusBar,
  private splashScreen: SplashScreen, public translate: TranslateService, private events: Events) {
    let defaultLang = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE) ? window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE) : 'en';
    this.initializeApp(defaultLang);
        events.subscribe('language:selection', (language) => {
    this.initializeApp(language);
  });

this.agent_name = localStorage.getItem('agent_name');
	  	this.agent_id = localStorage.getItem('agent_id');
		
		
		
}
ngOnInit(){}


initializeApp(lang) {
  this.translate.setDefaultLang(lang);
  this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    this.translate.use(lang);
    this.setDirectionAccordingly(lang);
	if(localStorage.getItem('agent_id')){
  // this.nav.setRoot(HomePage);
  this.rootPage = HomePage;

		}else{
  // this.nav.setRoot(Sign_inPage);
  this.rootPage = Sign_inPage;

		}
  });
}


setDirectionAccordingly(lang: string) {
  this.rtlSide = "left";
  switch (lang) {
    case 'ar': {
      this.platform.setDir('ltr', false);
      this.platform.setDir('rtl', true);
      this.rtlSide = "right";
      break;
    }
    default: {
      this.platform.setDir('rtl', false);
      this.platform.setDir('ltr', true);
      break;
    }
  }
}

setDirection() {
  console.log('plat rtl: ' + this.platform.isRTL);
  if (this.platform.isRTL) {
    this.platform.setDir('rtl', true);
  } else {
    this.platform.setDir('ltr', true);
  }
}

getSideOfCurLang() {
  return this.platform.dir() === 'rtl' ? "right" : "left";
}

getSuitableLanguage(language) {
  language = language.substring(0, 2).toLowerCase();
  console.log('check for: ' + language);
  return this.config.availableLanguages.some(x => x.code == language) ? language : 'en';
}

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
    
 my_profile() {
  this.nav.setRoot(My_profilePage);
  } 
 home() {
  this.nav.setRoot(HomePage);
  } 
 terms_conditions() {
  this.nav.push(Terms_conditionsPage);
  } 
 support() {
  this.nav.push(SupportPage);
  } 
 sign_in() {
  this.nav.setRoot(Sign_inPage);
  } 
  manageLanguage() {
    this.nav.setRoot(ManagelanguagePage);
  }
view_pdf(){
  this.nav.push(Pdf_viewPage);
}
 logout() {
  localStorage.removeItem('agent_id');
  localStorage.removeItem('agent_name');
  this.events.publish('agent:login', ''); 

 this.nav.setRoot(Sign_inPage);
  } 
}
