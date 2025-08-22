import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wish2Component } from './wish2.component';

describe('Wish2Component', () => {
  let component: Wish2Component;
  let fixture: ComponentFixture<Wish2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Wish2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wish2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
