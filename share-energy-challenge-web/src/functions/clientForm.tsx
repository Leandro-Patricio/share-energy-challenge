import { useRouter } from "next/router";
import { useState, FormEvent } from "react";
import swal from "sweetalert";
import { api } from "../lib/axios";

interface ClientFormProps {
  typeOfSubmit: string;
  id?: string;
  nameEdit?: string;
  emailEdit?: string;
  phoneEdit?: string;
  adressEdit?: string;
  cpfEdit?: string;
}

export default function ClientForm(props: ClientFormProps) {
  const router = useRouter();

  const [name, setName] = useState(props.nameEdit);
  const [email, setEmail] = useState(props.emailEdit);
  const [phone, setPhone] = useState(props.phoneEdit);
  const [adress, setAdress] = useState(props.adressEdit);
  const [cpf, setCpf] = useState(props.cpfEdit);

  const register = async () => {
    try {
      const response = await api.post("clients", {
        name: name,
        email: email,
        phone: phone,
        adress: adress,
        cpf: cpf,
      });
      return swal({
        title: `Congratilations`,
        text: `${name} registered sucessfully`,
        icon: "sucess",
      }).then(() => {
        setName("");
        setEmail("");
        setPhone("");
        setAdress("");
        setCpf("");
        location.reload();
      });
    } catch (err: any) {
      swal({
        title: `Ops!`,
        text: err.response.data,
        icon: "warning",
      });
    }
  };
  const edit = async () => {
    try {
      const response = await api.put("clients", {
        id: props.id,
        name: name,
        email: email,
        phone: phone,
        adress: adress,
        cpf: cpf,
      });
      return swal({
        title: `Congratilations`,
        text: `${name} edited sucessfully`,
        icon: "success",
      }).then(() => {
        location.reload();
      });
    } catch (err: any) {
      swal({
        title: `Ops!`,
        text: err.response.data,
        icon: "warning",
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (props.typeOfSubmit === "Register") await register();
    if (props.typeOfSubmit === "Edit") await edit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mx-5 gap-4">
      <h1 className=" text-2xl font-bold">{props.typeOfSubmit} </h1>
      <label className="name flex ">
        <div className="text-lg pr-2">Name:</div>
        <input
          value={name}
          type="text"
          className="placeholder-gray-400 bg-gray-800 text-gray-400
          rounded-lg p-[.5rem_1rem] w-[30rem]
        "
          onChange={(e) => setName(e.target.value)}
          placeholder="Name, username or e-email"
        />
      </label>

      <label className="email flex ">
        <div className="text-lg pr-2">Email:</div>
        <input
          value={email}
          type="email"
          className="placeholder-gray-400 bg-gray-800 text-gray-400
        rounded-lg p-[.5rem_1rem] w-[30rem]
        "
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
      </label>
      <label className="phone flex ">
        <div className="text-lg pr-2">Phone:</div>
        <input
          value={phone}
          type="text"
          className="placeholder-gray-400 bg-gray-800 text-gray-400
        rounded-lg p-[.5rem_1rem] w-[30rem]
        "
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(XX)XXXXX-XXXXX"
        />
      </label>
      <label className="adress flex ">
        <div className="text-lg pr-2">Adress:</div>
        <input
          value={adress}
          type="text"
          className="placeholder-gray-400 bg-gray-800 text-gray-400
        rounded-lg p-[.5rem_1rem] w-[30rem]
        "
          onChange={(e) => setAdress(e.target.value)}
          placeholder="Adress"
        />
      </label>
      <label className="cpf flex ">
        <div className="text-lg pr-2">CPF:</div>
        <input
          value={cpf}
          type="text"
          className="placeholder-gray-400 bg-gray-800 text-gray-400
        rounded-lg p-[.5rem_1rem] w-[30rem]
      "
          onChange={(e) => setCpf(e.target.value)}
          placeholder="XXX.XXX.XXX-XX"
        />
      </label>

      <button
        className="bg-red-700
            transition transform  hover:bg-red-500 duration-500
            rounded-full p-2 
          "
        type="submit"
      >
        {props.typeOfSubmit}
      </button>
    </form>
  );
}
