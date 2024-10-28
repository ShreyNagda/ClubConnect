import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

const fetchUsers = async () => {
  const { data } = await axios.get("users");

  return data; // Assuming the response contains an array of users
};

const SearchableDropdown = ({ handleChange, value, type }) => {
  console.log(value);
  const { data: users, isLoading, error } = useQuery("users", fetchUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState(value || []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users</div>;

  // Filter users based on search query (name, email, or username)
  const filteredUsers = users.filter(
    (user) =>
      user.name.includes(searchQuery.toLowerCase()) ||
      user.email.includes(searchQuery.toLowerCase()) ||
      user.username.includes(searchQuery.toLowerCase())
  );

  const handleSelectUser = (user) => {
    if (type === "faculty" && user.client_role !== "faculty") {
      toast.error("Cannot be faculty incharge");
    } else if (type === "club_admin" && user.client_role !== "student") {
      toast.error("Cannot be club admin, Is a " + user.client_role);
    } else {
      setSelectedUsers((prev) => {
        handleChange([...prev, user]);
        return [...prev, user];
      });
    }
    setSearchQuery("");
  };

  return (
    <div className="relative w-full flex-1 flex flex-col">
      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search users..."
        className="w-full px-4 py-2 border rounded-sm"
      />

      {/* Dropdown List */}
      {searchQuery && (
        <div className="absolute top-[40px] z-10 w-full mt-2 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500">{user.username}</p>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-600">No users found</div>
          )}
        </div>
      )}

      {/* Display Selected User */}
      {selectedUsers.length !== 0 && (
        <div className="p-1 rounded-md shadow-md flex gap-2">
          {selectedUsers.map((user) => (
            <div className="flex gap-2 rounded-sm m-1 bg-gray-300 p-2 flex-wrap">
              <p>{user.name}</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedUsers((prev) =>
                    prev.filter((item) => item != user)
                  );
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
