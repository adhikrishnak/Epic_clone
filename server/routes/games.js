import express from "express";
import Game from "../models/Game.js";

const router = express.Router();

// GET /api/games — Fetch all games
router.get("/", async (req, res) => {
    try {
        const games = await Game.find().sort({ createdAt: -1 });
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch games", error: err.message });
    }
});

// GET /api/games/:id — Fetch a single game
router.get("/:id", async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: "Game not found" });
        res.json(game);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch game", error: err.message });
    }
});

// POST /api/games — Add a new game
router.post("/", async (req, res) => {
    try {
        const game = new Game(req.body);
        const saved = await game.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: "Failed to add game", error: err.message });
    }
});

// PUT /api/games/:id — Update a game
router.put("/:id", async (req, res) => {
    try {
        const updated = await Game.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) return res.status(404).json({ message: "Game not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: "Failed to update game", error: err.message });
    }
});

// DELETE /api/games/:id — Delete a game
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Game.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Game not found" });
        res.json({ message: "Game deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete game", error: err.message });
    }
});

export default router;
