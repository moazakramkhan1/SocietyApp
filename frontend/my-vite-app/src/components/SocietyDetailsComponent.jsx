import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoinNowForm from "../components/JoinNowForm";
import Modal from "../components/Modal";
import "../styles/SocietyDetailsComponent.css";
import MyError from "../components/ErrorComponent"
import axios from 'axios'
import { SpecificSocietyURL, SocietyAdminURL } from "../endPointUrls";
import Loader from "./Loader";
import getRoleORImageOREmailORId from "../getRole";

const SocietyDetails = () => {
  let userRole = getRoleORImageOREmailORId(1)
  const [modalStatus, setModalStatus] = useState(false);
  const [adminData, setAdminData] = useState({
    name: '',
    phonenumber: ''
  })
  const [society, setSociety] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const { id } = useParams();
  const fetchSocietyDetails = async () => {
    try {
      setIsloading(true)
      let response = await axios.get(`${SpecificSocietyURL}${id}`)
      setSociety(response.data)
    } catch (e) {
      <MyError message={e} />
    } finally {
      setIsloading(false);
    }

  }
  const fetchAdminDetails = async () => {
    try {
      setIsloading(true)
      let response = await axios.get(`${SocietyAdminURL}${society.admin_id}`)
      setAdminData({
        name: response.data.username,
        phonenumber: response.data.phonenumber,
      });
    } catch (e) {
      <MyError message={e} />
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    fetchSocietyDetails()
  }, [])
  useEffect(() => {
    if (society?.admin_id) {
      fetchAdminDetails();
    }
  }, [society])

  if (!society) {
    return <MyError message={"Society not found"} />;
  }
  if (isloading) {
    <Loader />
  }

  return (
    <div className="society-details-container">
      <h1 className="society-name">{society.name}</h1>
      <p className="description">{society.description}</p>

      <h2 className="section-title">Committee Members</h2>
      <ul className="committee-list">
        {society?.executive_memberships?.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>

      <h2 className="section-title">Upcoming Events</h2>
      <div className="events-container">
        {society?.events?.map((event, index) => (
          <div className="event-card" key={index}>
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            <p>{event.time}</p>
          </div>
        ))}
      </div>
      {userRole !== 'admin' && (
        <>
          <button className="join-button" onClick={() => setModalStatus(true)}>
            Join Now
          </button>

          {modalStatus && (
            <Modal showModal={modalStatus} closeModal={() => setModalStatus(false)}>
              <JoinNowForm
                isloading={isloading}
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
