import React, { useState } from "react";
import TextH1 from "../components/TextH1";
import InputText from "../components/InputText";
import useNavigation from "../hooks/useNavigation";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [name, setName] = useState("");

  const { handleNavigateTo } = useNavigation();
  const handleInputName = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/user`, { username: name });
      handleNavigateTo("/pokemon");
      localStorage.setItem("username", name);
      toast.success(`Hello ${name}`, { theme: "dark", hideProgressBar: true });
    } catch (error) {
      toast.error(error.message.response);
      console.log(error);
    }
  };
  return (
    <section className="h-[calc(100vh-60px)] flex flex-col justify-center items-center">
      <img src="./logo.png" width={150} alt="" />
      <TextH1 text="Welcome to Pokédex" className="mb-10" />
      <form onSubmit={handleInputName} className="w-[30rem]">
        <InputText
          placeholder="Type your name"
          background="bg-ligthblack"
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </section>
  );
};

export default Home;
