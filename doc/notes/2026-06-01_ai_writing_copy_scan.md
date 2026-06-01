# AI-Writing Copy Scan

Date: 1 June 2026
Scope: guest-facing website copy in `src/data`, `src/components`, and localised page text.
Reference: [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)

This is a copy audit only. No website copy has been changed.

The reference page treats these as possible signs, not proof of AI authorship. I used it as a style checklist, especially for generic positive language, over-smoothed phrasing, vague future-facing placeholders, broad tourism-style lists, and implementation/provenance notes appearing in user-facing copy.

Follow-up constraint from the copy owner: the site should not read like a tourism website, and it should avoid generic or insincere-sounding warmth. The target voice is a practical note from the hosts to invited guests: concrete, specific, and useful. Warmth should come from real details and considerate logistics, not stock phrases such as "we cannot wait", "so grateful", "greatest gift", "explore", "discover", "offers", or scenic list-making.

English is the source of truth, so only English copy is listed below. If a row is approved, the Italian and German versions must be updated to carry the same meaning and tone, then reviewed by fluent speakers.

To request implementation, mark the relevant rows by changing `[ ]` to `[x]` in the first column.

## Recommended Phrase Replacements

| Implement? | Location | Sign to reduce | Current phrase | Proposed English source phrase |
| --- | --- | --- | --- | --- |
| [ ] | `src/data/content.ts` home hero | Formulaic warmth; "journey" used as scenic filler | We cannot wait to celebrate with you in Zurich. The day will begin in the old town at Kirche St. Peter, followed by a journey on Lake Zurich to Küsnacht and an evening by the water at Hotel Sonne. | Here are the details for our wedding in Zurich and Küsnacht. The ceremony is planned for Kirche St. Peter, followed by a boat transfer towards Küsnacht and an evening at Hotel Sonne. |
| [ ] | `src/data/content.ts` home closing | Generic gratitude phrase | We are so grateful that you will be joining us in Switzerland. | We will keep this page updated as timings, travel details, and RSVP information are confirmed. |
| [ ] | `src/data/content.ts` home schedule card | Vague "details as confirmed" placeholder | Ceremony, boat transfer, dinner, dancing, and details as they are confirmed. | The main events of the day, with confirmed times added here. |
| [ ] | `src/data/content.ts` home stay card | Generic recommendation label | Recommended areas, Hotel Sonne, nearby options, and room-block updates. | Where to stay in Küsnacht or central Zurich, including room-block details once confirmed. |
| [ ] | `src/data/content.ts` home things-to-do card | Tourism-style scenic list; soft adjective | Zurich, Lake Zurich, mountain views, day trips, and gentle pre-wedding ideas. | What to do if you have spare time before or after the wedding. |
| [ ] | `src/data/content.ts` schedule intro | "This page will become" sounds generated and self-referential | The exact timing is still being confirmed. This page will become the day-of reference for ceremony arrival, the boat transfer, dinner, dancing, and return travel. | The exact timing is still being confirmed. We will add arrival times, boat details, dinner, dancing, and return travel here once they are final. |
| [ ] | `src/data/content.ts` schedule notice | Awkward compound phrase | Boat details are provisional: we are planning a host-arranged transfer from Zurich towards Küsnacht, with boarding point and rain plan to follow. | Boat details are provisional. We are planning a transfer from Zurich towards Küsnacht, organised by us; the boarding point and rain plan will follow. |
| [ ] | `src/data/content.ts` civil ceremony | "Private step" sounds abstract | The legal ceremony at Stadthaus Zürich will be a private step before the wedding celebration. Because of visitor constraints, only immediate family will be able to attend. | The civil ceremony at Stadthaus Zürich will take place privately before the wedding celebration. Because visitor numbers are limited, only immediate family can attend. |
| [ ] | `src/data/content.ts` boat transfer | Awkward compound phrase | After the ceremony, we are planning a host-arranged boat transfer from Zurich towards Küsnacht. | After the ceremony, we are planning a boat transfer from Zurich towards Küsnacht, organised by us. |
| [ ] | `src/data/schedule.ts` guest arrival | Vague "added once confirmed" placeholder | Please plan to arrive with time to settle in before the ceremony. The exact arrival time will be added once confirmed. | Please arrive early enough to be seated before the ceremony. We will add the exact arrival time once it is confirmed. |
| [ ] | `src/data/schedule.ts` boat transfer | Awkward compound phrase; repeated "to be confirmed" | We are planning a host-arranged boat transfer after the ceremony. Boarding point, timing, and rain plan are still to be confirmed. | We are planning a boat transfer after the ceremony, organised by us. Boarding point, timing, and rain plan will follow. |
| [ ] | `src/data/content.ts` airport transfer | Generic intensifier; "ordinary wedding logistics" sounds machine-like | Zurich Airport has a very convenient train and S-Bahn connection to Zurich HB, with onward public transport to Küsnacht ZH and the wedding venues. For ordinary wedding logistics, use the train rather than driving or taking a taxi. | Zurich Airport is well connected by train and S-Bahn to Zurich HB, Küsnacht ZH, and the wedding venues. For the wedding weekend, the train is usually easier than driving or taking a taxi. |
| [ ] | `src/data/content.ts` map section | "Key reference points" is generic AI/business phrasing | Key reference points for the wedding weekend: | Useful places for the wedding weekend: |
| [ ] | `src/data/content.ts` stay intro | Formulaic "most convenient / best for" comparison; tourism framing | Küsnacht is most convenient for the party, while central Zurich is best for sightseeing and transport. Room-block information will be added once confirmed. | Küsnacht is closest to the evening party. Central Zurich may suit guests who want more transport and restaurant options. Room-block details will follow once confirmed. |
| [ ] | `src/data/content.ts` central Zurich stay | Tourism-style "sightseeing" framing | Zurich city centre is practical for guests who want restaurants, sightseeing, train connections, and easy airport access. | Central Zurich suits guests who want more train, tram, and restaurant options, plus an easier airport connection. |
| [ ] | `src/data/content.ts` Küsnacht stay | Abstract "guests who value convenience" | Staying in Küsnacht keeps you near Hotel Sonne after dinner and dancing. This is likely the easiest choice for guests who value convenience at the end of the evening. | Stay in Küsnacht if you want the shortest trip back after dinner and dancing at Hotel Sonne. |
| [ ] | `src/data/content.ts` Richterswil stay | "Quiet lakeside base" sounds travel-brochure-like | Richterswil is farther down Lake Zurich, but it can be a quiet lakeside base for guests who would like to stay near Manfredi's family or who prefer a smaller B&B. | Richterswil is farther down Lake Zurich. It may suit guests who want to stay near Manfredi's family or prefer a small B&B. |
| [ ] | `src/data/content.ts` things-to-do intro | Tourism "offers" plus broad list | For guests with time around the wedding, Zurich offers lake walks, old town wandering, mountain views, museums, and day trips within easy reach. | Use this page if you have spare time around the wedding. It lists short Zurich plans, bad-weather options, and day trips that work from one hotel. |
| [ ] | `src/data/content.ts` first-day options | Over-explained "structured half-day activity" | Children may also enjoy Zurich Zoo, especially if you would like a structured half-day activity after travelling. | Zurich Zoo can also work well with children after travelling. |
| [ ] | `src/data/content.ts` things-to-do link label | Tourism-site cue in link label | Zurich tourism | Official Zurich visitor information |
| [ ] | `src/data/content.ts` museums | Generic praise; tourism framing | For a culture or rainy-day plan, Zurich has excellent museums and a well-organised chocolate museum for children and adults. | Rain plan: Kunsthaus Zurich, Museum Rietberg, or Lindt Home of Chocolate in Kilchberg. |
| [ ] | `src/data/content.ts` day trips | "These are practical" generic framing | These are practical day trips from Zurich if you would like a longer excursion without changing hotels. | These trips work from Zurich without changing hotels. |
| [ ] | `src/data/content.ts` lake activities | Tourism-brochure phrasing | A Lake Zurich boat excursion is a relaxed way to see the city and shoreline. | Check ZSG if you want a short boat trip outside the wedding schedule. |
| [ ] | `src/data/content.ts` further away | "Squeezed around" plus generated-feeling contrast | If Switzerland is part of a longer holiday, these are better with extra nights rather than squeezed around the wedding. | If Switzerland is part of a longer holiday, plan these only with extra nights. |
| [ ] | `src/data/content.ts` further away item | Tourism phrase "classic high-Alpine scenery" | Lauterbrunnen and Jungfraujoch for classic high-Alpine scenery. | Lauterbrunnen or Jungfraujoch only if you have extra nights; both are long trips from Zurich. |
| [ ] | `src/data/content.ts` Switzerland guide intro | Generic "practical notes" list | A few practical notes for guests visiting Switzerland: public transport, currency, weather, mobile phones, and straightforward planning. | Basics for visiting Switzerland: transport, money, weather, phones, and planning. |
| [ ] | `src/data/content.ts`; `src/data/faqs.ts` transport advice | Awkward negative phrasing repeated in several places | Use public transport for travelling around Zurich; driving by car is not recommended due to lack of parking space and poor convenience. | Use public transport around Zurich. Parking is limited, and driving is usually less convenient. |
| [ ] | `src/data/content.ts` ticket section | Meta phrasing about the notes themselves | There is no single best ticket for every guest. These notes are intended as practical starting points. | There is no single best ticket for every guest. Start here, then check SBB or ZVV before buying. |
| [ ] | `src/data/content.ts` money section | Generic "planning ahead" reassurance | Switzerland uses Swiss francs and is often expensive, but planning ahead can keep costs manageable. | Switzerland uses Swiss francs and prices can be high. Supermarkets and public transport help keep day-to-day costs lower. |
| [ ] | `src/data/content.ts` money section item | Tourism-list framing | Low-cost options include lake walks, Old Town wandering, viewpoints, parks, supermarket picnics, and choosing accommodation near a tram, train, or bus stop. | Lower-cost choices: supermarket food, public transport, free walks, parks, and accommodation near tram, train, or bus. |
| [ ] | `src/data/content.ts` personal recommendations | Polished but indirect "routes suited to" phrasing | Guests can get in touch with Manfredi and family for practical advice, especially around hikes, family-friendly plans, longer trips, or whether a specific itinerary is worth the travel time. | For hikes, family plans, or longer Swiss trips, ask Manfredi or his family before booking. |
| [ ] | `src/data/content.ts` FAQ intro | Generic FAQ framing | Answers to the questions guests are most likely to ask. More details will be added as the day becomes final. | Practical answers for invited guests. We will add confirmed timings and transport details when they are ready. |
| [ ] | `src/data/content.ts` RSVP intro | Over-formal "whether you will be able to" | Please use the form below to let us know whether you will be able to celebrate with us in Zurich. | Please use the form below to let us know if you can join us in Zurich. |
| [ ] | `src/data/content.ts` gifts intro | Common wedding cliche; reads like generated ceremonial copy | Your presence in Switzerland is already the greatest gift. We are so grateful that you are travelling to celebrate with us. | If you are travelling to Switzerland, please do not feel any obligation to bring or send a gift. |
| [ ] | `src/data/content.ts` gifts section | Placeholder heading | Details to follow | Gift information |
| [ ] | `src/data/content.ts` gifts body | Conditional placeholder with vague "guidance" | If we add a registry, honeymoon fund, or any further guidance, we will share it here before invitations are sent. | If we decide to share registry or honeymoon-fund details, we will add them here before invitations are sent. |
| [ ] | `src/data/content.ts` contact body | Process-oriented internal phrasing | We will use one shared email address for practical wedding questions while the site is being prepared. | For now, please send wedding questions to gabyandmanfredi@gmail.com. |
| [ ] | `src/data/rsvp.ts` RSVP privacy | Long list of purposes; smoothed legal-ish wording | We will use your RSVP information only to plan the wedding, including attendance, seating, dietary requirements, accessibility arrangements, guest support, and contacting you if needed. | We will use your RSVP information only for wedding planning and to contact you if needed. |
| [ ] | `src/components/ExchangeRates.astro` source detail | User-facing implementation detail; provenance overexplained | free open-source exchange-rate API, served via jsDelivr with a Cloudflare fallback. | exchange-rate data provider. |
| [ ] | `src/components/ExchangeRates.astro` loading state | "Latest" filler in loading state | Updating latest rates... | Updating exchange rates... |
| [ ] | `src/components/ExchangeRates.astro` update note | Overexplained provenance | Updated from daily open-source exchange-rate data for | Rates last updated on |
| [ ] | `src/data/photos.ts` home photo strip | Slightly generic warmth phrase | A few photos from Zurich and our favourite Swiss corners. | A few photos connected to Zurich, the wedding locations, and family. |

## Translation Follow-Up

When any English row is approved for implementation:

- Update the English source copy first.
- Update the Italian and German copy to match the approved English meaning and level of directness.
- Avoid translating tourism-style or generic-warmth phrasing back into the localised versions.
- Keep Italian and German as draft until reviewed by fluent speakers.

## Lower-Priority Notes

- The site does not show the strongest AI-writing markers from the reference page, such as broken AI citation markup, "as an AI language model" disclaimers, "not only X but also Y" patterns, or obvious prompt-response residue.
- The main copy risk is a polished, generic register rather than factual hallucination. The sharper editorial direction is to make every page earn its place as wedding logistics, not destination marketing.
- Some current wording is acceptable for wedding etiquette even if it appears on AI-writing checklists. The proposed changes aim to make the voice more concrete, personal, and useful rather than mechanically "de-AI" every warm phrase.
- Several travel and entry-requirement paragraphs are long because they are factual. That is useful, but before launch they should be rechecked against official sources and simplified where possible.
