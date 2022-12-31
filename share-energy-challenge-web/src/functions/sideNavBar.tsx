import Image from "next/image";
import { useRouter } from "next/router";
import swal from "sweetalert";

import house from "../../assets/House.svg";
import cat from "../../assets/Cat.svg";
import dog from "../../assets/Dog.svg";
import signOut from "../../assets/SignOut.svg";
import user from "../../assets/User.svg";
import userList from "../../assets/UserList.svg";

export default function SideNavBar() {
  const router = useRouter();
  const navigateOnClick = (page: string) => {
    if (page === "logOut") {
      swal({
        title: `Are you sure you want to log-out?`,
        icon: "warning",
        buttons: {
          confirm: {
            text: "Yes. Procede.",
            value: true,
            visible: true,
          },
          cancel: {
            text: "I will stay a little longer",
            value: false,
            visible: true,
          },
        },
      }).then((logout) => {
        if (logout) {
          localStorage.checkbox = "";
          localStorage.username = "";
          localStorage.password = "";
          swal("You will be redirected");
          return router.push({ pathname: "/loginPage" });
        } else swal("Yeah! Stay with us a little longer!");
      });
    }
    if (page === "httpCat") return router.push({ pathname: "/home/httpCat" });
    if (page === "randomDog")
      return router.push({ pathname: "/home/randomDog" });
    if (page === "clients") return router.push({ pathname: "/home/clients" });
    if (page === "randomUser") {
      return router.push({ pathname: "/home/randomUser" });
    }
  };
  return (
    <nav
      className="
    bg-gray-800 flex flex-col justify-evenly
    w-28 gap-4 p-4 rounded-[0_1rem_1rem_0]"
    >
      <div
        className="cursor-pointer flex flex-col items-center"
        onClick={() => navigateOnClick("home")}
      >
        <Image
          className="transition transform hover:scale-150 duration-1000"
          src={house}
          width={50}
          alt="house svg"
          height={50}
        />
        Home
      </div>
      <div
        className="cursor-pointer flex flex-col items-center"
        onClick={() => navigateOnClick("randomUser")}
      >
        <Image
          className="transition transform hover:scale-150 duration-1000"
          src={user}
          width={50}
          alt="randomUser svg"
          height={50}
        />
        Random User
      </div>
      <div
        className="cursor-pointer flex flex-col items-center"
        onClick={() => navigateOnClick("httpCat")}
      >
        <Image
          className="transition transform hover:scale-150 duration-1000"
          src={cat}
          width={50}
          alt="cat svg"
          height={50}
        />
        HTTP Cat
      </div>
      <div
        className="cursor-pointer flex flex-col items-center"
        onClick={() => navigateOnClick("randomDog")}
      >
        <Image
          className=" transition transform hover:scale-150 duration-1000"
          src={dog}
          width={50}
          alt="randomDog svg"
          height={50}
        />
        Random Dog
      </div>
      <div
        className="cursor-pointer flex flex-col items-center"
        onClick={() => navigateOnClick("clients")}
      >
        <Image
          className="transition transform hover:scale-150 duration-1000"
          src={userList}
          width={50}
          alt="clients svg"
          height={50}
        />
        Clients List
      </div>
      <div
        className="cursor-pointer flex flex-col items-center"
        onClick={() => navigateOnClick("logOut")}
      >
        <Image
          className="transition transform hover:scale-150 duration-1000"
          src={signOut}
          width={50}
          alt="logOut svg"
          height={50}
        />
        Log-out
      </div>
    </nav>
  );
}
