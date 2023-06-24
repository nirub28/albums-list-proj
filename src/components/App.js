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
