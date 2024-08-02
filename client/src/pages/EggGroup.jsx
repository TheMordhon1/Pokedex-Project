import React, { useEffect, useState } from "react";
import TextH1 from "../components/TextH1";
import { toast } from "react-toastify";
import axios from "axios";
import BackTo from "../components/BackTo";
import Loading from "../components/Loading";
import CardContainer from "../components/CardContainer";
import Popup from "../components/Popup";
import useNavigation from "../hooks/useNavigation";
import { useParams } from "react-router-dom";

import inSound from "../assets/sound/in.wav";
import outSound from "../assets/sound/out.wav";
import SuccessSound from "../assets/sound/success.wav";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EggGroup = () => {
  const { handleNavigateTo } = useNavigation();
  const [data, setData] = useState();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(null);
  const [popupContent, setPopupContent] = useState(null);
  const params = useParams();

  const getGroup = async () => {
    setIsLoading(true);
    try {
      await axios
        .get("https://pokeapi.co/api/v2/egg-group")
        .then((response) => {
          const data = response?.data?.results?.sort((a, b) =>
            a.name.localeCompare(b.name)
          );

          setData(data);
        })
        .then(() => {});
    } catch (error) {
      console.log(error);
      toast.error(error.message, { theme: "light" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGroup();
    let audio = new Audio(inSound);
    audio.play();
  }, []);

  const getDetailGroup = async () => {
    setIsLoading(true);
    try {
      await axios
        .get(url)
        .then((response) => {
          console.log(response.data);
        })
        .then(() => {});
    } catch (error) {
      console.log(error);
      toast.error(error.message, { theme: "light" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params.group && url) {
      getDetailGroup();
    }
  }, [params.group, url]);

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

  const handleSave = async () => {
    if (!popupContent) return;
    await axios.post("http://localhost:3000/favourites", {
      name: popupContent?.name,
      url: popupContent?.url,
      username: localStorage.getItem("username"),
    });
    let audio = new Audio(SuccessSound);
    audio.play();
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
      <BackTo
        text={!params.group ? "back to home" : "back to egg group list"}
        to={!params.group ? "/pokemon" : "/egg-group"}
      />

      <div className="flex items-center gap-6 mt-4">
        <TextH1
          text={!params.group ? "Egg Group" : params.group}
          className="capitalize"
        />
        {isLoading ? <Loading width="w-6" height="h-6" /> : ""}
      </div>

      {!params.group ? (
        <ul className="my-6 border-b md:my-8 md:max-w-56">
          {data?.map((item, index) => (
            <li
              key={index}
              className="border-t cursor-pointer"
              onClick={() => {
                handleNavigateTo(`/egg-group/${item.name}`);
                setUrl(item.url);
              }}
            >
              <span className="block py-3 hover:bg-ligthblack hover:font-semibold hover:text-white text-grey capitalize">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <div className="grid grid-cols-custom mt-10 gap-2">
            {data?.map((el, index) => (
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
            onConfirm={handleSave}
            isFavorite={true}
            content={popupContent}
          />
        </>
      )}
    </section>
  );
};

export default EggGroup;
