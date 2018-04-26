import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { TasksComponent } from './tasks/tasks.component';
import { TaskModalComponent } from './tasks/task-modal/task-modal.component';
import { ProfileComponent } from './profile/profile.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  ProfileComponent,
  TasksComponent,
  TaskModalComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    FormsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  entryComponents: [
    TaskModalComponent,
  ],
})
export class PagesModule {
}
