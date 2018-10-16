import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from '../services/session.service';
import {  MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from '../store/app.state';
import { LoginAction } from '../store/state/session.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  private sessionSubscription: Subscription;
  constructor(
    private sessionService: SessionService,
    private menuCtrl: MenuController,
    private router: Router,
    private store: Store<IAppStore>
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.sessionSubscription = this.store.select('session')
          .subscribe(
            userState => {
              if (userState.session) {
                console.log(userState);
                this.router.navigate(['/home']);
              }
            }
          );
  }

  ngOnDestroy() {
    this.sessionSubscription.unsubscribe();
  }

  login () {
    // const data = { name: 'data', value: 'data value' };
    // this.sessionService.createSession('johnhiggins', 'tester')
    //   .toPromise()
    //   .then((result) => {
    //     if (result) {
    //       this.router.navigate(['/home']);
    //     }
    //   });
    this.store.dispatch(new LoginAction('johnhiggins', 'tester'));
  }

  checkSession () {
    this.sessionService.getSession
      .toPromise()
      .then(console.log);
  }
}
