"use client";

const HomeLoadingSkeleton = () => {
  return (
    <div className="home-loading-skeleton">
      {/* Critical above-the-fold skeleton */}
      <div className="header-margin"></div>
      <div className="hero-skeleton">
        <div className="hero-content-skeleton">
          <div className="hero-title-skeleton"></div>
          <div className="hero-subtitle-skeleton"></div>
          <div className="hero-buttons-skeleton"></div>
        </div>
      </div>
      <div className="tours-skeleton">
        <div className="section-title-skeleton"></div>
        <div className="tour-cards-skeleton">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="tour-card-skeleton"></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .home-loading-skeleton {
          min-height: 100vh;
          background: #fafafa;
        }
        .header-margin {
          height: 80px;
        }
        .hero-skeleton {
          height: 500px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-content-skeleton {
          text-align: center;
          max-width: 600px;
        }
        .hero-title-skeleton {
          height: 60px;
          width: 400px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          margin: 0 auto 20px;
          animation: pulse 1.5s ease-in-out infinite;
        }
        .hero-subtitle-skeleton {
          height: 20px;
          width: 300px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          margin: 0 auto 30px;
          animation: pulse 1.5s ease-in-out infinite;
        }
        .hero-buttons-skeleton {
          height: 50px;
          width: 200px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 25px;
          margin: 0 auto;
          animation: pulse 1.5s ease-in-out infinite;
        }
        .tours-skeleton {
          padding: 80px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-title-skeleton {
          height: 40px;
          width: 300px;
          background: #e2e8f0;
          border-radius: 8px;
          margin: 0 auto 50px;
          animation: pulse 1.5s ease-in-out infinite;
        }
        .tour-cards-skeleton {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }
        .tour-card-skeleton {
          height: 350px;
          background: #e2e8f0;
          border-radius: 12px;
          animation: pulse 1.5s ease-in-out infinite;
          animation-delay: ${i * 0.1}s;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        @media (max-width: 768px) {
          .hero-skeleton {
            height: 240px;
          }
          .hero-title-skeleton {
            height: 40px;
            width: 280px;
          }
          .hero-subtitle-skeleton {
            width: 250px;
          }
          .tour-cards-skeleton {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default HomeLoadingSkeleton;
