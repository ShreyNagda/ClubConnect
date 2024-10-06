import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import SearchableDropdown from "../Common/SearchableDropdown";
import NotLoggedIn from "./NotLoggedIn";
import axios from "axios";
import { toast } from "react-toastify";
import ToggleButton from "../Common/ToggleButton";

function EditClub() {
  const location = useLocation();
  const clubData = location.state;
  const filePickerRef = useRef(null);

  const [totalCount, setTotalCount] = useState(
    clubData["description"].length || 0
  );
  const [file, setFile] = useState(clubData["logo"] || null);
  const [previewFile, setPreviewFile] = useState(clubData["logo"] || null);
  const [facultyIncharge, setFacultyIncharge] = useState(
    clubData["faculty_incharge"] || []
  );

  const navigate = useNavigate();

  const [clubName, setClubName] = useState(clubData["name"]);
  const [desc, setDesc] = useState(clubData["description"]);
  const [type, setType] = useState(clubData["type"]);
  const [year, setYear] = useState(clubData["established_year"]);

  function handleFileClick(ev) {
    filePickerRef.current.click();
  }

  function handleFileChange() {
    const _file = filePickerRef.current.files[0];
    if (_file) {
      setFile(_file);
      if (previewFile) {
        URL.revokeObjectURL(previewFile);
      }
      const url = URL.createObjectURL(_file);
      setPreviewFile(url);
    }
  }

  function handleFacultyIncharge(value) {
    setFacultyIncharge(value);
    console.log(value);
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const facultyData = facultyIncharge.map((user) => user._id);
    console.log(facultyData);
    try {
      console.log(facultyIncharge);
      const formData = new FormData();
      formData.append("name", clubName);
      formData.append("description", desc);
      formData.append("established_year", year);
      formData.append("image", file);
      formData.append("faculty_incharge", facultyData);
      formData.append("type", type);
      const res = await axios.put(`/clubs/${clubData["_id"]}`, formData);
      toast.success("Club added successfully!");
      navigate(-1);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  }

  if (
    !document.cookie.includes("token") ||
    window.localStorage.getItem("role") !== "admin"
  ) {
    return <NotLoggedIn />;
  }
  return (
    <>
      <div className="items-center justify-center hidden md:flex">
        <form
          className="flex flex-col items-center shadow-lg gap-2 p-4 md:w-4/5"
          onSubmit={handleSubmit}
        >
          <h2 className="text-left w-full text-2xl font-bold">Edit Club</h2>
          <input
            type="text"
            className="border px-1 py-1 rounded-sm w-full"
            placeholder="Enter Club / Society Name"
            value={clubName}
            onChange={(ev) => {
              setClubName(ev.target.value);
            }}
            required
          />
          <div className="w-full">
            <textarea
              className="border px-1 py-1 rounded-sm w-full"
              rows={10}
              maxLength={1000}
              placeholder="Enter Club / Society Description"
              value={desc}
              onChange={(ev) => {
                setTotalCount(ev.target.value.length);
                setDesc(ev.target.value);
              }}
            />
            <div className="text-right text-slate-400">
              {totalCount} / {1000}
            </div>
          </div>
          <input
            type="number"
            placeholder="Enter Established Year"
            className="border px-1 py-3 rounded-sm w-full"
            onChange={(ev) => setYear(Number(ev.target.value))}
            value={year}
            min={1999}
          />
          <div
            className="w-full flex items-center border px-1 py-1 rounded-sm"
            onClick={handleFileClick}
          >
            {previewFile && (
              <img
                src={previewFile}
                className="w-16 h-16 object-cover rounded-sm"
              />
            )}
            <input
              type="file"
              placeholder="Select file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              ref={filePickerRef}
            />
            <div
              className={
                file === null ? "text-slate-400 p-2" : "text-black ml-3 p-2"
              }
            >
              {file && file !== null ? file.name : "Select Logo"}
            </div>
          </div>
          <div className="w-full flex items-center rounded-sm">
            <div className="text-slate-400 mr-2">Select Faculty Incharge</div>
            <SearchableDropdown
              handleFacultyIncharge={handleFacultyIncharge}
              value={clubData["faculty_incharge"]}
            />
          </div>
          <ToggleButton onToggle={(value) => setType(value.toLowerCase())} />
          <input
            type="submit"
            value={"Edit Club"}
            className="bg-blue-400 w-1/2 p-3 self-start rounded-sm"
          />
        </form>
      </div>
    </>
  );
}

export default EditClub;