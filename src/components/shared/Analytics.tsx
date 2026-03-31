"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/* ─── Types ──────────────────────────────────────────── */

interface ConsentState {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface AnalyticsProps {
  ga4Id?: string;
  gtmId?: string;
  fbPixelId?: string;
  hotjarId?: string;
}

const COOKIE_NAME = "cookie_consent";

/* ─── Helpers ────────────────────────────────────────── */

function getConsentCookie(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`),
  );
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

/* ─── Analytics ──────────────────────────────────────── */

export default function Analytics({
  ga4Id,
  gtmId,
  fbPixelId,
  hotjarId,
}: AnalyticsProps) {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  /* Read consent cookie on mount and listen for changes */
  useEffect(() => {
    const read = () => setConsent(getConsentCookie());
    read();

    // Re-check when the cookie banner saves (it sets document.cookie directly,
    // so we poll briefly after visibility changes or clicks)
    const interval = setInterval(read, 2000);
    return () => clearInterval(interval);
  }, []);

  // No cookie set yet — load nothing
  if (!consent) return null;

  const { analytics: analyticsConsent, marketing: marketingConsent } = consent;

  return (
    <>
      {/* ── GTM with Consent Mode v2 (always load if configured) ── */}
      {gtmId && (
        <>
          {/* Set consent defaults BEFORE GTM loads */}
          <Script
            id="gtm-consent-default"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  analytics_storage: 'denied',
                  ad_storage: 'denied'
                });
              `,
            }}
          />

          {/* Update consent state based on cookie */}
          <Script
            id="gtm-consent-update"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'update', {
                  analytics_storage: '${analyticsConsent ? "granted" : "denied"}',
                  ad_storage: '${marketingConsent ? "granted" : "denied"}'
                });
              `,
            }}
          />

          {/* GTM script */}
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
        </>
      )}

      {/* ── GA4 (only with analytics consent) ── */}
      {analyticsConsent && ga4Id && (
        <>
          <Script
            id="ga4-gtag"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
          />
          <Script
            id="ga4-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4Id}');
              `,
            }}
          />
        </>
      )}

      {/* ── Hotjar (only with analytics consent) ── */}
      {analyticsConsent && hotjarId && (
        <Script
          id="hotjar-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${hotjarId},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      )}

      {/* ── Facebook Pixel (only with marketing consent) ── */}
      {marketingConsent && fbPixelId && (
        <Script
          id="fb-pixel-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${fbPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
    </>
  );
}
