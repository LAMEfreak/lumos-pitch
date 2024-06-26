import "./App.css";
import LoginButton from "./components/LoginButton";
import { Spotlight } from "./components/ui/Spotlight";
import { motion } from "framer-motion";

function App() {
  return (
    <main className="min-h-screen flex justify-center items-center bg-black overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-96 md:-top-50"
        fill="#7A82F4"
      />
      <div className="z-50 container flex flex-col items-center">
        <motion.div
          className="flex gap-4 justify-center -ml-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            stiffness: 90,
            duration: 0.4,
          }}
        >
          <img src="/noto_magic-wand.png" alt="Wand logo" width={60} />
          <h1>Lumos</h1>
        </motion.div>
        <motion.p
          className="text-gray-400 text-lg mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            stiffness: 90,
            duration: 0.4,
          }}
        >
          Track your investor contacts and funding rounds with ease.
          <br />
          Video call your investors at an instant
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.7,
            stiffness: 90,
            duration: 0.4,
          }}
          className="size-auto max-w-[700px] 2xl:max-w-[1100px] mt-10"
        >
          <img src="/hero.png" alt="hero image" className="rounded-lg mb-10" />
          <LoginButton />
        </motion.div>
      </div>
    </main>
  );
}

export default App;
