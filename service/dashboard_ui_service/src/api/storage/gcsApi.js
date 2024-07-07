import api from "./base";

class gcsApi {
  async uploadFileVideo(formData) {
    try {
      const res = await api.post("/gcs/upload/video", formData);
      return res.data;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }
  async uploadFileImage(formData) {
    try {
      const res = await api.post("/gcs/upload/image", formData);
      return res.data;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }
}

export default new gcsApi();
