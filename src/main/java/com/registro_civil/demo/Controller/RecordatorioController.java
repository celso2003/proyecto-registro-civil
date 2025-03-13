package com.registro_civil.demo.Controller;

import com.registro_civil.demo.Model.Recordatorio;
import com.registro_civil.demo.Service.RecordatorioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recordatorios")
@CrossOrigin(origins = "*") // Permite solicitudes desde cualquier origen
public class RecordatorioController {

    @Autowired
    private RecordatorioService recordatorioService;

    // Obtener todos los recordatorios
    @GetMapping("/listar")
    public List<Recordatorio> listar() {
        return recordatorioService.obtenerTodos();
    }

    // Obtener un recordatorio por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Recordatorio> obtener(@PathVariable Integer id) {
        Optional<Recordatorio> recordatorio = recordatorioService.obtenerPorId(id);
        return recordatorio.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo recordatorio
    @PostMapping("/crear")
    public ResponseEntity<Recordatorio> crear(@RequestBody Recordatorio recordatorio) {
        return ResponseEntity.ok(recordatorioService.guardar(recordatorio));
    }

    // Actualizar un recordatorio existente
    @PutMapping("/{id}")
    public ResponseEntity<Recordatorio> actualizar(@PathVariable Integer id, @RequestBody Recordatorio recordatorio) {
        if (!recordatorioService.obtenerPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        recordatorio.setId(id);
        return ResponseEntity.ok(recordatorioService.guardar(recordatorio));
    }

    // Eliminar un recordatorio por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        if (!recordatorioService.obtenerPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        recordatorioService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
