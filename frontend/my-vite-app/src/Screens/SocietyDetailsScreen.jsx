import React, { useState, useEffect } from "react";
import SideNavbar from "../components/SideNavbar";
import SocietyDetails from "../components/SocietyDetailsComponent";
import Navbar from "../components/Navbar";
import getRoleORImageOREmailORId from "../getRole";
import "../styles/SocietyDetailScreen.css";
import Modal from "../components/Modal";
import UpdateSocietyFormComponent from "../components/UpdateSocietyFormComponent";
import JoinNowForm from "../components/JoinNowForm";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteSocietyURL,
  IsMemberURL,
  GetAllUserRequests,
  SocietyAdminURL,
  SpecificSocietyURL
} from "../endPointUrls";
import { SocietiesScreenRoute } from "../routes";
import axios from "axios";

const SocietyDetailsScreen = () => {
  const userRole = getRoleORImageOREmailORId(1);
  const user_id = getRoleORImageOREmailORId(4);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [societyData, setSocietyData] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [joinRequestStatus, setJoinRequestStatus] = useState(null);
  const [adminData, setAdminData] = useState({ name: "", phonenumber: "" });
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const numericId = parseInt(id);

  const openModal = (type) => {
    setModalType(type);
    setModalStatus(true);
  };

  const closeModal = () => {
    setModalStatus(false);
    setModalType(null);
  };

  const handleIsMember = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${IsMemberURL}${user_id}/${numericId}`);
      setIsMember(response.data);
    } catch (error) {
      console.error("Error checking membership status:", error);
      alert("Failed to check membership status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchJoinRequestStatus = async () => {
    if (joinRequestStatus !== null) {
      console.log("Join request status already fetched. Skipping API call.");
      return;
    }
    try {
      const response = await axios.get(`${GetAllUserRequests}${user_id}`);
      if (Array.isArray(response.data) && response.data.length > 0) {
        const request = response.data.find((req) => req.society_id === numericId);
        if (request) {
          setJoinRequestStatus(request.status);
        } else {
          setJoinRequestStatus(null);
        }
      } else {
        console.log("No requests found for this user.");
        setJoinRequestStatus(null);
      }
    } catch (error) {
      console.error("Error fetching join request status:", error);
    }
  };
  const fetchSocietyDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${SpecificSocietyURL}${id}`);
      setSocietyData(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocietyDetails();
  }, [id]);

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
      alert("Failed to fetch admin details.");
    } finally {
      setIsAdminLoading(false);
    }
  };

  const handleDeleteSociety = async () => {
    if (!id) {
      alert("Society ID is missing!");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this society? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axios.delete(`${DeleteSocietyURL}${id}`);
      alert("Society deleted successfully!");
      navigate(SocietiesScreenRoute);
    } catch (error) {
      console.error("Error deleting society:", error);
      alert("Failed to delete society. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleIsMember();
    fetchJoinRequestStatus();
  }, [numericId]);

  useEffect(() => {
    if (societyData && societyData.admin_id) {
      fetchAdminDetails(societyData.admin_id);
    }
  }, [societyData]);

  return (
    <div className="society-details-screen">
      <Navbar />
      <SideNavbar />
      <div className="content">
        {userRole === "admin" && user_id === societyData?.admin_id && (
          <div className="admin-actions">
            <button className="editSociety-btn" onClick={() => openModal("updateSociety")}>
              Edit Society
            </button>
            <button className="DeleteSociety-btn" onClick={handleDeleteSociety} disabled={loading}>
              {loading ? "Deleting..." : "Delete Society"}
            </button>
          </div>
        )}

        {userRole !== "admin" && !isMember ? (
          <div className="join-society">
            <h2 className="non-member-message">You need to be a member to view this information</h2>
            {joinRequestStatus !== "approved" && (
              <button
                className="join-button"
                onClick={() => openModal("joinNow")}
                disabled={joinRequestStatus === "pending"}
              >
                {joinRequestStatus === "pending" ? "Request Sent" : "Join Now"}
              </button>
            )}
          </div>
        ) : (
          <SocietyDetails SocietyData={societyData} isSocietyLoading={loading} />
        )}
      </div>

      {modalStatus && modalType === "joinNow" && (
        <Modal showModal={modalStatus} closeModal={closeModal}>
          {isAdminLoading ? (
            <div className="loading-spinner">Loading admin info...</div>
          ) : (
            <JoinNowForm
              isloading={loading}
              adminName={adminData.name}
              adminPhone={adminData.phonenumber}
              setModalStatus={setModalStatus}
            />
          )}
        </Modal>
      )}

      {modalStatus && modalType === "updateSociety" && (
        <Modal showModal={modalStatus} closeModal={closeModal}>
          <UpdateSocietyFormComponent societyData={societyData} setModalStatus={setModalStatus} />
        </Modal>
      )}
    </div>
  );
};

export default SocietyDetailsScreen;
