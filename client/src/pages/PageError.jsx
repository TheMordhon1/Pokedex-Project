import TextH1 from "../components/TextH1"

function PageError(){
    return(
        <>
        <div className="flex  flex-col justify-center items-center pt-20 ">
            <img src="img_404.png" alt="" className="h-60 w-56 pb-4"/>
            <TextH1 text="Page not found!"/>
        </div>
        </>
    )
}

export default PageError