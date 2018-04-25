import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { SdUserService } from '../../@core/data/sdusers.service';
import { NbMenuService, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'ngx-sd-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  projects: any;

  constructor(private modalService: NgbModal,
              private usersService: SdUserService) { }

  ngOnInit() {
    const user1 = { _id: '' };
    user1._id = localStorage.getItem('auth_user_id');
    this.projectList(user1, localStorage.getItem('auth_app_token'));
  }

  // tslint:disable-next-line:one-line
  projectList(user: any, tok: any){
    this.usersService.getProjects(user, tok).subscribe(
        data => {
          this.projects = data[0];
          return;
        },
        err => console.error(err),
      );
  }

  showModal() {
    this.modalService.open(ProjectModalComponent, { size: 'lg', container: 'nb-layout' });
  }

}
