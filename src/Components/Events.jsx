import { useEffect, useState } from "react";
import useWidth from "./UseWidthSize";
import { useSelector } from "react-redux";
import { parseISO, isPast } from "date-fns";
import Spinner from "./Spinner";
import UserAxios from "../Axios/UserAxios";

const Events = () => {
  const userId = useSelector((state) => state.user._id);
  const [events, setEvents] = useState([]);
  const [profile, setProfile] = useState([]);
  const width = useWidth();
  const { token } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      const response = await UserAxios.get("/events");
      setEvents(response.data.event);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="main w-screen">
          <div className={`${width > 1100 ? "wrapper px-4 w-full" : "wrapper px-4 w-full"}`} >
            <div className={`left-col flex flex-wrap gap-6 pt-3 ${width > 575 ? "md:flex-row" : "flex-col"}`}>
              {events.map((data) => {
                const eventDateTimeObject = new Date(data.eventDateTime);
                const formattedDate = eventDateTimeObject.toLocaleDateString("en-GB");
                const formattedTime = eventDateTimeObject.toLocaleTimeString("en-GB");

                const currentDate = new Date();
                const isPastEvent = currentDate > eventDateTimeObject;

                return (
                  <div key={data._id} className={`max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md relative ${width > 575 ? "md:w-1/2" : "w-full"}`}>
                    {isPastEvent ? (
                      <iframe
                        className="h-48 w-full object-cover"
                        src={data.eventUrl}
                        title="YouTube video"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <img
                        className="h-48 w-full object-cover"
                        src={"/eventimg.jpg"}
                        alt="Card cover"
                      />
                    )}

                    <div className="absolute top-0 left-0 right-0 p-6">
                      <h2 className="text-white text-2xl font-bold">
                        {isPastEvent ? 'On Live...' : 'Upcoming Event...'}
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        Event Name: {data.eventName}
                      </div>
                      <p className="block mt-1 text-lg leading-tight font-medium text-black">
                        Date: {formattedDate}
                      </p>
                      <p className="mt-2 text-gray-500">
                        Time: {formattedTime}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
