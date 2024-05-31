import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "../utilities/PageLoader";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Nav from "@/components/NavigationBar/Nav";

const ToastWithTitle = () => {
  const { toast } = useToast();

  return (
    <Button
      variant="destructive"
      onClick={() => {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }}
    >
      Show Toast
    </Button>
  );
};

const Dashboard = () => {
  const { user, isLoading, isAuthenticated } = useAuth0();
  console.log(user);

  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    isAuthenticated && (
      <div className="flex">
        <Nav />
        <main className="flex p-24">
          <section className="p-8 flex flex-col items-center align-middle">
            <p className="text-2xl mb-4">Dashboard</p>
            <p className="mt-4">{user?.name} is logged in.</p>
            <ToastWithTitle />
            <p>{time}</p>
            <p>{date}</p>
          </section>
        </main>
      </div>
    )
  );
};
export default Dashboard;
