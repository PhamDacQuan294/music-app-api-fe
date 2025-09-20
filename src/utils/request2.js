import axios from "axios";

const API_DOMAIN = "http://localhost:5000";

export const post2 = async (path, formData) => {
  try {
    const result = await axios.post(
      `${API_DOMAIN}${path}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result;
  } catch (error) {
    console.error("Error while making the post request:", error);
    throw error;
  }
};