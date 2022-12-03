import { User } from '../entities/user';
import { Postgres } from './postgres';

export class UserService {
    public static _instance: UserService = new UserService();
    private postgres: Postgres;

    private constructor() {
        console.log('Create User service');
        this.postgres = new Postgres();
    }

    public static getInstance(): UserService {
        return this._instance;
    }

    findByLogin(loginSubstring: string, limit: number): Promise<User[]> {
        limit = limit || 5;
        return this.postgres.getUsersByLogin(loginSubstring, limit);
    }

    findByID(id: string): Promise<User> {
        return this.postgres.getUserById(id);
    }

    create(user: User): Promise<User> {
        console.log(`Adding user: ${JSON.stringify(user)}`);
        return this.postgres.create(user);
    }

    delete(userId: string) {
        return this.postgres.deleteUserById(userId);
    }

    convert(customObject: User): User {
        const user = new User();
        user.login = customObject.login;
        user.age = customObject.age;
        user.password = customObject.password;
        return user;
    }

    markForDelete(userId: string) {
        return this.postgres.markForDeleteUserById(userId);
    }
}
