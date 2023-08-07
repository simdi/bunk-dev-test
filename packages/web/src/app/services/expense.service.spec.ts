import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ExpenseService } from './expense.service';

describe('ExpenseService', () => {
  let expenseService: ExpenseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExpenseService]
    });
    expenseService = TestBed.inject(ExpenseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(expenseService).toBeTruthy();
  });

  it('should send a POST request to settleUp and return the response', () => {
    const mockData = { expenses: [{ name: 'Alice', amount: 10 }, { name: 'Bob', amount: 20 }] };
    const expectedResponse = { total: 30, equalShare: 15, payouts: [{
      owes: 'Alice',
      owed: 'bob',
      amount: 5
    }] };

    expenseService.settleUp(mockData).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/payouts');
    expect(req.request.method).toBe('POST');
    req.flush(expectedResponse);
  });
});
