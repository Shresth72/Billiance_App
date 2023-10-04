import { getUser } from "@/firebase/auth";
import { auth } from "@/firebase/firebase";
import { useQuery } from "@tanstack/react-query";

export function useUserQuery() {
  const user = auth.currentUser;
  return useQuery({
    queryKey: ["user", user?.uid],
    queryFn: async () => {
      return await getUser();
    },
  });
}
