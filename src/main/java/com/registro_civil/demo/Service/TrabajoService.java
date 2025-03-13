package com.registro_civil.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.registro_civil.demo.Model.Trabajo;
import com.registro_civil.demo.Repository.TrabajoRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TrabajoService {
    
    @Autowired
    private TrabajoRepository trabajoRepository;

    // Método para crear un nuevo trabajo
    public Trabajo guardarTrabajo(Trabajo trabajo) {
        trabajo.setFecha_envio(LocalDateTime.now());
        return trabajoRepository.save(trabajo);
    }

    // Método para obtener todos los trabajos
    public List<Trabajo> getAllTrabajos() {
        return trabajoRepository.findAll();
    }
    
    // Método para obtener un trabajo por su id
    public Optional<Trabajo> getTrabajoById(Integer id) {
        return trabajoRepository.findById(id);
    }

    // Método para eliminar un trabajo por su id
    public void deleteTrabajo(Integer id) {
        trabajoRepository.deleteById(id);
    }

    // Método para actualizar un trabajo existente
    public Trabajo updateTrabajo(Integer id, Trabajo trabajo) {
        trabajo.setIdTrabajo(id);
        return trabajoRepository.save(trabajo);
    }
}
