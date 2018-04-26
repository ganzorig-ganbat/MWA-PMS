import { Component, OnInit, ViewChild } from '@angular/core';
import { SdUserModel } from '../../@core/data/sduser.model';
import { SdUserService } from '../../@core/data/sdusers.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  message: string = null;
  pmessage: string = null;
  user = new SdUserModel();
  @ViewChild('f') gForm: any;
  @ViewChild('pf') pForm: any;

  constructor(private dbUser: SdUserService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.gForm.valid) {
      if (this.gForm.value.name && this.gForm.value.email) {
        this.dbUser.editUser(this.gForm.value).subscribe(
          data => '',
          err => '',
          () => '');
        this.message = 'Successfully updated';
        this.gForm.reset();
      } else {
        this.message = 'Name and email required';
      }
    }
  }

  onPassChange() {
    if (this.pForm.valid) {
      // tslint:disable-next-line:max-line-length
      this.dbUser.checkUserPass({ id: this.pForm.value.id, oldpass: this.pForm.value.oldpass }).subscribe(data => {
        if (data) {
          if (this.pForm.value.newpass === this.pForm.value.newrepass) {
            if (this.pForm.value.newpass) {
              this.dbUser.editUserPass({ id: this.pForm.value.id, pass: this.pForm.value.newpass })
              .subscribe(up => '', err => '', () => '');
              this.pmessage = 'Password successfully updated';
              this.pForm.reset();
            } else {
              this.pmessage = 'New password is required';
            }
          } else {
            this.pmessage = 'New passwords repeat does not match.';
          }
        } else {
          this.pmessage = 'Old password does not match';
        }
      }, err => '', () => '');
    }
  }

}
