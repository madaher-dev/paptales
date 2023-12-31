"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function PlayerList({ players }) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {players.map((player) => (
          <div
            className="flex flex-col items-center justify-center"
            key={player._id}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <Link href={`/story?playerId=${player._id}`}>
                  {player.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
