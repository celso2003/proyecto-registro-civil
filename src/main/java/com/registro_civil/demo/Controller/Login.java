package com.registro_civil.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Login {
    
    // Endpoint para mostrar la vista "login"
    @GetMapping("/login")
    public String login() {
        return "login";
    }
    
}
