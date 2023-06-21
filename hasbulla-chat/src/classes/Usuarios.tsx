class Usuarios {

    private nombreDeUsuario: string;
    private nombre: string;

    public constructor(nombre: string, nombreDeUsuario: string){
        this.nombreDeUsuario = nombreDeUsuario;
        this.nombre = nombre;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getId(): string {
        return this.nombreDeUsuario;
    }
}