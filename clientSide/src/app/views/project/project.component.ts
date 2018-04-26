import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { SdUserService } from '../../@core/data/sdusers.service';

@Component({
  selector: 'ngx-sd-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  projects = { projects: [] };

  constructor(private modalService: NgbModal,
              private usersService: SdUserService) { }

  ngOnInit() {
    this.projectList();
  }

  // tslint:disable-next-line:one-line
  projectList(){
    this.usersService.getProjects( localStorage.getItem('auth_user_id') ).subscribe(
        data => {
          this.projects = data[0];
          return;
        },
        err => console.error(err),
      );
  }

  showModal() {
    this.modalService.open(ProjectModalComponent, { size: 'lg', container: 'nb-layout' })
    .result.then(result => {
      if (result) {
        this.projects.projects.push(result);
      }
    }, def => '');
  }

}
