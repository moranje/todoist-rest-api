import stringify from 'fast-safe-stringify';
import got, { GeneralError, Got, HTTPError } from 'got';
import status from 'http-status';
import uuid from 'uuid';

import { GetResourceByName, GetResourceOptionsByName } from './types';

export const TODOIST_API_URI = 'https://api.todoist.com/rest/v1';

export default class RESTAdapter<Name> {
  /**
   * The resource type.
   */
  type: Name;

  /**
   * The todoist api url.
   */
  uri: string;

  /**
   * The API token.
   */
  token: string;

  /**
   * A pre-configured got instance.
   */
  client: Got;

  public constructor(type: Name, token: string, uri: string = TODOIST_API_URI) {
    if (type == null) {
      throw new Error(
        `Expected the first argument to be a resource type was ${type}`,
      );
    }

    if (token == null) {
      throw new Error(
        `Expected the second argument to be an API token was ${token}`,
      );
    }

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
      hooks: {
        beforeError: [
          /* istanbul ignore next */
          (error: GeneralError): GeneralError => {
            const { response } = error as HTTPError;
            if (response && response.body) {
              error.name = 'TodoistError';
              error.message = `${response.body} (${response.statusCode} ${
                // @ts-ignore incomplete type definition
                status[response.statusCode]
                // @ts-ignore incomplete type definition
              }, ${status[response.statusCode + '_MESSAGE']})`;
            }

            return error;
          },
        ],
      },
    });
  }

  /**
   * Returns a JSON object containing a REST resource object related to the given
   * id.
   *
   * @param id The resource id.
   */
  public async find(id: number): Promise<GetResourceByName<Name>> {
    const { body }: { body: GetResourceByName<Name> } = await this.client.get(
      `${this.type}s/${id}`,
    );

    return body;
  }

  /**
   * Returns a JSON-encoded array containing all REST resources.
   *
   * @param options The query options.
   */
  // @ts-ignore
  public async findAll(options: any): Promise<GetResourceByName<Name>[]> {
    const {
      body,
    }: {
      body: GetResourceByName<Name>[];
    } = await this.client.get(`${this.type}s`);

    return body;
  }

  /**
   * Creates a new REST resource and returns the JSON object according for it.
   *
   * @param data The resource data.
   */
  public async create(
    data: GetResourceOptionsByName<Name>,
  ): Promise<GetResourceByName<Name>> {
    const {
      body,
    }: {
      body: GetResourceByName<Name>;
    } = await this.client.post(`${this.type}s`, {
      json: data,
    });

    return body;
  }

  /**
   * Updates the REST resource for the given id and returns true when the
   * request is successful.
   *
   * @param id The resource id.
   * @param data The resource data.
   */
  public async update(
    id: number,
    data: GetResourceOptionsByName<Name>,
  ): Promise<boolean> {
    const response = await this.client.post(`${this.type}s/${id}`, {
      json: data,
    });

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
   *
   * @param id The resource id.
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
