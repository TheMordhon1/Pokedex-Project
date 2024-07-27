import { useNavigate } from "react-router-dom";

const NavigateTo = ({ navigateTo, backTo }) => {
  const navigate = useNavigate();

  const handleNavigateTo = () => {
    let audio = new Audio("../assets/sound/in.wav");
    audio.play();
    navigate(navigateTo);
  };

  const handleBackTo = () => {
    let audio = new Audio("../assets/sound/out.wav");
    audio.play();
    navigate(backTo);
  };

  return { handleNavigateTo, handleBackTo };
};

export default NavigateTo;
