import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoveMsgComponent } from './love-msg.component';

describe('LoveMsgComponent', () => {
  let component: LoveMsgComponent;
  let fixture: ComponentFixture<LoveMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoveMsgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoveMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
