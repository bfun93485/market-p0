/* Question bank, skill 0.5: Stocks vs bonds (D44). Levels: 1 Foundation, 2 Applied, 3 Desk-level. */
(function (B) {
  var mc = B.mc, tf = B.tf, gen = B.gen, sc = B.sc;
  B.add("0.5", [
    // ---------- Level 1: Foundation ----------
    tf("0.5-01", 1, [
      ["A stock makes you an owner; a bond makes you a lender.", true, "Owning versus lending is the core difference."],
      ["Buying a bond makes you a part-owner of the company.", false, "A bond is a loan. You're owed interest and your money back, but you don't own the company."]]),
    tf("0.5-02", 1, [
      ["A bond's issuer promises to pay interest and repay the amount borrowed on a set date.", true, "That promise is what makes a bond a loan."],
      ["A stock promises its owner a fixed payment every year.", false, "Stocks come with no promised payment; owners share in profits and losses."]]),
    mc("0.5-03", 1, [
      { q: "Which of these is a loan to a company?", a: ["A bond", "Bondholders lend money and are promised interest and repayment."],
        d: [["A share of stock", "A share is ownership, not a loan."], ["A dividend", "A dividend is a payment to shareholders, not a loan."]] },
      { q: "Which of these makes you a part-owner of a company?", a: ["A share of stock", "Shares are slices of ownership."],
        d: [["A bond", "A bond makes you a lender."], ["A savings account at a bank", "That's a deposit with the bank, not ownership of a company."]] }]),
    tf("0.5-04", 1, [
      ["If a company fails, its lenders are paid before its owners.", true, "Lenders stand first in line; owners get whatever is left, often nothing."],
      ["If a company fails, its shareholders are paid back first.", false, "Shareholders are last in line, after lenders."]]),
    mc("0.5-05", 1, [
      { q: "Who can issue bonds?", a: ["Both companies and governments", "Governments borrow with bonds too, such as U.S. Treasury bonds."],
        d: [["Only companies", "Governments issue bonds as well."], ["Only banks", "Many kinds of borrowers issue bonds."]] }]),
    mc("0.5-06", 1, [
      { q: "You lend the lemonade stand $100 at 5% a year. What do you get each year?", a: ["$5, in a sunny or a rainy summer, unless the stand can't pay", "A lender gets the promised interest either way."],
        d: [["Nothing in a rainy summer", "The interest is promised whatever the weather, as long as the stand can pay."], ["A share of the profits", "Lenders get interest, not profits."]] },
      { q: "You own 10% of the lemonade stand. What do you get each year?", a: ["A share of the profits: maybe a lot, maybe nothing", "Owners share in good and bad years."],
        d: [["A fixed $5 every year", "That's what a lender gets."], ["Your money back plus interest, guaranteed", "Owners have no such guarantee."]] }]),
    tf("0.5-07", 1, [
      ["A company's bonds are usually less risky than its stock.", true, "Bondholders have a promise and are paid first if things go wrong."],
      ["A company's stock is usually safer than its bonds.", false, "Stock is riskier: no promised payments and last in line."]]),
    mc("0.5-08", 1, [
      { q: "Why do stockholders expect a higher return over time than bondholders?", a: ["Because they take more risk", "More risk has to come with a chance of more reward, or no one would take it."],
        d: [["Because they're paid first", "Shareholders are paid last."], ["Because the law guarantees it", "Nothing guarantees returns."]] }]),
    tf("0.5-09", 1, [
      ["Bonds can lose value too.", true, "For example, if the borrower can't pay. Less risky doesn't mean risk-free."],
      ["Bonds are guaranteed never to lose money.", false, "Bonds can lose value, for example if the borrower can't pay."]]),
    mc("0.5-10", 1, [
      { q: "What is the interest on a bond?", a: ["What the borrower pays for using the lender's money", "It's the lender's reward for lending."],
        d: [["The lender's share of profits", "Lenders get interest, not profits."], ["A fee the lender pays to own the bond", "The borrower pays the interest, not the lender."]] }]),
    mc("0.5-11", 1, [
      { q: "What happens on a bond's maturity date?", a: ["The borrower repays the amount borrowed", "Maturity is when the loan ends and the money comes back."],
        d: [["The bond turns into stock", "Ordinary bonds don't turn into stock."], ["The interest rate doubles", "The interest rate is set when the bond is issued."]] }]),
    tf("0.5-12", 1, [
      ["Bondholders usually vote at shareholder meetings.", false, "Voting rights come with ownership, not with lending."],
      ["Shareholders usually vote; bondholders usually don't.", true, "Owners have a say; lenders have a promise."]]),
    mc("0.5-13", 1, [
      { q: "A U.S. Treasury bond is a loan to…", a: ["The U.S. government", "Treasuries are how the U.S. government borrows."],
        d: [["The New York Stock Exchange", "The NYSE doesn't borrow through Treasuries."], ["A big bank", "Treasuries are government debt, not bank debt."]] }]),
    tf("0.5-14", 1, [
      ["If a company's profits triple, its bondholders get triple the interest.", false, "Bond interest is fixed by the promise. Owners get the upside."],
      ["If a company's profits triple, shareholders may benefit; bondholders still get the same promised interest.", true, "Lenders' payments don't grow with profits."]]),
    mc("0.5-15", 1, [
      { q: "Which investor shares in a company's profits and losses?", a: ["The shareholder", "Owners share in the good and the bad."],
        d: [["The bondholder", "Bondholders get promised interest, not profits."], ["Neither", "Shareholders do."]] }]),

    // ---------- Level 2: Applied ----------
    gen("0.5-20", 2, function (R) {
      var F = R.pick([1000, 2000, 5000, 10000]), c = R.pick([2, 3, 4, 5, 6, 7]), i = F * c / 100;
      return { q: "A " + R.money(F, 0) + " bond pays " + c + "% interest a year. How much interest does it pay each year?",
        a: [R.money(i, 0), c + "% of " + R.money(F, 0) + " = " + R.money(i, 0) + "."],
        d: [[R.money(F * c, 0), "That multiplies by " + c + " instead of " + c + "%."], [R.money(i / 10, 0), "Ten times too small. " + c + "% of " + R.money(F, 0) + " is " + R.money(i, 0) + "."], [R.money(F + i, 0), "That adds the amount borrowed; the yearly interest alone is " + R.money(i, 0) + "."]] };
    }),
    gen("0.5-21", 2, function (R) {
      var F = 1000, c = R.pick([3, 4, 5, 6]), n = R.pick([2, 3, 5, 10]), i = F * c / 100, tot = F + i * n;
      return { q: "You buy a newly issued " + R.money(F, 0) + " bond paying " + c + "% a year for " + n + " years, and hold it to maturity. If the borrower pays as promised, how much do you receive in total?",
        a: [R.money(tot, 0), n + " years × " + R.money(i, 0) + " interest = " + R.money(i * n, 0) + ", plus the " + R.money(F, 0) + " repaid at maturity = " + R.money(tot, 0) + "."],
        d: [[R.money(i * n, 0), "That's the interest only; you also get the " + R.money(F, 0) + " back."], [R.money(F, 0), "That's only the repayment; you also get " + n + " years of interest."], [R.money(F + i, 0), "That counts only one year of interest."]] };
    }),
    gen("0.5-22", 2, function (R) {
      var L = R.pick([40, 50, 60, 80, 100]), X; do { X = R.pick([20, 30, 50, 70, 90, 120, 150]); } while (X === L);
      var askOwners = Math.random() < 0.5, toLenders = Math.min(X, L), toOwners = Math.max(0, X - L);
      var why = "Lenders are paid first: " + R.money(toLenders, 0) + " million to lenders, leaving " + R.money(toOwners, 0) + " million for shareholders.";
      var right = askOwners ? toOwners : toLenders, pool = [0, X, L, X - L > 0 ? X - L : L - X, Math.round(X / 2)];
      var d = []; pool.forEach(function (v) { if (v !== right && d.indexOf(v) < 0 && v >= 0) d.push(v); });
      return { q: "A company shuts down with " + R.money(X, 0) + " million left after selling everything. It owes lenders " + R.money(L, 0) + " million. How much do " + (askOwners ? "shareholders" : "lenders") + " get?",
        a: [R.money(right, 0) + " million", why], d: d.slice(0, 3).map(function (v) { return [R.money(v, 0) + " million", why]; }) };
    }),
    tf("0.5-23", 2, [
      ["When a company does very well, bondholders get the promised interest while shareholders can gain much more.", true, "Lenders' upside is capped by the promise; owners' isn't."],
      ["When a company does very well, bondholders and shareholders gain the same amount.", false, "Bondholders get only the promised interest."]]),
    mc("0.5-24", 2, [
      { q: "Which usually offers the more predictable payments?", a: ["A bond from a financially strong borrower", "Its interest and repayment are promised and likely to be paid."],
        d: [["Shares in a young, fast-growing company", "Shares come with no promised payments."], ["They're always equally predictable", "Promised payments are more predictable than uncertain profits."]] }]),
    mc("0.5-25", 2, [
      { q: "Why do lenders accept a lower expected return than owners?", a: ["They get a promise and stand first in line", "Less risk, so less expected reward."],
        d: [["Lenders get voting rights", "Lenders usually don't vote."], ["Lenders share in all the profits", "That's owners, not lenders."]] }]),
    tf("0.5-26", 2, [
      ["A company that misses a promised bond payment is in default.", true, "Default is breaking the borrowing promise."],
      ["A company can skip bond interest in a bad year with no consequences.", false, "Missing promised payments is a default, with serious consequences."]]),
    tf("0.5-27", 2, [
      ["Companies can cut or skip dividends, but bond interest is a promise.", true, "Dividends are a choice; interest is an obligation."],
      ["Dividends are a promised payment, just like bond interest.", false, "Dividends are paid at the company's choice."]]),
    mc("0.5-28", 2, [
      { q: "Which pair correctly matches each investment with what it gives you?", a: ["Stock: ownership and a share of profits. Bond: interest and repayment.", "Owners share in results; lenders get a promise."],
        d: [["Stock: interest and repayment. Bond: ownership.", "That's swapped."], ["Both: ownership and a vote", "Only stock gives ownership and, usually, a vote."]] }]),
    sc("0.5-29", 2, [
      { s: "Two friends fund a lemonade stand for one summer. Ana lends it $100 at 5%. Ben pays $100 for 10% ownership.",
        p: [{ q: "In a hot summer the stand makes $2,000 of profit. What does Ana, the lender, get?", a: ["$5 interest plus her $100 back", "A lender gets what was promised, however good the summer."], d: [["$200, 10% of the profit", "That's an owner's claim, not a lender's."], ["Nothing until next year", "Her interest and repayment are due as promised."]] },
            { q: "What is Ben's 10% claim on that profit?", a: ["$200", "10% of $2,000."], d: [["$5", "That's Ana's interest."], ["$100", "That's what Ben put in, not his share of the profit."]] },
            { q: "In a rainy summer the stand earns nothing but can still pay its debts. Who is better off?", a: ["Ana: she still gets her $5 and $100 back", "The lender's promise holds; the owner shares the bad summer."], d: [["Ben", "Owners share in losses."], ["Both equally", "The promise protects Ana, not Ben."]] }] },
      { s: "The lemonade stand fails at the end of the summer. After selling its jugs and stand it has $60. It owes Ana, the lender, $105. Ben owns 10%.",
        p: [{ q: "How much does Ana get?", a: ["$60", "Lenders are paid first, but only what's there."], d: [["$105", "There's only $60 to pay with."], ["$6", "That's 10% of $60, an owner's way of splitting it."]] },
            { q: "How much does Ben get?", a: ["Nothing", "Owners are last in line, and nothing is left after the lender."], d: [["$6, his 10% of the $60", "Lenders must be paid in full before owners get anything."], ["$100, his money back", "Owners have no promise of repayment."]] }] }]),

    // ---------- Level 3: Desk-level ----------
    tf("0.5-40", 3, [
      ["When interest rates rise, the prices of existing bonds usually fall.", true, "New bonds pay more, so older, lower-paying bonds are worth less to buyers."],
      ["When interest rates rise, existing bonds become more valuable.", false, "Rising rates make existing, lower-paying bonds less attractive, so their prices fall."]]),
    mc("0.5-41", 3, [
      { q: "A bond pays 3% a year. Similar new bonds now pay 5%. What happens to the old bond's price?", a: ["It falls, so buying it can compete with the new 5% bonds", "Buyers will only take 3% payments if they pay less for them."],
        d: [["It rises", "Its fixed payments look worse next to 5%, so it's worth less."], ["It stays at its original price", "Bond prices move as rates change."]] },
      { q: "A bond pays 6% a year. Similar new bonds now pay only 4%. What happens to the old bond's price?", a: ["It rises, because its payments beat the new bonds'", "Buyers will pay more for the higher fixed payments."],
        d: [["It falls", "Its payments now look better than new bonds', so it's worth more."], ["It stays at its original price", "Bond prices move as rates change."]] }]),
    tf("0.5-42", 3, [
      ["Credit ratings grade how likely a borrower is to pay its debts.", true, "Agencies such as S&P, Moody's and Fitch rate bonds; lower ratings mean more risk."],
      ["A higher credit rating means a bond must pay more interest.", false, "Usually the opposite: riskier, lower-rated borrowers must pay more interest."]]),
    mc("0.5-43", 3, [
      { q: "Which usually pays the higher interest rate?", a: ["A bond from a financially shaky company", "Lenders demand more interest for more risk of not being paid."],
        d: [["A U.S. Treasury bond", "The U.S. government is seen as a very safe borrower, so it pays less."], ["They always pay the same", "Rates depend on the borrower's risk."]] }]),
    gen("0.5-44", 3, function (R) {
      var L, X; do { L = R.pick([100, 200, 300]); X = L + R.pick([50, 100, 150, 200]); } while (X === 2 * L); // keeps the choices distinct
      var sh = R.pick([10, 20, 25, 50]), left = X - L, per = left / sh;
      return { q: "A company is sold for " + R.money(X, 0) + " million. It owes lenders " + R.money(L, 0) + " million and has " + sh + " million shares. Roughly how much is left for each share?",
        a: [R.money(per, 2), "Lenders first: " + R.money(X, 0) + "M − " + R.money(L, 0) + "M = " + R.money(left, 0) + "M for owners, ÷ " + sh + "M shares = " + R.money(per, 2) + " a share."],
        d: [[R.money(X / sh, 2), "That forgets to pay the lenders first."], [R.money(L / sh, 2), "That's the debt per share, not what's left for owners."], [R.money(per * 10, 2), "Ten times too much. Check the millions."]] };
    }),
    mc("0.5-45", 3, [
      { q: "A company's stock falls 60% on bad news, but it can still clearly pay its debts. What typically happens to its bonds?", a: ["They fall much less, because the promise still looks likely to be kept", "Bondholders care mainly about getting paid; owners feel the full hit."],
        d: [["They fall exactly 60% too", "Bonds and stocks don't move one-for-one."], ["They rise 60%", "Bad news doesn't make the loan more valuable."]] }]),
    sc("0.5-46", 3, [
      { s: "Granite Freight has both stock and bonds held by investors. A recession hits; its profits drop sharply, but so far it keeps paying its bond interest.",
        p: [{ q: "Which is likely to fall more in price?", a: ["The stock", "Owners take the profit drop directly; lenders still get paid."], d: [["The bonds", "The bond promise is still being kept."], ["They fall by the same amount", "They carry different risks."]] },
            { q: "Months later, Granite misses a bond interest payment. What is that called?", a: ["A default", "Breaking a borrowing promise is a default."], d: [["A dividend cut", "Dividends are owner payments; this is a missed loan payment."], ["A stock split", "A split changes share counts; it has nothing to do with debt."]] }] }]),
    // ---------- Top-up to 50 families (D44) ----------
    mc("0.5-50", 1, [
      { q: "What is a bond's face value?", a: ["The amount the borrower repays at maturity", "Also called par or principal."],
        d: [["The interest it pays each year", "That's the coupon."], ["What the bond trades for today", "That's its market price, which can differ from face value."]] }]),
    tf("0.5-51", 1, [
      ["A bond's \"coupon\" is the interest it pays.", true, "The name comes from paper bonds whose coupons were clipped and cashed."],
      ["A bond's coupon is a discount voucher for the issuer's products.", false, "It's the interest payment."]]),
    gen("0.5-52", 2, function (R) {
      var F = R.pick([1000, 2000, 5000]), c = R.pick([2, 2.5, 3, 4, 4.5, 5, 6]), I = F * c / 100;
      var right = c + "%";
      return { q: "A " + R.money(F, 0) + " bond pays " + R.money(I, 2) + " of interest a year. What is its coupon rate?",
        a: [right, R.money(I, 2) + " ÷ " + R.money(F, 0) + " = " + c + "%."],
        d: R.uniq(right, [[(c * 10) + "%", "Ten times too high; check the division."], [(c / 10) + "%", "Ten times too low; check the division."], [(c * 2) + "%", "That doubles the payment."]]) };
    }),
    tf("0.5-53", 2, [
      ["A bond with 10 years left usually swings more in price when interest rates change than one with 1 year left.", true, "It locks in its rate for longer, so rate changes matter more."],
      ["Short-term bonds move more in price than long-term bonds when rates change.", false, "Long-term bonds usually move more."]]),
    mc("0.5-54", 2, [
      { q: "Which is the riskiest loan for a lender?", a: ["Lending to a company already struggling to pay its bills", "The bigger the chance of not being repaid, the riskier the loan."],
        d: [["Lending to the U.S. government", "Seen as one of the safest borrowers."], ["Lending to a profitable company with little debt", "Strong finances make repayment likely."]] }]),
    mc("0.5-55", 2, [
      { q: "A company has $100 million available this year and owes $20 million of interest. Who must be paid?", a: ["Lenders, their $20 million of interest", "Interest is an obligation; dividends to owners are optional."],
        d: [["Shareholders first, with a dividend", "Dividends are optional and come after obligations."], ["Whoever asks first", "Obligations to lenders come before payouts to owners."]] }]),
    gen("0.5-56", 3, function (R) {
      var c = R.pick([2, 3, 4, 5, 6, 7]), r; do { r = R.pick([2, 3, 4, 5, 6, 7]); } while (r === c);
      var rises = r < c;
      return { q: "You own a bond paying " + c + "% a year. Similar new bonds now pay " + r + "%. What happens to your bond's market price?",
        a: rises ? ["It rises", "Its " + c + "% payments beat the new " + r + "%, so buyers will pay more for it."] : ["It falls", "Its " + c + "% payments trail the new " + r + "%, so buyers will only take it at a lower price."],
        d: [rises ? ["It falls", "It pays more than new bonds, so it's worth more, not less."] : ["It rises", "It pays less than new bonds, so it's worth less."], ["It stays exactly at face value", "Bond prices move as rates change."]] };
    }),
    tf("0.5-57", 3, [
      ["U.S. Treasury bonds are among the safest bonds, because the U.S. government is very likely to pay.", true, "That's why they're a benchmark for low-risk lending."],
      ["U.S. Treasury bond prices never change.", false, "Their prices move with interest rates."]]),
    mc("0.5-58", 3, [
      { q: "What are \"junk bonds\", also called high-yield bonds?", a: ["Bonds from riskier borrowers that pay higher interest", "Lower credit ratings mean more risk, so lenders demand more interest."],
        d: [["Bonds that pay no interest at all", "Those are zero-coupon bonds, which pay at maturity instead."], ["Bonds only governments issue", "Junk bonds usually come from riskier companies."]] }]),
    tf("0.5-59", 2, [
      ["Many bonds pay their interest on a fixed schedule, such as every six months.", true, "U.S. Treasury notes and bonds, for example, pay twice a year."],
      ["Every bond pays all of its interest in one lump at the end.", false, "Most pay regularly; zero-coupon bonds are the exception, selling at a discount instead."]]),
    sc("0.5-60", 3, [
      { s: "You hold a $1,000 bond paying 4% a year with 5 years left. Overnight, interest rates jump and similar new bonds pay 6%.",
        p: [{ q: "What happens to your bond's market price?", a: ["It falls", "Buyers can get 6% elsewhere, so they'll pay less for 4%."], d: [["It rises", "Higher new rates make your bond less attractive."], ["It stays at $1,000", "Bond prices move when rates change."]] },
            { q: "If you hold it to maturity and the issuer pays as promised, what do you get?", a: ["$40 a year, then $1,000 back", "The promise doesn't change; only the market price did."], d: [["$60 a year", "Your bond's coupon is fixed at 4%."], ["Less than $1,000 back, because rates rose", "You're repaid the full face value at maturity."]] }] }])
  ]);
})(window.P0Bank);
