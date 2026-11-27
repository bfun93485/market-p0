/* Question bank, skill 0.7: Risk, return and diversification (D44). Levels: 1 Foundation, 2 Applied, 3 Desk-level.
   Teaching only: these questions explain concepts and never recommend an investment. */
(function (B) {
  var mc = B.mc, tf = B.tf, gen = B.gen, sc = B.sc;
  function sg(x) { return (x > 0 ? "+" : x < 0 ? "−" : "") + Math.abs(Math.round(x * 10) / 10) + "%"; }
  B.add("0.7", [
    // ---------- Level 1: Foundation ----------
    tf("0.7-01", 1, [
      ["Investments that can earn more can usually also lose more.", true, "Return and risk travel together."],
      ["The investments with the highest returns are usually the safest.", false, "Higher expected returns usually come with more risk."]]),
    tf("0.7-02", 1, [
      ["In investing, risk means uncertainty: how widely the results can swing.", true, "A risky investment has a wide range of possible outcomes."],
      ["In investing, risk only means the chance of losing everything.", false, "Risk is the whole range of uncertainty, good and bad."]]),
    mc("0.7-03", 1, [
      { q: "Someone promises you a high return with no risk at all. What should you think?", a: ["It's a red flag", "No real investment offers a high expected return with no risk. Promises like that are a classic warning sign of fraud."],
        d: [["It's a great deal; invest quickly", "Pressure plus a too-good promise is exactly how scams work."], ["It's normal for big companies", "No legitimate investment can promise that."]] }]),
    tf("0.7-04", 1, [
      ["Owning many different investments means one company's bad news hurts you less.", true, "That's diversification."],
      ["Owning many different investments makes one company's bad news hurt you more.", false, "Spreading out shrinks the damage from any single company."]]),
    mc("0.7-05", 1, [
      { q: "What is diversification?", a: ["Spreading your money across many different investments", "So no single one can sink you."],
        d: [["Putting all your money in the best stock", "That's the opposite: concentration."], ["Buying and selling very often", "That's frequent trading, not diversification."]] }]),
    tf("0.7-06", 1, [
      ["Diversification can't remove the risk of the whole market falling.", true, "It cuts single-company risk, but when most stocks fall together, a diversified portfolio falls too."],
      ["A diversified portfolio can never lose money.", false, "It can still fall when the whole market falls."]]),
    mc("0.7-07", 1, [
      { q: "Ten umbrella shops all suffer in a drought. Which pair balances out better?", a: ["An umbrella shop and a sunglasses shop", "They do well in opposite weather, so one helps when the other struggles."],
        d: [["Two umbrella shops", "They suffer together."], ["Ten umbrella shops", "More of the same doesn't diversify."]] }]),
    mc("0.7-08", 1, [
      { q: "Which investor is more diversified?", a: ["One who owns 30 companies across many industries", "Many companies in different industries spread the risk."],
        d: [["One who owns 30 companies, all in airlines", "Same industry: they tend to suffer together."], ["One who owns 1 very large company", "One company is the least diversified."]] }]),
    tf("0.7-09", 1, [
      ["Putting all your money in one stock is riskier than spreading it across many.", true, "One piece of bad news could hit everything you own."],
      ["Owning just one stock is the safest choice because it's simple to follow.", false, "Simplicity doesn't reduce risk; concentration increases it."]]),
    mc("0.7-10", 1, [
      { q: "Which saying best describes diversification?", a: ["Don't put all your eggs in one basket", "Spread out, so one dropped basket doesn't ruin everything."],
        d: [["Buy low, sell high", "That's about timing, not diversification."], ["Time is money", "Not about investing risk."]] }]),
    tf("0.7-11", 1, [
      ["No investment offers a high expected return with no risk.", true, "Anyone claiming otherwise is a red flag."],
      ["Some investments safely guarantee high returns every year.", false, "Guaranteed high returns don't exist; that promise is a classic scam sign."]]),
    mc("0.7-12", 1, [
      { q: "Investment A's results swing between −30% and +40% a year. Investment B's swing between +1% and +3%. Which is riskier?", a: ["A: its results swing far more widely", "Risk is how widely the results can swing."],
        d: [["B", "B's range is narrow and predictable."], ["They're equally risky", "Their ranges are very different."]] }]),
    mc("0.7-13", 1, [
      { q: "Why do investors accept more risk?", a: ["To earn a higher expected return", "Risk has to be paid for with the chance of a bigger reward."],
        d: [["Because risky investments are guaranteed to win", "Nothing risky is guaranteed."], ["Because risk doesn't matter over time", "Risk always matters."]] }]),
    tf("0.7-14", 1, [
      ["A stock market index fund holds many companies, so it's diversified across them.", true, "One fund, many companies."],
      ["An index fund holds a single company.", false, "It holds the many companies in its index."]]),
    mc("0.7-15", 1, [
      { q: "What kind of risk does diversification reduce most?", a: ["The risk from any single company", "One company's trouble matters less when you own many."],
        d: [["The risk of the whole market falling", "That remains even when you're diversified."], ["All risk, completely", "Market-wide risk remains."]] }]),

    // ---------- Level 2: Applied ----------
    gen("0.7-20", 2, function (R) {
      var n = R.pick([2, 4, 5, 10, 20]), x = R.pick([20, 40, 50, 60, 80, 100]), hit = x / n;
      return { q: "You split your money equally across " + n + " stocks. One of them falls " + x + "% and the others don't move. How much does your whole portfolio fall?",
        a: [sg(-hit).replace("−", "") + "", "One stock is 1/" + n + " of the portfolio, so " + x + "% ÷ " + n + " = " + sg(hit).replace("+", "") + "."],
        d: [[x + "%", "That's the one stock's fall, not the whole portfolio's."], [sg(x / (n * 2)).replace("+", ""), "Too small: it's " + x + "% ÷ " + n + "."], ["0%, because the others didn't move", "The fallen stock is part of your portfolio."]] };
    }),
    gen("0.7-21", 2, function (R) {
      function series(w) { var a = []; for (var i = 0; i < 4; i++) a.push(R.int(-w, w) + 6); return a; }
      var wA = R.pick([3, 5, 20, 30]), wB; do { wB = R.pick([3, 5, 20, 30]); } while (Math.abs(wA - wB) < 10);
      var A = series(wA), Bv = series(wB), rA = Math.max.apply(null, A) - Math.min.apply(null, A), rB = Math.max.apply(null, Bv) - Math.min.apply(null, Bv);
      if (rA === rB) { A[0] = Math.max.apply(null, A) + 15; rA = Math.max.apply(null, A) - Math.min.apply(null, A); } // break a tie
      var fmt = function (a) { return a.map(function (x) { return sg(x); }).join(", "); }, riskier = rA > rB ? "Fund A" : "Fund B";
      return { q: "Yearly returns over four years. Fund A: " + fmt(A) + ". Fund B: " + fmt(Bv) + ". Which fund was riskier?",
        a: [riskier, "Risk is how widely results swing: A ranged over " + rA + " points, B over " + rB + "."],
        d: [[riskier === "Fund A" ? "Fund B" : "Fund A", "Its results swung less widely."], ["They were equally risky", "Their ranges differ: " + rA + " versus " + rB + " points."]] };
    }),
    gen("0.7-22", 2, function (R) {
      var wa = R.pick([20, 25, 40, 50, 60, 75, 80]), a = R.pick([-10, -5, 4, 8, 10, 12, 20]), b; do { b = R.pick([-6, -2, 2, 3, 5, 6]); } while (b === a);
      var r = (wa * a + (100 - wa) * b) / 100, avg = (a + b) / 2;
      var d = [[sg(a), "That's A's return only; B was " + (100 - wa) + "% of the portfolio."], [sg(a + b), "Returns don't add up like that; weight each by its share."], [sg(b), "That's B's return only; A was " + wa + "% of the portfolio."]];
      if (Math.abs(avg - r) > 0.05) d.push([sg(avg), "That's a simple average; A and B weren't 50/50."]);
      return { q: "A portfolio is " + wa + "% stock A and " + (100 - wa) + "% stock B. A returns " + sg(a) + " and B returns " + sg(b) + ". What does the whole portfolio return?",
        a: [sg(r), wa + "% × " + sg(a) + " + " + (100 - wa) + "% × " + sg(b) + " = " + sg(r) + "."], d: R.uniq(sg(r), d) };
    }),
    tf("0.7-23", 2, [
      ["Diversifying across different industries helps more than owning many companies in one industry.", true, "Companies in one industry often suffer together."],
      ["Owning 50 airline stocks is well diversified.", false, "They share the same industry risks, like fuel prices and travel slumps."]]),
    mc("0.7-24", 2, [
      { q: "In a market crash, most stocks fall together. What happens to a well-diversified portfolio?", a: ["It usually falls too, because market-wide risk remains", "Diversification protects against single-company problems, not market-wide falls."],
        d: [["It's fully protected", "Diversification can't remove market-wide risk."], ["It rises, because the losses balance out", "When most things fall together, there's little to balance."]] }]),
    mc("0.7-25", 2, [
      { q: "An ad promises \"15% a month, guaranteed, no risk.\" What's the right reaction?", a: ["Treat it as a red flag and check it with official sources", "Regulators warn that guaranteed high returns are a hallmark of fraud."],
        d: [["Invest a little to test it", "Scams often pay early \"returns\" to build trust."], ["Trust it if the website looks professional", "Scam sites often look polished."]] }]),
    tf("0.7-26", 2, [
      ["Two investments that tend to move in opposite directions can balance each other out.", true, "When one is down, the other may be up, smoothing the total."],
      ["Investments that always move together give the most diversification.", false, "Moving together means they rise and fall together; that's the least diversification."]]),
    mc("0.7-27", 2, [
      { q: "Over time, which has usually offered the higher expected return, along with more risk?", a: ["Stocks", "Stocks' returns are less certain, so investors expect more from them on average."],
        d: [["Short-term government bonds", "They're much safer and usually return less."], ["Cash in a savings account", "Very safe, so it usually returns the least."]] }]),
    mc("0.7-28", 2, [
      { q: "Two portfolios: Kai owns one tech company. Rina owns 200 companies across many industries, including that tech company. The tech company falls 50% on bad news. Who is hurt more?", a: ["Kai", "It's all of Kai's portfolio but a tiny slice of Rina's."],
        d: [["Rina, because she owns more companies", "Owning more companies spreads out the damage."], ["Both equally", "The loss is a far smaller share of Rina's portfolio."]] }]),
    sc("0.7-29", 2, [
      { s: "Two friends each invest $1,000. Omar puts it all in one company, Ironbark Games. Priya splits it equally across 10 companies in different industries, one of which is Ironbark Games. Ironbark's new game flops and its stock falls 60%; the other nine don't move.",
        p: [{ q: "About how much does Omar lose?", a: ["$600", "60% of his whole $1,000."], d: [["$60", "That's Priya's loss."], ["$0", "All his money was in Ironbark."]] },
            { q: "About how much does Priya lose?", a: ["$60", "Ironbark is $100 of her $1,000; 60% of $100 is $60."], d: [["$600", "Only a tenth of her money was in Ironbark."], ["$6", "Too small: 60% of $100 is $60."]] },
            { q: "What did Priya's diversification do?", a: ["It cut the damage from one company's bad news", "That's single-company risk, which diversification reduces."], d: [["It guaranteed she couldn't lose", "She still lost $60."], ["It doubled her return", "Diversification spreads risk; it doesn't double returns."]] }] }]),

    // ---------- Level 3: Desk-level ----------
    tf("0.7-40", 3, [
      ["Market-wide risk that diversification can't remove is often called systematic risk.", true, "Single-company risk, which diversification reduces, is called idiosyncratic or specific risk."],
      ["Systematic risk is the risk of one company's factory burning down.", false, "That's company-specific risk. Systematic risk hits the whole market."]]),
    gen("0.7-41", 3, function (R) {
      var up = R.pick([20, 30, 40, 50]), dn = R.pick([10, 20, 30, 40]), e = (up - dn) / 2;
      return { q: "An investment has a 50% chance of returning +" + up + "% and a 50% chance of returning −" + dn + "%. What is its expected return?",
        a: [sg(e), "Half of +" + up + "% plus half of −" + dn + "% = " + sg(e) + "."],
        d: [["+" + up + "%", "That's only the good outcome."], [sg(up - dn), "That adds the outcomes without weighting them by their 50% chances."], ["0%, because it's 50/50", "Equal chances don't mean the outcomes cancel; their sizes differ."]].filter(function (x) { return x[0] !== sg(e); }) };
    }),
    mc("0.7-42", 3, [
      { q: "Why do investors care whether their holdings move together?", a: ["Holdings that move differently smooth the portfolio's swings", "The less they move together, the more diversification helps."],
        d: [["Holdings that move together are always safer", "Moving together concentrates risk."], ["It doesn't matter as long as you own 10 or more", "Ten holdings that all move together diversify little."]] }]),
    tf("0.7-43", 3, [
      ["A riskier investment doesn't guarantee a higher return; it offers a higher expected return along with a wider range of outcomes.", true, "Expected doesn't mean guaranteed: the bad outcomes are real."],
      ["Taking more risk guarantees a higher return over time.", false, "More risk means a higher expected return, not a guaranteed one."]]),
    mc("0.7-44", 3, [
      { q: "A desk manager says a trader's book is \"too concentrated.\" What does that mean?", a: ["Too much of the risk sits in one stock or one theme", "One piece of news could hit the whole book."],
        d: [["The trader owns too many different stocks", "That's the opposite of concentrated."], ["The trader has made too many trades today", "That's about activity, not concentration."]] }]),
    sc("0.7-45", 3, [
      { s: "A client owns 40 stocks, all large U.S. bank stocks. A banking scare hits and all 40 fall about 25% in a week, while the wider market falls 5%.",
        p: [{ q: "Was the client well diversified?", a: ["No: 40 stocks, but all in one industry facing the same risk", "Number of holdings isn't the point; different exposures are."], d: [["Yes: 40 stocks is plenty", "They all shared one industry's risk."], ["Yes, because banks are big companies", "Size doesn't remove industry risk."]] },
            { q: "Roughly how did the client do versus the wider market?", a: ["About 20 percentage points worse", "−25% versus −5%."], d: [["About the same", "−25% is much worse than −5%."], ["About 20 points better", "Falling 25% is worse than falling 5%."]] }] }]),
    mc("0.7-46", 3, [
      { q: "Which is the best description of \"risk\" in a professional setting?", a: ["How uncertain and widely spread the possible outcomes are", "Professionals measure risk as variability, not only losses."],
        d: [["How much a stock costs per share", "Price per share says nothing about risk."], ["Whether a stock went down last week", "One week's move doesn't define risk."]] }])
  ]);
})(window.P0Bank);
