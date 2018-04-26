import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { SdTaskService } from '../../@core/data/sdtask.service';
import { SdUserService } from '../../@core/data/sdusers.service';
import { SdTaskModel } from '../../@core/data/sdtask.model';
import { TaskModalComponent } from './task-modal/task-modal.component';

@Component({
  selector: 'ngx-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  id: string;
  project_name: string;
  tasks: SdTaskModel[];

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private taskService: SdTaskService,
    private userService: SdUserService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;

      this.userService.getProject(localStorage.getItem('auth_user_id'), this.id).subscribe(
        data => this.project_name = data[0].projects[0].name,
        err => console.error(err),
      )

      this.taskList();
    });
  }

  private taskList() {
    this.taskService.getTasksByProject(this.id).subscribe(
      data => {
        this.tasks = data as SdTaskModel[];
      },
    );
  }

  showModal() {
    const activeModal = this.modalService.open(TaskModalComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = this.id;

    activeModal.result.then(result => {
      if (result) {
        this.tasks.push(result as SdTaskModel);
      }
    }, def => '')
  }

}
