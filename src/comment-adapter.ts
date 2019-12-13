import Adapter from './rest-adapter';
import { TodoistComment, TodoistCommentOptions } from './types';

export default class CommentAdapter extends Adapter<TodoistComment, TodoistCommentOptions> {
  public constructor(token: string) {
    super('comment', token);
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
  }): Promise<TodoistComment[]> {
    const { body }: { body: TodoistComment[] } = await this.client.get(
      `${this.type}s?${parent}_id=${id}`,
    );

    return body;
  }
}
