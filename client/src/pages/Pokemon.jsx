import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useParams } from "react-router-dom";

const Pokemon = () => {
  const [data, setData] = useState([]);
  let { q } = useParams();

  async function getData() {
    setData([]);
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"
      );
      if (q) {
        const searchData = response?.data?.results?.filter((value) =>
          value.name.includes(q)
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
  }, [q]);

  return (
    <div className="flex flex-grow flex-wrap gap-x-2 pt-4">
      {data?.map((el, index) => (
        <CardContainer key={index} url={el.url} />
      ))}
    </div>
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
