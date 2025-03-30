import { DeleteImageURL } from "./endPointUrls";
export const deleteImage = async (fileUrl) => {
    const filename = fileUrl.split("/").pop();
    try {
        const response = await axios.delete(`${DeleteImageURL}${filename}`);
        return response.data;
    } catch (error) {
        console.error("Image deletion failed:", error.response?.data || error.message);
        throw error;
    }
};
