package com.registro_civil.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.registro_civil.demo.Model.Cargo;
import com.registro_civil.demo.Repository.CargoRepository;
import java.util.List;
import java.util.Optional;


@Service
public class CargoService {

    @Autowired
    private CargoRepository cargoRepository;

    // Crea un nuevo cargo
    public Cargo createCargo(Cargo cargo) {
        return cargoRepository.save(cargo);
    }

    // Obtiene todos los cargos
    public List<Cargo> getAllCargos() {
        return cargoRepository.findAll();
    }

    // Obtiene un cargo por su ID
    public Optional<Cargo> getCargoById(Integer id) {
        return cargoRepository.findById(id);
    }

    // Elimina un cargo por su ID
    public void deleteCargo(Integer id) {
        cargoRepository.deleteById(id);
    }

    // Actualiza un cargo existente
    public Cargo updateCargo(Integer id, Cargo cargo) {
        cargo.setIdCargo(id);
        return cargoRepository.save(cargo);
    }
}