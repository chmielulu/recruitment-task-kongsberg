# Recruitment task for Kongsberg company

## What does this application do?

This application fetch data about authors and the books they have written from [My JSON Server API](https://my-json-server.typicode.com/chmielulu/recruitment-task-db) and then displays an interactive table with a list of authors. Each author's row in the table can be clicked to display the details of that author.

Link to the application preview: https://recruitment-task-kongsberg.jacobprogrammer.dev

## How to run the application locally?

- `yarn` or `npm install`
- `yarn start` or `npm run start`
- The application can be viewed at `http://localhost:3000`

## What dependencies does this application use and for what purpuse?

- [classnames](https://github.com/JedWatson/classnames) - Used for joining classNames together
- [framer-motion](https://github.com/framer/motion) - Used for cool animations
- [normalize.css](https://github.com/necolas/normalize.css/) - Used for CSS normalization
- [react-router-dom](https://reactrouter.com/en/main) - Used for routing

## Project structure

All application files are placed in the `src` directory

- **src/api - Contains the hooks that allow fetching data from the API. All hooks use `useAPIQuery` hook.**
  - `useAuthors` - this hook fetches all authors from the API
  - `useAuthorBooks` - this hook fetches all books of the specific author from the API
- **src/hooks - Contains the global hooks**
  - `useAPIQuery` - This hook allows making fetch requests to the specific API target
- **src/components - Contains the global components**
  - `Book` - Renders book
  - `Breadcrumb` - Renders breadcrumb navigation
  - `Button` - Renders a button. HTML element can be modified using `as` property. (e.g. as="a")
  - `Footer` - Renders the footer
  - `LoadingIcon` - Renders an SVG with loading animation
  - `Logo` - Renders the application logo
  - `Table` - Renders a table
- **src/routes/routes.ts - Contains the routes of the application**
- **src/theme - Contains the global styles** 
- **src/utils - Contains global utilities**
  - `camelCaseToNormalText` - Converts camel case text to normal text (e.g., "helloWorld" to "Hello world")
  - `getAuthorName` - Returns the name of a specific author from the authors query array
  - `mapQueryAuthorsToTableItems` - Transforms the authors query array into table-like data
- **src/views - Here are all views/routes of the application**
  - `Root` - The main application component that specifies all global components and routes
  - `Home` - The "/" route
  - `NotFound` - The component for 404 errors
  - `ListOfAuthors` -  The component for "/list-of-authors" and "/list-of-authors/:authorId" routes. It displays a table with authors and renders `AuthorBooks` when `authorId` is specified in the URL
  - `AuthorBooks` - The component for "/list-of-authors/:authorId" route. It displays all books of the author.