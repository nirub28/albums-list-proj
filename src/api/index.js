
let idCounter = 100;


export const addToList = async (title1) => {
    const id = ++idCounter;

    return fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "POST",
      body: JSON.stringify({
        title: title1,
        id:id,
        userId: 11,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('data updated is ', data);
      return data; // Return the added album data
    })
    .catch((error) => {
      console.error("Error adding album:", error);
    });

  };
  

  export const deleteAlbum = async (id) => {
        
  }