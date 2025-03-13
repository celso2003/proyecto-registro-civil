package com.registro_civil.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Inicio {
    
    // Endpoint para mostrar la vista "inicio"
    @GetMapping("/inicio")
    public String login() {
        return "inicio";
    }
    
}