// Web Worker for Analytics and Third-Party Scripts
// This reduces main thread blocking

self.addEventListener('message', function(e) {
  const { type, data } = e.data;
  
  switch (type) {
    case 'LOAD_GTAG':
      loadGoogleAnalytics(data.measurementId);
      break;
      
    case 'TRACK_EVENT':
      if (self.gtag) {
        self.gtag('event', data.eventName, data.parameters);
      }
      break;
      
    case 'LOAD_META_PIXEL':
      loadMetaPixel(data.pixelId);
      break;
      
    case 'LOAD_CLARITY':
      loadMicrosoftClarity(data.clarityId);
      break;
      
    default:
      console.warn('Unknown worker message type:', type);
  }
});

function loadGoogleAnalytics(measurementId) {
  try {
    // Load Google Analytics script
    importScripts(`https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
    
    // Initialize gtag
    self.dataLayer = self.dataLayer || [];
    self.gtag = function() {
      self.dataLayer.push(arguments);
    };
    
    self.gtag('js', new Date());
    self.gtag('config', measurementId, {
      page_title: 'Dream Tourism',
      page_location: self.location.href,
    });
    
    self.postMessage({ 
      type: 'GTAG_LOADED', 
      success: true 
    });
    
  } catch (error) {
    self.postMessage({ 
      type: 'GTAG_LOADED', 
      success: false, 
      error: error.message 
    });
  }
}

function loadMetaPixel(pixelId) {
  try {
    // Meta Pixel initialization
    self.fbq = function() {
      if (self.fbq.callMethod) {
        self.fbq.callMethod.apply(self.fbq, arguments);
      } else {
        self.fbq.queue = self.fbq.queue || [];
        self.fbq.queue.push(arguments);
      }
    };
    
    self.fbq.push = self.fbq;
    self.fbq.loaded = true;
    self.fbq.version = '2.0';
    self.fbq.queue = [];
    
    // Load Meta Pixel script
    importScripts('https://connect.facebook.net/en_US/fbevents.js');
    
    self.fbq('init', pixelId);
    self.fbq('track', 'PageView');
    
    self.postMessage({ 
      type: 'META_PIXEL_LOADED', 
      success: true 
    });
    
  } catch (error) {
    self.postMessage({ 
      type: 'META_PIXEL_LOADED', 
      success: false, 
      error: error.message 
    });
  }
}

function loadMicrosoftClarity(clarityId) {
  try {
    // Microsoft Clarity initialization
    self.clarity = function() {
      (self.clarity.q = self.clarity.q || []).push(arguments);
    };
    
    // Load Clarity script
    importScripts(`https://www.clarity.ms/tag/${clarityId}`);
    
    self.postMessage({ 
      type: 'CLARITY_LOADED', 
      success: true 
    });
    
  } catch (error) {
    self.postMessage({ 
      type: 'CLARITY_LOADED', 
      success: false, 
      error: error.message 
    });
  }
}