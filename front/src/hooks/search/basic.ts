import React from "react";
import Strings from "../../constants/strings";
import { Book } from "../../models/book";

export function useSearch() {
  const [results, setResults] = React.useState<{
    message: String;
    data: Array<Book> | null;
  } | null>(null);
  const [isLoadingComplete, setLoadingComplete] =
    React.useState<Boolean | null>(null);

  const searchStr = async (term: String) => {
    setLoadingComplete(false);
    // fetch data from api
    try {
      const url = Strings.apiSearch + "?q=" + term;
      console.log("Fetching data from: ", url);
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result: { message: string; data?: [] } = await response.json();
      // console.log("results: ", data);
      console.log(result.data?.length, " results found");
      setLoadingComplete(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoadingComplete(true);
    }
  };

  return [isLoadingComplete, results, searchStr] as const;
}
