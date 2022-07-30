import { useQuery } from "@apollo/client";
// import { useState, useEffect } from "react";
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";
export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const { clients } = data ? data : [];
  return (
    <>
      {!loading && !error && data && (
        <table className="w-full divide-y-2 border-collapse border-2 border-gray-200">
          <thead className="h-12">
            <tr className="">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody className="">
            {clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
