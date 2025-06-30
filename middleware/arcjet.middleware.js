import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";

import { ARCJET_API_KEY } from "../config/env.config.js"; // Ensure you have your Arcjet key in config.js

const aj = arcjet({
    // Get your site key from https://app.arcjet.com and set it as an environment
    // variable rather than hard coding.
    key: ARCJET_API_KEY ,//localhost:3000_KEY,
    characteristics: ["ip.src"], // Track requests by IP
    rules: [
        // Shield protects your app from common attacks e.g. SQL injection
        shield({ mode: "LIVE" }),
        // Create a bot detection rule
        detectBot({
            mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
            // Block all bots except the following
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
                // Uncomment to allow these other common bot categories
                // See the full list at https://arcjet.com/bot-list
                "CATEGORY:MONITOR", // Uptime monitoring services
                "CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
            ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
        mode: "LIVE",
        refillRate: 5, // Refill 5 tokens per interval
        interval: 10, // Refill every 10 seconds
        capacity: 10, // Bucket capacity of 10 tokens
    }),
],
});


export const arcjetSecurity =  async (req, res) => {
    const decision = await aj.protect(req, { requested: 5 }); // Deduct 5 tokens from the bucket
    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            res.statuscode(429).json({
                success: false,
                error: "Too Many Requests",
                message: "You have exceeded the rate limit. Please try again later.",
            });
        } else if (decision.reason.isBot()) {
            res.statuscode(403).json({
                success: false,
                error: "Forbidden",
                message: "Bots are not allowed to access this resource.",
            });
        } else {
            res.statuscode(403).json({
                success: false,
                error: "Forbidden",
                message: "Access denied.",
            });
        }
    } else if (decision.results.some(isSpoofedBot)) {
        res.statuscode(403).json({
            success: false,
            error: "Forbidden",
            message: "Access denied due to spoofed bot detection.",
        });
    }
};
