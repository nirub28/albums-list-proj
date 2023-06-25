import { Home, } from "../pages/Index";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {


  return (
    <div className="App">
      <ToastContainer    // for notifications
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
      />
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
