package com.registro_civil.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DotacionTrabajo {
    
    // Endpoint para mostrar la vista "dotacionTrabajo"
    @GetMapping("/dotacionTrabajo")
    public String dotacionTrabajo() {
        return "dotacionTrabajo";
    }
    
}