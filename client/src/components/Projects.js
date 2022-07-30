import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  const { projects } = data ? data : [];
  return (
    <>
      {!loading && !error && data && (
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border-[1px] h-40 border-gray-300 p-5 rounded-md shadow-sm shadow-gray-700"
            >
              <div className="flex  ">
                <h2 className="text-xl">{project.name}</h2>
                <button className="ml-auto mr-2 bg-gray-200 bg-opacity-80 w-20 h-10 rounded-md">
                  <a href={`/project/${project.id}`}>View</a>
                </button>
              </div>

              <p>
                Status:{" "}
                <span className="font-semibold text-black">
                  {project.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
