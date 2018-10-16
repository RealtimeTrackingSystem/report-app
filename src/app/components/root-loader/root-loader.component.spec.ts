import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootLoaderComponent } from './root-loader.component';

describe('RootLoaderComponent', () => {
  let component: RootLoaderComponent;
  let fixture: ComponentFixture<RootLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
