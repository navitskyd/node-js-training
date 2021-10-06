import crypto from 'crypto';

export class User {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;


    delete() {
        this.isDeleted = true;
    }


    constructor() {
        this.id = crypto.randomUUID();
        this.isDeleted = false;
    }


}



