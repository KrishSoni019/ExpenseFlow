package org.example.expense_flow.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // ❗ REQUIRED for AJAX POST
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth
                        // public pages
                        .requestMatchers(
                                "/login",
                                "/signup",
                                "/css/**",
                                "/js/**"
                        ).permitAll()

                        .requestMatchers(
                                "/login",
                                "/signup",
                                "/dashboard",
                                "/api/**",
                                "/css/**",
                                "/js/**"
                        ).permitAll()

                        .anyRequest().permitAll()

                )

                // no default login page
                .formLogin(form -> form.disable())
                .logout(logout -> logout.disable());

        return http.build();
    }
}
