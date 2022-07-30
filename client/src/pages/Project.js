import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { useParams } from "react-router-dom";
const Project = () => {
  const { projectId: id } = useParams();
  console.log(id);
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });
  const { project } = data ? data : {};
  console.log(project);

  return (
    <>
      {data && (
        <div className="border-[1px] md:w-10/12 lg:w-8/12 m-auto pb-20  gap-y-5 flex flex-col border-gray-400 shadow-sm shadow-gray-500 py-5 px-10 min-h-max">
          <button className="bg-gray-300 bg-opacity-50 rounded-sm w-16 h-8 ml-auto">
            Back
          </button>
          <div>
            <h1 className="text-2xl">{project.name}</h1>
            <p className="max-w-lg">{project.description}</p>
          </div>
          <div>
            <h3 className="font-semibold">Project Status </h3>
            <p>{project.status}</p>
          </div>

          <div>
            <h2 className="mb-2">Client Information</h2>
            <div className="grid shadow-sm shadow-gray-500 border-[1.5px] border-gray-400 divide-y-2 divide-gray-400">
              <p className="p-2">{"Tom Doe"}</p>
              <p className="p-2">{"a@gmail.com"}</p>
              <p className="p-2">{"123-456-7890"}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
