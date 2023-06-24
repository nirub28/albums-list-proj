import { Home, } from "../pages/Index";
import { Route, Routes } from "react-router-dom";

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route exact path="/" element={<Home />}>
          {" "}
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;


  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/albums", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       title: "This is added by Niranjan",
  //       id: 101,
  //       userId: 11,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAlbums((prevAlbums) => [data , ...prevAlbums]);
  //       console.log("The added data", data);
  //     });
  // }, []);
 

  //   console.log("rendering app component");

  // return (
  //   <div className="App">
  //     <h4>Albums list</h4>
  //     {albums.length > 0 && (
  //       <ul>
  //         {albums.map((album) => (
  //           <li key={album.id}> {album.title} </li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // );