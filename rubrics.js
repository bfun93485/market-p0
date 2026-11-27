/* Rubrics for the "Explain it" step, one per skill (see grader.js for how they're applied).
   label: what the learner sees ticked when the idea is found. hint: shown when the idea is missing.
   Patterns are case-insensitive regular expressions; each concept counts if any of its patterns appears. */
window.P0_RUBRICS = {
  "0.1": {
    min: 2, need: [[0, 1]],
    concepts: [
      { label: "Buyers and sellers move it", hint: "Who moves the price? Think about who is trading.",
        any: [/\bbuy(er|ers|ing|s)?\b[\s\S]{0,40}\bsell(er|ers|ing|s)?\b/i, /\bsell(er|ers|ing|s)?\b[\s\S]{0,40}\bbuy(er|ers|ing|s)?\b/i,
          /\bsupply and demand\b|\bdemand and supply\b|\bsupply\s*\/\s*demand\b/i, /\btrader?s?\b|\btrading\b/i, /\bauction\b/i, /\binvestors?\b[\s\S]{0,30}\b(trad|buy|sell)/i,
          /\b(two|other|different) (people|parties|investors|traders)\b/i, /\bpeople\b[\s\S]{0,25}\b(agree|trade|buy|sell|orders?|bid)/i, /\bbidders?\b/i] },
      { label: "The price is the latest trade", hint: "What exactly is \"the price\"? Think about the most recent deal.",
        any: [/\b(last|latest|most recent|recent|newest|each|every|new|next|different)\b[\s\S]{0,25}\b(trades?|deals?|transactions?|sales?|agreed|agreements?)\b/i,
          /\b(trades?|deals?|transactions?)\b[\s\S]{0,40}\b(price|different|new|each|every|constant|constantly|all day|continuous|nonstop|never stops|tons|lots|many|hundreds)\b/i,
          /\bagree(s|d)?\b/i, /\b(constantly|all day|nonstop|non-stop|throughout the day|never stops|keeps? (buying|selling|trading|making))\b/i,
          /\b(minute by minute|second by second|every (minute|second)|every time|shifting|orders?|becomes the (new )?price)\b/i] },
      { label: "No one sets it, and no news is needed", hint: "Does anyone decide the price? Does it need news to move?",
        any: [/\b(no ?one|nobody|no single|not the company)\b[\s\S]{0,20}\b(sets?|decides?|controls?|picks?|fix(es)?)\b/i,
          /\b(isn'?t|is not|not)\b[\s\S]{0,10}\b(set|fixed|decided)\b/i, /\b(no|without|don'?t need|doesn'?t need)\b[\s\S]{0,10}\bnews\b/i] }
    ],
    wrong: [
      { say: "The company, the exchange or the government doesn't set a stock's price. Buyers and sellers do, with every trade.",
        patterns: [/\b(company|ceo|exchange|government|sec|regulators?|management)\b\s+(?:(?!not\b|doesn'?t\b|does\b|don'?t\b|never\b|isn'?t\b|can'?t\b)[\w']+\s+){0,2}(sets?|decides?|changes?|controls?|adjusts?|updates?|fixes)\b/i,
          /\b(set|fixed|decided|updated|changed|adjusted|controlled)\b[\s\S]{0,6}\bby the (company|ceo|exchange|government|sec|regulators?)\b/i] },
      { say: "The question is about days with no news: prices still move because trading never stops.",
        patterns: [/^\s*because of (the )?news\W*$/i] }
    ]
  },

  "0.2": {
    min: 2, need: [[0, 1, 2]],
    concepts: [
      { label: "The number of shares matters", hint: "How many slices is each company cut into?",
        any: [/\b(number|amount|count|quantity|how many|total)\b[\s\S]{0,15}\bshares?\b/i, /\bshares? (count|outstanding)\b/i,
          /\b(more|fewer|less|few|lots of|way more|many) shares\b/i, /\bshare count\b/i, /\b(slices?|pieces?)\b/i, /\bsplit\b/i] },
      { label: "Size is market cap (price × shares)", hint: "How do you get the value of the whole company?",
        any: [/market ?cap|capitali[sz]ation/i, /\bprice\b[\s\S]{0,10}(\bx\b|×|\*|\btimes\b|\bmultiplied\b)[\s\S]{0,15}\bshares?\b/i,
          /\bmultiply\b[\s\S]{0,30}\bshares?\b/i, /\b(total|whole|overall|entire)\b[\s\S]{0,15}\b(value|worth|size|company|business|pizza)\b/i,
          /\bcompany'?s? (total )?(value|worth|size)\b/i, /\b(size|worth|value) of the (whole |entire )?(company|business)\b/i,
          /\b(smaller|bigger|larger|small|big|large)\b[\s\S]{0,6}\b(company|business)\b/i, /\b(smaller|bigger|larger)\b/i,
          /\bwhole thing\b/i, /\b(what|how much) the (whole )?(company|business|thing) (costs?|is worth)\b/i] },
      { label: "Cheap depends on what it earns, not the share price", hint: "Is a low share price the same as a bargain?",
        any: [/\bearn(s|ings|ing)?\b/i, /\bprofits?\b/i, /p\/e|price.to.earnings|valuation/i,
          /\b(price|share price|per.share prices?)\b[\s\S]{0,30}\b(doesn'?t|does not|alone|means nothing|isn'?t|is not|tells you nothing)\b/i,
          /\bnot (about|just) the (share )?price\b/i, /\bcan'?t (compare|judge)\b/i, /\bsticker price\b/i] }
    ],
    wrong: [
      { say: "A lower share price doesn't make a stock cheaper. You need the share count, and whether it's cheap depends on what the company earns.",
        patterns: [/\b(cheaper|better deal|better value)\b[\s\S]{0,25}\b(because|since|as)\b[\s\S]{0,25}\b(lower|less|smaller|costs? less)\b/i,
          /\blower price\b[\s\S]{0,15}\b(means|=|is)\b[\s\S]{0,15}\b(cheaper|better)\b/i, /\b(is|are) cheaper so\b/i, /\bcosts? less money\b/i,
          /\$?500 stocks? (are|is) better\b/i] },
      { say: "Share price doesn't decide the dividend size, and it doesn't make one company cheaper than another.",
        patterns: [/\bbigger dividends?\b/i] }
    ]
  },

  "0.3": {
    min: 2, need: [[0, 1]],
    concepts: [
      { label: "Primary: the company sells new shares and gets the money", hint: "Who gets paid when the shirts (shares) are first sold?",
        all: [[/\b(primary|ipo|first|new|brand new|initial|original)\b/i], [/\b(band|company|business|issuer|firm|stand)\b/i],
          [/\b(money|cash|gets?|got|receives?|keeps?|raise[sd]?|raising|earns?|paid|funds?|income|goes to|selling|sells|sold)\b/i]] },
      { label: "Secondary: investors trade with each other", hint: "What happens when fans (investors) resell to each other?",
        any: [/\bresell(s|ing)?\b|\bresales?\b|\bre-sell/i, /\bflip(s|ping|ped)?\b/i, /\bfans\b[\s\S]{0,15}\b(sell|selling|resell|trade|trading)\b/i,
          /\b(each other|one another|among themselves|between themselves|between (fans|investors|people|traders)|investor.to.investor|fan to fan|another fan|other fans|other investors|other people|other traders)\b/i,
          /\bsecondary\b[\s\S]{0,60}\b(trade|trading|buy|sell|swap|swapping)/i, /\b(swap|swapping|trade|trading)\b[\s\S]{0,30}\b(existing|already|used)\b/i] },
      { label: "The company gets nothing from resales", hint: "Does the band (company) get any money when fans resell?",
        any: [/\b(band|company|business|firm)\b[\s\S]{0,25}\b(gets?|receives?|makes?|sees?|earns?)\b[\s\S]{0,10}\b(nothing|none|no money|zero)\b/i,
          /\b(doesn'?t|does not|don'?t|do not|won'?t|never|not|isn'?t|is not)\b[\s\S]{0,15}\b(get|gets|receive|make|see|earn|paid|part of)\b/i,
          /\bno money (goes|going|to)\b/i, /\bnone of (it|the money)\b/i, /\bonly (makes|gets|earns) money on the first\b/i, /\bjust between\b/i,
          /\b(isn'?t|is not|not|isnt) involved\b|\bleft out\b|\bstays? out\b/i] }
    ],
    wrong: [
      { say: "Primary vs secondary isn't about buying vs selling, importance, or investor size. Primary: the company sells new shares and gets the money. Secondary: investors trade with each other.",
        patterns: [/\bprimary\b[\s\S]{0,40}\bbuy\b[\s\S]{0,40}\bsecondary\b[\s\S]{0,40}\bsell\b/i,
          /\bprimary (market )?(is|=) (the )?(main|most important|bigger|big)\b/i, /\bsecondary (market )?(is|=) (a |the )?(smaller|less important|small)\b/i,
          /\bprimary\b[\s\S]{0,20}\bfor (big|large|rich|institutional)\b/i] },
      { say: "In the secondary market the company (the band) gets nothing: the money goes between investors (fans).",
        patterns: [/\bsecondary\b[\s\S]{0,40}\b(band|company)\b\s+(?:(?!not\b|doesn'?t\b|does\b|don'?t\b|never\b|won'?t\b|isn'?t\b)[\w']+\s+){0,2}(gets?|receives?) (a cut|money|paid|some)\b/i,
          /\bboth markets give\b/i] }
    ]
  },

  "0.4": {
    min: 2, need: [[1, 2]],
    concepts: [
      { label: "The exchange is the marketplace with rules", hint: "What plays the part of the market itself?",
        any: [/\bexchanges?\b/i, /\bmarket ?place\b/i, /\bnyse\b|\bnasdaq\b/i, /\brules?\b/i, /\bvenues?\b/i] },
      { label: "Individuals and institutions trade there", hint: "Who are the shoppers? Think small investors and big funds.",
        any: [/\b(individuals?|retail|regular people|everyday (people|investors)|ordinary (people|investors)|people like (me|you|us)|small investors)\b/i,
          /\binstitution(s|al)?\b|\bpensions?\b|\bmutual funds?\b|\bhedge funds?\b|\binsur(ers?|ance)\b|\bfunds\b|\bbig (players|firms|investors|institutions)\b|\bgiant players\b|\basset managers?\b/i,
          /\binvestors?\b/i] },
      { label: "Market makers are always ready to trade", hint: "Who are the stalls that are always open?",
        any: [/\bmarket makers?\b/i, /\b(make|makes|making) markets?\b/i, /\b(always|stands?|standing)\b[\s\S]{0,20}\b(ready|willing|there|open|available|quoting)\b/i, /\bdealers?\b/i,
          /\bstalls?\b[\s\S]{0,30}\b(always|buy and sell|ready)\b/i] }
    ],
    wrong: [
      { say: "Companies don't sell their stock there day to day, and the government doesn't run it: individuals, institutions and market makers trade with each other.",
        patterns: [/\b(companies|company)\b[\s\S]{0,20}\b(sell|selling)\b[\s\S]{0,15}\b(their|its) (stock|shares)\b/i, /\bgovernment runs\b/i,
          /\bonly (the )?(rich|companies)\b/i, /\bloans? from banks?\b/i] }
    ]
  },

  "0.5": {
    min: 2, need: [[0], [1]],
    concepts: [
      { label: "A stock means owning part of it", hint: "What do you become when you buy a stock?",
        any: [/\bown(s|ing|er|ers|ership)?\b/i, /\b(part|piece|slice|share|stake|percent|%)\b[\s\S]{0,15}\bof (the )?(stand|company|business)\b/i,
          /\bpart.owner\b/i, /\bequity\b/i] },
      { label: "A bond is a loan that pays interest", hint: "What are you doing when you buy a bond?",
        any: [/\b(loan|loans|loaned|lend|lends|lending|lent|lenders?|borrow|borrows|borrowed|debt|owes?)\b/i, /\binterest\b/i] },
      { label: "Lenders are paid first; stocks carry more risk", hint: "Who gets paid first if the stand struggles? Which is riskier?",
        any: [/\b(paid|pay|repaid|get paid|gets paid)\b[\s\S]{0,25}\b(first|before|ahead)\b/i, /\b(first|before)\b[\s\S]{0,15}\b(owners?|stockholders?|shareholders?)\b/i,
          /\bsafer\b|\bless risky\b|\briskier\b|\bmore risky\b/i, /\bno (guarantee|guaranteed|promise|promised)\b|\bnot guaranteed\b|\bguaranteed\b|\bpromised?\b|\bfixed\b/i,
          /\bmoney back\b|\bpay(s|ing)? (you )?back\b|\brepa(y|id|ys)\b/i, /\bwin\b[\s\S]{0,40}\blose\b|\bprofits? (and|or) loss(es)?\b|\bsharing (the )?profits\b|\bshare (in )?(the )?profits\b/i] }
    ],
    wrong: [
      { say: "It's the other way round: a stock is ownership; a bond is a loan.",
        patterns: [/\bbonds? (is|are|=|means)( when)?( you)? (own|ownership|an owner|part of|a share|a stock|a piece)\b/i, /\bstocks? (is|are|=) (a |an )?(loan|debt|lending)\b/i,
          /\bbonds? (is|are) a (type|kind|form) of stock\b/i, /\bbonds? give you a vote\b/i, /\bsame thing\b/i,
          /\bbonds? makes? you (an |a )?(owner|part.owner)\b/i] },
      { say: "A stock is ownership; a bond is the loan.",
        guard: false, patterns: [/\bstocks? (is|are) not (ownership|owning|an ownership)\b/i] },
      { say: "For the same company, bonds are usually safer than stocks: lenders have a promise and are paid first.",
        patterns: [/\bstocks? (is|are) (safer|less risky)\b/i, /\bbonds? (is|are) (riskier|more risky)\b/i] },
      { say: "You can buy either one. The difference is owning (stock) vs lending (bond).",
        patterns: [/\bbuy a stock and sell a bond\b/i] }
    ]
  },

  "0.6": {
    min: 2, need: [[0, 1]],
    concepts: [
      { label: "The cash leaves the company", hint: "Where does the dividend money come from?",
        any: [/\b(cash|money|value|payout|dividend|it)\b[\s\S]{0,25}\b(leaves?|left|out of|comes? out|taken out|no longer|goes out|leaving)\b/i,
          /\b(company|business|stand)\b[\s\S]{0,25}\b(has|is worth|worth)\b[\s\S]{0,6}\bless\b/i, /\bless (cash|money)\b/i,
          /\b(taking|take|takes|took) \$?\d*\s*(dollars? )?out\b/i, /\bregister\b|\bcash box\b/i,
          /\bpart of the company'?s? (value|cash|money)\b/i, /\b(hands?|gives?|pays?) (you )?(out )?(cash|money)\b[\s\S]{0,40}\b(company|business)\b/i] },
      { label: "The share price drops by about the dividend", hint: "What happens to the share price when the dividend is paid?",
        any: [/\b(price|stock|shares?|value|piece)\b[\s\S]{0,30}\b(drops?|dropped|falls?|fell|decreases?|declines?|goes down|go down|lower|less|reduced?)\b/i,
          /\bworth (about |roughly )?(that much |\$?\d+ )?less\b/i, /\bex.dividend\b/i, /\badjusts? down\b|\bmarked down\b|\bgoes lower\b/i] },
      { label: "It's your money moving, not new money", hint: "Did you actually gain anything overall?",
        any: [/\btotal return\b/i, /\bfrom (the )?(company|business|stand)('s)? (pocket |register )?to (you|your)/i,
          /\b(already|was already) (yours|belonged|owned)\b|\bbelonged to you\b/i, /\bpocket\b/i, /\bsame (money|value|amount)\b/i, /\bprice change plus\b/i,
          /\b(not|no|aren'?t|isn'?t) (any )?richer\b|\bbreak even\b/i, /\b(roughly|about|exactly) the same\b/i] }
    ],
    wrong: [
      { say: "A dividend doesn't add value: the cash leaves the company, so the share price tends to drop by about the dividend.",
        patterns: [/\b(is|it'?s) free money\b/i, /\bdividends? (make|makes|cause|causes)\b[\s\S]{0,15}\b(go up|rise|increase)/i] },
      { say: "The share price usually drops by about the dividend; it doesn't stay the same.",
        guard: false, patterns: [/\bprice stays the same\b/i, /\bprice (doesn'?t|does not) (change|drop|fall)\b/i] }
    ]
  },

  "0.7": {
    min: 2, need: [[0, 1]],
    concepts: [
      { label: "Spread money across many investments", hint: "What do you do with your money when you diversify?",
        any: [/\bspread(ing)?\b/i, /\bdiversif/i, /\b(mix|variety|range|bunch|basket)\b/i,
          /\b(many|lots of|multiple|several|different|various|unrelated|bunch of)\b[\s\S]{0,20}\b(investments?|stocks?|compan(y|ies)|assets?|industr(y|ies)|sectors?|things|baskets?|bets?)\b/i,
          /\ball (your )?eggs\b|\bone basket\b|\bone horse\b/i] },
      { label: "One bad pick can't sink you", hint: "Why does spreading out help? Think about one company failing.",
        any: [/\b(one|single|a few|any one|any single)\b[\s\S]{0,25}\b(bad|fails?|crash(es)?|drops?|tanks?|goes down|loss|loses?|sink|hurt|damage|pick|company)\b/i,
          /\b(reduce[sd]?|reducing|lower(s|ed)?|cut(s)?|limit(s)?|less)\b[\s\S]{0,15}\b(risk|damage|losses?)\b/i,
          /\b(won'?t|doesn'?t|don'?t|not)\b[\s\S]{0,15}\b(lose everything|wipe|sink|ruin|hurt|relying|rely|depend)\b/i, /\bprotect/i] },
      { label: "It can't remove the risk of the whole market falling", hint: "Can diversification protect you from everything?",
        any: [/\b(whole|entire|overall|broad) (market|economy)\b/i, /\bmarket.wide\b|\bsystematic\b/i,
          /\b(can'?t|cannot|doesn'?t|does not|won'?t|not)\b[\s\S]{0,20}\b(remove|eliminate|protect|stop|prevent|avoid|get rid)\b[\s\S]{0,20}\b(all|every|market|crash)/i,
          /\bstill (drop|fall|crash|lose)/i] }
    ],
    wrong: [
      { say: "Diversification reduces risk but never removes it, and it can't guarantee a profit.",
        patterns: [/\b(removes?|removed|eliminates?|eliminated) all (the )?risk\b/i, /\bguarantee/i, /\bcan'?t lose (money|anything)\b/i, /\bno risk\b|\brisk.free\b|\bzero risk\b/i] },
      { say: "Owning many stocks in one industry, or more of the same company, isn't diversification.",
        patterns: [/\b\d+ (tech|technology|bank|energy|oil) (stocks|companies)\b/i, /\bmore shares of the same\b/i, /\bsame (company|industry|sector)\b/i,
          /\ball (your )?money in (one|the best|a single)\b/i, /\bdiverse workforce\b/i] }
    ]
  },

  "1.1": {
    min: 2, need: [[0, 1]],
    concepts: [
      { label: "Bid = what you get if you sell", hint: "What does 20.10 mean for someone who wants to sell?",
        any: [/\bbid(ding|s)?\b/i, /\b20\.10\b[\s\S]{0,40}\b(sell|buyer|pay|bid|highest|most)\b/i, /\b(sell|selling)\b[\s\S]{0,20}\b(at|get|for)\b[\s\S]{0,6}\$?20\.10\b/i,
          /\bhighest (price )?(someone|anyone|a buyer|buyers?)\b/i] },
      { label: "Ask = what you pay to buy", hint: "What does 20.14 mean for someone who wants to buy?",
        any: [/\bask(ing|s)?\b|\boffer(ing|s)?\b/i, /\b20\.14\b[\s\S]{0,40}\b(buy|seller|pay|ask|offer|lowest|least)\b/i, /\b(buy|buying)\b[\s\S]{0,20}\b(at|pay|for)\b[\s\S]{0,6}\$?20\.14\b/i,
          /\blowest (price )?(someone|anyone|a seller|sellers?)\b/i] },
      { label: "Spread = the 4-cent difference", hint: "How far apart are the two numbers?",
        any: [/\b(4|four)[\s-]*(cents?|¢)|\$?0?\.04\b/i, /\b(difference|gap|minus|subtract)\b/i] }
    ],
    wrong: [
      { say: "Swapped: the bid (20.10) is what you get when you sell; the ask (20.14) is what you pay to buy.",
        patterns: [/\b20\.10\b[\s\S]{0,30}\b(you )?pay\b[\s\S]{0,10}\bbuy\b/i, /\b20\.10 is (the price )?(you|i) pay\b/i, /\bbid\s*(is|=|:|of|at)?\s*\$?20\.14\b/i,
          /\bask\s*(is|=|:|of|at)?\s*\$?20\.10\b/i, /\b20\.14\b[\s\S]{0,30}\b(you )?(get|receive)\b[\s\S]{0,15}\bsell/i] },
      { say: "The two numbers are live prices right now, not a price change, a range or a day's low and high.",
        patterns: [/\bwent from\b/i, /\blow and (the )?high\b|\bhigh and (the )?low\b/i, /\baverage\b/i, /\bmoved\b[\s\S]{0,20}\byesterday\b/i] },
      { say: "The spread is the difference between the two numbers, not their sum.", patterns: [/\b40\.24\b/i] }
    ]
  },

  "1.4": {
    min: 2, need: [[0], [2]],
    concepts: [
      { label: "It earns the spread", hint: "Where does a market maker's profit come from on each round trip?",
        any: [/\bspread\b/i, /\b(difference|gap)\b[\s\S]{0,30}\b(buy|sell|bid|ask|price)/i,
          /\b(buy|buys|buying)\b[\s\S]{0,20}\b(bid|lower|low|less|cheap)\b[\s\S]{0,40}\b(sell|sells|selling)\b[\s\S]{0,20}\b(ask|higher|high|more)\b/i,
          /\bbuy low\b[\s\S]{0,15}\bsell high\b/i, /\bhigher price to sell\b|\bpocket(ing|s)? the difference\b/i,
          /\bskim/i, /\bbetween what they (pay|buy)\b[\s\S]{0,30}\b(charge|sell|get)\b/i, /\b(charges?|sells? (it )?for) (a bit |slightly |a little )?more\b/i,
          /\bmark.?up\b|\bmargins?\b/i, /\bpay (a bit |slightly |a little )?less\b/i,
          /\b(cheaper|lower|less) than (they|it) sells?\b/i] },
      { label: "From many trades, not bets on direction", hint: "Does it earn from one big bet or from lots of small trades?",
        any: [/\b(many|lots of|tons of|volume|over and over|again and again|every (trade|round trip)|each (trade|time)|all day|repeatedly|round trips?|thousands|hundreds)\b/i,
          /\bnot\b[\s\S]{0,15}\b(bet|betting|guess|guessing|predict|predicting)\b/i, /\bdoesn'?t (bet|guess|predict)\b/i] },
      { label: "Names a risk: inventory or better-informed traders", hint: "What can go wrong while it holds apples (stock)?",
        any: [/\binventory\b/i, /\b(hold|holds|holding|stuck holding|stuck with)\b/i,
          /\b(price|prices|market)\b[\s\S]{0,25}\b(drops?|falls?|moves?|jumps?|changes?|against|tanks?|crash(es)?|plunges?|dips?|tumbles?|collapses?)\b/i,
          /\badverse selection\b|\b(better.)?informed traders?\b|\bknows? more\b|\bpicked off\b|\bpicks? (it|them|you) off\b|\bafter (the )?news\b|\bnews breaks\b/i] }
    ],
    wrong: [
      { say: "Market makers don't earn by betting on direction or predicting prices: they earn the spread across many trades.",
        patterns: [/\b(bet|betting|bets)\b[\s\S]{0,25}\b(go up|going up|rise|direction|which stocks)\b/i, /\bpredict(s|ing)?\b[\s\S]{0,25}\b(where|price|direction|going)\b/i,
          /\bmake[s]? money when (stocks|prices) go up\b/i] },
      { say: "They don't earn from dividends, government commissions or exchange fees, and they do face risk.",
        patterns: [/\bdividends?\b/i, /\bcommissions? from the government\b/i, /\bno risk\b/i, /\bfee to the exchange\b/i] }
    ]
  }
};
