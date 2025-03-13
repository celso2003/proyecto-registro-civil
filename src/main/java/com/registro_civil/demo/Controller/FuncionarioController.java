package com.registro_civil.demo.Controller;

import com.registro_civil.demo.Model.Funcionario;
import com.registro_civil.demo.Service.FuncionarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/funcionarios")
@CrossOrigin(origins = "http://localhost:8080")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    // Endpoint para obtener todos los funcionarios
    @GetMapping("/todos")
    public List<Funcionario> getAFuncionarios() {
        return funcionarioService.getAFuncionarios();
    }

    // Endpoint para obtener un funcionario por su RUT
    @GetMapping("/{run}")
    public ResponseEntity<Funcionario> getFuncionarioByRut(@PathVariable Integer run) {
        return funcionarioService.getFuncionarioByRut(run)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para obtener un apodo por su ID
    @GetMapping("/id_apodo/{id_apodo}")
    public ResponseEntity<Funcionario> getApodoById(@PathVariable Integer idApodo) {
        return funcionarioService.getApodoById(idApodo)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // Endpoint para crear un nuevo funcionario
    @PostMapping("/crear")
    public ResponseEntity<Funcionario> createFuncionario(@RequestBody Funcionario funcionario) {
        try {
            Funcionario savedFuncionario = funcionarioService.saveFuncionario(funcionario);
            return ResponseEntity.ok(savedFuncionario);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Endpoint para eliminar un funcionario por su RUN
    @DeleteMapping("/eliminar/{run}")
    public ResponseEntity<Void> deleteFuncionario(@PathVariable Integer run) {
        funcionarioService.deleteFuncionario(run);
        return ResponseEntity.noContent().build();
    }

    // Endpoint para actualizar un funcionario por su ID
    @PutMapping("actualizar/{id_funcionario}")
    public Funcionario updateFuncionario(@PathVariable int id_funcionario, @RequestBody Funcionario funcionario) {
        funcionario.setRun(id_funcionario);
        return funcionarioService.updateFuncionario(id_funcionario, funcionario);
    }

    // Endpoint para buscar funcionarios por apellidos
    @GetMapping("/buscarPorApellidos")
    public ResponseEntity<List<Funcionario>> getFuncionariosByApellidos(@RequestParam String apellidoPaterno, @RequestParam String apellidoMaterno) {
        List<Funcionario> funcionarios = funcionarioService.getFuncionariosByApellidos(apellidoPaterno, apellidoMaterno);
        return ResponseEntity.ok(funcionarios);
    }

    // Endpoint para buscar funcionarios por apodo
    @GetMapping("/buscarPorApodo")
    public List<Funcionario> getFuncionariosByApodo(@RequestParam(required = false) Integer idApodo) {
        if (idApodo != null) {
            // Si se proporciona idApodo, filtrar los datos
            return funcionarioService.getFuncionariosByApodo(idApodo);
        } else {
            // Si no se proporciona idApodo, devolver todos los datos
            return funcionarioService.getAFuncionarios();
        }
    }
}