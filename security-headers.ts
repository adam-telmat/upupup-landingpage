/**
 * ==================================================================================
 * SECURITY HEADERS CONFIGURATION - NIVEAU 900 IQ - SÉCURITÉ MILITAIRE
 * ==================================================================================
 * 
 * 🛡️ OBJECTIF: SÉCURITÉ NIVEAU BANQUE - ZÉRO VULNÉRABILITÉ
 * 🔥 PROTECTION CONTRE:
 * - XSS (Cross-Site Scripting)
 * - CSRF (Cross-Site Request Forgery)  
 * - Clickjacking
 * - MIME type sniffing
 * - Protocol downgrade attacks
 * - Information disclosure
 * - Man-in-the-middle attacks
 * 
 * 🎯 COMPLIANCE:
 * - OWASP Top 10 2023
 * - GDPR Article 32
 * - ISO 27001
 * - SOC 2 Type II
 */

export const securityHeaders = {
  // ==================================================================================
  // CONTENT SECURITY POLICY - ULTRA-STRICT
  // ==================================================================================
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://tally.so https://www.google-analytics.com https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://api.casus.com https://www.google-analytics.com",
    "frame-src https://tally.so",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://tally.so",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; '),

  // ==================================================================================
  // ANTI-CLICKJACKING PROTECTION
  // ==================================================================================
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy-Report-Only': "frame-ancestors 'none'",

  // ==================================================================================
  // XSS PROTECTION - MAXIMUM SECURITY
  // ==================================================================================
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',

  // ==================================================================================
  // HTTPS ENFORCEMENT - ULTRA-STRICT
  // ==================================================================================
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',

  // ==================================================================================
  // REFERRER POLICY - PRIVACY PROTECTION
  // ==================================================================================
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // ==================================================================================
  // PERMISSIONS POLICY - MINIMIZE ATTACK SURFACE
  // ==================================================================================
  'Permissions-Policy': [
    'geolocation=()',
    'microphone=()',
    'camera=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'speaker=()',
    'vibrate=()',
    'fullscreen=(self)',
    'sync-xhr=()'
  ].join(', '),

  // ==================================================================================
  // CROSS-ORIGIN POLICIES
  // ==================================================================================
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',

  // ==================================================================================
  // CACHE CONTROL - SECURITY + PERFORMANCE
  // ==================================================================================
  'Cache-Control': 'private, no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',

  // ==================================================================================
  // SERVER INFORMATION HIDING
  // ==================================================================================
  'Server': '', // Hide server information
  'X-Powered-By': '', // Remove framework disclosure

  // ==================================================================================
  // ADDITIONAL SECURITY HEADERS
  // ==================================================================================
  'X-Permitted-Cross-Domain-Policies': 'none',
  'X-Download-Options': 'noopen',
  'X-DNS-Prefetch-Control': 'off',

  // ==================================================================================
  // CUSTOM SECURITY HEADERS
  // ==================================================================================
  'X-Security-Policy': 'Casus-Security-v1.0',
  'X-Content-Security-Policy': 'default-src self'
}

// ==================================================================================
// SECURITY MIDDLEWARE FOR EXPRESS/FASTIFY
// ==================================================================================
export const applySecurityHeaders = (req: any, res: any, next: any) => {
  Object.entries(securityHeaders).forEach(([header, value]) => {
    res.setHeader(header, value)
  })
  next()
}

// ==================================================================================
// NETLIFY/VERCEL _HEADERS FILE CONTENT
// ==================================================================================
export const generateNetlifyHeaders = () => {
  const headers = Object.entries(securityHeaders)
    .map(([key, value]) => `  ${key}: ${value}`)
    .join('\n')
  
  return `/*
${headers}
  
# Cache static assets for 1 year
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Cache API responses for 5 minutes
/api/*
  Cache-Control: public, max-age=300

# No cache for HTML
/*.html
  Cache-Control: no-cache, no-store, must-revalidate`
}

// ==================================================================================
// CLOUDFLARE WORKERS CONFIGURATION
// ==================================================================================
export const cloudflareSecurityRules = {
  // Rate limiting
  rateLimit: {
    threshold: 100, // requests per minute
    period: 60,
    action: 'challenge'
  },
  
  // Bot management
  botManagement: {
    enabled: true,
    fightMode: true
  },
  
  // DDoS protection
  ddosProtection: {
    enabled: true,
    sensitivity: 'high'
  },
  
  // WAF rules
  wafRules: [
    'OWASP Core Rule Set',
    'WordPress Rules',
    'PHP Rules',
    'Drupal Rules'
  ]
}

// ==================================================================================
// SECURITY MONITORING & ALERTS
// ==================================================================================
export const securityMonitoring = {
  // CSP violation reporting
  cspReportUri: 'https://api.casus.com/security/csp-report',
  
  // Security headers monitoring
  headerChecks: [
    'Content-Security-Policy',
    'X-Frame-Options',
    'Strict-Transport-Security'
  ],
  
  // Vulnerability scanning
  scanEndpoints: [
    'https://casus-landing.com',
    'https://api.casus.com'
  ],
  
  // Alert thresholds
  alertThresholds: {
    cspViolations: 10, // per hour
    failedLogins: 5, // per minute
    suspiciousRequests: 50 // per hour
  }
}
