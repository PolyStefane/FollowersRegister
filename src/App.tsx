import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Follower } from "./types/follower.js";
import Register from "./components/Register/index.js";
import FollowersList from "./components/FollowersList/index.js";
import NavBar from "./components/NavBar/index.js";

function App() {
  const [selectedFollower, setSelectedFollower] = useState<Follower | null>(null);

  const getFollowerFromLocalStorage = (id: number): Follower | undefined => {
    const followers = localStorage.getItem("followers");
    if (followers) {
      const parsedFollowers: Follower[] = JSON.parse(followers);
      return parsedFollowers.find(f => f.id === id);
    }
    return undefined;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const selectedFollowerId = urlParams.get("selectedFollower");

    if (selectedFollowerId) {
      const id = parseInt(selectedFollowerId, 10);
      const follower = getFollowerFromLocalStorage(id);

      if (follower) {
        setSelectedFollower(follower);
      }
    }
  }, []);

  const handleEditFollower = (follower: Follower) => {
    setSelectedFollower(follower);
    window.location.href = `/?selectedFollower=${follower.id}`;
  };

  const handleSaveFollower = () => {
    setSelectedFollower(null);
    window.location.href = "/followers";
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <Register
                selectedFollower={selectedFollower}
                onSave={handleSaveFollower}
              />
            }
          />
          <Route
            path="/followers"
            element={<FollowersList onEdit={handleEditFollower} />}
          />
        </Routes>
        <NavBar />
      </div>
    </Router>
  );
}

export default App;
