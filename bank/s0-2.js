/* Question bank, skill 0.2: Market cap, how big a company is (D44). Levels: 1 Foundation, 2 Applied, 3 Desk-level. */
(function (B) {
  var mc = B.mc, tf = B.tf, gen = B.gen, sc = B.sc;
  function two(R) { var a = R.company(), b = R.company(); while (b === a) b = R.company(); return [a, b]; }
  B.add("0.2", [
    // ---------- Level 1: Foundation ----------
    tf("0.2-01", 1, [
      ["Market cap is the share price times the number of shares.", true, "That's the whole formula: what all of the company's shares are worth together."],
      ["Market cap is the price of one share.", false, "That's the share price. Market cap multiplies it by the number of shares."],
      ["A company's market cap is what the market says all its shares are worth together.", true, "Price per share × number of shares = the value of every slice together."]]),
    gen("0.2-02", 1, function (R) {
      var p = R.int(5, 200), n = R.pick([10, 20, 50, 100, 200, 500]), cap = p * n * 1e6;
      return { q: "A company's shares trade at " + R.money(p, 0) + " and it has " + n + " million shares. What is its market cap?",
        a: [R.big(cap), R.money(p, 0) + " × " + n + " million shares = " + R.big(cap) + "."],
        d: [[R.big(cap * 10), "That's ten times too big. Check the zeros: " + R.money(p, 0) + " × " + n + " million."], [R.big(cap / 10), "That's ten times too small. Check the zeros."], [R.money(p, 0), "That's the price of one share, not the whole company."]] };
    }),
    mc("0.2-03", 1, [
      { q: "Which number tells you how big a company is in the stock market?", a: ["Its market cap", "Market cap values all the shares together, so it shows size."],
        d: [["Its share price alone", "Price per share depends on how many slices the company is cut into."], ["How many shareholders it has", "Lots of small shareholders doesn't mean a big company."]] }]),
    tf("0.2-04", 1, [
      ["Cutting a company into more shares makes the business smaller.", false, "Same pizza, more slices: each slice is smaller, but the pizza isn't."],
      ["A company with more shares has a lower price per share, not a smaller business.", true, "More slices of the same pizza means each slice is worth less."]]),
    mc("0.2-05", 1, [
      { q: "Stock A trades at $5; stock B trades at $500. Which company is bigger?", a: ["You can't tell without the number of shares", "Size = price × shares. Price alone doesn't settle it."],
        d: [["Company B, because its price is higher", "A high price can come with few shares. You need both numbers."], ["Company A, because its stock is cheaper", "A low price can come with many shares, or few. You need both numbers."]] }]),
    tf("0.2-06", 1, [
      ["A $500 stock is always more expensive than a $50 stock.", false, "Whether a stock is cheap or expensive depends on what the business earns (later lessons), not on the price of one slice."],
      ["A share's price alone can't tell you whether the stock is cheap.", true, "You'd need to compare the price with what the business earns, which comes later in the path."]]),
    mc("0.2-07", 1, [
      { q: "A company does a 2-for-1 stock split. You owned 10 shares at $100 each. What do you own right after?", a: ["20 shares at about $50 each", "You get two shares for each one, each worth about half. Still about $1,000 in total."],
        d: [["20 shares at $100 each", "That would double your money from nothing. Splits don't create value."], ["10 shares at $50 each", "You'd have lost half your money. In a split you get more shares, not fewer."]] },
      { q: "A company does a 3-for-1 stock split. You owned 10 shares at $90 each. What do you own right after?", a: ["30 shares at about $30 each", "Three shares for each one, each worth about a third. Still about $900."],
        d: [["30 shares at $90 each", "That would triple your money from nothing. Splits don't create value."], ["10 shares at $30 each", "You'd have lost two thirds. In a split you get more shares, not fewer."]] }]),
    tf("0.2-08", 1, [
      ["A stock split changes the size of the company.", false, "A split only changes how many slices there are. The company and its market cap stay about the same."],
      ["After a 2-for-1 split, each share is worth about half as much as before.", true, "Twice as many slices of the same company."]]),
    mc("0.2-09", 1, [
      { q: "What is \"market cap\" short for?", a: ["Market capitalization", "Capitalization: the total value of the company's shares."],
        d: [["Market capacity", "Not a finance term here."], ["Maximum capital", "Not what it means: it's capitalization, price × shares."]] }]),
    mc("0.2-10", 1, [
      { q: "A $5 stock has 10 billion shares. What is its market cap?", a: ["$50 billion", "$5 × 10 billion = $50 billion."],
        d: [["$5 billion", "Check the multiplication: $5 × 10 billion."], ["$500 million", "Much too small: $5 × 10 billion is $50 billion."]] },
      { q: "A $500 stock has 10 million shares. What is its market cap?", a: ["$5 billion", "$500 × 10 million = $5,000 million = $5 billion."],
        d: [["$50 billion", "Ten times too big. $500 × 10 million is $5 billion."], ["$500 million", "Ten times too small. $500 × 10 million is $5 billion."]] }]),
    tf("0.2-11", 1, [
      ["If a company's share price rises and its share count stays the same, its market cap rises too.", true, "Market cap = price × shares, so a higher price means a higher market cap."],
      ["A company's market cap stays fixed whatever its share price does.", false, "Market cap moves with the share price, trade by trade."]]),
    mc("0.2-12", 1, [
      { q: "What does market cap tell you?", a: ["What the market says all of the company's shares are worth together", "It's the market's price tag on the whole company's shares."],
        d: [["How much cash the company has in the bank", "Cash is on the balance sheet (a later lesson). Market cap is price × shares."], ["How much profit the company made last year", "Profit is on the income statement. Market cap is price × shares."]] }]),
    tf("0.2-13", 1, [
      ["Two companies with the same market cap are the same size in the market's eyes, even if their share prices differ.", true, "Size is price × shares. Different prices can give the same total."],
      ["Two companies with the same share price must have the same market cap.", false, "They could have very different numbers of shares."]]),
    mc("0.2-14", 1, [
      { q: "Which change makes a company's market cap fall (share count unchanged)?", a: ["Its share price falls", "Lower price × same shares = lower market cap."],
        d: [["It does a stock split", "A split doesn't change market cap; more slices, same pizza."], ["More investors want to buy its shares", "Eager buyers push the price up, which raises market cap."]] }]),
    mc("0.2-15", 1, [
      { q: "A small company has 1 million shares at $10 each. What is its market cap?", a: ["$10 million", "$10 × 1 million = $10 million."],
        d: [["$1 million", "That's just the share count in dollars. Multiply by the $10 price."], ["$10", "That's the price of one share."]] }]),

    // ---------- Level 2: Applied ----------
    gen("0.2-20", 2, function (R) {
      var c = two(R), pa, sa, pb, sb, A, Bc;
      do { pa = R.int(5, 400); sa = R.pick([20, 50, 100, 250, 500, 1000, 2000]); pb = R.int(5, 400); sb = R.pick([20, 50, 100, 250, 500, 1000, 2000]); A = pa * sa; Bc = pb * sb; } while (A === Bc || Math.max(A, Bc) / Math.min(A, Bc) < 1.15);
      var big = A > Bc ? c[0] : c[1], small = A > Bc ? c[1] : c[0];
      var why = c[0] + ": " + R.money(pa, 0) + " × " + sa + " million = " + R.big(A * 1e6) + ". " + c[1] + ": " + R.money(pb, 0) + " × " + sb + " million = " + R.big(Bc * 1e6) + ".";
      return { q: c[0] + " trades at " + R.money(pa, 0) + " with " + sa + " million shares. " + c[1] + " trades at " + R.money(pb, 0) + " with " + sb + " million shares. Which company is bigger?",
        a: [big, why], d: [[small, why], ["They are the same size", why]] };
    }),
    gen("0.2-21", 2, function (R) {
      var p = R.pick([10, 20, 25, 30, 40, 50, 60, 75, 80, 100, 120, 150, 200]), s = R.pick([50, 100, 200, 250, 400, 500, 800]), cap = p * s * 1e6;
      return { q: "A company's market cap is " + R.big(cap) + " and its shares trade at " + R.money(p, 0) + ". How many shares does it have?",
        a: [R.count(s * 1e6), "Shares = market cap ÷ price = " + R.big(cap) + " ÷ " + R.money(p, 0) + " = " + R.count(s * 1e6) + "."],
        d: [[R.count(s * 1e5), "Ten times too few. Check the zeros."], [R.count(s * 1e7), "Ten times too many. Check the zeros."], [R.count(s * 2e6), "That doesn't match: " + R.count(s * 2e6) + " × " + R.money(p, 0) + " is " + R.big(cap * 2) + "."]] };
    }),
    gen("0.2-22", 2, function (R) {
      var s = R.pick([100, 200, 400, 500]), p1, p2;
      do { p1 = R.int(20, 80); p2 = p1 + R.pick([-10, -5, 5, 10, 15, 20]); } while (p1 === 2 * p2); // keeps the choices distinct
      return { q: "A company has " + s + " million shares. Its price moves from " + R.money(p1, 0) + " to " + R.money(p2, 0) + ". What is its new market cap?",
        a: [R.big(p2 * s * 1e6), R.money(p2, 0) + " × " + s + " million = " + R.big(p2 * s * 1e6) + "."],
        d: R.uniq(R.big(p2 * s * 1e6), [[R.big(p1 * s * 1e6), "That's the old market cap, before the price moved."], [R.big(Math.abs(p2 - p1) * s * 1e6), "That's only the change in market cap, not the new total."], [R.big(p2 * s * 1e7), "Ten times too big. Check the zeros."]]) };
    }),
    gen("0.2-23", 2, function (R) {
      var x = R.pick([2, 3, 4, 5]), own = R.pick([10, 20, 30, 40, 50]), p = x * R.int(10, 60);
      return { q: "You own " + own + " shares at " + R.money(p, 0) + ". The company does a " + x + "-for-1 split. What do you own right after?",
        a: [(own * x) + " shares at about " + R.money(p / x, 0), "You get " + x + " shares for each one, each worth about 1/" + x + " as much. Total value stays about " + R.money(own * p, 0) + "."],
        d: [[(own * x) + " shares at " + R.money(p, 0), "That would multiply your money from nothing. Splits don't create value."], [own + " shares at about " + R.money(p / x, 0), "That would cut your money. A split gives you more shares."]] };
    }),
    mc("0.2-24", 2, [
      { q: "A company does a 1-for-10 \"reverse split\". You had 100 shares at $2. What do you have right after?", a: ["10 shares at about $20", "Every 10 shares become 1, each worth about 10 times as much. Still about $200."],
        d: [["1,000 shares at about $0.20", "That's a normal 10-for-1 split, the opposite direction."], ["100 shares at $20", "That would multiply your money from nothing."]] }]),
    tf("0.2-25", 2, [
      ["Right after a stock split, your investment is worth about the same as before.", true, "More shares, each worth proportionally less."],
      ["A stock split instantly increases the value of your investment.", false, "A split changes the number of slices, not the size of the pizza."]]),
    mc("0.2-26", 2, [
      { q: "Why might a company split its stock?", a: ["To lower the price of each share so it's easier to buy", "The company is the same; each slice just costs less."],
        d: [["To raise money from investors", "A split brings in no money. Selling new shares does that (next lesson)."], ["To make the company bigger", "A split doesn't change the company's size."]] }]),
    mc("0.2-27", 2, [
      { q: "Two pizza shops are each worth $1 million. One is split into 1,000 shares, the other into 100,000 shares. Which shop's share costs more?", a: ["The one with 1,000 shares: about $1,000 each versus $10", "Same value, fewer slices, so each slice costs more."],
        d: [["Both cost the same", "Same total value, but very different slice sizes."], ["The one with 100,000 shares", "More slices means each slice is smaller and cheaper."]] }]),
    tf("0.2-28", 2, [
      ["A $3 stock is a bargain compared with a $300 stock.", false, "Price per share says nothing about value; it depends on what the business earns per share (later lessons)."],
      ["Whether a stock is cheap depends on what the business earns, not on its price per share.", true, "That's why investors compare price with earnings, coming later in the path."]]),
    mc("0.2-29", 2, [
      { q: "A company sells new shares, and its share price stays the same. What happens to its market cap?", a: ["It rises: more shares at the same price", "Price × a bigger share count = a bigger market cap. The company also has the new cash."],
        d: [["It falls", "More shares at an unchanged price can't lower market cap."], ["It stays the same", "Market cap = price × shares, and the share count went up."]] }]),
    gen("0.2-30", 2, function (R) {
      var k = R.pick([4, 5, 8, 10, 12, 15, 20]), up = Math.random() < 0.6;
      return { q: "A company's share price " + (up ? "rises" : "falls") + " " + k + "% today and its share count doesn't change. How much does its market cap change?",
        a: [(up ? "Up " : "Down ") + k + "%", "Market cap = price × shares, so with the same shares it moves exactly with the price."],
        d: [[(up ? "Up " : "Down ") + (2 * k) + "%", "Market cap moves one-for-one with price when the share count is unchanged."], ["It depends on how many shares there are", "The share count cancels out: any count moves by the same " + k + "%."], ["It doesn't change", "Market cap changes whenever the price does."]] };
    }),
    gen("0.2-31", 2, function (R) {
      var names = ["A", "B", "C"], caps, list;
      do {
        list = names.map(function (n) { var p = R.pick([5, 10, 20, 40, 80, 150, 200, 300]), s = R.pick([5, 10, 20, 50, 100, 300, 500]); return { n: n, p: p, s: s, c: p * s }; });
        caps = list.map(function (x) { return x.c; });
      } while (caps[0] === caps[1] || caps[1] === caps[2] || caps[0] === caps[2]);
      var sorted = list.slice().sort(function (a, b) { return b.c - a.c; }), right = sorted.map(function (x) { return x.n; }).join(" > ");
      var byPrice = list.slice().sort(function (a, b) { return b.p - a.p || b.c - a.c; }).map(function (x) { return x.n; }).join(" > ");
      var rev = sorted.slice().reverse().map(function (x) { return x.n; }).join(" > ");
      var alt = [sorted[1].n, sorted[0].n, sorted[2].n].join(" > ");
      var why = list.map(function (x) { return x.n + " = " + R.big(x.c * 1e6); }).join(", ") + ".";
      var d = [[rev, "That's smallest to largest. " + why]];
      [byPrice, alt].forEach(function (o) { if (o !== right && d.map(function (z) { return z[0]; }).indexOf(o) < 0) d.push([o, "Rank by price × shares, not by price alone. " + why]); });
      return { q: "Rank by market cap, biggest first. A: " + R.money(list[0].p, 0) + " × " + list[0].s + " million shares. B: " + R.money(list[1].p, 0) + " × " + list[1].s + " million. C: " + R.money(list[2].p, 0) + " × " + list[2].s + " million.",
        a: [right, why], d: d };
    }),
    sc("0.2-32", 2, [
      { s: "Two friends argue. One says Bluefin Foods, at $400 a share, must be far bigger than Cobalt Energy at $40 a share. Bluefin has 10 million shares. Cobalt has 500 million shares.",
        p: [{ q: "What is Bluefin's market cap?", a: ["$4 billion", "$400 × 10 million = $4 billion."], d: [["$400 million", "Ten times too small."], ["$40 billion", "Ten times too big."]] },
            { q: "Which company is bigger?", a: ["Cobalt: $20 billion versus $4 billion", "$40 × 500 million = $20 billion, five times Bluefin."],
              d: [["Bluefin, because its share price is higher", "Price alone ignores the share count."], ["They're the same size", "$4 billion and $20 billion aren't the same."]] }] },
      { s: "A classmate says Lumen Bikes at $15 a share is a tiny company next to Kestrel Air at $150. Lumen has 2 billion shares. Kestrel has 100 million shares.",
        p: [{ q: "What is Lumen's market cap?", a: ["$30 billion", "$15 × 2 billion = $30 billion."], d: [["$3 billion", "Ten times too small."], ["$300 million", "A hundred times too small."]] },
            { q: "Which company is bigger?", a: ["Lumen: $30 billion versus $15 billion", "Kestrel is $150 × 100 million = $15 billion."],
              d: [["Kestrel, because its share price is higher", "Price alone ignores the share count."], ["They're the same size", "$30 billion and $15 billion aren't the same."]] }] }]),

    // ---------- Level 3: Desk-level ----------
    gen("0.2-40", 3, function (R) {
      var p = R.int(2000, 40000) / 100, s = R.pick([0.4, 0.8, 1.2, 1.6, 2.4, 3.5, 7.5]), cap = p * s * 1e9;
      return { q: "A stock trades at " + R.money(p, 2) + " and has " + s + " billion shares. Which is closest to its market cap?",
        a: [R.big(Math.round(cap / 1e8) * 1e8), R.money(p, 2) + " × " + s + " billion ≈ " + R.big(Math.round(cap / 1e8) * 1e8) + "."],
        d: [[R.big(Math.round(cap / 1e9) * 1e8), "Ten times too small. Watch the billions."], [R.big(Math.round(cap / 1e7) * 1e8), "Ten times too big."], [R.big(Math.round((p + s) * 1e8) / 1e8 * 1e9), "That adds price and shares instead of multiplying."]] };
    }),
    mc("0.2-41", 3, [
      { q: "On the same day, a stock does a 2-for-1 split and its price rises 5% on news. About how much does market cap change?", a: ["About +5%", "The split changes nothing about size; only the 5% move does."],
        d: [["About +105%", "Doubling the shares doesn't double the value; the price halves."], ["About −47.5%", "The price halves because of the split, but the share count doubles, so that part nets out."]] }]),
    tf("0.2-42", 3, [
      ["Market cap measures the value of the shares only; it doesn't include the company's debt.", true, "Enterprise value, a later lesson, adds debt to get the value of the whole business."],
      ["Market cap already includes everything the company owes its lenders.", false, "Market cap is just price × shares. Debt is counted separately (enterprise value, later)."]]),
    gen("0.2-43", 3, function (R) {
      var s = R.pick([200, 250, 400, 500, 800]), p = R.pick([12, 15, 18, 24, 30, 36, 45, 60, 72, 90]), cap = p * s * 1e6;
      return { q: "A company's market cap is " + R.big(cap) + " and it has " + s + " million shares. What is its share price?",
        a: [R.money(p, 0), "Price = market cap ÷ shares = " + R.big(cap) + " ÷ " + s + " million = " + R.money(p, 0) + "."],
        d: [[R.money(p * 10, 0), "Ten times too high. Check the zeros."], [R.money(p / 10, 2), "Ten times too low. Check the zeros."], [R.money(p * 2, 0), "That would make the market cap " + R.big(cap * 2) + "."]] };
    }),
    tf("0.2-44", 3, [
      ["The S&P 500 gives companies with bigger market caps more weight in the index.", true, "It's weighted by market cap (adjusted for shares that actually trade), so the biggest companies move it most."],
      ["Every major index gives each company equal weight.", false, "The S&P 500 weights by market cap; the Dow Jones Industrial Average weights by share price."],
      ["The Dow Jones Industrial Average weights its companies by share price.", true, "It's price-weighted: a higher-priced stock moves it more, whatever the company's size."]]),
    sc("0.2-45", 3, [
      { s: "Juniper Software announces a 4-for-1 stock split. Yesterday it had 250 million shares trading at $480.",
        p: [{ q: "About how many shares exist after the split?", a: ["1 billion", "250 million × 4 = 1 billion shares."], d: [["62.5 million", "That divides instead of multiplying."], ["250 million", "A split changes the share count."]] },
            { q: "About what price should each share trade at right after?", a: ["About $120", "$480 ÷ 4 = $120."], d: [["About $1,920", "That multiplies the price; it should divide."], ["$480", "Each share is now a quarter of an old one."]] },
            { q: "What happens to the market cap?", a: ["About $120 billion, unchanged", "Before: $480 × 250 million. After: $120 × 1 billion. Both are $120 billion."],
              d: [["About $480 billion", "That multiplies the old price by the new share count."], ["About $30 billion", "That divides the value by four; a split doesn't do that."]] }] }]),
    tf("0.2-46", 3, [
      ["A company's market cap can change every second while the market is open.", true, "It moves with the share price, which changes with every trade."],
      ["Market cap is only updated once a year, in the annual report.", false, "It changes live with the share price."]]),
    tf("0.2-47", 3, [
      ["If a company buys back some of its own shares and the price is unchanged, its market cap falls.", true, "Fewer shares at the same price. The company paid cash out to buy them."],
      ["Buying back shares raises market cap even if the price doesn't change.", false, "Fewer shares × the same price = a smaller market cap."]])
  ]);
})(window.P0Bank);
