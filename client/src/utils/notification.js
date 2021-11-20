import { notification } from "antd";

export const createNotification = (type, message, description) => {
  if (description) {
    debugger
    notification[type]({
      message,
      description
    });
  } else {
    notification[type]({
      message,
    });
  }
};
