import React from "react";
import Strings from "../../constants/strings";
import { Book } from "../../models/book";

type SearchResults = {
  message?: string;
  token?: string;
  books?: Map<string, number>;
  data?: Array<Book>;
};

export function useSearch() {
  const [results, setResults] = React.useState<SearchResults | null>(null);
  const [isLoadingComplete, setLoadingComplete] =
    React.useState<Boolean | null>(null);

  const searchStr = async (term: String) => {
    setLoadingComplete(false);
    // fetch data from api
    try {
      // const url = Strings.apiSearch + "?q=" + term;
      const url = Strings.apiBooks;
      console.log("Fetching data from: ", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });
      // const result: SearchResults = await response.json();
      const result: SearchResults = { data: await response.json() };
      // console.log("results: ", data);
      console.log(result.data?.length, " results found");
      setLoadingComplete(true);
      setResults(result);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoadingComplete(true);
    }
  };

  return [isLoadingComplete, results, searchStr] as const;
}
