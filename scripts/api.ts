import axios from "axios";
import { Alert } from "react-native";

const apiClient = axios.create({
  baseURL: "https://event-handlers-meal-planner-be.onrender.com/api",
});
type User = {
  user_id: string;
  first_name: string;
  last_name: string;
  displayName: string;
  avatarURL: string;
};
export const postUser = (user: User) => {
  return apiClient.post("/users", user).then(({ data }) => {
    return data;
  });
};

export const getListsByUserId = (user_id: string) => {
  return apiClient.get(`/users/${user_id}/lists`)
  .then(({ data }) => {
    return data;
  })
  
};

export const addListToUserId = (user_id: string, list_name: string) => {
  if (!list_name) {
    return Alert.alert("Please provide a name");
  } else {
    return apiClient
      .post(`/users/${user_id}/lists`, { list_name })
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err, "trying to post user");
      });
  }
};
