import { Helmet } from "react-helmet-async";

const SITE_NAME = "Agroindustrias Yapumax";
const DOMAIN = "https://www.agroindustriasyapumax.com";
const DEFAULT_OG_IMAGE = `${DOMAIN}/logo.png`;

interface SEOHeadProps {
  title: string;
  description: string;
  /** Path without domain, e.g. "/productos" */
  path?: string;
  /** Override the OG image URL (must be absolute) */
  ogImage?: string;
  /** Set to true for pages that should NOT be indexed */
  noindex?: boolean;
  /** JSON-LD structured data object */
  jsonLd?: Record<string, unknown>;
}

export const SEOHead = ({
  title,
  description,
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  jsonLd,
}: SEOHeadProps) => {
  const canonicalUrl = `${DOMAIN}${path}`;
  const fullTitle = path === "/" || path === ""
    ? title
    : `${title} — ${SITE_NAME}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_PE" />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
