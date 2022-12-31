import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

interface RandomUserProps {
  randomUsersRaw: Array<object>;
}

export default function RandomUser(props: RandomUserProps) {
  const [search, setSearch] = useState("");
  const [numOfPeopleShown, setNumOfPeopleShown] = useState(5);
  const [pagination, setPagination] = useState(1);
  const [peopleSearched, setPeopleSearched] = useState(props.randomUsersRaw);
  const [peopleSearchedSliced, setPeopleSearchedSliced] = useState(
    props.randomUsersRaw
  );
  const [listOfPages, setListOfPages] = useState([]);

  // search
  useEffect(() => {
    if (search === "") {
      setPeopleSearched(props.randomUsersRaw);
    } else {
      setPeopleSearched(
        props.randomUsersRaw.filter((personSearched: any) => {
          if (personSearched.name.title.includes(search)) {
            return true;
          } else if (personSearched.name.first.includes(search)) {
            return true;
          } else if (personSearched.name.last.includes(search)) {
            return true;
          } else if (personSearched.email.includes(search)) {
            return true;
          } else if (personSearched.login.username.includes(search)) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }, [search]);

  //on peopleSearched
  useEffect(() => {
    const numOfPages = Math.ceil(peopleSearched.length / numOfPeopleShown);

    const paginating: any = [];
    for (let i = 1; i <= numOfPages; i++) {
      paginating.push(
        <div
          onClick={() => setPagination(i)}
          className="
            rounded-full 
           bg-yellow-500 text-black p-[0_.5rem] font-bold
             cursor-pointer
            "
        >
          {i}
        </div>
      );
    }
    setListOfPages(paginating);

    const numberOfStart = numOfPeopleShown * (pagination - 1);
    let numberOfEnd = +numberOfStart + +numOfPeopleShown;
    if (numberOfEnd > peopleSearched.length) {
      numberOfEnd = peopleSearched.length;
    }
    setPeopleSearchedSliced(peopleSearched.slice(numberOfStart, numberOfEnd));
  }, [peopleSearched]);

  // set the images on pagination
  useEffect(() => {
    const numberOfStart = numOfPeopleShown * (pagination - 1);
    let numberOfEnd = +numberOfStart + +numOfPeopleShown;
    if (numberOfEnd > peopleSearched.length) {
      numberOfEnd = peopleSearched.length;
    }

    setPeopleSearchedSliced(peopleSearched.slice(numberOfStart, numberOfEnd));
  }, [pagination]);

  const router = useRouter();
  const goBack = () => {
    return router.push({ pathname: "/home" });
  };

  return (
    <section className="h-screen w-screen">
      <h1 className="mb-10 text-5xl font-bold">Random User</h1>

      <form className="sticky top-0 bg-black rounded-lg flex justify-center gap-4">
        <label className="">
          <div className="mb-3 group text-xl">
            Search for people: name, username or e-mail
          </div>

          <input
            type="text"
            id="search"
            className="placeholder-gray-400 bg-gray-800 text-gray-400
            rounded-lg p-[.5rem_1rem]
            mb-8 w-[100%]"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, username or e-email"
          />
        </label>
      </form>
      <ol className="flex gap-4 flex-wrap text-center overflow-auto justify-center">
        {peopleSearchedSliced.map((user: any, index: number) => {
          return (
            <li
              key={user.login.password}
              className="group flex flex-col items-center w-80"
            >
              <div
                className="w-fit bg-gray-600 text-white text-center
              rounded p-2 absolute z-10 opacity-0 
              group-hover:visible group-hover:opacity-95
              transition opacity duration-100 text-sm
              flex flex-col justify-center flex-wrap
              "
              >
                <div>
                  <div>Other info:</div>
                  <div>Email: {user.email}</div>
                  <div>Username: {user.login.username}</div>
                  <div>Age: {user.dob.age}</div>
                </div>
              </div>
              <img
                src={user.picture.large}
                alt="random user picture"
                height={100}
                width={100}
              />
              <div>
                {index + 1 + (pagination - 1) * 5}. {user.name.title}{" "}
                {user.name.first} {user.name.last}
              </div>
            </li>
          );
        })}
      </ol>
      <nav
        id="pagination"
        className=" pagination
      flex justify-evenly bg-yellow-900 py-3 rounded-lg
      m-[1rem]"
      >
        {listOfPages.map((pages) => {
          return pages;
        })}
      </nav>
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
  const responseRandomUser = await axios.get(
    "https://randomuser.me/api/?results=50"
  );

  return {
    props: {
      randomUsersRaw: responseRandomUser.data.results,
    },
  };
};
