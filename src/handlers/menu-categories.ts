import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, menuKeyboard } from "../toolkit/index.js";

// View Menu button — browse categorized menu items with add-to-cart buttons.
// Wire this into /start via registerMainMenuItem({ label: "View Menu", data: "menu:categories" })
// if the toolkit exposes it; otherwise it's reachable via menu button wiring in this file.
registerMainMenuItem({ label: "☕️ View Menu", data: "menu:categories", order: 10 });

const categories = [
  { text: "☕️ Coffee", data: "menu:coffee" },
  { text: "🍰 Pastries", data: "menu:pastry" },
  { text: "🥗 Light Bites", data: "menu:light" },
];

const composer = new Composer<Ctx>();

composer.callbackQuery("menu:categories", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("☕️ Browse our menu categories below to see what's available.", {
    reply_markup: menuKeyboard(categories),
  });
});

composer.callbackQuery("menu:coffee", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Select a coffee from our menu:", {
    reply_markup: menuKeyboard([
      { text: "Espresso ☕️", data: "item:espresso" },
      { text: "Latte ☕️", data: "item:latte" },
      { text: "Cappuccino ☕️", data: "item:cappuccino" },
      { text: "Americano ☕️", data: "item:americano" },
    ]),
  });
});

composer.callbackQuery("menu:pastry", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Select a pastry from our menu:", {
    reply_markup: menuKeyboard([
      { text: "Croissant 🥐", data: "item:croissant" },
      { text: "Muffin 🧁", data: "item:muffin" },
      { text: "Danish 🥐", data: "item:danish" },
    ]),
  });
});

composer.callbackQuery("menu:light", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Select a light bite from our menu:", {
    reply_markup: menuKeyboard([
      { text: "Sandwich 🥪", data: "item:sandwich" },
      { text: "Salad 🥗", data: "item:salad" },
      { text: "Wrap 🌯", data: "item:wrap" },
    ]),
  });
});

composer.callbackQuery("item:espresso", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Espresso ☕️ - 250₽\n\nTap Add to cart to include this item in your order!", {
    reply_markup: { inline_keyboard: [[{ text: "✅ Add to cart", callback_data: "cart:espresso" }]] },
  });
});

composer.callbackQuery("item:latte", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Latte ☕️ - 350₽\n\nTap Add to cart to include this item in your order!", {
    reply_markup: { inline_keyboard: [[{ text: "✅ Add to cart", callback_data: "cart:latte" }]] },
  });
});

composer.callbackQuery("item:cappuccino", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Cappuccino ☕️ - 300₽\n\nTap Add to cart to include this item in your order!", {
    reply_markup: { inline_keyboard: [[{ text: "✅ Add to cart", callback_data: "cart:cappuccino" }]] },
  });
});

composer.callbackQuery("item:americano", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Americano ☕️ - 280₽\n\nTap Add to cart to include this item in your order!", {
    reply_markup: { inline_keyboard: [[{ text: "✅ Add to cart", callback_data: "cart:americano" }]] },
  });
});

composer.callbackQuery("item:croissant", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Croissant 🥐 - 180₽\n\nTap Add to cart to include this item in your order!", {
    reply_markup: { inline_keyboard: [[{ text: "✅ Add to cart", callback_data: "cart:croissant" }]] },
  });
});

composer.callbackQuery("item:muffin", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Muffin 🧁 - 150₽\n\nTap Add to cart to include this item in your order!", {
    reply_markup: { inline_keyboard: [[{ text: "✅ Add to cart", callback_data: "cart:muffin" }]] },
  });
});

composer.callbackQuery("item:danish", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Danish 🥐 - 160₽\n\nTap Add to cart to include this item in your order!", {
    reply_markup: { inline_keyboard: [[{ text: "✅ Add to cart", callback_data: "cart:danish" }]] },
  });
});

composer.callbackQuery("item:sandwich", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Sandwich 🥪 - 350₽\n\nTap Add to cart to include this item in your order!", {
    reply_markup: { inline_keyboard: [[{ text: "✅ Add to cart", callback_data: "cart:sandwich" }]] },
  });
});

composer.callbackQuery("item:salad", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Salad 🥗 - 300₽\n\nTap Add to cart to include this item in your order!", {
    reply_markup: { inline_keyboard: [[{ text: "✅ Add to cart", callback_data: "cart:salad" }]] },
  });
});

composer.callbackQuery("item:wrap", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Wrap 🌯 - 320₽\n\nTap Add to cart to include this item in your order!", {
    reply_markup: { inline_keyboard: [[{ text: "✅ Add to cart", callback_data: "cart:wrap" }]] },
  });
});

export default composer;
