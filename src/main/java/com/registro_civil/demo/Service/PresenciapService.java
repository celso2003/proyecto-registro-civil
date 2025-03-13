package com.registro_civil.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.registro_civil.demo.Model.Oficina;
import com.registro_civil.demo.Model.Presenciap;
import com.registro_civil.demo.Repository.OficinaRepository;
import com.registro_civil.demo.Repository.PresenciapRepository;
import java.util.List;
import java.util.Optional;


@Service
public class PresenciapService {

    @Autowired
    private OficinaRepository oficinaRepository;

    @Autowired
    private PresenciapRepository presenciapRepository;

    // Obtiene todas las presencias
    public List<Presenciap> getAllPresenciap() {
        return presenciapRepository.findAll();
    }

    // Obtiene una presencia por su ID
    public Optional<Presenciap> getPresenciapById(Integer id) {
        return presenciapRepository.findById(id);
    }

    // Guarda una nueva presencia
    public Presenciap createPresenciap(Presenciap presenciap) {
        return presenciapRepository.save(presenciap);
    }

    // Elimina una presencia por su ID
    public void deletePresenciap(Integer id) {
        presenciapRepository.deleteById(id);
    }

    // Actualiza una presencia existente
    public Presenciap updatePresenciap(Integer id, Presenciap presenciap) {
        presenciap.setIdPresencia(id);
        return presenciapRepository.save(presenciap);
    }

    // Filtra presencias por id_oficina y fecha
    public List<Presenciap> getPresenciapByOficinaAndFecha(Integer idOficina, String fecha) {
        return presenciapRepository.findByIdOficinaAndFecha(idOficina, fecha);
    }

    // Guarda una lista de presencias
    public String guardarTodos(List<Presenciap> registros) {
        try {
            for (Presenciap registro : registros) {
                // Obtener la oficina por su ID
                Oficina oficina = oficinaRepository.findById(registro.getOficina().getId_oficina())
                    .orElseThrow(() -> new RuntimeException("Oficina no encontrada"));
                registro.setOficina(oficina); // Asignar la oficina al registro
            }
            presenciapRepository.saveAll(registros); // Guardar todos los registros
            return "Registros guardados correctamente";
        } catch (Exception e) {
            return "Error al guardar los registros: " + e.getMessage();
        }
    }
}

