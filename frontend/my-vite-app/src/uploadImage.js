import axios from "axios";
import { imageUploadURL } from "./endPointUrls";
export const UploadImage = async (selectedFile) => {
    if (!selectedFile) return null;

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await axios.post(imageUploadURL, formData);
    return response.data.fileUrl;
};


