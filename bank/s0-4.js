/* Question bank, skill 0.4: Exchanges and who trades (D44). Levels: 1 Foundation, 2 Applied, 3 Desk-level.
   Off-exchange share: Cboe, 2025 U.S. Equities Year in Review (Jan 2026), as cited in the lesson card. */
(function (B) {
  var mc = B.mc, tf = B.tf, gen = B.gen, sc = B.sc;
  var WHO = [ // [name, description shown in the question, what it does]
    ["Pension fund", "manages retirement savings for a company's or a government's workers", "manages workers' retirement savings"],
    ["Mutual fund", "pools money from many savers and invests it for them", "pools many savers' money and invests it"],
    ["Hedge fund", "a private fund for wealthy and institutional investors that can also bet on prices falling", "is a private fund for wealthy investors that can also bet on falls"],
    ["Insurance company", "invests the premiums its customers pay until it needs to pay claims", "invests customers' premiums until claims are due"],
    ["Retail investor", "an individual investing their own money through an app or broker", "is an individual investing their own money"],
    ["Market maker", "a professional firm that stands ready to buy and sell all day, quoting both a bid and an ask", "stands ready to buy and sell all day"],
    ["Bank sales and trading desk", "a bank team that helps funds and insurers buy and sell, often in large amounts", "helps funds and insurers buy and sell"]];
  function an(name) { return (/^[AEIOU]/.test(name) ? "An " : "A ") + name.toLowerCase(); }
  B.add("0.4", [
    // ---------- Level 1: Foundation ----------
    tf("0.4-01", 1, [
      ["A stock exchange is a regulated marketplace where buy and sell orders meet.", true, "Like a farmers' market for shares: many buyers and sellers, one set of rules."],
      ["A stock exchange owns all the shares listed on it.", false, "Investors own the shares. The exchange runs the marketplace."]]),
    mc("0.4-02", 1, [
      { q: "Which of these is a U.S. stock exchange?", a: ["Nasdaq", "Nasdaq and the New York Stock Exchange are the best known U.S. exchanges."],
        d: [["The SEC", "The SEC regulates markets; it isn't an exchange."], ["The Federal Reserve", "The Fed is the central bank; it isn't an exchange."]] },
      { q: "Which of these is a U.S. stock exchange?", a: ["The New York Stock Exchange", "The NYSE is one of the best known exchanges in the world."],
        d: [["FINRA", "FINRA oversees brokers; it isn't an exchange."], ["The U.S. Treasury", "The Treasury manages government finances; it isn't an exchange."]] }]),
    mc("0.4-03", 1, [
      { q: "A stock exchange is most like…", a: ["A farmers' market: many sellers, many shoppers, one set of rules", "Lots of orders meet in one place under common rules."],
        d: [["A single shop that sets all the prices", "Exchanges don't set prices; buyers and sellers do."], ["A bank vault that stores shares", "Exchanges are marketplaces, not storage."]] }]),
    tf("0.4-04", 1, [
      ["Retail investors are individuals investing their own money.", true, "Typically through apps and brokers."],
      ["Retail investors are large funds managing other people's money.", false, "Those are institutions. Retail investors are individuals."]]),
    mc("0.4-05", 1, [
      { q: "Which of these is an institutional investor?", a: ["A pension fund", "Institutions invest large pools of other people's money."],
        d: [["A student buying 2 shares on an app", "That's a retail investor."], ["A customer buying the company's products", "Customers aren't investors at all."]] },
      { q: "Which of these is an institutional investor?", a: ["An insurance company", "Insurers invest the premiums they collect."],
        d: [["A nurse saving through an investing app", "That's a retail investor."], ["A shop that sells phones", "That's a business, not an investor."]] }]),
    mc("0.4-06", 1, [
      { q: "What does a market maker do?", a: ["Stands ready to buy and sell all day so others can trade quickly", "It quotes both a price to buy and a price to sell."],
        d: [["Decides which companies may list", "Exchanges set listing rules; market makers trade."], ["Sets the official price of each stock", "No one sets prices; trades do."]] }]),
    tf("0.4-07", 1, [
      ["Individuals usually trade through a broker, such as an investing app, not directly on an exchange.", true, "The broker sends the order to a market to be filled."],
      ["Individuals send orders straight to an exchange by themselves.", false, "Individuals go through a broker, which connects to the markets."]]),
    mc("0.4-08", 1, [
      { q: "Whose money does a pension fund invest?", a: ["Savings for workers' retirements", "It invests now to pay pensions later."],
        d: [["Only its managers' own money", "Pension funds invest on behalf of workers."], ["Taxes collected this year", "Governments spend taxes; pension funds invest retirement savings."]] }]),
    tf("0.4-09", 1, [
      ["A lot of U.S. stock trading happens away from exchanges.", true, "In 2025, slightly more than half of U.S. stock volume traded off-exchange, through dealers and other venues."],
      ["Every U.S. stock trade happens on an exchange.", false, "Slightly more than half of 2025 volume traded off-exchange."]]),
    mc("0.4-10", 1, [
      { q: "Who do banks' sales and trading desks mainly serve?", a: ["Institutions such as funds and insurers", "They help big investors buy and sell."],
        d: [["Children's savings accounts", "That's retail banking, not sales and trading."], ["Shops taking card payments", "That's payments, not sales and trading."]] }]),
    tf("0.4-11", 1, [
      ["Mutual funds and pension funds invest other people's money.", true, "That's what makes them institutional investors."],
      ["A mutual fund only invests its manager's own money.", false, "It pools many savers' money."]]),
    mc("0.4-12", 1, [
      { q: "What are regular U.S. stock market trading hours?", a: ["9:30 am to 4:00 pm Eastern time, on weekdays", "Those are the regular session hours (some trading also happens outside them)."],
        d: [["24 hours a day, every day", "Regular trading has set weekday hours."], ["8 am to 8 pm, weekends only", "Markets are open on weekdays, not weekends."]] }]),
    mc("0.4-13", 1, [
      { q: "A company's shares are \"listed\" on Nasdaq. What does that mean?", a: ["Nasdaq is a marketplace where its shares can be traded", "Listing means the shares trade under that exchange's rules."],
        d: [["Nasdaq owns the company", "Exchanges don't own the companies they list."], ["Nasdaq guarantees the stock will rise", "No one guarantees a stock's price."]] }]),
    tf("0.4-14", 1, [
      ["The SEC oversees U.S. securities markets.", true, "It writes and enforces rules to keep markets fair."],
      ["The SEC runs the New York Stock Exchange.", false, "The NYSE is run by a company. The SEC regulates it."]]),
    mc("0.4-15", 1, [
      { q: "Why do insurance companies invest in markets?", a: ["They invest the premiums they collect until claims need paying", "Investing helps them earn something on money they'll need later."],
        d: [["To set stock prices", "No investor sets prices."], ["Because they aren't allowed to hold any cash", "They can hold cash; investing is a choice."]] }]),

    // ---------- Level 2: Applied ----------
    gen("0.4-20", 2, function (R) {
      var pick = R.pick(WHO), others = R.shuffle(WHO.filter(function (w) { return w !== pick; })).slice(0, 3);
      return { q: "Which market participant is this: \"" + pick[1] + "\"?",
        a: [pick[0], "Yes: " + an(pick[0]).toLowerCase() + " " + pick[2] + "."],
        d: others.map(function (o) { return [o[0], an(o[0]) + " " + o[2] + "."]; }) };
    }),
    tf("0.4-21", 2, [
      ["Market makers let others trade quickly even when no natural buyer or seller is around.", true, "They step in on the other side, which keeps trading smooth."],
      ["Market makers only trade when they're sure prices will rise.", false, "They trade with whoever shows up and earn the spread, not by betting on direction (lesson 1.4)."]]),
    mc("0.4-22", 2, [
      { q: "About how much U.S. stock volume traded away from exchanges in 2025?", a: ["Slightly more than half", "Per Cboe's 2025 review, off-exchange trading was slightly more than half of volume."],
        d: [["Almost none", "Off-exchange trading is a big share of the market."], ["About a tenth", "It was much more than that: slightly more than half."]] }]),
    mc("0.4-23", 2, [
      { q: "Why do buyers and sellers benefit from meeting on an exchange?", a: ["Many orders meet in one place under one set of rules", "More orders in one place make it easier to find someone to trade with."],
        d: [["Exchanges guarantee a profit", "Nothing guarantees profits."], ["Exchanges set a fair price for each stock", "Prices come from trades, not from the exchange."]] }]),
    tf("0.4-24", 2, [
      ["Hedge funds can bet on prices falling as well as rising.", true, "They can use many strategies, including selling short."],
      ["Anyone with $10 can put money in a hedge fund.", false, "Hedge funds are mostly limited to wealthy and institutional investors."]]),
    mc("0.4-25", 2, [
      { q: "On a bank's desk, who talks with fund clients about what they want to buy or sell?", a: ["Salespeople", "Sales covers the clients; traders handle the trading."],
        d: [["The exchange's staff", "Exchanges don't advise banks' clients."], ["Regulators", "Regulators supervise; they don't talk clients through trades."]] }]),
    mc("0.4-26", 2, [
      { q: "What does a broker, such as an investing app, do for you?", a: ["Sends your order to a market to be filled", "It connects you to exchanges and other venues."],
        d: [["Promises your stock will rise", "No one can promise that."], ["Owns the company you invest in", "Brokers don't own the companies you buy."]] }]),
    tf("0.4-27", 2, [
      ["Big funds often trade large orders through banks' desks or other venues, so they don't move the price too much.", true, "Splitting or arranging big trades helps avoid pushing the price against themselves."],
      ["A large fund must always place its whole order on the exchange at once.", false, "Funds use banks, other venues and careful timing for big orders."]]),
    sc("0.4-28", 2, [
      { s: "It's your first week on a bank's sales and trading desk. A pension fund calls: it wants to buy 2 million shares of a large company over the day.",
        p: [{ q: "What kind of client is the pension fund?", a: ["An institutional investor", "It invests a large pool of other people's money."], d: [["A retail investor", "Retail investors are individuals."], ["A market maker", "Market makers quote both sides all day; this client wants to buy."]] },
            { q: "Whose money is the pension fund investing?", a: ["Workers' retirement savings", "That's what a pension fund manages."], d: [["The bank's own money", "The bank is helping a client, not investing its own money here."], ["The company's money", "The fund invests in the company; it doesn't use the company's money."]] },
            { q: "Where might the trades happen?", a: ["On exchanges and through other venues", "Big orders often use several venues."], d: [["Only on the NYSE trading floor", "Most trading is electronic, across many venues."], ["Only inside the company that issued the shares", "Companies don't run trading in their own stock."]] }] }]),
    tf("0.4-29", 2, [
      ["Shares of funds called ETFs trade on exchanges, just like stocks.", true, "ETF stands for exchange-traded fund."],
      ["You can only buy into a fund once a year.", false, "ETFs trade all day, and mutual funds take money every trading day."]]),

    // ---------- Level 3: Desk-level ----------
    mc("0.4-40", 3, [
      { q: "What is a \"dark pool\"?", a: ["A private trading venue where orders aren't shown publicly before they trade", "Big investors use them to trade without revealing their orders in advance."],
        d: [["An exchange that only trades after midnight", "\"Dark\" refers to hidden orders, not the time of day."], ["A fund that invests in oil companies", "That would be an energy fund."]] }]),
    tf("0.4-41", 3, [
      ["Some U.S. stock trading happens before 9:30 am and after 4:00 pm Eastern.", true, "Extended-hours trading exists, usually with fewer trades and wider gaps between buy and sell prices."],
      ["No U.S. stock can ever trade outside 9:30 am to 4:00 pm Eastern.", false, "Extended-hours sessions exist before and after the regular session."]]),
    mc("0.4-42", 3, [
      { q: "Which organization oversees U.S. broker-dealers, the firms you trade through?", a: ["FINRA", "FINRA writes and enforces rules for broker-dealers, under the SEC's oversight."],
        d: [["The NYSE", "The NYSE is an exchange, not the regulator of all brokers."], ["The IRS", "The IRS handles taxes."]] }]),
    tf("0.4-43", 3, [
      ["There are more than a dozen stock exchanges in the U.S.", true, "Besides the NYSE and Nasdaq there are several others, plus many off-exchange venues."],
      ["The U.S. has exactly two stock exchanges: the NYSE and Nasdaq.", false, "Those are the best known, but there are more than a dozen."]]),
    mc("0.4-44", 3, [
      { q: "Why might a big fund avoid showing a huge buy order openly on an exchange?", a: ["Others could see it and push the price up before the fund finishes buying", "Revealing a big order can make the trade more expensive."],
        d: [["Exchanges don't allow large orders", "They do; the issue is what others learn from seeing it."], ["It's illegal to buy more than 1,000 shares", "There's no such rule."]] }]),
    sc("0.4-45", 3, [
      { s: "9:30 am, market open. A retail investor taps \"buy 5 shares\" on an app; a mutual fund starts buying 500,000 shares; market makers are quoting prices to buy and sell.",
        p: [{ q: "Who is most likely to fill the retail order instantly?", a: ["A market maker", "Market makers stand ready to trade with whoever shows up."], d: [["The company itself", "Companies don't trade their stock with investors day to day."], ["The SEC", "Regulators don't trade."]] },
            { q: "Which of the three is investing other people's money?", a: ["The mutual fund", "It pools savers' money."], d: [["The retail investor", "A retail investor uses their own money."], ["The market maker", "A market maker trades its own inventory to earn spreads."]] }] }]),
    mc("0.4-46", 3, [
      { q: "What's the main difference between a market maker and a mutual fund?", a: ["A market maker trades all day to earn spreads; a fund invests savers' money for the longer run", "Different jobs: one keeps markets moving, the other invests."],
        d: [["There's no real difference", "Their goals and time frames are very different."], ["A mutual fund sets prices; a market maker doesn't", "Neither sets prices; trades do."]] }])
  ]);
})(window.P0Bank);
