import { FaArrowLeft } from "react-icons/fa";
import TextH1 from "../components/TextH1";
import useNavigation from "../hooks/useNavigation";
import BackTo from "../components/BackTo";

const Detail = () => {
  const data = JSON.parse(localStorage.getItem("detail"));

  return (
    <section className="py-10">
      <BackTo text="Back to pokémon page" to={"/pokemon"} />
      <TextH1 text={data?.name} />
    </section>
  );
};

export default Detail;
