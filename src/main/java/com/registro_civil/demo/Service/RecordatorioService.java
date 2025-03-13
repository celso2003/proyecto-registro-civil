package com.registro_civil.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.registro_civil.demo.Model.Recordatorio;
import com.registro_civil.demo.Repository.RecordatorioRepository;
import java.util.List;
import java.util.Optional;

@Service
public class RecordatorioService {
    
    // Inyección de dependencias del repositorio de Recordatorio
    @Autowired
    private RecordatorioRepository recordatorioRepository;

    // Método para obtener todos los recordatorios
    public List<Recordatorio> obtenerTodos() {
        return recordatorioRepository.findAll();
    }

    // Método para obtener un recordatorio por su ID
    public Optional<Recordatorio> obtenerPorId(Integer id) {
        return recordatorioRepository.findById(id);
    }

    // Método para guardar un nuevo recordatorio
    public Recordatorio guardar(Recordatorio recordatorio) {
        return recordatorioRepository.save(recordatorio);
    }

    // Método para eliminar un recordatorio por su ID
    public void eliminar(Integer id) {
        recordatorioRepository.deleteById(id);
    }
}
