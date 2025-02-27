import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  constructor() {}

  search(query: string): string {
    return `Search results for query: ${query}`;
  }
}
