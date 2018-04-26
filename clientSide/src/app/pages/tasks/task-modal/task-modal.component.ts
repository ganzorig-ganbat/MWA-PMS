import { Component, OnInit, Input } from '@angular/core';
import { SdTaskModel } from '../../../@core/data/sdtask.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SdTaskService } from '../../../@core/data/sdtask.service';

@Component({
  selector: 'ngx-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  task = new SdTaskModel('', '');
  @Input('modalHeader') modalHeader;

  constructor(private activeModal: NgbActiveModal, private taskService: SdTaskService) { }

  ngOnInit() {
    this.task.project_id = this.modalHeader;
    this.task.status = 'pending';
  }

  closeModal() {
    this.activeModal.close(false);
  }

  onSubmit(form) {
    if (form.valid) {
      this.taskService.createTask(this.task).subscribe(
        data => {
          this.task._id = data.toString();
          this.task.comments = [];
          this.task.dueDate = '';
          this.task.description = '';
          this.activeModal.close(this.task);
        },
      );
    }
  }

}
