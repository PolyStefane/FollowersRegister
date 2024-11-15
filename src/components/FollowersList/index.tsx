import React, { useState, useEffect } from "react";
import Card from "../Card";
import { Follower } from "../../types";
import "./index.css"
import Swal from 'sweetalert2';

interface FollowersListProps {
  onEdit: (follower: Follower) => void;
}

const FollowersList: React.FC<FollowersListProps> = ({ onEdit }) => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [message, _ ] = useState<string>("");

  const loadFollowersFromStorage = (): Follower[] => {
    const followers = localStorage.getItem("followers");
    return followers ? JSON.parse(followers) : [];
  };

  const saveFollowersToStorage = (followers: Follower[]) => {
    localStorage.setItem("followers", JSON.stringify(followers));
  };

  const updateFollowers = () => {
    setFollowers(loadFollowersFromStorage());
  };

  useEffect(() => {
    updateFollowers();
  }, []);

  const handleDelete = (id: number | undefined) => {
    const updatedFollowers = followers.filter(f => f.id !== id);
    saveFollowersToStorage(updatedFollowers);
    setFollowers(updatedFollowers);
    Swal.fire({
      icon: 'success',
      text: 'Seguidor excluído com sucesso!',
      customClass: {
        title: 'custom-title',
        confirmButton: 'custom-button',
        popup: 'custom-popup',
      }
    });      
  };

  return (
    <div className="followers-container">
      <h2>Lista de Seguidores:</h2>
      {message && <p>{message}</p>}
      <div className="followers-list">
        {followers.length === 0 ? (
          <p>Nenhum seguidor encontrado.</p>
        ) : (
          followers.map((follower) => (
            <div key={follower.id}>
              <Card follower={follower} onEdit={onEdit} onDelete={handleDelete} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FollowersList;
