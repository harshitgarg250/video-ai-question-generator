import axios from "axios";

export const uploadVideo = async (formData) => {
  return axios.post("http://localhost:5001/api/video/upload", formData);
};
