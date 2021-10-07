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

    getAutoSuggestUsers(loginSubstring: string | undefined, limit: number): User[] {
        let result = dbService.getUsers();
        if (loginSubstring) {
            result = result
                .filter(user => user.login.includes(loginSubstring))
                .sort((a, b) => a.login > b.login ? 1 : -1);
        }
        limit = limit || 5;
        return result.slice(0, limit);
    }

    findUserByID(id: string): User | null {
        return dbService.getUserById(id);
    }

    getAll(): User[] {
        return dbService.getUsers();
    }

    createUser(user: User): User | null {
        return dbService.add(user) ? user : null;
    }

    deleteUser(userId: string): User | null {
        const userById = dbService.getUserById(userId);
        userById && userById.delete();
        return userById;
    }

    convertObject(body:User): User {
        const user = new User();
        user.login = body.login;
        user.age = body.age;
        user.password = body.password;
        return user;
    }
}
