import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SdTaskService } from '../../@core/data/sdtask.service';
import { SdUserService } from '../../@core/data/sdusers.service';

@Component({
  selector: 'ngx-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  id: string;
  project_name: string;
  tasks: any;

  constructor(
    private route: ActivatedRoute,
    private taskService: SdTaskService,
    private userService: SdUserService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;

      this.userService.getProject(localStorage.getItem('auth_user_id'), this.id).subscribe(
        // tslint:disable-next-line:no-console
        data => this.project_name = data[0].projects[0].name,
        err => console.error(err),
      )

      this.taskList();
    });
  }

  private taskList() {
    this.taskService.getTasksByProject(this.id).subscribe(
      data => {
        this.tasks = data;
        // tslint:disable-next-line:no-console
        console.log(data);
      },
    );
  }

}
