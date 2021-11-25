import {Route, Routes} from "react-router-dom"
import AlbumList from "./AlbumList";
import AlbumPage from "./AlbumPage";
import HomePage from "./Homepage";
import DeleteCollection from "./DeleteCollection";
import PopulateCollection from "./PopulateCollection";
import RemoveDuplicates from "./RemoveDuplicates";
import Home from "./Home";
import CreateTopic from "./CreateTopic";
import EditTopic from "./EditTopic";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path = "/" element={<HomePage/>}/>
        <Route exact path = "/albuns" element={<AlbumList/>}/>
        <Route exact path = "/albuns/:id" element={<AlbumPage/>}/>
        <Route exact path = "/delete" element={<DeleteCollection/>}/>
        <Route exact path = "/populate" element={<PopulateCollection/>}/>
        <Route exact path = "/remove" element={<RemoveDuplicates/>}/>
        <Route path = "/home" element={<Home />} />
        <Route path ="/create-topic" element={<CreateTopic />} />
        <Route path="/edit-topic/:id" element={<EditTopic />} />

      </Routes>
    </div>
  );
}

export default App;