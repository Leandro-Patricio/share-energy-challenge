import { FormEvent, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { useRouter } from "next/router";
import swal from "sweetalert";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  //automatic login
  useEffect(() => {
    const usernameCheck = document.getElementById(
      "username"
    ) as HTMLInputElement;

    const passwordCheck = document.getElementById(
      "password"
    ) as HTMLInputElement;

    if (usernameCheck.value === "" && passwordCheck.value === "") return;

    const automaticLogin = async () => {
      await loginOnServer();
    };
    automaticLogin();
  }, []);

  const loginOnServer = async () => {
    const checkBoxRM = document.getElementById(
      "rememberMe"
    ) as HTMLInputElement;

    const usernameCheck = document.getElementById(
      "username"
    ) as HTMLInputElement;

    const passwordCheck = document.getElementById(
      "password"
    ) as HTMLInputElement;

    if (
      localStorage.checkbox &&
      localStorage.username !== "" &&
      localStorage.password !== ""
    ) {
      checkBoxRM?.setAttribute("checked", "checked");
      usernameCheck.value = localStorage.username;
      passwordCheck.value = localStorage.password;
    } /* else {
      checkBoxRM.removeAttribute("checked");
      usernameCheck.value = "";
      passwordCheck.value = "";
    }
 */
    swal({
      title: "Is the server on?",
      text: `If the server is not online, or you do not even know what i'm talking about, please, click in ok.`,
      icon: "warning",
      buttons: {
        confirmServerOn: {
          text: "My server is on. Procede.",
          value: "serverOn",
          visible: true,
        },
        confirmServerless: {
          text: "Server is off, but i wanna login",
          value: "serverOff",
          visible: true,
        },
        cancel: {
          text: "Naaah, forget it.",
          value: "exit",
          visible: true,
        },
      },
      dangerMode: true,
    }).then(async (value) => {
      if (value === "exit") return swal("Until next time");

      if (value === "serverOff") {
        if (
          usernameCheck.value === "desafiosharenergy" &&
          passwordCheck.value === "sh@r3n3rgy"
        ) {
          swal("Welcome");
          return router.push({ pathname: "/home" });
        } else swal("Username or password wrong");
      }

      if (value === "serverOn") {
        try {
          const response = await api.post(`/login`, {
            username: usernameCheck.value,
            password: passwordCheck.value,
          });

          localStorage.checkbox = checkBoxRM.value;
          localStorage.username = usernameCheck.value;
          localStorage.password = passwordCheck.value;

          return router.push({ pathname: "/home/randomUser" });
        } catch (err: any) {
          console.log(username);
          swal({
            title: `Ops!`,
            text: err.response.data,
            icon: "warning",
          });
        }
      }
    });
  };

  const loginButtonPressed = async (e: FormEvent) => {
    e.preventDefault();
    await loginOnServer();
  };

  return (
    <main className="h-screen w-screen flex flex-col justify-center">
      <h1 className="mb-10 text-5xl font-bold">Login page</h1>
      <form
        onSubmit={loginButtonPressed}
        className="flex flex-col items-center"
      >
        <label className="">
          <div className="mb-3 group text-2xl">
            Username
            <span
              className="
            invisible
            w-auto rounded-md p-[.3rem]
            bg-gray-600 text-gray-400
            absolute z-10 ml-5 
            group-hover:visible
            text-sm
          "
            >
              Aqui vai uma dica das boas: desafiosharenergy
            </span>
          </div>

          <input
            type="text"
            id="username"
            className="placeholder-gray-600 bg-gray-800 text-gray-400
            rounded-lg p-[.5rem_1rem]
            mb-8
            "
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </label>

        <label className="">
          <div className="mb-3 group text-2xl">
            Password
            <span
              className="
            invisible
            w-auto rounded-md p-[.3rem]
            bg-gray-600 text-gray-400
            absolute z-10 ml-5 
            group-hover:visible
            text-sm
          "
            >
              Outra dica supimpa: sh@r3n3rgy
            </span>
          </div>

          <input
            id="password"
            className="placeholder-gray-600 bg-gray-800 text-gray-400
          rounded-lg p-[.5rem_1rem]
          mb-3
          "
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </label>

        <div>
          <input
            type="checkbox"
            value="lsRememberMe"
            id="rememberMe"
            className="mr-4"
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        <button
          className="
        mt-8 p-[1rem_2rem] rounded-lg 
        bg-purple-800
        hover:bg-purple-700
        "
          type="submit"
        >
          Login
        </button>
      </form>
    </main>
  );
}
