package com.registro_civil.demo.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "trabajo") 
public class Trabajo {

    // Identificador único para cada trabajo
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_trabajo")
    private Integer idTrabajo;

    // Usuario
    @Column(name = "usuario", length = 100, nullable = false)
    private String usuario;
    
    // Run del funcionario
    @Column(name = "run", nullable = false)
    private int run;
    
    // Nombres del funcionario
    @Column(name = "nombres", length = 100, nullable = false)
    private String nombres;
    
    // Apellido paterno del funcionario
    @Column(name = "apellido_paterno", length = 100, nullable = false)
    private String apellidoPaterno;
    
    // Apellido materno del funcionario
    @Column(name = "apellido_materno", length = 100, nullable = false)
    @JsonProperty("apellidoMaterno")
    private String apellidoMaterno;
    
    // Área de trabajo
    @Column(name = "area", length = 300, nullable = false)
    private String area;
    
    // Cargo del funcionario
    @Column(name = "cargo", length = 100, nullable = false)
    private String cargo;
    
    // Oficina
    @Column(name = "oficina", length = 100, nullable = true)
    private String oficina;
    
    // Fecha
    @Column(name = "fecha")
    @Temporal(TemporalType.DATE)
    private Date fecha;
    
    // Dotación efectiva
    @Column(name = "dotacion_efectiva", nullable = true)
    private Integer dotacionEfectiva;
    
    // Estado de la oficina
    @Column(name = "estado_oficina", length = 100, nullable = true)
    private String estadoOficina;
    
    // Atención hoy
    @Column(name = "atencion_hoy", length = 100, nullable = true)
    private String atencionHoy;
    
    // Oficina opera
    @Column(name = "oficina_opera", length = 100, nullable = true)
    private String oficinaOpera;
    
    // Motivo no opera
    @Column(name = "motivo_no_opera", length = 100, nullable = true)
    private String motivoNoOpera;
    
    // Atención parcial motivo
    @Column(name = "atencion_parcial_motivo", length = 100, nullable = true)
    private String atencionParcialMotivo;
    
    // Observación
    @Column(name = "observacion", length = 500, nullable = true)
    private String observacion;

    // Dotación
    @Column(name = "dotacion", nullable = true)
    private String dotacion;

    // Fecha de envío
    @Column(name = "fecha_envio", nullable = true)
    private LocalDateTime fecha_envio;

    // Getters y setters
    public Integer getIdTrabajo() {
        return idTrabajo;
    }

    public void setIdTrabajo(Integer idTrabajo) {
        this.idTrabajo = idTrabajo;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public int getRun() {
        return run;
    }

    public void setRun(int run) {
        this.run = run;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidoPaterno() {
        return apellidoPaterno;
    }

    public void setApellidoPaterno(String apellidoPaterno) {
        this.apellidoPaterno = apellidoPaterno;
    }

    public String getApellidoMaterno() {
        return apellidoMaterno;
    }

    public void setApellidoMaterno(String apellidoMaterno) {
        this.apellidoMaterno = apellidoMaterno;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getOficina() {
        return oficina;
    }

    public void setOficina(String oficina) {
        this.oficina = oficina;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Integer getDotacionEfectiva() {
        return dotacionEfectiva;
    }

    public void setDotacionEfectiva(Integer dotacionEfectiva) {
        this.dotacionEfectiva = dotacionEfectiva;
    }

    public String getEstadoOficina() {
        return estadoOficina;
    }

    public void setEstadoOficina(String estadoOficina) {
        this.estadoOficina = estadoOficina;
    }

    public String getAtencionHoy() {
        return atencionHoy;
    }

    public void setAtencionHoy(String atencionHoy) {
        this.atencionHoy = atencionHoy;
    }

    public String getOficinaOpera() {
        return oficinaOpera;
    }

    public void setOficinaOpera(String oficinaOpera) {
        this.oficinaOpera = oficinaOpera;
    }

    public String getMotivoNoOpera() {
        return motivoNoOpera;
    }

    public void setMotivoNoOpera(String motivoNoOpera) {
        this.motivoNoOpera = motivoNoOpera;
    }

    public String getAtencionParcialMotivo() {
        return atencionParcialMotivo;
    }

    public void setAtencionParcialMotivo(String atencionParcialMotivo) {
        this.atencionParcialMotivo = atencionParcialMotivo;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public String getDotacion() {
        return dotacion;
    }

    public void setDotacion(String dotacion) {
        this.dotacion = dotacion;
    }

    public LocalDateTime getFecha_envio() {
        return fecha_envio;
    }

    public void setFecha_envio(LocalDateTime fecha_envio) {
        this.fecha_envio = fecha_envio;
    }
}
