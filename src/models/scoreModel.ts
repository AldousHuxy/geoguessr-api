import { model, Schema } from "mongoose";

export type Score = {
    score: number;
    attempts: number;
    email: string;
};

const scoreSchema: Schema<Score> = new Schema({
    score: { type: Number, required: true },
    attempts: { type: Number, required: true },
    email: { type: String, required: true }
});

export const ScoreModel = model<Score>('Score', scoreSchema);