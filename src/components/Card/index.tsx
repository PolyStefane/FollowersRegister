import { Follower } from "../../types";
import "./index.css";

interface CardProps {
  follower: Follower;
  onEdit: (follower: Follower) => void;
  onDelete: (id: number | undefined) => void;
}

const Card = ({ follower, onEdit, onDelete }: CardProps) => {
  return (
    <div className="card-modal">
      <div className="card-header">{follower.name}</div>
      <div className="card-body">
        <div>
          <p>
            <strong>Gênero:</strong> {follower.gender}
          </p>
          <p>
            <strong>Nível de Devoção:</strong> {follower.nivel}
          </p>
          <p>
            <strong>Ocupação:</strong> {follower.occupation}
          </p>
          <div>
            <button onClick={() => onEdit(follower)}>Editar</button>
            <button onClick={() => onDelete(follower.id)}>Excluir</button>
          </div>
        </div>
        <img src={`${follower.image}`} alt={`imagem do seguidor ${follower.name}`} />
      </div>
    </div>
  );
};

export default Card;
