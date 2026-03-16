import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        tagline: { type: String, default: "" },
        rating: { type: String, default: "0" },
        tags: { type: [String], default: [] },
        price: { type: Number, required: true },
        image: { type: String, default: "/images/placeholder.jpg" },
        banner: { type: String, default: "/images/placeholder-banner.jpg" },
        description: { type: String, default: "No description available" },
        developer: { type: String, default: "Unknown" },
        publisher: { type: String, default: "Unknown" },
        release: { type: String, default: "TBA" },
        refund: { type: String, default: "Self-Refundable" },
        rewards: { type: String, default: "Earn 5% Back" },
        featured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

export default Game;
