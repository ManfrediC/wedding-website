# Wedding Website Build Specification — Version 2

**Couple:** Gabriela Dago and Manfredi Carta  
**Wedding date:** Friday, 11 June 2027  
**Ceremony:** Kirche St. Peter, Zurich  
**Reception and party:** Hotel Sonne, Küsnacht  
**Website type:** Fully custom, password-protected, multilingual wedding website  
**Languages:** English, Italian, German  
**Tone:** Warm, elegant, formal, guest-friendly  
**Document status:** Updated build specification after initial decisions  
**Prepared:** 10 May 2026

---

## 1. Executive Summary

Build a **fully custom wedding website** for Gabriela Dago and Manfredi Carta’s wedding on **11 June 2027**. The site should feel warm and personal while remaining highly practical for guests travelling to Zurich and Küsnacht from Switzerland, Chicago, the UK, Italy, and elsewhere.

The website should be:

- **custom-built**, not a Minted/Joy template;
- **password-protected except for the public animated invitation at `/petri-turicensis-vi-mmxxvii/`**;
- **available in English, Italian, and German**;
- **mobile-first**, because most guests will use it while travelling;
- **easy to update** as timings, boat details, accommodation codes, and RSVP deadlines become final;
- **low-cost**, ideally free apart from a custom domain;
- **clear about logistics**, especially public transport, the boat transfer, accommodation blocks, and Switzerland travel practicalities.

The recommended implementation is:

- **Astro + TypeScript + Markdown/MDX** for the custom multilingual site;
- **Cloudflare Pages** for free static hosting;
- **Cloudflare Pages Functions or Worker middleware** for site-wide password protection;
- **Tally + Google Sheets** as the recommended free RSVP workflow;
- **Google Drive or the GitHub repository** as the organised home for photos, copy, and translations.

---

## 2. Confirmed Decisions

| Area | Decision | Notes |
|---|---|---|
| Website type | Fully custom | The Minted draft is an asset source, not the final platform. |
| Domain | Not chosen yet | Candidate domains should be shortlisted and checked for availability. |
| Privacy | Password-protected | The whole site should sit behind a shared password or guest access code. |
| RSVP tool | Easiest/free preferred | Recommended: Tally, with Google Sheets sync. Joy remains a fallback if wedding-specific guest management becomes more important. |
| Languages | English, Italian, German | English should be the source language; Italian and German should be reviewed by native/fluent speakers. |
| Tone | Warm | Warm, elegant, clear, and international. Not overly playful or corporate. |
| Hero image | Not decided | Build should support an image placeholder until final photo is selected. |
| Boat transfer | Probably private | Site should be written as “host-arranged boat transfer, details to be confirmed”. |
| Boat tickets | Undecided, probably provided | Wording should avoid asking guests to buy boat tickets unless later confirmed. |
| Accommodation | Likely block at Hotel Sonne; possible codes elsewhere | Accommodation page should be designed around room-block updates. |
| Dress code | Formal | FAQ and schedule should mention formal attire plus practical shoes/layers for boat/lakefront. |
| Children and plus ones | Permitted | Interpreted as: children and partners/plus ones may attend. RSVP must collect accurate names and numbers. |

### Important interpretation to confirm later

The answer “they may come” has been interpreted generously: **children and plus ones are welcome**. For planning purposes, the RSVP still needs to define whether every invited guest may add a partner, whether all children are included, and whether the invitation wording should control this per household.

---

## 3. Primary Product Goal

The website should answer the question every guest will have:

> “What do I need to know to celebrate with Gabriela and Manfredi in Zurich, without worrying about logistics?”

The site should therefore prioritise:

1. the emotional welcome;
2. the wedding-day sequence;
3. how to travel to Zurich;
4. where to stay;
5. how to get around Switzerland affordably;
6. what to do before and after the wedding;
7. RSVP and guest details.

---

## 4. Recommended Technical Architecture

## 4.1 Framework

Use **Astro** with **TypeScript**.

Reasons:

- excellent for mostly static, content-rich websites;
- fast on mobile;
- works naturally with Markdown/MDX content;
- supports structured page layouts and reusable components;
- has internationalisation routing support suitable for English, Italian, and German;
- avoids a heavy backend unless custom RSVP is later required.

Recommended stack:

```txt
Astro
TypeScript
Markdown / MDX
Plain CSS modules or Tailwind CSS
Cloudflare Pages
Cloudflare Pages Functions / Workers middleware
Tally RSVP forms
Google Sheets for RSVP data export
```

## 4.2 Hosting

Use **Cloudflare Pages** as the default host.

Reasons:

- static hosting can be free;
- custom domains are supported;
- Pages Functions can add server-side behaviour such as authentication middleware;
- Cloudflare Workers/Pages free limits are more than sufficient for a private wedding website;
- Cloudflare DNS will also make future domain setup straightforward.

Avoid relying on Vercel password protection as the default because Vercel’s built-in password protection is tied to paid team/protection options for production-style deployment protection. Vercel is still acceptable if password protection is implemented manually, but Cloudflare is the cleaner low-cost option.

## 4.3 Password protection

The wedding website should have **site-wide password protection**, not only a protected RSVP page. The animated invitation at `/petri-turicensis-vi-mmxxvii/` is the sole public exception and must not display the wedding password.

Recommended implementation:

1. Guests visit the website URL.
2. A warm password screen appears.
3. Guest enters the shared wedding password.
4. The site stores a secure cookie for a limited period, for example 30 days.
5. Guest is redirected to the language selector or their chosen language homepage.
6. Protected pages and protected images are only served after the cookie is valid.

