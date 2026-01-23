// Google Analytics 4 事件追踪工具

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

// GA4 Measurement ID - 需要从Google Analytics获取
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// 页面浏览追踪
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// ==================== 核心转化事件 ====================

// 1. 用户上传照片
export const trackPhotoUpload = () => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'photo_upload', {
      event_category: 'engagement',
      event_label: 'User uploaded photo',
    });
  }
};

// 2. 脸型检测成功
export const trackDetectionSuccess = (faceShape: string, confidence: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'detection_success', {
      event_category: 'core_feature',
      event_label: faceShape,
      value: Math.round(confidence * 100),
    });
  }
};

// 3. 脸型检测失败
export const trackDetectionError = (errorType: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'detection_error', {
      event_category: 'error',
      event_label: errorType,
    });
  }
};

// 4. 查看发型推荐（核心转化）
export const trackViewRecommendations = (
  faceShape: string,
  gender: string,
  hairstyleCount: number
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'view_recommendations', {
      event_category: 'conversion',
      event_label: `${gender}_${faceShape}`,
      value: hairstyleCount,
    });
  }
};

// 5. 点击发型卡片
export const trackHairstyleClick = (
  hairstyleId: string,
  hairstyleName: string,
  position: number
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'hairstyle_click', {
      event_category: 'engagement',
      event_label: hairstyleName,
      hairstyle_id: hairstyleId,
      position: position,
    });
  }
};

// 6. 打开发型详情
export const trackHairstyleDetail = (hairstyleId: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'hairstyle_detail_view', {
      event_category: 'engagement',
      event_label: hairstyleId,
    });
  }
};

// 7. 分享功能
export const trackShare = (method: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'share', {
      event_category: 'engagement',
      method: method, // 'download', 'social', etc.
    });
  }
};

// 8. 手动选择脸型
export const trackManualFaceShapeSelect = (faceShape: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'manual_face_shape', {
      event_category: 'engagement',
      event_label: faceShape,
    });
  }
};

// ==================== 用户反馈事件 ====================

// 9. 提交反馈
export const trackFeedbackSubmit = (
  rating: number,
  category: string,
  hasComment: boolean
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'feedback_submit', {
      event_category: 'feedback',
      rating: rating,
      feedback_category: category,
      has_comment: hasComment,
    });
  }
};

// 10. 点击"发型数量太少"反馈
export const trackComplaint = (complaintType: string, context?: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'user_complaint', {
      event_category: 'feedback',
      complaint_type: complaintType, // 'too_few_hairstyles', 'not_suitable', etc.
      context: context,
    });
  }
};

// ==================== 性能指标 ====================

// 11. MediaPipe加载时间
export const trackModelLoadTime = (loadTimeMs: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'model_load_time', {
      event_category: 'performance',
      value: loadTimeMs,
    });
  }
};

// 12. 检测耗时
export const trackDetectionTime = (detectionTimeMs: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'detection_time', {
      event_category: 'performance',
      value: detectionTimeMs,
    });
  }
};

// ==================== 用户流失点 ====================

// 13. 用户在某个步骤离开
export const trackDropOff = (step: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'user_drop_off', {
      event_category: 'funnel',
      event_label: step, // 'before_upload', 'after_detection', etc.
    });
  }
};

// ==================== 自定义事件 ====================

// 通用事件追踪
export const trackEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, params);
  }
};
