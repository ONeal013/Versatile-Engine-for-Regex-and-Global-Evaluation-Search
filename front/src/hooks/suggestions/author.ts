import React, { useEffect } from "react";
import Strings from "../../constants/strings";
import { Author } from "../../models/author";
import { Book } from "../../models/book";

export function useAuthorSuggestion(book: Book | undefined) {
  // ! todo: fix term any type
  const [suggestions, setSuggestions] = React.useState<Array<Author> | null>(
    null
  );
  const [isSuggestionComplete, setSuggestionComplete] =
    React.useState<Boolean | null>(null);

  const fecthSuggestions = async () => {
    setSuggestionComplete(false);
    // fetch data from api
    try {
      const url = Strings.apiAuthorSug + book?._id;
      // const url = Strings.apiAuthors;
      console.log("Fetching data from: ", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });
      const results = await response.json();
      console.log(results);
      console.log(results.length, " suggestions found");
      setSuggestionComplete(true);
      setSuggestions(results ?? []);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setSuggestionComplete(true);
    }
  };

  useEffect(() => {
    if (book) {
      fecthSuggestions();
    }
  }, [book]);

  return [isSuggestionComplete, suggestions] as const;
}
