const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
export async function getPlayerInfo(id) {
  try {
    const res = await fetch(`${URL}/api/players/single/${id}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log(e);
    return {};
  }
}
export async function getAllCharacters() {
  try {
    const res = await fetch(`${URL}/api/characters`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (e) {
    console.log(e);
    return [];
  }
}
