/* P0 lesson content: branch 0 (market basics) plus skills 1.1 and 1.4.
   Skill IDs and order follow breakdown/skill_map.md. Starting point: the learner knows only that a stock is a
   share of a company you can buy, whose value can go up or down.
   Question format: { q, o: [{ t: option text, ok: true for the correct option, why: feedback for that option }] }
   Financial education only, not personalized investment advice. */
window.P0_CONTENT = {
  skills: [
    {
      id: "0.1",
      title: "What sets a stock price",
      needs: [],
      hook: {
        q: "A company announces nothing all day, yet its stock price changes hundreds of times. Who changed it?",
        o: ["The company's CEO", "The stock exchange", "Buyers and sellers trading with each other"],
        ans: 2,
        reveal: "Every price is just the latest price a buyer and a seller agreed on. Nobody “sets” it."
      },
      cards: [
        {
          title: "A share is a slice of the company",
          body: "You already know a stock is a share of a company you can buy, and that its value can rise or fall. Owning one share means you own a tiny slice of the business: a claim on its future profits and, usually, a vote at shareholder meetings."
        },
        {
          title: "The price is the latest deal",
          body: "A stock's price is the price at which the last buyer and seller agreed to trade. If more people want to buy than sell at today's price, buyers have to offer more, and the price rises. If more want to sell, the price falls.",
          scenario: "Resale concert tickets: the face value stops mattering. The price is whatever the next fan will pay and the next seller will accept."
        }
      ],
      practice: [
        { q: "Who sets the price of a share on the stock market?", o: [
          { t: "The company, once a day", why: "The company doesn't control its trading price. Once shares trade between investors, buyers and sellers set it." },
          { t: "Buyers and sellers, through the trades they agree on", ok: true, why: "Right. Each trade's price is whatever one buyer and one seller agreed on." },
          { t: "The government regulator", why: "Regulators such as the SEC police fairness, but they don't set prices." } ] },
        { q: "More investors want to buy a stock than sell it at today's price. What usually happens?", o: [
          { t: "The price rises until enough sellers appear", ok: true, why: "Right. Buyers compete by offering more, and higher prices pull in sellers." },
          { t: "The price falls", why: "Falling prices come from more sellers than buyers." },
          { t: "The price stays the same because the company fixed it", why: "No one fixes the price of a traded stock." } ] },
        { q: "Owning one share of a company gives you…", o: [
          { t: "A small slice of ownership, with a claim on its profits", ok: true, why: "Right. A share is a piece of ownership." },
          { t: "A loan to the company that it must repay with interest", why: "That describes a bond, not a share. You'll meet bonds in a later lesson." },
          { t: "A guaranteed payment every year", why: "Nothing is guaranteed to shareholders. Many companies pay shareholders nothing directly." } ] }
      ],
      explain: {
        prompt: "In your own words: why can a stock's price change hundreds of times on a day with no news?",
        model: "Because the price is just the latest deal between a buyer and a seller. Every time someone trades at a slightly different price, the price changes, even when there's no news.",
        checklist: ["Mentions buyers and sellers", "Says the price is the latest trade", "Says no one sets the price"]
      },
      mastery: [
        { q: "A sneaker resale site shows the last pair sold for $220. A minute later a buyer pays $240. What is the market price now?", o: [
          { t: "$240, the latest agreed trade", ok: true, why: "Right. The market price is the most recent deal." },
          { t: "$220, because it came first", why: "Older trades don't hold the price in place. The latest deal is the price." },
          { t: "The original store price", why: "The store price is like face value. Once resale starts, buyers and sellers set the price." } ] },
        { q: "Which statement about a share price is true?", o: [
          { t: "It moves when buyers and sellers agree on new prices", ok: true, why: "Right." },
          { t: "The exchange resets it each morning", why: "Exchanges run the marketplace. They don't choose prices." },
          { t: "It only changes when the company reports results", why: "News moves prices more, but prices change all day long." } ] },
        { q: "If sellers outnumber buyers at today's price, the price tends to…", o: [
          { t: "Fall", ok: true, why: "Right. Sellers have to accept less to find buyers." },
          { t: "Rise", why: "Rising prices come from more buyers than sellers." },
          { t: "Stay fixed", why: "Prices aren't fixed. They move with buying and selling." } ] },
        { q: "A shareholder owns…", o: [
          { t: "Part of the company", ok: true, why: "Right." },
          { t: "Part of the company's debt", why: "Lenders (bondholders) hold the company's debt, not shareholders." },
          { t: "A promise of a fixed return", why: "Stocks promise no return, which is one reason they're riskier than bonds." } ] }
      ]
    },

    {
      id: "0.2",
      title: "Market cap: how big a company is",
      needs: ["0.1"],
      hook: {
        q: "Stock A costs $5. Stock B costs $500. Which company is bigger?",
        o: ["A", "B", "You can't tell yet"],
        ans: 2,
        reveal: "You can't tell. You also need the number of shares. A price on its own says nothing about size."
      },
      cards: [
        {
          title: "Size = price × number of shares",
          body: "Market capitalization (market cap) is the share price times the number of shares. It's what the market says all of the company's shares are worth together. A $5 stock with 10 billion shares is worth $50 billion. A $500 stock with 10 million shares is worth $5 billion."
        },
        {
          title: "More slices, same pizza",
          body: "Cut a pizza into 8 slices or 80 slices and it's the same pizza; each slice is just smaller. A company with more shares has a lower price per share, not a smaller business. Whether a stock is cheap depends on what the business earns, which comes later in the path.",
          scenario: "When a company does a 2-for-1 stock split, you get two shares for each one you had, each worth about half as much. The company didn't change."
        }
      ],
      practice: [
        { q: "A company has 2 million shares at $30 each. What is its market cap?", o: [
          { t: "$60 million", ok: true, why: "Right. 2,000,000 × $30 = $60,000,000." },
          { t: "$30 million", why: "That would be 1 million shares × $30. Check the share count." },
          { t: "$2 million", why: "That's just the number of shares, in millions." } ] },
        { q: "Which number tells you how big a company is?", o: [
          { t: "Its share price", why: "Price depends on how many slices the company is cut into." },
          { t: "Its market cap", ok: true, why: "Right. Market cap adds up the value of every share." },
          { t: "How many people own it", why: "Many people can own a small company." } ] },
        { q: "Company X: $5 a share, 10 billion shares. Company Y: $500 a share, 10 million shares. Which is bigger?", o: [
          { t: "X: $50 billion vs $5 billion", ok: true, why: "Right. 5 × 10 billion = 50 billion; 500 × 10 million = 5 billion." },
          { t: "Y, because its price is higher", why: "This is the classic beginner trap: price isn't size." },
          { t: "They're the same size", why: "Multiply each price by its share count. They're very different." } ] }
      ],
      explain: {
        prompt: "Why isn't a $5 stock automatically “cheaper” than a $500 stock?",
        model: "Because the price per share depends on how many shares exist. To compare size, multiply by the share count (market cap). Whether a stock is actually cheap also depends on what the business earns.",
        checklist: ["Mentions the number of shares", "Mentions market cap, or price × shares", "Doesn't treat a low price as cheap"]
      },
      mastery: [
        { q: "A company has 500 million shares trading at $40. What is its market cap?", o: [
          { t: "$20 billion", ok: true, why: "Right. 500,000,000 × $40 = $20,000,000,000." },
          { t: "$2 billion", why: "Check the zeros: 500 million × 40 is 20,000 million, which is $20 billion." },
          { t: "$40 billion", why: "That would need 1 billion shares." } ] },
        { q: "A company with 100 shares at $50 splits each share into two. Right after, each share is worth about…", o: [
          { t: "$25, and the market cap is unchanged at $5,000", ok: true, why: "Right. Twice the slices, half the price each." },
          { t: "$50, and the market cap doubles", why: "Cutting a pizza into more slices doesn't make more pizza." },
          { t: "$100", why: "A split makes each share worth less, not more." } ] },
        { q: "Is a $1,000 stock always a bigger company than a $10 stock?", o: [
          { t: "No. You need the share count to compare", ok: true, why: "Right. Size is price × shares." },
          { t: "Yes, a higher price means a bigger company", why: "Price per share says nothing about size on its own." },
          { t: "Yes, only big companies have high prices", why: "Small companies can have high prices if they have few shares." } ] },
        { q: "Market cap is best described as…", o: [
          { t: "What the market says all the company's shares are worth together", ok: true, why: "Right." },
          { t: "The company's sales for the year", why: "Sales (revenue) is a different number. It comes from the company's income statement." },
          { t: "The cash the company has in the bank", why: "Cash is one thing a company owns. Market cap is the value of all its shares." } ] }
      ]
    },

    {
      id: "0.3",
      title: "Why companies sell shares",
      needs: ["0.1"],
      hook: {
        q: "You buy one share of a big, well-known company on an app today. Does the company get your money?",
        o: ["Yes, all of it", "No", "Some of it"],
        ans: 1,
        reveal: "No. You bought the share from another investor. The company only got money when it first sold those shares."
      },
      cards: [
        {
          title: "Companies sell shares to raise money",
          body: "A growing company needs cash to build, hire and develop products. Instead of borrowing, it can sell slices of ownership. The first time a company sells shares to the public is its IPO (initial public offering). That's the primary market: the money goes to the company."
        },
        {
          title: "After that, investors trade with each other",
          body: "Once the shares exist, investors buy and sell them among themselves on the secondary market. When you buy a share on an app, your money goes to whoever sold it, not to the company. When a company sells new shares, existing owners' slices get smaller. That's called dilution.",
          scenario: "A band sells its first run of T-shirts (primary market). When fans resell those shirts later (secondary market), the band gets nothing."
        }
      ],
      practice: [
        { q: "What is an IPO?", o: [
          { t: "A company's first sale of shares to the public", ok: true, why: "Right. IPO stands for initial public offering." },
          { t: "A company buying back its own shares", why: "That's a buyback, the opposite direction." },
          { t: "A yearly payment to shareholders", why: "That describes a dividend, covered later in the path." } ] },
        { q: "You buy a share of an established company through a brokerage app. Who receives your money?", o: [
          { t: "The investor who sold you the share", ok: true, why: "Right. That's the secondary market." },
          { t: "The company", why: "The company only receives money in the primary market, such as an IPO." },
          { t: "The stock exchange keeps it", why: "Exchanges can charge fees, but the money goes to the seller." } ] },
        { q: "Why might a company sell shares instead of borrowing?", o: [
          { t: "Shares don't have to be repaid like a loan", ok: true, why: "Right. The trade-off is giving up part of the ownership and future profits." },
          { t: "Selling shares costs nothing", why: "It has costs: fees, and existing owners own a smaller share." },
          { t: "Shareholders can never sell their shares", why: "They can, on the secondary market." } ] }
      ],
      explain: {
        prompt: "Use the T-shirt example to explain the difference between the primary and secondary market.",
        model: "Primary market: the band sells new shirts and keeps the money, like a company selling new shares in an IPO. Secondary market: fans resell those shirts to each other, like investors trading shares, and the band gets nothing.",
        checklist: ["Primary: the company gets the money", "Secondary: investors trade with each other", "Links the IPO to the primary market"]
      },
      mastery: [
        { q: "Which of these is a primary-market transaction?", o: [
          { t: "A company sells new shares in its IPO", ok: true, why: "Right. New shares, money to the company." },
          { t: "You sell your share to another investor", why: "That's the secondary market." },
          { t: "A fund buys shares from a pension fund", why: "Investor to investor is the secondary market." } ] },
        { q: "When a company sells new shares, existing owners…", o: [
          { t: "Own a smaller percentage of the company", ok: true, why: "Right. That's dilution." },
          { t: "Get paid by the company", why: "Existing owners aren't paid. New buyers pay the company." },
          { t: "Lose their shares", why: "They keep their shares; each is now a smaller slice." } ] },
        { q: "Most day-to-day stock trading happens in the…", o: [
          { t: "Secondary market", ok: true, why: "Right. New share sales are rare compared with everyday trading." },
          { t: "Primary market", why: "Companies sell new shares only now and then." },
          { t: "Company's own office", why: "Investors trade with each other through brokers and trading venues." } ] },
        { q: "A bakery sells 1,000 new shares at $10 each in its IPO. How much does it raise before fees?", o: [
          { t: "$10,000", ok: true, why: "Right. 1,000 × $10." },
          { t: "$1,000", why: "That's the number of shares, not the money raised." },
          { t: "Nothing; the investors keep the money", why: "In an IPO, investors pay the company for the new shares." } ] }
      ]
    },

    {
      id: "0.4",
      title: "Exchanges and who trades",
      needs: ["0.3"],
      hook: {
        q: "Who handles most of the money traded in U.S. stocks: individuals like you, or big institutions?",
        o: ["Individuals", "Institutions and professional firms", "About half and half"],
        ans: 1,
        reveal: "Big institutions (mutual funds, pension funds, hedge funds and professional trading firms) handle most of the money. Individuals matter, but they're a smaller share."
      },
      cards: [
        {
          title: "An exchange is a marketplace with rules",
          body: "A stock exchange, such as the New York Stock Exchange or Nasdaq, is a regulated marketplace where buy and sell orders meet. Think of a farmers' market: many stalls, many shoppers, one set of rules. A lot of trading also happens away from exchanges, through dealers and other venues. In 2025, slightly more than half of U.S. stock volume traded off-exchange.",
          source: "Cboe, 2025 U.S. Equities Year in Review (Jan 2026)"
        },
        {
          title: "Who's at the market",
          body: "Individuals (retail investors) buy through apps and brokers. Institutions such as mutual funds, pension funds, insurers and hedge funds invest other people's money. Market makers are professional firms that stand ready to buy and sell all day so others can trade quickly. Banks' sales and trading desks serve the institutions."
        }
      ],
      practice: [
        { q: "What is a stock exchange?", o: [
          { t: "A regulated marketplace where buy and sell orders meet", ok: true, why: "Right." },
          { t: "A bank that lends money to companies", why: "Exchanges match trades. They don't lend." },
          { t: "A government agency that sets prices", why: "Exchanges are marketplaces, and no one sets prices." } ] },
        { q: "Which of these is an institutional investor?", o: [
          { t: "A pension fund managing teachers' retirement money", ok: true, why: "Right. It invests money on behalf of many people." },
          { t: "A student buying one share on an app", why: "That's an individual, or retail, investor." },
          { t: "The stock exchange itself", why: "The exchange runs the market. It isn't an investor." } ] },
        { q: "What does a market maker do?", o: [
          { t: "Stands ready to buy and sell all day so others can trade quickly", ok: true, why: "Right. You'll see how they earn money in a later lesson." },
          { t: "Decides which companies can sell shares", why: "Regulators and exchanges set listing rules. Market makers don't." },
          { t: "Picks stocks it thinks will rise", why: "That's the common myth. Market makers earn mostly from the gap between their buying and selling prices." } ] }
      ],
      explain: {
        prompt: "Using the farmers' market picture, describe who is at the “stock market.”",
        model: "The exchange is the market with rules. The shoppers and sellers include individuals and big institutions such as pension funds. Market makers are like stalls that always stand ready to buy and sell.",
        checklist: ["Exchange as the marketplace", "Individuals and institutions", "Market makers always ready to trade"]
      },
      mastery: [
        { q: "A hedge fund, a pension fund and an insurance company are all…", o: [
          { t: "Institutional investors", ok: true, why: "Right. They invest large pools of other people's money." },
          { t: "Retail investors", why: "Retail means individuals investing their own money." },
          { t: "Stock exchanges", why: "Exchanges are marketplaces, not investors." } ] },
        { q: "Which job belongs to a market maker?", o: [
          { t: "Quoting prices to buy and sell throughout the day", ok: true, why: "Right." },
          { t: "Writing the rules for the exchange", why: "Exchanges and regulators write the rules." },
          { t: "Checking companies' accounts", why: "That's what auditors do." } ] },
        { q: "Why do markets need rules?", o: [
          { t: "So buyers and sellers can trust that trades are fair and get completed", ok: true, why: "Right. Trust keeps people trading." },
          { t: "So prices never fall", why: "Rules don't stop prices from falling." },
          { t: "So only big firms can trade", why: "Rules apply to everyone. They don't keep individuals out." } ] },
        { q: "Where does U.S. stock trading happen?", o: [
          { t: "On exchanges, and also through other venues off-exchange", ok: true, why: "Right. In 2025 slightly more than half of U.S. volume traded off-exchange." },
          { t: "Only on the New York Stock Exchange", why: "There are several exchanges and many other venues." },
          { t: "Only directly with the company", why: "After the IPO, investors trade with each other." } ] }
      ]
    },

    {
      id: "0.5",
      title: "Stocks vs bonds",
      needs: ["0.1"],
      hook: {
        q: "A lemonade stand. Option 1: own 10% of it. Option 2: lend it $100 at 5% a year. If the stand struggles, who gets paid first?",
        o: ["The owner", "The lender", "Both equally"],
        ans: 1,
        reveal: "The lender. Lenders are paid before owners. Owners get what's left over, which could be a lot or nothing."
      },
      cards: [
        {
          title: "Owning vs lending",
          body: "A stock is ownership: you share in the profits and losses, with no promised payment. A bond is a loan: the company or government promises to pay interest and to repay the amount borrowed on a set date. If a company fails, lenders are paid before owners."
        },
        {
          title: "Why the risk is different",
          body: "Bondholders have a promise and stand first in line, so a company's bonds are usually less risky than its stock. Stockholders take more risk, so they expect a higher return over time. Nothing is guaranteed, though, and bonds can lose value too.",
          scenario: "Owning 10% of the lemonade stand could pay off hugely in a hot summer or pay nothing in a rainy one. Lending $100 at 5% pays the same $5 a year either way, unless the stand can't pay."
        }
      ],
      practice: [
        { q: "A bond is best described as…", o: [
          { t: "A loan to a company or government that pays interest", ok: true, why: "Right." },
          { t: "A slice of ownership", why: "That's a stock." },
          { t: "A promise that a stock will rise", why: "Nothing promises a stock will rise." } ] },
        { q: "If a company goes bankrupt, who is generally paid first?", o: [
          { t: "Bondholders (lenders)", ok: true, why: "Right. Lenders come before owners." },
          { t: "Stockholders (owners)", why: "Owners are last in line." },
          { t: "Whoever bought most recently", why: "The order depends on the type of claim, not on timing." } ] },
        { q: "Why do investors expect a higher return from stocks than from bonds over time?", o: [
          { t: "Stocks carry more risk and have no promised payments", ok: true, why: "Right. More risk, so a higher expected return." },
          { t: "The government guarantees stocks", why: "No one guarantees stock returns." },
          { t: "Bonds never pay interest", why: "Paying interest is exactly what bonds do." } ] }
      ],
      explain: {
        prompt: "Explain the difference between a stock and a bond using the lemonade stand.",
        model: "Owning 10% of the stand (a stock) means sharing its profits or losses with no promise. Lending it $100 at 5% (a bond) means receiving interest and your money back on schedule, and being paid before the owners if it struggles.",
        checklist: ["Stock = ownership", "Bond = a loan with interest", "Lenders are paid before owners"]
      },
      mastery: [
        { q: "You lend a city $1,000 for 10 years at 4% a year. What do you own?", o: [
          { t: "A bond", ok: true, why: "Right. A loan that pays interest." },
          { t: "A stock", why: "You can't own a slice of a city. This is a loan." },
          { t: "Part of the city", why: "Lending doesn't make you an owner." } ] },
        { q: "Which one comes with promised payments?", o: [
          { t: "A bond", ok: true, why: "Right. Interest and repayment are promised." },
          { t: "A stock", why: "Stocks promise nothing." },
          { t: "Neither", why: "Bonds do promise payments, though the borrower can still fail to pay." } ] },
        { q: "A company's profits triple. Who benefits most?", o: [
          { t: "Its stockholders, because they own the profits", ok: true, why: "Right. Bondholders still receive the same promised interest." },
          { t: "Its bondholders, because their interest triples", why: "Bond interest is fixed in advance." },
          { t: "Neither", why: "The owners benefit." } ] },
        { q: "For the same company, which is usually riskier?", o: [
          { t: "Its stock", ok: true, why: "Right. No promise, and last in line." },
          { t: "Its bonds", why: "Bonds have a promise and stand ahead of stock." },
          { t: "They're always equally risky", why: "The promise and the order of payment make them different." } ] }
      ]
    },

    {
      id: "0.6",
      title: "Two ways to earn: price and dividends",
      needs: ["0.1", "0.5"],
      hook: {
        q: "A stock pays its owners a $1 dividend. Right after, does the stock price tend to stay the same, rise by $1, or fall by about $1?",
        o: ["Stay the same", "Rise by $1", "Fall by about $1"],
        ans: 2,
        reveal: "It tends to fall by about the dividend. The cash left the company and went to the owners."
      },
      cards: [
        {
          title: "Two ways shareholders earn",
          body: "Price change (a capital gain or loss): you sell for more or less than you paid. Dividends: some companies pay part of their profits to shareholders in cash. Total return = price change + dividends."
        },
        {
          title: "Dividends aren't free money",
          body: "When a company pays a dividend, cash leaves the company, so the company is worth about that much less. On the day the stock starts trading without the dividend (the ex-dividend date), the price typically drops by about the dividend amount. Many fast-growing companies pay no dividend and reinvest instead.",
          scenario: "A friend hands you $1 from the lemonade stand's cash box. You're $1 richer, and the stand is worth $1 less."
        }
      ],
      practice: [
        { q: "You buy a share at $50, receive $2 in dividends, and sell at $55. What is your total return in dollars?", o: [
          { t: "$7", ok: true, why: "Right. $5 price gain + $2 dividends." },
          { t: "$5", why: "That leaves out the dividends." },
          { t: "$2", why: "That leaves out the price gain." } ] },
        { q: "Does every company pay dividends?", o: [
          { t: "No. Many reinvest their profits instead", ok: true, why: "Right." },
          { t: "Yes, the law requires it", why: "No law requires dividends." },
          { t: "Only companies that are losing money", why: "Usually it's profitable companies that pay dividends." } ] },
        { q: "Right after a $1 dividend is paid out, the share price tends to…", o: [
          { t: "Drop by about $1", ok: true, why: "Right. The company is worth about $1 less per share." },
          { t: "Rise by $1", why: "Cash left the company, so it's worth less, not more." },
          { t: "Not change at all", why: "Other news can move it, but the dividend itself takes value out of the company." } ] }
      ],
      explain: {
        prompt: "Explain why a dividend isn't free money.",
        model: "The cash comes out of the company, so the company is worth about that much less and the share price tends to fall by roughly the dividend. The money just moved from the company's pocket to yours.",
        checklist: ["Cash leaves the company", "The price tends to drop by about the dividend", "Total return counts both price and dividends"]
      },
      mastery: [
        { q: "You buy at $20, receive $1 in dividends, and sell at $18. What is your total return?", o: [
          { t: "−$1", ok: true, why: "Right. −$2 on the price + $1 in dividends." },
          { t: "+$1", why: "The price fell $2, which outweighs the $1 dividend." },
          { t: "−$2", why: "Don't forget the $1 dividend." } ] },
        { q: "Total return equals…", o: [
          { t: "Price change plus dividends", ok: true, why: "Right." },
          { t: "Dividends only", why: "The price change counts too." },
          { t: "Price change only", why: "Dividends count too." } ] },
        { q: "Why might a fast-growing company pay no dividend?", o: [
          { t: "It reinvests its profits to grow the business", ok: true, why: "Right." },
          { t: "Dividends are illegal for growing companies", why: "There's no such rule." },
          { t: "It has no shareholders", why: "Every company with stock has shareholders." } ] },
        { q: "A company pays a $3 dividend on a $60 stock. Ignoring other news, right after the ex-dividend date the price is about…", o: [
          { t: "$57", ok: true, why: "Right. $60 − $3." },
          { t: "$63", why: "Paying out cash lowers the price." },
          { t: "$60", why: "The $3 left the company, so the price usually adjusts down." } ] }
      ]
    },

    {
      id: "0.7",
      title: "Risk, return and diversification",
      needs: ["0.6"],
      hook: {
        q: "Would you put all your savings into one sneaker drop, or spread it across many items?",
        o: ["One drop", "Spread it out", "It doesn't matter"],
        ans: 1,
        reveal: "Spreading it out (diversifying) means one bad drop can't wipe you out. Investors face the same choice."
      },
      cards: [
        {
          title: "Return and risk travel together",
          body: "Investments that can earn more can usually also lose more. Risk here means uncertainty: how widely the results can swing. No investment offers a high expected return with no risk. Anyone promising that is a red flag."
        },
        {
          title: "Diversification",
          body: "Owning many different investments means one company's bad news hurts you less. Diversification cuts the risk of any single company, but it can't remove the risk of the whole market falling.",
          scenario: "Ten umbrella shops all suffer in a drought. Umbrellas plus sunglasses balance each other out."
        }
      ],
      practice: [
        { q: "Someone promises you a “guaranteed 30% a year with zero risk.” What should you think?", o: [
          { t: "It's a red flag: return and risk go together", ok: true, why: "Right. High promised returns with no risk are a classic warning sign." },
          { t: "It's a great deal", why: "No legitimate investment offers that." },
          { t: "It's normal for stocks", why: "Stocks have no guaranteed return at all." } ] },
        { q: "Which portfolio is more diversified?", o: [
          { t: "20 companies across different industries", ok: true, why: "Right. Different industries don't all fall for the same reason." },
          { t: "20 technology companies", why: "Companies in the same industry often fall together." },
          { t: "One large company", why: "One company is no diversification at all." } ] },
        { q: "Diversification can remove…", o: [
          { t: "Much of the risk of any single company", ok: true, why: "Right." },
          { t: "All risk, including the whole market falling", why: "A market-wide drop hits almost everything." },
          { t: "No risk at all", why: "It does reduce single-company risk." } ] }
      ],
      explain: {
        prompt: "Explain diversification to a friend in one or two sentences.",
        model: "Don't put everything in one basket: owning many different investments means one bad outcome doesn't sink you. It cuts single-company risk, but not the risk that the whole market falls.",
        checklist: ["Spreading across many investments", "Reduces single-company risk", "Can't remove market-wide risk"]
      },
      mastery: [
        { q: "Ten umbrella shops, or umbrellas plus sunglasses: which is better diversified?", o: [
          { t: "Umbrellas plus sunglasses", ok: true, why: "Right. They do well in different weather." },
          { t: "Ten umbrella shops", why: "They all suffer in the same drought." },
          { t: "They're the same", why: "Ten of the same bet is still one bet." } ] },
        { q: "A higher expected return usually comes with…", o: [
          { t: "Higher risk", ok: true, why: "Right." },
          { t: "Lower risk", why: "Return and risk usually rise together." },
          { t: "A guarantee", why: "There are no guarantees." } ] },
        { q: "Owning shares in 500 large companies mostly protects you from…", o: [
          { t: "One company's bad news", ok: true, why: "Right." },
          { t: "A market-wide crash", why: "Diversification can't stop the whole market from falling." },
          { t: "Losing any money at all", why: "You can still lose money when the market falls." } ] },
        { q: "Which claim is a warning sign?", o: [
          { t: "“You can't lose”", ok: true, why: "Right. Every investment can lose value." },
          { t: "“Past results don't guarantee future returns”", why: "That's an honest, standard disclosure." },
          { t: "“Prices can go down as well as up”", why: "That's an honest warning, not a red flag." } ] }
      ]
    },

    {
      id: "1.1",
      title: "Bid, ask and the spread",
      needs: ["0.4"],
      hook: {
        q: "A trading screen shows a stock as 20.10 / 20.14. What do you think the two numbers mean?",
        o: ["Yesterday's price and today's price", "The best price you'd get if you sold, and the best price you'd pay if you bought", "The day's low and high"],
        ans: 1,
        reveal: "20.10 is the bid: the most anyone will pay you right now. 20.14 is the ask: the least anyone will sell to you for."
      },
      cards: [
        {
          title: "Two prices, not one",
          body: "The bid is the highest price a buyer is willing to pay right now. The ask (also called the offer) is the lowest price a seller will accept. If you sell immediately, you get the bid. If you buy immediately, you pay the ask.",
          scenario: "Concert tickets: the highest “want to buy” offer for a seat versus the lowest “for sale” listing for the same seat."
        },
        {
          title: "The spread",
          body: "The spread is the ask minus the bid. For 20.10 / 20.14 the spread is $0.04. Popular, heavily traded stocks have tight spreads, often a penny. Rarely traded stocks have wide spreads. The best bid and best ask across all U.S. exchanges together are called the National Best Bid and Offer (NBBO)."
        }
      ],
      practice: [
        { q: "The quote is 50.00 / 50.05. If you sell right now, you'll get about…", o: [
          { t: "$50.00, the bid", ok: true, why: "Right. Sellers receive the bid." },
          { t: "$50.05, the ask", why: "That's what buyers pay. Sellers receive the bid." },
          { t: "$50.025, the middle", why: "You trade at the bid or the ask, not the middle." } ] },
        { q: "What is the spread on 50.00 / 50.05?", o: [
          { t: "$0.05", ok: true, why: "Right. 50.05 − 50.00." },
          { t: "$50.05", why: "That's the ask, not the gap." },
          { t: "$100.05", why: "The spread is the difference, not the sum." } ] },
        { q: "Which stock is likely to have the tighter spread?", o: [
          { t: "A huge company traded millions of times a day", ok: true, why: "Right. Lots of buyers and sellers squeeze the gap." },
          { t: "A tiny company traded a few times a day", why: "Few traders means a wider gap between buyers and sellers." },
          { t: "Spreads are the same for every stock", why: "Spreads vary a lot with how actively a stock trades." } ] }
      ],
      explain: {
        prompt: "Explain what 20.10 / 20.14 means and what the spread is.",
        model: "20.10 is the bid: the most a buyer will pay right now, which you get if you sell. 20.14 is the ask: the least a seller will take, which you pay if you buy. The spread is 4 cents.",
        checklist: ["Bid = what you get if you sell", "Ask = what you pay if you buy", "Spread = ask − bid"]
      },
      mastery: [
        { q: "The quote is 12.40 / 12.43. You want to buy immediately. You pay about…", o: [
          { t: "$12.43", ok: true, why: "Right. Buyers pay the ask." },
          { t: "$12.40", why: "That's the bid, what sellers receive." },
          { t: "$12.415", why: "You trade at the bid or the ask, not the middle." } ] },
        { q: "The bid is…", o: [
          { t: "The highest price a buyer will pay right now", ok: true, why: "Right." },
          { t: "The lowest price a seller will accept", why: "That's the ask." },
          { t: "Yesterday's closing price", why: "The bid is live, right now." } ] },
        { q: "The quote is 8.00 / 8.20. What is the spread?", o: [
          { t: "$0.20", ok: true, why: "Right. 8.20 − 8.00." },
          { t: "$0.02", why: "Check the decimal: 8.20 − 8.00 is 20 cents." },
          { t: "$16.20", why: "The spread is the difference, not the sum." } ] },
        { q: "You buy at the ask and immediately sell at the bid. Ignoring fees, you…", o: [
          { t: "Lose the spread", ok: true, why: "Right. That's why the spread is a real cost of trading." },
          { t: "Break even", why: "You bought higher than you sold." },
          { t: "Earn the spread", why: "The trader on the other side earns it, not you." } ] }
      ]
    },

    {
      id: "1.4",
      title: "How a market maker earns",
      needs: ["1.1"],
      hook: {
        q: "A fruit stall buys apples from farmers at $1.00 and sells them to shoppers at $1.10, all day long. How does it make money?",
        o: ["By betting that apple prices will rise", "By earning the 10-cent gap, over and over", "By charging an entry fee"],
        ans: 1,
        reveal: "The gap. That's exactly how a market maker earns: buying at its bid and selling at its ask, many times a day."
      },
      cards: [
        {
          title: "Earning the spread",
          body: "A market maker quotes both a bid and an ask and trades with whoever shows up. Each time it buys at its bid and later sells at its ask, it earns the spread. It makes money from many trades and the spread, not from guessing where prices go. Banks' trading desks make markets for their clients; under the Volcker Rule, U.S. banks generally can't trade just to bet the bank's own money."
        },
        {
          title: "Inventory risk and better-informed traders",
          body: "While the stall holds apples, it's exposed: if a huge harvest floods the market overnight, the apples it holds are suddenly worth less. That's inventory risk. Market makers keep inventory small and lean their prices: if they hold too much, they lower both bid and ask to sell more and buy less. They also watch out for traders who know more than they do. Trading with better-informed traders, and losing, is called adverse selection.",
          scenario: "Frost news breaks. A trader who heard first buys every apple the stall has at its old $1.10 price, before the stall raises its prices."
        }
      ],
      practice: [
        { q: "A stall quotes 1.00 / 1.10 and trades 50 apples each way. Ignoring price changes, it earns about…", o: [
          { t: "$5.00 (50 × $0.10)", ok: true, why: "Right. 50 round trips × 10 cents." },
          { t: "$0.10", why: "That's the spread on one apple. It traded 50 each way." },
          { t: "$55", why: "That's total sales, not what it earned." } ] },
        { q: "The stall is holding far more apples than it wants. What should it do with its prices?", o: [
          { t: "Lower both its bid and ask, to sell more and buy less", ok: true, why: "Right. That's leaning the quotes." },
          { t: "Raise both", why: "That attracts more sellers and fewer buyers, so apples pile up." },
          { t: "Stop quoting forever", why: "Then it can't earn the spread at all." } ] },
        { q: "Frost news means apples will be scarce. A trader who heard first buys all the stall's apples at its old $1.10 ask. This is…", o: [
          { t: "Adverse selection: trading with someone who knows more", ok: true, why: "Right. The stall sold below the new value." },
          { t: "Earning the spread", why: "The stall sold below what apples were now worth, so it lost on those trades." },
          { t: "Diversification", why: "Diversification is about owning many things. This is about information." } ] }
      ],
      explain: {
        prompt: "Explain how a market maker makes money, and one risk it faces.",
        model: "It buys at its bid and sells at its ask, earning the spread many times a day. Its main risk is inventory: if prices move while it's holding apples, or a better-informed trader picks it off, it can lose more than the spread.",
        checklist: ["Earns the spread", "From many trades, not from betting on direction", "Names inventory risk or adverse selection"]
      },
      mastery: [
        { q: "Why do market makers want lots of trades?", o: [
          { t: "They earn a small spread on each one", ok: true, why: "Right." },
          { t: "Each trade is a bet on direction", why: "They're paid for providing trades, not for picking direction." },
          { t: "More trades always mean less risk", why: "Big one-sided trading can pile up inventory and raise risk." } ] },
        { q: "A market maker holds almost no apples, and lots of buyers want to buy from it. To slow its selling, it would…", o: [
          { t: "Raise its ask", ok: true, why: "Right. A higher ask means fewer buyers take it." },
          { t: "Lower its ask", why: "That would attract even more buyers." },
          { t: "Lower its bid", why: "That slows its buying, but it's running out of apples, so it wants to buy more, not less." } ] },
        { q: "Inventory risk means…", o: [
          { t: "Losing money because prices move while you hold inventory", ok: true, why: "Right." },
          { t: "Running out of shelf space", why: "It's about price moves, not storage." },
          { t: "Paying tax on inventory", why: "It's about price moves, not tax." } ] },
        { q: "Which best describes a bank's market-making desk?", o: [
          { t: "It stands ready to trade with clients and earns the spread while managing risk", ok: true, why: "Right." },
          { t: "It bets the bank's money on its favourite stocks", why: "Under the Volcker Rule, U.S. banks generally can't do that." },
          { t: "It sets the official price for the whole market", why: "No single firm sets the market price." } ] }
      ]
    }
  ],

  // The order the path shows, and the stall game that unlocks after skill 1.4.
  pathOrder: ["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "1.1", "1.4", "stall"]
};
