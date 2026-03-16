import { createContext, useState, useEffect } from "react";

export const GameContext = createContext();

const API_URL = "/api/games";

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all games from backend on mount
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      // Map MongoDB _id to id for consistency across the frontend
      const mapped = data.map((g) => ({ ...g, id: g._id }));
      setGames(mapped);
    } catch (err) {
      console.error("Failed to fetch games:", err);
    } finally {
      setLoading(false);
    }
  };

  const addGame = async (game) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: game.title || "Untitled Game",
          tagline: game.tagline || "",
          rating: game.rating || "0",
          tags: game.tags || [],
          price: Number(game.price) || 0,
          image: game.image || "/images/placeholder.jpg",
          banner: game.banner || "/images/placeholder-banner.jpg",
          description: game.description || "No description available",
          developer: game.developer || "Unknown",
          publisher: game.publisher || "Unknown",
          release: game.release || "TBA",
          refund: "Self-Refundable",
          rewards: "Earn 5% Back",
          featured: game.featured || false,
        }),
      });
      const saved = await res.json();
      const newGame = { ...saved, id: saved._id };
      setGames((prev) => [newGame, ...prev]);
    } catch (err) {
      console.error("Failed to add game:", err);
    }
  };

  const updateGame = async (id, updatedData) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const updated = await res.json();
      const mappedGame = { ...updated, id: updated._id };
      setGames((prev) =>
        prev.map((g) => (g.id === id ? mappedGame : g))
      );
    } catch (err) {
      console.error("Failed to update game:", err);
    }
  };

  const deleteGame = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setGames((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      console.error("Failed to delete game:", err);
    }
  };

  // Search helper for Navbar
  const searchGames = (query) => {
    if (!query.trim()) return [];
    return games.filter((g) =>
      g.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <GameContext.Provider
      value={{ games, loading, addGame, updateGame, deleteGame, searchGames }}
    >
      {children}
    </GameContext.Provider>
  );
};