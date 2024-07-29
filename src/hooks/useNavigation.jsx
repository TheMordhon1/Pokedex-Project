import { useNavigate } from "react-router-dom";
import inSound from "../assets/sound/in.wav";
import outSound from "../assets/sound/out.wav";

const useNavigation = () => {
  const navigate = useNavigate();

  const handleNavigateTo = (navigateTo) => {
    let audio = new Audio(inSound);
    audio.play();
    navigate(navigateTo);
  };

  const handleBackTo = (backTo) => {
    let audio = new Audio(outSound);
    audio.play();
    audio.volume = 0.7;
    navigate(backTo);
  };



  

  return { handleNavigateTo, handleBackTo };
};

export default useNavigation;
