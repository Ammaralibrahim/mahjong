import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema(
  {
    playerName: {
      type: String,
      required: [true, "Player name is required"],
      maxlength: [30, "Player name cannot exceed 30 characters"],
      trim: true,
    },
    score: {
      type: Number,
      required: [true, "Score is required"],
      min: [0, "Score cannot be negative"],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Index for faster sorting
ScoreSchema.index({ score: -1 });

// Ensure model is only created once
export const ScoreModel = mongoose.models.Score || mongoose.model("Score", ScoreSchema);