/** @format */

import { LinkModel, SearchModel } from './models';
import { AuthenticationError } from './errors';

/**
 * HTTP request client which holds a token and endpoint
 * to perform REST API requests to a shiori API instance.
 */
export class Client {
  /**
   * Initialize a new instance of Client.
   * @param token basic authorization token
   * @param endpoint REST API endpoint
   */
  constructor(private token: string, private endpoint: string) {}

  /**
   * Returns a list of links.
   * @param limit limit of results
   * @param offset offset of the result list
   */
  public links(limit: number = 100, offset: number = 0): Promise<LinkModel[]> {
    return this.get(`links?limit=${limit}&offset=${offset}`);
  }

  /**
   * Returns a link by its ID.
   * @param id link ID
   */
  public link(id: string): Promise<LinkModel> {
    return this.get(`links/${id}`);
  }

  /**
   * Returns a result list of links of a
   * full text search through them.
   * @param query search query
   * @param limit limit of results
   * @param offset offset of the result list
   */
  public search(
    query: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<SearchModel> {
    return this.get(
      `links/search?query=${query}&limit=${limit}&offset=${offset}`
    );
  }

  /**
   * Create a link.
   * @param link link object
   */
  public createLink(link: LinkModel): Promise<LinkModel> {
    return this.post('links', link);
  }

  /**
   * Update an existent link by its ID.
   * The link object is rather replaced than updated. Empty
   * fields are considered as set to `null`.
   * @param link link object
   */
  public updateLink(link: LinkModel): Promise<LinkModel> {
    return this.put(`links/${link.id_str}`, link);
  }

  /**
   * Remove a link by its ID.
   * @param id link ID
   */
  public removeLink(id: string): Promise<any> {
    return this.delete(`links/${id}`);
  }

  ////////////////////////////////////////////////////////////////////////////////
  ///// PRIVATE FUNCTIONS /////

  private async fetch<T>(method: string, path: string, body?: any): Promise<T> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Basic ${this.token}`);

    const res = await window.fetch(`${this.endpoint}/${path}`, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers,
      credentials: 'include',
    });

    const data = await res.json();

    if (res.status === 401) {
      throw new AuthenticationError();
    }

    if (!res.ok) {
      throw new Error(data);
    }

    return data as T;
  }

  private get<T>(path: string): Promise<T> {
    return this.fetch('GET', path);
  }

  private post<T>(path: string, body: any): Promise<T> {
    return this.fetch('POST', path, body);
  }

  private put<T>(path: string, body: any): Promise<T> {
    return this.fetch('PUT', path, body);
  }

  private delete<T>(path: string): Promise<T> {
    return this.fetch('DELETE', path);
  }
}
