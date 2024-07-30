import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import TextH1 from "../components/TextH1";

const Pokemon = () => {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  async function getData() {
    setData([]);
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"
      );
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
  }, [searchQuery]);

  return (
    <section className="py-10">
      <TextH1 text="Pokémon List" className="mb-8" />
      <div className="flex flex-grow flex-wrap gap-x-2 pt-4">
        {data?.map((el, index) => (
          <CardContainer key={index} url={el.url} />
        ))}
      </div>
    </section>
  );
};

function CardContainer({ url }) {
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

  return <Card data={detailData} />;
}

export default Pokemon;
