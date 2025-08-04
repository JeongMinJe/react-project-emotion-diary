import axios from "axios";
import type { UserDataResponse } from "../types/users";
import { useQuery } from "@tanstack/react-query";

const getUserData = async (email: string): Promise<UserDataResponse> => {
  const response = await axios.get("http://localhost:4000/api/users", {
    params: { email },
  });

  return response.data;
};

export const useGetUserData = (email: string) => {
  return useQuery<UserDataResponse>({
    queryKey: ["users", email],
    queryFn: () => getUserData(email),
    refetchOnWindowFocus: false,
    enabled: !!email,
  });
};
