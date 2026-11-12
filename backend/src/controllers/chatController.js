import { generateResponse } from "../services/agentService.js";

export async function chatController(req, res) {

    try {

        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const answer = await generateResponse(message);

        res.status(200).json({
            success: true,
            answer: answer
        });

    } catch (error) {

        console.error("AI Error:", error);

        res.status(500).json({
            success: false,
            error: "Something went wrong while generating the response"
        });

    }
}