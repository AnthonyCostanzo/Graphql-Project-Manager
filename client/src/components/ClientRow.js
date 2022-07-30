import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { BsTrash } from "react-icons/bs";
const ClientRow = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });

  return (
    <>
      <tr className="text-center border-b-2 h-16 border-gray-200">
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
        <td className="">
          <button className="p-1" onClick={deleteClient}>
            <BsTrash className="text-red-500" size={24} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default ClientRow;
