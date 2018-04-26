import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { TasksComponent } from './tasks/tasks.component';
import { ProfileComponent } from './profile/profile.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  ProfileComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    TasksComponent,
  ],
})
export class PagesModule {
}
