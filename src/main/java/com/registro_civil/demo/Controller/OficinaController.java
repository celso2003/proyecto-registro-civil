package com.registro_civil.demo.Controller;

import com.registro_civil.demo.Model.Oficina;
import com.registro_civil.demo.Service.OficinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/oficinas")
@CrossOrigin(origins = "http://localhost:8080") 
public class OficinaController {
    
    @Autowired
    private OficinaService oficinaService;

    // Endpoint para obtener todas las oficinas
    @GetMapping("/todos")
    public List<Oficina> getAllOficinas() {
        return oficinaService.getAOficinas();
    }

    // Endpoint para obtener una oficina por su ID
    @GetMapping("/{id}")
    public Optional<Oficina> getOficinaById(@PathVariable Integer id) {
        return oficinaService.getOficinaId(id);
    }

    // Endpoint para guardar una nueva oficina
    @PostMapping("/crear")
    public Oficina saveOficina(@RequestBody Oficina oficina) {
        return oficinaService.saveOficina(oficina);
    }

    // Endpoint para eliminar una oficina por su ID
    @DeleteMapping("/{id}")
    public void deleteOficina(@PathVariable Integer id) {
        oficinaService.deleteOficina(id);
    }

    // Endpoint para actualizar una oficina por su ID
    @PutMapping("/{id_oficina}")
    private Oficina updateOficina(@PathVariable int id_oficina, @RequestBody Oficina oficina) {
        oficina.setId_oficina(id_oficina); // Asigna el id_oficina al objeto oficina
        Oficina oficinaActualizado = oficinaService.updateOficina(id_oficina, oficina);
        return oficinaService.updateOficina(id_oficina, oficinaActualizado); // Retorna el recurso actualizado
    }
}

