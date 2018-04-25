import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss'],
})

export class ProjectModalComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal) { 
    
  }

  ngOnInit(){

  }

  closeModal() {
    this.activeModal.close();
  }
}

