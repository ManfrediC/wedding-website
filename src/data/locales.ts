export const languages = ['en', 'it', 'de'] as const;

export type Lang = (typeof languages)[number];

export const defaultLang: Lang = 'en';

export const languageNames: Record<Lang, string> = {
  en: 'English',
  it: 'Italiano',
  de: 'Deutsch',
};

export const navItems = [
  { key: 'home', path: '/', labels: { en: 'Home', it: 'Home', de: 'Home' } },
  { key: 'schedule', path: '/schedule/', labels: { en: 'Schedule', it: 'Programma', de: 'Ablauf' } },
  { key: 'travel', path: '/travel/', labels: { en: 'Travel', it: 'Viaggio', de: 'Anreise' } },
  { key: 'stay', path: '/stay/', labels: { en: 'Stay', it: 'Dove dormire', de: 'Unterkunft' } },
  { key: 'things-to-do', path: '/things-to-do/', labels: { en: 'Things to Do', it: 'Cosa fare', de: 'Aktivitäten' } },
  { key: 'switzerland-guide', path: '/switzerland-guide/', labels: { en: 'Switzerland Guide', it: 'Guida Svizzera', de: 'Hinweise zur Schweiz' } },
  { key: 'faq', path: '/faq/', labels: { en: 'FAQ', it: 'FAQ', de: 'FAQ' } },
  { key: 'rsvp', path: '/rsvp/', labels: { en: 'RSVP', it: 'RSVP', de: 'RSVP' } },
] as const;

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && languages.includes(value as Lang);
}
