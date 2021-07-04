<div align="center">
<image src="./public/mockup.png" alt="mockup" width="600">
<h1>Rick And Morty Collection</h1>
A Website where you can save all your favorites characters from "Rick And Morty" TV Show 
</div>

## Getting Started

First, install all dependencies:

```bash
npm install
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Proposal

### You should create a single-page Typescript React application where we can:

- Search a character by name;
- View loading feedback while API is not responding;
- Display error message if character does not exist;
- Display minimum information about the characters if they exists;
- Register the character in the favorites list using some global state control library or the native React Context API;
- View list of favorite characters;
- Delete character from list;

## Why I use this.

### [Next.js](https://nextjs.org/)

I personally prefer use next than CRA in development, I think next have better integration with the libraries, a better experience on development and let me use hooks in conditionals.

### [React-Query](https://react-query.tanstack.com/)

I used it recently in my studies and I liked how it solves the promises, brings a global state with the data and it revalidate the content.

### [Chakra-ui](https://chakra-ui.com/)

He almost does the responsiveness himself, I think CSS is much easier to understand with him and the selection becomes individual
