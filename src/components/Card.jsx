/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useState,useEffect } from "react";

function Card({data}){
    const [detailData, setDetailData] = useState([]);

    async function getDetailData() {
        try {
            const response = await axios.get(data.url);
            setDetailData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDetailData();
    }, []);

    return(
        <>
            <div className="flex flex-row w-64 h-32 border-2 border-white rounded-md bg-el_dragon py-3 px-3">
                <div className="flex flex-col w-1/2 text-start">
                    <span className="text-white text-xl">{data.name}</span>
                    <span>{detailData?.types?.map((el, index) => {
                        if (index > 0) {
                            return `, ${el.type.name}`
                        } else {
                            return el.type.name
                        }
                    })}</span>
                </div>
                <div className="w-1/2">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detailData.id}.png`} className="h-28" />
                </div>
            </div>
        </>
    )
}

export default Card