import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";

const Pokemon = () => {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1050"
      );
      setData(response.data.results);
   //    console.log(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

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

  return (
    <>
      <Card data={detailData} />
    </>
  );
}

export default Pokemon;
