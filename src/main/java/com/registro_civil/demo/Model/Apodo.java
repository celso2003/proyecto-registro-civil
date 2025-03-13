package com.registro_civil.demo.Model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

// Esta clase representa la entidad "Apodo" en la base de datos
@Entity
@Table(name = "apodo")
public class Apodo {

    // Identificador unico para cada apodo
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_apodo")
    private Integer idApodo;

    // Nombre del apodo, no puede ser nulo y tiene un máximo de 100 caracteres
    @Column(name = "nombre_apodo", nullable = false, length = 100)
    private String nombreApodo;

    // Observaciones sobre el apodo, no puede ser nulo y tiene un máximo de 400 caracteres
    @Column(name = "observacion", nullable = false, length = 400)
    private String observacion;

    // Relación uno a uno con la entidad Funcionario, mapeada por el campo "apodo" en Funcionario
    @OneToOne(mappedBy = "apodo")
    @JsonBackReference
    private Funcionario funcionario;
    
    // Getters y setters para los campos de la clase
    public Integer getIdApodo() {
        return idApodo;
    }

    public void setIdApodo(Integer idApodo) {
        this.idApodo = idApodo;
    }

    public String getNombreApodo() {
        return nombreApodo;
    }

    public void setNombreApodo(String nombreApodo) {
        this.nombreApodo = nombreApodo;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }
}