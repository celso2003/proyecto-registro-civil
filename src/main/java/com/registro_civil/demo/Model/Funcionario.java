package com.registro_civil.demo.Model;
import java.sql.Date;
import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "funcionario")
public class Funcionario {

    // Identificador único para cada funcionario
    @Id
    @Column(name = "run")
    private Integer run;

    // Nombre del funcionario
    @Column(name = "nombre", nullable = true, length = 100)
    private String nombre;

    // Apellido paterno del funcionario
    @Column(name = "apellido_paterno", nullable = true, length = 100)
    private String apellidoPaterno;

    // Apellido materno del funcionario
    @Column(name = "apellido_materno", nullable = true, length = 100)
    private String apellidoMaterno;

    // Contraseña del funcionario
    @Column(name = "contraseña", nullable = true, length = 30)
    private String contraseña;

    // Calidad jurídica del funcionario
    @Column(name = "calidad_jurídica", nullable = true, length = 100)
    private String calidad_jurídica;

    // Sigla de la unidad laboral del funcionario
    @Column(name = "sigla_unidad_laboral", nullable = true, length = 100)
    private String sigla_unidad_laboral;

    // Fecha de nacimiento del funcionario
    @Column(name = "fecha_nacimiento")
    @Temporal(TemporalType.DATE)
    private Date fecha_nacimiento;

    // Edad del funcionario
    @Column(name = "edad")
    private Integer edad;

    // Resolución exenta del funcionario
    @Column(name = "resolución_exenta", nullable = true, length = 12)
    private String resolución_exenta;

    // Fecha de resolución exenta del funcionario
    @Column(name = "fecha_resolucion_exenta")
    @Temporal(TemporalType.DATE)
    private Date fecha_resolucion_exenta;

    // Fecha de inicio del funcionario
    @Column(name = "desde")
    @Temporal(TemporalType.DATE)
    private Date desde;

    // Fecha de término del funcionario
    @Column(name = "hasta")
    @Temporal(TemporalType.DATE)
    private Date hasta;

    // Estado del funcionario
    @Column(name = "estado", nullable = true, length = 12)
    private String estado;

    // Celular particular del funcionario
    @Column(name = "celular_particular")
    private Integer celular_particular;

    // Teléfono de oficina del funcionario
    @Column(name = "fono_oficina")
    private Integer fono_oficina;

    // Email institucional del funcionario
    @Column(name = "email_institucional", nullable = true, length = 100)
    private String email_institucional;

    // Email personal del funcionario
    @Column(name = "email_personal", nullable = true, length = 100)
    private String email_personal;

    // Calificación del funcionario
    @Column(name = "calificacion", nullable = true, length = 7)
    private int calificacion;

    // Tipo de funcionario
    @Column(name = "tipo_funcionario", nullable = true, length = 200)
    private String tipo_funcionario;

    // Relación con rol
    @ManyToOne
    @JoinColumn(name = "id_rol")
    private Rol rol;

    // Relación entre cargo y funcionario
    @ManyToOne
    @JoinColumn(name = "id_cargo", referencedColumnName = "id_cargo") // Clave foránea
    private Cargo cargo;

    // Relación entre área y funcionario
    @ManyToOne
    @JoinColumn(name = "id_area", referencedColumnName = "id_area") // Clave foránea
    private Area area;

    // Relación entre apodo y funcionario
    @OneToOne
    @JoinColumn(name = "id_apodo", referencedColumnName = "id_apodo") // Corrección del nombre de la columna
    private Apodo apodo;

    // Relación entre oficina y funcionario
    @ManyToOne
    @JoinColumn(name = "id_unidad_laboral", referencedColumnName = "id_oficina") // Clave foránea
    private Oficina oficina;

    // Relación con ausentes
    @OneToMany(mappedBy = "funcionario")
    private List<Ausentes> ausentes;

    // Getters y setters para los campos de la clase
    public Integer getRun() {
        return run;
    }

    public void setRun(Integer run) {
        this.run = run;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
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

    public String getContraseña() {
        return contraseña;
    }

    public void setContraseña(String contraseña) {
        this.contraseña = contraseña;
    }

    public String getCalidad_jurídica() {
        return calidad_jurídica;
    }

    public void setCalidad_jurídica(String calidad_jurídica) {
        this.calidad_jurídica = calidad_jurídica;
    }

    public String getSigla_unidad_laboral() {
        return sigla_unidad_laboral;
    }

    public void setSigla_unidad_laboral(String sigla_unidad_laboral) {
        this.sigla_unidad_laboral = sigla_unidad_laboral;
    }

    public Date getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    public void setFecha_nacimiento(Date fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }

    public Integer getEdad() {
        return edad;
    }

    public void setEdad(Integer edad) {
        this.edad = edad;
    }

    public String getResolución_exenta() {
        return resolución_exenta;
    }

    public void setResolución_exenta(String resolución_exenta) {
        this.resolución_exenta = resolución_exenta;
    }

    public Date getFecha_resolucion_exenta() {
        return fecha_resolucion_exenta;
    }

    public void setFecha_resolucion_exenta(Date fecha_resolucion_exenta) {
        this.fecha_resolucion_exenta = fecha_resolucion_exenta;
    }

    public Date getDesde() {
        return desde;
    }

    public void setDesde(Date desde) {
        this.desde = desde;
    }

    public Date getHasta() {
        return hasta;
    }

    public void setHasta(Date hasta) {
        this.hasta = hasta;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getCelular_particular() {
        return celular_particular;
    }

    public void setCelular_particular(Integer celular_particular) {
        this.celular_particular = celular_particular;
    }

    public Integer getFono_oficina() {
        return fono_oficina;
    }

    public void setFono_oficina(Integer fono_oficina) {
        this.fono_oficina = fono_oficina;
    }

    public String getEmail_institucional() {
        return email_institucional;
    }

    public void setEmail_institucional(String email_institucional) {
        this.email_institucional = email_institucional;
    }

    public String getEmail_personal() {
        return email_personal;
    }

    public void setEmail_personal(String email_personal) {
        this.email_personal = email_personal;
    }

    public int getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(int calificacion) {
        this.calificacion = calificacion;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public Apodo getApodo() {
        return apodo;
    }

    public void setApodo(Apodo apodo) {
        this.apodo = apodo;
    }

    public Oficina getOficina() {
        return oficina;
    }

    public void setOficina(Oficina oficina) {
        this.oficina = oficina;
    }

    public List<Ausentes> getAusentes() {
        return ausentes;
    }

    public void setAusentes(List<Ausentes> ausentes) {
        this.ausentes = ausentes;
    }

    public String getTipo_funcionario() {
        return tipo_funcionario;
    }

    public void setTipo_funcionario(String tipo_funcionario) {
        this.tipo_funcionario = tipo_funcionario;
    }
}
