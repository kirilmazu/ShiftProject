import { TestBed } from '@angular/core/testing';

import { NotificatnotificationService } from './notificatnotification.service';

describe('NotificatnotificationService', () => {
  let service: NotificatnotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificatnotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
