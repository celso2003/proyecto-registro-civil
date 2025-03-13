package com.registro_civil.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.registro_civil.demo.Model.Recordatorio;

/*Interfaz que define el repositorio para la entidad Recordatorio extiende JpaRepository 
para proporcionar métodos CRUD predeterminados como guardar, eliminar,actualizar
*/
@Repository   
public interface RecordatorioRepository extends JpaRepository<Recordatorio, Integer> {
}
