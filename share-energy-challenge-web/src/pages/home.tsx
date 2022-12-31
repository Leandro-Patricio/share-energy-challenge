import { useRouter } from "next/router";
import SideNavBar from "../functions/sideNavBar";

import userList from "../../assets/UserList.svg";
import Image from "next/image";
import swal from "sweetalert";

interface HomeProps {
  randomUserPicture: string;
  HTTPCatStatus: number;
  randomDogPicture: string;
}

export default function Home(props: HomeProps) {
  const router = useRouter();
  const goToPage = (page: string) => {
    if (page === "RandomUser")
      return router.push({ pathname: "/home/randomUser" });
    if (page === "HTTPCat") return router.push({ pathname: "/home/httpCat" });
    if (page === "RandomDog")
      return router.push({ pathname: "/home/randomDog" });

    if (page === "Clients") {
      swal({
        title: "Is the server on?",
        text: `If the server is not online, or you do not even know what i'm talking about, please, quit.`,
        icon: "warning",
        buttons: {
          confirmServerOn: {
            text: "My server is on. Procede.",
            value: true,
            visible: true,
          },
          cancel: {
            text: "Not now",
            value: false,
            visible: true,
          },
        },
        dangerMode: true,
      }).then((willFollowUp) => {
        if (willFollowUp) {
          return router.push({ pathname: "/home/clients" });
        } else {
          return swal({
            text: `Back to home`,
            icon: "success",
          });
        }
      });
    }
  };

  return (
    //
    <section
      className="w-screen h-screen
     flex
     "
    >
      <SideNavBar />
      <main className="p-5 w-full h-full">
        <h1 className="mb-10 text-5xl font-bold">
          Em qual página você deseja navegar?
        </h1>

        <nav className="flex flex-col  justify-evenly  gap-4">
          <div className="flex justify-evenly items-center">
            <button onClick={() => goToPage("RandomUser")}>
              Random User
              <img
                className=" transition transform hover:scale-110 duration-1000 rounded-lg"
                src={props.randomUserPicture}
                alt="random image from randomUser API"
                width={200}
              />
            </button>
            <button onClick={() => goToPage("HTTPCat")}>
              HTTP Cat
              <img
                className=" transition transform hover:scale-110 duration-1000 rounded-lg"
                src={`https://http.cat/${props.HTTPCatStatus}`}
                alt="random image from HTTP Cat"
                width={200}
              />
            </button>
          </div>

          <div className="flex justify-evenly items-center">
            <button onClick={() => goToPage("RandomDog")}>
              <img
                className=" transition transform hover:scale-110 duration-1000 rounded-lg"
                src={props.randomDogPicture}
                alt="random image from Random Dog"
                width={200}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    "https://i.ytimg.com/vi/rmG5hKRuMKo/maxresdefault.jpg";
                }}
              />
              Random Dog
            </button>
            <button onClick={() => goToPage("Clients")}>
              <Image
                className=" transition transform hover:scale-110 duration-1000 rounded-lg"
                src={userList}
                alt="Image to clients list"
                width={200}
              />
              Lista de Clientes
            </button>
          </div>
        </nav>
      </main>
    </section>
  );
}

export const getServerSideProps = async () => {
  const responseRandomUser = await fetch(
    "https://randomuser.me/api/?inc=picture"
  );
  const dataRandomUser = await responseRandomUser.json();

  const possibleStatus = [
    100, 101, 102, 103, 200, 201, 202, 203, 204, 206, 207, 300, 301, 302, 303,
    304, 305, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410,
    411, 412, 413, 414, 415, 416, 417, 418, 420, 421, 422, 423, 424, 425, 426,
    429, 431, 444, 450, 451, 497, 498, 499, 500, 501, 502, 503, 504, 506, 507,
    508, 509, 510, 511, 521, 522, 523, 525, 599,
  ];
  const randomStatus =
    possibleStatus[Math.floor(Math.random() * possibleStatus.length)];

  const responseRandomDog = await fetch("https://random.dog/woof.json");
  const dataRandomDog = await responseRandomDog.json();

  return {
    props: {
      randomUserPicture: dataRandomUser.results[0].picture.large,
      HTTPCatStatus: randomStatus,
      randomDogPicture: dataRandomDog.url,
    },
  };
};
