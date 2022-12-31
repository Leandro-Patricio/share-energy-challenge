import { useRouter } from "next/router";

interface RandomDogProps {
  listOfDoggos: Array<string>;
}

export default function RandomDog(props: RandomDogProps) {
  const listOfDoggos = props.listOfDoggos;

  const handleRandomDog = () => {
    const randomNumber = Math.floor(Math.random() * listOfDoggos.length);

    const img: HTMLImageElement = document.getElementById(
      "mainImage"
    ) as HTMLImageElement;

    const errorMsg: HTMLDivElement = document.getElementById(
      "errorMsg"
    ) as HTMLDivElement;

    img.src = `https://random.dog/${listOfDoggos[randomNumber]}`;
    errorMsg?.classList.add("hidden");
    return;
  };

  const router = useRouter();

  const goBack = () => {
    return router.push({ pathname: "/home" });
  };
  return (
    <section className="flex flex-col  items-center">
      <h1 className="mb-10 text-5xl font-bold">randomDog</h1>
      <button
        className="bg-green-600
        hover:bg-green-500
             rounded-full w-[50%] p-3
             "
        onClick={handleRandomDog}
      >
        Click on me to random a dog
      </button>
      <div
        id="errorMsg"
        className=" hidden
      mt-4  w-[50%] rounded-xl
      p-3
       bg-red-500 
      "
      >
        Ooops. That image could not be shwon for some reason. <br />
        Showing backup image
      </div>
      <img
        id="mainImage"
        className=" m-[1rem_0] rounded-lg
         transition transform hover:scale-110 duration-1000 inline-block"
        src={`https://i.ytimg.com/vi/rmG5hKRuMKo/maxresdefault.jpg`}
        alt="backup image"
        width={500}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src =
            "https://i.ytimg.com/vi/rmG5hKRuMKo/maxresdefault.jpg";
          document.getElementById("errorMsg")?.classList.remove("hidden");
          /*   document.getElementById("errorMsg")?.classList.add("inline"); */
        }}
      />
      <button
        className="bg-purple-700
        transition transform  hover:bg-purple-500 duration-500
        rounded-full w-[50%] p-2
        
      "
        onClick={goBack}
      >
        Home
      </button>
    </section>
  );
}

export const getServerSideProps = async () => {
  const responseRandomDog = await fetch("https://random.dog/doggos");
  const dataRandomDog = await responseRandomDog.json();
  return {
    props: {
      listOfDoggos: dataRandomDog,
    },
  };
};
