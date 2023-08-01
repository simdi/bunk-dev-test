import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense.model';
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

  constructor(
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService,
  ) {
    this.newExpenseForm = this.formBuilder.group({
      name: ['', Validators.required],
      expense: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {

  }

  addExpense(): void {
    if (this.newExpenseForm.valid) {
      const expense: Expense = this.newExpenseForm.value;
      this.expenses.push(expense);
      this.newExpenseForm.reset({ name: '', expense: 0 });
    }
  }

  settleUp(): void {
    console.log()
    this.expenseService.settleUp().subscribe((result) => {
      // Handle the result from the server after settling up
      // The result could contain how much each traveller needs to pay to others
    });
  }
}
