import { match } from '@formatjs/intl-localematcher';
import { NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { authMiddleware } from '@clerk/nextjs';
import { i18n } from './i18n.config';

const defaultLocale = i18n.defaultLocale;
const locales = [...i18n.locales];

const getLocale = (request) => {
  const headers = new Headers(request.headers);
  const acceptLanguage = headers.get('accept-language');

  if (acceptLanguage) {
    headers.set('accept-language', acceptLanguage.replaceAll('_', '-'));
  }

  const headersObject = Object.fromEntries(headers.entries());
  const languages = new Negotiator({ headers: headersObject }).languages();

  if (languages.includes('*')) {
    return defaultLocale;
  }

  return match(languages, locales, defaultLocale);
};

const middleware = (request) => {
  // Add custom header x-current-path
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);

  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }

  return NextResponse.next({ headers });
};

const authMiddlewareConfig = {
  beforeAuth: (req) => {
    return middleware(req);
  },
  publicRoutes: ['/:locale', '/:locale/sign-in', '/:locale/sign-up', '/:locale/api/pets', '/:locale/api/checkout', '/:locale/api/webhook', '/:locale/api/enterprise', '/:locale/terms_and_conditions', '/:locale/:username'],
};

const middlewareWithAuth = authMiddleware(authMiddlewareConfig);

export default middlewareWithAuth;

export const config = {
  matcher: [
    '/((?!.*\\..*|_next/static|_next/image|favicon.ico).*)',
    '/', 
    '/(api|trpc)(.*)',
  ],
};
