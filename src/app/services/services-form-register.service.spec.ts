import { TestBed } from '@angular/core/testing';

import { ServicesFormRegisterService } from './services-form-register.service';

describe('ServicesFormRegisterService', () => {
  let service: ServicesFormRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesFormRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
