import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();
  if (userId) redirect("/dashboard");
  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-2xl font-bold mb-5">Welcome to Paptales</h1>
        <h3 className="text-1xl font-bold mb-5">Stories about us</h3>
        <p className="mb-10 max-w-md">
          This is an app that generates stories about you and your loved ones.
          You can pick the story characters and settings choosing from our
          library of characters or adding your own. Paptales will generate a
          story that is suitable for the player's age and the language of their
          preference.
        </p>
      </div>
      <SignIn routing="hash" />
    </>
  );
}
