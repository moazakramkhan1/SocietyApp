import React, { useState, useEffect } from "react";
import axios from "axios";
import { mainEndpoint } from "../endPointUrls";

const AddEventForm = ({ closeModal, userId }) => {
  const [data, setData] = useState({
    name: "",
    description: "",
    date: "",
    logo: "",
    society_id: null, // Will be fetched based on admin's details
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the society ID and logo based on the admin's user ID
    const fetchSocietyDetails = async () => {
      try {
        const response = await axios.get(`${mainEndpoint}/societyByAdmin/${userId}`);
        setData((prevData) => ({
          ...prevData,
          society_id: response.data.id,
          logo: response.data.logo, // Assuming the society has a logo field
        }));
      } catch (err) {
        console.error("Error fetching society details:", err);
        setError("Failed to fetch society details.");
      }
    };

    fetchSocietyDetails();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${mainEndpoint}/events`, data);
      alert("Event added successfully!");
      closeModal();
    } catch (err) {
      console.error("Error adding event:", err);
      setError("Failed to add event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Event</h2>
      <input
        type="text"
        name="name"
        placeholder="Event Name"
        value={data.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={data.description}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={data.date}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading || !data.society_id}>
        {loading ? "Adding..." : "Add Event"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddEventForm;