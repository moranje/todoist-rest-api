import stringify from 'fast-safe-stringify';
import queryString from 'query-string';

import RestAdapter from './rest-adapter';
import { GetResourceByName } from './types';

export default class TaskAdapter<Name extends 'task'> extends RestAdapter<
  Name
> {
  public constructor(type: Name, token: string) {
    super(type, token);
  }

  /**
   * Returns a JSON-encoded array containing all user active tasks.
   *
   * @param options The query options.
   */
  public async findAll(options?: {
    project_id?: number;
    label_id?: number;
    filter?: string;
    lang?: string;
  }): Promise<GetResourceByName<Name>[]> {
    const query = options ? queryString.stringify(options) : '';
    const {
      body,
    }: {
      body: GetResourceByName<Name>[];
    } = await this.client.get(`${this.type}s?${query}`);

    return body;
  }

  /**
   * Closes a task and returns true if the request succeeded.
   *
   * The command does exactly what official clients do when you close a task. Regular tasks are completed and moved to history, subtasks are checked (marked as done, but not moved to history), recurring tasks are moved forward (due date is updated).
   *
   * @param id The task id.
   */
  public async close(id: number): Promise<boolean> {
    const response = await this.client.post(
      `${this.type}s/${id.toString()}/close`,
    );

    if (response.statusCode !== 204)
      throw new Error(
        `The task probably wasn't closed, but no error status code was returned from Todoist\n\n${stringify(
          response,
        )}`,
      );

    return true;
  }

  /**
   * Reopens a task and returns true if the request succeeded.
   *
   * This command reopens a previously closed task. Works both with checked tasks in the user’s workspace and tasks moved to history. The behaviour varies for different types of tasks (the command follows the behaviour of official clients when tasks are uncompleted or extracted from the history).
   *
   * - Regular tasks are extracted from the history and added back to the user workspace as normal unchecked tasks (without their subtasks though).
   * - Completed subtasks of a non-completed task are simply marked as uncompleted.
   * - Subtasks that were moved to history are added back to the workspace as first-level tasks.
   * - Non-completed recurring tasks are ignored.
   *
   * @param id The task id.
   */
  public async reopen(id: number): Promise<boolean> {
    const response = await this.client.post(
      `${this.type}s/${id.toString()}/reopen`,
    );

    if (response.statusCode !== 204)
      throw new Error(
        `The task probably wasn't reopened, but no error status code was returned from Todoist\n\n${stringify(
          response,
        )}`,
      );

    return true;
  }
}
