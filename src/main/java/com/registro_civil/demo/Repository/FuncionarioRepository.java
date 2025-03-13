package com.registro_civil.demo.Repository;

import com.registro_civil.demo.Model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

/*Interfaz que define el repositorio para la entidad Funcionario extiende JpaRepository 
para proporcionar métodos CRUD predeterminados como guardar, eliminar,actualizar
*/
@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer> {
    List<Funcionario> findByApellidoPaternoAndApellidoMaterno(String apellidoPaterno, String apellidoMaterno);    // Método para encontrar funcionarios por apellidos paterno y materno

    @Query("SELECT p FROM Funcionario p WHERE p.apodo.idApodo = :idApodo") // Consulta personalizada para encontrar funcionarios por id de apodo
    List<Funcionario> findByApodo(@Param("idApodo") Integer idApodo); // Método que utiliza la consulta personalizada para encontrar funcionarios por id de apodo
}



