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
  const updateInputRef = useRef(null);
  const [isUpdating , setIsUpdating]= useState(true);
  const [selectedUnId, setSelectedUnId] = useState(null);


  const fetchDataFromApi = () => {
    fetch("https://jsonplaceholder.typicode.com/albums?_start=0&_limit=5")
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

  /////////////////// update

  const updateAlbum = async (albumId, newTitle) => {
    console.log('new title is getting updated', newTitle);
    const albumToUpdate = albums.find((album) => album.unId === albumId);
  
    if (albumToUpdate) {
      const updatedAlbum = { ...albumToUpdate, title: newTitle };
  
      const updatedAlbums = albums.map((album) =>
        album.unId === albumId ? updatedAlbum : album
      );
  
      try {
        await updateAlbumApi(albumId, newTitle);
        console.log("Album updated successfully");
        setAlbums(updatedAlbums); // Update the state with the updated albums
      } catch (error) {
        console.error("Error updating album:", error);
        // Revert the update in case of an error
        setAlbums(albums);
      }
    } else {
      // Album not found in the client-side list, use the API approach
      await updateAlbumApi(albumId, newTitle);
    }
  
    setIsUpdating(false);
  };
  


  //////////////////////////



  const enableAlbumUpdate = (unId) => {
    setSelectedUnId(unId);
    setIsUpdating(true);
    console.log('unId:', unId);
  };
  


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const inputValue = inputRef.current.value;
    await handleAddAlbum(inputValue, setAlbums);
    inputRef.current.value = "";
  };


  const handleUpdateSubmit = async (e, unId) => {
    e.preventDefault();
    const updateInputValue = updateInputRef.current.value;
    await updateAlbum(unId,updateInputValue);
    setIsUpdating(false);
    setSelectedUnId(null);
  }

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

              {isUpdating  && selectedUnId === album.unId ? (
                <form onSubmit={(e) => handleUpdateSubmit(e, album.unId)}>
                <input type="text" ref={updateInputRef} />
                <button type="submit">Save</button>
              </form>
        ) : (
          <button onClick={ () => enableAlbumUpdate(album.unId)}>Update</button>
        )}


              {/* <button onClick={() => updateAlbum(album.unId, "New Title")}>Update</button> */}
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
