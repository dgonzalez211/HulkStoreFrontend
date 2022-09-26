import { TestBed } from '@angular/core/testing';

import { TypeDocumentService } from './type-document.service';

describe('TypeDocumentService', () => {
  let service: TypeDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
