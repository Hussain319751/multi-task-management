import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { retriveHelloworldBean } from "../api/HelloWorldapiService";

const Welcome = () => {
  const { username } = useParams();

  const [message, setMessage] = useState("");
  function callHelloworld() {
    retriveHelloworldBean()
      .then((res) => success(res))
      .catch((err) => failed(err));
  }
  const success = (res) => {
    console.log(res);
    setMessage(res.data.message);
  };
  const failed = (err) => {
    console.log(err);
  };

  return (
    <>
      <div>
        welcome {username}
        go to your todos <Link to="/todos">click.!</Link>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callHelloworld}>
          click to connect
        </button>
      </div>
      <div>{message}</div>
    </>
  );
};

export default Welcome;
