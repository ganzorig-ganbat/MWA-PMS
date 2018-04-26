import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ProjectComponent } from './project/project.component';
import { ProjectModalComponent } from './project/project-modal/project-modal.component';
import { LogoutComponent } from './logout/logout.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  ProjectComponent,
  ProjectModalComponent,
  LogoutComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  entryComponents: [
    ProjectModalComponent,
  ],
})
export class ViewsModule { }
