package com.registro_civil.demo.Controller;

import com.registro_civil.demo.Model.Apodo;
import com.registro_civil.demo.Service.ApodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/apodos")
@CrossOrigin(origins = "http://localhost:8080") 
public class ApodoController {
    
    @Autowired
    private ApodoService apodoService;

    // Endpoint para obtener todos los apodos
    @GetMapping("/todos")
    public List<Apodo> getAllApodos() {
        return apodoService.getAllApodos();
    }

    // Endpoint para obtener un apodo por su ID
    @GetMapping("/{id}")
    public Optional<Apodo> getApodoById(@PathVariable Integer id) {
        return apodoService.getApodoId(id);
    }

    // Endpoint para guardar un nuevo apodo
    @PostMapping("/crear")
    public Apodo saveApodo(@RequestBody Apodo apodo) {
        return apodoService.saveApodo(apodo);
    }

    // Endpoint para eliminar un apodo por su ID
    @DeleteMapping("/{id}")
    public void deleteApodo(@PathVariable Integer id) {
        apodoService.deleteApodo(id);
    }

    // Endpoint para actualizar un apodo por su ID
    @PutMapping("/{id_apodo}")
    private Apodo updateApodo(@PathVariable int id_apodo, @RequestBody Apodo apodo) {
        apodo.setIdApodo(id_apodo);
        Apodo apodoActualizado = apodoService.updateApodo(id_apodo, apodo);    
        return apodoService.updateApodo(id_apodo, apodoActualizado);         
    }
}
