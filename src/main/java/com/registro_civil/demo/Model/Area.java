package com.registro_civil.demo.Model;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

// Esta clase representa la entidad "Area" en la base de datos
@Entity
@Table(name = "area")
public class Area {

    // Identificador único para cada área
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_area")
    private int idArea;

    // Nombre del área, no puede ser nulo
    @Column(name = "nombre_area", nullable = false)
    private String nombreArea;

    // Relación uno a muchos con la entidad Funcionario, mapeada por el campo "area" en Funcionario
    @OneToMany(mappedBy = "area") 
    @JsonIgnore
    private List<Funcionario> funcionarios;

    // Getters y setters para los campos de la clase
    public int getIdArea() {
        return idArea;
    }

    public void setIdArea(int idArea) {
        this.idArea = idArea;
    }

    public String getNombreArea() {
        return nombreArea;
    }

    public void setNombreArea(String nombreArea) {
        this.nombreArea = nombreArea;
    }
}