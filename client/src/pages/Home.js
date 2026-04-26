import { useEffect, useState } from "react";
import { getProtected } from "../api/auth";

export default function Home() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getProtected()
      .then((res) => setMsg(res.data.message))
      .catch(() => setMsg("Not logged in"));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>{msg}</p>
    </div>
  );
}
