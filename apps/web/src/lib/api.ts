import axios from "axios";
import type { Correlation, Stats, Reflection } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const api = {
  // Get all correlations
  async getCorrelations(limit = 50, offset = 0): Promise<Correlation[]> {
    const response = await axios.get(`${API_URL}/api/correlations`, {
      params: { limit, offset },
    });
    return response.data.data;
  },

  // Get single correlation with reflections
  async getCorrelation(id: number) {
    const response = await axios.get(`${API_URL}/api/correlations/${id}`);
    return response.data.data;
  },

  // Submit a reflection
  async submitReflection(
    correlationId: number,
    content: string,
    userId?: string,
    isPublic = true,
  ): Promise<Reflection> {
    const response = await axios.post(`${API_URL}/api/reflections`, {
      correlationId,
      userId,
      content,
      isPublic,
    });
    return response.data.data;
  },

  // Get system stats
  async getStats(): Promise<Stats> {
    const response = await axios.get(`${API_URL}/api/stats`);
    return response.data.data;
  },
};
