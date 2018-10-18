import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore } from '../../store/app.state';
import { HostListAction } from '../../store/state/host.state';
import { Subscription } from 'rxjs';
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-host-list',
  templateUrl: './host-list.page.html',
  styleUrls: ['./host-list.page.scss'],
})
export class HostListPage implements OnInit, OnDestroy {
  private hostSubscription;
  constructor(
    private menuCtrl: MenuController,
    private store: Store<IAppStore>
  ) {
    // this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.store.dispatch(new HostListAction(0, 25, null));
    this.hostSubscription = this.store.select('host')
      .subscribe(
        hostState => {
          console.log(hostState);
        }
      );
  }

  ngOnDestroy () {
    this.hostSubscription.unsubscribe();
  }

}
