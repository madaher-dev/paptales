import NewStory from "../components/NewStory";
const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export default async function Player({ searchParams }) {
  const { playerId } = searchParams;
  let player = {};
  let characters = [];
  try {
    player = await fetch(`${URL}/api/players/single/${playerId}`);
    player = await player.json();
    player = player.data;

    characters = await fetch(`${URL}/api/characters`);
    characters = await characters.json();
    characters = characters.data;
    console.log("characters", characters);
  } catch (e) {
    console.log(e);
  }

  return (
    <div>
      <NewStory player={player} characters={characters} />
    </div>
  );
}
