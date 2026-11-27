/* Question bank, skill 1.5: Agency vs principal (D44, D49). Levels: 1 Foundation, 2 Applied, 3 Desk-level.
   Sources behind the facts: SEC Rule 10b-10 (confirmations disclose agent or principal capacity); FINRA Rule 2121 (fair prices
   and commissions); the Volcker Rule (limits banks' proprietary trading, permits market making for clients). */
(function (B) {
  var mc = B.mc, tf = B.tf, gen = B.gen, sc = B.sc;
  function c2(R, x) { return R.money(x, 2); }
  function r2(x) { return Math.round(x * 100) / 100; }
  B.add("1.5", [
    // ---------- Level 1: Foundation ----------
    tf("1.5-01", 1, [
      ["A broker acting as agent never owns the shares it trades for you.", true, "It finds the other side and charges a fee."],
      ["A broker acting as agent buys the shares for its own inventory first.", false, "That's acting as principal. An agent just finds the other side."]]),
    tf("1.5-02", 1, [
      ["A firm acting as principal trades with you from its own inventory.", true, "It is the other side of your trade."],
      ["A firm acting as principal only finds someone else to trade with you.", false, "That's acting as agent."]]),
    tf("1.5-03", 1, [
      ["A principal takes the risk that the price moves while it holds the shares.", true, "It owns them, so it gains or loses if the price moves."],
      ["An agent takes the risk that the shares' price falls.", false, "An agent never owns the shares, so it has no price risk on them."]]),
    mc("1.5-04", 1, [
      { q: "A real estate agent finds a buyer for your house and charges a fee. Which role is that like?", a: ["Acting as agent", "They find the other side for a fee and never own the house."],
        d: [["Acting as principal", "A principal would buy the house itself."], ["Being the buyer", "The agent found the buyer; it isn't one."]] },
      { q: "A used-car dealer buys your car, planning to resell it later. Which role is that like?", a: ["Acting as principal", "The dealer owns the car and carries the risk its value falls."],
        d: [["Acting as agent", "An agent would find a buyer without owning the car."], ["Charging a commission", "The dealer earns by reselling for more, not from a commission."]] }]),
    mc("1.5-05", 1, [
      { q: "How does a broker acting as agent mainly earn money?", a: ["A commission or fee", "It's paid for finding the other side and handling the trade."],
        d: [["Price moves in shares it owns", "An agent doesn't own the shares."], ["Dividends", "Dividends go to shareholders."]] },
      { q: "How does a dealer acting as principal mainly earn money?", a: ["The spread or a markup on the price", "It buys lower than it sells, and takes risk in between."],
        d: [["A commission on each trade", "That's how an agent is paid."], ["A share of the company's profit", "That's what shareholders get."]] }]),
    tf("1.5-06", 1, [
      ["A market maker selling you shares from its inventory is acting as principal.", true, "It's trading from its own book."],
      ["A market maker selling from its inventory is acting as agent.", false, "Trading from its own inventory is acting as principal."]]),
    mc("1.5-07", 1, [
      { q: "In an agency trade, who is on the other side of your trade?", a: ["Another investor the broker found", "The broker connects you; it isn't the other side."],
        d: [["The broker itself", "That would be a principal trade."], ["The stock exchange", "Exchanges match orders; they don't own the shares."]] }]),
    mc("1.5-08", 1, [
      { q: "In a principal trade, who is on the other side of your trade?", a: ["The dealer itself", "It trades from its own inventory."],
        d: [["Another client the dealer found", "That would be an agency trade."], ["The company that issued the shares", "Companies sell new shares in offerings, not in everyday trades."]] }]),
    tf("1.5-09", 1, [
      ["A trade confirmation must say whether the firm acted as agent or principal.", true, "U.S. rules (SEC Rule 10b-10) require that disclosure."],
      ["Firms never have to tell you whether they acted as agent or principal.", false, "Confirmations must disclose the firm's capacity."]]),
    mc("1.5-10", 1, [
      { q: "Which describes acting as principal?", a: ["The firm sold you shares it already owned", "Trading from its own inventory is acting as principal."],
        d: [["The firm found a seller for you and charged a commission", "That's acting as agent."], ["The firm only gave you a stock tip", "Advice isn't a trade."]] },
      { q: "Which describes acting as agent?", a: ["The firm found a buyer for your shares and charged a commission", "Finding the other side for a fee is acting as agent."],
        d: [["The firm bought your shares for its own account", "That's acting as principal."], ["The firm held your shares overnight to resell", "Holding them to resell is acting as principal."]] }]),
    tf("1.5-11", 1, [
      ["The same bank can act as agent on one trade and as principal on another.", true, "Banks' desks do both, depending on what the client needs."],
      ["A bank must choose to be only an agent or only a principal, forever.", false, "Banks' desks act in both capacities."]]),
    mc("1.5-12", 1, [
      { q: "A ticket website takes a fee to connect you with someone selling a ticket. Which role is the website playing?", a: ["Agent", "It connects buyer and seller for a fee and never owns the ticket."],
        d: [["Principal", "A principal would own the ticket and sell it to you."], ["Performer", "The performer isn't part of this trade."]] },
      { q: "A reseller buys 20 tickets on release day and sells them to you later. Which role is the reseller playing?", a: ["Principal", "They own the tickets and carry the risk that demand falls."],
        d: [["Agent", "An agent wouldn't own the tickets."], ["Exchange", "An exchange matches buyers and sellers; it doesn't hold tickets."]] }]),
    tf("1.5-13", 1, [
      ["A principal can lose money if the price moves against the shares it holds.", true, "That's the risk it takes to earn the spread."],
      ["A principal can never lose money because it earns the spread.", false, "If the price moves against its inventory, it can lose more than the spread."]]),
    mc("1.5-14", 1, [
      { q: "What is a markup?", a: ["The amount a dealer adds above the market price when it sells to you", "It's how a principal is paid when there's no commission."],
        d: [["A fee an agent charges per trade", "That's a commission."], ["A tax on stock trades", "A markup is the dealer's pay, not a tax."]] }]),
    mc("1.5-15", 1, [
      { q: "What is an agent paid for?", a: ["Finding the other side and handling the trade", "Its commission pays for that service."],
        d: [["Taking the risk that prices move", "That's what a principal is paid for."], ["Owning the shares", "Agents don't own the shares."]] }]),
    tf("1.5-16", 1, [
      ["Acting as agent means acting on a client's behalf.", true, "The agent works the client's order; the client keeps the trade."],
      ["Acting as agent means trading for the firm's own account.", false, "That's acting as principal."]]),

    // ---------- Level 2: Applied ----------
    gen("1.5-20", 2, function (R) {
      var px = R.int(2000, 8000) / 100, mu = R.pick([3, 5, 8, 10, 12]) / 100, n = R.pick([200, 500, 1000, 2000]), right = R.money(r2(mu * n), 2);
      return { q: "The market price is " + c2(R, px) + ". A dealer, acting as principal, sells you " + R.count(n) + " shares at " + c2(R, r2(px + mu)) + " with no commission. How much is the dealer's markup in total?",
        a: [right, c2(R, mu) + " a share × " + R.count(n) + " = " + right + "."],
        d: R.uniq(right, [[c2(R, mu), "That's per share."], ["Nothing: there was no commission", "The markup is built into the price."], [R.money(r2((px + mu) * n), 2), "That's what you paid, not the markup."]]) };
    }),
    gen("1.5-21", 2, function (R) {
      var c = R.pick([1, 2, 3, 4]), n = R.pick([1000, 2500, 5000, 10000, 20000]), right = R.money(c * n / 100, 2);
      return { q: "A broker acting as agent charges " + c + " cent" + (c > 1 ? "s" : "") + " a share. You buy " + R.count(n) + " shares. What is the commission?",
        a: [right, R.count(n) + " × $0.0" + c + " = " + right + "."],
        d: R.uniq(right, [[R.money(c * n, 2), "That treats cents as dollars."], [R.money(c * n / 1000, 2), "Check the decimals: " + c + (c > 1 ? " cents is" : " cent is") + " $0.0" + c + "."], ["$0.0" + c, "That's per share."]]) };
    }),
    gen("1.5-22", 2, function (R) {
      var n = R.pick([1000, 2000, 5000]), px = R.int(2000, 6000) / 100, c = R.pick([1, 2, 3]), agencyWins = Math.random() < 0.5;
      var aTot = r2(px * n + c * n / 100);
      var pDiff = agencyWins ? R.pick([2, 3, 4]) / 100 + c / 100 : (c / 100) - R.pick([1, 2]) / 100;
      if (!agencyWins && pDiff < 0) pDiff = 0;
      var pPx = r2(px + pDiff), pTot = r2(pPx * n);
      if (pTot === aTot) { pPx = r2(pPx + 0.01); pTot = r2(pPx * n); agencyWins = true; }
      agencyWins = aTot < pTot;
      var diff = R.money(r2(Math.abs(pTot - aTot)), 2);
      var aTxt = "The agency trade, by " + diff, pTxt = "The principal trade, by " + diff;
      return { q: "To buy " + R.count(n) + " shares: an agent can fill at " + c2(R, px) + " plus " + c + " cent" + (c > 1 ? "s" : "") + " a share commission, or a dealer can sell them to you as principal at " + c2(R, pPx) + " with no commission. Which is cheaper in total?",
        a: [agencyWins ? aTxt : pTxt, "Agency: " + R.money(aTot, 2) + ". Principal: " + R.money(pTot, 2) + ". Compare totals, not just commissions."],
        d: [[agencyWins ? pTxt : aTxt, "Agency: " + R.money(aTot, 2) + ". Principal: " + R.money(pTot, 2) + "."], ["They cost the same", "The totals differ: " + R.money(aTot, 2) + " vs " + R.money(pTot, 2) + "."], ["You can't tell: a principal's cost is hidden", "It's in the price, so you can compare totals."]] };
    }),
    gen("1.5-23", 2, function (R) {
      var n = R.pick([10000, 20000, 50000, 100000]), b = R.int(2000, 6000) / 100, up = Math.random() < 0.5, mv = R.pick([0.1, 0.2, 0.25, 0.4, 0.5]);
      var s = r2(up ? b + mv : b - mv), pl = r2((s - b) * n), right = (pl >= 0 ? "A gain of " : "A loss of ") + R.money(Math.abs(pl), 2);
      var wrong = (pl >= 0 ? "A loss of " : "A gain of ") + R.money(Math.abs(pl), 2);
      return { q: "Acting as principal, a bank buys " + R.count(n) + " shares from a client at " + c2(R, b) + ". It sells them over the next two days at an average of " + c2(R, s) + ". What did the position make or lose?",
        a: [right, "(" + c2(R, s) + " − " + c2(R, b) + ") × " + R.count(n) + " = " + R.money(pl, 2) + ". As principal, the bank carried that risk."],
        d: R.uniq(right, [[wrong, "Check the direction: it bought at " + c2(R, b) + " and sold at " + c2(R, s) + "."], ["Nothing: banks acting for clients can't lose", "A principal owns the shares and can gain or lose."], [(pl >= 0 ? "A gain of " : "A loss of ") + c2(R, mv), "That's per share."]]) };
    }),
    sc("1.5-24", 2, [
      { s: "A pension fund wants to sell 50,000 shares. Option A: the bank works the order through the day as agent for a commission. Option B: the bank buys all 50,000 now, at a price just below the market, as principal.",
        p: [{ q: "Which option is a principal trade?", a: ["Option B", "The bank buys the shares itself."], d: [["Option A", "In A the bank finds buyers for a commission."], ["Both", "Only B puts the shares on the bank's books."]] },
            { q: "In Option A, who carries the risk that the price falls during the day?", a: ["The pension fund", "In an agency trade the client keeps the price risk."], d: [["The bank", "The bank never owns the shares in A."], ["The exchange", "Exchanges don't carry that risk."]] },
            { q: "Why might the fund pick Option B anyway?", a: ["It's done now, at a known price", "Certainty is worth a small discount to some clients."], d: [["It always gets a higher price", "B's price is just below the market."], ["It has a bigger commission", "B has no commission; the cost is in the price."]] }] },
      { s: "A hedge fund wants to buy 80,000 shares fast. The bank offers to sell them all now from its own book at a little above the market, or to buy them in the market for the fund through the day for a commission.",
        p: [{ q: "Selling from its own book makes the bank…", a: ["A principal", "It's the other side of the fund's trade."], d: [["An agent", "An agent would find sellers instead."], ["A shareholder of the fund", "It's trading with the fund, not investing in it."]] },
            { q: "If the fund picks the commission route, the bank acts as…", a: ["Agent", "It works the order on the fund's behalf."], d: [["Principal", "It isn't selling from its own book."], ["Market maker for the fund", "It's finding sellers, not trading from inventory."]] }] }]),
    mc("1.5-25", 2, [
      { q: "Why might a client choose a principal trade for a big order?", a: ["The whole order is done right away, at a known price", "The dealer takes the risk of working it."],
        d: [["Principal trades are always cheaper", "The dealer's pay is in the price, and can cost more."], ["The client keeps the risk of the price moving", "That's agency; with principal the dealer takes it."]] }]),
    mc("1.5-26", 2, [
      { q: "Why might a client prefer an agency trade?", a: ["The broker isn't on the other side, so its job is just to get the best price", "There's no inventory of its own to sell you."],
        d: [["The broker guarantees the price", "Agents seek the best price but don't guarantee it."], ["Agency trades never have any cost", "Agents charge commissions."]] }]),
    tf("1.5-27", 2, [
      ["While an agency order is being worked, the client keeps the risk that the price moves.", true, "The broker never owns the shares."],
      ["A broker acting as agent repays the client if the price moves while it works the order.", false, "The client keeps the price risk in an agency trade."]]),
    mc("1.5-28", 2, [
      { q: "Firm X bought 500 shares from you for its own account. How did Firm X act?", a: ["As principal", "It bought them itself."],
        d: [["As agent", "An agent would have found another buyer."], ["As an exchange", "Exchanges don't buy shares for their own account."]] },
      { q: "Firm Y matched your sell order with another client's buy order and charged each of you a commission. How did Firm Y act?", a: ["As agent", "It brought two clients together and never owned the shares."],
        d: [["As principal", "It didn't trade from its own inventory."], ["As the company issuing the shares", "No new shares were issued."]] }]),
    gen("1.5-29", 2, function (R) {
      var px = R.int(1500, 6000) / 100, md = R.pick([4, 5, 6, 10]) / 100, n = R.pick([300, 500, 1000, 2000]), right = R.money(r2(md * n), 2);
      return { q: "The market price is " + c2(R, px) + ". You sell " + R.count(n) + " shares to a dealer acting as principal, at " + c2(R, r2(px - md)) + " and no commission. How much is the dealer's markdown in total?",
        a: [right, "A markdown is a dealer paying below the market when it buys: " + c2(R, md) + " × " + R.count(n) + " = " + right + "."],
        d: R.uniq(right, [[c2(R, md), "That's per share."], [R.money(r2((px - md) * n), 2), "That's what you received, not the markdown."], ["Nothing: there was no commission", "The dealer's pay is in the lower price."]]) };
    }),
    tf("1.5-30", 2, [
      ["A dealer that buys from you below the market price is charging a markdown.", true, "It's the dealer's pay on a principal purchase."],
      ["A markdown is a discount the dealer gives you on a purchase.", false, "A markdown is what a dealer earns by paying you less than the market when it buys."]]),
    mc("1.5-31", 2, [
      { q: "Once an agent has charged its commission, does it still have to try to get you a good price?", a: ["Yes: brokers have a duty to seek the best execution reasonably available", "The commission pays for that effort."],
        d: [["No: the commission ends its duties", "Best execution applies to how the order is handled."], ["Only if you ask in writing", "The duty applies to every customer order."]] }]),
    mc("1.5-32", 2, [
      { q: "A dealer fills your buy order from its inventory at the best offer and charges no commission. How does it earn?", a: ["From the spread, since it bought the shares lower", "A principal earns the spread or a markup."],
        d: [["It doesn't earn anything", "Dealers are paid through the price."], ["From a hidden commission", "Its pay is the spread, which is part of the price."]] }]),
    gen("1.5-33", 2, function (R) {
      var bid = R.int(2000, 6000) / 100, sp = R.pick([2, 3, 4, 5]) / 100, n = R.pick([500, 1000, 2000, 5000]), right = R.money(r2(sp * n), 2);
      return { q: "Acting as principal, a dealer buys " + R.count(n) + " shares from one client at " + c2(R, bid) + " and, a minute later, sells " + R.count(n) + " to another client at " + c2(R, r2(bid + sp)) + ". The price didn't move in between. What did it earn?",
        a: [right, c2(R, sp) + " spread × " + R.count(n) + " = " + right + "."],
        d: R.uniq(right, [[c2(R, sp), "That's per share."], [R.money(r2(sp * n * 2), 2), "It earned the spread once on the pair of trades, not twice."], ["Nothing, because it ended with no shares", "It bought low and sold higher; that's the spread."]]) };
    }),
    tf("1.5-34", 2, [
      ["A principal trade can show no commission and still have a cost built into the price.", true, "The dealer's pay is the spread or markup."],
      ["If a trade has no commission, it cost you nothing.", false, "A principal's pay is built into the price."]]),

    // ---------- Level 3: Desk-level ----------
    tf("1.5-40", 3, [
      ["In a riskless principal trade, the firm buys in the market after getting your order and sells to you right away, so it holds almost no risk.", true, "It's recorded as principal, but the two trades offset."],
      ["A riskless principal trade means the firm holds the shares for weeks before selling to you.", false, "In riskless principal, the offsetting trades happen almost at once."]]),
    mc("1.5-41", 3, [
      { q: "A portfolio manager asks a bank for a \"risk bid\" on 200,000 shares. What is being asked for?", a: ["A price at which the bank will buy the whole block itself, now", "The bank takes the block as principal and the risk with it."],
        d: [["A forecast of whether the stock will rise", "A risk bid is a price to trade, not a forecast."], ["A commission rate for working the order", "That would be an agency arrangement."]] }]),
    gen("1.5-42", 3, function (R) {
      var n = R.pick([100000, 200000, 250000, 500000]), px = R.int(2000, 8000) / 100, d = R.pick([1, 1.5, 2, 3]);
      var bid = r2(px * (1 - d / 100)), cost = r2((px - bid) * n), right = R.money(cost, 0);
      return { q: "A stock last traded at " + c2(R, px) + ". A bank offers a risk bid for a client's " + R.count(n) + " shares at " + c2(R, bid) + ", about " + d + "% below. How much less does the client receive than " + R.count(n) + " shares × " + c2(R, px) + "?",
        a: [right, "(" + c2(R, px) + " − " + c2(R, bid) + ") × " + R.count(n) + " = " + right + ". That's the price of handing the risk to the bank."],
        d: R.uniq(right, [[c2(R, r2(px - bid)), "That's per share."], [R.money(r2(bid * n), 0), "That's what the client receives, not the discount."], ["Nothing: risk bids are free", "The client gives up the discount in exchange for certainty."]]) };
    }),
    gen("1.5-43", 3, function (R) {
      var n = R.pick([100000, 200000, 300000]), b = R.int(2000, 6000) / 100, up = Math.random() < 0.5, mv = R.pick([0.15, 0.3, 0.45, 0.6]);
      var s = r2(up ? b + mv : b - mv), pl = r2((s - b) * n), right = up ? "A profit of " + R.money(pl, 0) : "A loss of " + R.money(-pl, 0);
      return { q: "A bank takes a " + R.count(n) + "-share block onto its book at " + c2(R, b) + " with a risk bid. Over two days it sells the block at an average of " + c2(R, s) + ". Ignoring any hedges, what was the result?",
        a: [right, "(" + c2(R, s) + " − " + c2(R, b) + ") × " + R.count(n) + ". The bank, as principal, carried the price risk."],
        d: R.uniq(right, [[up ? "A loss of " + R.money(pl, 0) : "A profit of " + R.money(-pl, 0), "Check the direction: it bought at " + c2(R, b) + "."], ["No result: the client keeps the risk", "With a risk bid the bank owns the block."], [(up ? "A profit of " : "A loss of ") + c2(R, mv), "That's per share."]]) };
    }),
    mc("1.5-44", 3, [
      { q: "What does the U.S. Volcker Rule limit banks from doing?", a: ["Trading just to bet the bank's own money (proprietary trading), while still allowing market making for clients", "Serving clients as principal is allowed; betting for the bank isn't."],
        d: [["Acting as principal for clients in any way", "Market making for clients is allowed."], ["Charging commissions", "The rule doesn't ban commissions."]] }]),
    tf("1.5-45", 3, [
      ["A bank that takes a block as principal usually hedges it or sells it down quickly to reduce risk.", true, "The aim is to serve the client, not to hold a bet."],
      ["A bank taking a client's block as principal plans to hold it for years as an investment.", false, "Desks usually hedge and sell down inventory quickly."]]),
    mc("1.5-46", 3, [
      { q: "Why is a bank's risk bid usually below the market price?", a: ["To pay the bank for the price risk and the impact of selling the block", "The discount is the bank's pay for taking the risk."],
        d: [["Because the bank expects the company to fail", "It's about the risk of holding and selling a block, not a forecast."], ["Because rules require a fixed 5% discount", "There's no fixed discount; it depends on size and risk."]] }]),
    mc("1.5-47", 3, [
      { q: "Why might a client be careful when its broker acts as principal?", a: ["The broker is on the other side, so the higher you pay, the more it earns", "That's why confirmations disclose capacity and rules require fair prices."],
        d: [["Principal trades are illegal for retail clients", "They're allowed, with disclosure and fair-price rules."], ["The client keeps all the price risk", "In a principal trade, the dealer takes the risk."]] }]),
    sc("1.5-48", 3, [
      { s: "A fund must sell 500,000 shares of a $40 stock that trades about 2 million shares a day. The bank offers a risk bid 2% below the last price, or an agency order worked over two days for a commission.",
        p: [{ q: "About what share of a day's volume is the order?", a: ["25%", "500,000 ÷ 2,000,000 = 25%."], d: [["2.5%", "That would be 50,000 shares."], ["250%", "That would be 5 million shares."]] },
            { q: "About how much does the risk bid's discount cost the fund?", a: ["$400,000", "2% of $40 is $0.80; × 500,000 = $400,000."], d: [["$40,000", "Check the multiplication: $0.80 × 500,000."], ["$0.80", "That's per share."]] },
            { q: "With the agency order, who carries the risk if the stock drops over the two days?", a: ["The fund", "In agency, the client keeps the price risk."], d: [["The bank", "The bank never owns the shares in an agency order."], ["No one", "Someone always carries the price risk."]] }] }]),
    tf("1.5-49", 3, [
      ["In an agency cross, a firm matches two clients' opposite orders and acts as agent for both.", true, "It never owns the shares; it brings the two sides together."],
      ["In an agency cross, the firm buys the shares for its own inventory first.", false, "That would be principal trading; a cross matches two clients directly."]]),
    mc("1.5-50", 3, [
      { q: "Your confirmation shows capacity \"Principal\" and no commission. What does that tell you?", a: ["The firm traded with you from its own account, and its pay is in the price", "A principal earns through a markup, markdown or spread."],
        d: [["The trade was free", "The firm's pay is built into the price."], ["The firm found another investor for you", "That would be capacity \"Agent\"."]] }]),
    tf("1.5-51", 3, [
      ["Whether a firm acts as agent or principal changes who carries the price risk, even at the same price.", true, "Agency leaves the risk with the client; principal moves it to the firm."],
      ["Agent or principal makes no difference to who carries the risk.", false, "The principal owns the shares and the risk; an agent doesn't."]])
  ]);
})(window.P0Bank);
