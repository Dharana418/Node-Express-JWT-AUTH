import React, { useEffect, useState } from "react";

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch logged-in user info from cookie/session
    fetch("http://localhost:3000/read-cookies", {
      credentials: "include", // send cookies with request
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.jwt ? "Logged In" : "Guest");
      })
      .catch(() => setUser("Guest"));
  }, []);

  return (
    <div className="card">
      <h2>Welcome {user ? user : "Guest"}!</h2>
      <p>This is the home page.</p>
    </div>
  );
}

export default Home;
