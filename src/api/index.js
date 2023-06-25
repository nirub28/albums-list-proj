import { v4 as uuidv4 } from "uuid";


// to add albums to list

export const addToList = async (title1) => {
  const unId = uuidv4(); // Generate a unique ID
  return fetch("https://jsonplaceholder.typicode.com/albums", {
    method: "POST",
    body: JSON.stringify({
      title: title1,
      id: 101,
      userId: 11,
      unId: unId, // Include the generated unId in the request body
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return { ...data, unId: unId }; // Add unId property to the returned data
    })
    .catch((error) => {
      console.error("Error adding album:", error);
    });
};


// to remove an album
export const removeAlbum = async (id) => {
  return fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
    method: "DELETE",
  });
};


// to update an album
export const updateAlbumApi = async (id, title) => {
  return fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title: title,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Updated album data:", data);
      return data; // Return the updated album data
    })
    .catch((error) => {
      console.error("Error updating album:");
    });
};
