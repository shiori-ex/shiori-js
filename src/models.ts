/** @format */

export interface LinkModel {
  id_str: string;
  url: string;
  description: string;
  tags: string[];
}

export interface SearchModel {
  hits: LinkModel[];
  query: string;
  processing_time_ms: number;
}
