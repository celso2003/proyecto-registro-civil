package com.registro_civil.demo.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.registro_civil.demo.Model.Ausentes;
import com.registro_civil.demo.Repository.AusentesRepository;

@Service
public class AusentesService {

    @Autowired
    private AusentesRepository ausentesRepository;

    // Método para obtener todos los ausentes
    public List<Ausentes> getAusentes() {
        return ausentesRepository.findAll();
    }

    // Método para crear un nuevo ausente
    public Ausentes createAusente(Ausentes ausentes) {
        ausentes.setFecha_envio(LocalDateTime.now());
        return ausentesRepository.save(ausentes);
    }

    // Método para obtener un ausente por su id
    public Optional<Ausentes> getAusenteById(Integer id) {
        return ausentesRepository.findById(id);
    }

    // Método para eliminar un ausente por su id
    public void deleteAusente(Integer id) {
        ausentesRepository.deleteById(id);
    }

    // Método para actualizar un ausente existente
    public Ausentes updateAusentes(Integer id, Ausentes ausentes) {
        ausentes.setIdAusente(id);
        return ausentesRepository.save(ausentes);
    }

    // Método para buscar ausentes por rango de fechas
    public List<Ausentes> buscarAusentesPorFechas(LocalDate startDate, LocalDate endDate) {
        return ausentesRepository.findByFechaInicioBetween(startDate, endDate);
    }
}