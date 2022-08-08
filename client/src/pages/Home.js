import Projects from "../components/Projects";
import Clients from "../components/Clients";
import { useState } from "react";
import AddClientModal from "../components/AddClientModal";
import { IoPerson } from "react-icons/io5";
import AddProjectModal from "../components/AddProjectModal";
export default function Home() {
  const [addClientModalOpen, setAddClientModalOpen] = useState(false);
  const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);
  const openClientModal = () => setAddClientModalOpen(true);
  const closeClientModal = () => setAddClientModalOpen(false);
  const openProjectModal = () => setAddProjectModalOpen(true);
  const closeProjectModal = () => setAddProjectModalOpen(false);
  return (
    <div className="relative space-x-2">
      {!addClientModalOpen && (
        <button
          className="bg-green-500 ml-2 relative text-gray-50 w-32 h-12 rounded-sm mb-2"
          onClick={openClientModal}
        >
          <span className="absolute left-2 top-3">
            {" "}
            <IoPerson size={20} />
          </span>
          <span className="ml-4"> Add Client</span>
        </button>
      )}
      {!addProjectModalOpen && (
        <button
          className="bg-blue-500 relative text-gray-50 w-32 h-12 rounded-sm mb-2"
          onClick={openProjectModal}
        >
          <span className="absolute left-2 top-3">
            {" "}
            <IoPerson size={20} />
          </span>
          <span className="ml-4"> Add Project</span>
        </button>
      )}
      {addClientModalOpen && (
        <div className="absolute z-20 left-10 w-10/12 ">
          <AddClientModal closeModal={closeClientModal} />
        </div>
      )}
      {addProjectModalOpen && (
        <div className="absolute z-20 left-10 w-10/12 ">
          <AddProjectModal closeModal={closeProjectModal} />
        </div>
      )}
      <div
        className={(addProjectModalOpen || addClientModalOpen) && "opacity-20"}
      >
        <Projects />
        <Clients />
      </div>
    </div>
  );
}
