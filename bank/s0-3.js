/* Question bank, skill 0.3: Why companies sell shares (D44). Levels: 1 Foundation, 2 Applied, 3 Desk-level. */
(function (B) {
  var mc = B.mc, tf = B.tf, gen = B.gen, sc = B.sc;
  function p2(x) { return B.R.pct(x, 2); }
  B.add("0.3", [
    // ---------- Level 1: Foundation ----------
    tf("0.3-01", 1, [
      ["Companies sell new shares mainly to raise money to grow.", true, "Selling slices of ownership brings in cash to build, hire and develop products."],
      ["Companies sell shares so they can pay their shareholders a salary.", false, "Shareholders aren't paid salaries. Companies sell shares to raise money for the business."]]),
    tf("0.3-02", 1, [
      ["An IPO is the first time a company sells shares to the public.", true, "IPO stands for initial public offering."],
      ["An IPO is when a company buys all its shares back from the public.", false, "That's the opposite. An IPO is the first sale of shares to the public."]]),
    mc("0.3-03", 1, [
      { q: "What does IPO stand for?", a: ["Initial public offering", "The first time a company offers shares to the public."],
        d: [["International price order", "Not a market term."], ["Investor profit option", "Not a market term."]] }]),
    mc("0.3-04", 1, [
      { q: "In an IPO, where does the money paid for the new shares go?", a: ["To the company", "That's the primary market: the company sells new shares and gets the cash."],
        d: [["To people already trading the stock on apps", "Before the IPO there is no public trading yet."], ["To the stock exchange", "The exchange hosts trading; it doesn't receive the money for new shares."]] }]),
    tf("0.3-05", 1, [
      ["When you buy a share on an app, your money goes to whoever sold it, not to the company.", true, "That's the secondary market: investors trading with each other."],
      ["Every time someone buys a share, the company receives the money.", false, "Only when the company sells new shares. Everyday trades pay the seller."]]),
    mc("0.3-06", 1, [
      { q: "Which of these is the primary market?", a: ["A company selling new shares and receiving the money", "Primary market: new shares, money to the company."],
        d: [["Investors trading existing shares with each other", "That's the secondary market."], ["A stock's price rising for the first time", "Price moves aren't a market type."]] },
      { q: "Which of these is the secondary market?", a: ["Investors trading existing shares with each other", "Secondary market: the money goes to the selling investor."],
        d: [["A company selling new shares in its IPO", "That's the primary market."], ["A company paying its first dividend", "That's a payment to shareholders, not a market."]] }]),
    mc("0.3-07", 1, [
      { q: "A band sells its first run of T-shirts; later, fans resell those shirts to each other. Which part is like the secondary market?", a: ["Fans reselling the shirts to each other", "The band gets nothing from resales, just like a company from secondary trades."],
        d: [["The band selling its first run", "That's like the primary market, where the band gets the money."], ["The band designing the shirts", "That's not a market at all."]] },
      { q: "A band sells its first run of T-shirts; later, fans resell those shirts to each other. Which part is like the primary market?", a: ["The band selling its first run", "The band gets the money, like a company selling new shares."],
        d: [["Fans reselling the shirts to each other", "That's like the secondary market; the band gets nothing."], ["A fan wearing a shirt to a concert", "That's not a market at all."]] }]),
    tf("0.3-08", 1, [
      ["When a company sells new shares, existing owners' slices get smaller.", true, "That's dilution: the same owners hold a smaller share of more slices."],
      ["When a company sells new shares, existing owners end up owning a bigger percentage.", false, "More shares in total means each existing owner's percentage shrinks."]]),
    mc("0.3-09", 1, [
      { q: "What is it called when new shares make existing owners' slices smaller?", a: ["Dilution", "Existing owners' stakes are diluted by the new shares."],
        d: [["Inflation", "Inflation is rising prices across the economy."], ["Diversification", "Diversification is spreading money across many investments (a later lesson)."]] }]),
    mc("0.3-10", 1, [
      { q: "Instead of selling shares, how else can a company raise money?", a: ["Borrow it, for example with a loan or bonds", "Companies either sell ownership or borrow."],
        d: [["Ask the stock exchange for a grant", "Exchanges don't fund companies."], ["Raise its own share price", "Companies can't set their share price, and a higher price brings in no cash by itself."]] }]),
    tf("0.3-11", 1, [
      ["Money raised by selling shares doesn't have to be repaid like a loan.", true, "Buyers become part-owners. There's no promise to repay them."],
      ["Selling shares means the company must repay that money later with interest.", false, "That describes borrowing, not selling ownership."]]),
    mc("0.3-12", 1, [
      { q: "Why might a fast-growing company want cash from selling shares?", a: ["To build, hire and develop products", "Growth costs money before it earns money."],
        d: [["To lower its share price", "Selling shares isn't a way to set the price."], ["To stop investors trading its stock", "Selling shares to the public does the opposite: it lets the public trade."]] }]),
    tf("0.3-13", 1, [
      ["After its IPO, a company's shares can be traded between investors every day.", true, "From then on, investors trade them on the secondary market."],
      ["After the IPO, only the company is allowed to sell its shares.", false, "Anyone who owns shares can sell them to another investor."]]),
    mc("0.3-14", 1, [
      { q: "Five years after a company's IPO, you buy 10 of its shares on an app. Who gets your money?", a: ["The investor who sold you the shares", "It's a secondary-market trade between investors."],
        d: [["The company", "The company got its money at the IPO, not from later trades."], ["The bank that ran the IPO", "The bank was paid for the IPO; it doesn't get your trade money."]] }]),
    mc("0.3-15", 1, [
      { q: "Who usually helps a company sell its shares in an IPO?", a: ["Investment banks", "Banks organize the IPO and find investors to buy the new shares."],
        d: [["The SEC", "The SEC regulates the process but doesn't sell the shares."], ["The company's customers", "Customers buy products, not IPO shares (though some may invest)."]] }]),

    // ---------- Level 2: Applied ----------
    gen("0.3-20", 2, function (R) {
      var N = R.pick([10000, 20000, 40000, 50000]), k = R.pick([100, 200, 400, 500, 1000]), M = N * R.pick([0.25, 0.5, 1.5]);
      var before = 100 * k / N, after = 100 * k / (N + M);
      return { q: "A small company has " + R.count(N) + " shares and you own " + R.count(k) + " of them. It sells " + R.count(M) + " new shares to new investors. What percentage do you own now?",
        a: [p2(after), "You own " + R.count(k) + " of " + R.count(N + M) + " shares = " + p2(after) + ", down from " + p2(before) + "."],
        d: [[p2(before), "That's your stake before the new shares. More shares in total means a smaller slice."], [p2(100 * k / (N * 0.8)), "That's bigger than before. New shares can only shrink your percentage."], [p2(100 * k / M), "That compares you with the new shares only, not all shares."]] };
    }),
    gen("0.3-21", 2, function (R) {
      var S = R.pick([5, 10, 20, 25, 40, 50]), P = R.int(10, 40), raised = S * P * 1e6;
      return { q: "In its IPO, a company sells " + S + " million new shares at " + R.money(P, 0) + " each. How much does it raise, before fees?",
        a: [R.big(raised), S + " million × " + R.money(P, 0) + " = " + R.big(raised) + "."],
        d: [[R.big(P * 1e6), "That forgets to multiply by the number of shares."], [R.big(raised * 10), "Ten times too much. Check the zeros."], ["Nothing: buyers pay earlier investors", "New shares in an IPO pay the company."]] };
    }),
    tf("0.3-22", 2, [
      ["Dilution always makes existing shareholders poorer.", false, "Their slice shrinks, but the company now has the new cash. Whether they're worse off depends on what it does with it."],
      ["After a share sale, existing owners own a smaller percentage of a company that now has more cash.", true, "Both are true at once, which is why dilution isn't automatically bad."]]),
    mc("0.3-23", 2, [
      { q: "Why might existing owners accept being diluted?", a: ["The new cash could grow the company enough to make their smaller slice worth more", "A smaller slice of a bigger pie can be worth more."],
        d: [["Dilution increases their percentage", "Dilution shrinks their percentage."], ["Dilution has no effect on them", "It does: their slice gets smaller."]] }]),
    tf("0.3-24", 2, [
      ["Raising money by selling shares means no interest payments.", true, "Owners aren't promised interest; lenders are."],
      ["Selling shares is always cheaper for a company than borrowing.", false, "Giving up ownership has a cost too: new owners share future profits. Neither is always cheaper."]]),
    mc("0.3-25", 2, [
      { q: "A company's stock doubles in the year after its IPO. Does the company receive more money from that rise?", a: ["No: the rise happens in trading between investors", "The company got its money at the IPO price."],
        d: [["Yes: it receives the difference", "Gains on later trades go to the investors who sell."], ["Yes: the exchange pays it the gain", "Exchanges don't pay companies for price rises."]] },
      { q: "A company's stock halves in the year after its IPO. Does the company have to pay investors back?", a: ["No: it raised the money by selling ownership, not by borrowing", "Owners take the risk of price falls; there's no promise to repay."],
        d: [["Yes: it must refund the difference", "Shares come with no refund promise."], ["Yes: the exchange makes it pay", "Exchanges don't force refunds for price falls."]] }]),
    tf("0.3-26", 2, [
      ["A company can sell more new shares years after its IPO.", true, "That's often called a follow-on offering."],
      ["A company can only ever sell new shares once, at its IPO.", false, "It can sell more later; that dilutes existing owners again."]]),
    gen("0.3-27", 2, function (R) {
      var F, M;
      do { F = R.pick([60, 80, 90, 120, 150]); M = R.pick([20, 30, 40, 60]); } while (F === M); // equal stakes would make two choices identical
      var pctNew = 100 * M / (F + M);
      return { q: "Before its IPO, a company has " + F + " million shares, all owned by its founders and early investors. In the IPO it sells " + M + " million new shares. What percentage do the new investors own?",
        a: [p2(pctNew), M + " million ÷ (" + F + " + " + M + ") million = " + p2(pctNew) + "."],
        d: [[p2(100 * M / F), "That divides by the old share count only; the total is now " + (F + M) + " million."], [p2(100 * F / (F + M)), "That's what the founders and early investors still own."], [p2(100 * M / (F + M) / 2), "That halves the right answer; new shares ÷ total shares is the whole calculation."]] };
    }),
    mc("0.3-28", 2, [
      { q: "Which event gives a company new money?", a: ["Selling newly created shares to investors", "New shares sold by the company bring cash in."],
        d: [["Its shares rising on the stock exchange", "Price rises happen between investors."], ["Investors trading its shares with each other", "Those trades pay the selling investors."]] }]),
    sc("0.3-29", 2, [
      { s: "Evergreen Labs, a young company, needs $200 million to build a new factory. It can borrow from a bank or sell new shares in an IPO.",
        p: [{ q: "If it sells shares in an IPO, who receives the $200 million?", a: ["Evergreen Labs", "New shares in an IPO bring the money to the company."], d: [["Investors who already trade the stock", "Before the IPO there is no public trading."], ["The stock exchange", "The exchange hosts trading; it doesn't get the money."]] },
            { q: "What happens to the founders' ownership percentage?", a: ["It shrinks, because there are now more shares", "That's dilution."], d: [["It grows", "Adding shares can't grow their percentage."], ["It stays the same", "More shares in total means a smaller percentage."]] },
            { q: "If Evergreen borrows instead, what does it take on?", a: ["A promise to repay with interest", "Borrowing creates a debt; owners keep their percentages."], d: [["New part-owners", "That's what selling shares does."], ["Nothing at all", "A loan must be repaid."]] }] },
      { s: "Foxglove Retail has traded on the stock market for six years. It now sells 10 million new shares at $30 to fund new stores.",
        p: [{ q: "Which market is this sale in?", a: ["The primary market: the company sells new shares", "New shares from the company are a primary-market sale, even years after the IPO."], d: [["The secondary market", "Secondary trades are between investors; here the company is selling."], ["Neither: it's only a price change", "It's a real sale of new shares."]] },
            { q: "How much does Foxglove raise, before fees?", a: ["$300 million", "10 million × $30 = $300 million."], d: [["$30 million", "That forgets the 10 million shares."], ["$3 billion", "Ten times too much."]] }] }]),

    // ---------- Level 3: Desk-level ----------
    tf("0.3-40", 3, [
      ["In some IPOs, early owners also sell some of their own shares, and that money goes to them, not the company.", true, "Only money for newly created shares goes to the company."],
      ["Every dollar paid in an IPO always goes to the company.", false, "Shares sold by existing owners in the IPO pay those owners, not the company."]]),
    tf("0.3-41", 3, [
      ["After an IPO, insiders are often barred from selling for a set period, commonly 90 to 180 days.", true, "That's a lock-up, agreed with the banks that run the IPO."],
      ["Insiders can always sell all their shares on the IPO's first day.", false, "Lock-up agreements usually stop them for a period after the IPO."]]),
    mc("0.3-42", 3, [
      { q: "A stock jumps 40% above its IPO price on its first trading day. What does that suggest?", a: ["Investors were willing to pay more, so the company may have sold its shares too cheaply", "A big first-day jump means the company raised less than it could have."],
        d: [["The company received 40% more money", "The company only gets the IPO price; the jump happens between investors."], ["The banks lost 40%", "Banks that sold shares at the IPO price don't lose from a rise."]] }]),
    gen("0.3-43", 3, function (R) {
      var N = R.pick([250, 400, 500, 800]), own = R.pick([2, 4, 5, 8, 10]), M = R.pick([50, 100, 200]);
      var before = 100 * own / N, after = 100 * own / (N + M), drop = before - after;
      return { q: "A fund owns " + own + " million of a company's " + N + " million shares. The company sells " + M + " million new shares. By how many percentage points does the fund's stake fall?",
        a: [Math.round(drop * 100) / 100 + " points", "Before: " + p2(before) + ". After: " + own + " ÷ " + (N + M) + " million = " + p2(after) + ". The fall is about " + Math.round(drop * 100) / 100 + " points."],
        d: [[Math.round(100 * own / M * 100) / 100 + " points", "That isn't the change in the fund's percentage."], ["0 points, because the fund didn't sell", "Its shares didn't change, but the total did, so its percentage fell."], [Math.round(before * 100) / 100 + " points", "That's the whole starting stake, not the change."]] };
    }),
    mc("0.3-44", 3, [
      { q: "Which of these does NOT give the company new money?", a: ["Investors trading its shares on an exchange", "Secondary trading moves money between investors."],
        d: [["An IPO of new shares", "New shares in an IPO bring money to the company."], ["A follow-on offering of new shares", "Selling new shares later also brings in money."]] }]),
    sc("0.3-45", 3, [
      { s: "IPO day for Kestrel Air. The IPO is priced at $20 and Kestrel sells 30 million new shares. When trading starts, the first trade is at $26.",
        p: [{ q: "How much did Kestrel raise, before fees?", a: ["$600 million", "30 million × $20 = $600 million."], d: [["$780 million", "That uses $26; the company sold at the IPO price, $20."], ["$180 million", "That's the first-day jump × shares, which Kestrel doesn't get."]] },
            { q: "Does Kestrel get anything from the jump to $26?", a: ["No: that's investors trading with each other", "The company was paid at $20."], d: [["Yes, another $180 million", "First-day gains go to investors who sell, not the company."], ["Yes, the exchange pays it the gain", "Exchanges don't pay companies for price rises."]] },
            { q: "Who benefits from the jump?", a: ["Investors who bought at $20 and can sell near $26", "They bought at the IPO price and the market now pays more."], d: [["Kestrel Air", "Kestrel was paid at $20, so it gains nothing from the jump."], ["The stock exchange", "The exchange earns fees, not the price gain."]] }] }]),
    tf("0.3-46", 3, [
      ["Buying a share in the secondary market doesn't change the company's cash.", true, "The money goes to the investor who sold."],
      ["Trading in the secondary market adds cash to the company every day.", false, "The company only gets cash when it sells new shares."]])
  ]);
})(window.P0Bank);
