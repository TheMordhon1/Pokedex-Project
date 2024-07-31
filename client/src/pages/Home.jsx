import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import InputText from "../components/InputText";
import TextH1 from "../components/TextH1";
import useNavigation from "../hooks/useNavigation";

const Home = () => {
  const [name, setName] = useState("");
  const userLog = localStorage.getItem("username");

  const { handleNavigateTo, handleNavigateNoAudio } = useNavigation();
  const getUserName = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user");

      const username = response.data.filter((user) => user.username === name);

      if (username[0]?.username === name) {
        toast.success(`Welcome back, ${username[0].username}`, {
          theme: "dark",
          position: "top-right",
          progressStyle: { backgroundColor: "rgba(237, 213, 63, 1)" },
          icon: <FaCheckCircle className="text-3xl text-el_electric" />,
        });
      } else {
        await axios.post(`http://localhost:3000/user`, {
          username: name,
        });
        toast.success(`Welcome, ${name}`, {
          theme: "dark",
          position: "top-right",
          progressStyle: { backgroundColor: "rgba(237, 213, 63, 1)" },
          icon: <FaCheckCircle className="text-3xl text-el_electric" />,
        });
      }
      localStorage.setItem("username", name);
      handleNavigateTo(`/pokemon`);
    } catch (error) {
      console.log("error get username:", error);
      toast.error(error.message, { theme: "dark" });
    }
  };

  const handleInputName = async (e) => {
    e.preventDefault();
    try {
      await getUserName();
    } catch (error) {
      console.log("error input user:", error);
    }
  };

  useEffect(() => {
    if (userLog) {
      handleNavigateNoAudio("/pokemon");
    }
  }, []);
  return (
    <section className="h-[calc(100vh-60px)] flex flex-col justify-center items-center">
      <img src="./logo.png" width={150} alt="" />
      <TextH1 text="Welcome to Pokédex" className="mb-10" />
      <form onSubmit={handleInputName} className="max-w-[30rem] w-full">
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
