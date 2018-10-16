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
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];
  constructor(
    private sessionService: SessionService
  ) { }
}
