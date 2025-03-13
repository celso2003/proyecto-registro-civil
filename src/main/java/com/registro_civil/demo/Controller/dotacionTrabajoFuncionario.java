package com.registro_civil.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class dotacionTrabajoFuncionario {
    
    // Endpoint para mostrar la vista "dotacionTrabajoFuncionario"
    @GetMapping("/dotacionTrabajoFuncionario")
    public String dotacionTrabajoFuncionario() {
        return "dotacionTrabajoFuncionario";
    }
}