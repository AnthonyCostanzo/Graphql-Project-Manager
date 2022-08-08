import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useState } from "react";
import { GET_CLIENTS } from "../queries/clientQueries";
const AddProjectModal = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState("");
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const { clients } = data;

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        },
      });
    },
  });

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (name.trim() === "" || description.trim() === "" || status.trim() === "")
      return;

    addProject(name, description, status, clientId);
    setName("");
    setDescription("");
    setStatus("");
    setClientId("");
    closeModal();
  };

  return (
    <form
      onSubmit={onSubmitForm}
      className="grid gap-y-3 m-auto md:w-10/12 border-[1.5px] border-white mt-5 bg-gray-100 h-80 p-5 min-h-max rounded-md"
    >
      <h2 className="text-xl">Add Project</h2>
      <label htmlFor="name">Name</label>
      <input
        onChange={(event) => setName(event.target.value)}
        className="p-.5  border-[1.2px] border-black rounded-sm"
        type="text"
        name="name"
        id="name"
        placeholder=" name"
        required
      />
      <div className="flex flex-col max-h-32">
        <label htmlFor="description">Description</label>
        <textarea
          onChange={(event) => setDescription(event.target.value)}
          className="h-80 border-[1.2px] border-black rounded-sm "
          placeholder=" description"
          required
          id="description"
        />
      </div>

      <label htmlFor="status">Status</label>
      <select
        onChange={(event) => setStatus(event.target.value)}
        className="p-.5  border-[1.2px] border-black rounded-sm"
        type="text"
        name="status"
        value={status}
        id="status"
        placeholder=" phone"
        required
      >
        <option value={""}>Select Status</option>
        <option value={"new"}>Not Started</option>
        <option value={"progress"}>In Progress</option>
        <option value={"completed"}>Completed</option>
      </select>
      <label htmlFor="status">Client</label>
      <select
        onChange={(event) => setClientId(event.target.value)}
        className="p-.5  border-[1.2px] border-black rounded-sm"
        type="text"
        name="client"
        id="client"
        placeholder=" phone"
        required
      >
        <option value="">Select Client</option>
        {data &&
          clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
      </select>

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

export default AddProjectModal;
