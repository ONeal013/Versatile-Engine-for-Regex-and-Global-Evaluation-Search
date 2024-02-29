const apiBaseUrl = "http://localhost:3000/";
// const apiBaseUrl = "https://7054-81-250-245-205.ngrok-free.app/";
const Strings = {
  apiBaseUrl: apiBaseUrl,
  apiBooks: apiBaseUrl + "books/",
  apiSearch: apiBaseUrl + "books/search",
  apiSearchAdvanced: apiBaseUrl + "books/advanced-search",
  apiAuthors: apiBaseUrl + "authors/",
  apiAuthorBooks: apiBaseUrl + "authors/books",
  apiAuthorSearch: apiBaseUrl + "authors/search/",
  apiAuthorSug: apiBaseUrl + "authors/similar/",
  apiSugBook: apiBaseUrl + "suggestions/",
  apiBookCover_: (id: number, size: "small" | "medium" = "medium") =>
    `https://www.gutenberg.org/cache/epub/${id}/pg${id}.cover.${size}.jpg`,

  authors: "Authors",
  subjects: "Subjects",
  unknown: "Unknown",
  birthYear: "Birth year",
  deathYear: "Death year",

  search: "Search",
};

export default Strings;
