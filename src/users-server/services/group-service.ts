import { Postgres } from './postgres';
import { Group } from '../entities/group';

export class GroupService {
    public static _instance: GroupService = new GroupService();
    private postgres: Postgres;

    private constructor() {
        console.log('Create Group service');
        this.postgres = new Postgres();
    }

    public static getInstance(): GroupService {
        return this._instance;
    }

    get(id?: string): Promise<Group | Group[]> {
        return id
            ? this.postgres.getGroupById(id)
            : this.postgres.getAllGroups();
    }

    create(group: Group): Promise<any> {
        console.log(`Creating group: ${JSON.stringify(group)}`);
        return this.postgres.createGroup(group);
    }

    update(id: string, group: Group): Promise<any> {
        console.log(`Updating group ${id}: ${JSON.stringify(group)}`);
        return this.postgres.updateGroup(id, group);
    }

    delete(id: string) {
        return this.postgres.deleteGroupById(id);
    }

    addUsers(groupId: string, usersIds: string[]) :Promise<any> {
        return this.postgres.addUsers(groupId, usersIds);
    }
}
