import { Knex } from 'knex';
import { User } from '../entities/User';

export class Postgres {
    private knex: any | Knex<any, unknown[]>;

    constructor() {
        this.knex = require('knex')({
            client: 'pg',
            version: '7.2',
            connection: {
                host: 'hattie.db.elephantsql.com',
                port: 5432,
                user: 'qryhpedm',
                password: 'kF6vzRNHlUUXYnFQpWGJTaA964ZbU30u',
                database: 'qryhpedm'
                // },
                // pool: {
                //     afterCreate: (conn, done) => {
                //         // in this example we use pg driver's connection API
                //         conn.query('SET timezone="UTC";', (err) => {
                //             if (err) {
                //                 // first query failed, return error and don't try to make next query
                //                 done(err, conn);
                //             } else {
                //                 // do the second query...
                //                 conn.query('SELECT set_limit(0.01);', (err) => {
                //                     // if err is not falsy, connection is discarded from pool
                //                     // if connection aquire was triggered by a query the error is passed to query promise
                //                     done(err, conn);
                //                 });
                //             }
                //         });
                //     }
            },
            acquireConnectionTimeout: 5000
        });
    }

    getUsersByLogin(loginSubstring: string, limit: number): Promise<User[]> {
        const queryBuilder = this.knex('users')
            .orderBy('login')
            .limit(limit);

        if (loginSubstring) {
            return queryBuilder.where('login', 'like', `%${loginSubstring}%`);
        }

        return queryBuilder;
    }

    create(user: User): Promise<any> {
        return this.knex('users').insert({
            id: user.id,
            login: user.login,
            age: user.age,
            password: user.password,
            isDeleted: false
        });
    }

    getUserById(userId: string): Promise<User> {
        return this.knex('users').where({ id: userId }).first();
    }

    deleteUserById(userId: string) {
        return this.knex('users').where({ id: userId }).del();
    }

    markForDeleteUserById(userId: string) {
        return this.knex('users').where({ id: userId }).update({ isDeleted: true });
    }
}
