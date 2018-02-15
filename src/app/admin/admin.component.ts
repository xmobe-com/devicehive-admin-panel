import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DevicehiveService} from "../core/devicehive.service";
import {UserService} from "../core/user.service";
import {User, UserRole} from "../shared/models/user.model";

@Component({
  selector: 'dh-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  currentUser: User;
  userRole = UserRole;

  constructor(private dh: DevicehiveService,
              private userService: UserService,
              private router: Router) {
  }

  async ngOnInit() {
    this.currentUser = await this.userService.forceGetCurrentUser();
  }

  logOut() {
    this.dh.logOut();
    this.userService.clearCurrentUser();
    this.router.navigate(['/login']);
  }
}
