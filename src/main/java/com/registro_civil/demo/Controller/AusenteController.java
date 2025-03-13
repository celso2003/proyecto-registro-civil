package com.registro_civil.demo.Controller;

import com.registro_civil.demo.Model.Ausentes;
import com.registro_civil.demo.Service.AusentesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/ausentes")
public class AusenteController {

    @Autowired
    private AusentesService ausentesService;

    // Endpoint para obtener todos los ausentes
    @GetMapping("/todos")
    public ResponseEntity<List<Ausentes>> getAllAusente() {
        List<Ausentes> ausentes = ausentesService.getAusentes();
        return ResponseEntity.ok(ausentes); // Responde con los ausentes y código 200 (OK)
    }

    // Endpoint para obtener un ausente por su id
    @GetMapping("/{id}")
    public ResponseEntity<Ausentes> getAusenteById(@PathVariable Integer id) {
        return ausentesService.getAusenteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para crear un nuevo ausente
    @PostMapping("/crear")
    public Ausentes createCrago(@RequestBody Ausentes ausentes) {
        ausentes.setFecha_envio(LocalDateTime.now()); // Establece la fecha de envío al momento actual
        return ausentesService.createAusente(ausentes);
    }

    // Endpoint para eliminar un ausente por su id
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> deleteCrago(@PathVariable Integer id) {
        ausentesService.deleteAusente(id);
        return ResponseEntity.noContent().build(); // Responde con código 204 (No Content)
    }

    // Endpoint para actualizar un ausente por su id
    @PutMapping("/{id_ausente}")
    public Ausentes updateAusentes(@PathVariable int id_ausente, @RequestBody Ausentes ausente) {
        ausente.setIdAusente(id_ausente); // Asigna el id_ausente al objeto ausente
        Ausentes ausenteActualizado = ausentesService.updateAusentes(id_ausente, ausente);
        return ausenteActualizado; // Retorna el recurso actualizado
    }

    // Endpoint para buscar ausentes por rango de fechas
    @GetMapping("/buscar")
    public ResponseEntity<List<Ausentes>> buscarAusentesPorFechas(
            @RequestParam("startDate") LocalDate startDate,
            @RequestParam("endDate") LocalDate endDate) {
        List<Ausentes> ausentes = ausentesService.buscarAusentesPorFechas(startDate, endDate);
        return ResponseEntity.ok(ausentes); // Responde con los ausentes encontrados y código 200 (OK)
    }
}
