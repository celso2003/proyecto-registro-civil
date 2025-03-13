package com.registro_civil.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class InicioFuncionario {
    
    // Endpoint para mostrar la vista "inicioFuncionario"
    @GetMapping("/inicioFuncionario")
    public String inicioFuncionario() {
        return "inicioFuncionario";
    }
    
}
