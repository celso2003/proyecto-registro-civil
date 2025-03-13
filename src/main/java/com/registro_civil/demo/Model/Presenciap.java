package com.registro_civil.demo.Model;
import org.springframework.beans.factory.annotation.Autowired;

import jakarta.persistence.*;

@Entity
@Table(name = "presenciap")
public class Presenciap {

    // Identificador único para cada presencia
    @Autowired
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_presencia")
    private Integer idPresencia ;

    // Puesto de trabajo
    @Column(name = "puesto_de_trabajo", length = 200, nullable = true)
    private String puestoDeTrabajo;

    // Tipo de trabajo
    @Column(name = "tipo_de_trabajo", length = 200, nullable = true)
    private String tipoDeTrabajo;

    // Área de trabajo
    @Column(name = "area_de_trabajo", length = 200, nullable = true)
    private String areaDeTrabajo;

    // Nombre de la estación
    @Column(name = "nombre_estacion", length = 200, nullable = true)
    private String nombreEstacion;

    // Teléfono
    @Column(name = "telefono", length = 200, nullable = true)
    private String telefono;

    // Dirección IP
    @Column(name = "direccion_ip", length = 200, nullable = false)
    private String direccionIp ;

    // Impresora
    @Column(name = "impresora", length = 200, nullable = true)
    private String impresora;

    // Usuario
    @Column(name = "usuario", length = 200, nullable = false)
    private String usuario;

    // Run del funcionario
    @Column(name = "run", length = 200, nullable = false)
    private String run;

    // Nombre del funcionario
    @Column(name = "nombre_funcionario", length = 200, nullable = false)
    private String nombreFuncionario;

    // Tipo de funcionario
    @Column(name = "tipo_funcionario", length = 200, nullable = false)
    private String tipo_funcionario;

    // Categoría del funcionario
    @Column(name = "categoria_funcionario", nullable = false)
    private int categoriaFuncionario;

    // Fecha
    @Column(name = "fecha", nullable = true)
    private String fecha;

    // Relación oficina-presenciap
    @ManyToOne
    @JoinColumn(name = "id_oficina" ) // Clave foránea
    private Oficina oficina;

    // Getters y setters para los campos de la clase
    public Integer getIdPresencia() {
        return idPresencia;
    }

    public void setIdPresencia(Integer idPresencia) {
        this.idPresencia = idPresencia;
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

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getRun() {
        return run;
    }

    public void setRun(String run) {
        this.run = run;
    }

    public String getNombreFuncionario() {
        return nombreFuncionario;
    }

    public void setNombreFuncionario(String nombreFuncionario) {
        this.nombreFuncionario = nombreFuncionario;
    }

    public String getTipo_funcionario() {
        return tipo_funcionario;
    }

    public void setTipo_funcionario(String tipo_funcionario) {
        this.tipo_funcionario = tipo_funcionario;
    }

    public int getCategoriaFuncionario() {
        return categoriaFuncionario;
    }

    public void setCategoriaFuncionario(int categoriaFuncionario) {
        this.categoriaFuncionario = categoriaFuncionario;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public Oficina getOficina() {
        return oficina;
    }

    public void setOficina(Oficina oficina) {
        this.oficina = oficina;
    }
}