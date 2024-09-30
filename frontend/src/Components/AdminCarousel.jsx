import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

function AdminCarousel() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(null);

  const [currentImage, setCurrentImage] = useState(null);
  const formRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const fetchData = async () => {
    return axios.get("/api/carousel/").then((res) => res.data);
  };

  const {
    data: images,
    error,
    isLoading,
    refetch,
  } = useQuery("imagesData", fetchData);

  const handleImageChange = (ev) => {
    setFile(ev.target.files[0]);
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    const preview = URL.createObjectURL(ev.target.files[0]);
    setPreviewImage(preview);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      console.log({ file, text, url });
      var data = new FormData();
      data.append("image", file);
      data.append("text", text);
      if (url !== null) {
        data.append("url", url);
      }

      if (currentImage === null) {
        // console.log()
        const res = await axios.post("api/carousel", data);
        toast.success("Image added successfully!");
      } else {
        const res = await axios.put(`api/carousel/${currentImage.id}`, data);
        console.log(res.data);
      }
      refetch();
      reset();
      setCurrentImage(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = (image) => {
    console.log(image);
    setCurrentImage(image);
    setText(image.text);
    setFile(image.image);
    setPreviewImage(image.image);
  };
  const handleDeleteClick = async (id) => {
    console.log(id);
    if (confirm("Are you sure to delete this image?")) {
      try {
        const res = await axios.delete(`/api/carousel/${id}`);
        console.log(res);
        toast.success("Image deleted successfully!");
        refetch();
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    }
  };

  const reset = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setFile(undefined);
    setText("");
    setUrl("");
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Carousel Images</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full md:flex hidden gap-3 bg-white justify-center items-center shadow-md mb-2 p-2 sticky top-[96px]"
        ref={formRef}
      >
        <div
          onClick={() => {
            imageRef.current.click();
          }}
          className="border h-32 p-1 px-3 flex flex-col items-center justify-center cursor-pointer"
        >
          {file && <img src={previewImage} alt="" className="h-16" />}
          <div>{(file && file.name) || "Upload Image"}</div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={imageRef}
            onChange={handleImageChange}
            name="imageInput"
            required={currentImage === null}
          />
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            onChange={(ev) => setText(ev.target.value)}
            value={text}
            placeholder="Enter text"
            className="border px-1 py-1 rounded-sm"
            required
          />
          <input
            type="text"
            onChange={(ev) => setUrl(ev.target.value)}
            value={url}
            placeholder="Enter url"
            className="border px-1 py-1 rounded-sm"
          />
          <input
            type="submit"
            value={
              currentImage === null ? "Add Image to Carousel" : "Edit Image"
            }
            className="bg-blue-400 px-2 py-1 rounded-sm"
          />
        </div>
      </form>
      {isLoading && <div>Loading</div>}
      {error && <div>{error}</div>}
      {images && (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Preview</th>
              <th className="py-2 px-4 border-b">Text</th>
              <th className="py-2 px-4 border-b">URL</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images &&
              images.map((image) => (
                <tr key={image.id}>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={image.image}
                      alt={image.text}
                      className="h-16 object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{image.text}</td>
                  <td className="py-2 px-4 border-b">
                    {image.url !== null ? image.url : ""}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="text-blue-500 mr-2"
                      onClick={() => handleEditClick(image)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteClick(image.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
}
export default AdminCarousel;