Recommended password screen copy:

> Welcome to Gabriela & Manfredi’s wedding website.  
> Please enter the password from your invitation.

Technical notes:

- Store the password itself as an environment variable, not in the code repository.
- Prefer a server-side check using Cloudflare Pages Functions or Workers middleware.
- Use HTTPS only.
- Use `noindex, nofollow` metadata and a restrictive `robots.txt` because the site is private.
- Do not place guest lists, private contact details, or sensitive personal information on ordinary content pages.
- The shared password is suitable for wedding privacy, not for high-security access control.

## 4.4 Domain

No domain has been chosen yet.

Candidate domains to check:

- `gabrielaandmanfredi.com`
- `gabrielamanfredi.com`
- `gabriela-manfredi.com`
- `gdagomcarta.com`
- `dago-carta.com`
- `gabriela-manfredi.ch`
- `dago-carta.ch`

Recommendation:

- Prefer a short, easy-to-type domain for printed invitations and QR codes.
- Avoid accents or special characters.
- Buy the domain once the final candidate is chosen.
- Use Cloudflare DNS even if the domain is purchased elsewhere.

## 4.5 RSVP

Use **Tally** as the default RSVP tool.

Why Tally is recommended:

- it has a generous free plan;
- it supports unlimited forms and submissions within fair-use rules;
- forms can be embedded into the custom website;
- form password protection is available;
- conditional logic is available for free;
- responses can be sent to Google Sheets;
- it avoids building and maintaining a custom database.

Recommended RSVP structure:

- Three translated RSVP forms: English, Italian, German.
- Identical field structure across all three forms.
- Hidden field: `language`.
- Hidden or visible field: `invitation_code`.
- Responses sent to one Google Sheet, ideally one tab per language or one combined tab with a language column.

Alternative:

- Use **Joy RSVP** if wedding-specific guest-list management becomes more important than design integration. Joy is free and has wedding-specific RSVP and guest-list tools, but it would be an external workflow rather than a fully integrated custom RSVP.

Avoid for now:

- A fully custom RSVP backend. It gives the most control but creates more responsibility for data protection, debugging, and guest support.

---

## 5. Multilingual Strategy

## 5.1 Supported languages

| Language | Code | Role |
|---|---|---|
| English | `en` | Default/source language |
| Italian | `it` | Full translation |
| German | `de` | Full translation |

English should be the first written version. Italian and German should then be translated and reviewed.

## 5.2 URL structure

Recommended routes:

```txt
/login
/en/
/en/schedule/
/en/travel/
/en/stay/
/en/things-to-do/
/en/switzerland-guide/
/en/faq/
/en/rsvp/
/en/gifts/
/en/contact/

/it/
/it/schedule/
/it/travel/
/it/stay/
/it/things-to-do/
/it/switzerland-guide/
/it/faq/
/it/rsvp/
/it/gifts/
/it/contact/

/de/
/de/schedule/
/de/travel/
/de/stay/
/de/things-to-do/
/de/switzerland-guide/
/de/faq/
/de/rsvp/
/de/gifts/
/de/contact/
```

Root route behaviour:

```txt
/  → password check → language selector or /en/
```

## 5.3 Language switcher

Every page should have a clear language switcher:

```txt
English | Italiano | Deutsch
```

Switching language should preserve the equivalent page where possible. For example:

```txt
/en/travel/ → /it/travel/ → /de/travel/
```

## 5.4 Translation workflow

Use a simple translation status for every page:

| Status | Meaning |
|---|---|
| Draft EN | English draft exists only |
| Translated | Italian/German translation added |
| Reviewed | Reviewed by fluent speaker |
| Final | Ready for launch |
| Needs update | Original changed; translations need updating |

Keep translations warm and natural rather than literal. The German version should be clear and practical. The Italian version can be warmer and slightly more expressive if desired, but all three languages should contain the same practical details.

---

## 6. Design Direction

## 6.1 Tone

The site should feel:

- warm;
- elegant;
- personal;
- formal enough for a wedding;
- practical for international guests;
- Zurich and Lake Zurich inspired.

Suggested design sentence:

> A warm celebration beginning in old Zurich and continuing across Lake Zurich to an evening by the water.

## 6.2 Visual direction

The design should borrow structural clarity from the Joy inspiration websites while remaining custom and personal.

Key visual ideas:

- large photographic landing section;
- quiet editorial typography;
- soft Swiss-lakeside colour palette;
- warm welcome copy;
- clean cards for logistics;
- elegant timeline for the wedding day;
- no clutter;
- no unnecessary animation.

## 6.3 Colour palette

Suggested starting palette:

| Token | Use | Example |
|---|---|---|
| Warm ivory | Main background | `#FAF6EF` |
| Soft champagne | Cards and highlighted sections | `#E8D8BD` |
| Lake blue-grey | Secondary accents | `#8EA4A8` |
| Deep green | Buttons and navigation | `#415531` |
| Charcoal | Body text | `#252525` |
| Muted gold | Fine dividers and decorative lines | `#B49A6A` |

Adjust the final palette after the hero image is chosen.

## 6.4 Typography

Recommended pairing:

- display serif for names and page headings;
- readable sans-serif for body copy and travel guidance.

Good options:

- Cormorant Garamond + Inter;
- Playfair Display + Source Sans 3;
- Libre Baskerville + Nunito Sans.

