import TextH1 from "../components/TextH1";
import img404 from "../assets/img_404.png";

function PageError() {
  return (
    <>
      <div className="flex  flex-col justify-center items-center h-[calc(100vh-60px)]">
        <img src={img404} alt="" className="h-60 w-56 pb-4" />
        <TextH1 text="Page not found!" />
      </div>
    </>
  );
}

export default PageError;
