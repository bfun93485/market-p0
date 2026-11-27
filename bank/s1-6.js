/* Question bank, skill 1.6: Liquidity and big orders (D44, D49). Levels: 1 Foundation, 2 Applied, 3 Desk-level.
   Sources behind the facts: SEC/CFTC joint report on the May 6, 2010 market events; research on market impact growing
   less than proportionally with order size (e.g. Almgren et al. 2005; Toth et al. 2011). */
(function (B) {
  var mc = B.mc, tf = B.tf, gen = B.gen, sc = B.sc;
  function c2(R, x) { return R.money(x, 2); }
  function r2(x) { return Math.round(x * 100) / 100; }
  function r3(x) { return Math.round(x * 1000) / 1000; }
  // Three price levels on one side of the book, with sizes; buy side climbs, sell side falls.
  function book(R, buy) {
    var p = R.int(1000, 6000) / 100, st = R.pick([1, 2, 5]) / 100, lv = [];
    for (var i = 0; i < 3; i++) lv.push({ p: r2(buy ? p + i * st : p - i * st), s: R.pick([100, 200, 300, 400, 500]) });
    return lv;
  }
  function fill(lv, n) { var left = n, cost = 0, last = null; lv.forEach(function (l) { if (left <= 0) return; var q = Math.min(left, l.s); cost += q * l.p; left -= q; last = l.p; }); return { avg: cost / (n - left), filled: n - left, last: last, cost: cost }; }
  function show(R, lv) { return lv.map(function (l) { return R.count(l.s) + " at " + c2(R, l.p); }).join(", "); }
  B.add("1.6", [
    // ---------- Level 1: Foundation ----------
    tf("1.6-01", 1, [
      ["A liquid market lets you buy or sell quickly without moving the price much.", true, "That's what liquidity means."],
      ["A stock is liquid if its share price is high.", false, "Price says nothing about liquidity; ease of trading does."]]),
    tf("1.6-02", 1, [
      ["A tight bid-ask spread is a sign of liquidity.", true, "Tight spreads mean trading in and out costs little."],
      ["A wide spread is a sign that a stock is very liquid.", false, "Wide spreads usually mean fewer traders and less liquidity."]]),
    mc("1.6-03", 1, [
      { q: "Which is usually the most liquid?", a: ["Shares of a huge, heavily traded company", "Many buyers and sellers, tight spreads, lots of depth."],
        d: [["A house", "Selling a house can take months."], ["A signed baseball card", "Collectibles can take a long time to sell at a fair price."]] },
      { q: "Which is usually the least liquid?", a: ["Shares of a tiny company that trades a few times a day", "Few traders means wide spreads and little depth."],
        d: [["Shares of a giant company traded millions of times a day", "That's very liquid."], ["Cash in a bank account", "Cash is the most liquid asset there is."]] }]),
    mc("1.6-04", 1, [
      { q: "What does \"depth\" mean in a market?", a: ["How many shares are bid and offered at each price", "Deep markets can absorb big orders."],
        d: [["How long a company has been listed", "Depth is about shares waiting to trade."], ["How far a price has fallen", "That's a decline, not depth."]] }]),
    tf("1.6-05", 1, [
      ["A large buy order can use up the shares at the best offer and move on to higher offers.", true, "That's called walking the book."],
      ["A large buy order always fills entirely at the best offer.", false, "Only so many shares are offered at the best price."]]),
    mc("1.6-06", 1, [
      { q: "What is market impact?", a: ["The price moving because of your own order", "Big orders push the price against themselves."],
        d: [["News that moves the whole market", "That's market news."], ["The exchange's trading fee", "Impact is a price effect, not a fee."]] },
      { q: "Your big buy order pushed the price up as it filled. What is that called?", a: ["Market impact", "Your own order moved the price against you."],
        d: [["A dividend", "Dividends are company payouts."], ["Price improvement", "Improvement is getting a better price, not a worse one."]] }]),
    tf("1.6-07", 1, [
      ["A large sell order can push down through lower and lower bids.", true, "It uses up the best bid, then trades with lower ones."],
      ["A large sell order raises the price because supply increases.", false, "More selling pushes the price down."]]),
    mc("1.6-08", 1, [
      { q: "You must sell your house within a week. What usually happens?", a: ["You may have to cut the price a lot to find a buyer fast", "Houses are illiquid: selling fast usually costs you."],
        d: [["You sell at full price in an hour", "Houses take time to sell."], ["The price rises because you're in a hurry", "Being in a hurry weakens your bargaining position."]] }]),
    tf("1.6-09", 1, [
      ["Liquidity can dry up suddenly in a panic, when everyone wants to sell.", true, "Buyers step back, spreads widen and depth vanishes."],
      ["A stock's liquidity never changes.", false, "Liquidity changes with market conditions, sometimes very fast."]]),
    mc("1.6-10", 1, [
      { q: "Why do big funds split large orders into smaller pieces over time?", a: ["To reduce how much their own trading moves the price", "Smaller pieces use less of the depth at once."],
        d: [["Because exchanges cap orders at 100 shares", "There's no such cap."], ["To pay more in commissions", "Nobody wants that; it's about impact."]] }]),
    mc("1.6-11", 1, [
      { q: "Sellers offer only 100 shares at the best price. You want 1,000. What does that tell you?", a: ["Most of your order will fill at higher prices", "The best price is thin."],
        d: [["All 1,000 will fill at the best price", "Only 100 are offered there."], ["Your order can't fill at all", "It can fill at higher offers."]] }]),
    tf("1.6-12", 1, [
      ["Heavy daily trading volume is a sign of liquidity.", true, "Lots of trading means buyers and sellers are easy to find."],
      ["Trading volume says nothing about liquidity.", false, "Heavy volume is one of the main signs of liquidity."]]),
    mc("1.6-13", 1, [
      { q: "A stock trades at $900 a share. Does that make it liquid?", a: ["Not by itself: liquidity depends on spreads, depth and volume", "Share price says nothing about how easy it is to trade."],
        d: [["Yes: expensive stocks are always liquid", "Price and liquidity are separate."], ["No: expensive stocks are always illiquid", "Some high-priced stocks are very liquid."]] }]),
    tf("1.6-14", 1, [
      ["Cash is the most liquid asset.", true, "You can spend it right away at full value."],
      ["A house is more liquid than cash.", false, "Cash is instantly usable; a house can take months to sell."]]),
    mc("1.6-15", 1, [
      { q: "Why do hard-to-trade assets often have wide spreads?", a: ["Dealers take more risk holding something that's hard to resell", "Wider spreads pay for that risk."],
        d: [["Because they're always worth more", "Spread width isn't about value."], ["Because exchanges set spreads by rule", "Spreads come from buyers and sellers."]] }]),
    mc("1.6-16", 1, [
      { q: "Which order moves a stock's price more?", a: ["Selling 500,000 shares at once", "It uses up far more of the bids."],
        d: [["Selling 500 shares at once", "A small order barely touches the depth."], ["They move it the same", "Bigger orders use up more of the book."]] }]),

    // ---------- Level 2: Applied ----------
    gen("1.6-20", 2, function (R) {
      var lv = book(R, true), n = lv[0].s + lv[1].s + R.pick([0, 100]); if (n > lv[0].s + lv[1].s + lv[2].s) n = lv[0].s + lv[1].s;
      var f = fill(lv, n), right = R.money(r3(f.avg), 3);
      return { q: "Sellers offer " + show(R, lv) + ". You send a market order to buy " + R.count(n) + " shares. What's your average price?",
        a: [right, "Total cost " + R.money(r2(f.cost), 2) + " ÷ " + R.count(n) + " shares ≈ " + right + "."],
        d: R.uniq(right, [[R.money(lv[0].p, 3), "Only " + R.count(lv[0].s) + " shares were offered there."], [R.money(f.last, 3), "The first shares filled cheaper."], [R.money(r3((lv[0].p + f.last) / 2), 3), "A simple average ignores how many shares filled at each price."]]) };
    }),
    gen("1.6-21", 2, function (R) {
      var lv = book(R, false), n = lv[0].s + R.pick([100, 200]); if (n > lv[0].s + lv[1].s) n = lv[0].s + lv[1].s;
      var f = fill(lv, n), right = R.money(r3(f.avg), 3);
      return { q: "Buyers bid " + show(R, lv) + ". You sell " + R.count(n) + " shares immediately. What's your average price?",
        a: [right, "Total received " + R.money(r2(f.cost), 2) + " ÷ " + R.count(n) + " ≈ " + right + "."],
        d: R.uniq(right, [[R.money(lv[0].p, 3), "Only " + R.count(lv[0].s) + " shares were bid there."], [R.money(f.last, 3), "The first " + R.count(lv[0].s) + " sold higher."], [R.money(r3((lv[0].p + lv[1].p) / 2), 3), "A simple average ignores how many shares filled at each price."]]) };
    }),
    gen("1.6-22", 2, function (R) {
      var lv = book(R, true), k = R.pick([1, 2, 3]), n = 0;
      for (var i = 0; i < k; i++) n += lv[i].s;
      if (k > 1) n -= R.pick([0, 100]) > 0 && lv[k - 1].s > 100 ? 100 : 0;
      var f = fill(lv, n), right = c2(R, f.last);
      return { q: "Sellers offer " + show(R, lv) + ". You buy " + R.count(n) + " shares immediately. What's the highest price you pay for any share?",
        a: [right, "Your order works up the offers until " + R.count(n) + " shares are filled."],
        d: R.uniq(right, lv.map(function (l) { return [c2(R, l.p), l.p < f.last ? "Your order is too big to stop there." : "Your order is filled before it reaches that price."]; })) };
    }),
    gen("1.6-23", 2, function (R) {
      var v = R.pick([200000, 500000, 1000000, 2000000]), p = R.pick([1, 2, 5, 10, 20, 25, 50]), n = v * p / 100, right = p + "%";
      return { q: "A stock trades about " + R.count(v) + " shares a day. A fund wants to buy " + R.count(n) + " shares. About what share of a day's volume is that?",
        a: [right, R.count(n) + " ÷ " + R.count(v) + " = " + right + ". The bigger that share, the more the order tends to move the price."],
        d: R.uniq(right, [[p * 10 + "%", "Check the division."], [(p / 10) + "%", "Check the division."], [Math.min(100, p * 2) === p * 2 ? p * 2 + "%" : "100%", "Divide the order by the daily volume."]]) };
    }),
    gen("1.6-24", 2, function (R) {
      var lv = book(R, true), n = lv[0].s + lv[1].s + R.pick([100, 0]); if (n > lv[0].s + lv[1].s + lv[2].s) n = lv[0].s + lv[1].s;
      var f = fill(lv, n), extra = r2(f.cost - lv[0].p * n), right = R.money(extra, 2);
      return { q: "Sellers offer " + show(R, lv) + ". You buy " + R.count(n) + " shares immediately. How much more do you pay in total than if every share had filled at " + c2(R, lv[0].p) + "?",
        a: [right, "Every share above the first " + R.count(lv[0].s) + " cost more. That extra is market impact."],
        d: R.uniq(right, [["Nothing: you paid the market price", "The best price ran out after " + R.count(lv[0].s) + " shares."], [R.money(r2((f.last - lv[0].p) * n), 2), "Not every share paid the highest price."], [c2(R, r2(f.last - lv[0].p)), "That's the price difference per share, not the total."]]) };
    }),
    gen("1.6-25", 2, function (R) {
      var v = R.pick([100000, 200000, 400000, 500000]), p = R.pick([10, 20, 25]), days = R.pick([2, 3, 4, 5, 8, 10]), n = v * p / 100 * days, right = days + " days";
      return { q: "A fund wants to sell " + R.count(n) + " shares without trading more than " + p + "% of each day's volume. The stock trades about " + R.count(v) + " shares a day. How many days will it take?",
        a: [right, p + "% of " + R.count(v) + " is " + R.count(v * p / 100) + " a day; " + R.count(n) + " ÷ " + R.count(v * p / 100) + " = " + days + "."],
        d: R.uniq(right, [["1 day", "That would be " + R.count(n / v * 100) + "% of a day's volume."], [days * 2 + " days", "Check the daily amount: " + p + "% of " + R.count(v) + "."]].concat(Math.round(days / 2) > 1 ? [[Math.round(days / 2) + " days", "Check the daily amount: " + p + "% of " + R.count(v) + "."]] : [])) };
    }),
    gen("1.6-26", 2, function (R) {
      var names = R.shuffle(["Stock A", "Stock B"]), liquid = names[0], other = names[1];
      var t = { sp: R.pick([1, 2]) / 100, d: R.pick([20000, 50000, 80000]), v: R.pick([5, 10, 20]) }, w = { sp: R.pick([15, 25, 40]) / 100, d: R.pick([200, 300, 500]), v: R.pick([20, 50, 80]) };
      function desc(n, x, big) { return n + ": spread " + c2(R, x.sp) + ", " + R.count(x.d) + " shares at the best prices, " + (big ? R.count(x.v) + " million" : R.count(x.v * 1000)) + " shares a day"; }
      var lines = liquid === "Stock A" ? [desc("Stock A", t, true), desc("Stock B", w, false)] : [desc("Stock A", w, false), desc("Stock B", t, true)];
      return { q: "Which is more liquid? " + lines.join(". ") + ".",
        a: [liquid, "Tighter spread, more depth and heavier volume."],
        d: [[other, "Its spread is wider, with less depth and volume."], ["You can't tell without the share prices", "Share price doesn't decide liquidity."]] };
    }),
    tf("1.6-27", 2, [
      ["Market impact is a real cost, even though it never shows up as a fee.", true, "You pay it through worse prices."],
      ["If there are no fees, a large order costs nothing extra.", false, "Walking the book costs you through worse prices."]]),
    mc("1.6-28", 2, [
      { q: "Right after your big buy order, the best offer is higher than before. Why?", a: ["Your order used up the cheaper offers", "What's left starts at a higher price."],
        d: [["The exchange raised it as a fee", "Exchanges don't change prices."], ["The company issued new shares", "Your trade didn't involve the company."]] },
      { q: "Right after your big sell order, the best bid is lower than before. Why?", a: ["Your order used up the higher bids", "What's left starts at a lower price."],
        d: [["Selling always triggers a fee that lowers the bid", "Bids come from buyers, not fees."], ["The company bought back shares", "Your trade didn't involve the company."]] }]),
    sc("1.6-29", 2, [
      { s: "You need to sell 5,000 shares of a small company right now. Buyers bid 1,000 at $2.00, 1,500 at $1.98 and 3,000 at $1.95.",
        p: [{ q: "How many different prices will your order trade at?", a: ["Three", "1,000 + 1,500 + 2,500 from the third level."], d: [["One", "Only 1,000 are bid at $2.00."], ["Two", "The first two levels hold only 2,500 shares."]] },
            { q: "What's the lowest price you'll get?", a: ["$1.95", "The last 2,500 shares sell at the third bid."], d: [["$2.00", "That's the best bid, used up first."], ["$1.98", "The order goes past that level."]] },
            { q: "About what's your average price?", a: ["About $1.97", "($2,000 + $2,970 + $4,875) ÷ 5,000 ≈ $1.969."], d: [["$2.00", "Only 1,000 sold at $2.00."], ["About $1.95", "Only half the order sold at $1.95."]] }] },
      { s: "You need to buy 3,000 shares of a small company right now. Sellers offer 500 at $4.00, 1,000 at $4.02 and 4,000 at $4.05.",
        p: [{ q: "How many different prices will your order trade at?", a: ["Three", "500 + 1,000 + 1,500 from the third level."], d: [["One", "Only 500 are offered at $4.00."], ["Two", "The first two levels hold only 1,500 shares."]] },
            { q: "What's the highest price you'll pay?", a: ["$4.05", "The last 1,500 shares fill at the third offer."], d: [["$4.00", "That's the best offer, used up first."], ["$4.02", "The order goes past that level."]] },
            { q: "About what's your average price?", a: ["About $4.03", "($2,000 + $4,020 + $6,075) ÷ 3,000 ≈ $4.032."], d: [["$4.00", "Only 500 filled at $4.00."], ["$4.05", "Half the order filled cheaper."]] }] }]),
    mc("1.6-30", 2, [
      { q: "Why might a fund look for one large buyer off-exchange for its block?", a: ["To trade the whole block without pushing through the order book", "One matching buyer means less market impact."],
        d: [["Because exchanges ban sales over 1,000 shares", "There's no such ban."], ["To get a worse price on purpose", "The aim is less impact, which usually means a better price."]] }]),
    tf("1.6-31", 2, [
      ["Splitting an order over time reduces impact, but the price may move against you while you wait.", true, "That's the trade-off between impact and timing risk."],
      ["Splitting an order over time always gets a better price.", false, "The price can drift away while you wait."]]),
    mc("1.6-32", 2, [
      { q: "Which costs more to buy and sell again right away?", a: ["A stock quoted $5.00 / $5.20", "Its 20-cent spread is far wider."],
        d: [["A stock quoted $50.00 / $50.01", "Its spread is just 1 cent."], ["They cost the same", "Wider spreads cost more to cross."]] }]),
    gen("1.6-33", 2, function (R) {
      var n = R.pick([1000, 2000, 5000]), s1 = R.pick([1, 2]) / 100, s2 = R.pick([10, 15, 20, 30]) / 100, diff = r2((s2 - s1) * n), right = R.money(diff, 2);
      return { q: "You buy and immediately sell " + R.count(n) + " shares of two stocks. Stock L has a " + c2(R, s1) + " spread; Stock T has a " + c2(R, s2) + " spread. How much more does the round trip cost in Stock T?",
        a: [right, "Each round trip costs the spread × shares: (" + c2(R, s2) + " − " + c2(R, s1) + ") × " + R.count(n) + " = " + right + "."],
        d: R.uniq(right, [[c2(R, r2(s2 - s1)), "That's per share."], [R.money(r2(s2 * n), 2), "That's Stock T's whole cost, not the difference."], ["Nothing: both cost the spread", "The spreads differ."]]) };
    }),
    tf("1.6-34", 2, [
      ["A stock's liquidity can change through the trading day, and is often heaviest near the open and close.", true, "Trading volume tends to bunch at the start and end of the day."],
      ["A stock is exactly as liquid at every minute of the trading day.", false, "Liquidity varies through the day."]]),

    // ---------- Level 3: Desk-level ----------
    tf("1.6-40", 3, [
      ["Liquidity is often scarcest exactly when investors want it most, as in a crash.", true, "When everyone sells at once, buyers step back."],
      ["In a crash, liquidity rises because so many people are trading.", false, "Sellers flood in while buyers step back, so liquidity thins."]]),
    mc("1.6-41", 3, [
      { q: "On May 6, 2010 (the \"Flash Crash\"), U.S. stock prices plunged and recovered within minutes. What did the regulators' report point to?", a: ["A large sell program executed quickly into a market where liquidity was thinning", "As buyers pulled back, some stocks briefly traded at absurd prices."],
        d: [["A company going bankrupt", "No single company caused it."], ["Exchanges being closed", "Markets were open; liquidity vanished."]] }]),
    gen("1.6-42", 3, function (R) {
      var p = R.int(2000, 8000) / 100, bps = R.pick([5, 10, 15, 20, 25, 40]), f = r2(p * (1 + bps / 10000)), real = Math.round((f - p) / p * 10000), n = R.pick([10000, 50000, 100000]);
      function bp(x) { return x + (x === 1 ? " basis point" : " basis points"); }
      var right = bp(real);
      return { q: "A fund decides to buy " + R.count(n) + " shares when the stock is " + c2(R, p) + ". Its order fills at an average of " + c2(R, f) + ". About how much did execution cost, in basis points (1 bp = 0.01%)?",
        a: [right, "(" + c2(R, f) + " − " + c2(R, p) + ") ÷ " + c2(R, p) + " ≈ " + R.pct(real / 100, 2) + " = " + right + "."],
        d: R.uniq(right, [[bp(real * 10), "Ten times too big; 1 bp is 0.01%."], [bp(Math.max(1, Math.round(real / 10))), "Ten times too small."], [bp(Math.round((f - p) * 100)), "That's the price change in cents; basis points are a percentage of the price."]]) };
    }),
    gen("1.6-43", 3, function (R) {
      var lv = book(R, false), n = lv[0].s + lv[1].s + lv[2].s, f = fill(lv, n), avg = r3(f.avg);
      var blk = r2(f.avg + (Math.random() < 0.5 ? 1 : -1) * R.pick([1, 2]) / 100), blockWins = blk > f.avg;
      var diff = R.money(r2(Math.abs(blk * n - f.cost)), 2);
      var bTxt = "The block buyer, by about " + diff, kTxt = "Selling through the book, by about " + diff;
      return { q: "To sell " + R.count(n) + " shares now, you can hit the bids (" + show(R, lv) + ") or sell the whole lot to one block buyer at " + c2(R, blk) + ". Which pays more?",
        a: [blockWins ? bTxt : kTxt, "Through the book you'd average about " + R.money(avg, 3) + "; the block pays " + c2(R, blk) + "."],
        d: [[blockWins ? kTxt : bTxt, "Through the book you'd average about " + R.money(avg, 3) + "; the block pays " + c2(R, blk) + "."], ["You can't tell until the trade is done", "You can work out the book's average now: about " + R.money(avg, 3) + "."], ["They pay the same", "Compare " + R.money(avg, 3) + " with " + c2(R, blk) + "."]] };
    }),
    mc("1.6-44", 3, [
      { q: "Why might a fund send a big order to a dark pool?", a: ["To find the other side without showing the order to the whole market", "Hiding a big order can reduce impact."],
        d: [["Because dark pools guarantee a better price", "They don't guarantee prices."], ["Because dark pools aren't regulated", "In the U.S., they operate as regulated alternative trading systems."]] }]),
    tf("1.6-45", 3, [
      ["Showing a huge order on the screen can move the price before it trades, because others see it coming.", true, "That's one reason big orders are split or hidden."],
      ["Displaying a huge order never affects the price until it trades.", false, "Other traders can react to a big visible order."]]),
    mc("1.6-46", 3, [
      { q: "Which is a sign that a stock's liquidity is thinning?", a: ["Spreads widening and fewer shares at each price", "Wider and thinner means harder to trade."],
        d: [["Spreads tightening and depth growing", "That means liquidity is improving."], ["The share price rising", "Price direction isn't liquidity."]] }]),
    sc("1.6-47", 3, [
      { s: "A fund holds 3 million shares of a stock that trades about 600,000 shares a day. It wants out, trading no more than 20% of each day's volume.",
        p: [{ q: "About how many trading days will that take?", a: ["About 25 days", "20% of 600,000 is 120,000 a day; 3,000,000 ÷ 120,000 = 25."], d: [["About 5 days", "That's the holding ÷ the whole daily volume."], ["About 2 days", "Check the daily amount: 120,000."]] },
            { q: "Why not sell it all today?", a: ["It's five times a normal day's volume, so the price impact would be huge", "The order would push far down through the bids."], d: [["Exchanges forbid selling more than you bought", "No such rule; it's about impact."], ["Selling all at once guarantees the best price", "It would do the opposite."]] },
            { q: "What risk does selling slowly carry?", a: ["The price may fall while the fund waits", "That's timing risk."], d: [["None: slow selling is risk-free", "The price can move against you."], ["The shares expire", "Shares don't expire."]] }] }]),
    mc("1.6-48", 3, [
      { q: "Why do investors usually want a higher expected return to hold an illiquid asset?", a: ["It can be slow or costly to sell when they need to", "That extra return is called a liquidity premium."],
        d: [["Illiquid assets are always riskier companies", "Illiquidity is about trading, not company quality."], ["Rules require illiquid assets to pay more", "No rule sets it; investors demand it."]] }]),
    tf("1.6-49", 3, [
      ["Many companies' bonds trade far less often than their stock.", true, "Corporate bonds are usually much less liquid than large-company shares."],
      ["A company's bonds always trade more often than its stock.", false, "Most corporate bonds trade less often than the stock."]]),
    gen("1.6-50", 3, function (R) {
      var lv = book(R, true), lim = lv[1].p, n = lv[0].s + lv[1].s + R.pick([200, 300, 500]), got = lv[0].s + lv[1].s, right = R.count(got) + " fill; " + R.count(n - got) + " wait at " + c2(R, lim);
      return { q: "Sellers offer " + show(R, lv) + ". You place a buy limit order for " + R.count(n) + " shares at " + c2(R, lim) + ". What happens right away?",
        a: [right, "Your limit lets you buy at " + c2(R, lim) + " or less, so you take the first two levels and the rest waits as a bid."],
        d: R.uniq(right, [["All " + R.count(n) + " fill", "The third level is above your limit."], [R.count(lv[0].s) + " fill; the rest is cancelled", "A limit order can buy at " + c2(R, lim) + " too, and unfilled shares wait rather than cancel."], ["Nothing fills until all " + R.count(n) + " are available", "Limit orders fill partly."]]) };
    }),
    tf("1.6-51", 3, [
      ["A stock can have a tight spread but little depth, so a large order still moves the price.", true, "The spread shows the best prices, not how many shares are there."],
      ["A tight spread guarantees a large order won't move the price.", false, "Depth matters too."]]),
    tf("1.6-52", 3, [
      ["In studies of big orders, price impact grows with order size, but more slowly than the size itself.", true, "Doubling an order raises its impact, but by less than double."],
      ["Doubling an order's size always exactly doubles its price impact per share.", false, "Research finds impact grows less than proportionally with size."]])
  ]);
})(window.P0Bank);
