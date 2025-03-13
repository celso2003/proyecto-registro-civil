package com.registro_civil.demo.Controller;

import com.registro_civil.demo.Model.Presenciap;
import com.registro_civil.demo.Service.PresenciapService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/presenciap")
@CrossOrigin(origins = "http://localhost:8080")
public class PresenciapController {

    @Autowired
    private PresenciapService presenciapService;

    // Endpoint para obtener todas las presencias
    @GetMapping("/listarTodos")
    public ResponseEntity<List<Presenciap>> getAllPresenciap() {
        List<Presenciap> presenciap = presenciapService.getAllPresenciap();
        return ResponseEntity.ok(presenciap); // Responde con las presencias y código 200 (OK)
    }

    // Endpoint para obtener una presencia por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Presenciap> getPresenciapById(@PathVariable Integer id) {
        return presenciapService.getPresenciapById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para crear una nueva presencia
    @PostMapping("/crear")
    public Presenciap createPresenciap(@RequestBody Presenciap presenciap) {
        return presenciapService.createPresenciap(presenciap);
    }

    // Endpoint para eliminar una presencia por su ID
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> deletePresenciap(@PathVariable Integer id) {
        presenciapService.deletePresenciap(id);
        return ResponseEntity.noContent().build(); // Responde con código 204 (No Content)
    }

    // Endpoint para actualizar una presencia por su ID
    @PutMapping("/{id_presencia}")
    private Presenciap updatePresenciap(@PathVariable int id_presencia, @RequestBody Presenciap presenciap) {
        presenciap.setIdPresencia(id_presencia); // Asigna el id_presencia al objeto presenciap
        Presenciap presenciapActualizado = presenciapService.updatePresenciap(id_presencia, presenciap);
        return presenciapService.updatePresenciap(id_presencia, presenciapActualizado); // Retorna el recurso actualizado
    }

    // Endpoint para obtener todas las presencias o filtrar por id_oficina y fecha
    @GetMapping("/todos")
    public List<Presenciap> getAllPresenciap(
            @RequestParam(required = false) Integer idOficina,
            @RequestParam(required = false) String fecha) {

        if (idOficina != null && fecha != null) {
            // Si se proporcionan id_oficina y fecha, filtrar los datos
            return presenciapService.getPresenciapByOficinaAndFecha(idOficina, fecha);
        } else {
            // Si no se proporcionan parámetros, devolver todos los datos
            return presenciapService.getAllPresenciap();
        }
    }

    // Endpoint para guardar una lista de presencias
    @PostMapping("/guardarTodos")
    public ResponseEntity<String> guardarTodos(@Validated @RequestBody List<Presenciap> registros) {
        try {
            String resultado = presenciapService.guardarTodos(registros);
            return ResponseEntity.ok(resultado);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al guardar los registros: " + e.getMessage());
        }
    }
}
