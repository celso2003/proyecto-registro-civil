package com.registro_civil.demo.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.registro_civil.demo.Model.Cargo;
import com.registro_civil.demo.Model.Funcionario;
import com.registro_civil.demo.Model.Oficina;
import com.registro_civil.demo.Repository.FuncionarioRepository;
import com.registro_civil.demo.Repository.CargoRepository;
import com.registro_civil.demo.Repository.OficinaRepository;


@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private CargoRepository cargoRepository;

    @Autowired
    private OficinaRepository oficinaRepository;

    // Obtiene todos los funcionarios
    public List<Funcionario> getAFuncionarios() {
        return funcionarioRepository.findAll();
    }

    // Obtiene un funcionario por su RUT
    public Optional<Funcionario> getFuncionarioByRut(Integer rut) {
        return funcionarioRepository.findById(rut);
    }

    // Obtiene un apodo por su ID
    public Optional<Funcionario> getApodoById(int idApodo) {
        return funcionarioRepository.findById(idApodo);
    }

    // Guarda un nuevo funcionario
    public Funcionario saveFuncionario(Funcionario funcionario) {
        // Asegura que la entidad Cargo esté guardada antes de guardar Funcionario
        if (funcionario.getCargo() != null && funcionario.getCargo().getIdCargo() != null) {
            Optional<Cargo> cargoOpt = cargoRepository.findById(funcionario.getCargo().getIdCargo());
            if (cargoOpt.isPresent()) {
                funcionario.setCargo(cargoOpt.get());
            } else {
                throw new IllegalArgumentException("Cargo no encontrado");
            }
        }

        // Asegura que la entidad Oficina esté guardada antes de guardar Funcionario
        if (funcionario.getOficina() != null && funcionario.getOficina().getId_oficina() != null) {
            Optional<Oficina> oficinaOpt = oficinaRepository.findById(funcionario.getOficina().getId_oficina());
            if (oficinaOpt.isPresent()) {
                funcionario.setOficina(oficinaOpt.get());
            } else {
                throw new IllegalArgumentException("Oficina no encontrada");
            }
        }

        return funcionarioRepository.save(funcionario);
    }

    // Elimina un funcionario por su RUT
    public void deleteFuncionario(Integer rut) {
        funcionarioRepository.deleteById(rut);
    }

    // Actualiza un funcionario existente
    public Funcionario updateFuncionario(Integer id, Funcionario funcionario) {
        funcionario.setRun(id);
        return funcionarioRepository.save(funcionario);
    }

    // Obtiene funcionarios por apellidos
    public List<Funcionario> getFuncionariosByApellidos(String apellidoPaterno, String apellidoMaterno) {
        return funcionarioRepository.findByApellidoPaternoAndApellidoMaterno(apellidoPaterno, apellidoMaterno);
    }

    // Obtiene funcionarios por apodo
    public List<Funcionario> getFuncionariosByApodo(Integer idApodo) {
        return funcionarioRepository.findByApodo(idApodo);
    }
}



