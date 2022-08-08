import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJECT, GET_PROJECTS } from "../queries/projectQueries";
import { useParams, useNavigate } from "react-router-dom";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import EditProjectForm from "../components/EditProjectForm";

const Project = () => {
  const { projectId: id } = useParams();
  const navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });
  const { project } = data ? data : {};

  return (
    <>
      {data && (
        <div className="border-[1px] md:w-10/12 lg:w-8/12 m-auto pb-5 gap-y-5 flex flex-col border-gray-400 shadow-sm shadow-gray-500 py-5 px-10 mb-10">
          <button className="bg-gray-300 bg-opacity-50 rounded-sm w-16 h-8 ml-auto">
            <a href="/">Back</a>
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
              <p className="p-2">{project.client.name}</p>
              <p className="p-2">{project.client.email}</p>
              <p className="p-2">{project.client.phone}</p>
            </div>
          </div>

          <EditProjectForm project={project} />
          <button
            onClick={deleteProject}
            className="bg-red-500 p-5 rounded-md text-gray-50 mt-5"
          >
            Delete Project
          </button>
        </div>
      )}
    </>
  );
};

export default Project;
