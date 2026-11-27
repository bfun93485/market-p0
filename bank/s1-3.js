/* Question bank, skill 1.3: Market orders and limit orders (D44, D49). Levels: 1 Foundation, 2 Applied, 3 Desk-level.
   Broker practices (order types accepted after hours, how long "good-till-cancelled" lasts) vary; questions say "often" where they do. */
(function (B) {
  var mc = B.mc, tf = B.tf, gen = B.gen, sc = B.sc;
  function c2(R, x) { return R.money(x, 2); }
  B.add("1.3", [
    // ---------- Level 1: Foundation ----------
    tf("1.3-01", 1, [
      ["A market order buys or sells immediately at the best price available.", true, "It trades now, at whatever the best price is when it arrives."],
      ["A market order waits until the price reaches a level you choose.", false, "That's a limit order. A market order trades right away."]]),
    tf("1.3-02", 1, [
      ["A limit order fills only at your price or better.", true, "It sets the most you'll pay or the least you'll accept."],
      ["A limit order can fill at a worse price than your limit if the market moves.", false, "A limit order never fills worse than its limit."]]),
    tf("1.3-03", 1, [
      ["A market order is almost certain to fill, but its price isn't guaranteed.", true, "Speed and certainty of filling, at the cost of price control."],
      ["A market order guarantees the price you saw on the screen.", false, "The quote can move before your order arrives; that's the misconception this lesson fixes."]]),
    tf("1.3-04", 1, [
      ["A limit order might not fill at all.", true, "If the market never reaches your price, nothing happens."],
      ["A limit order always fills by the end of the day.", false, "It fills only if the market reaches your price."]]),
    mc("1.3-05", 1, [
      { q: "\"Get me a T-shirt, whatever it costs.\" Which order is that like?", a: ["A market order", "Fill now at any price available."],
        d: [["A limit order", "A limit order sets a maximum price."], ["No order at all", "It's an instruction to buy right away."]] },
      { q: "\"Get me a T-shirt, but not for more than $30.\" Which order is that like?", a: ["A limit order", "A maximum price, and you might go without."],
        d: [["A market order", "A market order has no price limit."], ["A sell order", "It's an instruction to buy."]] }]),
    mc("1.3-06", 1, [
      { q: "What is slippage?", a: ["The gap between the price you expected and the price you got", "Market orders can slip in fast or thinly traded markets."],
        d: [["A fee charged by the exchange", "Slippage is a price difference, not a fee."], ["When a limit order is cancelled", "That's a cancellation."]] }]),
    gen("1.3-07", 1, function (R) {
      var bid = R.int(1500, 6000) / 100, ask = Math.round((bid + R.pick([2, 3, 5]) / 100) * 100) / 100, lim = Math.round((ask + R.pick([-0.2, -0.1, -0.05, 0, 0.02, 0.05])) * 100) / 100;
      var now = lim >= ask;
      var yes = ["It can fill right away, at about " + c2(R, ask), "Your limit (" + c2(R, lim) + ") is at or above the ask (" + c2(R, ask) + "), so a seller is already willing."];
      var no = ["It waits until a seller will sell at " + c2(R, lim) + " or less", "Your limit is below the ask (" + c2(R, ask) + "), so no seller is there yet."];
      return { q: "The quote is " + c2(R, bid) + " / " + c2(R, ask) + ". You place a buy limit order at " + c2(R, lim) + ". What happens?",
        a: now ? yes : no, d: [now ? [no[0], yes[1]] : [yes[0], no[1]], ["It's rejected because it doesn't match the quote", "Limit orders at any price are accepted; they just may wait."]] };
    }),
    gen("1.3-08", 1, function (R) {
      var bid = R.int(1500, 6000) / 100, ask = Math.round((bid + R.pick([2, 3, 5]) / 100) * 100) / 100, lim = Math.round((bid + R.pick([-0.05, 0, 0.1, 0.2])) * 100) / 100;
      var now = lim <= bid;
      var yes = ["It can fill right away, at about " + c2(R, bid), "Your limit (" + c2(R, lim) + ") is at or below the bid (" + c2(R, bid) + "), so a buyer is already willing."];
      var no = ["It waits until a buyer will pay " + c2(R, lim) + " or more", "Your limit is above the bid (" + c2(R, bid) + "), so no buyer is there yet."];
      return { q: "The quote is " + c2(R, bid) + " / " + c2(R, ask) + ". You place a sell limit order at " + c2(R, lim) + ". What happens?",
        a: now ? yes : no, d: [now ? [no[0], yes[1]] : [yes[0], no[1]], ["It sells at the ask, " + c2(R, ask), "Sellers get bids, not asks, unless a buyer comes up to their price."]] };
    }),
    mc("1.3-09", 1, [
      { q: "Which order gives you the most control over price?", a: ["A limit order", "You set the worst price you'll accept."],
        d: [["A market order", "A market order takes whatever price is available."], ["They give the same control", "Only the limit order sets a price."]] }]),
    mc("1.3-10", 1, [
      { q: "Which order is the better fit if filling quickly matters more than the exact price?", a: ["A market order", "It fills right away at the best available price."],
        d: [["A limit order far from the market", "It may not fill for a long time, or ever."], ["Neither can fill quickly", "Market orders fill almost instantly in normal markets."]] }]),
    tf("1.3-11", 1, [
      ["A buy limit order sets the most you are willing to pay.", true, "It can fill at that price or lower."],
      ["A buy limit order sets the least you are willing to pay.", false, "For a buy, the limit is the maximum price."]]),
    tf("1.3-12", 1, [
      ["A sell limit order sets the least you are willing to accept.", true, "It can fill at that price or higher."],
      ["A sell limit order sets the most you'll accept.", false, "For a sell, the limit is the minimum price."]]),
    mc("1.3-13", 1, [
      { q: "A buy limit order placed below the ask…", a: ["Waits in line with the other bids", "It becomes a bid until a seller comes down to it."],
        d: [["Fills immediately at the ask", "That would pay more than your limit."], ["Turns into a market order", "It stays a limit order."]] }]),
    mc("1.3-14", 1, [
      { q: "You place a market order to buy while the screen shows $50.00, and it fills at $50.02. Why?", a: ["The best offer changed or was used up before your order arrived", "Market orders take the best price available when they arrive."],
        d: [["Your broker made a mistake", "Small differences are normal for market orders."], ["Market orders always add 2 cents", "There's no fixed charge like that."]] }]),
    tf("1.3-15", 1, [
      ["A limit order can fill only partly, leaving the rest waiting.", true, "If only some shares are available at your price, you get those."],
      ["A limit order either fills completely or not at all, every time.", false, "Partial fills are common."]]),
    mc("1.3-16", 1, [
      { q: "What does a market order sell at?", a: ["The best bid available", "Selling now means selling to the best buyer."],
        d: [["The best offer", "That's what buyers pay."], ["The price you choose", "That's a limit order."]] }]),

    // ---------- Level 2: Applied ----------
    gen("1.3-20", 2, function (R) {
      var lim = R.int(2000, 6000) / 100, buy = Math.random() < 0.5;
      var prices = [-0.03, -0.01, 0.01, 0.03].map(function (d) { return Math.round((lim + d) * 100) / 100; });
      var ok = prices.filter(function (p) { return buy ? p <= lim : p >= lim; }), bad = prices.filter(function (p) { return buy ? p > lim : p < lim; });
      var right = c2(R, R.pick(ok));
      return { q: "You place a " + (buy ? "buy" : "sell") + " limit order at " + c2(R, lim) + ". Which of these fill prices is possible?",
        a: [right, buy ? "A buy limit fills at the limit or lower." : "A sell limit fills at the limit or higher."],
        d: R.uniq(right, bad.map(function (p) { return [c2(R, p), buy ? "That's above your buy limit." : "That's below your sell limit."]; })) };
    }),
    gen("1.3-21", 2, function (R) {
      var a1 = R.int(2000, 6000) / 100, s1 = R.pick([100, 200, 300]), a2 = Math.round((a1 + R.pick([0.02, 0.03, 0.05])) * 100) / 100, n = s1 + R.pick([100, 200, 300]);
      var avg = (s1 * a1 + (n - s1) * a2) / n, slip = Math.round((avg - a1) * n * 100) / 100, right = R.money(slip, 2);
      return { q: "You expect to buy at the best offer of " + c2(R, a1) + ", but only " + s1 + " shares are offered there; more are offered at " + c2(R, a2) + ". You send a market order for " + n + " shares. How much more do you pay in total than if all had filled at " + c2(R, a1) + "?",
        a: [right, (n - s1) + " shares × " + c2(R, Math.round((a2 - a1) * 100) / 100) + " extra = " + right + ". That's slippage."],
        d: R.uniq(right, [["Nothing: market orders fill at the quoted price", "Only " + s1 + " shares were offered at " + c2(R, a1) + "."], [R.money(Math.round((a2 - a1) * n * 100) / 100, 2), "Only the shares above " + s1 + " paid the higher price."], [c2(R, Math.round((a2 - a1) * 100) / 100), "That's per share."]]) };
    }),
    gen("1.3-22", 2, function (R) {
      var lim = R.int(2000, 6000) / 100, want = R.pick([500, 800, 1000]), avail = R.pick([100, 200, 300, 400]);
      return { q: "You place a buy limit order for " + R.count(want) + " shares at " + c2(R, lim) + ". Sellers offer only " + avail + " shares at " + c2(R, lim) + " or less. What happens?",
        a: [avail + " shares fill; the other " + (want - avail) + " wait at your limit", "Limit orders fill as much as they can at your price or better, then wait."],
        d: [["All " + R.count(want) + " fill at a higher price to finish the order", "A limit order never pays more than its limit."], ["Nothing fills until all " + R.count(want) + " are available", "Partial fills are normal for limit orders."]] };
    }),
    tf("1.3-23", 2, [
      ["A buy limit order placed at or above the ask can fill right away.", true, "It's called marketable: a seller is already willing at your price or better."],
      ["A buy limit above the ask fills at the limit price, overpaying.", false, "It fills at the best available offer, which is at or below your limit."]]),
    mc("1.3-24", 2, [
      { q: "The quote is 10.00 / 10.05. You place a buy limit at 10.10. At about what price does it fill?", a: ["10.05, the best offer", "Your limit allows up to 10.10, but you get the best available price."],
        d: [["10.10, your limit", "You pay the best available offer, not your limit."], ["10.00, the bid", "Buyers pay offers, not bids."]] }]),
    mc("1.3-25", 2, [
      { q: "In a fast-moving market, which order risks the biggest gap from the price you saw?", a: ["A market order", "It fills at whatever the best price is when it arrives."],
        d: [["A limit order", "A limit order never fills worse than its limit."], ["Neither", "Market orders can slip in fast markets."]] }]),
    tf("1.3-26", 2, [
      ["A market order for a very large number of shares can fill across several prices.", true, "It uses up the best price and moves on to worse ones."],
      ["A market order always fills at a single price, however large.", false, "Large orders often fill at several prices."]]),
    mc("1.3-27", 2, [
      { q: "A \"day\" limit order that hasn't filled by the close…", a: ["Is cancelled at the end of the day", "Day orders last only for that trading day."],
        d: [["Turns into a market order", "It's simply cancelled."], ["Stays open forever", "That would be a good-till-cancelled order, usually with a broker time limit."]] }]),
    tf("1.3-28", 2, [
      ["A good-till-cancelled limit order stays open until it fills or you cancel it, often within a broker's time limit.", true, "Many brokers cap how long such orders can last."],
      ["Every limit order is cancelled at the end of the day.", false, "Day orders are; good-till-cancelled orders can stay open longer."]]),
    mc("1.3-29", 2, [
      { q: "Why might a trader place a buy limit a little below the ask instead of a market order?", a: ["To try to save part of the spread, accepting the risk of not filling", "It trades price for certainty."],
        d: [["To make sure the order fills faster", "It's slower, not faster."], ["Because market orders are only for selling", "Market orders work for buying and selling."]] }]),
    mc("1.3-30", 2, [
      { q: "Two buyers place limit orders: one at 25.02, one at 25.00. A seller arrives willing to sell at 25.00. Who trades first?", a: ["The buyer at 25.02, the better price", "Higher bids get priority."],
        d: [["The buyer at 25.00, who matches exactly", "Price priority favours the higher bid."], ["Whoever ordered first, regardless of price", "Price comes first; time breaks ties at the same price."]] }]),
    tf("1.3-31", 2, [
      ["In extended-hours trading, many brokers accept only limit orders.", true, "Thin trading and wide spreads make market orders risky then."],
      ["Market orders are the safest choice in extended-hours trading.", false, "Thin trading makes them risky; many brokers allow only limit orders."]]),
    sc("1.3-32", 2, [
      { s: "Lumen Bikes is quoted 22.00 / 22.10. Your friend wants 100 shares and says, \"Just get them, I don't care about a few cents.\"",
        p: [{ q: "Which order fits your friend's instruction?", a: ["A market order", "Fill now; price precision doesn't matter to them."], d: [["A limit order at 21.50", "That may never fill."], ["No order yet", "They want the shares now."]] },
            { q: "About what will they pay per share?", a: ["22.10, the best offer", "Market buys pay the best offer."], d: [["22.00", "That's the bid."], ["22.05, the midpoint", "Market orders don't trade at the midpoint."]] }] },
      { s: "Lumen Bikes is quoted 22.00 / 22.10. Your friend wants 100 shares but says, \"Not a cent above $22.00.\"",
        p: [{ q: "Which order fits?", a: ["A buy limit at 22.00", "It caps the price at $22.00."], d: [["A market order", "That would pay 22.10 now."], ["A sell limit at 22.00", "Your friend wants to buy, not sell."]] },
            { q: "What happens right after it's placed?", a: ["It waits as a bid at 22.00 until a seller comes down", "The ask is 22.10, above the limit."], d: [["It fills at 22.10", "That's above the limit."], ["It's rejected", "Orders below the ask are normal; they wait."]] }] }]),
    mc("1.3-33", 2, [
      { q: "Which statement is true?", a: ["A limit order protects the price; a market order protects the chance of filling", "Each gives up one to get the other."],
        d: [["A limit order protects both price and filling", "It may not fill."], ["A market order protects the price", "Its price isn't guaranteed."]] }]),
    tf("1.3-34", 2, [
      ["A sell limit order above the current bid waits for buyers to come up to it.", true, "It joins the offers until a buyer agrees."],
      ["A sell limit order above the bid fills immediately at the bid.", false, "That would sell below your limit."]]),

    // ---------- Level 3: Desk-level ----------
    tf("1.3-40", 3, [
      ["A stop order becomes a market order once the stop price is reached.", true, "It can then fill at, above or below the stop price."],
      ["A stop order guarantees a fill exactly at the stop price.", false, "Once triggered it's a market order, so the fill price can differ, especially after a gap."]]),
    gen("1.3-41", 3, function (R) {
      var px = R.int(4000, 8000) / 100, stop = Math.round((px - R.pick([2, 3, 4])) * 100) / 100, open = Math.round((stop - R.pick([1, 1.5, 2, 3])) * 100) / 100;
      var right = "Around " + c2(R, open) + ", the first available price";
      return { q: "A stock closes at " + c2(R, px) + ". You have a sell stop order at " + c2(R, stop) + ". Overnight bad news hits and it opens at " + c2(R, open) + ". About where does your stop order sell?",
        a: [right, "The stop triggers, becomes a market order and sells at the first available price, below your stop. That's gap risk."],
        d: [["Exactly at " + c2(R, stop) + ", the stop price", "A stop doesn't guarantee its price; the stock gapped below it."], ["It doesn't sell, because the price skipped the stop", "Once the price is at or below the stop, it triggers."]] };
    }),
    tf("1.3-42", 3, [
      ["A stop-limit order becomes a limit order when triggered, so after a big gap it may not fill at all.", true, "It protects the price but may miss the exit."],
      ["A stop-limit order always fills once triggered.", false, "It becomes a limit order, which may not fill."]]),
    mc("1.3-43", 3, [
      { q: "A trader wants to buy a thinly traded stock quoted 4.10 / 4.40. Why would a market order be risky?", a: ["The spread is wide and thin, so it could fill well above the price the trader has in mind", "Thin markets punish market orders."],
        d: [["Market orders are banned in thin stocks", "They're allowed, just risky."], ["It would fill at the bid", "Buys fill at the offer."]] }]),
    gen("1.3-44", 3, function (R) {
      var n = R.pick([1000, 2000, 5000]), exp = R.int(2000, 6000) / 100, slip = R.pick([0.02, 0.03, 0.05, 0.08]), got = Math.round((exp + slip) * 100) / 100, cost = Math.round(n * slip * 100) / 100;
      var right = R.money(cost, 2);
      return { q: "A fund expected to buy " + R.count(n) + " shares at " + c2(R, exp) + " but its market order averaged " + c2(R, got) + ". What did the slippage cost?",
        a: [right, R.count(n) + " × " + c2(R, slip) + " = " + right + "."],
        d: R.uniq(right, [[c2(R, slip), "That's per share."], [R.money(n * got, 2), "That's the total paid, not the slippage."], ["Nothing: it was a market order", "Market orders can slip; that's the cost."]]) };
    }),
    mc("1.3-45", 3, [
      { q: "A desk splits a big buy into many small limit orders through the day. What's the trade-off?", a: ["Less price impact, but the risk the price drifts up before it finishes", "Patience saves impact but adds timing risk."],
        d: [["No trade-off: it's always better", "Waiting carries the risk that the price moves away."], ["It guarantees the lowest price of the day", "Nothing guarantees that."]] }]),
    tf("1.3-46", 3, [
      ["A limit order resting in the book adds liquidity; a market order takes it.", true, "Resting orders wait for others; market orders use up what's waiting."],
      ["Market orders add liquidity to the book.", false, "They remove the orders they trade against."]]),
    mc("1.3-47", 3, [
      { q: "Why do many venues pay a small rebate to traders who post resting limit orders?", a: ["To attract liquidity that others can trade against", "More resting orders make the venue more useful."],
        d: [["Because limit orders are riskless", "Resting orders can be picked off when prices move."], ["Because regulators require rebates", "Rebates are a business choice."]] }]),
    tf("1.3-48", 3, [
      ["A resting limit order can be \"picked off\" if news moves the price before you update it.", true, "Like a market maker's stale quote, it can trade at a price that's suddenly bad for you."],
      ["Resting limit orders automatically update when news breaks.", false, "They stay at your price until you change them."]]),
    sc("1.3-49", 3, [
      { s: "A client must sell 10,000 shares of a stock quoted 15.00 × 800 / 15.04 × 600 (bid × size / ask × size). The stock trades about 200,000 shares a day.",
        p: [{ q: "What happens if the whole order goes in as one market order?", a: ["It sells 800 at 15.00, then pushes down through lower bids", "The bid only has 800 shares."], d: [["All 10,000 sell at 15.00", "Only 800 shares are bid there."], ["It sells at 15.04", "Sellers get bids, not offers."]] },
            { q: "What's a gentler approach?", a: ["Sell gradually with limit orders over the day", "It reduces impact, at the risk of the price moving."], d: [["One market order at the open", "That maximizes impact."], ["A buy order", "The client is selling."]] },
            { q: "About what share of a normal day's volume is the order?", a: ["About 5%", "10,000 ÷ 200,000 = 5%."], d: [["About 50%", "That would be 100,000 shares."], ["About 0.5%", "That would be 1,000 shares."]] }] }]),
    mc("1.3-50", 3, [
      { q: "A trader's sell limit at 30.00 rests on the book. A rumor sends the bid to 30.50. What happens to the order?", a: ["It fills, probably at about 30.50 or wherever buyers are as they reach it", "A sell limit fills at its price or better."],
        d: [["It fills at exactly 30.00", "It can fill better than the limit."], ["It's cancelled because the price changed", "Limit orders stay until filled or cancelled."]] }]),
    tf("1.3-51", 3, [
      ["Choosing between market and limit orders is a trade-off between certainty of filling and control of price.", true, "Desks pick based on urgency, size and liquidity."],
      ["A market order is always the professional choice.", false, "Professionals use both, depending on urgency and liquidity."]])
  ]);
})(window.P0Bank);
