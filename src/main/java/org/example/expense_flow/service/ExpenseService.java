package org.example.expense_flow.service;

import org.example.expense_flow.model.Expense;
import org.example.expense_flow.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // Save expense
    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // Get expenses for a given month
    public List<Expense> getMonthlyExpenses(Integer userId, int month, int year) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        return expenseRepository.findByUserIdAndExpenseDateBetween(
                userId,
                startDate,
                endDate
        );
    }

    // Calculate total spent
    public BigDecimal calculateTotal(List<Expense> expenses) {
        return expenses.stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // Get recent expenses
    public List<Expense> getRecentExpenses(Integer userId) {
        return expenseRepository.findTop5ByUserIdOrderByExpenseDateDesc(userId);
    }
}
