import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostDetailPage } from './host-detail.page';

describe('HostDetailPage', () => {
  let component: HostDetailPage;
  let fixture: ComponentFixture<HostDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
