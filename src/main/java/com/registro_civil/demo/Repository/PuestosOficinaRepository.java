package com.registro_civil.demo.Repository;

import com.registro_civil.demo.Model.PuestosOficina;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/*Interfaz que define el repositorio para la entidad PuestoOficina extiende JpaRepository 
para proporcionar métodos CRUD predeterminados como guardar, eliminar,actualizar
*/
@Repository
public interface PuestosOficinaRepository extends JpaRepository<PuestosOficina, Integer> {
    //Para encontrar registros por id de oficina
    @Query("SELECT p FROM PuestosOficina p WHERE p.oficina.id = :idOficina")
    List<PuestosOficina> findByIdOficina(@Param("idOficina") Integer idOficina);
}