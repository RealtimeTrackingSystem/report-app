import { IHost } from './../../interfaces/host/host.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { HostDetailAction } from '../../store/state/host.state';
import { IAppStore } from '../../store/app.state';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-host-detail',
  templateUrl: './host-detail.page.html',
  styleUrls: ['./host-detail.page.scss'],
})
export class HostDetailPage implements OnInit, OnDestroy {
  private arSubscription: Subscription;
  private hostStoreSubscription: Subscription;
  public host: IHost;
  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<IAppStore>
  ) { }

  ngOnInit() {
    this.arSubscription = this.activateRoute.params
      .pipe(
        tap(params => this.store.dispatch(new HostDetailAction(params.hostId)))
      )
      .subscribe();
    this.hostStoreSubscription = this.store.select('host')
      .subscribe(
        hostStore => {
          this.host = hostStore.hostDetail;
        }
      );
  }

  ngOnDestroy() {
    this.arSubscription.unsubscribe();
    this.hostStoreSubscription.unsubscribe();
  }

}
