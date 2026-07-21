import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem } from "../toolkit/index.js";

// My Orders button — shows order history and current order status.
// Wire this into /start via registerMainMenuItem({ label: "My Orders", data: "orders:list" })
// if the toolkit exposes it; otherwise it's reachable via menu button wiring in this file.
registerMainMenuItem({ label: "📋 My Orders", data: "orders:list", order: 30 });

const composer = new Composer<Ctx>();

composer.callbackQuery("orders:list", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("📋 You have no orders yet.\n\nTap ➕ to place your first order!");
});

export default composer;
