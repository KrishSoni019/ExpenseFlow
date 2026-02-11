//package org.example.expense_flow.controller;
//
//import org.example.expense_flow.model.User;
//import org.example.expense_flow.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//
//@Controller
//public class AuthController {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @PostMapping("/signup")
//    public String register(User user) {
//
//        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//
//        String hashedPassword = encoder.encode(user.getPassword());
//        user.setPassword(hashedPassword);
//
//        userRepository.save(user);
//        return "login";
//    }
//
//}
package org.example.expense_flow.controller;

import org.example.expense_flow.model.User;
import org.example.expense_flow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Controller
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public String register(User user) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));

        userRepository.save(user);
        return "login";
    }

    // ✅ LOGIN LOGIC
    @PostMapping("/login")
    public String login(
            @RequestParam String email,
            @RequestParam String password,
            Model model,
            HttpSession session
    ) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            model.addAttribute("error", "Invalid email or password");
            return "login";
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        if (!encoder.matches(password, user.getPassword())) {
            model.addAttribute("error", "Invalid email or password");
            return "login";
        }

        // CREATE SESSION
        session.setAttribute("userId", user.getUserId());   // NEW (extra)
        session.setAttribute("loggedInUser", user);         // SAME as before


        return "redirect:/dashboard";
    }

}
