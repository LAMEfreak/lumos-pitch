import {
  StreamVideoClient,
  StreamVideo,
  User,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ThreeDots } from "react-loader-spinner";
import { nanoid } from "nanoid";
import axios from "axios";

interface StreamProviderClientProps {
  children: React.ReactNode;
}

const StreamProviderClient = ({ children }: StreamProviderClientProps) => {
  const videoClient = useInitializeVideoClient();

  if (!videoClient) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ThreeDots
          visible={true}
          height="80"
          width="60"
          color="#fff"
          radius="12"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

const useInitializeVideoClient = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null
  );
      console.log(videoClient);

  const generateStreamToken = async (userId: string) => {
    const token = await getAccessTokenSilently();

    try {
      const body = {
        name: user?.name || user?.nickname,
        image: user?.picture,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_SOME_BACKEND_SERVER}/stream/${userId}`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoading) return;
    // User can be logged in user or guest user
    let streamUser: User;

    if (user?.sub && user?.nickname) {
      streamUser = {
        // Using nickname to assign unique user_id to Stream API because auth0Id does not meet certain validation requirements
        // From STREAM: user_details.id is not a valid user id. a-z, 0-9, @, _ and - are allowed.
        id: user?.nickname,
        name: user?.nickname || user?.name,
        image: user?.picture,
        type: "authenticated",
      };
    } else {
      const id = nanoid();
      streamUser = {
        id,
        type: "guest",
        name: `Guest ${id}`,
      };
    }

    const apiKey = import.meta.env.VITE_SOME_STREAM_API_KEY;

    if (!apiKey) throw new Error("Stream API key is missing");

    const client = new StreamVideoClient({
      apiKey,
      user: streamUser,
      tokenProvider: user?.sub
        ? () => generateStreamToken(streamUser.id)
        : undefined,
    });

    setVideoClient(client);

    return () => {
      client.disconnectUser();
      setVideoClient(null);
    };
  }, [user?.name, user?.sub, user?.picture, user?.nickname, isLoading]);

  return videoClient;
};

export default StreamProviderClient;
