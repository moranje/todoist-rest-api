import got, { Got } from 'got';
import uuid from 'uuid';
import stringify from 'fast-safe-stringify';
import { ResourceType } from './types';

export const TODOIST_API_URI = 'https://api.todoist.com/rest/v1';

export default class RESTAdapter<T, V> {
  /**
   * The resource type.
   */
  type: ResourceType;

  /**
   * The todoist api url
   */
  uri: string;

  /**
   * The API token.
   */
  token: string;

  /**
   * A pre-configured got instance
   */
  client: Got;

  public constructor(type: ResourceType, token: string, uri: string = TODOIST_API_URI) {
    this.type = type;
    this.uri = uri;
    this.token = token;
    this.client = got.extend({
      prefixUrl: uri,
      responseType: 'json',
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Request-Id': uuid(),
      },
    });

    if (type == null) {
      throw new Error(`Expected the first argument to be a resource type was ${type}`);
    }

    if (token == null) {
      throw new Error(`Expected the second argument to be an API token was ${token}`);
    }
  }

  /**
   * Returns a JSON object containing a REST resource object related to the given
   * id.
   */
  public async find(id: number): Promise<T> {
    const { body }: { body: T } = await this.client.get(`${this.type}s/${id}`);

    return body;
  }

  /**
   * Returns a JSON-encoded array containing all REST resources
   */
  public async findAll({}): Promise<T[]>;
  public async findAll(): Promise<T[]> {
    const { body }: { body: T[] } = await this.client.get(`${this.type}s`);

    return body;
  }

  /**
   * Creates a new REST resource and returns the JSON object according for it
   */
  public async create(data: V): Promise<T> {
    const { body }: { body: T } = await this.client.post(`${this.type}s`, {
      json: data,
    });

    return body;
  }

  /**
   * Updates the REST resource for the given id and returns true when the
   * request is successful
   */
  public async update(id: number, data: V): Promise<boolean> {
    const response = await this.client.post(`${this.type}s/${id}`, { json: data });

    if (response.statusCode !== 204)
      throw new Error(
        `The update probably was not successful, but no error status code was returned from Todoist\n\n${stringify(
          response,
        )}`,
      );

    return true;
  }

  /**
   * Deletes a REST resource and returns an empty response.
   */
  public async remove(id: number): Promise<boolean> {
    const response = await this.client.delete(`${this.type}s/${id}`);

    if (response.statusCode !== 204)
      throw new Error(
        `The deletion probably was not successful, but no error status code was returned from Todoist\n\n${stringify(
          response,
        )}`,
      );

    return true;
  }
}
