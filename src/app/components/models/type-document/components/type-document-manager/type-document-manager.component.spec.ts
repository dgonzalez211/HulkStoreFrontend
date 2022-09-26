import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDocumentManagerComponent } from './type-document-manager.component';

describe('TypeDocumentManagerComponent', () => {
  let component: TypeDocumentManagerComponent;
  let fixture: ComponentFixture<TypeDocumentManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeDocumentManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeDocumentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
