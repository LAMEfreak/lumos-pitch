// import { useAuth0 } from "@auth0/auth0-react";
// import {
//   // StreamCall,
//   StreamVideo,
//   StreamVideoClient,
//   // User,
// } from "@stream-io/video-react-sdk";
// import { ReactNode, useEffect, useState } from "react";

// const apiKey = import.meta.env.VITE_SOME_STREAM_API_KEY;
// // const userId = "user-id";
// // const token = "authentication-token";
// // const user: User = { id: userId };

// // const client = new StreamVideoClient({ apiKey, user, token });
// // const call = client.call("default", "my-first-call");
// // call.join({ create: true });

// export const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
//   const [videoClient, setVideoClient] = useState<StreamVideoClient>();
//   const { user, isLoading } = useAuth0();

//   useEffect(() => {
//     if (!user || !isLoading) return;
//     if (!apiKey) throw new Error("Stream API Key");

//     const client = new StreamVideoClient({
//       apiKey,
//       user: {
//         id: user?.sub,
//         name: user?.name || user?.sub,
//         image: user?.picture,
//       },
//       token,
//     });
//   }, [user, isLoading]);

//   return (
//     <StreamVideo client={videoClient}>
//       {/* <StreamCall call={call}></StreamCall> */}
//     </StreamVideo>
//   );
// };

// export default StreamVideoProvider;
