import type { Metadata } from "next";
import type { Inovasi } from "@/schemas/inovasi.schema";

export const links = {
  sourceCode: "https://github.com/Ahmad-Yu2up-Ar-Raf/SatuSuara",
  ownerName: "Ahmad Yusuf Ar-Rafi",
  ownerEmail: "yusufzolldyck@gmail.com",
  // TODO: Ganti dengan domain production
  appUrl: "https://satusuara.vercel.app", 
  supportEmail: "ahmad.yusuf.pesat@gmail.com",
} as const;

export const appConfig = {
  name: "SatuSuara",
  tagline: "Platform Inovasi Indonesia",
  description: "Platform interaktif untuk menyuarakan, mendukung, dan mendanai inovasi anak bangsa. Bersama kita wujudkan perubahan melalui ide-ide kreatif yang membangun Indonesia.",
  shortDescription: "Platform inovasi dan dukungan untuk karya anak bangsa",
  version: "1.0.0",
  locale: "id_ID",
  alternateLocale: "en",
  defaultImage: "/images/og/default.jpg", // 1200x630px
  twitterHandle: "@satusuara",
} as const;

export const siteConfig: Metadata = {
  title: {
    default: `${appConfig.name} - ${appConfig.tagline}`,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.description,
  keywords: [
    // Platform Features
    "platform inovasi indonesia",
    "inovasi anak bangsa",
    "crowdfunding inovasi",
    "voting inovasi",
    "showcase inovasi",
    "ide kreatif indonesia",
    "pendanaan inovasi",
    "dukungan startup",
    "project showcase",
    "kolaborasi inovasi",
    
    // Categories
    "inovasi teknologi",
    "inovasi sosial",
    "inovasi lingkungan",
    "inovasi kesehatan",
    "inovasi pendidikan",
    "startup indonesia",
    "karya anak bangsa",
    "produk lokal",
    
    // User Actions
    "donasi project",
    "dukung inovasi",
    "voting online",
    "showcase project",
    "submit inovasi",
    "pendanaan startup",
    
    // Community
    "komunitas inovator",
    "ekosistem startup",
    "investor sosial",
    "pemberdayaan masyarakat",
    "impact investment",
    "social enterprise",
    
    // Tech Stack
    "platform interaktif",
    "aplikasi web modern",
    "real-time voting",
    "showcase digital",
    "sistem donasi online",
  ] as Array<string>,
  
  authors: [
    {
      name: links.ownerName,
      url: links.sourceCode,
    }
  ],
  
  creator: links.ownerName,
  publisher: appConfig.name,
  
  metadataBase: new URL(links.appUrl),
  
  alternates: {
    canonical: "/",
    languages: {
      'id-ID': `${links.appUrl}`,
      'en-US': `${links.appUrl}/en`,
    }
  },
  
  openGraph: {
    type: "website",
    locale: appConfig.locale,
    alternateLocale: appConfig.alternateLocale,
    url: links.appUrl,
    title: `${appConfig.name} - ${appConfig.tagline}`,
    description: appConfig.description,
    siteName: appConfig.name,
    images: [
      {
        url: appConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: `${appConfig.name} - Platform Inovasi Indonesia`,
        type: "image/jpeg",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: `${appConfig.name} - ${appConfig.tagline}`,
    description: appConfig.shortDescription,
    creator: appConfig.twitterHandle,
    images: [appConfig.defaultImage],
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  category: "Technology Platform",
  
  other: {
    "application-name": appConfig.name,
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-title": appConfig.name,
    "apple-mobile-web-app-status-bar-style": "default",
    "theme-color": "#2563eb",
    "color-scheme": "light dark",
  },
  
  // Schema.org structured data
  verification: {
    // TODO: Add these after domain verification
    // google: "google-site-verification-code",
    // bing: "bing-site-verification-code",
  },
};

// Helper to generate JSON-LD for innovation detail pages
export const generateInnovationJsonLd = (inovasi: Inovasi) => {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: inovasi.judul,
    description: inovasi.ringkasanPendek,
    datePublished: inovasi.dibuatPada,
    dateModified: inovasi.diupdatePada || inovasi.dibuatPada,
    author: {
      "@type": "Person",
      name: inovasi.pembuat.nama,
      ...(inovasi.pembuat.organisasi && {
        affiliation: {
          "@type": "Organization",
          name: inovasi.pembuat.organisasi
        }
      })
    },
    image: inovasi.media[0]?.url || appConfig.defaultImage,
    url: `${links.appUrl}/inovasi/${inovasi.slug}`,
    keywords: inovasi.tag.join(", "),
    ...(inovasi.totalVote > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "1",
        ratingCount: inovasi.totalVote,
        bestRating: "1",
        worstRating: "1"
      }
    }),
    potentialAction: {
      "@type": "VoteAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${links.appUrl}/inovasi/${inovasi.slug}/vote`
      }
    }
  };
};

// Additional SEO utilities
// Truncate description to optimal length (120-160 chars)
const truncateDescription = (text: string, maxLength = 160) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).split(' ').slice(0, -1).join(' ') + '...';
};

// Generate metadata for innovation detail pages
export const generateInovasiMetadata = (inovasi: Inovasi): Metadata => {
  const description = truncateDescription(inovasi.ringkasanPendek);
  const ogImage = inovasi.media[0]?.url || appConfig.defaultImage;
  
  return {
    title: inovasi.judul,
    description,
    openGraph: {
      title: inovasi.judul,
      description,
      type: "article",
      url: `${links.appUrl}/inovasi/${inovasi.slug}`,
      locale: appConfig.locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${inovasi.judul} - ${appConfig.name}`,
        },
      ],
      siteName: appConfig.name,
      modifiedTime: inovasi.diupdatePada || inovasi.dibuatPada,
      publishedTime: inovasi.dibuatPada,
      authors: [inovasi.pembuat.nama],
    },
    twitter: {
      card: "summary_large_image",
      title: inovasi.judul,
      description,
      images: [ogImage],
      creator: appConfig.twitterHandle,
    },
    alternates: {
      canonical: `${links.appUrl}/inovasi/${inovasi.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
};

// Generic page metadata generator
export const generatePageMetadata = (params: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata => {
  const { title, description, path = "", image, noIndex } = params;
  
  return {
    title: title ? `${title} | ${appConfig.name}` : `${appConfig.name} - ${appConfig.tagline}`,
    description: description ? truncateDescription(description) : appConfig.description,
    openGraph: {
      title: title ? `${title} | ${appConfig.name}` : `${appConfig.name} - ${appConfig.tagline}`,
      description: description || appConfig.description,
      url: `${links.appUrl}${path}`,
      locale: appConfig.locale,
      images: image ? [{ url: image, width: 1200, height: 630 }] : siteConfig.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${appConfig.name}` : `${appConfig.name} - ${appConfig.tagline}`,
      description: description || appConfig.shortDescription,
      images: image ? [image] : siteConfig.twitter?.images,
      creator: appConfig.twitterHandle,
    },
    alternates: {
      canonical: `${links.appUrl}${path}`,
    },
    robots: noIndex ? {
      index: false,
      follow: true,
    } : undefined,
  };
};