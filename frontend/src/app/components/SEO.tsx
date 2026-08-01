import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
}

export function SEO({
    title = "Silver jewelry и серебряные украшения в Ташкенте — Anori",
    description = "Anori Tashkent — магазин серебряных украшений и silver jewelry в Ташкенте. Серебряные кольца (silver rings), цепочки (silver chain), ожерелья и кулоны 925 пробы с быстрой доставкой по Узбекистану.",
    keywords = "Anori Tashkent, silver jewelry, silver rings, silver necklace, silver chain, серебряные украшения, серебряные кольца, серебряные цепочки, кулоны, ювелирный магазин Ташкент, kumush taqinchoqlar Toshkent",
    image = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&q=80",
    url = window.location.href,
    type = "website"
}: SEOProps) {
    const siteTitle = "Anori Tashkent";
    const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "JewelryStore",
        "name": "Anori Tashkent",
        "url": "https://anori-tashkent.pages.dev/",
        "logo": image,
        "image": image,
        "description": description,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Tashkent",
            "addressCountry": "UZ"
        },
        "areaServed": "UZ",
        "priceRange": "$$"
    };

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

            {/* Open Graph / Facebook / Telegram */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Anori Tashkent" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data Schema */}
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
}