Use no more than two font families.

## 6.5 Imagery

Image sources:

- Minted draft website photographs, approved for reuse;
- couple photographs;
- venue photographs if licensing or permission is clear;
- minimal curated Zurich/Switzerland imagery if useful.

Required image tasks:

- export all approved Minted photos;
- choose a final hero image;
- create web-optimised versions;
- add meaningful alt text;
- avoid relying on copyrighted venue or tourism imagery unless permission is clear.

Hero image status: **not decided**.

Implementation should therefore include:

- a temporary hero placeholder;
- a simple way to swap the final hero photo;
- fallback layout that still looks good without the final image.

---

## 7. Information Architecture

## 7.1 Required pages

| Route pattern | Page | Purpose |
|---|---|---|
| `/:lang/` | Landing page | Welcome, key facts, primary calls to action |
| `/:lang/schedule/` | Schedule | Ceremony, boat transfer, reception, party, return transport |
| `/:lang/travel/` | Travel advice | How to get to Zurich from Chicago, the UK, Italy, and elsewhere |
| `/:lang/stay/` | Accommodation | Hotel Sonne, OXEN, Zurich hotels, budget options, Airbnb guidance |
| `/:lang/things-to-do/` | Things to do | Zurich and Switzerland activities, hikes, mountain views, day trips |
| `/:lang/switzerland-guide/` | Switzerland guide | Public transport, currency, budgeting, practical advice |
| `/:lang/faq/` | FAQ | Dress code, children, plus ones, transport, gifts, entry requirements |
| `/:lang/rsvp/` | RSVP | Embedded or linked Tally RSVP form |

## 7.2 Strongly recommended pages

| Route pattern | Page | Purpose |
|---|---|---|
| `/:lang/gifts/` | Gifts | Registry, honeymoon fund, or “your presence is enough” wording |
| `/:lang/contact/` | Contact | Practical contact details and support route |
| `/:lang/photos/` | Photos | Optional pre-wedding gallery; later guest photo-sharing link |
| `/:lang/updates/` | Updates | Optional wedding-week notices and final transport updates |

## 7.3 Navigation

Desktop navigation:

```txt
Home | Schedule | Travel | Stay | Things to Do | Switzerland Guide | FAQ | RSVP
```

Mobile navigation:

- compact menu;
- visible RSVP button once RSVP opens;
- language switcher in menu;
- no more than eight primary links.

---

## 8. Page-by-Page Specification

## 8.1 Landing Page

### Purpose

Create a warm first impression and give guests the essentials immediately.

### Required content

- Couple names: **Gabriela Dago & Manfredi Carta**.
- Date: **Friday, 11 June 2027**.
- Location: **Zurich & Küsnacht, Switzerland**.
- Warm welcome message.
- Primary call to action: **View the Schedule**.
- Secondary call to action: **Travel & Accommodation**.
- RSVP call to action once RSVP is open.
- Three-part wedding-day preview:
  - ceremony at Kirche St. Peter;
  - private or host-arranged boat transfer across/along Lake Zurich;
  - dinner and dancing at Hotel Sonne.
- Language switcher.
- Optional countdown.

### Suggested English copy

> We cannot wait to celebrate with you in Zurich on Friday, 11 June 2027. The day will begin in the old town at Kirche St. Peter, followed by a journey on Lake Zurich to Küsnacht and an evening by the water at Hotel Sonne.

### Design notes

- Hero photo should be large but not obscure the password/private nature of the site.
- If the final hero image is not ready, use a soft typographic hero and add the image later.
- The homepage should remain calm and uncluttered.

---

## 8.2 Schedule Page

### Purpose

Make the wedding day sequence clear, reassuring, and easy to follow.

### Provisional timeline

| Time | Event | Location | Status |
|---|---|---|---|
| TBD | Guest arrival | Kirche St. Peter, Zurich | To confirm |
| TBD | Ceremony | Kirche St. Peter, Zurich | To confirm |
| TBD | Transfer to boat departure point | Zurich old town / lakefront | To confirm |
| TBD | Host-arranged boat transfer | Lake Zurich | Probably private |
| TBD | Arrival in Küsnacht | Near Hotel Sonne | To confirm |
| TBD | Aperitivo / welcome drinks | Hotel Sonne, Küsnacht | To confirm |
| TBD | Dinner | Hotel Sonne, Küsnacht | To confirm |
| TBD | Dancing and party | Hotel Sonne, Küsnacht | To confirm |
| TBD | Return travel | Küsnacht to Zurich / taxis / train | To confirm |

### Boat transfer wording

Until final details are confirmed, use careful wording:

> After the ceremony, we are planning a host-arranged boat transfer from Zurich towards Küsnacht. We will update this page with the exact departure point, timing, and rain plan once confirmed.

Once confirmed, the page should state clearly:

- whether the boat is private;
- where guests board;
- whether guests need tickets;
- whether food/drinks are served on board;
- what happens if it rains;
- whether the route is accessible for elderly guests or guests with mobility needs;
- whether there is an alternative land transfer.

### Components

- `Timeline`
- `VenueCard`
- `TransportNotice`
- `MapLinkButton`
- `WeatherPlanNote`
- `AccessibilityNote`

---

## 8.3 Travel Advice Page

### Purpose

Help international guests plan travel to Zurich with minimal stress.

### Required sections

