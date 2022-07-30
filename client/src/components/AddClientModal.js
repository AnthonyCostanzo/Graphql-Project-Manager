import { useMutation } from "@apollo/client";
import { ADD_CLIENT, GET_CLIENTS } from "../mutations/clientMutations";
import { useState } from "react";
const AddClientModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { ADD_CLIENT } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [...clients, addClient],
        },
      });
    },
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || phone.trim() === "" || email.trim() === "")
      return;
    addClient(name, email, phone);
    setName("");
    setEmail("");
    setPhone("");
  };
  return <div>hello</div>;
};
