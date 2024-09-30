import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

// Fetch clubs data using axios and react-query
const fetchClubs = async () => {
  const { data } = await axios.get("/api/clubs");
  return data;
};

const AdminClubs = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    established_year: "",
    type: "",
  });

  const { name, description, established_year, type } = formData;

  const { data: clubs, isLoading, error } = useQuery("clubs", fetchClubs);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (you can replace this with an actual POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/clubs", formData);
      toast.success("Club created successfully!");

      // Reset form
      setFormData({
        name: "",
        description: "",
        established_year: "",
        type: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <div>Loading clubs...</div>;
  if (error) return <div>Error fetching clubs!</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-4">Add a New Club</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            placeholder="Club Name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            placeholder="Club Description"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="established_year"
          >
            Established Year
          </label>
          <input
            id="established_year"
            name="established_year"
            value={established_year}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="number"
            placeholder="Year"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Type
          </label>
          <input
            id="type"
            name="type"
            value={type}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            type="text"
            placeholder="Club Type (e.g., Technical, Cultural)"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Club
        </button>
      </form>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Established Year</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club) => (
              <tr key={club._id} className="border-b">
                <td className="px-4 py-2">{club.name}</td>
                <td className="px-4 py-2">{club.description}</td>
                <td className="px-4 py-2">{club.established_year}</td>
                <td className="px-4 py-2">{club.type}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-500 mr-2"
                    // onClick={() => handleEditClick(image)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    // onClick={() => handleDeleteClick(image.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminClubs;