1. At a glance.
2. Flying into Zurich.
3. From Chicago.
4. From the UK.
5. From Italy.
6. From Zurich Airport to Zurich city centre or Küsnacht.
7. Passports, visas, ETIAS, and official links.
8. When to arrive.
9. Useful booking links.

### Core advice

- Primary airport: **Zurich Airport (`ZRH`)**.
- Public transport should be the default recommendation from the airport.
- Guests should generally not rent a car for Zurich/wedding logistics.
- For long-haul guests from Chicago, recommend arriving at least one day before the wedding, ideally two.
- For UK and Italian guests, flight/train advice should be origin-specific and practical.
- Entry requirements must link to official sources and be rechecked before the wedding.

### From Chicago

Content:

- Search for flights from Chicago to Zurich (`ZRH`).
- Do not promise specific routes until June 2027 flights are bookable.
- Recommend arriving by Thursday, 10 June 2027 at the latest; Wednesday, 9 June 2027 is better for jet lag.
- Include links:
  - Google Flights: <https://www.google.com/travel/flights?q=Flights%20from%20Chicago%20to%20Zurich>
  - Expedia: <https://www.expedia.com/Flights>

### From the UK

Content:

- Flights to Zurich are usually simplest for most UK guests.
- London, Manchester, Edinburgh, and other regional airports can be suggested as search origins.
- Rail via continental Europe may be included as a scenic alternative.
- Include links:
  - Google Flights: <https://www.google.com/travel/flights?q=Flights%20from%20United%20Kingdom%20to%20Zurich>
  - Expedia UK: <https://www.expedia.co.uk/Flights>
  - SBB: <https://www.sbb.ch/en>

### From Italy

Content:

- Northern Italy guests may find train travel attractive, especially from Milan.
- Central and southern Italy guests will often find flights easier.
- Include links:
  - Google Flights: <https://www.google.com/travel/flights?q=Flights%20from%20Italy%20to%20Zurich>
  - Trenitalia: <https://www.trenitalia.com/en.html>
  - SBB: <https://www.sbb.ch/en>

### Entry requirements wording

Use cautious wording:

> Please check the official entry requirements for your passport before booking and again before travelling. Switzerland is part of the Schengen area, and requirements may change before June 2027. ETIAS is expected to affect many visa-exempt travellers after its launch.

Links:

- Swiss travel documents: <https://www.ch.ch/en/travel-and-emigrate/holidays-in-switzerland/travel-documents-for-entering-switzerland/>
- Swiss ETIAS information: <https://www.sem.admin.ch/sem/en/home/themen/einreise/info-einreise/voraussetzungen-nach-staat/etias.html>
- EU ETIAS information: <https://travel-europe.europa.eu/en/etias>
- US travel advice: <https://travel.state.gov/>
- UK travel advice: <https://www.gov.uk/foreign-travel-advice/switzerland>

---

## 8.4 Accommodation Page

### Purpose

Help guests choose accommodation based on convenience, budget, and sightseeing plans.

### Required sections

1. Where should I stay?
2. Closest to the party: Küsnacht.
3. Hotel Sonne Küsnacht.
4. OXEN Küsnacht.
5. Central Zurich options.
6. Budget-friendly options.
7. Airbnb and apartment rentals.
8. Booking codes and room blocks.
9. Transport back after the party.

### Hotel Sonne Küsnacht

Positioning:

- best for guests who want maximum convenience;
- party venue itself;
- likely priority for close family and guests who do not want late-night transport;
- limited room availability, so block/codes should be confirmed early.

Current status:

- room block: likely;
- booking code: TBD;
- booking deadline: TBD;
- number of rooms: TBD.

### OXEN Küsnacht

Positioning:

- nearby Küsnacht option;
- useful if guests want to stay close to the reception without staying at Hotel Sonne.

Current status:

- booking code: possible but not confirmed;
- availability: TBD;
- distance and transport note: to verify.

### Zurich neighbourhood guidance

| Area | Best for | Notes |
|---|---|---|
| Old Town / Niederdorf | Classic Zurich and proximity to church | Good for sightseeing; central pricing |
| Stadelhofen / Seefeld | Lake access and easier travel to Küsnacht | Strong balance for wedding logistics |
| Zurich HB / central station | Train convenience | Practical for arrivals and day trips |
| Enge / Wollishofen | Lakefront and quieter stays | Good for guests wanting lake access |
| Oerlikon | Budget-conscious guests | Less romantic, but practical for airport/train links |

### Budget-friendly advice

- Book early.
- Stay near a train/tram stop rather than focusing only on distance.
- Compare Zurich and Küsnacht prices.
- Use public transport instead of taxis where possible.
- Consider apartment rentals for longer stays.
- Use supermarkets for breakfasts/snacks.
- Avoid assuming a car is useful; it is usually not needed.

---

## 8.5 Things to Do Page

### Purpose

Help guests turn the wedding into a memorable Zurich and Switzerland trip.

### Required sections

1. Zurich highlights.
2. Easy lake and city walks.
3. Mountain views close to Zurich.
4. Hikes and scenic walks.
5. Classic Swiss day trips.
6. Rainy-day ideas.
7. Suggested itineraries.

### Zurich recommendations

- Zurich Old Town.
- Lindenhof.
- Bahnhofstrasse.
- Lake Zurich promenade.
- Grossmünster and Fraumünster.
- Kunsthaus Zurich.
- Uetliberg.
- Lindt Home of Chocolate.
- Zurich West for food and bars.

### Mountain views and day trips

