# React Album List 

This is a React application for managing albums. It allows you to add new albums, update existing ones, and delete albums from a list. The albums are fetched from an API and stored in a local state.

## Features

- Get the existing albums from an API
- Add a new album to the list
- Update the title of an album
- Delete an album from the list

## Installation

1. Clone the repository to your local machine:

git clone https://github.com/nirub28/albums-list-proj

2. Navigate to the project directory:

cd albums-list

3. Install the dependencies using npm:

## Usage

To start the React development server and launch the application, use the following command:

npm start

The application will be available at [http://localhost:3000].

## API Integration

The application interacts with a RESTful API to perform CRUD operations on albums. The API endpoints used are:

- `GET /albums`: Fetches the list of albums.
- `POST /albums`: Adds a new album.
- `PUT /albums/{id}`: Updates the title of an album.
- `DELETE /albums/{id}`: Deletes an album.

## Project Structure

The project structure is organized as follows:

- `src/components`: Contains the main component files.
- `src/pages`: Contains the page components, including the `Home` page for managing albums.
- `src/api`: Contains the API integration code for adding, updating, and deleting albums.
- `styles`: Contains the CSS module file for styling the `Home` page.
- `.gitignore`: Specifies files and directories to be ignored by Git.
