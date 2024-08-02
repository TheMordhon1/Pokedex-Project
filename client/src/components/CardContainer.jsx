import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

function CardContainer({ url, count, handlePopupOpen }) {
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

  return <Card data={detailData} count={count} onClick={handlePopupOpen} />;
}

export default CardContainer;
