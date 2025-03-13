package com.registro_civil.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Dotacion {

    // Endpoint para mostrar la vista "Dotacion"
    @GetMapping("/Dotacion")
    public String login() {
        return "Dotacion";
    }
}