package org.example.expense_flow.controller;

import jakarta.servlet.http.HttpSession;
import org.example.expense_flow.model.Expense;
import org.example.expense_flow.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ExpenseApiController {

    private final ExpenseService expenseService;

    public ExpenseApiController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // ================= ADD EXPENSE =================
    @PostMapping("/expenses")
    public Map<String, Object> addExpense(
            @RequestBody Map<String, String> payload,
            HttpSession session
    ) {
        Integer userId = (Integer) session.getAttribute("userId");

        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }

        Expense expense = new Expense();
        expense.setUserId(userId);
        expense.setCategoryId(getCategoryId(payload.get("category")));
        expense.setPaymentTypeId(getPaymentTypeId(payload.get("paymentType")));
        expense.setAmount(new BigDecimal(payload.get("amount")));
        expense.setExpenseDate(LocalDate.parse(payload.get("date")));
        expense.setDescription(payload.get("note"));

        expenseService.addExpense(expense);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");

        return response;
    }

    // ================= DASHBOARD DATA =================
    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardData(
            @RequestParam int month,
            @RequestParam int year,
            HttpSession session
    ) {
        Integer userId = (Integer) session.getAttribute("userId");

        if (userId == null) {
            throw new RuntimeException("User not logged in");
        }

        List<Expense> expenses = expenseService.getMonthlyExpenses(userId, month, year);
        BigDecimal totalSpent = expenseService.calculateTotal(expenses);
        List<Expense> recentExpenses = expenseService.getRecentExpenses(userId);

        Map<String, Object> response = new HashMap<>();
        response.put("totalSpent", totalSpent);
        response.put("expenses", expenses);
        response.put("recentExpenses", recentExpenses);

        return response;
    }

    // ================= HELPERS =================
    private int getCategoryId(String category) {
        return switch (category) {
            case "food" -> 1;
            case "travel" -> 2;
            case "shopping" -> 3;
            case "entertainment" -> 4;
            case "rent" -> 5;
            case "utilities" -> 6;
            default -> throw new IllegalArgumentException("Invalid category");
        };
    }

    private int getPaymentTypeId(String type) {
        return switch (type) {
            case "cash" -> 1;
            case "upi" -> 2;
            case "card" -> 3;
            default -> throw new IllegalArgumentException("Invalid payment type");
        };
    }
}
