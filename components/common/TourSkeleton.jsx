const TourSkeleton = () => {
  const skeletonStyles = {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    borderRadius: '8px',
    marginBottom: '20px',
  };

  return (
    <div style={{ minHeight: '600px' }}>
      <div className="container pt-40">
        <div style={{ ...skeletonStyles, height: '60px' }}></div>
        <div style={{ ...skeletonStyles, height: '400px' }}></div>
        <div style={{ ...skeletonStyles, height: '300px', marginBottom: '0' }}></div>
      </div>
    </div>
  );
};

export default TourSkeleton;