package com.registro_civil.demo.Controller;

import com.registro_civil.demo.Model.Trabajo;
import com.registro_civil.demo.Service.TrabajoService;
import com.registro_civil.demo.Repository.TrabajoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/trabajos")
@CrossOrigin(origins = "http://localhost:8080") // Ajusta el origen según tu frontend
public class TrabajoController {

    @Autowired
    private TrabajoService trabajoService;

    @Autowired  // Inyecta el repositorio correctamente
    private TrabajoRepository trabajoRepository;

    // Endpoint para obtener todos los trabajos
    @GetMapping("/todos")
    public ResponseEntity<List<Trabajo>> getAllTrabajo() {
        List<Trabajo> trabajos = trabajoService.getAllTrabajos();
        return ResponseEntity.ok(trabajos); // Responde con los trabajos y código 200 (OK)
    }

    // Endpoint para obtener un trabajo por su id
    @GetMapping("/{id}")
    public ResponseEntity<Trabajo> getCargoById(@PathVariable Integer id) {
        return trabajoService.getTrabajoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para eliminar un trabajo por su id
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> deleteTrabajo(@PathVariable Integer id) {
        trabajoService.deleteTrabajo(id);
        return ResponseEntity.noContent().build(); // Responde con código 204 (No Content)
    }

    @Autowired
    public TrabajoController(TrabajoService trabajoService) {
        this.trabajoService = trabajoService;
    }

    // Endpoint para guardar un nuevo trabajo
    @PostMapping("/guardar")
    public ResponseEntity<String> guardarTrabajo(@RequestBody Trabajo trabajo) {
        trabajo.setFecha_envio(LocalDateTime.now()); // Establece la fecha de envío al momento actual
        trabajoService.guardarTrabajo(trabajo);
        return ResponseEntity.ok("Trabajo guardado exitosamente");
    }

    // Endpoint para actualizar un trabajo por su id
    @PutMapping("/actualizar/{id_trabajo}") // Asegúrate de que el nombre coincida con el parámetro
    public Trabajo updateTrabajo(@PathVariable int id_trabajo, @RequestBody Trabajo trabajo) {
        trabajo.setIdTrabajo(id_trabajo); // Asigna el id_trabajo al objeto trabajo
        Trabajo trabajoActualizado = trabajoService.updateTrabajo(id_trabajo, trabajo);
        return trabajoActualizado; // Retorna el recurso actualizado
    }
}

