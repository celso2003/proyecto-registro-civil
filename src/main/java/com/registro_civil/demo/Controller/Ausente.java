package com.registro_civil.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Ausente {

    // Endpoint para mostrar la vista "ausente"
    @GetMapping("/ausente")
    public String ausente() {
        return "ausente";
    }

    // Endpoint para mostrar la vista "ausenteFuncionario"
    @GetMapping("/ausenteFuncionario")
    public String ausenteFuncionario() {
        return "ausenteFuncionario";
    }

    // Endpoint para mostrar la vista "ListaraAusente"
    @GetMapping("/ListaraAusente")
    public String ListaraAusente() {
        return "ListaraAusente";
    }

    // Endpoint para mostrar la vista "ListarAusenteFuncionario"
    @GetMapping("/ListarAusenteFuncionario")
    public String ListarAusenteFuncionario() {
        return "ListarAusenteFuncionario";
    }
}