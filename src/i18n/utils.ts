import it from './it.json';
import en from './en.json';
import de from './de.json';

export type Lang = 'it' | 'en' | 'de';

const translations = { it, en, de } as const;

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path: string): string {
  return base + path;
}

export function getLang(url: URL): Lang {
  const stripped = url.pathname.startsWith(base + '/')
    ? url.pathname.slice(base.length)
    : url.pathname;
  const [, lang] = stripped.split('/');
  if (lang === 'en' || lang === 'de') return lang;
  return 'it';
}

export function useTranslations(lang: Lang) {
  const t = translations[lang];
  return {
    ...t,
    routes: Object.fromEntries(
      Object.entries(t.routes).map(([key, val]) => [key, withBase(val)])
    ) as typeof t.routes,
  };
}

/** Get the equivalent route path in another language */
export function getLocalizedPath(currentPath: string, targetLang: Lang): string {
  const path = currentPath.startsWith(base)
    ? currentPath.slice(base.length)
    : currentPath;
  const t = translations[targetLang];
  const routeMap: Record<string, string> = {
    '/it/': withBase(t.routes.home),
    '/en/': withBase(t.routes.home),
    '/de/': withBase(t.routes.home),
    '/it/chi-siamo': withBase(t.routes.about),
    '/en/about': withBase(t.routes.about),
    '/de/ueber-uns': withBase(t.routes.about),
    '/it/camere': withBase(t.routes.rooms),
    '/en/rooms': withBase(t.routes.rooms),
    '/de/zimmer': withBase(t.routes.rooms),
    '/it/appartamenti': withBase(t.routes.apartments),
    '/en/apartments': withBase(t.routes.apartments),
    '/de/apartments': withBase(t.routes.apartments),
    '/it/dintorni': withBase(t.routes.surroundings),
    '/en/surroundings': withBase(t.routes.surroundings),
    '/de/umgebung': withBase(t.routes.surroundings),
    '/it/contatti': withBase(t.routes.contact),
    '/en/contact': withBase(t.routes.contact),
    '/de/kontakt': withBase(t.routes.contact),
    '/it/prenota': withBase(t.routes.book),
    '/en/book': withBase(t.routes.book),
    '/de/buchen': withBase(t.routes.book),
  };
  return routeMap[path] ?? withBase(t.routes.home);
}

/** Routes without base prefix — used for SEO canonical/hreflang with siteUrl */
export const rawRoutes = {
  home:         { it: '/it/', en: '/en/', de: '/de/' },
  about:        { it: '/it/chi-siamo', en: '/en/about', de: '/de/ueber-uns' },
  rooms:        { it: '/it/camere', en: '/en/rooms', de: '/de/zimmer' },
  apartments:   { it: '/it/appartamenti', en: '/en/apartments', de: '/de/apartments' },
  surroundings: { it: '/it/dintorni', en: '/en/surroundings', de: '/de/umgebung' },
  contact:      { it: '/it/contatti', en: '/en/contact', de: '/de/kontakt' },
  book:         { it: '/it/prenota', en: '/en/book', de: '/de/buchen' },
} as const;

/** Navigation routes with base prefix */
export const allRoutes: Record<string, Record<Lang, string>> = Object.fromEntries(
  Object.entries(rawRoutes).map(([key, langs]) => [
    key,
    Object.fromEntries(
      Object.entries(langs).map(([lang, path]) => [lang, withBase(path)])
    ),
  ])
);

export type RouteName = keyof typeof rawRoutes;

/** Get all hreflang links for a given route name */
export function getHreflangs(routeName: RouteName, siteUrl: string) {
  const routes = rawRoutes[routeName];
  return [
    { lang: 'it', href: siteUrl + routes.it },
    { lang: 'en', href: siteUrl + routes.en },
    { lang: 'de', href: siteUrl + routes.de },
    { lang: 'x-default', href: siteUrl + routes.it },
  ];
}
