/**
 * ==================================================================================
 * SCRIPT DE TEST SÉCURITÉ - NIVEAU 900 IQ - AUDIT COMPLET
 * ==================================================================================
 * 
 * 🛡️ OBJECTIF: VÉRIFICATION AUTOMATIQUE DES HEADERS DE SÉCURITÉ
 * 🔍 TESTS AVANCÉS:
 * - Content Security Policy
 * - HTTPS enforcement
 * - XSS protection
 * - Clickjacking protection
 * - Information disclosure
 * - OWASP compliance
 */

const https = require('https')
const http = require('http')

// Configuration des tests
const TEST_CONFIG = {
  url: process.env.TEST_URL || 'http://localhost:4173',
  timeout: 10000,
  userAgent: 'Casus-Security-Audit/2.0'
}

// Headers de sécurité requis avec leurs valeurs attendues
const REQUIRED_HEADERS = {
  'content-security-policy': {
    required: true,
    test: (value) => value.includes("default-src 'self'"),
    description: 'Content Security Policy doit être définie'
  },
  'x-frame-options': {
    required: true,
    test: (value) => value.toLowerCase() === 'deny',
    description: 'X-Frame-Options doit être DENY'
  },
  'x-xss-protection': {
    required: true,
    test: (value) => value.includes('1; mode=block'),
    description: 'XSS Protection doit être activée'
  },
  'x-content-type-options': {
    required: true,
    test: (value) => value.toLowerCase() === 'nosniff',
    description: 'Content-Type sniffing doit être désactivé'
  },
  'strict-transport-security': {
    required: true,
    test: (value) => value.includes('max-age=') && parseInt(value.match(/max-age=(\d+)/)[1]) >= 31536000,
    description: 'HSTS doit être configuré avec max-age >= 1 an'
  },
  'referrer-policy': {
    required: true,
    test: (value) => ['strict-origin-when-cross-origin', 'strict-origin', 'no-referrer'].includes(value.toLowerCase()),
    description: 'Referrer Policy doit limiter les informations'
  },
  'permissions-policy': {
    required: true,
    test: (value) => value.includes('geolocation=()'),
    description: 'Permissions Policy doit restreindre les APIs sensibles'
  }
}

// Headers qui ne doivent PAS être présents (information disclosure)
const FORBIDDEN_HEADERS = [
  'server',
  'x-powered-by',
  'x-aspnet-version',
  'x-aspnetmvc-version'
]

// Fonction principale de test
async function runSecurityAudit() {
  console.log('🛡️  AUDIT DE SÉCURITÉ HYPERCHARGED - NIVEAU 900 IQ')
  console.log('=' .repeat(60))
  console.log(`🎯 URL testée: ${TEST_CONFIG.url}`)
  console.log('⏰ Démarrage des tests...\n')

  try {
    const headers = await fetchHeaders(TEST_CONFIG.url)
    
    let score = 100
    let passed = 0
    let failed = 0
    let warnings = 0

    console.log('📊 RÉSULTATS DES TESTS DE SÉCURITÉ:')
    console.log('-'.repeat(40))

    // Test des headers requis
    for (const [headerName, config] of Object.entries(REQUIRED_HEADERS)) {
      const headerValue = headers[headerName.toLowerCase()]
      
      if (!headerValue) {
        console.log(`❌ ${headerName}: MANQUANT`)
        console.log(`   ${config.description}`)
        failed++
        score -= 10
      } else if (!config.test(headerValue)) {
        console.log(`⚠️  ${headerName}: PRÉSENT MAIS INVALIDE`)
        console.log(`   Valeur: ${headerValue}`)
        console.log(`   ${config.description}`)
        warnings++
        score -= 5
      } else {
        console.log(`✅ ${headerName}: OK`)
        passed++
      }
    }

    console.log()

    // Test des headers interdits
    for (const headerName of FORBIDDEN_HEADERS) {
      const headerValue = headers[headerName.toLowerCase()]
      
      if (headerValue) {
        console.log(`❌ ${headerName}: PRÉSENT (divulgation d'information)`)
        console.log(`   Valeur: ${headerValue}`)
        failed++
        score -= 5
      } else {
        console.log(`✅ ${headerName}: CORRECTEMENT MASQUÉ`)
        passed++
      }
    }

    console.log()

    // Tests avancés
    await runAdvancedSecurityTests(TEST_CONFIG.url, headers)

    // Résumé final
    console.log('📈 SCORE FINAL:')
    console.log('-'.repeat(20))
    console.log(`🎯 Score de sécurité: ${Math.max(0, score)}/100`)
    console.log(`✅ Tests réussis: ${passed}`)
    console.log(`⚠️  Avertissements: ${warnings}`)
    console.log(`❌ Tests échoués: ${failed}`)

    if (score >= 90) {
      console.log('\n🏆 EXCELLENT! Sécurité niveau militaire atteinte!')
    } else if (score >= 75) {
      console.log('\n✅ BIEN! Sécurité solide avec quelques améliorations possibles.')
    } else if (score >= 50) {
      console.log('\n⚠️  MOYEN. Des améliorations importantes sont nécessaires.')
    } else {
      console.log('\n❌ CRITIQUE! Vulnérabilités majeures détectées!')
      process.exit(1)
    }

    // Recommandations
    if (score < 100) {
      console.log('\n💡 RECOMMANDATIONS:')
      console.log('- Vérifiez la configuration Netlify/serveur')
      console.log('- Consultez security-headers.ts pour la configuration')
      console.log('- Testez avec https://securityheaders.com/')
    }

  } catch (error) {
    console.error('❌ Erreur lors de l\'audit:', error.message)
    process.exit(1)
  }
}

