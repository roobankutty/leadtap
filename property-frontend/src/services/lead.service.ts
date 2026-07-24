import api from "../api/axios";

export interface LeadPayload {
    propertyId: number;
    name: string;
    email: string;
    phone: string;
    message: string;
}

export async function submitLead(payload: LeadPayload) {
    const response = await api.post("/leads", payload);
    return response.data;
}