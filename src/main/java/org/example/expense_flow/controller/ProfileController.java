package org.example.expense_flow.controller;

import jakarta.servlet.http.HttpSession;
import org.example.expense_flow.model.User;
import org.example.expense_flow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/profile")
    public String profile(HttpSession session, Model model) {

        User user = (User) session.getAttribute("loggedInUser");
        if (user == null) {
            return "redirect:/login";
        }

        model.addAttribute("user", user);
        return "profile/profile";
    }

    @PostMapping("/profile/update")
    public String updateProfile(
            @RequestParam String name,
            @RequestParam(required = false) String password,
            HttpSession session,
            Model model
    ) {
        User user = (User) session.getAttribute("loggedInUser");
        if (user == null) {
            return "redirect:/login";
        }

        // ✅ VALIDATION: name cannot be empty or spaces
        if (name == null || name.trim().isEmpty()) {
            model.addAttribute("user", user);
            model.addAttribute("error", "Name cannot be empty");
            return "profile/profile";
        }

        // update name
        user.setName(name.trim());

        // update password ONLY if provided
        if (password != null && !password.trim().isEmpty()) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode(password));
        }

        // save to DB
        userRepository.save(user);

        // update session
        session.setAttribute("loggedInUser", user);

        // ✅ stay on profile page with success message
        model.addAttribute("user", user);
        model.addAttribute("success", "Profile updated successfully");

        return "profile/profile";
    }
}
