import { auth } from "@clerk/nextjs";
import PlayerList from "@/app/components/PlayerList";
import Link from "next/link";

const URL2 = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
const Dashboard = async () => {
  const { userId } = auth();

  const playersRes = await fetch(`${URL2}/api/players/${userId}`);
  const jsonRes = await playersRes.json();
  const players = jsonRes?.data || [];

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-2xl font-bold mb-5">Player List</h1>
      {players.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <Link href="/player">
            <button className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium py-2 px-4 rounded-md">
              Add a new player
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <p className="mb-5">Add a new player or choose an existing player</p>
          <PlayerList players={players} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
