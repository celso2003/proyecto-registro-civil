package com.registro_civil.demo.Model;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "cargo")
public class Cargo {

    // Identificador único para cada cargo
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cargo")
    private Integer idCargo;

    // Nombre del cargo
    private String nombreCargo;

    // Permiso del cargo
    private String permiso;

    // Relación con oficina muchos a muchos
    @ManyToMany(mappedBy = "cargos")
    @JsonIgnore
    private List<Oficina> oficinas;

    // Relación con funcionario
    @OneToMany(mappedBy = "cargo") 
    @JsonIgnore
    private List<Funcionario> funcionarios;

    // Getters y setters para los campos de la clase
    public Integer getIdCargo() {
        return idCargo;
    }

    public void setIdCargo(Integer idCargo) {
        this.idCargo = idCargo;
    }

    public String getNombreCargo() {
        return nombreCargo;
    }

    public void setNombreCargo(String nombreCargo) {
        this.nombreCargo = nombreCargo;
    }

    public String getPermiso() {
        return permiso;
    }

    public void setPermiso(String permiso) {
        this.permiso = permiso;
    }

    public List<Oficina> getOficinas() {
        return oficinas;
    }

    public void setOficinas(List<Oficina> oficinas) {
        this.oficinas = oficinas;
    }

    public List<Funcionario> getFuncionarios() {
        return funcionarios;
    }

    public void setFuncionarios(List<Funcionario> funcionarios) {
        this.funcionarios = funcionarios;
    }
}
