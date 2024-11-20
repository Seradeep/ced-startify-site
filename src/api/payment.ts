import api from "@/api";

const url = "/payment";

export async function apiCreateOrder(body: { amount: string }) {
  try {
    let response = await api.post(`${url}/create-order`, body);

    const { success, data } = response.data;

    if (!success) throw new Error("Server Error, Try again later!!");

    return data.order;
  } catch (error: any) {
    if (error.response) throw error.response.data;
    throw error;
  }
}

export async function apiVerifyPayment(body: {
  order_id: string;
  payment_id: string;
  signature: string; 
}) {
  try {
    let response = await api.post(`${url}/verify-payment`, body);

    const { success, data } = response.data;

    if (!success) throw new Error("Server Error, Try again later!!");

    return data.message;
  } catch (error: any) {
    if (error.response) throw error.response.data;
    throw error;
  }
}
