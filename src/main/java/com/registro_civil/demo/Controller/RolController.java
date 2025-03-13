package com.registro_civil.demo.Controller;

import com.registro_civil.demo.Model.Rol;
import com.registro_civil.demo.Service.RolService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rol")
public class RolController {

    @Autowired
    private RolService rolService;

    // Crear un nuevo rol
    @PostMapping("crear")
    public ResponseEntity<Rol> createRol(@RequestBody Rol rol) {
        Rol createdRol = rolService.createRol(rol);
        return ResponseEntity.status(201).body(createdRol); // Responde con código 201 (Creado)
    }

    // Obtener todos los roles
    @GetMapping
    public ResponseEntity<List<Rol>> getAllRol() {
        List<Rol> rol = rolService.getAllRol();
        return ResponseEntity.ok(rol); // Responde con los roles y código 200 (OK)
    }

    // Obtener un rol por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Rol> getRolById(@PathVariable Integer id) {
        Rol rol = rolService.getRolById(id);
        if (rol != null) {
            return ResponseEntity.ok(rol); // Responde con el rol encontrado y código 200 (OK)
        } else {
            return ResponseEntity.status(404).body(null); // Responde con código 404 (No encontrado) si no existe
        }
    }

    // Eliminar un rol por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRol(@PathVariable Integer id) {
        rolService.deleteRol(id);
        return ResponseEntity.status(204).build(); // Responde con código 204 (Sin contenido) indicando que la eliminación fue exitosa
    }

    // Actualizar un rol por su ID
    @PutMapping("/{id_rol}")
    private Rol updateRol(@PathVariable int id_rol, @RequestBody Rol rol) {
        rol.setIdRol(id_rol); // Asigna el id_rol al objeto rol
        Rol rolActualizado = rolService.updateRol(id_rol, rol);
        return rolService.updateRol(id_rol, rolActualizado); // Retorna el recurso actualizado
    }
}