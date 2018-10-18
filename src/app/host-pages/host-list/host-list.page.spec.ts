import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostListPage } from './host-list.page';

describe('HostListPage', () => {
  let component: HostListPage;
  let fixture: ComponentFixture<HostListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
