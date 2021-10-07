import { User } from '../entities/user';
import { Db } from './db';

const dbService = Db.getInstance();

export class UserService {
    public static _instance: UserService = new UserService();

    private constructor() {
        console.log('Create User service');
    }

    public static getInstance(): UserService {
        return this._instance;
    }

    findByLogin(loginSubstring: string, limit: number): Promise<User[]> {
        limit = limit || 5;
        return dbService.getUsersByLogin(loginSubstring, limit);
    }

    findByID(id: string): Promise<User> {
        return dbService.getUserById(id);
    }

    create(user: User): Promise<any> {
        return dbService.add(user);
    }

    delete(userId: string) {
        return dbService.deleteUserById(userId);
    }

    convert(customObject: User): User {
        const user = new User();
        user.login = customObject.login;
        user.age = customObject.age;
        user.password = customObject.password;
        return user;
    }

    markForDelete(userId: string) {
        return dbService.markForDeleteUserById(userId);
    }
}
