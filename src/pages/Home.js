import React, { useState, useEffect, useRef } from "react";
import { addToList, removeAlbum , updateAlbumApi} from "../api";
import { v4 as uuidv4 } from 'uuid';

export const handleAddAlbum = async (title, setAlbums) => {
  try {
    const response = await addToList(title);
    if (response) {
      setAlbums((prevAlbums) => [response, ...prevAlbums]);
      console.log("Added alum");
    } else {
      console.log("Failed to add album");
    }
  } catch (error) {
    console.error("Error adding album:", error);
  }
};

function Home() {
  const [albums, setAlbums] = useState([]);
  const inputRef = useRef(null);

  const fetchDataFromApi = () => {
    fetch("https://jsonplaceholder.typicode.com/albums")
    .then((response) => response.json())
    .then((data) => {
      // Add a unique ID to each album
      const albumsWithId = data.map((album) => ({
        ...album,
        unId: uuidv4(), // Generate a unique ID using uuidv4()
      }));

      setAlbums(albumsWithId);
    });
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  const deleteAlbum = async (albumId) => {
    await removeAlbum(albumId).then(() => {
      const filteredAlbums = albums.filter((album) => album.unId !== albumId);
      setAlbums(filteredAlbums);
    });
  };

  const updateAlbum = async (albumId, newTitle) => {
    const albumToUpdate = albums.find((album) => album.unId === albumId);
  
    if (albumToUpdate) {
      const updatedAlbum = { ...albumToUpdate, title: newTitle };
  
      const updatedAlbums = albums.map((album) =>
        album.unId === albumId ? updatedAlbum : album
      );
  
      setAlbums(updatedAlbums);
  
      try {
        await updateAlbumApi(albumId, newTitle);
        console.log("Album updated successfully");
      } catch (error) {
        console.error("Error updating album:", error);
        // Revert the update in case of an error
        setAlbums(albums);
      }
    } else {
      // Album not found in the client-side list, use the API approach
      await updateAlbumApi(albumId, newTitle);
    }
  };
  


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const inputValue = inputRef.current.value;
    await handleAddAlbum(inputValue, setAlbums);
    inputRef.current.value = "";
  };

  return (
    <div className="App">
      <h4>Albums list</h4>
      <form onSubmit={handleFormSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit">Add Album</button>
      </form>

      {albums.length > 0 && (
        <ul>
          {albums.map((album,index) => (
            <li key={`${album.id}-${index}`}>
              {album.title}
              <button onClick={() => updateAlbum(album.unId, "New Title")}>Update</button>
              {/* <button onClick={() => updateAlbum(album.id)}>Update</button> */}
              <button onClick={() => deleteAlbum(album.unId)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
