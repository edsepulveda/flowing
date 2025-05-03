import type { QueryClient } from "@tanstack/react-query";

export let tokenExpirationTime: any = null;

export const setupRefreshToken = (
  expiresIn: number,
  queryClient: QueryClient,
  refreshExpiresIn?: number
) => {
  if (tokenExpirationTime) {
    clearTimeout(tokenExpirationTime);
  }

  const refreshTime = (expiresIn - 60) * 1000;

  console.log(refreshTime)

  tokenExpirationTime = setTimeout(async () => {
    try {
      const refreshMutation = queryClient.getMutationDefaults(["auth", "refresh"]);
      console.log("Refresh Mutation")

      await refreshMutation.mutationFn();

      queryClient.invalidateQueries({ queryKey: ["auth"] });
    } catch (error) {
      console.error("Failed to refresh token:", error);
      window.location.href = "/login";
    }
  }, refreshTime);

  if (refreshExpiresIn) {
    localStorage.setItem(
      "refreshExpiresAt",
      String(Date.now() + refreshExpiresIn * 1000)
    );
  }
  localStorage.setItem(
    "accessExpiresAt",
    String(Date.now() + expiresIn * 1000)
  );
};
