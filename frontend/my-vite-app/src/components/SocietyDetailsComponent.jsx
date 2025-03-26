import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoinNowForm from "../components/JoinNowForm";
import Modal from "../components/Modal";
import "../styles/SocietyDetailsComponent.css";
import MyError from "../components/ErrorComponent";
import axios from "axios";
import { SpecificSocietyURL, SocietyAdminURL } from "../endPointUrls";
import Loader from "./Loader";
import getRoleORImageOREmailORId from "../getRole";

const SocietyDetails = ({ setSocietyData }) => {
  const userRole = getRoleORImageOREmailORId(1);
  const userid = getRoleORImageOREmailORId(4);
  const { id } = useParams();

  const [modalStatus, setModalStatus] = useState(false);
  const [adminData, setAdminData] = useState({ name: "", phonenumber: "" });
  const [society, setSociety] = useState(null);
  const [isSocietyLoading, setIsSocietyLoading] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSocietyDetails = async () => {
    try {
      setIsSocietyLoading(true);
      const response = await axios.get(`${SpecificSocietyURL}${id}`);
      setSociety(response.data);
      setSocietyData(response.data);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch society details.");
    } finally {
      setIsSocietyLoading(false);
    }
  };

  const fetchAdminDetails = async (adminId) => {
    try {
      setIsAdminLoading(true);
      const response = await axios.get(`${SocietyAdminURL}${adminId}`);
      setAdminData({
        name: response.data.username,
        phonenumber: response.data.phonenumber,
      });
    } catch (e) {
      console.error(e);
      setError("Failed to fetch admin details.");
    } finally {
      setIsAdminLoading(false);
    }
  };

  useEffect(() => {
    fetchSocietyDetails();
  }, [id]);

  useEffect(() => {
    if (society?.admin_id) {
      fetchAdminDetails(society.admin_id);
    }
  }, [society?.admin_id]);

  if (isSocietyLoading || isAdminLoading) {
    return <Loader />;
  }

  if (error) {
    return <MyError message={error} />;
  }

  if (!society) {
    return <MyError message="Society not found." />;
  }

  

  return (
    <div className="society-details-container">
      <h1 className="society-name">{society.name}</h1>
      <p className="description">{society.description}</p>

      <h2 className="section-title">Committee Members</h2>
      {Array.isArray(society.executive_memberships) && society.executive_memberships.length > 0 ? (
        <ul className="committee-list">
          {society.executive_memberships.map((member, index) => (
            <li key={`${member}-${index}`}>{member}</li>
          ))}
        </ul>
      ) : (
        <p>No committee members listed.</p>
      )}

      {Array.isArray(society.events) && society.events.length > 0 ? (
        <>
          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-container">
            {society.events.map((event) => (
              <div className="event-card" key={event.id || `${event.title}-${event.date}`}>
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.time}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2 className="section-title">No upcoming events.</h2>
      )}

      {(userRole === "admin" && society?.admin_id !== userid || userRole !== "admin") && (
        <>
          <button className="join-button" onClick={() => setModalStatus(true)}>
            Join Now
          </button>

          {modalStatus && (
            <Modal showModal={modalStatus} closeModal={() => setModalStatus(false)}>
              <JoinNowForm
                isloading={isSocietyLoading || isAdminLoading}
                adminName={adminData.name}
                adminPhone={adminData.phonenumber}
              />
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default SocietyDetails;
