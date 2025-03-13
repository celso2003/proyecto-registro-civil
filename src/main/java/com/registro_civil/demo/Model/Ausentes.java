package com.registro_civil.demo.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "ausentes")
public class Ausentes {

    // Identificador único para cada ausente
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ausente")
    private Integer idAusente;

    // Run del ausente
    @Column(name = "run")
    private Integer run;

    // Tipo de ausentismo, no puede ser nulo y tiene un máximo de 200 caracteres
    @Column(name = "tipo_ausentismo", length = 200, nullable = false)
    private String tipoAusentismo;

    // Observaciones sobre el ausentismo, no puede ser nulo y tiene un máximo de 4000 caracteres
    @Column(name = "observaciones", length = 4000, nullable = false)
    private String observaciones;

    // Fecha de término del ausentismo, no puede ser nulo
    @Column(name = "fecha_termino", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaTermino;

    // Fecha de inicio del ausentismo, no puede ser nulo
    @Column(name = "fecha_inicio", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fechaInicio;

    // Nombre del ausente, no puede ser nulo y tiene un máximo de 100 caracteres
    @Column(name = "nombre", length = 100, nullable = false)
    private String nombre;

    // Otro dato del ausente, puede ser nulo y tiene un máximo de 100 caracteres
    @Column(name = "otro", length = 100, nullable = true)
    private String otro;

    // Apellido paterno del ausente, no puede ser nulo y tiene un máximo de 100 caracteres
    @Column(name = "apellidoPaterno", length = 100, nullable = false)
    private String apellidoPaterno;

    // Apellido materno del ausente, no puede ser nulo y tiene un máximo de 100 caracteres
    @Column(name = "apellidoMaterno", length = 100, nullable = false)
    private String apellidoMaterno;

    // Oficina del ausente, puede ser nulo y tiene un máximo de 100 caracteres
    @Column(name = "oficina", length = 100, nullable = true)
    private String oficina;

    // Fecha de envío del ausentismo, puede ser nulo
    @Column(name = "fecha_envio", nullable = true)
    private LocalDateTime fecha_envio;

    // Nueva relación con Funcionario
    @ManyToOne
    @JoinColumn(name = "id_funcionario", referencedColumnName = "run")
    private Funcionario funcionario;

    // Getters y setters para los campos de la clase
    public Integer getIdAusente() {
        return idAusente;
    }

    public void setIdAusente(Integer idAusente) {
        this.idAusente = idAusente;
    }

    public Integer getRun() {
        return run;
    }

    public void setRun(Integer run) {
        this.run = run;
    }

    public String getTipoAusentismo() {
        return tipoAusentismo;
    }

    public void setTipoAusentismo(String tipoAusentismo) {
        this.tipoAusentismo = tipoAusentismo;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Date getFechaTermino() {
        return fechaTermino;
    }

    public void setFechaTermino(Date fechaTermino) {
        this.fechaTermino = fechaTermino;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getOtro() {
        return otro;
    }

    public void setOtro(String otro) {
        this.otro = otro;
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

    public String getOficina() {
        return oficina;
    }

    public void setOficina(String oficina) {
        this.oficina = oficina;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    public LocalDateTime getFecha_envio() {
        return fecha_envio;
    }

    public void setFecha_envio(LocalDateTime fecha_envio) {
        this.fecha_envio = fecha_envio;
    }

}
