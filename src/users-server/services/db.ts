import { User } from '../entities/User';
import { Postgres } from './postgres';


export class Db {
    private static _instance: Db = new Db();
    private postgres: Postgres;

    private constructor() {
        console.log('Create DB service');
        this.postgres = new Postgres();
    }

    public static getInstance(): Db {
        return this._instance;
    }

    getUsersByLogin(loginSubstring: string, limit: number): Promise<User[]> {
        return this.postgres.getUsersByLogin(loginSubstring, limit);
    }

    add(user: User): Promise<any> {
        console.log(`Adding user: ${JSON.stringify(user)}`);
        return this.postgres.create(user);
    }


    getUserById(userId: string): Promise<User> {
        return this.postgres.getUserById(userId);
    }

    deleteUserById(userId: string) {
        return this.postgres.deleteUserById(userId);
    }

    markForDeleteUserById(userId: string) {
        return this.postgres.markForDeleteUserById(userId);
    }
}

