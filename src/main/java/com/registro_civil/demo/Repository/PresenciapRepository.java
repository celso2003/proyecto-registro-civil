package com.registro_civil.demo.Repository;

import com.registro_civil.demo.Model.Presenciap;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/*Interfaz que define el repositorio para la entidad Presenciap extiende JpaRepository 
para proporcionar métodos CRUD predeterminados como guardar, eliminar,actualizar
*/
@Repository
public interface PresenciapRepository extends JpaRepository<Presenciap, Integer> {
    //para encontrar registros por id de oficina y fecha
    @Query("SELECT p FROM Presenciap p WHERE p.oficina.id = :idOficina AND p.fecha = :fecha")
    List<Presenciap> findByIdOficinaAndFecha(@Param("idOficina") Integer idOficina, @Param("fecha") String fecha);
}