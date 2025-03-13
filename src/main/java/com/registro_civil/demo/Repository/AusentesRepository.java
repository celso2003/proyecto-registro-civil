package com.registro_civil.demo.Repository;

import com.registro_civil.demo.Model.Ausentes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

/*Interfaz que define el repositorio para la entidad Ausentes extiende JpaRepository 
para proporcionar métodos CRUD predeterminados como guardar, eliminar,actualizar
*/
@Repository
public interface AusentesRepository extends JpaRepository<Ausentes, Integer> {
    // Método personalizado para encontrar registros por rango de fechas
    List<Ausentes> findByFechaInicioBetween(LocalDate startDate, LocalDate endDate); 
}
