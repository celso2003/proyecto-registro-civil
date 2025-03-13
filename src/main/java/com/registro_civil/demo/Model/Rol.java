package com.registro_civil.demo.Model;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "rol")
public class Rol {

    // Identificador único para cada rol
    @Autowired
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Integer idRol;

    // Nombre del rol
    @Column(name = "nombre_rol", length = 500, nullable = true)
    private String nombreRol;

    // Relaciones entre tablas
    @OneToMany(mappedBy = "rol")
    @JsonIgnore
    private List<Funcionario> funcionarios;

    // Getters y setters 
    public Integer getIdRol() {
        return idRol;
    }

    public void setIdRol(Integer idRol) {
        this.idRol = idRol;
    }

    public String getNombreRol() {
        return nombreRol;
    }

    public void setNombreRol(String nombreRol) {
        this.nombreRol = nombreRol;
    }

    public List<Funcionario> getFuncionarios() {
        return funcionarios;
    }

    public void setFuncionarios(List<Funcionario> funcionarios) {
        this.funcionarios = funcionarios;
    }
}
