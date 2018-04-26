import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { ElectricityService } from './electricity.service';
import { StateService } from './state.service';
import { PlayerService } from './player.service';
import { SdUserService } from './sdusers.service';
import { SdTaskService } from './sdtask.service';

const SERVICES = [
  UserService,
  ElectricityService,
  StateService,
  PlayerService,
  SdUserService,
  SdTaskService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
