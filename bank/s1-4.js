/* Question bank, skill 1.4: How a market maker earns (D44). Levels: 1 Foundation, 2 Applied, 3 Desk-level.
   Matches the apple stall's desk report: total P&L = spread earned + losses to better-informed traders + price moves on inventory.
   No question celebrates a trade or a profit; they explain how the business works. */
(function (B) {
  var mc = B.mc, tf = B.tf, gen = B.gen, sc = B.sc;
  function c2(R, x) { return R.money(x, 2); }
  function sgn(R, x) { return (x >= 0 ? "+" : "−") + R.money(Math.abs(x), 2); }
  B.add("1.4", [
    // ---------- Level 1: Foundation ----------
    tf("1.4-01", 1, [
      ["A market maker quotes both a bid and an ask and trades with whoever shows up.", true, "It stands ready on both sides all day."],
      ["A market maker only buys stocks it expects to rise.", false, "It trades with whoever shows up, on both sides; it earns the spread rather than betting on direction."]]),
    tf("1.4-02", 1, [
      ["A market maker earns the spread by buying at its bid and later selling at its ask.", true, "Each round trip earns the gap between the two."],
      ["A market maker earns money mainly by predicting where prices will go.", false, "Its business is many small spreads, not forecasts."]]),
    mc("1.4-03", 1, [
      { q: "How does a market maker mainly make money?", a: ["From the spread, over many trades", "Buy at the bid, sell at the ask, again and again."],
        d: [["From guessing which stocks will rise", "That's betting on direction, not market making."], ["From fees the exchange pays for every trade", "Some venues pay small rebates, but the core business is the spread."]] }]),
    mc("1.4-04", 1, [
      { q: "A market maker quotes 10.00 / 10.05. A customer sells it 100 shares, and later another customer buys 100 shares from it, with the quote unchanged. What did it earn?", a: ["$5", "It bought at 10.00 and sold at 10.05: 5 cents × 100 shares."],
        d: [["$0", "It bought at the bid and sold at the ask, so it earned the spread."], ["$1,005", "That's what the second customer paid, not the market maker's earnings."]] }]),
    tf("1.4-05", 1, [
      ["Holding shares exposes a market maker to inventory risk.", true, "If the price falls while it holds them, it loses money."],
      ["A market maker can't lose money on shares it's holding.", false, "Inventory loses value if the price falls."]]),
    mc("1.4-06", 1, [
      { q: "What is inventory risk?", a: ["The risk that shares you're holding lose value before you sell them", "Like a stall's apples losing value after a huge harvest floods the market."],
        d: [["The risk of running out of shares to sell", "That's not the main risk; it's holding shares whose price moves."], ["The risk that an exchange closes", "Not inventory risk."]] }]),
    tf("1.4-07", 1, [
      ["Market makers try to keep their inventory small.", true, "Less inventory means less exposure to price moves."],
      ["Market makers try to build up as much inventory as possible.", false, "Big inventory means big inventory risk."]]),
    mc("1.4-08", 1, [
      { q: "What is adverse selection, for a market maker?", a: ["Trading with someone who knows more, and losing as a result", "Better-informed traders pick the trades that are bad for the market maker."],
        d: [["Choosing which customers to serve", "Market makers trade with whoever shows up."], ["Picking the wrong stock to invest in", "That's a bad investment, not adverse selection."]] }]),
    tf("1.4-09", 1, [
      ["Banks' trading desks make markets for their clients.", true, "They quote prices and trade with clients who want to buy or sell."],
      ["Under the Volcker Rule, U.S. banks generally can't trade just to bet the bank's own money.", true, "They can make markets for clients, but proprietary betting is generally banned."],
      ["U.S. banks may freely use their own money to bet on stock prices.", false, "The Volcker Rule generally bans that kind of proprietary trading."]]),
    mc("1.4-10", 1, [
      { q: "Why do markets benefit from market makers?", a: ["People can buy or sell quickly, even when no natural buyer or seller is around", "They stand ready on both sides all day."],
        d: [["They guarantee prices only go up", "No one can guarantee that."], ["They set the official price of each stock", "No one sets prices; trades do."]] }]),
    tf("1.4-11", 1, [
      ["A market maker hopes to buy at its bid and sell at its ask many times a day.", true, "Small spreads add up over many trades."],
      ["A market maker earns the most from one big trade a year.", false, "The business is many small trades."]]),
    mc("1.4-12", 1, [
      { q: "A stall buys apples at $1.00 and sells them at $1.10. What is its spread per apple?", a: ["$0.10", "$1.10 − $1.00."],
        d: [["$1.10", "That's the selling price."], ["$2.10", "That adds the prices instead of subtracting."]] }]),
    tf("1.4-13", 1, [
      ["Frost news makes apples worth more; a trader who hears first buys at the stall's old, low price.", true, "That's adverse selection: the stall sold too cheaply to someone who knew more."],
      ["When news breaks, the stall always hears about it before anyone else.", false, "Others can hear first and trade at the stall's old prices."]]),

    // ---------- Level 2: Applied ----------
    gen("1.4-20", 2, function (R) {
      var bid = R.int(1000, 6000) / 100, sp = R.pick([1, 2, 3, 5]) / 100, ask = Math.round((bid + sp) * 100) / 100, n = R.pick([100, 200, 500]), k = R.pick([10, 20, 50, 100]);
      var earn = sp * n * k;
      return { q: "A market maker quotes " + c2(R, bid) + " / " + c2(R, ask) + ". In a day it completes " + k + " round trips of " + n + " shares (buy at its bid, sell at its ask), with the quote unchanged. What did it earn from the spread?",
        a: [R.money(earn, 2), c2(R, sp) + " × " + n + " shares × " + k + " round trips = " + R.money(earn, 2) + "."],
        d: R.uniq(R.money(earn, 2), [[R.money(sp * n, 2), "That's one round trip; there were " + k + "."], [R.money(ask * n * k, 2), "That's the value it sold, not what it earned."], [R.money(earn * 10, 2), "Ten times too much; check the cents."]]) };
    }),
    gen("1.4-21", 2, function (R) {
      var k = R.pick([200, 500, 1000, 2000]), ch = R.pick([-0.25, -0.1, -0.05, 0.05, 0.1, 0.2]), pnl = k * ch;
      return { q: "A market maker is holding " + R.count(k) + " shares. The price moves " + (ch > 0 ? "up" : "down") + " " + c2(R, Math.abs(ch)) + " before it can sell. What happens to the value of its inventory?",
        a: [sgn(R, pnl), R.count(k) + " shares × " + sgn(R, ch) + " = " + sgn(R, pnl) + ". That's inventory risk."],
        d: R.uniq(sgn(R, pnl), [[sgn(R, -pnl), "Check the direction: the price went " + (ch > 0 ? "up" : "down") + "."], ["Nothing, until it sells", "The shares are worth more or less right away."], [sgn(R, ch), "That's per share; multiply by " + R.count(k) + "."]]) };
    }),
    gen("1.4-22", 2, function (R) {
      var bid = R.int(2000, 5000) / 100, ask = Math.round((bid + 0.05) * 100) / 100, tooMany = Math.random() < 0.5;
      var down = c2(R, bid - 0.03) + " / " + c2(R, ask - 0.03), up = c2(R, bid + 0.03) + " / " + c2(R, ask + 0.03), wide = c2(R, bid - 0.03) + " / " + c2(R, ask + 0.03);
      return { q: "A market maker quotes " + c2(R, bid) + " / " + c2(R, ask) + " and is holding " + (tooMany ? "far more shares than it wants" : "fewer shares than it needs (it has sold too many)") + ". How should it lean its quote?",
        a: tooMany ? [down, "Lower both sides: a lower ask sells more and a lower bid buys less, shrinking inventory."] : [up, "Raise both sides: a higher bid buys more and a higher ask sells less, rebuilding inventory."],
        d: [tooMany ? [up, "That would buy more and sell less, growing inventory further."] : [down, "That would sell more and buy less, shrinking inventory further."], [wide, "Widening both sides doesn't steer inventory in either direction."]] };
    }),
    gen("1.4-23", 2, function (R) {
      var s = R.pick([120, 150, 200, 240, 300]), l = R.pick([40, 60, 80, 90, 150]), m = R.pick([-60, -30, 20, 50]), t = s - l + m;
      return { q: "A market maker's day: it earned " + R.money(s, 0) + " from the spread, lost " + R.money(l, 0) + " to better-informed traders, and its inventory " + (m >= 0 ? "gained " : "lost ") + R.money(Math.abs(m), 0) + " on price moves. What was its total P&L?",
        a: [sgn(R, t).replace(".00", ""), "Spread + informed-trader losses + inventory moves = " + R.money(s, 0) + " − " + R.money(l, 0) + " " + (m >= 0 ? "+ " : "− ") + R.money(Math.abs(m), 0) + " = " + sgn(R, t).replace(".00", "") + "."],
        d: R.uniq(sgn(R, t).replace(".00", ""), [[sgn(R, s).replace(".00", ""), "That's the spread only."], [sgn(R, s - l).replace(".00", ""), "That leaves out the inventory moves."], [sgn(R, s + l + m).replace(".00", ""), "Losses to informed traders subtract."]]) };
    }),
    tf("1.4-24", 2, [
      ["When it holds too much inventory, a market maker lowers both its bid and its ask.", true, "A lower ask sells more; a lower bid buys less."],
      ["When it holds too much inventory, a market maker raises its bid to buy even more.", false, "That would grow the inventory it's trying to shrink."]]),
    mc("1.4-25", 2, [
      { q: "Big news is about to break and the market maker can't tell which way it will go. What is it likely to do?", a: ["Widen its spread", "A wider spread pays for the higher risk of trading with someone who knows more."],
        d: [["Narrow its spread to attract trades", "That invites losses to better-informed traders."], ["Keep its quote exactly the same", "Leaving a stale quote is how it gets picked off."]] }]),
    tf("1.4-26", 2, [
      ["A market maker that doesn't update its quotes after news risks being picked off by faster traders.", true, "Stale prices let informed traders buy cheap or sell rich."],
      ["Stale quotes help a market maker earn more spread.", false, "They invite adverse selection losses."]]),
    gen("1.4-27", 2, function (R) {
      var ask = R.int(1000, 3000) / 100, jump = R.pick([0.2, 0.3, 0.5, 0.8, 1]), n = R.pick([100, 200, 500, 1000]), loss = jump * n;
      return { q: "A market maker's ask is " + c2(R, ask) + ". News breaks that makes the stock worth about " + c2(R, ask + jump) + ". Before it can update, a fast trader buys " + R.count(n) + " shares at " + c2(R, ask) + ". About how much did the market maker lose to that trader?",
        a: [R.money(loss, 2), "It sold " + R.count(n) + " shares " + c2(R, jump) + " below their new value: " + R.money(loss, 2) + ". That's adverse selection."],
        d: R.uniq(R.money(loss, 2), [["Nothing: it sold at its own ask", "Its ask was stale; the shares were worth more."], [R.money(ask * n, 2), "That's what the trader paid, not the loss."], [R.money(jump, 2), "That's per share; multiply by " + R.count(n) + "."]]) };
    }),
    mc("1.4-28", 2, [
      { q: "Why does a market maker care about who is trading with it?", a: ["Better-informed traders tend to win at its expense", "Ordinary customers pay the spread; informed ones can take more than the spread from it."],
        d: [["It must approve every customer", "It trades with whoever shows up."], ["It only wants to trade with large funds", "It serves everyone; the risk is from informed traders."]] }]),
    sc("1.4-29", 2, [
      { s: "You run the apple stall, quoting $1.00 to buy / $1.10 to sell. In the morning, shoppers buy 20 apples from you and farmers sell you 20 apples. Prices don't change.",
        p: [{ q: "What did you earn from the spread?", a: ["$2.00", "20 apples × $0.10 spread."], d: [["$22.00", "That's what shoppers paid, not what you earned."], ["$0.10", "That's per apple."]] },
            { q: "What's your inventory now, compared with the start?", a: ["The same: you bought 20 and sold 20", "Balanced trading leaves inventory unchanged."], d: [["20 apples more", "You also sold 20."], ["20 apples fewer", "You also bought 20."]] }] },
      { s: "You run the apple stall, quoting $1.00 / $1.10. Overnight a huge harvest floods the market and apples are now worth about $0.80. You're holding 15 apples, and your quote hasn't changed yet.",
        p: [{ q: "What happened to your inventory's value?", a: ["It fell about $3.00", "15 apples × $0.20 drop."], d: [["Nothing, until you sell", "They're worth less right now."], ["It fell $0.20", "That's per apple."]] },
            { q: "Farmers rush to sell you apples at your old $1.00 bid. What's happening?", a: ["Adverse selection: they know apples are now worth $0.80", "Your stale bid is too high after the news."], d: [["Good business: more apples to sell", "You're buying apples above their new value."], ["Nothing unusual", "The rush is a sign your price is stale."]] },
            { q: "What should you do with your quote?", a: ["Lower both sides toward the new value", "Update to about $0.80 so you stop overpaying and can sell."], d: [["Raise your bid to attract more farmers", "That buys more apples at a loss."], ["Keep it the same", "A stale quote keeps losing money."]] }] }]),

    // ---------- Level 3: Desk-level ----------
    tf("1.4-40", 3, [
      ["A market maker's total P&L is the spread earned, plus losses to better-informed traders, plus gains or losses on inventory.", true, "Those three parts explain every day's result, just like the stall's desk report."],
      ["A market maker's P&L is just the spread it earned.", false, "Informed-trader losses and inventory moves count too."]]),
    mc("1.4-41", 3, [
      { q: "Why does a tight spread on a popular stock still make sense for a market maker?", a: ["Huge numbers of trades make up for the small spread on each", "Volume times a small spread can add up."],
        d: [["Popular stocks never move, so there's no risk", "Popular stocks move too."], ["Exchanges require one-penny spreads on popular stocks", "Tight spreads come from competition, not a rule like that."]] }]),
    gen("1.4-42", 3, function (R) {
      var sp = R.pick([2, 3, 5]) / 100, n = R.pick([1000, 2000]), k = R.pick([30, 40, 50]), loss = R.pick([0.5, 1, 1.5]) * n / 10, spread = sp * n * k;
      var t = Math.round((spread - loss) * 100) / 100;
      return { q: "A market maker earns " + c2(R, sp) + " a share on " + k + " round trips of " + R.count(n) + " shares, but loses " + R.money(loss, 2) + " to traders who knew more. What's left?",
        a: [sgn(R, t), "Spread: " + c2(R, sp) + " × " + R.count(n) + " × " + k + " = " + R.money(spread, 2) + ", minus " + R.money(loss, 2) + " = " + sgn(R, t) + "."],
        d: R.uniq(sgn(R, t), [[sgn(R, spread), "That ignores the informed-trader losses."], [sgn(R, spread + loss), "Losses subtract, they don't add."], [sgn(R, sp * n - loss), "That counts only one round trip."]]) };
    }),
    mc("1.4-43", 3, [
      { q: "A market maker notices that one client's trades are usually followed by big price moves in the same direction. What's the most likely risk?", a: ["Adverse selection: that client may be better informed", "Consistently being on the wrong side of a client is the classic sign."],
        d: [["Inventory risk only", "Inventory risk exists, but the pattern points to informed trading."], ["No risk: more trades means more spread", "Losses to informed traders can exceed the spread."]] }]),
    tf("1.4-44", 3, [
      ["Market makers often hedge, for example by trading related stocks or futures, to reduce inventory risk.", true, "Hedging offsets price moves on what they hold."],
      ["Hedging means betting more on the same direction.", false, "Hedging takes an offsetting position to reduce risk."]]),
    mc("1.4-45", 3, [
      { q: "Under the Volcker Rule, which activity is a U.S. bank's trading desk generally allowed to do?", a: ["Make markets for its clients", "Market making for clients is allowed; proprietary betting generally isn't."],
        d: [["Bet the bank's own money on where a stock will go", "That's proprietary trading, generally banned for U.S. banks."], ["Ignore clients and trade only for itself", "That's proprietary trading too."]] }]),
    sc("1.4-46", 3, [
      { s: "You make markets in Lumen Bikes at 25.00 / 25.04 and are holding 3,000 shares, more than you want. Then a rumor spreads that a big customer has cancelled orders.",
        p: [{ q: "Which risk worries you most right now?", a: ["Inventory risk: you hold 3,000 shares that could fall", "A big position plus bad news is exactly inventory risk."], d: [["Running out of shares to sell", "You have plenty; that's the problem."], ["The spread being too wide", "The spread isn't the main issue here."]] },
            { q: "How might you adjust your quote?", a: ["Lower both sides and possibly widen", "Lowering sheds inventory; widening covers the extra uncertainty."], d: [["Raise your bid to buy more on the dip", "That grows the position you want to shrink."], ["Leave it unchanged", "A stale quote invites informed sellers."]] },
            { q: "The stock drops 0.40 before you sell any. What's the hit to your inventory?", a: ["About −$1,200", "3,000 × −0.40."], d: [["About −$120", "That uses 300 shares."], ["Nothing, since you haven't sold", "The loss in value is real right away."]] }] }]),
    mc("1.4-47", 3, [
      { q: "Which statement best describes a good day for a market maker?", a: ["It traded a lot, kept inventory small and avoided being picked off", "That's the process: earn spread, limit risk, avoid adverse selection."],
        d: [["It guessed the market's direction correctly", "Market making isn't about forecasting direction."], ["It held as much inventory as possible", "Large inventory is large risk."]] }]),
    // ---------- Top-up to 50 families (D44) ----------
    tf("1.4-50", 1, [
      ["A market maker is a kind of dealer: it trades from its own inventory.", true, "It buys into and sells from its own stock of shares."],
      ["A market maker only matches other people's orders and never owns shares.", false, "That's closer to a broker. Market makers trade from their own inventory."]]),
    mc("1.4-51", 1, [
      { q: "A customer buys 100 shares from a market maker. What happens to the market maker's inventory?", a: ["It goes down by 100 shares", "It sold them from its inventory."],
        d: [["It goes up by 100 shares", "It sold, so its inventory shrinks."], ["It doesn't change", "Selling shares reduces inventory."]] },
      { q: "A customer sells 100 shares to a market maker. What happens to the market maker's inventory?", a: ["It goes up by 100 shares", "It bought them into its inventory."],
        d: [["It goes down by 100 shares", "It bought, so its inventory grows."], ["It doesn't change", "Buying shares adds to inventory."]] }]),
    gen("1.4-52", 2, function (R) {
      var k = R.pick([0, 200, 500, 1000]), a = R.pick([300, 400, 600, 800]), b = R.pick([100, 200, 500, 700]), end = k - a + b;
      function inv(x) { return x >= 0 ? R.count(x) + " shares" : "Short " + R.count(-x) + " shares"; }
      return { q: "A market maker starts the hour holding " + R.count(k) + " shares. Customers buy " + R.count(a) + " shares from it and sell it " + R.count(b) + ". What is its inventory now?",
        a: [inv(end), "Start " + R.count(k) + ", minus " + R.count(a) + " sold to customers, plus " + R.count(b) + " bought = " + inv(end) + "."],
        d: R.uniq(inv(end), [[inv(k + a - b), "Customers buying from it lowers its inventory; customers selling raises it."], [inv(k), "Its trades changed the inventory."], [inv(a + b), "That adds both sides together."]]) };
    }),
    tf("1.4-53", 2, [
      ["A wider spread earns more per trade but can drive customers to other market makers.", true, "Customers go to whoever quotes better prices."],
      ["A market maker can widen its spread as much as it likes without losing business.", false, "Competitors quoting tighter prices win the trades."]]),
    mc("1.4-54", 2, [
      { q: "Several market makers compete in the same stock. What does that usually do to its spread?", a: ["Narrows it", "Each competes by quoting better prices."],
        d: [["Widens it", "Competition pushes spreads in."], ["Nothing", "Competition is a main reason spreads are tight."]] }]),
    gen("1.4-55", 3, function (R) {
      var s = R.pick([1, 2, 3, 5]) / 100, n = R.pick([100, 200, 500]), L = R.pick([50, 100, 150, 200, 300]), per = s * n, need = Math.ceil(L / per);
      var right = need + " round trips";
      return { q: "A market maker earns " + R.money(s, 2) + " a share per round trip, trading " + n + " shares each time. It just lost " + R.money(L, 0) + " to a faster, better-informed trader. How many round trips does it take to earn that back?",
        a: [right, "Each round trip earns " + R.money(s, 2) + " × " + n + " = " + R.money(per, 2) + "; " + R.money(L, 0) + " ÷ " + R.money(per, 2) + " ≈ " + need + "."],
        d: R.uniq(right, [[Math.ceil(L / s) + " round trips", "That forgets the " + n + " shares per trip."], ["1 round trip", "One trip earns only " + R.money(per, 2) + "."], [Math.ceil(need / 10) + " round trips", "Too few; check the division."]]) };
    }),
    mc("1.4-56", 3, [
      { q: "Why do many market makers try not to hold big positions overnight?", a: ["News overnight can move prices before they can trade", "They can't adjust quotes while the market is closed."],
        d: [["It's illegal to hold shares overnight", "It isn't; it's a risk choice."], ["Exchanges charge rent on overnight positions", "There's no such charge."]] }]),
    tf("1.4-57", 3, [
      ["A market maker's displayed quote must generally be honored, up to the size shown.", true, "That firmness is what lets others trade on it quickly."],
      ["A market maker can refuse to trade at its own displayed quote whenever it likes.", false, "Displayed quotes are generally firm up to their size."]]),
    mc("1.4-58", 2, [
      { q: "In the apple stall, why do you lower both prices when you're holding too many apples?", a: ["To sell more and buy fewer, shrinking your stock", "A lower ask sells more; a lower bid buys less."],
        d: [["To earn a bigger spread", "Moving both prices together keeps the spread the same."], ["Because apples are always cheaper in the afternoon", "It's about your inventory, not the time of day."]] }]),
    tf("1.4-59", 2, [
      ["Ordinary customers trading for their own reasons are, on average, good business for a market maker.", true, "They pay the spread without knowing more than the market maker does."],
      ["Every customer is equally risky for a market maker.", false, "Better-informed traders are riskier than ordinary customers."]]),
    sc("1.4-60", 3, [
      { s: "End of day on your market-making book: you earned $1,800 from the spread, lost $700 to two fast traders right after a news headline, and your remaining 1,000 shares fell $0.50 at the close.",
        p: [{ q: "What was your inventory P&L?", a: ["−$500", "1,000 shares × −$0.50."], d: [["−$0.50", "That's per share."], ["−$700", "That's the loss to fast traders."]] },
            { q: "What was your total P&L?", a: ["+$600", "$1,800 − $700 − $500."], d: [["+$1,800", "That's the spread only."], ["+$1,100", "That leaves out the inventory loss."]] },
            { q: "Which part would you work on first?", a: ["The $700 lost to fast traders: update quotes faster after news", "Avoiding adverse selection protects the spread you earn."], d: [["Earning less spread", "The spread is the part that went well."], ["Holding more inventory overnight", "That adds risk, not profit."]] }] }]),
    mc("1.4-61", 2, [
      { q: "A market maker's quote is 15.00 / 15.06. Its inventory is balanced and the market is calm. A customer wants to sell. Where does the market maker buy?", a: ["At its bid, 15.00", "It buys at its bid and hopes to sell later at its ask."],
        d: [["At its ask, 15.06", "It sells at the ask, not buys."], ["At the mid, 15.03", "Its quoted price to buy is the bid."]] }])
  ]);
})(window.P0Bank);
