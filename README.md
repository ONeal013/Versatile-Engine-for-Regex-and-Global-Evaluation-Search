# The Versatile Engine for Regex and Global Evaluation Search

https://postimg.cc/njHfmM8g
https://postimg.cc/YjYQ092M
https://postimg.cc/LqJ1p40d
https://postimg.cc/bsqSv9F9
https://postimg.cc/LqJ1p40d
https://postimg.cc/nXgvMQmV

https://i.postimg.cc/HLs3ZwsM/image.png


## Project Overview

This project is a web and mobile application that functions as a document search engine for a library of books in textual format. The objective is to build a personal library of text documents containing at least 1664 books, with each book having a minimum of 10,000 words.

## Project Structure

- **Backend:** Developed in Node.js with Express.js, this component handles API requests and manages a MongoDB database populated with text documents.
- **Frontend:** Built with React Native and Expo, this client-side interface provides a user-friendly experience on both web and mobile platforms.

## Functionalities

### Explicit Search Functionality
- **Keyword Search:** On entering a text string *S*, the application returns a list of all text documents whose indexing table contains the string *S*.

### Explicit Advanced Search Functionality
- **Regex Search:** When a Regex expression is provided, the application returns either:
  - A list of all text documents whose indexing table contains a string that matches the Regex expression, or
  - A list of all text documents whose full text contains a string that matches the Regex expression (noting that this may impact performance).

### Implicit Ranking Functionality
- **Result Ranking:** After a search, the application sorts and returns documents based on relevance. The implemented criteria include:
  - Number of occurrences of the keyword.
  - A decreasing centrality index derived from the Jaccard graph.
  - At least one centrality measure (closeness, betweenness, or pagerank) as discussed in class.
  
The selected centrality measure is clearly defined, calculated, and demonstrated using relevant excerpts from several books in the database.

### Implicit Suggestion and Correction Functionality
- **Similar Document Suggestions:** After a search, the application suggests similar documents by:
  - Listing nodes in the Jaccard graph that are neighbors to the two or three most relevant documents containing the keyword.
  - Alternatively, providing a list based on a specific strategy detailed in the project report.
- **Levenshtein Correction:** A correction feature using the Levenshtein distance algorithm suggests alternative search terms when spelling errors occur, enhancing search accuracy and user experience.

### Reader Functionality
- **Integrated Book Reader:** The application includes a built-in reader mode that allows viewing the full text of selected books directly within the interface, ensuring a seamless reading experience on both web and mobile platforms.

## Setup and Installation

### Backend Setup
1. Navigate to the `back/` directory.
2. Install all dependencies using the command: `npm install`
3. Start the backend server with the command: `npm run start`
   - The backend will then be accessible at: `http://localhost:3000`

### Frontend Setup
1. Navigate to the `front/` directory.
2. Install all dependencies using the command: `npm install`
3. Start the frontend application with the command: `npm run start`
   - This launches Expo, enabling testing on an emulator or a physical mobile device.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request for any suggestions or improvements.

## Authors

This project was developed by Anil HADJELI and Leandre AKAKPO.
