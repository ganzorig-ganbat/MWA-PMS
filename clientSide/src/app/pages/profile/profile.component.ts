import { Component, OnInit, ViewChild } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
// import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { SdUserModel } from '../../@core/data/sduser.model';
import { SdUserService } from '../../@core/data/sdusers.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  token: any;
  message: string = null;
  pmessage: string = null;
  user = new SdUserModel();
  @ViewChild('f') gForm: any;
  @ViewChild('pf') pForm: any;

  constructor(private authService: NbAuthService, private dbUser: SdUserService) { }

  ngOnInit() {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.token = token;
          this.user = token.getPayload();
          // tslint:disable-next-line:no-console
          // console.log(token.getPayload());
        }
      });
  }

  onSubmit() {
    if (this.gForm.valid) {
      if (this.gForm.value.name && this.gForm.value.email) {
        // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:no-console
        this.dbUser.editUser(this.gForm.value, this.token.token).subscribe(data => console.log(data), err => console.log(err), () => console.log('Edit User loaded'));
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
      this.dbUser.checkUserPass({ id: this.pForm.value.id, oldpass: this.pForm.value.oldpass }, this.token.token).subscribe(data => {
        if (data) {
          if (this.pForm.value.newpass === this.pForm.value.newrepass) {
            if (this.pForm.value.newpass) {
              // tslint:disable-next-line:max-line-length
              // tslint:disable-next-line:no-console
              this.dbUser.editUserPass({ id: this.pForm.value.id, pass: this.pForm.value.newpass }, this.token.token).subscribe(up => console.log(up), err => console.log(err), () => console.log('Edit LoadCompleted'));
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
        // tslint:disable-next-line:no-console
      }, err => console.log(err), () => console.log('Check pass loaded'));
    }
  }

}
