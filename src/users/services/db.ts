import {User} from "../entities/User";

export class Db {
    private static _instance: Db = new Db();

    private constructor() {
    }

    public static get instance(): Db {
        return this._instance;
    }

    private _users: User[] = [];
    private ids: string[] = [];

    get users(): User[] {
        return this._users;
    }

    add(user: User) {
        this._users.push(user);
        this.ids.push(user.id);
        return Math.random() > 0.5;
    }

    getUserById(userId: string): User {
        let index = this.ids.indexOf(userId);
        if (index >= 0) {
            return this._users[index];
        }
        return null;
    }
}

