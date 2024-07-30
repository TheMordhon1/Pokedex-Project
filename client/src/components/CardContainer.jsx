import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./Card";

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

  export default CardContainer