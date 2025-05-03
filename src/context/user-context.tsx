import { getUser } from "@/services/user/queries";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { data: user } = useSuspenseQuery({
    queryKey: ["user"],
    queryFn: getUser,
    //Stale time, because we don't expect the user data to be modify the whole time, we can just revalidate it with invalidateQueries({ queryKey: ['users'] }) later on
    //And we avoid hitting the API without sense..
    staleTime: Infinity,
  });

  return user;
};
