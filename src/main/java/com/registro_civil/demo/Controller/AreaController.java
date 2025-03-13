package com.registro_civil.demo.Controller;

import com.registro_civil.demo.Model.Area;
import com.registro_civil.demo.Service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/areas")
@CrossOrigin(origins = "http://localhost:8080") 
public class AreaController {

    @Autowired
    private AreaService areaService;

    // Endpoint para obtener todas las áreas
    @GetMapping("/todos")
    public List<Area> getAllAreas() {
        return areaService.getAllAreas();
    }

    // Endpoint para obtener un área por su ID
    @GetMapping("/{id_area}")
    public ResponseEntity<Area> getAreaById(@PathVariable Integer id) {
        return areaService.getAreaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para crear una nueva área
    @PostMapping("/crear")
    public ResponseEntity<Area> createArea(@RequestBody Area area) {
        try {
            Area savedArea = areaService.saveArea(area);
            return ResponseEntity.ok(savedArea);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Endpoint para eliminar un área por su ID
    @DeleteMapping("/eliminar/{id_area}")
    public ResponseEntity<Void> deleteArea(@PathVariable Integer id) {
        areaService.deleteArea(id);
        return ResponseEntity.noContent().build();
    }
}