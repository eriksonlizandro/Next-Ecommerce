'use client'
import { QueryClient, QueryClientProvider } from "react-query";

const pathSeparator = "/";

/* Create a client */
const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: {children: React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
