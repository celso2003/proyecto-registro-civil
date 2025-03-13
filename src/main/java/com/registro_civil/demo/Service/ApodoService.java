package com.registro_civil.demo.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.registro_civil.demo.Model.Apodo;
import com.registro_civil.demo.Repository.ApodoRepository;


@Service
public class ApodoService {

    @Autowired
    private ApodoRepository apodoRepository;

    // Obtiene todos los apodos
    public List<Apodo> getAllApodos() {
        return apodoRepository.findAll();
    }

    // Obtiene un apodo por su ID
    public Optional<Apodo> getApodoId(Integer id) {
        return apodoRepository.findById(id);
    }

    // Guarda un nuevo apodo
    public Apodo saveApodo(Apodo apodo) {
        return apodoRepository.save(apodo);
    }

    // Elimina un apodo por su ID
    public void deleteApodo(Integer id) {
        apodoRepository.deleteById(id);
    }

    // Actualiza un apodo existente
    public Apodo updateApodo(Integer id, Apodo apodo) {
        apodo.setIdApodo(id);
        return apodoRepository.save(apodo);
    }
}