- **Uetliberg**: easiest mountain-view option from Zurich.
- **Rigi**: classic lake-and-mountain day trip.
- **Lucerne and Pilatus**: iconic and manageable as a day trip.
- **Stoos ridge walk**: memorable views, weather-dependent.
- **Rhine Falls**: easy natural landmark trip.
- **Interlaken / Jungfrau region**: best for guests extending the trip.

### Hikes and walks

| Activity | Difficulty | Notes |
|---|---|---|
| Uetliberg / Planet Trail | Easy to moderate | Accessible by public transport |
| Erlenbach–Küsnacht Gorge Path | Moderate | Local and scenic; verify conditions |
| Pfannenstiel Trail | Moderate | Lake Zurich views |
| Rigi Panorama Trail | Moderate | Classic Swiss mountain views |
| Stoos ridge walk | Moderate to demanding | Weather-dependent and not for all guests |

### Suggested itineraries

**One extra day**

- Morning: Old Town and Lindenhof.
- Lunch: Niederdorf or lakefront.
- Afternoon: Uetliberg or Kunsthaus.
- Evening: lakefront dinner/drinks.

**Two extra days**

- Day 1: Zurich Old Town, lake, Uetliberg.
- Day 2: Lucerne/Rigi or Rhine Falls.

**Three to five extra days**

- Zurich + Lucerne/Rigi + Bernese Oberland or another alpine region.

---

## 8.6 Switzerland Guide Page

### Purpose

Give international guests the practical information they need before travelling.

### Required sections

1. Getting around.
2. Public transport apps and tickets.
3. Currency and payments.
4. Budget-friendly Switzerland.
5. Language basics.
6. Weather and packing.
7. Phones, plugs, and connectivity.
8. Etiquette and practical tips.

### Getting around

Recommended wording:

> Public transport is the easiest way to get around Zurich and most of Switzerland. Trains, trams, buses, and boats are well connected, and for the wedding weekend you should not need a car.

Links:

- SBB: <https://www.sbb.ch/en>
- ZVV: <https://www.zvv.ch/en>
- ZSG: <https://www.zsg.ch/en/>
- Zürich Card: <https://www.zuerich.com/en/zurich-card>

### Currency and payment

Content:

- Currency: Swiss franc (`CHF`).
- Cards are widely accepted, but carrying a small amount of cash can be useful.
- Euros should not be assumed to be accepted.
- When offered card conversion, paying in CHF is usually better general travel practice than accepting dynamic currency conversion.

### Budget-friendly Switzerland

- Use public transport.
- Buy snacks, picnic items, and breakfast supplies from Coop or Migros.
- Refill water bottles.
- Use free activities: lake walks, parks, viewpoints, Old Town, hikes.
- Compare transport passes before buying.
- Choose accommodation near transport, not necessarily in the most central area.
- Prefer lunch menus where restaurants offer better value at lunchtime.

### Weather and packing

Content:

- June is usually pleasant, but rain is possible.
- Bring layers, sunglasses, and a light rain jacket.
- Wedding dress code is formal.
- Guests should still consider comfortable shoes because the day may include walking and a boat transfer.

### Power and phones

Content:

- Switzerland uses Type J power sockets.
- Some generic European adapters may not fit Swiss sockets.
- UK and US guests should check roaming charges.
- eSIMs may be useful for guests staying longer.

---

## 8.7 FAQ Page

### Purpose

Answer repeated questions without guests needing to message the couple.

### Confirmed FAQ answers to include

#### What is the dress code?

> Formal attire. Please dress for a wedding ceremony in Zurich and an evening celebration by Lake Zurich. Because part of the day may involve walking and a boat transfer, we recommend comfortable formal shoes and a light layer for the evening.

#### Are children invited?

> Yes, children are welcome. Please include them in your RSVP so we can plan seating, food, and any practical arrangements.

#### Can I bring a plus one?

> Partners and plus ones are welcome. Please include their name in your RSVP so we can plan accurately.

This wording may need adjustment if invitations later define plus ones per household.

#### Is the boat transfer included?

> We are planning a host-arranged boat transfer from Zurich towards Küsnacht after the ceremony. We expect to provide the necessary details for guests, and we will update this page once the timing and exact arrangements are confirmed.

#### Do I need a car?

> No. For most guests, public transport will be easier than renting a car.

### FAQ topics still needed

- RSVP deadline.
- Gift/registry wording.
- Photography during ceremony.
- Social media preference.
- Final late-night transport plan.
- Mobility/accessibility guidance.
- Contact person for wedding-week questions.

---

## 8.8 RSVP Page

### Purpose

Collect attendance and practical information clearly, without building a custom database.

### Recommended form fields

Minimum fields:

- invitation code or invitation name;
- guest name;
- email;
- attending: yes/no/unsure;
- number of adults attending;
- names of adults attending;
- number of children attending;
- names and ages of children, if relevant;
- attendance by event:
  - ceremony;
  - boat transfer;
  - reception/dinner;
  - party;
- dietary requirements;
- allergies;
- accessibility or mobility considerations;
- accommodation status;
- travel origin;
- optional note to the couple.

### RSVP language setup

Recommended:

- `/en/rsvp/` embeds English Tally form;
- `/it/rsvp/` embeds Italian Tally form;
- `/de/rsvp/` embeds German Tally form;
- all forms use identical field names;
- all forms sync to Google Sheets;
- Tally form itself should also be password-protected in case the direct form link is shared.

### RSVP data handling

