import { Component, OnInit, ViewChild } from '@angular/core';
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
  commentWrapper: string;
  project_name: string;
  tasks: SdTaskModel[];
  task = new SdTaskModel('', '', '', '', '', [], '', '');
  tasksHolder: SdTaskModel[];
  types;
  order;
  @ViewChild('f') form: any;

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

  changeValue(value) {
    // tslint:disable-next-line:no-console
    if (value === 'Incomplete') {
      this.tasks = this.tasksHolder.filter(x => x.status === 'pending');
    } else if (value === 'All') {
      this.tasks = this.tasksHolder.filter(x => true);
    } else {
      this.tasks = this.tasksHolder.filter(x => x.status === 'completed');
    }
  }

  private taskList() {
    this.taskService.getTasksByProject(this.id).subscribe(
      data => {
        this.tasks = data as SdTaskModel[];
        this.tasksHolder = this.tasks;
      },
    );
  }

  showModal() {
    const activeModal = this.modalService.open(TaskModalComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = this.id;

    activeModal.result.then(result => {
      if (result) {
        this.tasks.push(result as SdTaskModel);
        this.tasksHolder = this.tasks;
      }
    }, def => '')
  }

  toggleStatus(task_id) {
    const index = this.tasks.findIndex(x => x._id === task_id);
    const status = this.tasks[index].status;
    if (status === 'pending') {
      this.taskService.updateCompleteTask(task_id).subscribe(
        data => {
          // tslint:disable-next-line:no-console
          console.log(data);
          this.tasks[index].status = 'completed';
          this.tasksHolder = this.tasks;
        },
      );
    } else {
      this.taskService.updatePendingTask(task_id).subscribe(
        data => {
          this.tasks[index].status = 'pending';
          this.tasksHolder = this.tasks;
        },
      );
    }
  }

  deleteTask(task_id) {
    this.taskService.deleteTask(task_id).subscribe(
      data => {
        this.tasks = this.tasks.filter(x => x._id !== task_id);
        this.tasksHolder = this.tasks;
      },
    );
  }

  setTask(event) {
    const task_id = event.target.id;
    const index = this.tasks.findIndex(x => x._id === task_id);
    this.task = this.tasks[index];
  }

  updateTask(event) {
    const task_id = event.target.id;
    const task_name = event.target.value;
    const task = new SdTaskModel(task_name, this.id);
    task._id = task_id;
    this.taskService.updateTask(task).subscribe(
      data => '',
      err => console.error(err),
    );

    this.tasksHolder = this.tasks;
  }

  onSubmit() {
    if (this.form.valid) {
      // tslint:disable-next-line:no-console
      console.log('Form Submitted!');
      if (this.task) {
        const body = {
          task_id: '',
          user_id: '',
          comment: '',
        }
        body.task_id = this.task._id;
        body.user_id = localStorage.getItem('auth_user_id');
        body.comment = this.commentWrapper;
        this.taskService.createComments(body).subscribe(
          // tslint:disable-next-line:no-console
          data => this.task.comments.push(data),
          err => console.error(err),
        );
        this.form.reset();
        this.commentWrapper = '';
      }
    }
  }

}
