import React from "react";
import Strings from "../../constants/strings";
import { Book } from "../../models/book";

type SearchResults = {
  message?: string;
  error?: string;
  typos: {
    [key: string]: string;
  };
  info?: {
    length: number;
    time: number;
    page: number;
    limit: number;
  };
  tokens?: {
    [key: string]: {
      [key: string]: number;
    };
  };
  data?: Array<Book>;
};

export function useSearch() {
  const [results, setResults] = React.useState<SearchResults | null>(null);
  const [isSearchComplete, setSearchComplete] = React.useState<Boolean | null>(
    null
  );

  const searchStr = async (term: String) => {
    setSearchComplete(false);
    // fetch data from api
    try {
      const url = Strings.apiSearch + "?q=" + term;
      // const url = Strings.apiBooks;
      console.log("Fetching data from: ", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });
      // console.log("response: ", response);
      const results: SearchResults = await response.json();
      // const results: SearchResults = { data: await response.json() };
      console.log("results: ", results);
      console.log(results.data?.length, " results found");
      setSearchComplete(true);
      setResults(results);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setSearchComplete(true);
    }
  };

  return [isSearchComplete, results, searchStr] as const;
}
