import React, { useEffect } from "react";
import Strings from "../../constants/strings";
import { Book } from "../../models/book";

type BookSuggestion = {
  _id: string;
  docId: Book;
  similarDocs: [{ docId: Book; score: number }];
};

export function useBookSuggestion(book: Book) {
  // ! todo: fix term any type
  const [suggestions, setSuggestions] = React.useState<BookSuggestion | null>(
    null
  );
  const [isSuggestionComplete, setSuggestionComplete] =
    React.useState<Boolean | null>(null);

  const fecthSuggestions = async () => {
    setSuggestionComplete(false);
    // fetch data from api
    try {
      const url = Strings.apiSugBook + book._id;
      console.log("Fetching data from: ", url);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });
      const results: BookSuggestion = await response.json();
      // console.log(results);
      console.log(results.similarDocs.length, " similar docs found");
      setSuggestionComplete(true);
      setSuggestions(results);
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
