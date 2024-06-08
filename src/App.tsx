import "./App.css";
import LoginButton from "./components/LoginButton";

function App() {
  return (
    <main className="min-h-screen flex justify-center items-center bg-black">
      <video autoPlay muted loop className="fixed size-full object-cover opacity-80">
        <source src="src\assets\Neon.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>{" "}
      <div className="z-50">
        <h1>Lumos</h1>
        <p className="text-gray-400 text-lg mb-8">Pitch black no more.</p>
        <LoginButton />
      </div>
    </main>
  );
}

export default App;
