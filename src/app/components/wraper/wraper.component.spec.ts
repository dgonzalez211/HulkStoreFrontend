import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WraperComponent } from './wraper.component';

describe('WraperComponent', () => {
  let component: WraperComponent;
  let fixture: ComponentFixture<WraperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WraperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WraperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
