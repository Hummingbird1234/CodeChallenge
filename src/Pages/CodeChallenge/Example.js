import React from "react";
import { useForm } from "react-hook-form";
import { database } from "./firebaseConfig";

export default function App() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    alert(data.name);
    database.ref("/data").set(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label for="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        ref={register({ required: true, maxLength: 30 })}
      />
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        ref={register({ required: true, maxLength: 30 })}
      />
      <input type="submit" />
    </form>
  );
}
