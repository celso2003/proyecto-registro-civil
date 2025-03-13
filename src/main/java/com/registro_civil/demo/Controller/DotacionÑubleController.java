package com.registro_civil.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DotacionÑubleController {

    // Endpoint para mostrar la vista "DotacionÑuble"
    @GetMapping("/DotacionÑuble")
    public String login() {
        return "DotacionÑuble";
    }
}