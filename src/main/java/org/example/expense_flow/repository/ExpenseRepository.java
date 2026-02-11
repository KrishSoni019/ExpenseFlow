package org.example.expense_flow.repository;

import org.example.expense_flow.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

    List<Expense> findByUserIdAndExpenseDateBetween(
            Integer userId,
            LocalDate startDate,
            LocalDate endDate
    );

    List<Expense> findTop5ByUserIdOrderByExpenseDateDesc(Integer userId);
}
