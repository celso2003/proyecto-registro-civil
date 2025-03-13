package com.registro_civil.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.registro_civil.demo.Model.PuestosOficina;
import com.registro_civil.demo.Repository.PuestosOficinaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PuestosOficinaService {

    @Autowired
    private PuestosOficinaRepository puestosOficinaRepository;

    // Método para obtener todos los puestos de oficina
    public List<PuestosOficina> getAllPuestosOficina() {
        return puestosOficinaRepository.findAll();
    }

    // Método para obtener un puesto de oficina por su ID
    public Optional<PuestosOficina> getPuestosOficinaById(Integer id) {
        return puestosOficinaRepository.findById(id);
    }
 
    // Método para filtrar puestos de oficina por id_oficina (clave foránea)
    public List<PuestosOficina> getPuestosOficinaByOficina(Integer idOficina) {
        return puestosOficinaRepository.findByIdOficina(idOficina);
    }

}