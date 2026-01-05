declare global {
  interface Window {
    fbq?: (action: string, event: string, params?: Record<string, unknown>) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params);
  }
};

export const trackCustomEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, params);
  }
};

export const metaPixelEvents = {
  viewContent: (contentName: string, contentType: string) => {
    trackEvent('ViewContent', {
      content_name: contentName,
      content_type: contentType,
    });
  },

  clickLink: (linkType: string, platform: string, releaseName: string) => {
    trackCustomEvent('ClickLink', {
      link_type: linkType,
      platform,
      release_name: releaseName,
    });
  },

  presave: (platform: string, releaseName: string) => {
    trackCustomEvent('Presave', {
      platform,
      release_name: releaseName,
    });
  },

  visitReleasePage: (releaseName: string, slug: string) => {
    trackCustomEvent('VisitReleasePage', {
      release_name: releaseName,
      slug,
    });
  },
};
