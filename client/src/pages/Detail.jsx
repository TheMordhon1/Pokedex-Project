import { FaArrowLeft } from "react-icons/fa";
import TextH1 from "../components/TextH1";
import useNavigation from "../hooks/useNavigation";

const Detail = () => {
  const data = JSON.parse(localStorage.getItem("detail"));

  const { handleBackTo } = useNavigation();
  return (
    <section className="py-10">
      <div
        className="text-grey flex items-center gap-4 cursor-pointer hover:text-white/80"
        onClick={() => handleBackTo("/pokemon")}
      >
        <FaArrowLeft className="text-lg" />
        <p className="text-lg">Back to pokémon page</p>
      </div>
      <TextH1 text={data?.name} />
    </section>
  );
};

export default Detail;