- Collect only the data needed for wedding planning.
- Keep the Google Sheet private.
- Enable two-factor authentication on the accounts used for forms and sheets.
- Avoid asking for passport numbers, payment details, or unnecessary sensitive data.
- Include a short privacy note on the RSVP page.

Suggested privacy note:

> We will use your RSVP information only to plan the wedding, including attendance, seating, dietary requirements, transport, and accommodation logistics.

---

## 8.9 Gifts Page

### Purpose

Set expectations gracefully.

### Possible approaches

#### Option A — no gifts expected

> Your presence in Switzerland is already the greatest gift. We are so grateful that you are travelling to celebrate with us.

#### Option B — honeymoon fund

> For those who would like to contribute, we will share details of a honeymoon fund closer to the wedding.

#### Option C — registry

> We will add registry details here once confirmed.

Recommendation: decide the gift position before invitations are sent.

---

## 8.10 Contact Page

### Purpose

Give guests a practical support route and reduce last-minute messages to the couple.

### Recommended content

- General questions: shared wedding email address.
- RSVP issues: link to RSVP page and form support note.
- Travel questions: link to Travel and Stay pages.
- Wedding-week urgent contact: named person TBD.

Recommendation:

Create a shared email such as:

```txt
wedding@gabrielamanfredi.com
```

Only do this after the domain is chosen.

---

## 9. Content Model

## 9.1 Repository structure

```txt
wedding-website/
  functions/
    _middleware.ts
  public/
    favicon.svg
    robots.txt
    images/
      couple/
      venues/
      zurich/
  src/
    components/
      SiteHeader.astro
      SiteFooter.astro
      Hero.astro
      LanguageSwitcher.astro
      Timeline.astro
      VenueCard.astro
      AccommodationCard.astro
      ActivityCard.astro
      FAQAccordion.astro
      PasswordNotice.astro
    content/
      en/
        home.md
        schedule.md
        travel.md
        stay.md
        things-to-do.md
        switzerland-guide.md
        faq.md
        gifts.md
        contact.md
      it/
        home.md
        schedule.md
        travel.md
        stay.md
        things-to-do.md
        switzerland-guide.md
        faq.md
        gifts.md
        contact.md
      de/
        home.md
        schedule.md
        travel.md
        stay.md
        things-to-do.md
        switzerland-guide.md
        faq.md
        gifts.md
        contact.md
    data/
      site.ts
      locales.ts
      venues.ts
      schedule.ts
      accommodation.ts
      travelOrigins.ts
      activities.ts
      faqs.ts
    layouts/
      BaseLayout.astro
      PageLayout.astro
    pages/
      login.astro
      index.astro
      [lang]/
        index.astro
        schedule.astro
        travel.astro
        stay.astro
        things-to-do.astro
        switzerland-guide.astro
        faq.astro
        rsvp.astro
        gifts.astro
        contact.astro
  package.json
  README.md
```

## 9.2 Site data

Use structured data for details likely to change.

Example:

```ts
export const wedding = {
  couple: {
    personOne: 'Gabriela Dago',
    personTwo: 'Manfredi Carta',
    display: 'Gabriela & Manfredi',
  },
  date: '2027-06-11',
  location: 'Zurich & Küsnacht, Switzerland',
  dressCode: 'Formal',
  privacy: 'password-protected',
  languages: ['en', 'it', 'de'],
};
```

## 9.3 Venue data

```ts
export const venues = [
  {
    id: 'st-peter',
    name: 'Kirche St. Peter',
    city: 'Zurich',
    address: 'St.-Peter-Hofstatt, 8001 Zurich, Switzerland',
    role: 'Ceremony',
    websiteUrl: 'https://www.st-peter-zh.ch/',
    mapUrl: 'TBD',
    accessibilityNote: 'TBD',
  },
  {
    id: 'hotel-sonne',
    name: 'Hotel Sonne',
    city: 'Küsnacht',
    address: 'Seestrasse 120, 8700 Küsnacht, Switzerland',
    role: 'Reception and party',
    websiteUrl: 'https://sonne.ch/en/',
    mapUrl: 'TBD',
    accessibilityNote: 'TBD',
  },
];
```

## 9.4 Schedule data

```ts
export const weddingSchedule = [
  {
    time: 'TBD',
    title: {
      en: 'Ceremony',
      it: 'Cerimonia',
      de: 'Trauung',
    },
    location: 'Kirche St. Peter, Zurich',
    status: 'to-confirm',
  },
  {
    time: 'TBD',
    title: {
      en: 'Boat transfer to Küsnacht',
      it: 'Trasferimento in barca verso Küsnacht',
      de: 'Bootstransfer nach Küsnacht',
    },
    location: 'Lake Zurich',
    status: 'probably-private',
  },
];
```

---

## 10. Component Inventory

| Component | Purpose |
|---|---|
| `SiteHeader` | Navigation, language switcher, RSVP button |
| `SiteFooter` | Contact, privacy note, language links |
| `PasswordGate` | Login/password screen |
| `Hero` | Landing page visual introduction |
| `LanguageSwitcher` | Switch between English, Italian, German |
| `Countdown` | Optional countdown to 11 June 2027 |
| `Timeline` | Wedding-day schedule |
| `VenueCard` | Venue details, address, map, accessibility note |
| `TransportNotice` | Boat/public transport guidance |
| `TravelOriginCard` | Chicago, UK, Italy travel sections |
| `AccommodationCard` | Hotel and neighbourhood recommendations |
| `ActivityCard` | Zurich/Switzerland recommendations |
| `FAQAccordion` | Expandable FAQ content |
| `ExternalLinkList` | Curated source links |
| `NoticeBanner` | Wedding-week updates or TBD notices |
| `RSVPEmbed` | Embedded Tally form |
| `PhotoGrid` | Gallery or image section |

