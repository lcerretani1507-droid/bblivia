import it from './it.json';
import en from './en.json';
import de from './de.json';

export type Lang = 'it' | 'en' | 'de';

const translations = { it, en, de } as const;

export function getLang(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'en' || lang === 'de') return lang;
  return 'it';
}

export function useTranslations(lang: Lang) {
  return translations[lang];
}

/** Get the equivalent route path in another language */
export function getLocalizedPath(currentPath: string, targetLang: Lang): string {
  const t = translations[targetLang];
  const routeMap: Record<string, string> = {
    '/it/': t.routes.home,
    '/en/': t.routes.home,
    '/de/': t.routes.home,
    '/it/chi-siamo': t.routes.about,
    '/en/about': t.routes.about,
    '/de/ueber-uns': t.routes.about,
    '/it/camere': t.routes.rooms,
    '/en/rooms': t.routes.rooms,
    '/de/zimmer': t.routes.rooms,
    '/it/appartamenti': t.routes.apartments,
    '/en/apartments': t.routes.apartments,
    '/de/apartments': t.routes.apartments,
    '/it/dintorni': t.routes.surroundings,
    '/en/surroundings': t.routes.surroundings,
    '/de/umgebung': t.routes.surroundings,
    '/it/contatti': t.routes.contact,
    '/en/contact': t.routes.contact,
    '/de/kontakt': t.routes.contact,
    '/it/prenota': t.routes.book,
    '/en/book': t.routes.book,
    '/de/buchen': t.routes.book,
  };
  return routeMap[currentPath] ?? t.routes.home;
}

/** Map of all route slugs to their canonical lang versions */
export const allRoutes = {
  home:         { it: '/it/', en: '/en/', de: '/de/' },
  about:        { it: '/it/chi-siamo', en: '/en/about', de: '/de/ueber-uns' },
  rooms:        { it: '/it/camere', en: '/en/rooms', de: '/de/zimmer' },
  apartments:   { it: '/it/appartamenti', en: '/en/apartments', de: '/de/apartments' },
  surroundings: { it: '/it/dintorni', en: '/en/surroundings', de: '/de/umgebung' },
  contact:      { it: '/it/contatti', en: '/en/contact', de: '/de/kontakt' },
  book:         { it: '/it/prenota', en: '/en/book', de: '/de/buchen' },
} as const;

export type RouteName = keyof typeof allRoutes;

/** Get all hreflang links for a given route name */
export function getHreflangs(routeName: RouteName, siteUrl: string) {
  const routes = allRoutes[routeName];
  return [
    { lang: 'it', href: siteUrl + routes.it },
    { lang: 'en', href: siteUrl + routes.en },
    { lang: 'de', href: siteUrl + routes.de },
    { lang: 'x-default', href: siteUrl + routes.it },
  ];
}
