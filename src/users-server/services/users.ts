import {User} from "../entities/User";
import {Db} from "./db";

const dbService = Db.instance;

export class UserService {
    public static _instance: UserService = new UserService();

    private constructor() {
    }

    public static getInstance(): UserService {
        return this._instance;
    }

    getAutoSuggestUsers(loginSubstring: string, limit: number): User[] {
        let result = dbService.users;
        if (loginSubstring) {
            result = result
                .sort((a, b) => a.login > b.login ? 1 : -1)
                .filter(user => user.login.indexOf(loginSubstring) >= 0);
        }
        limit = limit || 5;
        return result.slice(0, limit);
    }

    findUserByID(id: string): User {
        return dbService.getUserById(id);
    }

    getAll(): User[] {
        return dbService.users;
    }

    createUser(user: User): User {
        return dbService.add(user) ? user : null;
    }

    deleteUser(userId: string) {
        let userById = dbService.getUserById(userId);
        userById && userById.delete();
        return userById;
    }

    convertObject(body: any) {
        let user = new User();
        user.login = body.login;
        user.age = body.age;
        user.password = body.password;
        return user;
    }
}