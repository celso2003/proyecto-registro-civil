package com.registro_civil.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.registro_civil.demo.Model.Rol;
import com.registro_civil.demo.Repository.RolRepository;
import java.util.List;

@Service
public class RolService {

    @Autowired
    private RolRepository rolRepository;

    // Método para crear un nuevo rol
    public Rol createRol(Rol rol) {
        return rolRepository.save(rol);
    }

    // Método para obtener todos los roles
    public List<Rol> getAllRol() {
        return rolRepository.findAll();
    }
    
    // Método para obtener un rol por su ID
    public Rol getRolById(Integer id) {
        return rolRepository.findById(id).orElse(null);
    }

    // Método para actualizar un rol existente
    public Rol updateRol(Integer id, Rol rol) {
        rol.setIdRol(id);
        return rolRepository.save(rol);
    }

    // Método para eliminar un rol por su ID
    public void deleteRol(Integer id) {
        rolRepository.deleteById(id);
    }
    
    // Método para guardar un rol 
    public void guardarRol(Rol rol) {
        rolRepository.save(rol);
    }
}


