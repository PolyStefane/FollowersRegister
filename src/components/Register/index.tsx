import { ChangeEvent, useEffect, useState } from "react";
import ImageSlider from "../ImageSlider";
import { useNavigate } from "react-router-dom";
import { Follower } from "../../types";

interface RegisterProps {
  selectedFollower: Follower | null;
  onSave: () => void;
}

function Register({ selectedFollower, onSave }: RegisterProps) {
  const [values, setValues] = useState<Follower>({ name: "", gender: "", nivel: 0, occupation: "", image: "" });
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images: string[] = [
    "/img/Hippo_form.webp",
    "/img/Bison_form.webp",
    "/img/Capybara_form_3.webp",
    "/img/Frog_form.webp",
    "/img/Fox_form.webp",
    "/img/Elephant_form_2.webp",
    "/img/Cat_form_2.webp",
    "/img/Fennecfox_form_2.png",
    "/img/Starfish_form_2.webp",
    "/img/Nightwolf_form_2.webp",
    "/img/Twitchcat_form_2.webp",
    "/img/Tapir_form_2.webp",
    "/img/Redpanda_form.webp",
    "/img/Turtle_form.webp",
  ];

  const loadFollowersFromStorage = () => {
    const followers = localStorage.getItem("followers");
    return followers ? JSON.parse(followers) : [];
  };

  const saveFollowersToStorage = (followers: Follower[]) => {
    localStorage.setItem("followers", JSON.stringify(followers));
  };

  useEffect(() => {
    if (selectedFollower) {
      setValues(selectedFollower);
    } else {
      setValues({ name: "", gender: "", nivel: 0, occupation: "" });
    }
  }, [selectedFollower]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChangeValues = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClickButton = () => {
    setLoading(true);
    const followers = loadFollowersFromStorage();
    
    if (selectedFollower) {
      const updatedFollowers = followers.map((follower: Follower) =>
        follower.id === selectedFollower.id ? { ...follower, ...values, image: selectedImage != null ? selectedImage : follower.image} : follower
      );
      saveFollowersToStorage(updatedFollowers);
      setMessage("Seguidor atualizado com sucesso!");
    } else {
      const newFollower = { ...values, id: new Date().getTime(), image: selectedImage || "" };
      followers.push(newFollower);
      saveFollowersToStorage(followers);
      setMessage("Seguidor inserido com sucesso!");
    }

    onSave();
    setValues({ name: "", gender: "", nivel: 0, occupation: "", image: "" });
    setLoading(false);
    navigate("/followers");
  };

  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Join the Cult</h1>

      {message && <div role="alert">{message}</div>}
      {loading && <div className="spinner">Loading...</div>}

      <div className="input-group">
        <p>Nome:</p>
        <input
          type="text"
          name="name"
          placeholder="Um nome misterioso ou peculiar para o seguidor."
          className="register-input"
          value={values.name || ""}
          onChange={handleChangeValues}
        />
      </div>

      <div className="input-group">
        <p>Gênero:</p>
        <input
          type="text"
          name="gender"
          placeholder="Pode ser 'Masculino', 'Feminino', ou até algo místico como 'Inominado'."
          className="register-input"
          value={values.gender || ""}
          onChange={handleChangeValues}
        />
      </div>

      <div className="input-group">
        <p>Nível de devoção:</p>
        <input
          type="number"
          name="nivel"
          placeholder="Representa o quanto o seguidor é dedicado ao culto."
          className="register-input"
          value={values.nivel || ""}
          onChange={handleChangeValues}
        />
      </div>

      <div className="radio-group">
        <p>Ocupação:</p>
        <label>
          <input
            type="radio"
            name="occupation"
            value="Coletar"
            checked={values.occupation === "Coletar"}
            onChange={handleChangeValues}
          />{" "}
          Coletar
        </label>
        <label>
          <input
            type="radio"
            name="occupation"
            value="Construir"
            checked={values.occupation === "Construir"}
            onChange={handleChangeValues}
          />{" "}
          Construir
        </label>
        <label>
          <input
            type="radio"
            name="occupation"
            value="Explorar"
            checked={values.occupation === "Explorar"}
            onChange={handleChangeValues}
          />{" "}
          Explorar
        </label>
        <label>
          <input
            type="radio"
            name="occupation"
            value="Orar"
            checked={values.occupation === "Orar"}
            onChange={handleChangeValues}
          />{" "}
          Orar
        </label>
      </div>

      <label>Escolha uma Forma de Seguidor:</label>
      <ImageSlider images={images} onSelectImage={handleSelectImage} />

      <p>Forma Selecionada:</p>
      <div className="register-form">
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Imagem Selecionada"
            className="selected-image"
          />
        )}

        <button className="register-button" onClick={handleClickButton}>
          {selectedFollower ? "Atualizar Seguidor" : "Participar do Culto"}
        </button>
      </div>
    </div>
  );
}

export default Register;
