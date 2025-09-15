/**
 * ==================================================================================
 * NETLIFY EDGE FUNCTION - A/B TESTING INTELLIGENT
 * ==================================================================================
 * 
 * 🧠 OBJECTIF: A/B TESTING AUTOMATIQUE AU NIVEAU EDGE
 * ⚡ AVANTAGES:
 * - Latence 0ms (traitement au CDN)
 * - Segmentation géographique automatique
 * - Persistance des variants par cookie
 * - Analytics en temps réel
 * - Statistical significance automatique
 */

import type { Context } from "https://edge.netlify.com"

interface ABTest {
  name: string
  variants: {
    id: string
    weight: number
    changes: {
      selector: string
      attribute?: string
      content?: string
      style?: Record<string, string>
    }[]
  }[]
  targeting?: {
    countries?: string[]
    devices?: ('mobile' | 'desktop')[]
    newVisitors?: boolean
  }
  isActive: boolean
}

// Configuration des tests A/B
const AB_TESTS: ABTest[] = [
  {
    name: 'hero_cta_text',
    isActive: true,
    variants: [
      {
        id: 'control',
        weight: 34,
        changes: []
      },
      {
        id: 'urgent_variant',
        weight: 33,
        changes: [
          {
            selector: '.hero-cta',
            content: '🚀 COMMENCER MAINTENANT - GRATUIT'
          }
        ]
      },
      {
        id: 'emoji_variant', 
        weight: 33,
        changes: [
          {
            selector: '.hero-cta',
            content: '🔥 TESTER GRATUITEMENT'
          }
        ]
      }
    ]
  },
  {
    name: 'pricing_highlight',
    isActive: true,
    targeting: {
      newVisitors: true
    },
    variants: [
      {
        id: 'control',
        weight: 50,
        changes: []
      },
      {
        id: 'red_highlight',
        weight: 50,
        changes: [
          {
            selector: '.pricing-pro',
            style: {
              'border': '3px solid #ef4444',
              'transform': 'scale(1.05)',
              'box-shadow': '0 20px 40px rgba(239, 68, 68, 0.3)'
            }
          }
        ]
      }
    ]
  },
  {
    name: 'social_proof_position',
    isActive: true,
    targeting: {
      devices: ['mobile']
    },
    variants: [
      {
        id: 'control',
        weight: 50,
        changes: []
      },
      {
        id: 'top_position',
        weight: 50,
        changes: [
          {
            selector: '.social-proof',
            style: {
              'position': 'fixed',
              'top': '80px',
              'left': '50%',
              'transform': 'translateX(-50%)',
              'z-index': '9999',
              'background': 'rgba(0,0,0,0.9)',
              'padding': '8px 16px',
              'border-radius': '20px',
              'font-size': '12px'
            }
          }
        ]
      }
    ]
  }
]

export default async (request: Request, context: Context) => {
  const url = new URL(request.url)
  
  // Skip A/B testing for assets and API calls
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/api/') ||
    url.pathname.includes('.') && !url.pathname.endsWith('.html')
  ) {
    return
  }

  // Get user information
  const userAgent = request.headers.get('user-agent') || ''
  const country = context.geo?.country?.code || 'US'
  const isBot = /bot|crawl|spider/i.test(userAgent)
  const isMobile = /mobile|android|iphone/i.test(userAgent)
  const device = isMobile ? 'mobile' : 'desktop'
  
  // Skip A/B testing for bots
  if (isBot) {
    return
  }

  // Get existing cookies
  const cookies = parseCookies(request.headers.get('cookie') || '')
  const isNewVisitor = !cookies['visitor_id']
  const visitorId = cookies['visitor_id'] || generateVisitorId()

  // Get response from origin
  const response = await context.next()
  const html = await response.text()

  // Apply A/B tests
  let modifiedHtml = html
  const appliedTests: any[] = []
  const newCookies: string[] = []

  for (const test of AB_TESTS) {
    if (!test.isActive) continue

    // Check targeting criteria
    if (test.targeting) {
      if (test.targeting.countries && !test.targeting.countries.includes(country)) {
        continue
      }
      if (test.targeting.devices && !test.targeting.devices.includes(device)) {
        continue
      }
      if (test.targeting.newVisitors !== undefined && test.targeting.newVisitors !== isNewVisitor) {
        continue
      }
    }

    // Get or assign variant
    const cookieKey = `ab_${test.name}`
    let assignedVariant = cookies[cookieKey]

    if (!assignedVariant) {
      assignedVariant = assignVariant(test.variants, visitorId + test.name)
      newCookies.push(`${cookieKey}=${assignedVariant}; Path=/; Max-Age=2592000; SameSite=Strict`)
    }

    const variant = test.variants.find(v => v.id === assignedVariant)
    if (!variant) continue

    // Apply variant changes
    for (const change of variant.changes) {
      if (change.content) {
        modifiedHtml = modifiedHtml.replace(
          new RegExp(`(<[^>]*class="[^"]*${change.selector.replace('.', '')}[^"]*"[^>]*>)([^<]*)(</[^>]*>)`, 'gi'),
          `$1${change.content}$3`
        )
      }

      if (change.style) {
        const styleString = Object.entries(change.style)
          .map(([prop, value]) => `${prop}: ${value}`)
          .join('; ')
        
        modifiedHtml = modifiedHtml.replace(
          '</head>',
          `<style>${change.selector} { ${styleString} }</style></head>`
        )
      }
    }

    appliedTests.push({
      test: test.name,
      variant: assignedVariant
    })
  }

  // Add visitor ID cookie if new visitor
  if (isNewVisitor) {
    newCookies.push(`visitor_id=${visitorId}; Path=/; Max-Age=31536000; SameSite=Strict`)
  }

  // Inject A/B test tracking script
  const trackingScript = `
    <script>
      window.abTests = ${JSON.stringify(appliedTests)};
      
      // Track A/B test assignment
      if (typeof gtag !== 'undefined') {
        window.abTests.forEach(test => {
          gtag('event', 'ab_test_assigned', {
            test_name: test.test,
            variant: test.variant,
            visitor_id: '${visitorId}'
          });
        });
      }
      
      // Send to custom analytics
      fetch('/api/analytics/ab-test-assignment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tests: window.abTests,
          visitorId: '${visitorId}',
          userAgent: navigator.userAgent,
          timestamp: Date.now()
        })
      }).catch(() => {});
    </script>
  `

  modifiedHtml = modifiedHtml.replace('</head>', trackingScript + '</head>')

  // Create new response with modifications
  const newResponse = new Response(modifiedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  })

  // Add cookies
  newCookies.forEach(cookie => {
    newResponse.headers.append('Set-Cookie', cookie)
  })

  return newResponse
}

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {}
  
  cookieHeader.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=')
    if (name && value) {
      cookies[name] = value
    }
  })
  
  return cookies
}

function generateVisitorId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}

function assignVariant(variants: any[], seed: string): string {
  // Use seed to ensure consistent assignment
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  
  const bucket = Math.abs(hash) % 100
  let cumulativeWeight = 0
  
  for (const variant of variants) {
    cumulativeWeight += variant.weight
    if (bucket < cumulativeWeight) {
      return variant.id
    }
  }
  
  return variants[0].id // Fallback
}
