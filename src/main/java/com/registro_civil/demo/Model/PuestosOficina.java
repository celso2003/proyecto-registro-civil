package com.registro_civil.demo.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "puestos_oficina") // Reemplaza con el nombre real de la tabla
public class PuestosOficina {

    // Identificador único para cada puesto
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_puesto")
    private Integer idPuesto;

    // Puesto de trabajo
    @Column(name = "puesto_de_trabajo", length = 200, nullable = false)
    private String puestoDeTrabajo;

    // Tipo de trabajo
    @Column(name = "tipo_de_trabajo", length = 200, nullable = false)
    private String tipoDeTrabajo;

    // Área de trabajo
    @Column(name = "area_de_trabajo", length = 200, nullable = false)
    private String areaDeTrabajo;

    // Nombre de la estación
    @Column(name = "nombre_estacion", length = 200, nullable = false)
    private String nombreEstacion;

    // Teléfono
    @Column(name = "telefono", length = 200, nullable = false)
    private String telefono;

    // Dirección IP
    @Column(name = "direccion_ip", length = 200, nullable = false)
    private String direccionIp;

    // Impresora
    @Column(name = "impresora", length = 200, nullable = false)
    private String impresora;

    // Relación oficina-puesto
    @ManyToOne
    @JoinColumn(name = "id_oficina", referencedColumnName = "id_oficina") // Clave foránea
    private Oficina oficina;

    // Getters y setters 
    public Integer getIdPuesto() {
        return idPuesto;
    }

    public void setIdPuesto(Integer idPuesto) {
        this.idPuesto = idPuesto;
    }

    public String getPuestoDeTrabajo() {
        return puestoDeTrabajo;
    }

    public void setPuestoDeTrabajo(String puestoDeTrabajo) {
        this.puestoDeTrabajo = puestoDeTrabajo;
    }

    public String getTipoDeTrabajo() {
        return tipoDeTrabajo;
    }

    public void setTipoDeTrabajo(String tipoDeTrabajo) {
        this.tipoDeTrabajo = tipoDeTrabajo;
    }

    public String getAreaDeTrabajo() {
        return areaDeTrabajo;
    }

    public void setAreaDeTrabajo(String areaDeTrabajo) {
        this.areaDeTrabajo = areaDeTrabajo;
    }

    public String getNombreEstacion() {
        return nombreEstacion;
    }

    public void setNombreEstacion(String nombreEstacion) {
        this.nombreEstacion = nombreEstacion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccionIp() {
        return direccionIp;
    }

    public void setDireccionIp(String direccionIp) {
        this.direccionIp = direccionIp;
    }

    public String getImpresora() {
        return impresora;
    }

    public void setImpresora(String impresora) {
        this.impresora = impresora;
    }

    public Oficina getOficina() {
        return oficina;
    }

    public void setOficina(Oficina oficina) {
        this.oficina = oficina;
    }
}