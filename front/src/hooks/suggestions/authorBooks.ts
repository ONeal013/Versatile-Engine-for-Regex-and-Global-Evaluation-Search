import React, { useEffect } from "react";
import Strings from "../../constants/strings";
import { Author } from "../../models/author";
import { Book } from "../../models/book";

export function useAuthorBookSuggestion(author: Author | undefined) {
  const [suggestions, setSuggestions] = React.useState<Array<Book> | null>(
    null
  );
  const [isSuggestionComplete, setSuggestionComplete] =
    React.useState<Boolean | null>(null);

  const fecthSuggestions = async () => {
    setSuggestionComplete(false);
    // fetch data from api
    try {
      const url = Strings.apiAuthorBooks + "?name=" + author?.name;
      console.log("Fetching data from: ", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });
      const results: Array<Book> = await response.json();
      console.log(results);
      console.log(results.length, " suggestions found");
      setSuggestionComplete(true);
      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setSuggestionComplete(true);
    }
  };

  useEffect(() => {
    if (author) {
      fecthSuggestions();
    }
  }, [author]);

  return [isSuggestionComplete, suggestions] as const;
}
