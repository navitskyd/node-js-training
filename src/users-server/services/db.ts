import { User } from '../entities/User';

export class Db {
    private static _instance: Db = new Db();

    private constructor() {
        console.log('Create DB service');
    }

    public static getInstance(): Db {
        return this._instance;
    }

    private _users: User[] = [];
    private ids: string[] = [];

    getUsers(): User[] {
        return this._users;
    }

    add(user: User) :boolean {
        console.log(`Adding user: ${JSON.stringify(user)}`);

        this._users.push(user);
        this.ids.push(user.id);
        console.log(`Total users: ${this._users.length}`);
        return true;
    }

    getUserById(userId: string): User | null {
        const index = this.ids.indexOf(userId);
        if (index >= 0) {
            return this._users[index];
        }
        return null;
    }
}

