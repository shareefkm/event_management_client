import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminAxios from "../../Axios/AdminAxios";

const AddEvents = ({ isOpen, closeModal }) => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventUrl, setEventUrl] = useState("");

  const handleSubmit = async () => {
    try {
      // Combine date and time and create a JavaScript Date object
      const combinedDateTime = new Date(`${eventDate}T${eventTime}`);
      
      // Format the date in standard format (ISO 8601)
      const formattedDateTime = combinedDateTime.toISOString();

      const response = await AdminAxios.post("/addevent", {
        eventName,
        eventDateTime: formattedDateTime, // Send formatted date and time
        eventUrl,
      });

      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });

      closeModal();
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
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-10 w-96">
        <h2 className="text-2xl mb-4">Create New Event</h2>
        <div className="mb-4">
          <label
            htmlFor="eventName"
            className="block text-sm font-medium text-gray-700"
          >
            Event Name
          </label>
          <input
            id="eventName"
            type="text"
            placeholder="Enter Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="eventDate"
            className="block text-sm font-medium text-gray-700"
          >
            Event Date
          </label>
          <input
            id="eventDate"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="eventTime"
            className="block text-sm font-medium text-gray-700"
          >
            Event Time
          </label>
          <input
            id="eventTime"
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="eventUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Event Link
          </label>
          <input
            id="eventUrl"
            type="text"
            placeholder="Enter Event Link"
            value={eventUrl}
            onChange={(e) => setEventUrl(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSubmit}
          >
            Add Event
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEvents;
