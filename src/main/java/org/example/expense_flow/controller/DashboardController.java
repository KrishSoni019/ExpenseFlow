package org.example.expense_flow.controller;

import jakarta.servlet.http.HttpSession;
import org.example.expense_flow.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {

    @GetMapping("/dashboard")
    public String dashboard(HttpSession session, Model model) {

        User user = (User) session.getAttribute("loggedInUser");
        if (user == null) {
            return "redirect:/login";
        }

        // ✅ send user to UI
        model.addAttribute("user", user);

        return "dashboard/dashboard";
    }
}
