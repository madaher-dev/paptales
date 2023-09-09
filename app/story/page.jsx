import NewStory from "@/app/components/NewStory";

import { getPlayerInfo, getAllCharacters } from "@/utils/functions";

export default async function Player({ searchParams }) {
  const { playerId } = searchParams;

  let player = await getPlayerInfo(playerId);
  // console.log("player", player);

  let characters = await getAllCharacters();
  // console.log("characters", characters);

  return (
    <div>
      <NewStory player={player} characters={characters} />
    </div>
  );
}
