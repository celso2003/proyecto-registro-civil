package com.registro_civil.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Formulario {
    
    // Endpoint para mostrar la vista "formulario"
    @GetMapping("/formulario")
    public String formulario() {
        return "formulario";
    }

    // Endpoint para mostrar la vista "formularioFuncionario"
    @GetMapping("/formularioFuncionario")
    public String formularioFuncionario() {
        return "formularioFuncionario";
    }
}