package com.registro_civil.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.registro_civil.demo.Model.Oficina;
import com.registro_civil.demo.Repository.OficinaRepository;
import java.util.List;
import java.util.Optional;


@Service
public class OficinaService {

    @Autowired
    private OficinaRepository oficinaRepository;

    // Obtiene todas las oficinas
    public List<Oficina> getAOficinas() {
        return oficinaRepository.findAll();
    }

    // Obtiene una oficina por su ID
    public Optional<Oficina> getOficinaId(Integer id) {
        return oficinaRepository.findById(id);
    }

    // Guarda una nueva oficina
    public Oficina saveOficina(Oficina oficina) {
        return oficinaRepository.save(oficina);
    }

    // Elimina una oficina por su ID
    public void deleteOficina(Integer id) {
        oficinaRepository.deleteById(id);
    }

    // Actualiza una oficina existente
    public Oficina updateOficina(Integer id, Oficina oficina) {
        oficina.setId_oficina(id);
        return oficinaRepository.save(oficina);
    }
}

