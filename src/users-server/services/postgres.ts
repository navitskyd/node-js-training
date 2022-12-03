import { User } from '../entities/user';
import { Group } from '../entities/group';
import knexLib from 'knex';

const knex = knexLib({
    client: 'pg',
    version: '7.2',
    connection: {
        host: 'hattie.db.elephantsql.com',
        port: 5432,
        user: 'qryhpedm',
        password: 'kF6vzRNHlUUXYnFQpWGJTaA964ZbU30u',
        database: 'qryhpedm'
    },
    pool: {
        min: 0,
        max: 5
        // afterCreate: ({ conn, done }: { conn: any, done: any }) => {
        //     console.log(`Connection ${conn} created!`);
        //     // in this example we use pg driver's connection API
        //     conn.query('SET timezone="UTC";', ({ err }: any) => {
        //         if (err) {
        //             // first query failed, return error and don't try to make next query
        //             done(err, conn);
        //         } else {
        //             // do the second query...
        //             conn.query('SELECT set_limit(0.01);', ({ err2 }: any) => {
        //                 // if err is not falsy, connection is discarded from pool
        //                 // if connection aquire was triggered by a query the error is passed to query promise
        //                 done(err2, conn);
        //             });
        //         }
        //     });
        // }
    },
    acquireConnectionTimeout: 5000
});

export class Postgres {
    getUsersByLogin(loginSubstring: string, limit: number): Promise<User[]> {
        const queryBuilder = knex('users')
            .orderBy('login')
            .limit(limit);

        if (loginSubstring) {
            return queryBuilder.where('login', 'like', `%${loginSubstring}%`);
        }

        return queryBuilder;
    }

    create(user: User): Promise<any> {
        return knex('users').insert({
            id: user.id,
            login: user.login,
            age: user.age,
            password: user.password,
            isDeleted: false
        });
    }

    getUserById(userId: string): Promise<User> {
        return knex('users').where({ id: userId }).first();
    }

    deleteUserById(userId: string) {
        return knex('users').where({ id: userId }).del();
    }

    markForDeleteUserById(userId: string) {
        return knex('users').where({ id: userId, isDeleted: false }).update({ isDeleted: true });
    }

    deleteGroupById(id: string) {
        return knex('groups').where({ id }).del();
    }

    createGroup(group: Group): Promise<any> {
        return knex('groups').insert({
            id: group.id,
            name: group.name,
            permissions: group.permissions
        });
    }

    updateGroup(id: string, group: Group) {
        return knex('groups').update({
            name: group.name,
            permissions: group.permissions
        }).where('id', id);
    }

    getGroupById(id: string): Promise<Group> {
        return knex('groups').where({ id }).first();
    }

    getAllGroups(): Promise<Group[]> {
        return knex('groups');
    }
}
