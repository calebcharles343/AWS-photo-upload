import { ErrorProps } from "../interfaces";

export default function ({ children }: ErrorProps) {
  return <span className="text-red-500">{children}</span>;
}
