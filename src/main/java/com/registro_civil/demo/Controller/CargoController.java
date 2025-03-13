package com.registro_civil.demo.Controller;

import com.registro_civil.demo.Model.Cargo;
import com.registro_civil.demo.Service.CargoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cargos")
@CrossOrigin(origins = "http://localhost:8080") 
public class CargoController {

    @Autowired
    private CargoService cargoService;

    // Endpoint para obtener todos los cargos
    @GetMapping("/todos")
    public ResponseEntity<List<Cargo>> getAllCargo() {
        List<Cargo> cargos = cargoService.getAllCargos();
        return ResponseEntity.ok(cargos); // Responde con los cargos y código 200 (OK)
    }

    // Endpoint para obtener un cargo por su id
    @GetMapping("/{id}")
    public ResponseEntity<Cargo> getCargoById(@PathVariable Integer id) {
        return cargoService.getCargoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para crear un nuevo cargo
    @PostMapping("/crear")
    public Cargo createCrago(@RequestBody Cargo cargo) {
        return cargoService.createCargo(cargo);
    }

    // Endpoint para eliminar un cargo por su id
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> deleteCrago(@PathVariable Integer id) {
        cargoService.deleteCargo(id);
        return ResponseEntity.noContent().build(); // Responde con código 204 (No Content)
    }

    // Endpoint para actualizar un cargo por su id
    @PutMapping("/{id_cargo}")
    private Cargo updateCargo(@PathVariable int id_cargo, @RequestBody Cargo cargo) {
        cargo.setIdCargo(id_cargo); // Asigna el id_cargo al objeto cargo
        Cargo cargoActualizado = cargoService.updateCargo(id_cargo, cargo);
        return cargoService.updateCargo(id_cargo, cargoActualizado); // Retorna el recurso actualizado
    }
}
