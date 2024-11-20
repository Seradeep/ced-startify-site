import api from "@/api";

import { FormValues as StartupCafeSchema } from "@/components/event-forms/startup-cafe";
import { FormValues as StartupMughavariSchema } from "@/components/event-forms/startup-mughavari";
import { FormValues as InternHuntSchema } from "@/components/event-forms/intern-hunt";
import { FormValues as StartupAtlasSchema } from "@/components/event-forms/startup-atlas";

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

export async function apiCreateInternHuntProject(
  body: InternHuntSchema & { paymentId: string }
) {
  try {
    let response = await api.post("/v1/intern-hunt/create-project", body);

    const { success, data } = response.data;

    if (!success) throw new Error("Server Error, Try again later!!");

    return data.message;
  } catch (error: any) {
    if (error.response) throw error.response.data;
    throw error;
  }
}

export async function apiCreateStartupAtlasProject(
  body: StartupAtlasSchema & { paymentId: string }
) {
  try {
    let response = await api.post("/v1/startup-atlas/create-project", body);

    const { success, data } = response.data;

    if (!success) throw new Error("Server Error, Try again later!!");

    return data.message;
  } catch (error: any) {
    if (error.response) throw error.response.data;
    throw error;
  }
}
