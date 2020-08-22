/** @format */

/**
 * Request/Response model of a link object.
 */
export interface LinkModel {
  id_str: string;
  url: string;
  description: string;
  tags: string[];
}

/**
 * Response model of a search request.
 */
export interface SearchModel {
  hits: LinkModel[];
  query: string;
  processing_time_ms: number;
}
