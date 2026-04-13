// AlfaTranslate — Glossario Tecnico EN-IT
// Gruppo Alfano S.p.A. — Finance · Real Estate · Edilizia
// Livelli: base | medio | avanzato

const GLOSSARY = [
  // ─── FINANCE ───────────────────────────────────────────────────────────────
  {
    id: "amortization", level: "base",
    en: "Amortization", it: "Ammortamento",
    definition: "Ripartizione di un costo (o di un debito) su più esercizi/periodi.",
    category: "finance", tags: ["accounting","debt","depreciation","period"],
    related: ["depreciation","mortgage","debt_service","ebitda"]
  },
  {
    id: "asset", level: "base",
    en: "Asset", it: "Attivo / Bene patrimoniale",
    definition: "Risorsa di proprietà di un'azienda con valore economico, iscritta nello stato patrimoniale.",
    category: "finance", tags: ["accounting","balance_sheet","property","value"],
    related: ["balance_sheet","liability","equity","depreciation","capex"]
  },
  {
    id: "balance_sheet", level: "base",
    en: "Balance sheet", it: "Stato patrimoniale",
    definition: "Prospetto contabile che riporta attività, passività e patrimonio netto a una data specifica.",
    category: "finance", tags: ["accounting","financial_statement","reporting"],
    related: ["asset","liability","equity","working_capital"]
  },
  {
    id: "cap_rate", level: "avanzato",
    en: "Cap rate (Capitalization rate)", it: "Tasso di capitalizzazione",
    definition: "Rapporto tra NOI e valore di mercato dell'immobile; misura il rendimento atteso.",
    category: "finance", tags: ["return","real_estate","valuation","kpi","performance"],
    related: ["noi","yield","discount_rate","appraisal","market_value"]
  },
  {
    id: "capex", level: "base",
    en: "Capital expenditure (CapEx)", it: "Spese in conto capitale",
    definition: "Investimenti in immobilizzazioni materiali o immateriali.",
    category: "finance", tags: ["investment","asset","spending","long_term"],
    related: ["opex","asset","depreciation","ltc","development"]
  },
  {
    id: "cash_flow", level: "base",
    en: "Cash flow", it: "Flusso di cassa",
    definition: "Movimento netto di liquidità in entrata e uscita generato dall'attività.",
    category: "finance", tags: ["liquidity","financial","operations","cash"],
    related: ["working_capital","liquidity","noi","dscr","irr","npv"]
  },
  {
    id: "covenant", level: "avanzato",
    en: "Covenant", it: "Clausola contrattuale (covenant)",
    definition: "Impegno contrattuale, spesso finanziario, imposto al debitore.",
    category: "finance", tags: ["legal","contract","debt","obligation"],
    related: ["default","lease","due_diligence","mortgage","debt_service"]
  },
  {
    id: "debt_service", level: "medio",
    en: "Debt service", it: "Servizio del debito",
    definition: "Pagamenti periodici di capitale e interessi su un finanziamento.",
    category: "finance", tags: ["debt","payment","financial","repayment"],
    related: ["dscr","mortgage","amortization","interest_rate","leverage"]
  },
  {
    id: "default", level: "medio",
    en: "Default", it: "Inadempimento / Insolvenza",
    definition: "Mancato rispetto degli obblighi contrattuali, in particolare di pagamento.",
    category: "finance", tags: ["risk","debt","legal","failure"],
    related: ["covenant","debt_service","solvency","refinancing","liability"]
  },
  {
    id: "depreciation", level: "base",
    en: "Depreciation", it: "Deprezzamento / Ammortamento beni materiali",
    definition: "Riduzione del valore di un bene materiale nel tempo.",
    category: "finance", tags: ["accounting","asset","value","reduction"],
    related: ["amortization","asset","ebitda","capex"]
  },
  {
    id: "discount_rate", level: "avanzato",
    en: "Discount rate", it: "Tasso di sconto / attualizzazione",
    definition: "Tasso usato per scontare i flussi di cassa futuri al valore attuale.",
    category: "finance", tags: ["valuation","investment","time_value","rate"],
    related: ["wacc","npv","irr","cap_rate","interest_rate"]
  },
  {
    id: "dscr", level: "avanzato",
    en: "DSCR (Debt Service Coverage Ratio)", it: "Indice di copertura del servizio del debito",
    definition: "Rapporto tra reddito operativo netto e servizio del debito; usato per valutare sostenibilità finanziaria.",
    category: "finance", tags: ["debt","financial_indicator","risk","kpi","coverage"],
    related: ["noi","debt_service","cash_flow","ltv","leverage"]
  },
  {
    id: "due_diligence", level: "medio",
    en: "Due diligence", it: "Due diligence (verifica preliminare)",
    definition: "Analisi approfondita di aspetti legali, fiscali, tecnici e finanziari prima di un'operazione.",
    category: "finance", tags: ["analysis","legal","transaction","verification","risk"],
    related: ["underwriting","title","appraisal","covenant","risk_assessment"]
  },
  {
    id: "ebit", level: "medio",
    en: "EBIT", it: "Reddito operativo",
    definition: "Earnings Before Interest and Taxes: utile prima di interessi e imposte.",
    category: "finance", tags: ["profitability","financial_indicator","performance"],
    related: ["ebitda","net_profit","income_statement","interest_rate"]
  },
  {
    id: "ebitda", level: "medio",
    en: "EBITDA", it: "Margine operativo lordo (MOL)",
    definition: "Earnings Before Interest, Taxes, Depreciation and Amortization: utile prima di interessi, imposte, ammortamenti.",
    category: "finance", tags: ["profitability","financial_indicator","accounting","performance"],
    related: ["ebit","net_profit","income_statement","revenue","amortization","depreciation"]
  },
  {
    id: "equity", level: "base",
    en: "Equity", it: "Patrimonio netto / Capitale proprio",
    definition: "Differenza tra attività e passività; rappresenta il capitale di pertinenza dei soci.",
    category: "finance", tags: ["accounting","capital","ownership","balance_sheet"],
    related: ["roe","wacc","leverage","balance_sheet","liability","asset"]
  },
  {
    id: "fixed_floating_rate", level: "medio",
    en: "Fixed rate / Floating rate", it: "Tasso fisso / Tasso variabile",
    definition: "Tasso d'interesse costante o agganciato a un parametro (es. Euribor).",
    category: "finance", tags: ["interest","financing","risk","rate"],
    related: ["interest_rate","mortgage","hedging"]
  },
  {
    id: "gross_margin", level: "base",
    en: "Gross margin", it: "Margine lordo",
    definition: "Differenza tra ricavi e costo del venduto, espressa in valore o percentuale.",
    category: "finance", tags: ["profitability","financial","margin"],
    related: ["net_profit","revenue","income_statement","ebitda"]
  },
  {
    id: "hedging", level: "medio",
    en: "Hedging", it: "Copertura del rischio",
    definition: "Strategia per ridurre l'esposizione a rischi finanziari (cambio, tassi, prezzi).",
    category: "finance", tags: ["risk","financial_instrument","protection","strategy"],
    related: ["fixed_floating_rate","interest_rate","risk_assessment"]
  },
  {
    id: "income_statement", level: "base",
    en: "Income statement / P&L", it: "Conto economico",
    definition: "Documento che mostra ricavi, costi e risultato d'esercizio in un periodo.",
    category: "finance", tags: ["accounting","financial_statement","profitability","reporting"],
    related: ["revenue","ebitda","ebit","net_profit","gross_margin"]
  },
  {
    id: "interest_rate", level: "base",
    en: "Interest rate", it: "Tasso di interesse",
    definition: "Costo del denaro espresso in percentuale annua.",
    category: "finance", tags: ["financing","cost","monetary","rate"],
    related: ["fixed_floating_rate","mortgage","wacc","discount_rate","ebit"]
  },
  {
    id: "irr", level: "avanzato",
    en: "IRR (Internal Rate of Return)", it: "Tasso interno di rendimento (TIR)",
    definition: "Tasso che azzera il valore attuale netto dei flussi di cassa di un investimento.",
    category: "finance", tags: ["investment","return","cash_flow","valuation","performance"],
    related: ["npv","discount_rate","cash_flow","roi","yield"]
  },
  {
    id: "leverage", level: "medio",
    en: "Leverage", it: "Leva finanziaria",
    definition: "Uso del debito per amplificare il rendimento del capitale proprio.",
    category: "finance", tags: ["debt","financial_structure","risk","amplification"],
    related: ["ltv","debt_service","mortgage","equity","roe","dscr"]
  },
  {
    id: "liability", level: "base",
    en: "Liability", it: "Passività",
    definition: "Obbligazione finanziaria dell'azienda verso terzi (debiti, mutui, fornitori).",
    category: "finance", tags: ["accounting","balance_sheet","debt","obligation"],
    related: ["balance_sheet","equity","debt_service","mortgage","solvency","default"]
  },
  {
    id: "liquidity", level: "base",
    en: "Liquidity", it: "Liquidità",
    definition: "Capacità di un'attività di essere convertita rapidamente in contanti.",
    category: "finance", tags: ["cash","financial","risk","convertibility"],
    related: ["solvency","cash_flow","working_capital"]
  },
  {
    id: "ltc", level: "avanzato",
    en: "Loan-to-Cost (LTC)", it: "Rapporto finanziamento/costo",
    definition: "Percentuale del costo totale di un progetto coperta dal finanziamento.",
    category: "finance", tags: ["debt","development","financing","ratio"],
    related: ["ltv","mortgage","development","capex"]
  },
  {
    id: "ltv", level: "medio",
    en: "LTV (Loan-to-Value)", it: "Rapporto finanziamento/valore",
    definition: "Percentuale del valore dell'immobile finanziata da un mutuo.",
    category: "finance", tags: ["debt","mortgage","real_estate","ratio","financing"],
    related: ["mortgage","ltc","leverage","dscr","appraisal"]
  },
  {
    id: "mortgage", level: "base",
    en: "Mortgage", it: "Mutuo ipotecario",
    definition: "Finanziamento garantito da ipoteca su immobile.",
    category: "finance", tags: ["debt","financing","real_estate","property","loan"],
    related: ["ltv","interest_rate","amortization","debt_service","leverage","refinancing"]
  },
  {
    id: "net_profit", level: "base",
    en: "Net profit", it: "Utile netto",
    definition: "Risultato finale d'esercizio dopo imposte e oneri straordinari.",
    category: "finance", tags: ["profitability","financial_result","bottom_line"],
    related: ["roi","roe","income_statement","gross_margin","ebitda","ebit"]
  },
  {
    id: "noi", level: "medio",
    en: "NOI (Net Operating Income)", it: "Reddito operativo netto",
    definition: "Ricavi da locazione meno spese operative, escluse imposte e oneri finanziari; KPI chiave nel real estate.",
    category: "finance", tags: ["profitability","real_estate","cash_flow","performance","kpi"],
    related: ["cap_rate","dscr","cash_flow","revenue","rent","yield"]
  },
  {
    id: "npv", level: "avanzato",
    en: "NPV (Net Present Value)", it: "Valore attuale netto (VAN)",
    definition: "Somma attualizzata dei flussi di cassa futuri meno l'investimento iniziale.",
    category: "finance", tags: ["investment","valuation","cash_flow","time_value"],
    related: ["irr","discount_rate","cash_flow","roi"]
  },
  {
    id: "opex", level: "base",
    en: "Operating expenditure (OpEx)", it: "Spese operative",
    definition: "Costi ricorrenti per il funzionamento ordinario.",
    category: "finance", tags: ["cost","operations","recurring","short_term"],
    related: ["capex","working_capital","noi","service_charge"]
  },
  {
    id: "refinancing", level: "medio",
    en: "Refinancing", it: "Rifinanziamento",
    definition: "Sostituzione di un debito esistente con un nuovo finanziamento, generalmente a condizioni migliori.",
    category: "finance", tags: ["debt","mortgage","financing","restructuring"],
    related: ["mortgage","interest_rate","leverage","default","ltv"]
  },
  {
    id: "revenue", level: "base",
    en: "Revenue / Turnover", it: "Ricavi / Fatturato",
    definition: "Totale dei proventi derivanti dalla vendita di beni o servizi.",
    category: "finance", tags: ["income","financial_statement","top_line"],
    related: ["gross_margin","income_statement","noi","rent","ebitda"]
  },
  {
    id: "roi", level: "medio",
    en: "ROI (Return on Investment)", it: "Ritorno sull'investimento",
    definition: "Rapporto tra utile generato e capitale investito.",
    category: "finance", tags: ["investment","return","profitability","kpi","performance"],
    related: ["irr","npv","yield","cap_rate","net_profit","roe"]
  },
  {
    id: "roe", level: "medio",
    en: "ROE (Return on Equity)", it: "Redditività del capitale proprio",
    definition: "Rapporto tra utile netto e patrimonio netto.",
    category: "finance", tags: ["investment","return","equity","kpi","performance"],
    related: ["equity","net_profit","leverage","roi"]
  },
  {
    id: "solvency", level: "base",
    en: "Solvency", it: "Solvibilità",
    definition: "Capacità a lungo termine di onorare i debiti.",
    category: "finance", tags: ["debt","financial","risk","long_term"],
    related: ["liquidity","liability","default","debt_service"]
  },
  {
    id: "underwriting", level: "avanzato",
    en: "Underwriting", it: "Sottoscrizione / Valutazione del rischio",
    definition: "Processo di valutazione e accettazione del rischio (finanziario o assicurativo).",
    category: "finance", tags: ["risk","financing","analysis","evaluation"],
    related: ["due_diligence","risk_assessment","mortgage","ltv"]
  },
  {
    id: "wacc", level: "avanzato",
    en: "WACC", it: "Costo medio ponderato del capitale",
    definition: "Weighted Average Cost of Capital: costo medio del capitale aziendale (debito + equity).",
    category: "finance", tags: ["capital","cost","investment","valuation"],
    related: ["discount_rate","equity","leverage","interest_rate"]
  },
  {
    id: "working_capital", level: "base",
    en: "Working capital", it: "Capitale circolante",
    definition: "Differenza tra attività e passività correnti; misura la liquidità operativa.",
    category: "finance", tags: ["liquidity","operations","balance_sheet","current"],
    related: ["liquidity","cash_flow","balance_sheet","opex"]
  },
  {
    id: "yield", level: "medio",
    en: "Yield", it: "Rendimento",
    definition: "Rendimento percentuale di un investimento, spesso annuo.",
    category: "finance", tags: ["return","investment","real_estate","performance","income"],
    related: ["cap_rate","roi","noi","rent","irr"]
  },

  // ─── REAL ESTATE ───────────────────────────────────────────────────────────
  {
    id: "appraisal", level: "medio",
    en: "Appraisal / Valuation", it: "Perizia / Valutazione",
    definition: "Stima del valore di un immobile da parte di un professionista.",
    category: "realestate", tags: ["valuation","professional","real_estate","assessment"],
    related: ["market_value","cap_rate","comparable","due_diligence","ltv"]
  },
  {
    id: "asset_class", level: "medio",
    en: "Asset class", it: "Classe di attivo",
    definition: "Categoria di immobili (uffici, retail, logistica, residenziale, hospitality, ecc.).",
    category: "realestate", tags: ["real_estate","investment","category","portfolio"],
    related: ["cre","residential","retail","office","logistics","hospitality"]
  },
  {
    id: "asset_management", level: "medio",
    en: "Asset management", it: "Gestione del patrimonio immobiliare",
    definition: "Attività strategica di valorizzazione e gestione di un portafoglio immobiliare.",
    category: "realestate", tags: ["management","portfolio","strategy","value_add"],
    related: ["property_management","facility_management","reit","yield"]
  },
  {
    id: "broker", level: "base",
    en: "Broker", it: "Mediatore / Agente immobiliare",
    definition: "Intermediario tra venditore e acquirente o tra locatore e conduttore.",
    category: "realestate", tags: ["intermediary","transaction","professional","agent"],
    related: ["listing","closing","due_diligence","lease"]
  },
  {
    id: "build_to_suit", level: "avanzato",
    en: "Build-to-suit", it: "Costruzione su misura",
    definition: "Realizzazione di un immobile personalizzato su richiesta di uno specifico tenant.",
    category: "realestate", tags: ["development","custom","tenant","bespoke"],
    related: ["development","tenant","contractor"]
  },
  {
    id: "closing", level: "base",
    en: "Closing", it: "Rogito / Chiusura compravendita",
    definition: "Atto finale di trasferimento della proprietà.",
    category: "realestate", tags: ["transaction","legal","ownership","transfer"],
    related: ["title","title_deed","escrow","conveyancing"]
  },
  {
    id: "common_areas", level: "avanzato",
    en: "Common areas", it: "Aree comuni",
    definition: "Spazi condivisi tra più unità immobiliari (atri, scale, parcheggi).",
    category: "realestate", tags: ["property","building","shared","space"],
    related: ["gla","nia","service_charge"]
  },
  {
    id: "comparable", level: "avanzato",
    en: "Comparable (comp)", it: "Comparabile",
    definition: "Immobile simile usato come riferimento nella valutazione.",
    category: "realestate", tags: ["valuation","analysis","benchmark","reference"],
    related: ["appraisal","market_value"]
  },
  {
    id: "conveyancing", level: "medio",
    en: "Conveyancing", it: "Atti di trasferimento immobiliare",
    definition: "Procedura legale per il trasferimento della proprietà.",
    category: "realestate", tags: ["legal","transaction","process","transfer"],
    related: ["closing","title","escrow"]
  },
  {
    id: "cre", level: "medio",
    en: "Commercial real estate (CRE)", it: "Immobiliare commerciale",
    definition: "Immobili destinati a uso non residenziale (uffici, negozi, capannoni).",
    category: "realestate", tags: ["commercial","property","office","investment"],
    related: ["office","retail","logistics","hospitality","asset_class"]
  },
  {
    id: "development", level: "medio",
    en: "Development", it: "Sviluppo immobiliare",
    definition: "Attività di realizzazione di nuovi immobili o riqualificazione.",
    category: "realestate", tags: ["construction","project","investment","new_build"],
    related: ["greenfield_brownfield","build_to_suit","ltc","capex","project_manager"]
  },
  {
    id: "easement", level: "medio",
    en: "Easement", it: "Servitù",
    definition: "Diritto reale di godimento parziale su un fondo altrui.",
    category: "realestate", tags: ["legal","property","rights","land"],
    related: ["title","zoning","land_registry"]
  },
  {
    id: "escrow", level: "medio",
    en: "Escrow", it: "Deposito fiduciario",
    definition: "Somma trattenuta da un terzo fino al verificarsi di una condizione contrattuale.",
    category: "realestate", tags: ["financial","transaction","legal","trust"],
    related: ["closing","conveyancing","covenant"]
  },
  {
    id: "exit_strategy", level: "avanzato",
    en: "Exit strategy", it: "Strategia di uscita",
    definition: "Modalità prevista di disinvestimento da un'operazione immobiliare.",
    category: "realestate", tags: ["investment","transaction","planning","divestment"],
    related: ["reit","sale_leaseback","roi","irr"]
  },
  {
    id: "facility_management", level: "avanzato",
    en: "Facility management", it: "Gestione dei servizi all'immobile",
    definition: "Gestione di servizi tecnici e ausiliari (manutenzioni, pulizie, sicurezza).",
    category: "realestate", tags: ["management","services","operations","maintenance"],
    related: ["property_management","asset_management","service_charge","hvac"]
  },
  {
    id: "floor_plan", level: "base",
    en: "Floor plan", it: "Pianta / Planimetria",
    definition: "Rappresentazione grafica della distribuzione degli ambienti.",
    category: "realestate", tags: ["design","measurement","building","drawing"],
    related: ["gla","nia","blueprint","bim"]
  },
  {
    id: "gla", level: "medio",
    en: "Gross Leasable Area (GLA)", it: "Superficie lorda locabile",
    definition: "Superficie commerciale destinabile alla locazione.",
    category: "realestate", tags: ["area","measurement","leasing","surface"],
    related: ["nia","floor_plan","vacancy_rate","rent","common_areas"]
  },
  {
    id: "greenfield_brownfield", level: "avanzato",
    en: "Greenfield / Brownfield", it: "Sito vergine / Sito riqualificato",
    definition: "Sviluppo su area non edificata vs riqualificazione di area dismessa.",
    category: "realestate", tags: ["development","land","construction","site"],
    related: ["development","retrofit","demolition"]
  },
  {
    id: "gross_rent", level: "medio",
    en: "Gross rent", it: "Canone lordo",
    definition: "Canone comprensivo di spese accessorie a carico del locatore.",
    category: "realestate", tags: ["income","rental","gross"],
    related: ["rent","net_rent","service_charge"]
  },
  {
    id: "highest_best_use", level: "avanzato",
    en: "Highest and Best Use", it: "Uso ottimale e migliore",
    definition: "Destinazione che massimizza il valore di un immobile nel rispetto delle norme.",
    category: "realestate", tags: ["valuation","planning","optimization","zoning"],
    related: ["market_value","zoning","development","mixed_use"]
  },
  {
    id: "hospitality", level: "medio",
    en: "Hospitality", it: "Ricettivo / Hotellerie",
    definition: "Immobili destinati a ospitalità (alberghi, resort).",
    category: "realestate", tags: ["hotel","tourism","property","accommodation"],
    related: ["cre","asset_class","mixed_use"]
  },
  {
    id: "land_registry", level: "medio",
    en: "Land registry / Cadastre", it: "Catasto",
    definition: "Registro pubblico degli immobili e dei loro dati identificativi.",
    category: "realestate", tags: ["legal","property","public_record","registry"],
    related: ["title_deed","zoning","easement"]
  },
  {
    id: "landlord", level: "base",
    en: "Landlord", it: "Locatore / Proprietario",
    definition: "Soggetto che concede in locazione un immobile.",
    category: "realestate", tags: ["ownership","leasing","property","lessor"],
    related: ["lease","tenant","rent_roll","property_management"]
  },
  {
    id: "lease", level: "base",
    en: "Lease / Lease agreement", it: "Contratto di locazione",
    definition: "Accordo che regola l'uso di un immobile dietro pagamento di un canone.",
    category: "realestate", tags: ["contract","rental","legal","agreement"],
    related: ["landlord","tenant","rent","wault","triple_net_lease","covenant"]
  },
  {
    id: "listing", level: "base",
    en: "Listing", it: "Annuncio / Mandato di vendita",
    definition: "Pubblicazione di un immobile sul mercato a scopo vendita o locazione.",
    category: "realestate", tags: ["marketing","transaction","property","sale"],
    related: ["broker","market_value","property"]
  },
  {
    id: "logistics", level: "medio",
    en: "Logistics / Industrial", it: "Logistica / Industriale",
    definition: "Immobili destinati a magazzini, distribuzione e produzione.",
    category: "realestate", tags: ["industrial","warehouse","property","supply_chain"],
    related: ["cre","asset_class","tenant","build_to_suit"]
  },
  {
    id: "market_value", level: "base",
    en: "Market value", it: "Valore di mercato",
    definition: "Prezzo stimato a cui un immobile sarebbe scambiato in libera contrattazione.",
    category: "realestate", tags: ["valuation","price","real_estate","market"],
    related: ["appraisal","cap_rate","highest_best_use","comparable"]
  },
  {
    id: "mixed_use", level: "medio",
    en: "Mixed-use", it: "Uso misto",
    definition: "Immobile che combina più destinazioni d'uso (es. residenziale + retail).",
    category: "realestate", tags: ["property","development","multiple","urban"],
    related: ["residential","retail","development","highest_best_use"]
  },
  {
    id: "net_rent", level: "medio",
    en: "Net rent", it: "Canone netto",
    definition: "Canone al netto delle spese di gestione.",
    category: "realestate", tags: ["income","rental","net"],
    related: ["rent","gross_rent","noi","opex"]
  },
  {
    id: "nia", level: "medio",
    en: "Net Internal Area (NIA)", it: "Superficie netta interna",
    definition: "Superficie utile interna, esclusi muri e aree comuni.",
    category: "realestate", tags: ["area","measurement","leasing","surface"],
    related: ["gla","floor_plan","common_areas"]
  },
  {
    id: "occupancy_rate", level: "base",
    en: "Occupancy rate", it: "Tasso di occupazione",
    definition: "Percentuale di superficie effettivamente locata.",
    category: "realestate", tags: ["performance","leasing","kpi"],
    related: ["vacancy_rate","rent_roll","wault","noi"]
  },
  {
    id: "office", level: "base",
    en: "Office", it: "Uffici / Direzionale",
    definition: "Immobili a destinazione direzionale.",
    category: "realestate", tags: ["commercial","workspace","property","corporate"],
    related: ["cre","asset_class","tenant","lease","gla"]
  },
  {
    id: "property", level: "base",
    en: "Property", it: "Immobile / Proprietà",
    definition: "Bene immobile, comprensivo di terreno e costruzioni.",
    category: "realestate", tags: ["asset","real_estate","ownership","building"],
    related: ["real_estate","appraisal","market_value","title","noi"]
  },
  {
    id: "property_management", level: "medio",
    en: "Property management", it: "Gestione operativa dell'immobile",
    definition: "Gestione quotidiana di immobili e relativi contratti.",
    category: "realestate", tags: ["management","operations","property","daily"],
    related: ["asset_management","facility_management","landlord","lease"]
  },
  {
    id: "real_estate", level: "base",
    en: "Real estate", it: "Immobiliare / Settore immobiliare",
    definition: "Settore relativo a terreni, edifici e diritti reali su immobili.",
    category: "realestate", tags: ["sector","property","investment","market"],
    related: ["property","asset_class","cre","residential","development"]
  },
  {
    id: "reit", level: "avanzato",
    en: "REIT (Real Estate Investment Trust)", it: "Fondo immobiliare quotato (analogo: SIIQ)",
    definition: "Veicolo di investimento immobiliare quotato con regime fiscale agevolato.",
    category: "realestate", tags: ["investment","fund","real_estate","listed"],
    related: ["spv","asset_management","cap_rate","yield"]
  },
  {
    id: "rent", level: "base",
    en: "Rent / Rental income", it: "Canone di locazione / Reddito da locazione",
    definition: "Importo periodico pagato per l'uso dell'immobile.",
    category: "realestate", tags: ["income","payment","lease","cash_flow"],
    related: ["lease","gross_rent","net_rent","rent_roll","noi","yield"]
  },
  {
    id: "rent_roll", level: "medio",
    en: "Rent roll", it: "Tabella canoni / Stato locativo",
    definition: "Documento che riassume tutti i contratti di locazione di un immobile.",
    category: "realestate", tags: ["document","leasing","portfolio","reporting"],
    related: ["lease","vacancy_rate","occupancy_rate","wault","landlord"]
  },
  {
    id: "residential", level: "base",
    en: "Residential", it: "Residenziale",
    definition: "Immobili destinati ad abitazione.",
    category: "realestate", tags: ["housing","property","living"],
    related: ["real_estate","asset_class","mixed_use"]
  },
  {
    id: "retail", level: "base",
    en: "Retail", it: "Commerciale al dettaglio",
    definition: "Immobili destinati alla vendita al dettaglio (negozi, centri commerciali).",
    category: "realestate", tags: ["commercial","shopping","property","consumer"],
    related: ["cre","asset_class","mixed_use","tenant","lease"]
  },
  {
    id: "sale_leaseback", level: "avanzato",
    en: "Sale and leaseback", it: "Vendita con retrolocazione",
    definition: "Vendita di un immobile e contestuale locazione allo stesso venditore.",
    category: "realestate", tags: ["transaction","financing","real_estate","liquidity"],
    related: ["lease","landlord","tenant","refinancing"]
  },
  {
    id: "service_charge", level: "avanzato",
    en: "Service charge", it: "Spese condominiali / di gestione",
    definition: "Costi di gestione e manutenzione ribaltati sul conduttore.",
    category: "realestate", tags: ["cost","leasing","management","operating"],
    related: ["triple_net_lease","gross_rent","facility_management","opex"]
  },
  {
    id: "spv", level: "avanzato",
    en: "SPV (Special Purpose Vehicle)", it: "Veicolo societario dedicato",
    definition: "Società costituita per uno specifico progetto o operazione, spesso immobiliare.",
    category: "realestate", tags: ["legal","investment","structure","corporate"],
    related: ["reit","development","escrow"]
  },
  {
    id: "tenant", level: "base",
    en: "Tenant", it: "Conduttore / Locatario",
    definition: "Soggetto che prende in locazione un immobile.",
    category: "realestate", tags: ["leasing","occupier","contract","lessee"],
    related: ["lease","rent","landlord","wault","triple_net_lease"]
  },
  {
    id: "title", level: "base",
    en: "Title", it: "Titolo di proprietà",
    definition: "Documento che attesta il diritto di proprietà su un immobile.",
    category: "realestate", tags: ["ownership","legal","property","document"],
    related: ["title_deed","closing","conveyancing","due_diligence"]
  },
  {
    id: "title_deed", level: "medio",
    en: "Title deed", it: "Atto di proprietà",
    definition: "Documento notarile che certifica il trasferimento della proprietà.",
    category: "realestate", tags: ["ownership","legal","document","notarial"],
    related: ["title","closing","land_registry"]
  },
  {
    id: "triple_net_lease", level: "avanzato",
    en: "Triple net lease (NNN)", it: "Locazione triple net",
    definition: "Contratto in cui il conduttore paga imposte, assicurazioni e manutenzione.",
    category: "realestate", tags: ["lease","contract","commercial","net"],
    related: ["lease","service_charge","tenant","landlord"]
  },
  {
    id: "vacancy_rate", level: "base",
    en: "Vacancy rate", it: "Tasso di sfitto",
    definition: "Percentuale di superficie non locata sul totale disponibile.",
    category: "realestate", tags: ["performance","leasing","risk","kpi"],
    related: ["occupancy_rate","rent_roll","gla","noi"]
  },
  {
    id: "wault", level: "avanzato",
    en: "WAULT (Weighted Average Unexpired Lease Term)", it: "Durata residua media ponderata dei contratti",
    definition: "Indicatore della stabilità dei flussi di affitto.",
    category: "realestate", tags: ["lease","performance","stability","kpi","duration"],
    related: ["lease","tenant","rent_roll","occupancy_rate"]
  },
  {
    id: "zoning", level: "base",
    en: "Zoning", it: "Destinazione urbanistica / Zonizzazione",
    definition: "Regole urbanistiche che stabiliscono la destinazione d'uso di un'area.",
    category: "realestate", tags: ["planning","regulation","property","urban"],
    related: ["land_registry","highest_best_use","planning_permission","building_permit"]
  },

  // ─── CONSTRUCTION ──────────────────────────────────────────────────────────
  {
    id: "as_built", level: "avanzato",
    en: "As-built drawings", it: "Disegni 'come costruito'",
    definition: "Elaborati grafici aggiornati allo stato finale dell'opera.",
    category: "construction", tags: ["documentation","drawings","completion","record"],
    related: ["bim","blueprint","snagging","final_inspection"]
  },
  {
    id: "beam", level: "base",
    en: "Beam", it: "Trave",
    definition: "Elemento strutturale orizzontale che sostiene carichi.",
    category: "construction", tags: ["structural","engineering","horizontal","support"],
    related: ["slab","column","reinforced_concrete","steel_structure"]
  },
  {
    id: "bim", level: "avanzato",
    en: "BIM (Building Information Modeling)", it: "Modellazione informativa dell'edificio",
    definition: "Metodologia digitale di progettazione e gestione integrata dell'edificio.",
    category: "construction", tags: ["digital","design","methodology","technology","3d"],
    related: ["cad","as_built","blueprint","mep","floor_plan"]
  },
  {
    id: "blueprint", level: "avanzato",
    en: "Blueprint", it: "Disegno tecnico / Progetto esecutivo",
    definition: "Elaborato grafico di progetto.",
    category: "construction", tags: ["design","documentation","planning","drawing"],
    related: ["as_built","bim","cad","floor_plan","boq"]
  },
  {
    id: "boq", level: "medio",
    en: "Bill of Quantities (BoQ)", it: "Computo metrico estimativo",
    definition: "Documento che elenca quantità e prezzi delle lavorazioni.",
    category: "construction", tags: ["cost","document","measurement","procurement"],
    related: ["quantity_surveyor","tender","schedule_of_works","blueprint","capex"]
  },
  {
    id: "building_permit", level: "base",
    en: "Building permit", it: "Permesso di costruire",
    definition: "Autorizzazione amministrativa per l'esecuzione di lavori edili.",
    category: "construction", tags: ["legal","planning","authorization","administrative"],
    related: ["planning_permission","zoning","contractor","client"]
  },
  {
    id: "building_site", level: "base",
    en: "Building site / Construction site", it: "Cantiere",
    definition: "Area dove vengono eseguiti i lavori edili.",
    category: "construction", tags: ["construction","operations","safety","site"],
    related: ["foundation","contractor","site_manager","scaffolding","health_safety"]
  },
  {
    id: "cad", level: "avanzato",
    en: "CAD (Computer-Aided Design)", it: "Progettazione assistita dal computer",
    definition: "Software per la creazione di disegni tecnici.",
    category: "construction", tags: ["software","design","digital","drawing"],
    related: ["bim","blueprint","floor_plan"]
  },
  {
    id: "certificate_occupancy", level: "medio",
    en: "Certificate of occupancy", it: "Certificato di agibilità",
    definition: "Atto che attesta l'idoneità all'uso dell'immobile.",
    category: "construction", tags: ["legal","building","occupancy","authorization"],
    related: ["final_inspection","commissioning","building_permit","epc"]
  },
  {
    id: "cladding", level: "medio",
    en: "Cladding", it: "Rivestimento esterno",
    definition: "Strato esterno di rivestimento di una parete.",
    category: "construction", tags: ["exterior","finish","protection","envelope"],
    related: ["facade","masonry","waterproofing","insulation"]
  },
  {
    id: "client", level: "base",
    en: "Client / Owner", it: "Committente",
    definition: "Soggetto che commissiona e finanzia l'opera.",
    category: "construction", tags: ["procurement","ownership","project","commissioner"],
    related: ["contractor","project_manager","building_permit","capex"]
  },
  {
    id: "column", level: "base",
    en: "Column / Pillar", it: "Pilastro",
    definition: "Elemento strutturale verticale.",
    category: "construction", tags: ["structural","engineering","vertical","support"],
    related: ["beam","load_bearing_wall","reinforced_concrete","steel_structure"]
  },
  {
    id: "commissioning", level: "medio",
    en: "Commissioning", it: "Messa in servizio / Collaudo funzionale",
    definition: "Verifica del corretto funzionamento degli impianti prima dell'uso.",
    category: "construction", tags: ["handover","testing","completion","systems"],
    related: ["snagging","final_inspection","certificate_occupancy","hvac","mep"]
  },
  {
    id: "construction", level: "base",
    en: "Construction", it: "Edilizia / Costruzione",
    definition: "Settore della realizzazione di opere edili e infrastrutturali.",
    category: "construction", tags: ["sector","building","industry","civil"],
    related: ["building_site","contractor","project_manager","development"]
  },
  {
    id: "contingency", level: "medio",
    en: "Contingency", it: "Imprevisti / Riserva di budget",
    definition: "Quota di budget destinata a coprire spese impreviste.",
    category: "construction", tags: ["risk","budget","planning","reserve"],
    related: ["cost_overrun","capex","boq","risk_assessment"]
  },
  {
    id: "contractor", level: "base",
    en: "Contractor", it: "Appaltatore / Impresa esecutrice",
    definition: "Soggetto che esegue i lavori per conto del committente.",
    category: "construction", tags: ["construction","execution","professional","builder"],
    related: ["subcontractor","client","project_manager","tender","boq"]
  },
  {
    id: "cost_overrun", level: "medio",
    en: "Cost overrun", it: "Sforamento di costo",
    definition: "Superamento del budget di progetto.",
    category: "construction", tags: ["risk","cost","budget","financial"],
    related: ["contingency","variation_order","capex","quantity_surveyor"]
  },
  {
    id: "cost_plus", level: "medio",
    en: "Cost-plus contract", it: "Contratto a costi rimborsati",
    definition: "Contratto in cui il committente rimborsa i costi più un margine all'appaltatore.",
    category: "construction", tags: ["contract","pricing","flexible","procurement"],
    related: ["lump_sum","tender","contractor","boq"]
  },
  {
    id: "curtain_wall", level: "medio",
    en: "Curtain wall", it: "Facciata continua",
    definition: "Facciata non strutturale, generalmente in vetro e metallo.",
    category: "construction", tags: ["exterior","glass","modern","envelope"],
    related: ["facade","steel_structure","cladding","insulation"]
  },
  {
    id: "demolition", level: "base",
    en: "Demolition", it: "Demolizione",
    definition: "Smantellamento di una struttura esistente.",
    category: "construction", tags: ["deconstruction","construction","removal","site"],
    related: ["greenfield_brownfield","refurbishment","excavation"]
  },
  {
    id: "epc", level: "medio",
    en: "Energy performance certificate (EPC)", it: "Attestato di prestazione energetica (APE)",
    definition: "Documento che certifica la classe energetica dell'edificio.",
    category: "construction", tags: ["energy","certification","sustainability","efficiency"],
    related: ["leed","net_zero","insulation","hvac","retrofit"]
  },
  {
    id: "excavation", level: "base",
    en: "Excavation", it: "Scavo",
    definition: "Operazione di rimozione di terreno.",
    category: "construction", tags: ["earthworks","construction","foundation","ground"],
    related: ["foundation","building_site","demolition"]
  },
  {
    id: "facade", level: "base",
    en: "Façade", it: "Facciata",
    definition: "Superficie esterna verticale di un edificio.",
    category: "construction", tags: ["exterior","building","architecture","envelope"],
    related: ["curtain_wall","cladding","insulation","waterproofing"]
  },
  {
    id: "final_inspection", level: "medio",
    en: "Punch-out / Final inspection", it: "Collaudo finale",
    definition: "Verifica conclusiva prima dell'accettazione dell'opera.",
    category: "construction", tags: ["handover","quality","completion","acceptance"],
    related: ["commissioning","snagging","certificate_occupancy","as_built"]
  },
  {
    id: "foundation", level: "base",
    en: "Foundation", it: "Fondazione",
    definition: "Struttura che trasferisce i carichi dell'edificio al terreno.",
    category: "construction", tags: ["structural","engineering","construction","ground"],
    related: ["load_bearing_wall","slab","reinforced_concrete","building_site","excavation"]
  },
  {
    id: "health_safety", level: "base",
    en: "Health and Safety (H&S)", it: "Sicurezza sul lavoro",
    definition: "Insieme di norme e prassi per la tutela dei lavoratori.",
    category: "construction", tags: ["safety","legal","construction","workers","regulation"],
    related: ["ppe","risk_assessment","building_site","site_manager"]
  },
  {
    id: "hvac", level: "medio",
    en: "HVAC (Heating, Ventilation, Air Conditioning)", it: "Riscaldamento, ventilazione e condizionamento",
    definition: "Sistemi impiantistici per il comfort climatico.",
    category: "construction", tags: ["mechanical","energy","comfort","systems","sustainability"],
    related: ["mep","insulation","commissioning","epc","facility_management"]
  },
  {
    id: "insulation", level: "medio",
    en: "Insulation", it: "Isolamento (termico/acustico)",
    definition: "Materiali e tecniche per ridurre dispersioni termiche e rumori.",
    category: "construction", tags: ["energy","thermal","acoustic","sustainability"],
    related: ["hvac","epc","roofing","facade","net_zero","retrofit"]
  },
  {
    id: "leed", level: "avanzato",
    en: "LEED / BREEAM", it: "Certificazioni di sostenibilità edilizia",
    definition: "Standard internazionali di valutazione della sostenibilità degli edifici.",
    category: "construction", tags: ["sustainability","certification","green","environment"],
    related: ["epc","net_zero","insulation","bim"]
  },
  {
    id: "load_bearing_wall", level: "base",
    en: "Load-bearing wall", it: "Muro portante",
    definition: "Parete strutturale che sostiene parte del carico dell'edificio.",
    category: "construction", tags: ["structural","engineering","wall","support"],
    related: ["foundation","masonry","reinforced_concrete","slab"]
  },
  {
    id: "lump_sum", level: "medio",
    en: "Lump sum contract", it: "Contratto a corpo",
    definition: "Contratto a importo fisso per la realizzazione dell'opera.",
    category: "construction", tags: ["contract","pricing","fixed","procurement"],
    related: ["cost_plus","tender","contractor","boq"]
  },
  {
    id: "masonry", level: "base",
    en: "Masonry", it: "Muratura",
    definition: "Costruzione realizzata con mattoni, pietre o blocchi.",
    category: "construction", tags: ["material","construction","traditional","brick"],
    related: ["load_bearing_wall","facade","cladding"]
  },
  {
    id: "mep", level: "avanzato",
    en: "MEP (Mechanical, Electrical, Plumbing)", it: "Impianti meccanici, elettrici e idraulici",
    definition: "Insieme degli impianti tecnologici di un edificio.",
    category: "construction", tags: ["engineering","systems","building","technical"],
    related: ["hvac","plumbing","wiring","bim","commissioning"]
  },
  {
    id: "milestone", level: "medio",
    en: "Milestone", it: "Milestone / Tappa fondamentale",
    definition: "Evento chiave nella pianificazione del progetto.",
    category: "construction", tags: ["planning","time","progress","checkpoint"],
    related: ["schedule_of_works","project_manager","commissioning"]
  },
  {
    id: "net_zero", level: "avanzato",
    en: "Net zero building", it: "Edificio a emissioni nette zero",
    definition: "Edificio il cui consumo energetico netto è pari a zero su base annua.",
    category: "construction", tags: ["sustainability","energy","environment","carbon"],
    related: ["leed","epc","insulation","hvac","retrofit"]
  },
  {
    id: "planning_permission", level: "medio",
    en: "Planning permission", it: "Autorizzazione urbanistica",
    definition: "Approvazione dell'amministrazione per interventi edilizi.",
    category: "construction", tags: ["legal","planning","authorization","urban"],
    related: ["building_permit","zoning","development"]
  },
  {
    id: "plumbing", level: "medio",
    en: "Plumbing", it: "Impianto idraulico",
    definition: "Sistema di tubazioni per acqua e scarichi.",
    category: "construction", tags: ["water","systems","mechanical","pipes"],
    related: ["mep","hvac","waterproofing"]
  },
  {
    id: "ppe", level: "base",
    en: "PPE (Personal Protective Equipment)", it: "DPI (Dispositivi di Protezione Individuale)",
    definition: "Attrezzature di protezione obbligatorie in cantiere.",
    category: "construction", tags: ["safety","equipment","construction","protection"],
    related: ["health_safety","building_site","risk_assessment"]
  },
  {
    id: "project_manager", level: "base",
    en: "Project manager", it: "Project manager / Responsabile di progetto",
    definition: "Responsabile della gestione complessiva del progetto.",
    category: "construction", tags: ["management","coordination","professional","leadership"],
    related: ["site_manager","milestone","schedule_of_works","contractor","client"]
  },
  {
    id: "quantity_surveyor", level: "medio",
    en: "Quantity surveyor", it: "Computista metrico / Estimatore",
    definition: "Professionista che stima costi, quantità e contabilità lavori.",
    category: "construction", tags: ["professional","cost","measurement","estimation"],
    related: ["boq","tender","cost_overrun","contingency"]
  },
  {
    id: "refurbishment", level: "base",
    en: "Refurbishment / Renovation", it: "Ristrutturazione",
    definition: "Interventi di rinnovamento di un immobile esistente.",
    category: "construction", tags: ["renovation","existing_building","improvement","upgrade"],
    related: ["retrofit","restoration","capex","greenfield_brownfield"]
  },
  {
    id: "reinforced_concrete", level: "medio",
    en: "Reinforced concrete", it: "Calcestruzzo armato",
    definition: "Calcestruzzo rinforzato con armature in acciaio.",
    category: "construction", tags: ["material","structural","construction","concrete"],
    related: ["foundation","slab","beam","column","load_bearing_wall"]
  },
  {
    id: "restoration", level: "avanzato",
    en: "Restoration", it: "Restauro",
    definition: "Intervento conservativo, tipico di edifici storici.",
    category: "construction", tags: ["conservation","heritage","repair","historic"],
    related: ["refurbishment","retrofit"]
  },
  {
    id: "retrofit", level: "avanzato",
    en: "Retrofit", it: "Riqualificazione / Adeguamento",
    definition: "Adeguamento tecnologico o energetico di un edificio esistente.",
    category: "construction", tags: ["upgrade","energy","existing_building","sustainability"],
    related: ["refurbishment","epc","insulation","net_zero","greenfield_brownfield"]
  },
  {
    id: "risk_assessment", level: "avanzato",
    en: "Risk assessment", it: "Valutazione dei rischi",
    definition: "Analisi dei pericoli e delle misure di mitigazione (DVR).",
    category: "construction", tags: ["safety","planning","analysis","risk","dvr"],
    related: ["health_safety","ppe","contingency","due_diligence","underwriting"]
  },
  {
    id: "roofing", level: "base",
    en: "Roofing", it: "Copertura / Tetto",
    definition: "Sistema di chiusura superiore dell'edificio.",
    category: "construction", tags: ["exterior","protection","structure","envelope"],
    related: ["insulation","waterproofing","facade"]
  },
  {
    id: "scaffolding", level: "base",
    en: "Scaffolding", it: "Ponteggio",
    definition: "Struttura provvisoria per consentire lavori in quota.",
    category: "construction", tags: ["construction","safety","temporary","height"],
    related: ["building_site","health_safety","facade"]
  },
  {
    id: "schedule_of_works", level: "medio",
    en: "Schedule of works", it: "Cronoprogramma lavori",
    definition: "Pianificazione temporale delle fasi di costruzione.",
    category: "construction", tags: ["planning","time","project","programme"],
    related: ["milestone","project_manager","boq","variation_order"]
  },
  {
    id: "site_manager", level: "medio",
    en: "Site manager", it: "Direttore di cantiere",
    definition: "Responsabile delle attività operative in cantiere.",
    category: "construction", tags: ["management","construction","supervision","site"],
    related: ["project_manager","building_site","health_safety","contractor"]
  },
  {
    id: "slab", level: "base",
    en: "Slab", it: "Soletta",
    definition: "Elemento orizzontale piano in calcestruzzo o altro materiale.",
    category: "construction", tags: ["structural","concrete","floor","horizontal"],
    related: ["foundation","beam","reinforced_concrete","load_bearing_wall"]
  },
  {
    id: "snagging", level: "avanzato",
    en: "Snagging / Punch list", it: "Lista delle non conformità",
    definition: "Elenco di difetti da correggere prima della consegna finale.",
    category: "construction", tags: ["quality","handover","defects","checklist"],
    related: ["as_built","certificate_occupancy","final_inspection","commissioning"]
  },
  {
    id: "steel_structure", level: "medio",
    en: "Steel structure", it: "Struttura in acciaio",
    definition: "Telaio portante realizzato in profilati d'acciaio.",
    category: "construction", tags: ["material","structural","modern","metal"],
    related: ["beam","column","facade","curtain_wall"]
  },
  {
    id: "subcontractor", level: "medio",
    en: "Subcontractor", it: "Subappaltatore",
    definition: "Impresa che esegue parte dei lavori per conto dell'appaltatore principale.",
    category: "construction", tags: ["construction","execution","specialized","trades"],
    related: ["contractor","mep","hvac"]
  },
  {
    id: "tender", level: "medio",
    en: "Tender / Bid", it: "Gara d'appalto / Offerta",
    definition: "Procedura competitiva per l'affidamento di lavori.",
    category: "construction", tags: ["procurement","competition","contract","bid"],
    related: ["contractor","boq","lump_sum","cost_plus","client"]
  },
  {
    id: "turnkey", level: "medio",
    en: "Turnkey", it: "Chiavi in mano",
    definition: "Modalità contrattuale in cui l'appaltatore consegna l'opera completa e funzionante.",
    category: "construction", tags: ["contract","delivery","complete","procurement"],
    related: ["lump_sum","contractor","client","commissioning"]
  },
  {
    id: "variation_order", level: "avanzato",
    en: "Variation order / Change order", it: "Variante / Ordine di modifica",
    definition: "Modifica formale al contratto o ai lavori in corso.",
    category: "construction", tags: ["contract","change","cost","modification"],
    related: ["cost_overrun","schedule_of_works","contractor","boq"]
  },
  {
    id: "waterproofing", level: "medio",
    en: "Waterproofing", it: "Impermeabilizzazione",
    definition: "Trattamento per impedire infiltrazioni d'acqua.",
    category: "construction", tags: ["protection","moisture","construction","envelope"],
    related: ["foundation","roofing","facade","cladding"]
  },
  {
    id: "wiring", level: "medio",
    en: "Wiring / Electrical system", it: "Impianto elettrico",
    definition: "Insieme di cavi, quadri e dispositivi elettrici.",
    category: "construction", tags: ["electrical","systems","building","power"],
    related: ["mep","commissioning","bim"]
  }
];

// Lookup map
const GLOSSARY_MAP = {};
GLOSSARY.forEach(t => { GLOSSARY_MAP[t.id] = t; });

// Category metadata
const CATEGORIES = {
  all:          { label: "Tutti",       color: "#6B7280" },
  finance:      { label: "Finance",     color: "#3B82F6" },
  realestate:   { label: "Real Estate", color: "#10B981" },
  construction: { label: "Edilizia",    color: "#F59E0B" }
};

// Level metadata
const LEVELS = {
  all:      { label: "Tutti i livelli", color: "#6B7280" },
  base:     { label: "Base",            color: "#6366F1" },
  medio:    { label: "Medio",           color: "#EC4899" },
  avanzato: { label: "Avanzato",        color: "#EF4444" }
};
