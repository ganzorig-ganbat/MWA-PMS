import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectModalComponent } from './project-modal/project-modal.component';

@Component({
  selector: 'sd-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  showModal() {
    const activeModal = this.modalService.open(ProjectModalComponent, { size: 'lg', container: 'nb-layout' });
  }

}
