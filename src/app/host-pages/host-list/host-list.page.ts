import { Router } from '@angular/router';
import { IHostStore } from './../../store/state/host.state';
import { IHost } from './../../interfaces/host/host.interface';
import { ISessionStore } from './../../store/state/session.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../store/app.state';
import { HostListAction } from '../../store/state/host.state';
import { Subscription, Observable } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-host-list',
  templateUrl: './host-list.page.html',
  styleUrls: ['./host-list.page.scss'],
})
export class HostListPage implements OnInit, OnDestroy {
  public hostSubscription: Subscription;
  public sessionSubscription: Subscription;
  public hostLists$: Observable<IHost[]>;
  public page = 0;
  public limit = 25;
  public count = 0;
  constructor(
    private menuCtrl: MenuController,
    private store: Store<IAppStore>,
    private router: Router
  ) {
    // this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.sessionSubscription = this.store.select('session')
      .pipe(
        tap((sessionStore: ISessionStore) => {
          if (sessionStore.session) {
            const filter = '_id:'
              + sessionStore.session.user.hosts.map(h => h._id).join(',')
              + ':false';
            this.store.dispatch(new HostListAction(0, 25, filter));
          }
        })
      )
      .subscribe();
    this.hostLists$ = this.store.select('host')
      .pipe(
        map((hostStore: IHostStore) => {
          console.log(hostStore);
          this.page = hostStore.page;
          this.limit = hostStore.limit;
          this.count = hostStore.count;
          return hostStore.hosts;
        })
      );
  }

  ngOnDestroy () {
    this.sessionSubscription.unsubscribe();
  }

  hostDetailPage(hostId: string) {
    this.router.navigate(['/host-detail/' + hostId]);
  }

}
