import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminAxios from "../../Axios/AdminAxios";

const EditUser = ({ showModal, closeModal, userId, userName }) => {
  const [editName, setEditName] = useState("");

  const toCloseModal = () => {
    setEditName("");
    closeModal();
  };
  //   useEffect(() => {
  //     const result = editName.trim().length >= 4;
  //     setValidName(result);
  //   }, [editName]);

  const handleEdit = async () => {
    try {
      const result = editName.trim().length >= 4;
      if (result) {
        const response = await AdminAxios.patch("/edituser", { userId, editName });
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        closeModal();
      }else{
        toast.error("Please Enter Valid Name" ,{
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
      }
    } catch (error) {
      toast.error(error.response?.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        showModal ? "visible" : "invisible"
      }`}
    >
      <div className="modal-container border rounded-md bg-gray-200">
        <div className="modal-content">
          <div className="rounded-t-md modal-header bg-blue-500 p-3 flex justify-between text-White items-center">
            <h2 className="text-xl font-bold"></h2>
            <button className="text-2xl" onClick={toCloseModal}>
              &times;
            </button>
          </div>
          <div className="modal-body p-3">
            <label htmlFor="userName" className="block mb-2">
              User Name:
            </label>
            <input
              placeholder={userName}
              type="text"
              id="userName"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full p-2 border border-gray-300"
            />
            <button
              onClick={handleEdit}
              className="bg-green-600 text-off-White mt-2 px-4 rounded-sm"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditUser;
