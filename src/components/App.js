import {Route, Routes} from "react-router-dom"
import AlbumList from "./AlbumList";
import AlbumPageBackup from "./AlbumPageBackup";
import HomePage from "./Homepage";
//import DeleteCollection from "../../utils/DeleteCollection";
//import PopulateCollection from "../../utils/PopulateCollection";
//import RemoveDuplicates from "./RemoveDuplicates";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path = "/" element={<HomePage/>}/>
        <Route exact path = "/albuns" element={<AlbumList/>}/>
        <Route exact path = "/albuns/:id" element={<AlbumPageBackup/>}/>
        {/*
        <Route exact path = "/delete" element={<DeleteCollection/>}/>
        <Route exact path = "/populate" element={<PopulateCollection/>}/>
        <Route exact path = "/remove" element={<RemoveDuplicates/>}/>
        */}
      </Routes>
    </div>
  );
}

export default App;