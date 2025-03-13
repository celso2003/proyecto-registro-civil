package com.registro_civil.demo.Repository;

import com.registro_civil.demo.Model.Apodo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*Interfaz que define el repositorio para la entidad Apodo extiende JpaRepository 
para proporcionar métodos CRUD predeterminados como guardar, eliminar,actualizar
*/@Repository
public interface ApodoRepository extends JpaRepository<Apodo, Integer> {
    
}
