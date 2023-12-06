import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

import { toast } from "react-toastify";

import AdminAxios from "../../Axios/AdminAxios";
import EditUser from "./EditUser";
import { userLogout } from "../../Redex/Auth/UserSlice";

function Tables({ path, action }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [datas, setDatas] = useState([]);
  const [Is_blocked, setIs_Blocked] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [isDeleted, setIsdeleted] = useState(false)

  useEffect(() => {
    AdminAxios.get(path).then((response) => {
      setDatas(response.data.users);
    }).catch((error)=>{
        console.log(error);
    })
  }, [Is_blocked, isDeleted, isModalOpen]);

  const handleBlockStatus = async (id) => {
    AdminAxios.patch(action, { id })
      .then((response) => {
        if (response.data.success) {
            dispatch(userLogout())
          setIs_Blocked(!Is_blocked);
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      });
  };

  const editName = (userId, userName)=>{
    setUserId(userId)
    setUserName(userName)
    setIsModalOpen(true)

  }
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelet = async (userId) => {
    try {
        const result = await Swal.fire({
            title: "Do you really want to delete this product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel",
          });
          if (result.isConfirmed){
              const response = await AdminAxios.patch('/deleteuser',{userId})
              console.log(response);
                setIsdeleted(!isDeleted);
                toast.success(response.data.message, {
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
    <div className="overflow-x-auto pt-3">
      <table className="min-w-full divide-y divide-gray-200 bg-table-blue text-off-White">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              #
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"></th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {datas.map((data, i) => (
            <tr
              key={data._id}
              className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="px-6 py-2 whitespace-nowrap">{i + 1}</td>
              <td className="px-6 py-2 whitespace-nowrap">{data.name}</td>
              <td className="px-6 py-2 whitespace-nowrap">{data.email}</td>
              <td className="px-6 py-2 whitespace-nowrap">
                {data.is_blocked ? (
                  <button
                    className="text-blue-600 hover:text-blue-900 mr-2"
                    onClick={() => handleBlockStatus(data._id)}
                  >
                    Ublock
                  </button>
                ) : (
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleBlockStatus(data._id)}
                  >
                    Block
                  </button>
                )}
              </td>
              <td className="px-6 py-2 whitespace-nowrap flex">
                {" "}
                <span
                  className="mr-6 text-blue-500  cursor-pointer"
                  onClick={() => {
                    editName(data._id, data.name);
                  }}
                >
                  <FaRegEdit />
                </span>
                <span className="text-red-500  cursor-pointer" onClick={()=>handleDelet(data._id)}>
                  <MdOutlineDeleteForever />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditUser
       showModal={isModalOpen}
       closeModal={closeModal}
       userId={userId}
       userName={userName}
       />
    </div>
  );
}

export default Tables;
