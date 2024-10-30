import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Modal from "../Common/Modal"; // Import your reusable Modal component
import { Link, useLocation, useNavigate } from "react-router-dom";

// Fetch clubs data using axios and react-query
const fetchClubs = async () => {
  const { data } = await axios.get("clubs");
  return data;
};
function AdminClubs() {
  const location = useLocation();
  const {
    data: clubs,
    isLoading,
    error,
    refetch,
  } = useQuery("admin-clubs", fetchClubs);

  useEffect(() => {
    refetch();
  }, [location]);

  const [selectedClub, setSelectedClub] = useState(null); // Track the selected club for deletion
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleDeleteClick = (club) => {
    setSelectedClub(club); // Set the selected club
    setIsModalOpen(true); // Open confirmation modal
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`clubs/${selectedClub._id}`);
      toast.success("Club deleted successfully!");
      setIsModalOpen(false);
      refetch(); // Refresh clubs list after deletion
    } catch (err) {
      toast.error("Failed to delete club.");
    }
  };
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedClub(null); // Clear the selected club
  };

  const onEditClub = (club) => {
    console.log(club);
    navigate(`/club/edit`, { state: club });
  };
  if (isLoading) return <div>Loading clubs...</div>;
  if (error) return <div>Error fetching clubs!</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Add Club Button */}
      <div className="mb-4">
        <Link
          className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
          to={"/club/add"}
        >
          Add New Club / Society
        </Link>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Established Year</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Faculty In-charge</th>
              <th className="px-4 py-2">Club Admin</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club) => (
              <tr key={club._id} className="border-b items-center">
                <td className="px-4 py-2 text-center">{club.name}</td>
                <td className="px-4 py-2 text-center">
                  {club.established_year}
                </td>

                <td className="px-4 py-2 text-center">
                  {club.type[0].toUpperCase() + club.type.substring(1)}
                </td>
                <td className="px-4 py-2 text-center max-w-15">
                  {club.faculty_incharge
                    ? club.faculty_incharge
                        ?.map((incharge) => incharge.name)
                        .join(", ")
                    : "N/A"}
                </td>
                <td className="px-4 py-2 text-center max-w-15">
                  {club.club_admin
                    ? club.club_admin
                        ?.map((incharge) => incharge.name)
                        .join(", ")
                    : "N/A"}
                </td>
                <td className="px-4 py-2 flex">
                  <button
                    className="text-blue-500 mr-4"
                    onClick={() => onEditClub(club)}
                  >
                    <AiFillEdit size={20} />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteClick(club)}
                  >
                    <AiFillDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Delete Confirmation"
          message={`Are you sure you want to delete the club "${selectedClub?.name}"?`}
          onConfirm={confirmDelete}
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
}

export default AdminClubs;
