import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { ExpenseTrackerComponent } from './expense-tracker.component';
import { ExpenseService } from '../../services/expense.service';
import { ReactiveFormsModule } from '@angular/forms';

class MockExpenseService {
  settleUp(data: any): Observable<any> {
    return of({ total: 100, equalShare: 25, payouts: [] });
  }
}

describe('ExpenseTrackerComponent', () => {
  let component: ExpenseTrackerComponent;
  let fixture: ComponentFixture<ExpenseTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ExpenseTrackerComponent],
      providers: [{ provide: ExpenseService, useClass: MockExpenseService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add an expense when addExpense is called with valid form', () => {
    expect(component.expenses.length).toBe(0);

    component.newExpenseForm.setValue({ name: 'John', amount: 50 });
    component.addExpense();

    expect(component.expenses.length).toBe(1);
    expect(component.expenses[0].name).toBe('John');
    expect(component.expenses[0].amount).toBe(50);

    expect(component.newExpenseForm.value).toEqual({ name: '', amount: 0 });
  });

  it('should call expenseService.settleUp() and receive response', () => {
    spyOn(component.expenseService, 'settleUp').and.callThrough();

    component.expenses = [
      { name: 'Alice', amount: 25 },
      { name: 'Bob', amount: 30 }
    ];

    component.settleUp();

    expect(component.expenseService.settleUp).toHaveBeenCalled();
    expect(component.expenseService.settleUp).toHaveBeenCalledWith({ expenses: component.expenses });
  });
});
