import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECT } from "../queries/projectQueries";
import { useState } from "react";
import { GET_CLIENTS } from "../queries/clientQueries";
const EditProjectForm = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(project.status);

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (name.trim() === "" || description.trim() === "" || status.trim() === "")
      return;

    updateProject(name, description, status);
    setName("");
    setDescription("");
    setStatus("");
  };

  return (
    <form
      onSubmit={onSubmitForm}
      className="grid gap-y-3 mt-2 bg-gray-100  min-h-max rounded-md"
    >
      <h2 className="text-xl">Update Project Details</h2>
      <label htmlFor="name">Name</label>
      <input
        onChange={(event) => setName(event.target.value)}
        className="p-1  border-[1.2px] border-black rounded-sm"
        type="text"
        value={name}
        name="name"
        id="name"
        placeholder=" name"
        required
      />
      <div className="flex flex-col max-h-32">
        <label htmlFor="description">Description</label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="h-80 p-1 border-[1.2px] border-black rounded-sm "
          placeholder=" description"
          required
          id="description"
        />
      </div>

      <label htmlFor="status">Status</label>
      <select
        onChange={(event) => setStatus(event.target.value)}
        className="p-1  border-[1.2px] border-black rounded-sm"
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

      <div className="grid items-end ml-auto gap-x-2">
        <button type="submit" className="bg-green-300 h-10 w-32 rounded-sm">
          Edit
        </button>
      </div>
    </form>
  );
};

export default EditProjectForm;
