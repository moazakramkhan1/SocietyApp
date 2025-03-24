import { useState } from "react";
import axios from 'axios'
import { CreateSocietyURL } from "../endPointUrls";
import Loader from "./Loader";
import "../styles/SignUpform.css";
import ImageUploader from './ImageUploader';
import getRoleORImageOREmail from "../getRole";


const CreateSocietyFormComponent = () => {
    const [image, setImage] = useState('')
    let email = getRoleORImageOREmail(3)
    let id = getRoleORImageOREmail(4)
    const [data, setData] = useState({
        admin_id: id,
        name: '',
        description: '',
        image: image
    }
    );
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await axios.post(CreateSocietyURL, data);
        } catch (err) {
            setError('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };


    return <div className="container">
        <form onSubmit={handleSubmit}>
            <input
                name="email"
                placeholder="email"
                value={email}
                type="text"
                readOnly={true}
            />
            <input
                name="name"
                placeholder="name"
                value={data.name}
                type="text"
                onChange={handleChange}
                required
            />
            <input
                name="description"
                placeholder="Description"
                value={data.description}
                type="text"
                onChange={handleChange}
            />
            <label>Upload Society image</label>
            <ImageUploader setImage={setImage} />
            <button type="submit">Submit</button>
        </form>
        {error !== '' ? <div>
            <p>{error}</p>
        </div> : null}
        {loading && <Loader />}
    </div>
}
export default CreateSocietyFormComponent