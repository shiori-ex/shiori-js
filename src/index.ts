/** @format */

import { LinkModel, SearchModel } from './models';
import { AuthenticationError } from './errors';

export class Client {
  constructor(private token: string, private endpoint: string) {}

  public links(limit: number = 100, offset: number = 0): Promise<LinkModel[]> {
    return this.get(`links?limit=${limit}&offset=${offset}`);
  }

  public link(id: string): Promise<LinkModel> {
    return this.get(`links/${id}`);
  }

  public search(
    query: string,
    limit: number = 100,
    offset: number = 0
  ): Promise<SearchModel> {
    return this.get(
      `links/search?query=${query}&limit=${limit}&offset=${offset}`
    );
  }

  public createLink(link: LinkModel): Promise<LinkModel> {
    return this.post('link', link);
  }

  public updateLink(link: LinkModel): Promise<LinkModel> {
    return this.put(`link/${link.id_str}`, link);
  }

  public removeLink(id: string): Promise<any> {
    return this.delete(`links/${id}`);
  }

  private async fetch<T>(method: string, path: string, body?: any): Promise<T> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Basic ${this.token}`);

    const res = await window.fetch(`${this.endpoint}/${path}`, {
      method,
      body: body,
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
