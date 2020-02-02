import RestAdapter from './rest-adapter';
import { GetResourceByName } from './types';

export default class CommentAdapter<Name> extends RestAdapter<Name> {
  public constructor(type: Name, token: string) {
    super(type, token);
  }

  /**
   * Returns JSON-encoded array of all comments for a given task_id or
   * project_id. Note that the parent argument is required.
   */
  public async findAll({
    id,
    parent,
  }: {
    id: number;
    parent: 'task' | 'project';
  }): Promise<GetResourceByName<Name>[]> {
    const { body }: { body: GetResourceByName<Name>[] } = await this.client.get(
      `${this.type}s?${parent}_id=${id}`,
    );

    return body;
  }
}
