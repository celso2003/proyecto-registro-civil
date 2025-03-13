package com.registro_civil.demo.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.registro_civil.demo.Model.Area;
import com.registro_civil.demo.Repository.AreaRepository;


@Service
public class AreaService {

    @Autowired
    private AreaRepository areaRepository;

    // Obtiene todas las áreas
    public List<Area> getAllAreas() {
        return areaRepository.findAll();
    }

    // Obtiene un área por su ID
    public Optional<Area> getAreaById(Integer idArea) {
        return areaRepository.findById(idArea);
    }

    // Guarda una nueva área
    public Area saveArea(Area area) {
        return areaRepository.save(area);
    }

    // Elimina un área por su ID
    public void deleteArea(Integer idArea) {
        areaRepository.deleteById(idArea);
    }

    // Actualiza un área existente
    public Area updateArea(Integer id, Area area) {
        area.setIdArea(id);
        return areaRepository.save(area);
    }
}