---

## 11. Privacy, Security, and Search Settings

Because the website is password-protected, use a privacy-first setup.

Required:

- site-wide password gate, except for `/petri-turicensis-vi-mmxxvii/`;
- `noindex, nofollow` on all pages;
- `robots.txt` disallowing crawlers;
- no public guest list;
- no private addresses beyond public venue addresses;
- no sensitive details in metadata;
- RSVP data collected through Tally/Google Sheets with private access only;
- two-factor authentication for admin accounts;
- direct form link password-protected if using Tally;
- image URLs protected where possible.

Suggested metadata:

```txt
Title: Gabriela & Manfredi | Wedding Website
Description: Private wedding information for invited guests.
```

Avoid metadata such as:

```txt
Full public details about ceremony, reception, travel and guest logistics...
```

---

## 12. Accessibility and Usability Requirements

The website should be accessible and practical.

Requirements:

- mobile-first design;
- clear contrast;
- readable body text;
- no tiny decorative fonts for logistics;
- keyboard-accessible menus and accordions;
- visible focus states;
- alt text for meaningful images;
- no information available only inside images;
- clear button labels;
- descriptive links;
- pages broken into sections and cards;
- language switcher available on every page;
- timeline readable on mobile;
- large enough tap targets.

---

## 13. Performance Requirements

Target:

- fast mobile load;
- minimal JavaScript;
- optimised images;
- responsive image sizes;
- no heavy animation;
- fonts loaded efficiently;
- Lighthouse targets:
  - Performance: 90+;
  - Accessibility: 95+;
  - Best Practices: 90+.

Because the site is password-protected and `noindex`, SEO score is less important than privacy and usability.

---

## 14. Build Phases

## Phase 0 — Setup and decisions

Deliverables:

- choose domain shortlist;
- create GitHub repository;
- set up Astro project;
- set up Cloudflare Pages staging;
- set up password protection prototype;
- export Minted photos and copy;
- set up content folders for English, Italian, German.

## Phase 1 — Design prototype

Deliverables:

- password screen;
- landing page;
- base layout;
- header/footer;
- language switcher;
- placeholder hero image;
- initial colour and typography system.

## Phase 2 — Core content pages

Deliverables:

- Schedule;
- Travel;
- Stay;
- Switzerland Guide;
- FAQ;
- Things to Do.

Initial build should be in English first.

## Phase 3 — RSVP integration

Deliverables:

- Tally forms in English, Italian, German;
- Google Sheets sync;
- RSVP page embeds;
- privacy note;
- test submissions;
- confirmation messages.

## Phase 4 — Translation

Deliverables:

- Italian translations;
- German translations;
- review status tracking;
- language switch QA;
- consistency check for dates, times, venues, and links.

## Phase 5 — Pre-launch QA

Deliverables:

- mobile review;
- password test;
- link check;
- translation check;
- RSVP test by at least two people;
- accessibility review;
- image optimisation;
- staging approval.

## Phase 6 — Final wedding updates

Deliverables:

- exact ceremony time;
- exact boat details;
- accommodation codes;
- RSVP deadline;
- final travel reminders;
- late-night transport plan;
- wedding-week banner;
- weather note.

---

## 15. Content and Asset Workflow

## 15.1 Source materials

Approved sources:

- Minted draft website: <https://gdagomcarta.minted.us>
- Joy inspiration site 1: <https://withjoy.com/jonathan-and-anna-eclk72s2oa000301vkb5rc74nxs?srsltid=AfmBOooxnjFAgBmqPHly5boM6-qI_FP9dBTklbgXcef63ONYTreIyZlC>
- Joy inspiration site 2: <https://withjoy.com/jane-and-dan/>

Use the Joy sites for structure and tone inspiration only. Do not copy their design directly.

## 15.2 Asset tasks

- Export all relevant Minted photos.
- Confirm which photos can be used publicly within a password-protected site.
- Choose hero photo.
- Create image folders:
  - `couple/`
  - `venues/`
  - `zurich/`
  - `icons/`
- Add alt text.
- Optimise images to WebP/AVIF where possible.

## 15.3 Copy tasks

- Draft English copy first.
- Translate Italian and German.
- Review all translations.
- Keep factual pages synchronised.
- Use warm copy on landing, schedule, gifts, and contact pages.
- Use clear practical copy on travel/accommodation pages.

---

## 16. Open Decisions and Remaining Questions

These are now the most important questions to answer.

### Domain and privacy

1. Which domain should be used from the shortlist?
2. What should the shared wedding password be?
3. Should the password be printed on invitations, sent separately, or both?
4. Should the website show only first names in metadata, or are full names acceptable because the site is password-protected?

### RSVP

5. What is the RSVP opening date?
6. What is the RSVP deadline?
7. Should every household receive an invitation code?
8. Should guests be able to edit their RSVP later?
9. Should RSVP collect attendance separately for ceremony, boat, reception, and party?
10. Should children’s ages be collected for meal/seating planning?
11. Are plus ones genuinely open to all guests, or only where invited?

### Schedule and ceremony

