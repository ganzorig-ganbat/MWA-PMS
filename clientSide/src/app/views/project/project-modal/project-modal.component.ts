import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SdUserService } from '../../../@core/data/sdusers.service';

@Component({
  selector: 'ngx-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss'],
})

export class ProjectModalComponent implements OnInit {

  project = {
    id: '',
    user_id: '',
    name: '',
    isAdmin: true,
  }

  constructor(private activeModal: NgbActiveModal, private userService: SdUserService) {
  }

  ngOnInit() {
    this.project.user_id = localStorage.getItem('auth_user_id');
  }

  closeModal() {
    this.activeModal.close(false);
  }

  onSubmit(form) {
    if (form.valid) {
      this.userService.createProject(this.project).subscribe(
        data => {
          this.project.id = data.toString();
          this.activeModal.close(this.project);
        },
      );
    }
  }
}

