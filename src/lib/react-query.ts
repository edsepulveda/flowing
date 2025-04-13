import { QueryClient } from "@tanstack/react-query";

// export const onError = (error: unknown) => {
//   if (axios.isAxiosError(error)) {
//     const serverError = error.response;

//     if (serverError?.data) {
//       //Change this in the future when we have a functional backend
//       console.error("Server Error:", serverError.data);
//     }

//   }
// }

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
