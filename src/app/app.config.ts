import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken<AppConfig>("app.config");

export interface AppConfig {
	appName: string;
	availableLanguages: Array<any>;
	demoMode: boolean;
}

export const BaseAppConfig: AppConfig = {
	appName: "CarKet",
	availableLanguages: [{
        code: 'en',
        name: 'English'
    }, {
        code: 'ar',
        name: 'Arabic'
    }, {
        code: 'fr',
        name: 'French'
    }, {
        code: 'es',
        name: 'Spanish'
    }, {
        code: 'id',
        name: 'Indonesian'
    }, {
        code: 'pt',
        name: 'Portuguese'
    }, {
        code: 'tr',
        name: 'Turkish'
    }, {
        code: 'it',
        name: 'Italian'
    }, {
        code: 'sw',
        name: 'Swahili'
    }],
    
	demoMode: true,
};