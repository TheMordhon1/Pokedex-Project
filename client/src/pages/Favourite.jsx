import React, { useState, useEffect } from "react";
import TextH1 from "../components/TextH1";
import useNavigation from "../hooks/useNavigation";
import axios from "axios";
import CardContainer from "../components/CardContainer";
import Popup from "../Popup";
import BackTo from "../components/BackTo";
import Loading from "../components/Loading";

const Favourite = () => {
  const { handleBackTo } = useNavigation();
  const username = localStorage.getItem("username");
  const [dataFav, setDataFav] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getDataFav = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/favourites");

      const filterByUsername = response.data.filter(
        (data) => data.username === username
      );
      setDataFav(filterByUsername);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    getDataFav();
  }, []);

  const handleDelete = async (name, id) => {
    try {
      await axios.delete(`http://localhost:3000/favourites/${id}`);
      alert("Data deleted!");
      setIsPopupOpen(false);
      getDataFav();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="py-10">
      <BackTo text="back to home" to={"/"} />
      <div className="flex items-center gap-6">
        <TextH1 text="Your Favourite" />
        {isLoading ? <Loading width="w-6" height="h-6" /> : ""}
      </div>
      <div className="flex flex-grow flex-wrap gap-x-2 pt-4 mt-10">
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
    </section>
  );
};

export default Favourite;
