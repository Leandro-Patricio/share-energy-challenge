import { useRouter } from "next/router";
import swal from "sweetalert";
import { api } from "../../lib/axios";

import XCircle from "../../../assets/XCircle.svg";
import Pencil from "../../../assets/Pencil.svg";
import UserCirclePlus from "../../../assets/UserCirclePlus.svg";
import UnorderedList2 from "../../../assets/UnorderedList2.svg";

import Image from "next/image";
import { useState } from "react";
import ClientForm from "../../functions/clientForm";

interface ClientsProsps {
  listOfClients: Array<object>;
}

export default function Clients(props: ClientsProsps) {
  const router = useRouter();
  const goBack = () => {
    return router.push({ pathname: "/home" });
  };

  const deleteUser = async (id: string, name: string) => {
    swal({
      title: "Caution!",
      text: `Are you sure you want to delete the user ${name}?`,
      icon: "warning",
      buttons: {
        delete: {
          text: "Yes. Procede",
          value: true,
          visible: true,
        },
        cancel: {
          text: "Naaah, forget it.",
          value: false,
          visible: true,
        },
      },
      dangerMode: true,
      /*      buttons: true, */
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await api.delete("clients", {
            data: {
              id: id,
            },
          });
          return swal({
            text: `User deleted sucessfully`,
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
      } else {
        swal("That was close");
      }
    });
  };

  const [registerNewUser, setRegisterNewUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [listOfUsers, setListOfUsers] = useState(true);

  const [nameForEditing, setNameForEditing] = useState("");
  const [emailForEditing, setEmailForEditing] = useState("");
  const [phoneForEditing, setPhoneForEditing] = useState("");
  const [adressForEditing, setAdressForEditing] = useState("");
  const [cpfForEditing, setCpfForEditing] = useState("");
  const [idForEditing, setIdForEditing] = useState("");

  const openUserRegister = () => {
    setListOfUsers(false);
    setEditUser(false);
    setRegisterNewUser(true);
  };
  const openListOfUsers = () => {
    setRegisterNewUser(false);
    setEditUser(false);
    setListOfUsers(true);
  };
  const openUserEdit = (client: any) => {
    setListOfUsers(false);
    setRegisterNewUser(false);
    setEditUser(true);

    setNameForEditing(client.name);
    setEmailForEditing(client.email);
    setPhoneForEditing(client.phone);
    setAdressForEditing(client.adress);
    setCpfForEditing(client.cpf);
    setIdForEditing(client.id);
  };

  return (
    <section>
      <h1 className="mb-10 text-5xl font-bold">Clients </h1>
      <div className="flex justify-evenly mb-4">
        <div className="flex flex-col  items-center">
          <Image
            onClick={() => openUserRegister()}
            src={UserCirclePlus}
            alt="add new user"
            width={50}
            className=" cursor-pointer"
          />
          <span> Add new user</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            onClick={() => openListOfUsers()}
            src={UnorderedList2}
            alt="show users list"
            width={51}
            className=" cursor-pointer"
          />
          <span> User list </span>
        </div>
      </div>

      {registerNewUser ? (
        <ClientForm typeOfSubmit="Register" />
      ) : editUser ? (
        <ClientForm
          typeOfSubmit="Edit"
          nameEdit={nameForEditing}
          adressEdit={adressForEditing}
          cpfEdit={cpfForEditing}
          emailEdit={emailForEditing}
          phoneEdit={phoneForEditing}
          id={idForEditing}
        />
      ) : (
        <ul id="listOfClients" className="listOfClients mx-4">
          {props.listOfClients.map((client: any) => {
            return (
              <li
                key={client.id}
                className="grid grid-cols-[.5fr_.5fr_2fr_5fr] items-center
              p-[.5rem_.5rem] 
             border-b-2 border-gray-600 rounded-xl
            "
              >
                <button>
                  <Image
                    src={Pencil}
                    onClick={() => openUserEdit(client)}
                    alt="pencil edit"
                  />
                </button>
                <button onClick={() => deleteUser(client.id, client.name)}>
                  <Image src={XCircle} alt="X delete user" />
                </button>
                <div>{client.name}</div>
                <ul className="flex flex-col flex-wrap items-start">
                  <li>Email: {client.email}</li>
                  <li>CPF: {client.cpf}</li>
                  <li>Phone: {client.phone}</li>
                  <li>Adress: {client.adress}</li>
                </ul>
              </li>
            );
          })}
        </ul>
      )}

      <button
        className="bg-purple-700
        transition transform  hover:bg-purple-500 duration-500
        rounded-full w-[50%] p-2 mt-4
        
      "
        onClick={goBack}
      >
        Home
      </button>
    </section>
  );
}

export const getServerSideProps = async () => {
  const response = await api.get("/clients");
  return {
    props: { listOfClients: response.data.clients },
  };
};
