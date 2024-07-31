import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./Card";
import Loading from "./Loading";

function CardContainer({ url, handlePopupOpen }) {
  const [detailData, setDetailData] = useState({});

  async function getDetailData() {
    if (!url) return;
    try {
      const response = await axios.get(url);
      setDetailData(response?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (url) {
      getDetailData();
    }
  }, [url]);

  return <Card data={detailData} onClick={handlePopupOpen} />;
}

export default CardContainer;
