import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDocumentComponent } from './generate-document.component';

describe('GenerateDocumentComponent', () => {
  let component: GenerateDocumentComponent;
  let fixture: ComponentFixture<GenerateDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
