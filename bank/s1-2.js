/* Question bank, skill 1.2: The best price across exchanges, the NBBO (D44, D49). Levels: 1 Foundation, 2 Applied, 3 Desk-level.
   Sources as in the lesson: SEC Regulation NMS (Rule 611, Order Protection; Rule 610, locked and crossed quotes); FINRA Rule 5310. */
(function (B) {
  var mc = B.mc, tf = B.tf, gen = B.gen, sc = B.sc;
  function c2(R, x) { return R.money(x, 2); }
  function venues(R, base) { // three exchanges with distinct bids and asks, never locked or crossed overall
    var qs, bb, ba;
    do {
      qs = ["Exchange A", "Exchange B", "Exchange C"].map(function (n) { var b = Math.round((base + R.int(-4, 4) / 100) * 100) / 100; return { n: n, b: b, a: Math.round((b + R.int(2, 6) / 100) * 100) / 100 }; });
      bb = Math.max.apply(null, qs.map(function (x) { return x.b; })); ba = Math.min.apply(null, qs.map(function (x) { return x.a; }));
      var bids = qs.map(function (x) { return x.b; }), asks = qs.map(function (x) { return x.a; });
    } while (bb >= ba || bids[0] === bids[1] || bids[1] === bids[2] || bids[0] === bids[2] || asks[0] === asks[1] || asks[1] === asks[2] || asks[0] === asks[2]);
    return { qs: qs, bb: bb, ba: ba, text: qs.map(function (x) { return x.n + " " + c2(R, x.b) + " / " + c2(R, x.a); }).join("; ") };
  }
  B.add("1.2", [
    // ---------- Level 1: Foundation ----------
    tf("1.2-01", 1, [
      ["The national best bid is the highest bid on any U.S. exchange.", true, "Sellers want the most they can get, so the best bid is the highest one anywhere."],
      ["The national best bid is the lowest bid across exchanges.", false, "The best bid is the highest bid anywhere: that's the best price for a seller."]]),
    tf("1.2-02", 1, [
      ["The national best offer is the lowest offer on any U.S. exchange.", true, "Buyers want to pay the least, so the best offer is the lowest one anywhere."],
      ["The national best offer is the highest offer across exchanges.", false, "The best offer is the lowest offer anywhere: that's the best price for a buyer."]]),
    mc("1.2-03", 1, [
      { q: "What does NBBO stand for?", a: ["National Best Bid and Offer", "The best bid and best offer across all U.S. exchanges."],
        d: [["National Bank Bond Offering", "Not a market term."], ["New Buyers Buy Often", "Not a market term."]] }]),
    gen("1.2-04", 1, function (R) {
      var v = venues(R, R.int(2000, 8000) / 100), askBid = Math.random() < 0.5;
      var right = askBid ? c2(R, v.bb) : c2(R, v.ba);
      var others = v.qs.map(function (x) { return askBid ? x.b : x.a; }).filter(function (x) { return x !== (askBid ? v.bb : v.ba); });
      return { q: "Quotes for one stock: " + v.text + ". What is the national best " + (askBid ? "bid" : "offer") + "?",
        a: [right, askBid ? "The best bid is the highest bid on any exchange." : "The best offer is the lowest offer on any exchange."],
        d: R.uniq(right, others.map(function (x) { return [c2(R, x), askBid ? "There's a higher bid elsewhere." : "There's a lower offer elsewhere."]; }).concat([[c2(R, askBid ? v.ba : v.bb), askBid ? "That's an offer, not a bid." : "That's a bid, not an offer."]])) };
    }),
    mc("1.2-05", 1, [
      { q: "Why is there a single \"national\" best price at all?", a: ["The same stock trades on many exchanges at once, so their best quotes are combined", "Combining them shows the best price anywhere."],
        d: [["Each stock trades on only one exchange", "Stocks trade on many exchanges and off-exchange venues."], ["The government sets one price each morning", "No one sets the price; the NBBO is just the best current quotes."]] }]),
    tf("1.2-06", 1, [
      ["The NBBO changes all day as exchanges' quotes change.", true, "Every new better bid or offer anywhere can change it."],
      ["The NBBO is set once each morning and stays fixed.", false, "It updates constantly with the quotes."]]),
    mc("1.2-07", 1, [
      { q: "The same concert seat is listed for $95, $90 and $99 on three resale sites. Which is like the national best offer?", a: ["$90, the lowest listing anywhere", "The best offer is the cheapest seller across all the sites."],
        d: [["$95, the site you opened first", "The best offer doesn't depend on which site you open."], ["$99, the highest listing", "Buyers want the lowest price, not the highest."]] }]),
    tf("1.2-08", 1, [
      ["Your broker has a duty to seek the best terms reasonably available for your order.", true, "That's the duty of best execution."],
      ["Your broker can fill your order at any price it likes, whatever other exchanges show.", false, "Brokers must seek best execution, and rules guard against trading through better prices."]]),
    mc("1.2-09", 1, [
      { q: "What is a \"trade-through\"?", a: ["A trade at a worse price than the best price displayed on another exchange", "U.S. rules generally prevent it."],
        d: [["A trade that passes through two brokers", "It's about price, not how many firms handle it."], ["A trade made during lunch", "Timing isn't what makes a trade-through."]] }]),
    tf("1.2-10", 1, [
      ["U.S. rules generally prevent a trade at a worse price than the best displayed quote on another exchange.", true, "That's the Order Protection Rule in Regulation NMS."],
      ["Each exchange can ignore better prices shown on other exchanges.", false, "Rules link the exchanges so better displayed prices are protected."]]),
    mc("1.2-11", 1, [
      { q: "You want to buy right now. Which price from the NBBO matters to you?", a: ["The national best offer", "Buyers pay the offer; the best one is the lowest anywhere."],
        d: [["The national best bid", "That's what sellers get."], ["The average of the two", "Immediate buys happen at the offer."]] },
      { q: "You want to sell right now. Which price from the NBBO matters to you?", a: ["The national best bid", "Sellers get the bid; the best one is the highest anywhere."],
        d: [["The national best offer", "That's what buyers pay."], ["The average of the two", "Immediate sales happen at the bid."]] }]),
    tf("1.2-12", 1, [
      ["The NBBO shows only the best prices, not every order waiting at other prices.", true, "Deeper orders sit at worse prices behind the best quote."],
      ["The NBBO lists every buy and sell order in the market.", false, "It shows only the single best bid and best offer."]]),
    mc("1.2-13", 1, [
      { q: "Which statement about prices on different exchanges is right?", a: ["They're usually very close, and the best one anywhere sets the NBBO", "Competition and linked markets keep exchanges' prices close."],
        d: [["Each exchange has its own price and you get whichever your app uses", "That's the misconception this lesson fixes: you should get the best price anywhere."], ["All exchanges always show exactly the same quote", "They differ slightly; the NBBO picks the best."]] }]),

    // ---------- Level 2: Applied ----------
    gen("1.2-20", 2, function (R) {
      var v = venues(R, R.int(2000, 8000) / 100), right = c2(R, v.bb) + " / " + c2(R, v.ba);
      var lowB = Math.min.apply(null, v.qs.map(function (x) { return x.b; })), highA = Math.max.apply(null, v.qs.map(function (x) { return x.a; }));
      return { q: "Quotes for one stock: " + v.text + ". What is the NBBO?",
        a: [right, "Best bid = highest bid (" + c2(R, v.bb) + "); best offer = lowest offer (" + c2(R, v.ba) + ")."],
        d: R.uniq(right, [[c2(R, lowB) + " / " + c2(R, highA), "That's the worst prices, not the best."], [c2(R, v.qs[1].b) + " / " + c2(R, v.qs[1].a), "That's one exchange's quote."], [c2(R, v.bb) + " / " + c2(R, highA), "The best offer is the lowest, not the highest."], [c2(R, lowB) + " / " + c2(R, v.ba), "The best bid is the highest, not the lowest."]]) };
    }),
    gen("1.2-21", 2, function (R) {
      // Pick the national spread first (1-5 cents, evenly) so the answer isn't usually a cent; best bid and best offer sit on different exchanges.
      var v, sp = R.pick([1, 2, 3, 4, 5]) / 100, bb = R.int(2000, 8000) / 100, ba = Math.round((bb + sp) * 100) / 100, qs, ok;
      function r2(x) { return Math.round(x * 100) / 100; }
      do {
        var o = R.shuffle([0, 1, 2]);
        qs = [{}, {}, {}];
        qs[o[0]] = { b: bb, a: r2(ba + R.int(1, 4) / 100) };
        qs[o[1]] = { b: r2(bb - R.int(1, 4) / 100), a: ba };
        qs[o[2]] = { b: r2(bb - R.int(1, 4) / 100), a: r2(ba + R.int(1, 4) / 100) };
        ok = qs[0].b !== qs[1].b && qs[1].b !== qs[2].b && qs[0].b !== qs[2].b && qs[0].a !== qs[1].a && qs[1].a !== qs[2].a && qs[0].a !== qs[2].a;
      } while (!ok);
      ["Exchange A", "Exchange B", "Exchange C"].forEach(function (n, i) { qs[i].n = n; });
      v = { qs: qs, bb: bb, ba: ba, text: qs.map(function (x) { return x.n + " " + c2(R, x.b) + " / " + c2(R, x.a); }).join("; ") };
      var right = c2(R, sp);
      var widest = Math.max.apply(null, v.qs.map(function (x) { return Math.round((x.a - x.b) * 100) / 100; }));
      return { q: "Quotes for one stock: " + v.text + ". What is the spread of the national best quote?",
        a: [right, "Best offer " + c2(R, v.ba) + " − best bid " + c2(R, v.bb) + " = " + right + "."],
        d: R.uniq(right, [[c2(R, widest), "That's one exchange's spread; the NBBO spread uses the best bid and best offer."], [c2(R, sp + 0.05), "Check the subtraction: best offer minus best bid."], [c2(R, v.ba + v.bb), "That adds them instead of subtracting."]]) };
    }),
    gen("1.2-22", 2, function (R) {
      var bid = R.int(2000, 8000) / 100, sp = R.pick([4, 5, 6, 8, 10]) / 100, ask = Math.round((bid + sp) * 100) / 100, imp = R.pick([1, 2]) / 100, n = R.pick([100, 200, 500]);
      var fill = Math.round((ask - imp) * 100) / 100, right = R.money(imp * n, 2);
      return { q: "The NBBO is " + c2(R, bid) + " / " + c2(R, ask) + ". Your order to buy " + n + " shares fills at " + c2(R, fill) + ". How much price improvement did you get in total?",
        a: [right, "You paid " + c2(R, imp) + " less than the best offer on each of " + n + " shares = " + right + "."],
        d: R.uniq(right, [["None: you paid the market price", "You paid less than the best offer, which is price improvement."], [R.money(imp, 2), "That's per share."], [R.money((fill - bid) * n, 2), "That compares with the bid; improvement for a buyer is measured against the offer."]]) };
    }),
    tf("1.2-23", 2, [
      ["Price improvement means getting a better price than the national best quote, for example buying below the best offer.", true, "Some trades fill inside the NBBO."],
      ["Price improvement means paying a higher price to get a faster fill.", false, "It means a better price than the best quote, not a worse one."]]),
    mc("1.2-24", 2, [
      { q: "The NBBO is 40.00 / 40.02, with 100 shares offered at 40.02. You buy 1,000 shares immediately. What should you expect?", a: ["About 100 shares at 40.02 and the rest at higher prices", "The best price only covers 100 shares."],
        d: [["All 1,000 at 40.02, guaranteed", "Only 100 shares are offered there."], ["All 1,000 at 40.00", "40.00 is the bid, the selling side."]] }]),
    mc("1.2-25", 2, [
      { q: "Besides price, what does a broker weigh when seeking best execution?", a: ["Things like speed and the likelihood the order fills", "Best execution looks at the overall quality of the fill, not only the quoted price."],
        d: [["Only which exchange pays the broker most", "Best execution is about the client's result."], ["Nothing: any fill is fine", "Brokers must use reasonable diligence."]] }]),
    tf("1.2-26", 2, [
      ["Trades away from exchanges must generally also respect the best displayed prices.", true, "The Order Protection Rule applies to trading centers generally, not only exchanges."],
      ["Off-exchange trades can ignore the NBBO completely.", false, "They're generally held to the same protection of better displayed prices."]]),
    gen("1.2-27", 2, function (R) {
      var bb = R.int(3000, 7000) / 100, ba = Math.round((bb + R.pick([2, 3, 4, 5]) / 100) * 100) / 100, sideBuy = Math.random() < 0.5;
      var px = sideBuy ? Math.round((ba + R.pick([-0.01, 0, 0.02, 0.03])) * 100) / 100 : Math.round((bb + R.pick([0.01, 0, -0.02, -0.03])) * 100) / 100;
      var through = sideBuy ? px > ba : px < bb;
      var yes = ["Yes: it's worse than the best displayed price", sideBuy ? "The buyer paid " + c2(R, px) + " while " + c2(R, ba) + " was offered elsewhere." : "The seller got " + c2(R, px) + " while " + c2(R, bb) + " was bid elsewhere."];
      var no = ["No: it's at or better than the best displayed price", sideBuy ? c2(R, px) + " is not above the best offer of " + c2(R, ba) + "." : c2(R, px) + " is not below the best bid of " + c2(R, bb) + "."];
      return { q: "The NBBO is " + c2(R, bb) + " / " + c2(R, ba) + ". A trade happens where someone " + (sideBuy ? "buys" : "sells") + " at " + c2(R, px) + ". Is that a trade-through?",
        a: through ? yes : no, d: [through ? [no[0], yes[1]] : [yes[0], no[1]], ["It depends only on which exchange it happened on", "What matters is the price versus the best displayed quote."]] };
    }),
    mc("1.2-28", 2, [
      { q: "Exchange A bids 12.10 for 300 shares; Exchange B bids 12.10 for 500 shares. What is the national best bid?", a: ["12.10, with 800 shares bid in total", "Both are at the best price, so their sizes add up."],
        d: [["12.10, with only 300 shares", "Exchange B is also bidding 12.10."], ["12.20, the sum of the prices", "Prices don't add; the best bid is still 12.10."]] }]),
    tf("1.2-29", 2, [
      ["If one exchange improves its bid above everyone else's, the national best bid rises.", true, "The NBBO always reflects the best price anywhere."],
      ["The national best bid only changes when the biggest exchange changes its bid.", false, "Any exchange can set the best bid."]]),
    mc("1.2-30", 2, [
      { q: "Why do linked exchanges help ordinary investors?", a: ["A better price on any exchange is protected, so investors aren't stuck with one venue's worse price", "Competition across venues works for investors."],
        d: [["They guarantee investors a profit", "Nothing guarantees profits."], ["They let exchanges set prices together", "Exchanges don't set prices; traders do."]] }]),
    sc("1.2-31", 2, [
      { s: "You want to buy 100 shares of Harbor Health. Exchange A shows 25.10 / 25.14. Exchange B shows 25.11 / 25.13. Exchange C shows 25.09 / 25.15.",
        p: [{ q: "What is the NBBO?", a: ["25.11 / 25.13", "Highest bid (B, 25.11) and lowest offer (B, 25.13)."], d: [["25.10 / 25.14", "That's just Exchange A."], ["25.09 / 25.15", "That's the worst bid and worst offer."]] },
            { q: "About what should you pay for the 100 shares, per share?", a: ["25.13", "The best offer anywhere, as long as it has 100 shares."], d: [["25.14, Exchange A's offer", "A better offer exists on Exchange B."], ["25.11", "That's the best bid, the selling side."]] }] },
      { s: "A client wants to sell 100 shares of Kestrel Air. Exchange A shows 18.40 / 18.45. Exchange B shows 18.42 / 18.46. Exchange C shows 18.41 / 18.44.",
        p: [{ q: "What is the national best bid?", a: ["18.42", "The highest bid, on Exchange B."], d: [["18.40", "That's the lowest bid."], ["18.44", "That's the best offer, the buying side."]] },
            { q: "If the client sells immediately, about what should they get per share?", a: ["18.42", "The best bid anywhere."], d: [["18.40, because their app uses Exchange A", "They should get the best bid anywhere."], ["18.44", "That's what buyers pay, not what sellers get."]] }] }]),

    // ---------- Level 3: Desk-level ----------
    tf("1.2-40", 3, [
      ["A data feed called the SIP combines all exchanges' best quotes into the official NBBO.", true, "SIP stands for securities information processor."],
      ["Each broker invents its own version of the official NBBO.", false, "The official NBBO comes from the consolidated feed (the SIP), though firms may also use faster direct feeds."]]),
    tf("1.2-41", 3, [
      ["Exchanges generally may not display a quote that locks or crosses another exchange's displayed quote.", true, "Locked means bid equals offer; crossed means bid above offer. Regulation NMS limits displaying them."],
      ["It's normal for the best bid to sit above the best offer for hours.", false, "A crossed market is meant to clear quickly; rules limit displaying locking or crossing quotes."]]),
    gen("1.2-42", 3, function (R) {
      var a1 = R.int(3000, 6000) / 100, s1 = R.pick([100, 200, 300]), a2 = Math.round((a1 + R.pick([0.01, 0.02, 0.03])) * 100) / 100, s2 = R.pick([200, 300, 500]), n = s1 + R.pick([100, 200]);
      var avg = Math.round((s1 * a1 + (n - s1) * a2) / n * 1000) / 1000, right = R.money(avg, 3);
      return { q: "The best offer is " + c2(R, a1) + " for " + s1 + " shares on Exchange A; the next best is " + c2(R, a2) + " for " + s2 + " shares on Exchange B. You buy " + n + " shares immediately. What's your average price?",
        a: [right, s1 + " at " + c2(R, a1) + " plus " + (n - s1) + " at " + c2(R, a2) + ", averaged = " + right + "."],
        d: R.uniq(right, [[R.money(a1, 3), "Only " + s1 + " shares were offered at that price."], [R.money(a2, 3), "The first " + s1 + " shares were cheaper."], [R.money(Math.round((a1 + a2) / 2 * 1000) / 1000, 3), "A simple average ignores how many shares filled at each price."]]) };
    }),
    tf("1.2-43", 3, [
      ["An intermarket sweep order lets a trader take the best prices on several exchanges at once.", true, "It's a recognised exception to the trade-through rule because the better quotes are being taken at the same time."],
      ["An intermarket sweep order lets a trader ignore better prices on other exchanges.", false, "It sweeps the better prices at the same time, which is why it's allowed."]]),
    mc("1.2-44", 3, [
      { q: "Some firms read exchanges' direct data feeds instead of waiting for the consolidated NBBO. Why?", a: ["Direct feeds can arrive slightly faster, so they see quote changes sooner", "In fast markets, microseconds matter to some traders."],
        d: [["Direct feeds show different, secret prices", "They show the same exchange quotes, just sooner."], ["The consolidated NBBO is illegal to use", "It's the official benchmark."]] }]),
    mc("1.2-45", 3, [
      { q: "A broker routes retail orders to a market maker that fills them slightly better than the NBBO on average. What should the broker still check?", a: ["That the fills really are good compared with other venues, as part of best execution", "Best execution means reviewing execution quality regularly."],
        d: [["Nothing: any fill inside the NBBO ends the duty", "Brokers must keep reviewing execution quality."], ["Only how much it costs the broker", "The client's result comes first."]] }]),
    tf("1.2-46", 3, [
      ["The NBBO can be stale for a split second in very fast markets.", true, "Quotes change faster than any feed can publish, so a split-second view can already be old."],
      ["The NBBO you see is always exactly up to the microsecond.", false, "Data takes time to travel; in fast markets the view can lag slightly."]]),
    sc("1.2-47", 3, [
      { s: "A client sends an order to buy 2,000 shares of Juniper Software immediately. The NBBO is 50.00 / 50.03, with 300 shares offered at 50.03 on one exchange. Other exchanges offer 700 shares at 50.04 and 1,500 at 50.06.",
        p: [{ q: "How many shares can be bought at the best offer?", a: ["300", "Only 300 shares are offered at 50.03."], d: [["2,000", "The best offer is only for 300 shares."], ["700", "700 are offered at 50.04, the next price."]] },
            { q: "About what will the rest of the order pay?", a: ["50.04 for 700 shares, then 50.06 for the last 1,000", "It works through the offers from best to worse."], d: [["50.03 for all of it", "There are only 300 shares at 50.03."], ["50.00, the bid", "Buyers pay offers, not bids."]] },
            { q: "Is buying at 50.04 and 50.06 a trade-through?", a: ["No: the better offer at 50.03 is taken first", "Trading at worse prices is fine once the better prices are used up."], d: [["Yes: anything above 50.03 is a trade-through", "Only trading past a better price still available is a trade-through."], ["Yes, because more than one exchange was used", "Using several exchanges is normal."]] }] }]),
    mc("1.2-48", 3, [
      { q: "Which order is most likely to trade inside the NBBO, at a price between the best bid and offer?", a: ["A retail order filled by a market maker offering price improvement", "Market makers often fill small orders slightly inside the quote."],
        d: [["A market order for a huge block of shares", "Big orders usually trade at the quote or worse."], ["An order sent when the market is closed", "Nothing trades in regular sessions while the market is closed."]] }]),
    tf("1.2-49", 3, [
      ["A firm acting as principal for a client may fill the order at the NBBO or better, but generally not worse.", true, "The client should get at least the best displayed price."],
      ["A dealer may fill clients well outside the NBBO as long as it discloses it.", false, "Fills worse than the best displayed price generally breach trade-through and best-execution rules."]]),
    mc("1.2-14", 1, [
      { q: "Two exchanges bid 9.99 and 10.01 for a stock. If you sell immediately, about what should you get?", a: ["10.01", "You should get the best bid anywhere: the highest."],
        d: [["9.99", "There's a higher bid on the other exchange."], ["10.00, the average", "You trade at a real bid, not an average."]] }]),
    tf("1.2-15", 1, [
      ["The best bid and the best offer can come from different exchanges.", true, "The NBBO picks each side's best price wherever it is."],
      ["The best bid and the best offer must come from the same exchange.", false, "Each side's best price can be on a different exchange."]]),
    mc("1.2-16", 1, [
      { q: "You just bought shares. What's a fair way to check the price you got?", a: ["Compare it with the national best offer at the time", "Buyers should get the best offer anywhere, or better."],
        d: [["Compare it with yesterday's closing price", "Prices move; compare with the quote when you traded."], ["Compare it with the company's IPO price", "The IPO price is long past."]] }]),
    gen("1.2-32", 2, function (R) {
      var bid = R.int(2000, 6000) / 100, ask = Math.round((bid + R.pick([4, 5, 6]) / 100) * 100) / 100, newAsk = Math.round((ask - R.pick([1, 2, 3]) / 100) * 100) / 100;
      var right = c2(R, bid) + " / " + c2(R, newAsk);
      return { q: "The NBBO is " + c2(R, bid) + " / " + c2(R, ask) + ". Then a seller on another exchange offers shares at " + c2(R, newAsk) + ". What is the new NBBO?",
        a: [right, "A lower offer anywhere becomes the new best offer."],
        d: R.uniq(right, [[c2(R, bid) + " / " + c2(R, ask), "The new, lower offer beats the old best offer."], [c2(R, newAsk) + " / " + c2(R, ask), "The new price is an offer, so it changes the offer side."], [c2(R, bid + 0.01) + " / " + c2(R, newAsk), "Nothing changed on the bid side."]]) };
    }),
    tf("1.2-33", 2, [
      ["If the shares at the best offer are all bought, the national best offer moves to the next lowest offer.", true, "The NBBO always shows the best price that's still available."],
      ["When the best offer is used up, the NBBO stops until the next morning.", false, "It simply moves to the next best price."]]),
    mc("1.2-34", 2, [
      { q: "Your confirmation shows you bought at 30.12 when the NBBO was 30.10 / 30.11. What does that suggest?", a: ["You paid above the best offer, which is worth asking your broker about", "Buyers should generally get the best offer or better."],
        d: [["You got price improvement", "Improvement means paying less than the best offer, not more."], ["Nothing unusual: 30.12 is below the bid", "30.12 is above both the bid and the offer."]] }]),
    mc("1.2-50", 3, [
      { q: "The best offer shows only 100 shares, with thousands more offered at worse prices. What does that tell a trader?", a: ["The best price is thin, so a large buy order will climb through worse offers", "Depth at the best price matters as much as the price."],
        d: [["The stock is very liquid at the best price", "Only 100 shares there is thin."], ["Nothing about the cost of a large order", "It tells you a large order will pay more than the best offer."]] }]),
    tf("1.2-51", 3, [
      ["The NBBO at the time of a trade is a common benchmark for judging whether the trade got a good price.", true, "Execution-quality reviews compare fills with the best quote at that moment."],
      ["Execution quality is judged only against a stock's closing price.", false, "It's usually judged against the best quote when the order arrived."]])
  ]);
})(window.P0Bank);
