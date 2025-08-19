import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { BLOG_CATEGORIES, GET_ALL_COUNTRIES, GET_CMS_BLOG_BY_TITLE } from "@/constant/constants";
import { optimizedDataFetcher, CACHE_DURATION } from "@/utils/optimizedDataFetcher";
import { notFound } from "next/navigation";
import { load } from "cheerio";
import ErrorBoundary from "@/components/common/ErrorBoundary";

// 🚀 OPTIMIZATION: Lazy load SingleBlogPage to reduce initial bundle size
const SingleBlogPage = dynamic(() => import("@/components/blogs/singleBlogPage/SingleBlogPage"), {
  ssr: true,
  loading: () => (
    <div className="single-blog-skeleton" style={{ minHeight: '80vh', padding: '40px 0' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div style={{ 
              height: '400px', 
              background: '#f3f4f6', 
              borderRadius: '12px', 
              marginBottom: '30px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}></div>
            <div style={{ 
              height: '60px', 
              background: '#f3f4f6', 
              borderRadius: '8px', 
              marginBottom: '20px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}></div>
            <div style={{ 
              height: '200px', 
              background: '#f3f4f6', 
              borderRadius: '8px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}></div>
          </div>
          <div className="col-lg-4">
            <div style={{ 
              height: '300px', 
              background: '#f3f4f6', 
              borderRadius: '12px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}></div>
          </div>
        </div>
      </div>
    </div>
  ),
});

// 🚀 OPTIMIZATION: Enhanced metadata generation with better error handling
export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const blogData = await optimizedDataFetcher(
      `${GET_CMS_BLOG_BY_TITLE}/${slug}`,
      {
        next: { 
          revalidate: 3600, // 1 hour
          tags: [`blog-${slug}`, 'blog-metadata']
        },
        cache: true,
        cacheDuration: CACHE_DURATION.LONG,
        maxRetries: 2,
        timeout: 8000,
        fallback: null
      }
    );

    if (blogData && blogData.meta_title) {
      return {
        metadataBase: new URL('https://dreamtourism.it'),
        title: blogData.meta_title,
        description: blogData.meta_description,
        keywords: blogData.keywords || `${blogData.title}, Italy travel, travel blog, ${slug.replace(/-/g, ' ')}`,
        
        // Enhanced Open Graph
        openGraph: {
          title: blogData.meta_title,
          description: blogData.meta_description,
          url: `https://dreamtourism.it/blogs/${slug}`,
          siteName: 'Dream Tourism SRLS',
          locale: 'en_US',
          type: 'article',
          images: [
            {
              url: blogData.cloudflare_image,
              width: 1200,
              height: 630,
              alt: blogData.meta_title,
              type: 'image/webp'
            },
          ],
          publishedTime: blogData.created_at,
          modifiedTime: blogData.updated_at,
          authors: ['Dream Tourism SRLS'],
          section: 'Travel'
        },
        
        // Enhanced Twitter Cards
        twitter: {
          card: 'summary_large_image',
          title: blogData.meta_title,
          description: blogData.meta_description,
          images: [blogData.cloudflare_image],
          creator: '@dreamtourismit'
        },
        
        // SEO Enhancements
        alternates: {
          canonical: `https://dreamtourism.it/blogs/${slug}`
        },
        
        robots: {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
          }
        },
        
        // Article-specific metadata
        category: 'travel',
        classification: 'article'
      };
    }
  } catch (error) {
    console.error(`Blog metadata fetch error for ${slug}:`, error);
  }

  // Fallback metadata for invalid/missing blogs
  return {
    robots: {
      index: false,
      follow: false
    }
  };
}

const BlogPost = async ({ params }) => {
  const { slug } = await params;
  const fullUrl = `https://dreamtourism.it/blogs/${slug}`;

  try {
    // 🚀 OPTIMIZATION: Enhanced parallel data fetching with better error handling
    const [blogContent, categoryData, countriesData] = await Promise.all([
      optimizedDataFetcher(
        `${GET_CMS_BLOG_BY_TITLE}/${slug}`,
        {
          next: { 
            revalidate: 1800, // 30 minutes
            tags: [`blog-${slug}`, 'blog-content']
          },
          cache: true,
          cacheDuration: CACHE_DURATION.MEDIUM,
          maxRetries: 2,
          timeout: 10000,
          fallback: null
        }
      ),
      optimizedDataFetcher(
        BLOG_CATEGORIES,
        {
          next: { revalidate: 3600 }, // 1 hour
          cache: true,
          cacheDuration: CACHE_DURATION.LONG,
          maxRetries: 2,
          fallback: { blog_categories: [] }
        }
      ),
      optimizedDataFetcher(
        GET_ALL_COUNTRIES,
        {
          next: { revalidate: 3600 }, // 1 hour
          cache: true,
          cacheDuration: CACHE_DURATION.LONG,
          maxRetries: 2,
          fallback: { countries: [] }
        }
      ),
    ]);

    // Check if blog content exists and is valid
    if (blogContent && blogContent.title) {
      return (
        <>
          {/* 🚀 CRITICAL: Inline critical CSS for better LCP */}
          <style dangerouslySetInnerHTML={{
            __html: `
              .header-margin{margin-top:80px}
              .container{max-width:1200px;margin:0 auto;padding:0 15px}
              .single-blog-content{padding:40px 0}
              .article-title{font-size:2.5rem;font-weight:700;color:#333;margin-bottom:2rem;line-height:1.3}
              .article-image{width:100%;height:400px;object-fit:cover;border-radius:12px;margin-bottom:2rem}
              @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.7}}
              @media(max-width:768px){
                .article-title{font-size:2rem}
                .article-image{height:250px}
                .single-blog-content{padding:20px 0}
              }
            `
          }} />
          
          <div className="header-margin"></div>
          
          <ErrorBoundary
            fallback={
              <div className="container py-5">
                <div className="text-center">
                  <h1 className="mb-4">Unable to Load Article</h1>
                  <p className="text-muted">This blog post may have been moved or deleted.</p>
                  <a href="/blogs" className="btn btn-primary mt-3">
                    Back to Blog
                  </a>
                </div>
              </div>
            }
          >
            <Suspense fallback={
              <div className="single-blog-skeleton" style={{ minHeight: '80vh', padding: '40px 0' }}>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div style={{ 
                        height: '60px', 
                        background: '#f3f4f6', 
                        borderRadius: '8px', 
                        marginBottom: '20px',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }}></div>
                      <div style={{ 
                        height: '400px', 
                        background: '#f3f4f6', 
                        borderRadius: '12px', 
                        marginBottom: '30px',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }}></div>
                      <div style={{ 
                        height: '200px', 
                        background: '#f3f4f6', 
                        borderRadius: '8px',
                        animation: 'pulse 1.5s ease-in-out infinite'
                      }}></div>
                    </div>
                  </div>
                </div>
              </div>
            }>
              <SingleBlogPage
                contentData={blogContent}
                categoryData={categoryData}
                countriesData={countriesData?.countries || []}
                faqContent={blogContent.faq_content || ""}
                descriptionHTML={blogContent.description}
                load={load}
                fullUrl={fullUrl}
              />
            </Suspense>
          </ErrorBoundary>
        </>
      );
    }
    
    // Blog not found
    return notFound();
    
  } catch (error) {
    console.error(`Blog page error for ${slug}:`, error);
    return notFound();
  }
};

export default BlogPost;
