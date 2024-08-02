import axios from "axios";
import React, { useEffect, useState } from "react";
import BackTo from "../components/BackTo";
import CardContainer from "../components/CardContainer";
import Loading from "../components/Loading";
import TextH1 from "../components/TextH1";
import Popup from "../components/Popup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import inSound from "../assets/sound/in.wav";
import outSound from "../assets/sound/out.wav";
import removeSound from "../assets/sound/remove.wav";
import EmptyState from "../components/EmptyState";
import trashgif from "../assets/trash.webm";
import SuccessSound from "../assets/sound/success.wav";

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

      const newData = {};
      filterByUsername.map((item) => {
        if (newData[item.name]) {
          newData[item.name].count++;
        } else {
          newData[item.name] = { ...item, count: 1 };
        }

        return newData[item.name];
      });

      setDataFav(Object.values(newData));
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
    let audio = new Audio(inSound);
    audio.play();
    getDataFav();
  }, []);

  const handleDelete = async () => {
    if (!popupContent) return;
    withReactContent(Swal)
      .fire({
        title: "Are you sure?",
        html: (
          <>
            You want to remove{" "}
            <strong className="capitalize">{popupContent?.name}</strong>
          </>
        ),
        iconHtml: (
          <>
            <video src={trashgif} />
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
            title: "Removed!",
            html:
              popupContent.count > 1 ? (
                <>
                  one of{" "}
                  <strong className="capitalize">{popupContent?.name}'s</strong>{" "}
                  is no longer in your favourites.
                </>
              ) : (
                <>
                  <strong className="capitalize">{popupContent?.name}</strong>{" "}
                  is no longer in your favourites.
                </>
              ),

            iconHtml: <video src={trashgif} autoPlay loop />,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error.message, { theme: "light" });
      })
      .finally(setIsLoading(false));
  };

  const handleSave = async () => {
    if (!popupContent) return;
    await axios.post("http://localhost:3000/favourites", {
      name: popupContent?.name,
      url: popupContent?.url,
      username: localStorage.getItem("username"),
    });
    let audio = new Audio(SuccessSound);
    audio.play();
    getDataFav();
    withReactContent(Swal).fire({
      title: "Yeay !",
      html: (
        <>
          <strong className="capitalize">{popupContent?.name}</strong> has been
          added to your favorites.
        </>
      ),
      icon: "success",
    });

    setIsPopupOpen(false);
  };

  return (
    <section className="py-10">
      <BackTo text="back to home" to={"/pokemon"} />
      {dataFav.length > 0 && (
        <div className="flex items-center gap-6 mt-4">
          <TextH1 text="Your Favourite" />
          {isLoading ? <Loading width="w-6" height="h-6" /> : ""}
        </div>
      )}
      {dataFav.length === 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <EmptyState title="Ooops..." subtitle="No favourites found." />
        </div>
      )}
      <div className="grid grid-cols-custom mt-10 gap-2">
        {dataFav?.map((el, index) => (
          <CardContainer
            key={index}
            url={el?.url}
            isPopupOpen={isPopupOpen}
            count={el.count}
            handlePopupOpen={() => handlePopupOpen(el)}
          />
        ))}
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onConfirm={handleDelete}
        onSave={handleSave}
        isFavorite={true}
        content={popupContent}
      />
    </section>
  );
};

export default Favourite;
