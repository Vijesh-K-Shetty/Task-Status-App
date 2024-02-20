import { TestBed } from '@angular/core/testing';

import { TaskManageService } from './task-manage.service';

describe('TaskManageService', () => {
  let service: TaskManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
