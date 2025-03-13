package com.registro_civil.demo.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.registro_civil.demo.Model.PuestosOficina;
import com.registro_civil.demo.Service.PuestosOficinaService;

@RestController
@RequestMapping("/api/puestosoficina")
public class PuestosOficinaController {

    @Autowired
    private PuestosOficinaService puestosOficinaService;

    // Endpoint para obtener todos los puestos de oficina o filtrar por id_oficina
    @GetMapping("/todos")
    public List<PuestosOficina> getAllPuestosOficina(
            @RequestParam(required = false) Integer idOficina) {

        if (idOficina != null) {
            // Si se proporciona id_oficina, filtrar los datos
            return puestosOficinaService.getPuestosOficinaByOficina(idOficina);
        } else {
            // Si no se proporcionan parámetros, devolver todos los datos
            return puestosOficinaService.getAllPuestosOficina();
        }
    }

    // Endpoint para obtener un puesto de oficina por su ID
    @GetMapping("/{id}")
    public ResponseEntity<PuestosOficina> getPuestosOficinaById(@PathVariable Integer id) {
        return puestosOficinaService.getPuestosOficinaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
