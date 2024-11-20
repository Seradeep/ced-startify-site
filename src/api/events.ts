import api from "@/api";

import { FormValues as StartupCafeSchema } from "@/components/event-forms/startup-cafe";
import { FormValues as StartupMughavariSchema } from "@/components/event-forms/startup-mughavari";

export async function apiCreateStartupCafeProject(
  body: StartupCafeSchema & { paymentId: string }
) {
  try {
    let response = await api.post("/v1/startup-cafe/create-project", body);

    const { success, data } = response.data;

    if (!success) throw new Error("Server Error, Try again later!!");

    return data.message;
  } catch (error: any) {
    if (error.response) throw error.response.data;
    throw error;
  }
}

export async function apiCreateStartupMughavariProject(
  body: StartupMughavariSchema & { paymentId: string }
) {
  try {
    let response = await api.post("/v1/startup-mughavari/create-project", body);

    const { success, data } = response.data;

    if (!success) throw new Error("Server Error, Try again later!!");

    return data.message;
  } catch (error: any) {
    if (error.response) throw error.response.data;
    throw error;
  }
}
