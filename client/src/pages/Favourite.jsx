import axios from "axios";
import React, { useEffect, useState } from "react";
import BackTo from "../components/BackTo";
import CardContainer from "../components/CardContainer";
import Loading from "../components/Loading";
import TextH1 from "../components/TextH1";
import Popup from "../components/Popup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import inSound from "../assets/sound/in.wav";
import outSound from "../assets/sound/out.wav";
import removeSound from "../assets/sound/remove.wav";

const Favourite = () => {
  const username = localStorage.getItem("username");
  const [dataFav, setDataFav] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(null);
  const [popupContent, setPopupContent] = useState(null);
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
      toast.error(error.message, { theme: "light" });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopupOpen = (data) => {
    setIsPopupOpen(!isPopupOpen);
    setPopupContent(data);
    let audio = new Audio(inSound);
    audio.play();
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
    let audio = new Audio(outSound);
    audio.play();
    audio.volume = 0.7;
  };

  useEffect(() => {
    getDataFav();
  }, []);

  const handleDelete = async () => {
    if (!popupContent) return;
    withReactContent(Swal)
      .fire({
        title: "Are you sure?",
        html: `
              You want to remove <strong>"${popupContent?.name}"</strong>
            `,
        iconHtml: (
          <>
            <FaTrash className="animate__animated animate__fadeInUp text-5xl text-red-500" />
          </>
        ),
        showCancelButton: true,
        confirmButtonColor: "rgba(217, 66, 86, 1)",
        cancelButtonColor: "#949ba7",
        confirmButtonText: "Yes, remove it!",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          return new Promise((resolve) => {
            setTimeout(resolve, 2000);
          }).catch(() => {
            return false;
          });
        },
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const url = `http://localhost:3000/favourites/${popupContent?.id}`;
          await axios.delete(url);
          setIsPopupOpen(false);
          getDataFav();
          let audio = new Audio(removeSound);
          audio.play();
          withReactContent(Swal).fire({
            title: "Deleted!",
            html: (
              <>
                <strong className="capitalize">{popupContent?.name}</strong> has
                been deleled !
              </>
            ),
            icon: "success",
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error.message, { theme: "light" });
      })
      .finally(setIsLoading(false));
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
            url={el?.url}
            isPopupOpen={isPopupOpen}
            handlePopupOpen={() => handlePopupOpen(el)}
          />
        ))}
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onConfirm={handleDelete}
        isFavorite={true}
        content={popupContent}
      />
    </section>
  );
};

export default Favourite;
