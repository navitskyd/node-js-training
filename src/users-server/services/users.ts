import { User } from '../entities/User';
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

    getUsersByLogin(loginSubstring: string, limit: number): Promise<User[]> {
        limit = limit || 5;
        return dbService.getUsersByLogin(loginSubstring, limit);
    }

    findUserByID(id: string): Promise<User> {
        return dbService.getUserById(id);
    }

    createUser(user: User): Promise<User> {
        return dbService.add(user);
    }

    deleteUser(userId: string) {
        return dbService.deleteUserById(userId);
    }

    convertObject(body: any): User {
        const user = new User();
        user.login = body.login;
        user.age = body.age;
        user.password = body.password;
        return user;
    }

    markForDeleteUser(userId: string) {
        return dbService.markForDeleteUserById(userId);
    }
}
