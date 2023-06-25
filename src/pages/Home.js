import React, { useState, useEffect, useRef } from "react";
import { addToList, removeAlbum, updateAlbumApi } from "../api";
import { v4 as uuidv4 } from "uuid"; // to generate unique ID
import styles from "../styles/home.module.css";

import { toast } from "react-toastify"; // to add notifications
import "react-toastify/dist/ReactToastify.css";

// to add a new album to list, it calls the fetch funtion which is added in api folder
export const handleAddAlbum = async (title, setAlbums) => {
  if (title.length > 0) {
    // want to add the album when input has some text,it won't run incase of empty input
    try {
      const response = await addToList(title);
      if (response) {
        setAlbums((prevAlbums) => [response, ...prevAlbums]); // adding new album in front
        toast.success("Album Added Successfully");
      } else {
        toast.error("Failed to add Album");
      }
    } catch (error) {
      console.error("Error adding album:", error);
    }
  } else {
    toast.error("Title can not be Empty");
  }
};

function Home() {
  const [albums, setAlbums] = useState([]);
  const inputRef = useRef(null); // capture input
  const updateInputRef = useRef(null);
  const [isUpdating, setIsUpdating] = useState(true); // to show save or update button
  const [selectedUnId, setSelectedUnId] = useState(null);

  const fetchDataFromApi = () => {
    fetch("https://jsonplaceholder.typicode.com/albums") // limit - https://jsonplaceholder.typicode.com/albums?_start=0&_limit=5
      .then((response) => response.json())
      .then((data) => {
        const albumsWithId = data.map((album) => ({
          ...album,
          unId: uuidv4(), // Generate a unique ID using uuidv4() to add to album
        }));

        setAlbums(albumsWithId);
      });
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  // delete album
  const deleteAlbum = async (albumId) => {
    await removeAlbum(albumId).then(() => {
      const filteredAlbums = albums.filter((album) => album.unId !== albumId); // filter the matching unID
      setAlbums(filteredAlbums);
      toast.success("Album Deleted Successfully");
    });
  };

  // update the lbum

  const updateAlbum = async (albumId, newTitle) => {
    if (newTitle.length > 0) {
      // will only update album if it is not emty title
      const albumToUpdate = albums.find((album) => album.unId === albumId);

      if (albumToUpdate) {
        const updatedAlbum = { ...albumToUpdate, title: newTitle };

        const updatedAlbums = albums.map((album) =>
          album.unId === albumId ? updatedAlbum : album
        );

        try {
          await updateAlbumApi(albumId, newTitle);
          setAlbums(updatedAlbums); // Update the state with the updated albums
          toast.success("Album Updated Successfully");
        } catch (error) {
          console.error("Error updating album:", error);
          // Revert the update in case of an error
          setAlbums(albums);
        }
      } else {
        // Album not found in the our list, use the API approach
        await updateAlbumApi(albumId, newTitle);
        toast.success("Album Updated Successfully");
      }

      setIsUpdating(false);
    } else {
      toast.error("Title can not be Empty");
    }
  };

  const enableAlbumUpdate = (unId) => {
    setSelectedUnId(unId); // to show the update title input box
    setIsUpdating(true);
  };

  const handleFormSubmit = async (event) => {
    // to handle album add button submit
    event.preventDefault();
    const inputValue = inputRef.current.value; // to get the typed value in input box
    await handleAddAlbum(inputValue, setAlbums);
    inputRef.current.value = "";
  };

  const handleUpdateSubmit = async (e, unId) => {
    // to handle the save button submit
    e.preventDefault();
    const updateInputValue = updateInputRef.current.value; // to get the typed value in input box
    await updateAlbum(unId, updateInputValue);
    setIsUpdating(false);
    setSelectedUnId(null);
  };

  return (
    <div className={styles.App}>
        <h2 className={styles.albumsList}>Albums list</h2> 
      <form onSubmit={handleFormSubmit}>
        <input
          className={styles.addInput}
          type="text"
          placeholder="Type new album"
          ref={inputRef}
        />
        <button className={`${styles.addBtn} ${styles.btn}`} type="submit">
          Add Album
        </button>
      </form>

      {albums.length > 0 && (
        <ul>
          {albums.map((album, index) => (
            <li className={styles.liTag} key={`${album.id}-${index}`}>
              <div className={styles.mainDiv}>
                <div className={styles.titleDiv}>
                  <b> Title :</b> {album.title}
                </div>
                <div className={styles.btnDiv}>
                  {isUpdating && selectedUnId === album.unId ? (
                    <form onSubmit={(e) => handleUpdateSubmit(e, album.unId)}>
                      <input
                        className={styles.updateInput}
                        type="text"
                        placeholder="Update title"
                        ref={updateInputRef}
                      />
                      <button
                        className={`${styles.saveBtn} ${styles.btn}`}
                        type="submit"
                      >
                        Save
                      </button>
                    </form>
                  ) : (
                    <button
                      className={`${styles.updateBtn} ${styles.btn}`}
                      onClick={() => enableAlbumUpdate(album.unId)}
                    >
                      Update
                    </button>
                  )}

                  <button
                    className={`${styles.deleteBtn} ${styles.btn}`}
                    onClick={() => deleteAlbum(album.unId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