12. What is the ceremony start time?
13. What time should guests arrive at Kirche St. Peter?
14. What language or languages will the ceremony use?
15. Will there be photos or a receiving line after the ceremony?
16. Will there be any instructions about photography during the ceremony?

### Boat and reception logistics

17. Which company will operate the private boat transfer?
18. Where exactly will guests board the boat?
19. Will guests walk from the church to the boat, or will transport be arranged?
20. Will food or drinks be served on the boat?
21. What is the rain plan?
22. What time does the reception start at Hotel Sonne?
23. What time does the party end?
24. Will there be arranged late-night transport back to Zurich?

### Accommodation

25. How many rooms can be blocked at Hotel Sonne?
26. What is the Hotel Sonne booking code and deadline?
27. Will OXEN Küsnacht or another nearby hotel offer a code?
28. Should the website recommend exact Zurich hotels or only neighbourhoods?
29. Should accommodation pages include approximate price bands?

### Content and design

30. Which photograph should be the hero image?
31. Should there be an “Our Story” page?
32. Should restaurant recommendations be included?
33. What should the gifts/registry wording be?
34. Who will review the Italian and German translations?
35. Who should be listed as wedding-week contact?
36. Should the site include a downloadable PDF travel guide?

---

## 17. Immediate Next Actions

Recommended next actions in order:

1. Choose 3–5 domain candidates and check availability.
2. Export photos and copy from the Minted draft website.
3. Create the Astro project and Cloudflare Pages staging site.
4. Build the password screen and multilingual routing first.
5. Build the homepage with placeholder hero image.
6. Draft English versions of Schedule, Travel, Stay, and FAQ.
7. Set up a test Tally RSVP form and sync it to Google Sheets.
8. Translate the first set of pages into Italian and German.
9. Confirm boat, accommodation, and RSVP details as they become available.

---

## 18. Source Links for Build Team

### Technical

- Astro internationalisation routing: <https://docs.astro.build/en/guides/internationalization/>
- Astro i18n recipe: <https://docs.astro.build/en/recipes/i18n/>
- Cloudflare Pages: <https://pages.cloudflare.com/>
- Cloudflare Pages Functions: <https://developers.cloudflare.com/pages/functions/>
- Cloudflare Pages Functions middleware: <https://developers.cloudflare.com/pages/functions/middleware/>
- Cloudflare Workers pricing/free limits: <https://developers.cloudflare.com/workers/platform/pricing/>
- Cloudflare Workers basic auth example: <https://developers.cloudflare.com/workers/examples/basic-auth/>
- Tally pricing: <https://tally.so/pricing>
- Tally embed forms: <https://tally.so/help/embed-your-form>
- Tally password-protect forms: <https://tally.so/help/password-protect-forms>
- Tally conditional logic: <https://tally.so/help/conditional-form-logic>
- Tally supported languages: <https://tally.so/help/supported-languages>
- Tally Google Sheets integration: <https://tally.so/help/google-sheets-integration>
- Joy pricing: <https://withjoy.com/pricing/>
- Joy RSVP: <https://withjoy.com/online-rsvp/>

### Wedding and venue

- Kirche St. Peter: <https://www.st-peter-zh.ch/>
- Zurich Tourism St. Peter: <https://www.zuerich.com/en/visit/attractions/st-peter-the-oldest-parish-church-in-zurich>
- Hotel Sonne weddings: <https://sonne.ch/en/event-venues/wedding/>
- Hotel Sonne location: <https://sonne.ch/en/location-getting-here/>
- OXEN Küsnacht: <https://www.oxen.ch/>
- ZSG Lake Zurich boats: <https://www.zsg.ch/en/>
- ZSG timetables: <https://www.zsg.ch/en/timetables/>

### Travel and Switzerland

- Zurich Airport public transport: <https://www.flughafen-zuerich.ch/en/passengers/practical/parking-and-transport/train-tram-and-bus>
- Zurich Tourism airport to city: <https://www.zuerich.com/en/inform-plan/getting-there-and-mobility-on-location/travel-to-zurich/zurich-airport-to-city-center>
- SBB: <https://www.sbb.ch/en>
- ZVV: <https://www.zvv.ch/en>
- Swiss travel documents: <https://www.ch.ch/en/travel-and-emigrate/holidays-in-switzerland/travel-documents-for-entering-switzerland/>
- Swiss ETIAS information: <https://www.sem.admin.ch/sem/en/home/themen/einreise/info-einreise/voraussetzungen-nach-staat/etias.html>
- EU ETIAS information: <https://travel-europe.europa.eu/en/etias>
- Zurich hikes: <https://www.zuerich.com/en/sightseeing-activities/sport-and-relaxation/hiking>
- Uetliberg: <https://www.zuerich.com/en/visit/nature/uetliberg-zurichs-very-own-mountain>
- Switzerland money and payments: <https://www.myswitzerland.com/en/planning/about-switzerland/general-facts/money-and-shopping/>

---

## 19. Definition of Done

The website is ready to launch when:

- password protection works on every route except the public animated invitation;
- English, Italian, and German routes work;
- all required pages exist;
- all navigation items work;
- final or clearly marked provisional wedding details are present;
- hero image is selected or a deliberate placeholder is approved;
- travel/accommodation links work;
- RSVP form has been tested;
- Google Sheets RSVP export works;
- translation review is complete;
- mobile layout is tested;
- accessibility basics are met;
- images are optimised and have alt text;
- privacy/search settings are applied;
- spelling of names, dates, venues, and locations is checked;
- the couple has approved the tone and wording.
