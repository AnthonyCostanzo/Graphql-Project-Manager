import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { useState } from "react";
const AddClientModal = ({ closeModal }) => {
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

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (name.trim() === "" || phone.trim() === "" || email.trim() === "")
      return;
    addClient(name, email, phone);
    setName("");
    setEmail("");
    setPhone("");
    closeModal();
    console.log("hello");
  };
  return (
    <form
      onSubmit={onSubmitForm}
      className="grid gap-y-3 m-auto md:w-10/12 border-[1.5px] border-white mt-5 bg-gray-100 h-80 p-5 min-h-max rounded-md"
    >
      <h2>Add Client</h2>
      <input
        onChange={(event) => setName(event.target.value)}
        className="p-.5  border-[1.2px] border-black rounded-sm"
        type="text"
        name="name"
        placeholder=" name"
        required
      />
      <input
        onChange={(event) => setEmail(event.target.value)}
        className="p-.5  border-[1.2px] border-black rounded-sm"
        type="email"
        name="email"
        placeholder=" email"
        required
      />
      <input
        onChange={(event) => setPhone(event.target.value)}
        className="p-.5  border-[1.2px] border-black rounded-sm"
        type="text"
        name="phone"
        placeholder=" phone"
        required
      />
      <div className="grid grid-cols-2 items-end ml-auto gap-x-2">
        <button
          type="button"
          onClick={closeModal}
          className="bg-red-500 h-10 w-32 rounded-sm"
        >
          Close
        </button>
        <button type="submit" className="bg-green-300 h-10 w-32 rounded-sm">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddClientModal;
