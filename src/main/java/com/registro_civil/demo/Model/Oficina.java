package com.registro_civil.demo.Model;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name= "oficina")
public class Oficina {

    // Identificador único para cada oficina
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_oficina")
    private Integer id_oficina;

    // Nombre de la oficina
    @Column(name = "nombre_oficina", nullable = false, length = 100)
    private String nombreOficina;

    // Dotación de la oficina
    @Column(name = "dotacion", nullable = false)
    private int dotacion;

    // Relación oficina-cargo
    @ManyToMany
    @JoinTable(
        name = "oficina_cargo",
        joinColumns = @JoinColumn(name = "id_oficina"),
        inverseJoinColumns = @JoinColumn(name = "id_cargo")
    )
    private List<Cargo> cargos;

    // Relación oficina-funcionarios
    @OneToMany(mappedBy = "oficina") 
    @JsonIgnore
    private List<Funcionario> funcionarios;

    // Relación oficina-puestos
    @OneToMany(mappedBy = "oficina", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PuestosOficina> puestosOficina;

    // Relación oficina-presenciap
    @OneToMany(mappedBy = "oficina")
    @JsonIgnore
    private List<Presenciap> presenciaps;

    // Getters y setters 
    public List<Presenciap> getPresenciaps() {
        return presenciaps;
    }

    public void setPresenciaps(List<Presenciap> presenciaps) {
        this.presenciaps = presenciaps;
    }

    public Integer getId_oficina() {
        return id_oficina;
    }

    public void setId_oficina(Integer id_oficina) {
        this.id_oficina = id_oficina;
    }

    public String getNombreOficina() {
        return nombreOficina;
    }

    public void setNombreOficina(String nombreOficina) {
        this.nombreOficina = nombreOficina;
    }

    public int getDotacion() {
        return dotacion;
    }

    public void setDotacion(int dotacion) {
        this.dotacion = dotacion;
    }

    public List<Cargo> getCargos() {
        return cargos;
    }

    public void setCargos(List<Cargo> cargos) {
        this.cargos = cargos;
    }

    public List<Funcionario> getFuncionarios() {
        return funcionarios;
    }

    public void setFuncionarios(List<Funcionario> funcionarios) {
        this.funcionarios = funcionarios;
    }
}
