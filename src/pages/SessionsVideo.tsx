import {
  User,
  StreamVideoClient,
  StreamCall,
  StreamVideo,
  StreamTheme,
  SpeakerLayout,
  CallControls,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "../index.css";

const apiKey = import.meta.env.VITE_SOME_STREAM_API_KEY;
// TO SYNC WITH AUTH0 CREDENTIALS
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ2FsbGlzdGFfTWluZyIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvQ2FsbGlzdGFfTWluZyIsImlhdCI6MTcxODAxNjA4MSwiZXhwIjoxNzE4NjIwODg2fQ.xfJm4j5mDG8TeegixlhS82TNP-V6ELC_wn03NrB8bwU";
const userId = "Callista_Ming";
const callId = "gETaUS5ulvCA";

// Example User to login. TO SYNC WITH AUTH0 CREDENTIALS
const user: User = {
  id: userId,
  name: "Oliver",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

// Initialize Stream video client
const client = new StreamVideoClient({ apiKey, user, token });

// Create and join call
const call = client.call("default", callId);
call.join({ create: true });

// export const MyParticipantList = (props: {
//   participants: StreamVideoParticipant[];
// }) => {
//   const { participants } = props;
//   return (
//     <div className="flex gap-2 w-screen">
//       {participants.map((participant) => {
//         return (
//           <div className="w-full aspect-ratio-[3/2]">
//             <ParticipantView
//               muteAudio
//               participant={participant}
//               key={participant.sessionId}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export const MyFloatingLocalParticipant = (props: {
//   participant?: StreamVideoParticipant;
// }) => {
//   const { participant } = props;
//   return (
//     <div className="absolute top-4 left-4 w-60 h-32 shadow-sm rounded-full">
//       {participant && <ParticipantView muteAudio participant={participant} />}
//     </div>
//   );
// };

const SessionsVideo = () => {
  return (
    <section className="">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <StreamTheme>
            <SpeakerLayout participantsBarPosition="bottom" />
            <CallControls />
          </StreamTheme>{" "}
        </StreamCall>
      </StreamVideo>
    </section>
  );
};
export default SessionsVideo;
