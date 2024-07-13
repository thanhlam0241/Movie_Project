import base from "./base";

class NotificationAPI {
  async getNotification(username, page = 1) {
    try {
      const data = await base.post(`/notification`, {
        username: username,
        page: page,
      });
      return data;
    } catch (ex) {
      console.log(ex);
    }
  }
  async sendNotification(payload) {
    try {
      const data = await base.post(`/notification/send`, payload);
      return data;
    } catch (ex) {
      console.log(ex);
    }
  }
}

export default new NotificationAPI();
