import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NbAuthModule, NbEmailPassAuthProvider } from '@nebular/auth';
import { NB_AUTH_TOKEN_CLASS, NbAuthJWTToken } from '@nebular/auth';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'socicon-github',
  },
];

const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    providers: {
      email: {
        service: NbEmailPassAuthProvider,
        config: {
          baseEndpoint: 'http://localhost:3000',
          token: {
            key: 'data.token',
          },
          login: {
            alwaysFail: false,
            rememberMe: true,
            endpoint: '/api/auth/login',
            method: 'post',
            redirect: {
              success: '/pages/dashboard',
              failure: null,
            },
            defaultErrors: ['Login/Email combination is not correct, please try again.'],
            defaultMessages: ['You have been successfully logged in.'],
          },
          register: {
            alwaysFail: false,
            rememberMe: false,
            endpoint: '/api/auth/register',
            method: 'post',
            redirect: {
              success: '/pages/dashboard',
              failure: null,
            },
            defaultErrors: ['Something went wrong, please try again.'],
            defaultMessages: ['You have been successfully registered.'],
          },
        },
      },
    },
    forms: {
      login: {
        redirectDelay: 500,// delay before redirect after
        provider: 'email', // provider id key. If you have multiple providers, or what to use your own
        rememberMe: true, // whether to show or not the `rememberMe` checkbox
        showMessages: {// show/not show success/error messages
          success: true,
          error: true,
        },
        socialLinks: socialLinks, // social links at the bottom of a page
      },
      register: {
        redirectDelay: 500,
        provider: 'email',
        showMessages: {
          success: true,
          error: true,
        },
        terms: false,
        socialLinks: socialLinks,
      },
    },
  }).providers,
  AnalyticsService,
  {
    provide: NB_AUTH_TOKEN_CLASS,
    useValue: NbAuthJWTToken,
  },
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
