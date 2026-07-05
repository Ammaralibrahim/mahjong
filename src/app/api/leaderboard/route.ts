import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ScoreModel } from "@/models/Score";

// GET → Return top 5 scores
export async function GET() {
  try {
    console.log("📊 Fetching leaderboard...");
    await connectToDatabase();
    
    const topScores = await ScoreModel.find()
      .sort({ score: -1 })
      .limit(5)
      .lean()
      .exec(); // Added exec() for better error handling

    console.log(`✅ Found ${topScores.length} scores`);
    
    return NextResponse.json({ 
      success: true, 
      data: topScores 
    });
  } catch (error) {
    console.error("❌ Leaderboard GET error:", error);
    
    // More specific error messages
    let errorMessage = "Could not fetch leaderboard";
    if (error instanceof Error) {
      if (error.name === "MongoServerSelectionError") {
        errorMessage = "Database connection failed. Please check your MongoDB URI.";
      } else if (error.name === "MongoNetworkError") {
        errorMessage = "Network error connecting to database. Please check your internet connection.";
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error instanceof Error ? error.message : undefined : undefined
      },
      { status: 500 }
    );
  }
}

// POST → Save new score
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { playerName, score } = body;

    // Validation
    if (!playerName || typeof playerName !== "string") {
      return NextResponse.json(
        { success: false, error: "Player name is required" },
        { status: 400 }
      );
    }

    if (typeof score !== "number" || score < 0) {
      return NextResponse.json(
        { success: false, error: "Valid score is required" },
        { status: 400 }
      );
    }

    console.log(`💾 Saving score for ${playerName}: ${score}`);
    await connectToDatabase();

    const newScore = await ScoreModel.create({
      playerName: playerName.trim().slice(0, 30),
      score,
    });

    console.log(`✅ Score saved successfully: ${newScore._id}`);

    return NextResponse.json({ 
      success: true, 
      data: newScore 
    });
  } catch (error) {
    console.error("❌ Score POST error:", error);
    
    let errorMessage = "Could not save score";
    if (error instanceof Error) {
      if (error.name === "MongoServerSelectionError") {
        errorMessage = "Database connection failed. Please check your MongoDB URI.";
      } else if (error.name === "MongoNetworkError") {
        errorMessage = "Network error connecting to database. Please check your internet connection.";
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? error instanceof Error ? error.message : undefined : undefined
      },
      { status: 500 }
    );
  }
}