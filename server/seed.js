import mongoose from "mongoose";
import dotenv from "dotenv";
import Game from "./models/Game.js";

dotenv.config();

const initialGames = [
    {
        title: "Genshin Impact",
        tagline: "A futuristic open-world RPG.",
        rating: "4.6",
        tags: ["Character Customization", "Great for Beginners"],
        price: 1999,
        image: "/images/genshin.jpg",
        banner: "/images/genshin-banner.jpg",
        description: "Explore Teyvat with Zibai and Columbina in this massive update.",
        developer: "miHoYo",
        publisher: "miHoYo",
        release: "Jan 2026",
        refund: "Self-Refundable",
        rewards: "Earn 5% Back",
        featured: true,
    },
    {
        title: "Black Ops 6",
        tagline: "Tactical shooter with stealth mechanics.",
        rating: "4.3",
        tags: ["Multiplayer", "Shooter"],
        price: 1499,
        image: "/images/shadow.jpg",
        banner: "/images/blackops-banner.jpg",
        description: "Engage in covert missions with advanced weaponry and tactical gameplay.",
        developer: "Activision",
        publisher: "Activision",
        release: "Dec 2025",
        refund: "Self-Refundable",
        rewards: "Earn 5% Back",
        featured: false,
    },
    {
        title: "Forza 5",
        tagline: "High-octane racing experience.",
        rating: "4.8",
        tags: ["Racing", "Open World"],
        price: 999,
        image: "/images/forza5.jpg",
        banner: "/images/forza-banner.jpg",
        description: "Race across stunning landscapes with realistic physics and dynamic weather.",
        developer: "Playground Games",
        publisher: "Xbox Game Studios",
        release: "Nov 2025",
        refund: "Self-Refundable",
        rewards: "Earn 5% Back",
        featured: false,
    },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // Clear existing games
        await Game.deleteMany({});
        console.log("🗑️  Cleared existing games");

        // Insert seed data
        const inserted = await Game.insertMany(initialGames);
        console.log(`🌱 Seeded ${inserted.length} games successfully!`);

        inserted.forEach((g) => console.log(`   - ${g.title} (${g._id})`));

        await mongoose.disconnect();
        console.log("✅ Done. MongoDB disconnected.");
    } catch (err) {
        console.error("❌ Seeding failed:", err.message);
        process.exit(1);
    }
}

seed();
