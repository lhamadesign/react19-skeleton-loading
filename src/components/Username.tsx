import { use, useEffect, useState } from "react";

interface User {
  name: string;
  id: number;
}

const fetchUser = async (): Promise<User> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        name: "Paulo",
        id: 152,
      });
    }, 4000)
  );
};

export default function UserName() {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      return await fetchUser();
    }

    fetchData().then((user) => setUser(user));
  }, []);

  if (!user) {
    return "Loading.......";
  }

  return (
    <div
      key={user.id}
      className="link"
      style={{
        display: "flex",
        padding: "6px 8px",
        margin: "12px",
        border: "solid 1px black",
        textWrap: "nowrap",
        color: "white",
      }}
    >
      {`${user.id} - ${user.name}`}
    </div>
  );
}
