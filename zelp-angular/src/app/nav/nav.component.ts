import { Component, OnInit } from "@angular/core";
import { UserServiceClient } from "../services/user.service.client";
import {Router} from '@angular/router';
import {SearchServiceClient} from '../services/search.service.client';

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  loggedIn = false

  constructor(private service: UserServiceClient,
              private searchService: SearchServiceClient,
              private router: Router) {}

  validate(user) {
    if (user._id) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  search(input) {
    console.log(input);
  }

  logout() {
    this.service.logout();
  }

  ngOnInit() {
    this.service.profile()
      .then((user) => this.validate(user));
  }
}