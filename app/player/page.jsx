import NewPlayer from "../components/NewPlayer";
import { currentUser } from "@clerk/nextjs";

export default async function Player() {
  const user = await currentUser();

  return (
    <div className="row-span-1 bg-red-200 flex items-center justify-center flex-col">
      <div>Welcome {user.username ?? "Guest"}</div>
      <NewPlayer userId={user?.id} />
    </div>
  );
}
