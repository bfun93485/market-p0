/* Question bank, skill 0.1: What sets a stock price (D44). Levels: 1 Foundation, 2 Applied, 3 Desk-level. */
(function (B) {
  var mc = B.mc, tf = B.tf, gen = B.gen, sc = B.sc;
  B.add("0.1", [
    // ---------- Level 1: Foundation ----------
    tf("0.1-01", 1, [
      ["Owning one share makes you a part-owner of the company.", true, "A share is a slice of ownership: a claim on part of the company's future profits."],
      ["Owning one share means you have lent money to the company.", false, "Lending is what a bond does. A share makes you a part-owner, not a lender."],
      ["A shareholder owns a tiny slice of the business.", true, "Each share is one small slice of ownership; more shares means a bigger slice."]]),
    tf("0.1-02", 1, [
      ["A stock's trading price is set by buyers and sellers agreeing on trades.", true, "Every trade's price is whatever one buyer and one seller agreed on."],
      ["The company decides its stock price every morning.", false, "Once shares trade between investors, the company doesn't set the price. Buyers and sellers do."],
      ["The stock exchange decides what each stock should cost.", false, "An exchange runs the marketplace and its rules. It doesn't decide prices: buyers and sellers do."]]),
    mc("0.1-03", 1, [
      { q: "What is a stock's price at any given moment?", a: ["The price of the most recent trade", "\"The price\" is simply where the last buyer and seller agreed to trade."],
        d: [["The price the company set when it first sold shares", "That first price is history. Today's price comes from today's trades."], ["The average price over the past year", "An average is a summary, not the current price. The current price is the latest trade."]] },
      { q: "A news site says a stock \"closed at $52.10\" today. What does that number mean?", a: ["The price of the day's last trade", "The closing price is the last trade of the trading day."],
        d: [["The price the company announced for tomorrow", "Companies don't announce their trading price. Trades set it."], ["The most anyone paid all day", "That's the day's high, not the close."]] }]),
    mc("0.1-04", 1, [
      { q: "Lots of investors suddenly want to buy a stock, but few want to sell at today's price. What usually happens?", a: ["The price rises", "Buyers compete by offering more, and higher prices tempt more owners to sell."],
        d: [["The price falls", "Falling prices come from eager sellers, not eager buyers."], ["Nothing: the price is fixed until the company changes it", "No one fixes the price of a traded stock."]] },
      { q: "Many owners suddenly want to sell a stock, and few people want to buy at today's price. What usually happens?", a: ["The price falls until enough buyers step in", "Sellers accept lower prices to find buyers, so trades happen lower."],
        d: [["The price rises", "Rising prices come from eager buyers, not eager sellers."], ["Trading stops until the company sets a new price", "The company doesn't set the price. Trading continues at whatever prices buyers and sellers agree."]] }]),
    tf("0.1-05", 1, [
      ["A stock's price can change even on a day with no news about the company.", true, "Trading never stops during the day. Each new trade at a slightly different price moves the price."],
      ["A stock's price only moves when the company announces news.", false, "News often moves prices, but so does everyday buying and selling. Prices change all day without any news."]]),
    mc("0.1-06", 1, [
      { q: "A concert ticket has $50 printed on it, but fans are now reselling it for $120. What is its price right now?", a: ["$120", "The price is what the next buyer pays and the next seller accepts. The printed price stopped mattering."],
        d: [["$50, the printed price", "The printed price is history. The market price is what people pay now."], ["$85, halfway between", "Nobody traded at $85. The price is where real trades happen."]] },
      { q: "A company first sold shares to the public at $20 years ago. Today its shares trade at $65. What is its price today?", a: ["$65", "Today's trades set today's price. The first sale price is history."],
        d: [["$20, the first sale price", "The first price doesn't fix later prices. Buyers and sellers do."], ["$42.50, the average of the two", "Averages aren't prices. The price is the latest trade."]] }]),
    tf("0.1-07", 1, [
      ["Shareholders have a claim on the company's future profits.", true, "That claim on future profits is why people are willing to pay for shares."],
      ["Shareholders are guaranteed a payment every year.", false, "Nothing is guaranteed to shareholders. Many companies pay shareholders nothing directly."]]),
    mc("0.1-08", 1, [
      { q: "Besides a claim on profits, what does a share usually give its owner?", a: ["A vote at shareholder meetings", "Most shares carry voting rights, for example to elect the board."],
        d: [["A seat on the management team", "Shareholders own the company but don't run it day to day."], ["A salary from the company", "Owners aren't paid a salary. Their reward comes from profits and price changes."]] }]),
    mc("0.1-09", 1, [
      { q: "You buy one share on an investing app. Who usually sells it to you?", a: ["Another investor, or a firm that trades for a living", "Most trades are between investors, often with professional firms in the middle."],
        d: [["Always the company itself", "The company sells shares only when it issues new ones, such as at its IPO (a later lesson)."], ["The stock exchange, from its own supply", "Exchanges don't own the shares they list. They are marketplaces."]] }]),
    mc("0.1-10", 1, [
      { q: "Why can a stock's price change hundreds of times in one day?", a: ["Each new trade can happen at a slightly different price", "Every trade is a fresh agreement between a buyer and a seller."],
        d: [["The company updates it every few minutes", "Companies don't update their trading price."], ["The exchange adjusts it to keep things fair", "Exchanges enforce rules, but they don't adjust prices."]] }]),
    mc("0.1-11", 1, [
      { q: "A stock falls from $30 to $28 in an hour, with no news. What most likely happened?", a: ["Sellers were more eager than buyers, so trades happened at lower prices", "Eager sellers accept lower prices to get their trades done."],
        d: [["The company lowered the price", "The company doesn't set its trading price."], ["The exchange charged a $2 fee", "Fees don't change the price of a stock."]] },
      { q: "A stock climbs from $30 to $32 in an hour, with no news. What most likely happened?", a: ["Buyers were more eager than sellers, so trades happened at higher prices", "Eager buyers pay up to find sellers."],
        d: [["The company raised the price", "The company doesn't set its trading price."], ["The exchange added a $2 bonus", "Exchanges don't add anything to prices."]] }]),
    tf("0.1-12", 1, [
      ["If more people want to buy than sell at today's price, buyers must offer more and the price rises.", true, "That's supply and demand at work in a stock."],
      ["If more people want to sell than buy at today's price, the price usually rises.", false, "More eager sellers push the price down, not up."]]),
    mc("0.1-13", 1, [
      { q: "A share of a company is best described as…", a: ["A small slice of ownership in the company", "That's what a share is: part ownership."],
        d: [["A loan to the company", "That's a bond."], ["A coupon for the company's products", "Shares are ownership, not discounts."]] },
      { q: "Which of these makes you a part-owner of a company?", a: ["Buying one of its shares", "Shares are slices of ownership."],
        d: [["Buying its products", "Customers aren't owners."], ["Lending it money", "Lenders are owed money; they don't own the company."]] }]),
    tf("0.1-14", 1, [
      ["A higher share price always means a bigger company.", false, "Price per share alone doesn't show size. How many shares exist matters too (next lesson)."],
      ["Two companies with the same share price can be very different sizes.", true, "Size depends on price and on how many shares exist (next lesson)."]]),
    mc("0.1-15", 1, [
      { q: "Who decides whether a trade happens at $40?", a: ["A buyer and a seller who both agree to $40", "A trade happens only when both sides accept the same price."],
        d: [["The company's CEO", "Company leaders don't approve trades in their stock."], ["The SEC", "The SEC regulates markets; it doesn't approve individual trades or prices."]] }]),
    tf("0.1-16", 1, [
      ["Every trade has both a buyer and a seller.", true, "A share can only change hands if someone sells it and someone buys it."],
      ["A stock can be bought even if nobody is willing to sell it.", false, "Without a seller there is no trade. Buyers would have to offer more to find one."]]),

    // ---------- Level 2: Applied ----------
    tf("0.1-20", 2, [
      ["When a stock falls, it means more shares were sold than bought that day.", false, "Every share sold is bought by someone, so the two totals are always equal. Prices fall when sellers are more eager, accepting lower prices."],
      ["The number of shares bought in a day always equals the number sold.", true, "Each trade has one buyer and one seller for the same shares."]]),
    gen("0.1-21", 2, function (R) {
      var n = R.int(2, 9) * 100000 + R.int(1, 9) * 1000, co = R.company(), up = Math.random() < 0.5;
      return { q: "During one day, " + R.count(n) + " shares of " + co + " changed hands and the price " + (up ? "rose" : "fell") + ". How many shares did sellers sell?",
        a: [R.count(n), "Every share bought was sold by someone, so buyers bought and sellers sold the same " + R.count(n) + " shares."],
        d: [[up ? "Fewer than " + R.count(n) + ", because the price rose" : "More than " + R.count(n) + ", because the price fell", "The price shows which side was more eager, not that one side traded more shares."],
          ["It can't be known from this", "It can: every share traded has exactly one buyer and one seller."]] };
    }),
    mc("0.1-22", 2, [
      { q: "The most any buyer will pay is $50.00. The least any seller will accept is $51.00. What happens?", a: ["No trade yet: they haven't agreed on a price", "A trade needs a buyer and a seller at the same price. One side has to move."],
        d: [["A trade at $50.50, halfway", "Nobody has agreed to $50.50, so no trade happens there."], ["A trade at $51.00", "No buyer has agreed to pay $51.00 yet."]] },
      { q: "A buyer will pay up to $51.00, and a seller will accept as little as $50.80. Can they trade?", a: ["Yes: their prices overlap, so a deal is possible", "The buyer would pay at least what the seller asks, so they can agree on a price."],
        d: [["No: they must name exactly the same price first", "Overlapping prices are enough; the trade happens at a price both accept."], ["Only if the company approves", "Companies don't approve trades in their stock."]] }]),
    mc("0.1-23", 2, [
      { q: "A company reports much better results than investors expected. What usually happens to its stock price?", a: ["It tends to rise as buyers become more eager", "Good surprises make buyers willing to pay more."],
        d: [["It stays the same until the company changes it", "The company doesn't set the price."], ["It falls, because the good news is over", "Better-than-expected news usually pushes prices up."]] },
      { q: "A company reports much worse results than investors expected. What usually happens to its stock price?", a: ["It tends to fall as sellers become more eager", "Bad surprises make owners willing to sell for less."],
        d: [["It stays the same until the company changes it", "The company doesn't set the price."], ["It rises, because the bad news is over", "Worse-than-expected news usually pushes prices down."]] }]),
    mc("0.1-24", 2, [
      { q: "Which statement about \"the price\" of a stock is most accurate?", a: ["It's the last trade's price, and the next trade can differ", "The price keeps moving as new trades happen."],
        d: [["It's the company's true value, fixed by experts", "No one fixes it. It reflects what buyers and sellers agreed, which can be wrong."], ["It's what the company received when it issued the share", "That was the first sale. Prices since then come from trades between investors."]] }]),
    tf("0.1-25", 2, [
      ["You can always buy a stock at exactly the last trade's price.", false, "The last trade is history. To buy now you need a seller now, often at a slightly different price (lesson 1.1)."],
      ["The next trade can happen at a different price from the last one.", true, "Each trade is a new agreement, so prices can move from one trade to the next."]]),
    gen("0.1-26", 2, function (R) {
      var base = R.int(20, 90), p = [base + R.int(0, 99) / 100];
      while (p.length < 3) { var x = Math.round((p[p.length - 1] + R.int(-40, 40) / 100) * 100) / 100; if (p.indexOf(x) < 0 && x > 1) p.push(x); }
      var t = ["9:31 am", "9:47 am", "10:02 am"];
      var avg = Math.round((p[0] + p[1] + p[2]) / 3 * 100) / 100;
      var d = [[R.money(p[0], 2), "That's the first trade listed, not the latest."], [R.money(p[1], 2), "That trade has been replaced by a newer one."]];
      if ([p[0], p[1], p[2]].indexOf(avg) < 0) d.push([R.money(avg, 2), "Averages aren't prices. The price is the most recent trade."]);
      return { q: "This morning's trades in a stock: " + R.money(p[0], 2) + " at " + t[0] + ", " + R.money(p[1], 2) + " at " + t[1] + ", " + R.money(p[2], 2) + " at " + t[2] + ". What is its price at 10:05 am?",
        a: [R.money(p[2], 2), "The price is the most recent trade: " + R.money(p[2], 2) + " at " + t[2] + "."], d: d };
    }),
    tf("0.1-27", 2, [
      ["Regulators such as the SEC set fair prices for stocks.", false, "Regulators police honesty and fairness; they don't set prices."],
      ["Regulators make rules for markets but don't set stock prices.", true, "Buyers and sellers set prices; regulators make sure the market is fair."]]),
    mc("0.1-28", 2, [
      { q: "Why are investors willing to pay for a share at all?", a: ["It's a claim on the company's future profits", "Owners share in what the business earns over time."],
        d: [["The company promises to buy it back for more", "No such promise exists for ordinary shares."], ["It pays a guaranteed interest rate", "That describes a bond, and even bonds can fail to pay."]] }]),
    mc("0.1-29", 2, [
      { q: "A stock becomes popular on social media and many people rush to buy it. Nothing changed at the company. What can happen to its price?", a: ["It can rise anyway", "The price follows buyers and sellers, not only company news."],
        d: [["It can't move without company news", "Any change in buying or selling eagerness can move the price."], ["It must fall, because popularity scares sellers", "A rush of buyers pushes prices up, not down."]] }]),
    mc("0.1-30", 2, [
      { q: "If nobody trades a stock for an hour, what is its price during that hour?", a: ["It stays at the last trade until someone trades again", "With no new trades, the last trade is still the latest price."],
        d: [["It drifts down automatically", "Prices don't move by themselves; trades move them."], ["It resets to its first-ever price", "There's no reset. The last trade stands."]] }]),
    tf("0.1-31", 2, [
      ["A stock's price tells you what the company is truly worth.", false, "The price is what the last buyer and seller agreed. Their view can be wrong; judging value comes later in the path."],
      ["A stock's price reflects what buyers and sellers think it's worth right now.", true, "That's why prices change as views and news change."]]),
    mc("0.1-32", 2, [
      { q: "A stock trades at $80. One investor thinks it's worth $100; another thinks $60. What does the $80 price tell you?", a: ["Where buyers and sellers last agreed, with views still differing", "Trades happen because people disagree: one sells at $80, another buys at $80."],
        d: [["That both investors are wrong", "The price doesn't settle who's right. It shows where the last deal happened."], ["The exact value of the company", "Price and value can differ; that's what investors argue about."]] }]),
    sc("0.1-33", 2, [
      { s: "A stock last traded at $25.00. A large fund wants to buy 50,000 shares right now, but sellers are only offering small amounts near $25.00. There is no news about the company.",
        p: [{ q: "What will probably happen to the price as the fund keeps buying?", a: ["It rises, as the fund pays more to find more sellers", "Big buying pressure pushes trades to higher prices."],
              d: [["It stays at $25.00", "There aren't enough sellers at $25.00 for 50,000 shares."], ["It falls", "Buying pressure pushes prices up, not down."]] },
            { q: "There is no company news. Can the price still move?", a: ["Yes: the fund's buying alone can move it", "Prices respond to buying and selling, with or without news."],
              d: [["No: prices only move on news", "Order flow moves prices every day."], ["Only if the exchange agrees", "Exchanges don't approve price moves."]] }] },
      { s: "A stock last traded at $25.00. A pension fund must sell 80,000 shares today, but buyers are only bidding for small amounts near $25.00. There is no news about the company.",
        p: [{ q: "What will probably happen to the price as the fund keeps selling?", a: ["It falls, as the fund accepts less to find more buyers", "Big selling pressure pushes trades to lower prices."],
              d: [["It stays at $25.00", "There aren't enough buyers at $25.00 for 80,000 shares."], ["It rises", "Selling pressure pushes prices down, not up."]] },
            { q: "Who sets the lower prices?", a: ["The fund and the buyers who agree to each trade", "Every price is agreed between a buyer and a seller."],
              d: [["The company, to protect its shareholders", "The company doesn't set trading prices."], ["The SEC", "Regulators don't set prices."]] }] }]),

    // ---------- Level 3: Desk-level ----------
    mc("0.1-40", 3, [
      { q: "A trader says there are \"more buyers than sellers\" today. Since every share bought is sold, what do they really mean?", a: ["Buyers are more eager: they're paying up, so trades happen at higher prices", "It's about eagerness and price, not about the number of shares."],
        d: [["Buyers bought more shares than sellers sold", "That's impossible: each share bought is sold by someone."], ["Some buyers couldn't trade, so the price fell", "Unmet eager buyers push prices up, not down."]] }]),
    mc("0.1-41", 3, [
      { q: "After the market closes, a company reports bad news. The next morning the first trade is 8% below last night's close. Who set that new price?", a: ["The first buyer and seller to agree on a trade that morning", "Even big moves are set by trades between buyers and sellers."],
        d: [["The exchange, based on the news", "Exchanges don't price news. Traders do, by trading."], ["The company, when it announced the news", "The company published news; it didn't set the price."]] }]),
    tf("0.1-42", 3, [
      ["A very large buy order can push a stock's price up even without any news.", true, "To buy many shares, the buyer may have to pay higher prices to find enough sellers."],
      ["Order size never matters to price; only news moves prices.", false, "Big orders can move prices, especially in stocks that trade little."]]),
    mc("0.1-43", 3, [
      { q: "Stock A last traded at $10.00 at 9:30 am; stock B last traded at $10.00 at 3:59 pm. At 4:00 pm, which price better reflects the market's current view?", a: ["B's: it is the more recent trade", "Older trades miss everything that happened since."],
        d: [["A's: earlier trades count more", "Earlier trades are staler, not more meaningful."], ["Both equally", "Same number, but A's is six hours older."]] }]),
    gen("0.1-44", 3, function (R) {
      var b = R.int(4000, 6000) / 100, s = Math.round((b + R.pick([-0.3, -0.2, -0.1, -0.05, 0.05, 0.1, 0.2, 0.3])) * 100) / 100, can = b >= s;
      var yes = ["Yes: a trade can happen now", "The buyer's top price (" + R.money(b, 2) + ") is at or above the seller's lowest (" + R.money(s, 2) + "), so they can agree."];
      var no = ["No: not until one side moves", "The buyer's top price (" + R.money(b, 2) + ") is below the seller's lowest (" + R.money(s, 2) + "), so no price works for both yet."];
      return { q: "The most any buyer will pay right now is " + R.money(b, 2) + ". The least any seller will accept is " + R.money(s, 2) + ". Can a trade happen?",
        a: can ? yes : no, d: [can ? [no[0], "Their prices overlap, so a deal is already possible."] : [yes[0], "Their prices don't overlap yet."], ["Only if the exchange sets a price between them", "Exchanges match orders; they don't set prices."]] };
    }),
    sc("0.1-45", 3, [
      { s: "A company reports profits 10% higher than last year. But investors had expected 20% higher. The stock falls 5% within minutes.",
        p: [{ q: "How can a stock fall when profits went up?", a: ["Buyers had expected more, so they became less eager to pay", "Prices reflect expectations; a disappointment can push them down even when results improve."],
              d: [["Higher profits always lower prices", "They don't. Here the problem is the gap versus what was expected."], ["The company lowered its price to be fair", "Companies don't set trading prices."]] },
            { q: "Who moved the price down?", a: ["Buyers and sellers agreeing on trades at lower prices", "As always, trades set the price."],
              d: [["The company's accountants", "They report results; they don't trade or set prices."], ["The SEC", "Regulators don't set prices."]] }] }]),
    tf("0.1-46", 3, [
      ["Trades in a stock can happen at slightly different prices even within the same second.", true, "Each trade is its own agreement, so prices can differ trade to trade."],
      ["Within one second, a stock can only trade at one single price.", false, "Many trades can happen in a second, at slightly different prices."]]),
    mc("0.1-47", 3, [
      { q: "A friend says: \"The stock went up, so the company must be doing better today.\" What's the best reply?", a: ["Not necessarily: buyers were more eager today, which may or may not reflect the business", "Price moves show trading pressure and changing views, not always a change in the business."],
        d: [["Yes: price always tracks how the business is doing that day", "Prices move on many things besides the business, like big orders."], ["No: prices never relate to the business", "Over time, business results matter a lot to prices."]] }]),
    // ---------- Top-up to 50 families (D44) ----------
    mc("0.1-50", 2, [
      { q: "Your friend says a stock \"should\" be $100, but it trades at $70. What decides whether it ever reaches $100?", a: ["Future buyers and sellers, through the trades they agree on", "A view only moves the price if enough buyers act on it."],
        d: [["Your friend's analysis", "An opinion doesn't set the price; trades do."], ["The company, once it agrees with your friend", "Companies don't set their trading price."]] }]),
    tf("0.1-51", 2, [
      ["After overnight news, a stock's first trade can jump straight to a new price, skipping the prices in between.", true, "That's called a gap: no trades happened at the prices in between."],
      ["A stock always trades at every price on its way from $50 down to $45.", false, "Prices can gap, for example after overnight news."]]),
    gen("0.1-52", 3, function (R) {
      var up = Math.random() < 0.5, p = R.int(2000, 6000) / 100, list = [p];
      for (var i = 0; i < 3; i++) list.push(Math.round((list[i] + (up ? 1 : -1) * R.pick([0.03, 0.04, 0.05, 0.06, 0.08])) * 100) / 100);
      var buyers = ["Buyers: each trade happened at a higher price", "Eager buyers keep paying up, so trades climb."];
      var sellers = ["Sellers: each trade happened at a lower price", "Eager sellers keep accepting less, so trades fall."];
      return { q: "The last four trades in a stock were " + list.map(function (x) { return R.money(x, 2); }).join(", ") + ". Which side looks more eager?",
        a: up ? buyers : sellers, d: [up ? [sellers[0], "The trades are climbing, not falling."] : [buyers[0], "The trades are falling, not climbing."], ["Neither: every share bought was sold, so you can't tell", "Equal shares change hands, but the direction of prices shows which side is giving in."]] };
    }),
    mc("0.1-53", 3, [
      { q: "A stock last traded at $40, but right now no buyer will pay more than $35. If you must sell this second, what happens?", a: ["You'd sell near $35, well below the last trade", "The last trade is history; you can only sell to the buyers who are there now."],
        d: [["You'd get $40, the last price", "Nobody is offering $40 right now."], ["Your trade waits until the price returns to $40", "If you sell now, you take the best price on offer."]] }]),
    sc("0.1-54", 2, [
      { s: "Resale tickets for a sold-out concert: the last ticket sold for $150. Then the band announces a surprise guest star.",
        p: [{ q: "What probably happens to the next resale prices?", a: ["They rise, as more fans want tickets", "More eager buyers push the price up."], d: [["They stay at $150", "The last price doesn't hold when demand changes."], ["They fall back to the printed price", "The printed price stopped mattering long ago."]] },
            { q: "Who sets those new prices?", a: ["Fans buying and selling tickets", "Each resale is a new agreement between a buyer and a seller."], d: [["The band", "The band sold the tickets once; resale prices are up to fans."], ["The company that printed the tickets", "Printers don't set resale prices."]] }] },
      { s: "Resale tickets for a sold-out concert: the last ticket sold for $150. Then the headliner cancels and a less popular act replaces them.",
        p: [{ q: "What probably happens to the next resale prices?", a: ["They fall, as fewer fans want tickets", "Eager sellers accept less."], d: [["They stay at $150", "The last price doesn't hold when demand changes."], ["They rise", "Less demand pushes prices down, not up."]] },
            { q: "Who sets those new prices?", a: ["Fans buying and selling tickets", "Each resale is a new agreement between a buyer and a seller."], d: [["The venue", "The venue doesn't set resale prices."], ["The band's manager", "Managers don't set resale prices."]] }] }])
  ]);
})(window.P0Bank);
