import { useState, useEffect } from "react";
import axios from "axios";
import { UpdateSociety, mainEndpoint } from "../endPointUrls";
import Loader from "./Loader";
import "../styles/UpdateSocietyFormComponent.css";
import ImageUploader from "./ImageUploader";
import { UploadImage } from "../uploadImage";

const UpdateSocietyFormComponent = ({ societyData, setModalStatus }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        name: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        if (societyData) {
            setData({
                name: societyData.name || '',
                description: societyData.description || '',
                image: societyData.image || ''
            });
        }
    }, [societyData]);

    useEffect(() => {
        if (image) {
            setData((prevData) => ({ ...prevData, image }));
        }
    }, [image]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const imageUrl = await UploadImage(selectedFile);
            const updatedSocietyData = {
                ...data,
                image: imageUrl ? `${mainEndpoint}/${imageUrl}` : data.image,
            };

            await axios.put(`${UpdateSociety}${societyData.id}`, updatedSocietyData);
            setMessage("Society Updated Successfully");
            setModalStatus(false);
        } catch (err) {
            console.error(err);
            setError("Something went wrong!");
        } finally {
            setLoading(false);
            handleRefresh();
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Society Name"
                    value={data.name}
                    type="text"
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
                <label>Upload Society Image</label>
                {data.image && (
                    <div style={{ margin: "10px 0" }}>
                        <img
                            src={data.image}
                            alt="Current Society"
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                        />
                    </div>
                )}

                <ImageUploader setSelectedFile={setSelectedFile} />

                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Society"}
                </button>
                <button type="button" onClick={() => setModalStatus(false)} disabled={loading}>
                    Cancel
                </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
            {loading && <Loader />}
        </div>
    );
};

export default UpdateSocietyFormComponent;