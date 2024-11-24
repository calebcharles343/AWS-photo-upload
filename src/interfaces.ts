export interface ImageUrls {
  urls: { url: string; key: string }[]; // Define the expected structure of your response
}

export interface ErrorProps {
  children: React.ReactNode;
}

export interface ImageProps {
  url: { url: string; key: string };
  refetch: () => void;
}

//useMutation
export interface Mutation {
  isLoading: boolean;
  error: string | null;
}

//useQuery
export interface QueryState<T> {
  data: T | null;
  isLoading: boolean;
  error: string;
}

export interface Headers {
  [key: string]: string;
}
