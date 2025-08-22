import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparkleContentComponent } from './sparkle-content.component';

describe('SparkleContentComponent', () => {
  let component: SparkleContentComponent;
  let fixture: ComponentFixture<SparkleContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparkleContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparkleContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
