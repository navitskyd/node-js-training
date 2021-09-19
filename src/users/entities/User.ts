import crypto from 'crypto';

export class User {
    id: string = crypto.randomUUID();
    login: string;
    password: string;
    age: number;
    isDeleted: boolean = false;

    delete() {
        this.isDeleted = true;
    }
}



