export const ADD_ALBUM = "ADD_ALBUM";
export const UPDATE_ALBUM = "UPDATE_ALBUM";
export const DELETE_ALBUM = "DELETE_ALBUM";

export function addAlbums(albums) {
  return {
    type: ADD_ALBUM,
    albums,
  };
}

export function updateAlbum(albums) {
  return {
    type: UPDATE_ALBUM,
    albums,
  };
}
export function deleteAlbum(id) {
  return {
    type: DELETE_ALBUM,
    id,
  };
}

export const fetchDataFromApi = () => {
  const url = `https://jsonplaceholder.typicode.com/albums`;

  return function (dispatch) {
    fetch(url)
      .then((response) => response.json())

      .then((albums) => {
        console.log("data is ", albums);

        dispatch(addAlbums(albums));
      });
  };
};


