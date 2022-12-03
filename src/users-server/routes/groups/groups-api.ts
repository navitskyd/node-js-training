import { GroupService } from '../../services/group-service';
import { Base } from '../base';
import { Group } from '../../entities/group';
import { Application } from 'express';

const groupService = GroupService.getInstance();
const ROOT_URL = '/';
const GROUP_URL = `${ROOT_URL}:groupId`;

export default class ApiGroupsRoute extends Base {
    constructor(app: Application, basePath: string) {
        super(app, basePath);
    }
    registerResources(): void {
        this.getRouter()
            .get(ROOT_URL,  async (req, res) => {
                const groupsList = await groupService.get();
                res.send(groupsList);
            })
            .post(ROOT_URL,  async (req, res) => {
                const group: Group = {
                    id: req.body.id,
                    name: req.body.name,
                    permissions: req.body.permissions
                };
                let created: any = null;
                try {
                    created = await groupService.create(group)
                        .catch((err) => {
                            res.status(409).json(`Group was not created: ${err}`);
                        });
                } catch (err) {
                    res.status(409).json(`ERROR: Group was not created: ${err}`);
                }

                if (created) {
                    if (created.rowCount === 1) {
                        res.send(`Group ${group.id} created.`);
                    } else {
                        res.status(409).json(`Unexpected result: ${JSON.stringify(created)}`);
                    }
                }
            })
            .put(GROUP_URL, async (req, res) => {
                await groupService.update(req.params['groupId'], req.body);
                res.send('updated');
            })
            .delete(GROUP_URL, async (req, res) => {
                await groupService.delete(req.params['groupId']);
                res.send('updated');
            })
            .get(GROUP_URL, async (req, res) => {
                const group = await groupService.get(req.params.id);
                if (group) {
                    res.send(group);
                } else {
                    res.status(404).json('Group was not found');
                }
            })
            .delete(GROUP_URL, async (req, res) => {
                const id = req.params.id;
                const deleteOperation = await groupService.delete(id);
                if (deleteOperation === 1) {
                    res.send(`Group with id ${id} was deleted.`);
                } else {
                    res.status(409).json(`Group(s) with id ${id} were not found or already deleted: ${deleteOperation}`);
                }
            });
    }
}
