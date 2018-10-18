import { Component } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-root-loader',
  templateUrl: './root-loader.component.html',
  styleUrls: ['./root-loader.component.scss']
})
export class RootLoaderComponent {
  public isLogin = true;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Host List',
      url: '/host-list',
      icon: 'list'
    }
  ];
  constructor() { }
}
