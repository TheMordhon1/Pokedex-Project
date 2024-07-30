import React, { useState, useEffect } from "react";
import TextH1 from "../components/TextH1";
import useNavigation from "../hooks/useNavigation";
import axios from "axios";
import CardContainer from "../components/CardContainer";
import Popup from "../Popup";

const Favourite = () => {
  const { handleBackTo } = useNavigation();
  const [dataFav, setDataFav] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const getDataFav = async () => {
    try {
      const response = await axios.get("http://localhost:3000/favourites")
      
      setDataFav(response.data)
    } catch(error) {
      console.log(error);
    }
  }
  
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    getDataFav();
  }, []);

  const handleDelete = async (name,id) => {
    try {
      await axios.delete(`http://localhost:3000/favourites/${id}`)
      alert("Data deleted!");
      setIsPopupOpen(false);
      getDataFav()
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div>
      <TextH1 text="Favourite page" />
      <button onClick={() => handleBackTo(-1)} className="text-white">
        Kembali
      </button>
      <div className="flex flex-grow flex-wrap gap-x-2 pt-4">
          {dataFav?.map((el, index) => (
            <CardContainer
              key={index}
              url={el.url}
              isPopupOpen={isPopupOpen}
              setIsPopupOpen={setIsPopupOpen}
            />
          ))}
        </div>
        <Popup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onSave={handleDelete}
          isFavorite={true}
        />
    </div>
  );
};

export default Favourite;
