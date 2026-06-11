import React from "react";
import { Metadata } from "next";
import { getArticleBySlug } from "@/data/noticiasData";
import ArticleClient from "./ArticleClient";

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. DYNAMIC METADATA GENERATOR (SEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artículo No Encontrado | SEC Noticias",
      description: "La publicación solicitada no está disponible en este momento.",
    };
  }

  return {
    title: `${article.title} | SEC Noticias`,
    description: article.subtitle,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      images: [{ url: article.image }],
      type: "article",
      publishedTime: article.date,
      authors: [article.authorId],
      section: article.category,
      tags: [article.tag],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.subtitle,
      images: [article.image],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  // 2. STRUCTURED DATA (JSON-LD)
  const jsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": article.title,
        "description": article.subtitle,
        "image": [article.image],
        "datePublished": article.date,
        "dateModified": article.date,
        "author": {
          "@type": "Person",
          "name": article.authorId === "santi-cabrera" ? "Santiago Cabrera" : article.authorId === "eliana-gomez" ? "Eliana Gómez" : "Marcos Juárez",
        },
        "publisher": {
          "@type": "Organization",
          "name": "SEC Noticias",
          "logo": {
            "@type": "ImageObject",
            "url": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=180&q=80",
          },
        },
      }
    : null;

  return (
    <>
      {/* Dynamic JSON-LD injection */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Render Client component for interactivity */}
      <ArticleClient initialArticle={article} slug={slug} />
    </>
  );
}
