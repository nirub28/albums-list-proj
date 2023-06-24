import React, { useState, useEffect ,useRef} from "react";
import {addToList} from '../api';


export const handleAddAlbum = async (title,setAlbums) => {
   try {
     const response = await addToList(title);
     if (response) {
       setAlbums((prevAlbums) => [response , ...prevAlbums]);
      
       console.log("Album added successfully");
     } else {
       console.log("Failed to add album");
     }
   } catch (error) {
     console.error("Error adding album:", error);
   }
 };

 function deleteAlbum(id){
     
 }

function Home() {
  const [albums, setAlbums] = useState([]);
  const inputRef = useRef(null);

  const fetchDataFromApi = () => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        setAlbums(data);
        console.log("data is ", data);
      });
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

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
      <input type="text" ref={inputRef}/><button type="submit">Add Album</button> 
      </form>
      
      {albums.length > 0 && (
        <ul>
          {albums.map((album,index) => (
            <li key={`${album.id}-${index}`}> {album.title}<button onClick={() => deleteAlbum(album.id)}>Delete</button> </li>
          ))}
        </ul>
        
      )}
    </div>
  );
}

export default Home;
