import { auth } from "@clerk/nextjs";
import PlayerList from "../components/PlayerList";

const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
const Dashboard = async () => {
  const { userId } = auth();

  const playersRes = await fetch(`${URL}/api/players/${userId}`);
  const jsonRes = await playersRes.json();
  const players = jsonRes.data || [];

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-2xl font-bold mb-5">Player List</h1>
      <p className="mb-5">Add a new player or choose an existing player</p>
      <PlayerList players={players} />
    </div>
  );
};

export default Dashboard;
