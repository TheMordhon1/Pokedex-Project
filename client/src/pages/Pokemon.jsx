import axios from "axios";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import inSound from "../assets/sound/in.wav";
import outSound from "../assets/sound/out.wav";
import BackTo from "../components/BackTo";
import CardContainer from "../components/CardContainer";
import Loading from "../components/Loading";
import Popup from "../components/Popup";
import TextH1 from "../components/TextH1";

const Pokemon = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [page, setPage] = useState({
    next: "",
    prev: "",
  });

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  const handlePopupOpen = (data) => {
    setIsPopupOpen(!isPopupOpen);
    setPopupContent(data);
  };

  const handleSave = async () => {
    if (!popupContent) return;
    await axios.post("http://localhost:3000/favourites", {
      name: popupContent?.name,
      url: popupContent?.url,
      username: localStorage.getItem("username"),
    });
    withReactContent(Swal).fire({
      title: "Saved",
      html: (
        <>
          <strong className="capitalize">{popupContent?.name}</strong> added to
          your favourites
        </>
      ),
      icon: "success",
    });
    setIsPopupOpen(false);
  };

  async function getData() {
    setData([]);
    setIsLoading(true);
    try {
      const response = await axios.get(
        searchQuery
          ? "https://pokeapi.co/api/v2/pokemon?offset=0&limit=2025"
          : url
      );
      setPage({
        next: response?.data?.next,
        prev: response?.data?.previous,
      });
      if (searchQuery) {
        const searchData = response?.data?.results?.filter((value) =>
          value.name.includes(searchQuery)
        );
        setData(searchData);
      } else {
        setData(response.data.results);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [searchQuery, url]);

  useEffect(() => {
    if (isPopupOpen) {
      let audio = new Audio(inSound);
      audio.play();
    } else {
      let audio = new Audio(outSound);
      audio.play();
      audio.volume = 0.7;
    }
  }, [isPopupOpen]);

  const handlePagination = (type) => {
    if (type === "next") {
      setUrl(page.next);
      let audio = new Audio(inSound);
      audio.play();
    } else {
      setUrl(page.prev);
      let audio = new Audio(outSound);
      audio.play();
      audio.volume = 0.7;
    }
  };

  return (
    <>
      <section className="py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="grid gap-2">
            {searchQuery ? (
              <BackTo text="back to homepage" to="/pokemon" />
            ) : (
              ""
            )}
            <div className="flex items-center gap-6">
              <TextH1 text="Pokémon List" />
              {isLoading ? <Loading width="w-6" height="h-6" /> : ""}
            </div>
          </div>

          <div
            className={`${searchQuery ? "hidden" : "flex"} items-center gap-5`}
          >
            <button
              disabled={page.prev === null}
              onClick={() => handlePagination("prev")}
              className={`${page.prev === null ? "opacity-30" : "opacity-100"}`}
            >
              <FaChevronLeft className="text-white text-xl" />
            </button>
            <button
              disabled={page.next === null}
              onClick={() => handlePagination("next")}
              className={`${page.next === null ? "opacity-30" : "opacity-100"}`}
            >
              <FaChevronRight className="text-white text-xl" />
            </button>
          </div>
        </div>
        <div className="flex flex-grow flex-wrap gap-x-2 pt-4">
          {data?.map((el, index) => (
            <CardContainer
              key={index}
              url={el.url}
              isPopupOpen={isPopupOpen}
              handlePopupOpen={() => handlePopupOpen(el)}
            />
          ))}
        </div>
      </section>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onConfirm={handleSave}
        content={popupContent}
      />
    </>
  );
};

export default Pokemon;
