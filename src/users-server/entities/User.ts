import crypto from 'crypto';

export class User {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;

    delete(): void {
        this.isDeleted = true;
    }


    constructor() {
        this.id = crypto.randomUUID();
        this.isDeleted = false;
        this.login = '';
        this.password = '';
        this.age = -1;
    }
}
