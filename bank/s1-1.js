/* Question bank, skill 1.1: Bid, ask and the spread (D44). Levels: 1 Foundation, 2 Applied, 3 Desk-level. */
(function (B) {
  var mc = B.mc, tf = B.tf, gen = B.gen, sc = B.sc;
  function quote(R) { var bid = R.int(1000, 9900) / 100, sp = R.pick([1, 1, 2, 3, 4, 5, 8, 10, 15, 25]) / 100; return { bid: bid, ask: Math.round((bid + sp) * 100) / 100, sp: sp }; }
  function c2(R, x) { return R.money(x, 2); }
  function cents(x) { var c = Math.round(x * 100); return c === 1 ? "1 cent" : c + " cents"; }
  B.add("1.1", [
    // ---------- Level 1: Foundation ----------
    tf("1.1-01", 1, [
      ["The bid is the highest price a buyer is willing to pay right now.", true, "It's the best price on offer to someone who wants to sell."],
      ["The bid is the lowest price a seller will accept.", false, "That's the ask (or offer). The bid is the buyers' side."],
      ["The ask is the lowest price a seller will accept right now.", true, "It's the best price on offer to someone who wants to buy."]]),
    tf("1.1-02", 1, [
      ["If you sell immediately, you get the bid.", true, "You're selling to the best buyer, at their price."],
      ["If you buy immediately, you get the bid.", false, "Buying now means paying the ask, the best seller's price."],
      ["If you buy immediately, you pay the ask.", true, "You're buying from the best seller, at their price."]]),
    mc("1.1-03", 1, [
      { q: "What is the spread?", a: ["The ask minus the bid", "The gap between the best price to sell to and the best price to buy from."],
        d: [["The bid plus the ask", "Add them and you get nothing useful; the spread is the gap."], ["The day's highest price minus its lowest", "That's the day's range, not the spread."]] }]),
    mc("1.1-04", 1, [
      { q: "What is another name for the ask?", a: ["The offer", "Ask and offer mean the same thing: the seller's price."],
        d: [["The bid", "The bid is the buyer's price."], ["The spread", "The spread is the gap between bid and ask."]] }]),
    gen("1.1-05", 1, function (R) {
      var q = quote(R);
      return { q: "A stock is quoted " + c2(R, q.bid) + " bid, " + c2(R, q.ask) + " ask. What is the spread?",
        a: [c2(R, q.sp), c2(R, q.ask) + " − " + c2(R, q.bid) + " = " + c2(R, q.sp) + "."],
        d: R.uniq(c2(R, q.sp), [[c2(R, q.bid + q.ask), "That adds them; the spread is ask minus bid."], [c2(R, q.sp * 10), "Ten times too big; check the decimals."], [c2(R, (q.bid + q.ask) / 2), "That's the midpoint, not the spread."]]) };
    }),
    mc("1.1-06", 1, [
      { q: "Popular, heavily traded stocks usually have…", a: ["Tight spreads, often just a penny", "Lots of buyers and sellers compete, so the gap is small."],
        d: [["Very wide spreads", "Wide spreads are typical of rarely traded stocks."], ["No spread at all, ever", "There's almost always some gap between bid and ask."]] },
      { q: "Rarely traded stocks usually have…", a: ["Wide spreads", "Few buyers and sellers means a bigger gap between them."],
        d: [["Spreads of exactly one penny", "That's typical of very popular stocks."], ["No bid or ask at all", "They have quotes; the gap is just wider."]] }]),
    tf("1.1-07", 1, [
      ["Concert tickets have a bid and an ask too: the highest \"want to buy\" offer and the lowest \"for sale\" listing.", true, "Any market with buyers and sellers has both sides."],
      ["A stock has only one price at any moment, so there's no bid or ask.", false, "There's always a best buyer's price (bid) and a best seller's price (ask)."]]),
    mc("1.1-08", 1, [
      { q: "A quote reads \"20.10 / 20.14\". Which number is the bid?", a: ["20.10", "The bid is the lower number, the buyers' side."],
        d: [["20.14", "That's the ask, the sellers' side."], ["0.04", "That's the spread."]] },
      { q: "A quote reads \"20.10 / 20.14\". Which number is the ask?", a: ["20.14", "The ask is the higher number, the sellers' side."],
        d: [["20.10", "That's the bid, the buyers' side."], ["0.04", "That's the spread."]] }]),
    tf("1.1-09", 1, [
      ["The best bid is normally below the best ask.", true, "Otherwise buyers and sellers would already have agreed and traded."],
      ["The best bid is normally above the best ask.", false, "If a buyer offered more than a seller asked, they'd simply trade."]]),
    mc("1.1-10", 1, [
      { q: "What is the National Best Bid and Offer (NBBO)?", a: ["The best bid and best ask across all U.S. exchanges together", "It's the best prices available anywhere in the national market."],
        d: [["The price set by the government each morning", "No one sets prices; the NBBO is just the best current quotes."], ["The best quote on the New York Stock Exchange only", "It combines all U.S. exchanges, not just one."]] }]),
    mc("1.1-11", 1, [
      { q: "You want to sell your shares right now. Which price will you get?", a: ["The bid", "Selling now means selling to the best buyer at their price."],
        d: [["The ask", "That's what buyers pay right now."], ["The midpoint between them", "An immediate sale happens at the bid."]] },
      { q: "You want to buy shares right now. Which price will you pay?", a: ["The ask", "Buying now means buying from the best seller at their price."],
        d: [["The bid", "That's what sellers get right now."], ["The midpoint between them", "An immediate purchase happens at the ask."]] }]),
    tf("1.1-12", 1, [
      ["A wide spread makes it more expensive to buy and quickly sell again.", true, "You'd buy at the ask and sell at the bid, losing the spread."],
      ["The size of the spread doesn't matter to someone who trades.", false, "The spread is a cost every time you trade immediately."]]),
    mc("1.1-13", 1, [
      { q: "Who is on the bid side of the market?", a: ["People who want to buy", "Bids are buyers' prices."],
        d: [["People who want to sell", "Sellers are on the ask side."], ["The stock exchange", "Exchanges host the quotes; they don't bid."]] }]),
    mc("1.1-14", 1, [
      { q: "Why is there usually a gap between the bid and the ask?", a: ["Buyers want to pay less and sellers want to get more", "Until one side gives in, the gap stays."],
        d: [["The exchange adds a fee between them", "The gap is between real buyers' and sellers' prices."], ["The company sets two prices", "Companies don't set prices."]] }]),

    // ---------- Level 2: Applied ----------
    gen("1.1-20", 2, function (R) {
      var q = quote(R), sell = Math.random() < 0.5, n = R.pick([10, 50, 100, 200]), px = sell ? q.bid : q.ask;
      return { q: "A stock is quoted " + c2(R, q.bid) + " / " + c2(R, q.ask) + ". You " + (sell ? "sell" : "buy") + " " + n + " shares immediately. About how much do you " + (sell ? "receive" : "pay") + ", before any fees?",
        a: [R.money(px * n, 2), (sell ? "Selling now gets the bid: " : "Buying now pays the ask: ") + n + " × " + c2(R, px) + " = " + R.money(px * n, 2) + "."],
        d: R.uniq(R.money(px * n, 2), [[R.money((sell ? q.ask : q.bid) * n, 2), sell ? "That's the ask; sellers get the bid." : "That's the bid; buyers pay the ask."], [R.money((q.bid + q.ask) / 2 * n, 2), "Immediate trades don't happen at the midpoint."], [R.money(q.sp * n, 2), "That's the spread × shares, not the trade's value."]]) };
    }),
    gen("1.1-21", 2, function (R) {
      var q = quote(R); if (Math.round(q.sp * 100) % 2) { q.ask = Math.round((q.ask + 0.01) * 100) / 100; q.sp = Math.round((q.sp + 0.01) * 100) / 100; }
      var mid = Math.round((q.bid + q.ask) / 2 * 100) / 100;
      return { q: "A stock is quoted " + c2(R, q.bid) + " bid, " + c2(R, q.ask) + " ask. What is the midpoint (the \"mid\")?",
        a: [c2(R, mid), "Halfway between: (" + c2(R, q.bid) + " + " + c2(R, q.ask) + ") ÷ 2 = " + c2(R, mid) + "."],
        d: R.uniq(c2(R, mid), [[c2(R, q.sp), "That's the spread."], [c2(R, q.bid + q.ask), "That adds them without halving."], [c2(R, q.ask + q.sp), "That's above the ask; the mid is between bid and ask."]]) };
    }),
    gen("1.1-22", 2, function (R) {
      var q = quote(R), n = R.pick([100, 200, 500, 1000]), loss = q.sp * n;
      return { q: "Quote: " + c2(R, q.bid) + " / " + c2(R, q.ask) + ". You buy " + n + " shares immediately and, a moment later, sell them immediately with the quote unchanged. What did the round trip cost, before fees?",
        a: [R.money(loss, 2), "Bought at the ask, sold at the bid: " + n + " × " + c2(R, q.sp) + " spread = " + R.money(loss, 2) + "."],
        d: R.uniq(R.money(loss, 2), [["Nothing, because the quote didn't change", "Buying at the ask and selling at the bid loses the spread."], [R.money(loss / 2, 2), "You crossed the full spread, not half of it."], [R.money(q.ask * n, 2), "That's what you paid, not what the round trip cost."]]) };
    }),
    gen("1.1-23", 2, function (R) {
      var base = R.int(4000, 6000) / 100, venues = ["Exchange A", "Exchange B", "Exchange C"], qs;
      do {
        qs = venues.map(function () { var b = Math.round((base + R.int(-4, 4) / 100) * 100) / 100; return { b: b, a: Math.round((b + R.int(2, 6) / 100) * 100) / 100 }; });
        var bb = Math.max.apply(null, qs.map(function (x) { return x.b; })), ba = Math.min.apply(null, qs.map(function (x) { return x.a; }));
        var bids = qs.map(function (x) { return x.b; }), asks = qs.map(function (x) { return x.a; });
      } while (bb >= ba || bids[0] === bids[1] || bids[1] === bids[2] || bids[0] === bids[2] || asks[0] === asks[1] || asks[1] === asks[2] || asks[0] === asks[2]);
      var lowB = Math.min.apply(null, qs.map(function (x) { return x.b; })), highA = Math.max.apply(null, qs.map(function (x) { return x.a; }));
      var text = venues.map(function (v, i) { return v + " " + c2(R, qs[i].b) + " / " + c2(R, qs[i].a); }).join("; ");
      return { q: "Quotes for the same stock: " + text + ". What is the National Best Bid and Offer?",
        a: [c2(R, bb) + " / " + c2(R, ba), "Best bid = the highest bid (" + c2(R, bb) + "); best offer = the lowest ask (" + c2(R, ba) + ")."],
        d: R.uniq(c2(R, bb) + " / " + c2(R, ba), [[c2(R, lowB) + " / " + c2(R, highA), "That's the worst prices, not the best."], [c2(R, qs[0].b) + " / " + c2(R, qs[0].a), "That's one exchange's quote, not the best across all of them."], [c2(R, bb) + " / " + c2(R, highA), "The best offer is the lowest ask, not the highest."]]) };
    }),
    tf("1.1-24", 2, [
      ["If you buy at the ask and immediately sell at the bid, you lose the spread.", true, "That's the cost of crossing the spread twice."],
      ["Buying at the ask and selling straight back at the bid breaks even.", false, "You lose the gap between them, the spread."]]),
    mc("1.1-25", 2, [
      { q: "Stock X is quoted 50.00 / 50.01. Stock Y is quoted 50.00 / 50.40. Which is probably more heavily traded?", a: ["Stock X", "A one-cent spread suggests many competing buyers and sellers."],
        d: [["Stock Y", "Y's 40-cent spread suggests few traders."], ["You can't tell anything from spreads", "Spreads are a strong clue to how actively a stock trades."]] }]),
    mc("1.1-26", 2, [
      { q: "A new buyer bids 30.12 when the quote was 30.10 / 30.15. What is the new best bid and spread?", a: ["30.12, with a 3-cent spread", "A higher bid becomes the best bid: 30.15 − 30.12 = 0.03."],
        d: [["30.10, with a 5-cent spread", "30.12 beats 30.10, so it's the new best bid."], ["30.12, with a 5-cent spread", "The spread shrinks to 30.15 − 30.12 = 0.03."]] },
      { q: "A new seller offers 30.13 when the quote was 30.10 / 30.15. What is the new best ask and spread?", a: ["30.13, with a 3-cent spread", "A lower ask becomes the best ask: 30.13 − 30.10 = 0.03."],
        d: [["30.15, with a 5-cent spread", "30.13 is lower, so it's the new best ask."], ["30.13, with a 5-cent spread", "The spread shrinks to 30.13 − 30.10 = 0.03."]] }]),
    tf("1.1-27", 2, [
      ["Competition between buyers and sellers tends to narrow the spread.", true, "Each new better bid or ask shrinks the gap."],
      ["More traders in a stock always widens its spread.", false, "More competition usually tightens spreads."]]),
    mc("1.1-28", 2, [
      { q: "The quote is 12.40 / 12.46 and you're in no hurry to buy. What could you try instead of paying 12.46 right away?", a: ["Offer to buy at a lower price and wait for a seller to accept", "You might save part of the spread, but your order may not fill."],
        d: [["Nothing: you must pay 12.46", "You can post your own bid and wait."], ["Ask the exchange to lower the ask", "Exchanges don't change other traders' prices."]] }]),
    sc("1.1-29", 2, [
      { s: "Cobalt Energy is quoted 18.20 / 18.26. Your friend wants to buy 100 shares right now, then sell them as soon as they rise a little.",
        p: [{ q: "What price does your friend pay to buy right now?", a: ["18.26", "Buying now pays the ask."], d: [["18.20", "That's the bid, what sellers get."], ["18.23", "That's the mid; immediate buys pay the ask."]] },
            { q: "If the quote stays 18.20 / 18.26, what would selling right back give?", a: ["18.20, a 6-cent loss per share", "Selling now gets the bid."], d: [["18.26, breaking even", "Selling now gets the bid, not the ask."], ["18.23", "Immediate sales happen at the bid."]] },
            { q: "How far must the bid rise before your friend breaks even (fees aside)?", a: ["To 18.26, up 6 cents", "The friend paid 18.26, so the bid must reach that."], d: [["To 18.23, up 3 cents", "That only covers half the spread."], ["It already breaks even", "Today the bid is 6 cents below the purchase price."]] }] }]),

    // ---------- Level 3: Desk-level ----------
    gen("1.1-40", 3, function (R) {
      var q = quote(R), mid = (q.bid + q.ask) / 2, pc = 100 * q.sp / mid;
      var rpc = Math.round(pc * 100) / 100, bps = Math.round(pc * 100);
      return { q: "A stock is quoted " + c2(R, q.bid) + " / " + c2(R, q.ask) + ". About how wide is the spread as a share of the price?",
        a: [rpc + "% (about " + bps + " basis points)", "Spread ÷ mid = " + c2(R, q.sp) + " ÷ " + c2(R, mid) + " ≈ " + rpc + "%. One basis point is 0.01%."],
        d: R.uniq(rpc + "% (about " + bps + " basis points)", [[Math.round(pc * 1000) / 100 + "% (about " + bps * 10 + " basis points)", "Ten times too wide; check the division."], [Math.round(q.sp * 10000) / 100 + "%", "That's the spread in dollars written as a percent; divide by the price."], [Math.round(pc * 10) / 100 + "% (about " + Math.round(bps / 10) + " basis points)", "Ten times too narrow."]]) };
    }),
    mc("1.1-41", 3, [
      { q: "A quote shows \"bid 25.00 × 300, ask 25.03 × 1,200\". What do 300 and 1,200 mean?", a: ["How many shares are wanted at the bid and offered at the ask", "Quotes come with sizes: 300 shares bid, 1,200 offered."],
        d: [["The number of buyers and sellers", "Sizes are shares, not people."], ["The prices in cents", "Prices are 25.00 and 25.03; the other numbers are sizes."]] }]),
    tf("1.1-42", 3, [
      ["A quote's displayed size tells you roughly how many shares you can trade at that price right now.", true, "Bigger orders may have to go to worse prices beyond the best quote."],
      ["You can always buy any number of shares at the best ask.", false, "Only the displayed size is offered there; more shares may cost more."]]),
    gen("1.1-43", 3, function (R) {
      var a1 = R.int(3000, 5000) / 100, s1 = R.pick([200, 300, 500]), a2 = Math.round((a1 + R.pick([0.02, 0.03, 0.05])) * 100) / 100, n = s1 + R.pick([100, 200, 300]);
      var cost = s1 * a1 + (n - s1) * a2, avg = cost / n;
      return { q: "Sellers offer " + s1 + " shares at " + c2(R, a1) + " and more shares at " + c2(R, a2) + ". You buy " + n + " shares immediately. What's your average price, roughly?",
        a: [R.money(Math.round(avg * 1000) / 1000, 3), s1 + " at " + c2(R, a1) + " plus " + (n - s1) + " at " + c2(R, a2) + ", averaged over " + n + " shares ≈ " + R.money(Math.round(avg * 1000) / 1000, 3) + "."],
        d: R.uniq(R.money(Math.round(avg * 1000) / 1000, 3), [[R.money(a1, 3), "Only " + s1 + " shares were offered at that price."], [R.money(a2, 3), "The first " + s1 + " shares were cheaper."], [R.money(Math.round((a1 + a2) / 2 * 1000) / 1000, 3), "A simple average ignores how many shares filled at each price."]]) };
    }),
    tf("1.1-44", 3, [
      ["Spreads often widen when markets are stressed or uncertain.", true, "Traders demand more compensation for risk, so the gap grows."],
      ["Spreads are fixed by rule and never change.", false, "Spreads change all the time with competition and risk."]]),
    mc("1.1-45", 3, [
      { q: "Why do market makers quote wider spreads in a volatile stock?", a: ["The risk of the price moving against them before they can trade out is higher", "Wider spreads pay for the extra risk (lesson 1.4)."],
        d: [["Regulators require wider spreads in volatile stocks", "There's no such rule; it's a risk decision."], ["Volatile stocks have fewer exchanges", "The number of exchanges isn't the reason."]] }]),
    sc("1.1-46", 3, [
      { s: "A client wants to sell 5,000 shares of a thinly traded stock quoted 9.80 × 500 / 9.95 × 400 (bid × size / ask × size).",
        p: [{ q: "How many shares can the client sell at 9.80 right now?", a: ["About 500", "Only 500 shares are bid at 9.80."], d: [["All 5,000", "The bid is only for 500 shares."], ["About 400", "400 is the ask size, the sellers' side."]] },
            { q: "If the client insists on selling all 5,000 immediately, what probably happens?", a: ["The rest sells at lower and lower bids", "Selling more than the bid size pushes into worse prices."], d: [["All 5,000 sell at 9.80", "There aren't enough buyers at 9.80."], ["The price rises", "Heavy selling pushes prices down."]] }] }])
  ]);
})(window.P0Bank);