// Fonction pour récupérer les headers HTTP
function fetchHeaders(url) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https')
    const client = isHttps ? https : http
    
    const request = client.request(url, {
      method: 'HEAD',
      timeout: TEST_CONFIG.timeout,
      headers: {
        'User-Agent': TEST_CONFIG.userAgent
      }
    }, (response) => {
      // Convertir les headers en minuscules pour la comparaison
      const headers = {}
      for (const [key, value] of Object.entries(response.headers)) {
        headers[key.toLowerCase()] = Array.isArray(value) ? value.join(', ') : value
      }
      resolve(headers)
    })

    request.on('error', reject)
    request.on('timeout', () => reject(new Error('Timeout')))
    request.end()
  })
}

// Tests de sécurité avancés
async function runAdvancedSecurityTests(url, headers) {
  console.log('🔬 TESTS AVANCÉS:')
  console.log('-'.repeat(20))

  // Test HTTPS enforcement
  if (url.startsWith('https')) {
    console.log('✅ HTTPS: Protocole sécurisé utilisé')
  } else {
    console.log('⚠️  HTTPS: Test en local HTTP (OK pour développement)')
  }

  // Test CSP avancé
  const csp = headers['content-security-policy']
  if (csp) {
    if (csp.includes("'unsafe-inline'")) {
      console.log('⚠️  CSP: unsafe-inline détecté (peut réduire la sécurité)')
    } else {
      console.log('✅ CSP: Pas d\'unsafe-inline détecté')
    }

    if (csp.includes('upgrade-insecure-requests')) {
      console.log('✅ CSP: upgrade-insecure-requests activé')
    } else {
      console.log('⚠️  CSP: upgrade-insecure-requests manquant')
    }
  }

  // Test des cookies sécurisés
  const setCookie = headers['set-cookie']
  if (setCookie) {
    if (setCookie.includes('Secure') && setCookie.includes('SameSite')) {
      console.log('✅ COOKIES: Flags de sécurité présents')
    } else {
      console.log('⚠️  COOKIES: Flags de sécurité manquants')
    }
  }

  // Test de la compression
  if (headers['content-encoding']) {
    console.log(`✅ COMPRESSION: ${headers['content-encoding']} activée`)
  } else {
    console.log('⚠️  COMPRESSION: Pas de compression détectée')
  }
}

// Exécution du script
if (require.main === module) {
  runSecurityAudit()
}

module.exports = { runSecurityAudit }
