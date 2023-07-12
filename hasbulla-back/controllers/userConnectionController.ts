import { DB } from "../models/BDconfig/DB";
import { UserModel } from "../models/UserModel";

export class userConnectionController {
    private usersLog: UserModel[] = [];

    public connectUser(user: UserModel | null, password: string): boolean {
        if (user === null || this.usersLog.indexOf(user) !== -1 || user.getPassword() !== password){
            return false;
        }
        this.usersLog.push(user);
        return true
    }

    public desconnectUser(user: UserModel){
        this.usersLog = this.usersLog.filter(u => u.getId() !== user.getId());
    }

    public getUsers(): UserModel[] {
        return this.usersLog;
    }

    public addNewUser(user: UserModel, db: DB){
        db.createUser(user).then(data => {
            if (data) {
                console.log("Se creo correctamente el usuario")
            }
        }).catch(error => console.error("Error al intentar crear un usuario: ", user.getUsername(), user.getId()))
    }
}