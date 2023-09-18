import React from "react";
import axios from "axios";

const API_URL =
  "mongodb+srv://ingsantana36:nwrKRCWOeEBK2jkT@cluster0.dzjkdna.mongodb.net/?retryWrites=true&w=majority";

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
