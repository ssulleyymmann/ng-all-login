import { Component, OnInit } from '@angular/core';

import { AuthService } from 'ng-all-login';
import { SocialUser } from 'ng-all-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedinLoginProvider } from 'ng-all-login';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  user: SocialUser;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  signInWithIN(): void {
    this.authService.signIn(LinkedinLoginProvider.PROVIDER_ID);
  }
  signOut(): void {
    this.authService.signOut();
  }

}
