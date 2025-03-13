package com.registro_civil.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SigFormulario {
    
    // Endpoint para mostrar la vista "sigformulario"
    @GetMapping("/sigformulario")
    public String sigformulario() {
        return "sigformulario";
    }
    
}