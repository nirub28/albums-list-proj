import React, { useState, useEffect } from "react";

const App = () => {
  const [albums, setAlbums] = useState([]);

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

    fetch('https://jsonplaceholder.typicode.com/albums', {
    method: 'POST',
    body: JSON.stringify({
      title: 'This is added by Niranjan',
      id:101,
      userId: 11,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => 
    {
      setAlbums((prevAlbums) => [data, ...prevAlbums]);
      console.log('The added data', data);
    })
  }, []);
 

    console.log("rendering app component");

  return (
    <div className="App">
      <h4>Albums list</h4>
      {albums.length > 0 && (
        <ul>
          {albums.map((album) => (
            <li key={album.id}> {album.title} </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
