import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Popup from "../Popup";
import Card from "../components/Card";
import TextH1 from "../components/TextH1";
import inSound from "../assets/sound/in.wav";
import outSound from "../assets/sound/out.wav";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useNavigation from "../hooks/useNavigation";
import BackTo from "../components/BackTo";

const Pokemon = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const { handleNavigateTo, handleBackTo } = useNavigation();

  const [data, setData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [page, setPage] = useState({
    next: "",
    prev: "",
  });

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSave = () => {
    alert("Data saved!");
    setIsPopupOpen(false);
  };

  async function getData() {
    setData([]);
    try {
      const response = await axios.get(
        searchQuery
          ? "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025"
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
            <TextH1 text="Pokémon List" />
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
              setIsPopupOpen={setIsPopupOpen}
            />
          ))}
        </div>
      </section>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSave={handleSave}
      />
    </>
  );
};

function CardContainer({ url, isPopupOpen, setIsPopupOpen }) {
  const [detailData, setDetailData] = useState({});

  async function getDetailData() {
    try {
      const response = await axios.get(url);
      setDetailData(response?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDetailData();
  }, []);

  const handlePopupOpen = () => {
    setIsPopupOpen(!isPopupOpen);
    localStorage.setItem("detail", JSON.stringify(detailData));
  };

  return <Card data={detailData} onClick={handlePopupOpen} />;
}

export default Pokemon;
