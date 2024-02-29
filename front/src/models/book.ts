import { Author } from "./author";

// Book model
export interface Book {
  _id: string;
  id: number;
  title: string;
  authors: Author[];
  translators: Author[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  formats: {
    [key: string]: string;
  };
}
