/* Question bank, skill 0.6: Two ways to earn, price and dividends (D44). Levels: 1 Foundation, 2 Applied, 3 Desk-level. */
(function (B) {
  var mc = B.mc, tf = B.tf, gen = B.gen, sc = B.sc;
  function signed(R, x) { return (x >= 0 ? "+" : "−") + R.money(Math.abs(x), 2); }
  B.add("0.6", [
    // ---------- Level 1: Foundation ----------
    tf("0.6-01", 1, [
      ["Shareholders can earn from price changes and from dividends.", true, "Those are the two ways: selling for more than you paid, and cash dividends."],
      ["The only way to earn from a stock is through dividends.", false, "Price changes count too, and many companies pay no dividend at all."]]),
    mc("0.6-02", 1, [
      { q: "You buy a stock at $20 and sell it at $26. What is the $6 per share called?", a: ["A capital gain", "Selling for more than you paid is a capital gain."],
        d: [["A dividend", "A dividend is cash the company pays out, not a price change."], ["Interest", "Interest is what a borrower pays a lender."]] },
      { q: "You buy a stock at $30 and sell it at $24. What is the $6 per share called?", a: ["A capital loss", "Selling for less than you paid is a capital loss."],
        d: [["A dividend", "A dividend is cash paid to you, not money lost."], ["Dilution", "Dilution is about new shares shrinking your stake."]] }]),
    tf("0.6-03", 1, [
      ["A dividend is cash a company pays its shareholders, usually out of profits.", true, "It's one of the two ways shareholders earn."],
      ["A dividend is money shareholders pay the company each year.", false, "It flows the other way: from the company to shareholders."]]),
    mc("0.6-04", 1, [
      { q: "What does total return add up?", a: ["Price change plus dividends", "Total return = price change + dividends."],
        d: [["Dividends only", "That leaves out the price change."], ["Price change only", "That leaves out the dividends."]] }]),
    tf("0.6-05", 1, [
      ["Many fast-growing companies pay no dividend and reinvest their profits instead.", true, "They use the cash to grow the business."],
      ["Every company must pay a dividend each year.", false, "Dividends are optional; many companies pay none."]]),
    mc("0.6-06", 1, [
      { q: "A friend hands you $1 from the lemonade stand's cash box as a dividend. What happens to the stand?", a: ["It's worth about $1 less", "The cash left the stand and went to you."],
        d: [["It's worth $1 more", "Paying cash out can't make it worth more."], ["Nothing changes", "The stand has $1 less cash."]] }]),
    tf("0.6-07", 1, [
      ["When a stock starts trading without its dividend, its price typically drops by about the dividend amount.", true, "The cash has left the company, so each share is worth about that much less."],
      ["Paying a dividend makes a company worth more.", false, "Cash leaves the company, so it's worth about that much less."]]),
    mc("0.6-08", 1, [
      { q: "What is the day a stock starts trading without its next dividend called?", a: ["The ex-dividend date", "\"Ex\" means without: buyers from that day don't get the dividend."],
        d: [["The IPO date", "That's when a company first sells shares to the public."], ["The maturity date", "That's when a bond is repaid."]] }]),
    gen("0.6-09", 1, function (R) {
      var p0 = R.int(10, 60), ch; do { ch = R.int(-9, 12); } while (ch === 0); var p1 = p0 + ch;
      var right = ch > 0 ? "A gain of " + R.money(ch, 0) + " a share" : "A loss of " + R.money(-ch, 0) + " a share";
      var flip = ch > 0 ? "A loss of " + R.money(ch, 0) + " a share" : "A gain of " + R.money(-ch, 0) + " a share";
      return { q: "You buy a stock at " + R.money(p0, 0) + " and sell it at " + R.money(p1, 0) + ". What is the result, ignoring dividends?",
        a: [right, R.money(p1, 0) + " − " + R.money(p0, 0) + " = " + signed(R, ch).replace(".00", "") + " a share."],
        d: R.uniq(right, [[flip, "Check the direction: you sold " + (ch > 0 ? "higher" : "lower") + " than you bought."], ["A gain of " + R.money(p1, 0) + " a share", "That's the selling price, not the gain."], ["No gain or loss until a dividend is paid", "Selling locks in the price change, dividend or not."]]) };
    }),
    mc("0.6-10", 1, [
      { q: "Your stock rose from $40 to $50, but you haven't sold it. What is your $10 gain?", a: ["A gain on paper, until you sell", "It becomes cash only when you sell; the price can still move."],
        d: [["Cash already in your account", "Nothing is paid until you sell."], ["Lost, because you didn't sell", "It's still yours, just not locked in."]] }]),
    tf("0.6-11", 1, [
      ["Companies can cut or stop their dividends.", true, "Dividends are paid at the company's choice."],
      ["Once a company starts paying dividends, it must pay them forever.", false, "Companies can cut or stop dividends, for example in hard times."]]),
    mc("0.6-12", 1, [
      { q: "Why might a growing company pay no dividend?", a: ["To reinvest its profits in growing the business", "Growth can raise the share price instead."],
        d: [["Because dividends are illegal for young companies", "There's no such rule."], ["To lower its share price on purpose", "That's not why companies skip dividends."]] }]),
    tf("0.6-13", 1, [
      ["Selling a stock for less than you paid is a capital loss.", true, "Price change can be negative too."],
      ["A capital loss means the company stopped paying dividends.", false, "A capital loss is selling for less than you paid."]]),
    mc("0.6-14", 1, [
      { q: "Which of these is a dividend?", a: ["The company pays Maya $0.50 a share in cash from its profits", "Cash paid by the company to shareholders is a dividend."],
        d: [["Leo sells his shares for $2 more than he paid", "That's a capital gain."], ["Sam's shares go up $1 today", "That's a price change, still on paper."]] }]),
    mc("0.6-15", 1, [
      { q: "How often do most U.S. companies that pay dividends pay them?", a: ["Every three months (quarterly)", "Quarterly dividends are the norm in the U.S."],
        d: [["Once every ten years", "Dividend payers usually pay several times a year."], ["Every day", "Dividends aren't paid daily."]] }]),

    // ---------- Level 2: Applied ----------
    gen("0.6-20", 2, function (R) {
      var n = R.pick([10, 20, 50, 100]), p0 = R.int(20, 80), p1 = p0 + R.pick([-6, -4, -2, 3, 5, 8, 12]), dv = R.pick([0.5, 1, 1.5, 2, 3]);
      var tot = (p1 - p0 + dv) * n;
      return { q: "You buy " + n + " shares at " + R.money(p0, 0) + ", receive " + R.money(dv, 2) + " a share in dividends, then sell at " + R.money(p1, 0) + ". What is your total return in dollars?",
        a: [signed(R, tot), "(" + R.money(p1, 0) + " − " + R.money(p0, 0) + " + " + R.money(dv, 2) + ") × " + n + " shares = " + signed(R, tot) + "."],
        d: R.uniq(signed(R, tot), [[signed(R, (p1 - p0) * n), "That leaves out the dividends."], [signed(R, dv * n), "That's the dividends only; add the price change."], [signed(R, tot / n), "That's per share; multiply by " + n + " shares."]]) };
    }),
    gen("0.6-21", 2, function (R) {
      var p0 = R.pick([20, 25, 40, 50, 80, 100]), ch = R.pick([-10, -5, 5, 10, 15, 20]) * p0 / 100, dv = R.pick([2, 3, 4]) * p0 / 100;
      var r = 100 * (ch + dv) / p0;
      return { q: "A stock bought at " + R.money(p0, 2) + " ends the year at " + R.money(p0 + ch, 2) + " and paid " + R.money(dv, 2) + " in dividends. What was the total return?",
        a: [R.pct(r, 1), "(" + signed(R, ch) + " + " + R.money(dv, 2) + ") ÷ " + R.money(p0, 2) + " = " + R.pct(r, 1) + "."],
        d: [[R.pct(100 * ch / p0, 1), "That's the price change only."], [R.pct(100 * dv / p0, 1), "That's the dividend part only."], [R.pct(100 * (ch - dv) / p0, 1), "Dividends add to your return; they don't subtract."]] };
    }),
    gen("0.6-22", 2, function (R) {
      var p = R.int(3000, 9000) / 100, dv = R.pick([0.25, 0.4, 0.5, 0.75, 1, 1.25]);
      return { q: "A stock closes at " + R.money(p, 2) + " the day before its ex-dividend date. The dividend is " + R.money(dv, 2) + " a share. If nothing else changes, about where should it open?",
        a: [R.money(p - dv, 2), "The " + R.money(dv, 2) + " now belongs to the shareholders of record, so each share is worth about that much less."],
        d: [[R.money(p, 2), "The company's value dropped by the cash paid out."], [R.money(p + dv, 2), "Paying cash out lowers the price, it doesn't raise it."], [R.money(p - 2 * dv, 2), "It drops by about one dividend, not two."]] };
    }),
    gen("0.6-23", 2, function (R) {
      var q = R.pick([0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.75]);
      return { q: "A company pays a dividend of " + R.money(q, 2) + " a share every quarter. How much is that per share in a year?",
        a: [R.money(q * 4, 2), "Four quarters × " + R.money(q, 2) + " = " + R.money(q * 4, 2) + "."],
        d: [[R.money(q, 2), "That's one quarter's dividend."], [R.money(q * 12, 2), "There are four quarters in a year, not twelve."], [R.money(q * 2, 2), "That's only two quarters."]] };
    }),
    tf("0.6-24", 2, [
      ["A dividend makes shareholders richer overnight.", false, "Cash moves from the company to you, and the share price drops by about the same amount."],
      ["Right after a dividend, you hold the cash, but your shares are worth about that much less.", true, "Your total is about the same; the value moved from shares to cash."]]),
    mc("0.6-25", 2, [
      { q: "Stock A rose 8% in a year and paid no dividend. Stock B rose 5% and paid 3% in dividends. Which had the higher total return?", a: ["Neither: both returned about 8%", "Total return counts price change plus dividends."],
        d: [["Stock A", "A's 8% equals B's 5% + 3%."], ["Stock B, because it paid a dividend", "A dividend isn't extra on top: compare the totals."]] }]),
    tf("0.6-26", 2, [
      ["A gain you haven't sold yet is called unrealized.", true, "It's realized when you sell."],
      ["An unrealized gain is cash already in your account.", false, "Unrealized means on paper; it's cash only once you sell."]]),
    mc("0.6-27", 2, [
      { q: "You buy at $50. The stock falls to $48, and you received $3 in dividends. What is your total return per share?", a: ["+$1", "−$2 price change + $3 dividends = +$1."],
        d: [["−$2", "That leaves out the dividends."], ["+$3", "That leaves out the price fall."]] },
      { q: "You buy at $80. The stock falls to $75, and you received $2 in dividends. What is your total return per share?", a: ["−$3", "−$5 price change + $2 dividends = −$3."],
        d: [["−$5", "That leaves out the dividends."], ["+$2", "That leaves out the price fall."]] }]),
    mc("0.6-28", 2, [
      { q: "A company pays out all of its profits as dividends every year. What does it give up?", a: ["Cash to reinvest in growing the business", "Paid-out cash can't also be reinvested."],
        d: [["Its stock market listing", "Paying dividends doesn't affect its listing."], ["Its shareholders' votes", "Dividends don't change voting rights."]] }]),
    sc("0.6-29", 2, [
      { s: "You compare two stocks over one year. Juniper Software pays no dividend and went from $40 to $46. Bluefin Foods went from $40 to $42 and paid $3 a share in dividends.",
        p: [{ q: "What was Juniper's total return per share?", a: ["$6", "$46 − $40, with no dividends."], d: [["$0, because it paid no dividend", "The price change counts as return."], ["$46", "That's the ending price, not the return."]] },
            { q: "What was Bluefin's total return per share?", a: ["$5", "$2 price change + $3 dividends."], d: [["$2", "That leaves out the dividends."], ["$3", "That leaves out the price change."]] },
            { q: "Which had the higher total return?", a: ["Juniper: $6 versus $5", "Compare totals, not just dividends."], d: [["Bluefin, because it paid a dividend", "Its total was smaller."], ["They're equal", "$6 and $5 aren't equal."]] }] }]),

    // ---------- Level 3: Desk-level ----------
    gen("0.6-40", 3, function (R) {
      var p = R.pick([20, 25, 40, 50, 60, 80, 100]), dv = R.pick([0.5, 0.8, 1, 1.2, 1.5, 2, 3]), y = 100 * dv / p;
      return { q: "A stock trades at " + R.money(p, 2) + " and pays " + R.money(dv, 2) + " a share in dividends per year. What is its dividend yield?",
        a: [R.pct(y, 1), "Yield = yearly dividend ÷ price = " + R.money(dv, 2) + " ÷ " + R.money(p, 2) + " = " + R.pct(y, 1) + "."],
        d: R.uniq(R.pct(y, 1), [[R.pct(y * 10, 1), "Ten times too high. Check the decimal."], [R.pct(y / 4, 2), "That treats the yearly dividend as quarterly."], [R.pct(p / dv, 1), "That's price ÷ dividend, upside down."]]) };
    }),
    tf("0.6-41", 3, [
      ["A very high dividend yield can be a warning sign, for example after the price has collapsed on bad news.", true, "Yield = dividend ÷ price, so a falling price inflates the yield, and the dividend may be cut (lesson 3.7)."],
      ["The higher a stock's dividend yield, the safer it is.", false, "A high yield can mean a falling price and a dividend at risk."]]),
    mc("0.6-42", 3, [
      { q: "Besides dividends, how else can a company return cash to its shareholders?", a: ["By buying back its own shares", "Buybacks return cash to the owners who sell and leave fewer shares outstanding."],
        d: [["By issuing new shares", "That brings cash in, not out."], ["By splitting its stock", "A split moves no cash at all."]] }]),
    mc("0.6-43", 3, [
      { q: "To receive the next dividend, when do you need to own the stock?", a: ["Before the ex-dividend date", "Buyers on or after the ex-dividend date don't get that dividend."],
        d: [["Only on the day it's paid", "Payment comes later; it's the ex-dividend date that decides who gets it."], ["At any time during the year", "Only owners before the ex-dividend date get that payment."]] }]),
    gen("0.6-44", 3, function (R) {
      var n = 100, p0 = R.pick([40, 50, 80]), p1 = p0 + R.pick([-4, 2, 4, 8]), q = R.pick([0.25, 0.5, 0.75]);
      var dv = q * 4, r = 100 * (p1 - p0 + dv) / p0;
      return { q: "A fund buys " + n + " shares at " + R.money(p0, 0) + ", collects a " + R.money(q, 2) + " dividend every quarter for a year, and the shares end at " + R.money(p1, 0) + ". What was its total return?",
        a: [R.pct(r, 1), "Dividends: 4 × " + R.money(q, 2) + " = " + R.money(dv, 2) + ". (" + signed(R, p1 - p0) + " + " + R.money(dv, 2) + ") ÷ " + R.money(p0, 0) + " = " + R.pct(r, 1) + "."],
        d: [[R.pct(100 * (p1 - p0 + q) / p0, 1), "That counts only one quarter's dividend."], [R.pct(100 * (p1 - p0) / p0, 1), "That leaves out the dividends."], [R.pct(100 * (p1 - p0 + 12 * q) / p0, 1), "A year has four quarters, not twelve."]] };
    }),
    sc("0.6-45", 3, [
      { s: "Harbor Health closes at $60.00 the evening before its ex-dividend date. The dividend is $1.20 a share. Nothing else changes overnight.",
        p: [{ q: "Roughly where would you expect it to open?", a: ["Around $58.80", "$60.00 − $1.20: the dividend has left the company."], d: [["Around $61.20", "Paying cash out lowers the price."], ["Exactly $60.00", "The company is worth about $1.20 a share less."]] },
            { q: "A client says the stock \"crashed 2%\" at the open. What's the best explanation?", a: ["The dividend left the company, so the price dropped by about that amount", "$1.20 is 2% of $60: no crash, just the ex-dividend drop."], d: [["The company announced bad news", "Nothing else changed overnight."], ["The exchange made a pricing mistake", "Exchanges don't set prices; this is a normal ex-dividend move."]] }] }]),
    tf("0.6-46", 3, [
      ["Total return is the fair way to compare a stock that pays dividends with one that doesn't.", true, "It counts both ways of earning."],
      ["Comparing price changes alone is fair even when only one of the stocks pays dividends.", false, "Price-only comparisons ignore the dividends, which are part of the return."]])
  ]);
})(window.P0Bank);
