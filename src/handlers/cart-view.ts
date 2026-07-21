import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem } from "../toolkit/index.js";

// View Cart button — shows the user's current cart contents and subtotal.
// Wire this into /start via registerMainMenuItem({ label: "View Cart", data: "cart:view" })
// if the toolkit exposes it; otherwise it's reachable via menu button wiring in this file.
registerMainMenuItem({ label: "🛒 View Cart", data: "cart:view", order: 20 });

const composer = new Composer<Ctx>();

composer.callbackQuery("cart:view", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("🛒 Your cart is empty. Tap ➕ to add coffee or snacks!");
});

export default composer;
