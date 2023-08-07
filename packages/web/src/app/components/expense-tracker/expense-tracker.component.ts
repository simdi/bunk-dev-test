import { Component, OnInit } from '@angular/core';
import { APIRequestResponse, Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense-tracker',
  templateUrl: './expense-tracker.component.html',
  styleUrls: ['./expense-tracker.component.css']
})
export class ExpenseTrackerComponent implements OnInit {
  newExpenseForm: FormGroup;
  expenses: Expense[] = [];
  response!: APIRequestResponse;

  constructor(
    private formBuilder: FormBuilder,
    public expenseService: ExpenseService,
  ) {
    this.newExpenseForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  addExpense(): void {
    if (this.newExpenseForm.valid) {
      const expense: Expense = this.newExpenseForm.value;
      this.expenses.push(expense);
      this.newExpenseForm.reset({ name: '', amount: 0 });
    }
  }

  settleUp(): void {
    const data = { expenses: this.expenses };
    this.expenseService.settleUp(data).subscribe((result) => {
      this.response = result;
    });
  }
}
