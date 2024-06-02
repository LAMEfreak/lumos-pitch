export const getTime: () => string = () => {
  const now = new Date();
  return now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const getDate: () => string = () => {
  const now = new Date();
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(now);
};

export interface User {
  email: string;
  id: number;
  name: string;
  auth0Id: string;
  industry: string;
  createdAt: string;
  updatedAt: string;
}
