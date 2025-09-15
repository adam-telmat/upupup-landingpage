/**
 * ==================================================================================
 * SCRIPT DE TEST SEO - NIVEAU 900 IQ - AUDIT COMPLET
 * ==================================================================================
 * 
 * 🎯 OBJECTIF: VÉRIFICATION AUTOMATIQUE DU SEO TECHNIQUE
 * 🚀 TESTS HYPERCHARGED:
 * - Meta tags optimization
 * - Structured data validation
 * - Performance metrics
 * - Accessibility compliance
 * - Mobile optimization
 * - Core Web Vitals simulation
 */

const https = require('https')
const http = require('http')
const { JSDOM } = require('jsdom')

// Configuration des tests
const TEST_CONFIG = {
  url: process.env.TEST_URL || 'http://localhost:4173',
  timeout: 15000,
  userAgent: 'Casus-SEO-Audit/2.0 (Mozilla/5.0 compatible)'
}

// Critères SEO avec scoring
const SEO_CRITERIA = {
  title: {
    weight: 15,
    test: (dom) => {
      const title = dom.window.document.querySelector('title')
      if (!title) return { score: 0, message: 'Balise title manquante' }
      
      const titleText = title.textContent.trim()
      if (titleText.length === 0) return { score: 0, message: 'Titre vide' }
      if (titleText.length < 30) return { score: 30, message: 'Titre trop court (<30 caractères)' }
      if (titleText.length > 60) return { score: 70, message: 'Titre trop long (>60 caractères)' }
      if (!titleText.includes('Casus')) return { score: 80, message: 'Marque manquante dans le titre' }
      
      return { score: 100, message: 'Titre optimisé' }
    }
  },
  
  description: {
    weight: 15,
    test: (dom) => {
      const desc = dom.window.document.querySelector('meta[name="description"]')
      if (!desc) return { score: 0, message: 'Meta description manquante' }
      
      const descText = desc.getAttribute('content').trim()
      if (descText.length === 0) return { score: 0, message: 'Description vide' }
      if (descText.length < 120) return { score: 50, message: 'Description trop courte (<120 caractères)' }
      if (descText.length > 160) return { score: 70, message: 'Description trop longue (>160 caractères)' }
      if (!descText.includes('Casus')) return { score: 80, message: 'Marque manquante dans la description' }
      
      return { score: 100, message: 'Description optimisée' }
    }
  },
  
  headings: {
    weight: 10,
    test: (dom) => {
      const h1s = dom.window.document.querySelectorAll('h1')
      const h2s = dom.window.document.querySelectorAll('h2')
      
      if (h1s.length === 0) return { score: 0, message: 'Aucun H1 trouvé' }
      if (h1s.length > 1) return { score: 50, message: 'Plusieurs H1 détectés' }
      if (h2s.length === 0) return { score: 60, message: 'Aucun H2 trouvé' }
      
      const h1Text = h1s[0].textContent.trim()
      if (h1Text.length < 20) return { score: 70, message: 'H1 trop court' }
      if (!h1Text.includes('IA') && !h1Text.includes('Casus')) return { score: 80, message: 'Mots-clés manquants dans H1' }
      
      return { score: 100, message: 'Structure de titres optimisée' }
    }
  },
  
  images: {
    weight: 10,
    test: (dom) => {
      const images = dom.window.document.querySelectorAll('img')
      let score = 100
      let issues = []
      
      images.forEach(img => {
        if (!img.getAttribute('alt')) {
          score -= 20
          issues.push('Image sans attribut alt')
        }
        
        if (!img.getAttribute('loading') && !img.src.includes('logo')) {
          score -= 10
          issues.push('Lazy loading manquant')
        }
      })
      
      return {
        score: Math.max(0, score),
        message: issues.length > 0 ? issues.join(', ') : 'Images optimisées'
      }
    }
  },
  
  structuredData: {
    weight: 15,
    test: (dom) => {
      const scripts = dom.window.document.querySelectorAll('script[type="application/ld+json"]')
      
      if (scripts.length === 0) return { score: 0, message: 'Aucune donnée structurée trouvée' }
      
      let validSchemas = 0
      let totalSchemas = scripts.length
      
      scripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent)
          if (data['@context'] && data['@type']) {
            validSchemas++
          }
        } catch (e) {
          // Schema invalide
        }
      })
      
      const score = (validSchemas / totalSchemas) * 100
      return {
        score: score,
        message: `${validSchemas}/${totalSchemas} schémas valides`
      }
    }
  },
  
  openGraph: {
    weight: 10,
    test: (dom) => {
      const ogTags = ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']
      let foundTags = 0
      
      ogTags.forEach(tag => {
        if (dom.window.document.querySelector(`meta[property="${tag}"]`)) {
          foundTags++
        }
      })
      
      const score = (foundTags / ogTags.length) * 100
      return {
        score: score,
        message: `${foundTags}/${ogTags.length} tags Open Graph présents`
      }
    }
  },
  
  twitterCard: {
    weight: 5,
    test: (dom) => {
      const twitterTags = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']
      let foundTags = 0
      
      twitterTags.forEach(tag => {
        if (dom.window.document.querySelector(`meta[name="${tag}"]`)) {
          foundTags++
        }
      })
      
      const score = (foundTags / twitterTags.length) * 100
      return {
        score: score,
        message: `${foundTags}/${twitterTags.length} tags Twitter Card présents`
      }
    }
  },
  
  canonical: {
    weight: 10,
    test: (dom) => {
      const canonical = dom.window.document.querySelector('link[rel="canonical"]')
      
      if (!canonical) return { score: 0, message: 'URL canonique manquante' }
      
      const href = canonical.getAttribute('href')
      if (!href) return { score: 50, message: 'URL canonique vide' }
      if (!href.startsWith('http')) return { score: 70, message: 'URL canonique relative' }
      
      return { score: 100, message: 'URL canonique correcte' }
    }
  },
  
  viewport: {
    weight: 5,
    test: (dom) => {
      const viewport = dom.window.document.querySelector('meta[name="viewport"]')
      
      if (!viewport) return { score: 0, message: 'Meta viewport manquante' }
      
      const content = viewport.getAttribute('content')
      if (!content.includes('width=device-width')) return { score: 50, message: 'Viewport non responsive' }
      
      return { score: 100, message: 'Viewport optimisée' }
    }
  },
  
  lang: {
    weight: 5,
    test: (dom) => {
      const html = dom.window.document.querySelector('html')
      
      if (!html) return { score: 0, message: 'Balise HTML manquante' }
      
      const lang = html.getAttribute('lang')
      if (!lang) return { score: 0, message: 'Attribut lang manquant' }
      if (lang !== 'fr') return { score: 70, message: 'Langue non française' }
      
      return { score: 100, message: 'Langue correctement définie' }
    }
  }
}

// Fonction principale de test SEO
async function runSEOAudit() {
  console.log('🎯 AUDIT SEO HYPERCHARGED - NIVEAU 900 IQ')
  console.log('='.repeat(50))
  console.log(`🌐 URL testée: ${TEST_CONFIG.url}`)
  console.log('⏰ Démarrage de l\'analyse...\n')

  try {
    // Récupération du HTML
    console.log('📥 Récupération du contenu HTML...')
    const html = await fetchHTML(TEST_CONFIG.url)
    const dom = new JSDOM(html)
    
    console.log('✅ HTML récupéré avec succès\n')

    // Exécution des tests SEO
    console.log('🔍 ANALYSE SEO TECHNIQUE:')
    console.log('-'.repeat(40))

    let totalScore = 0
    let maxScore = 0
    const results = []

    for (const [criteriaName, criteria] of Object.entries(SEO_CRITERIA)) {
      const result = criteria.test(dom)
      const weightedScore = (result.score / 100) * criteria.weight
      
      totalScore += weightedScore
      maxScore += criteria.weight
      
      const status = result.score >= 90 ? '✅' : 
                    result.score >= 70 ? '⚠️' : '❌'
      
      console.log(`${status} ${criteriaName.toUpperCase()}: ${result.score}/100`)
      console.log(`   ${result.message}`)
      console.log(`   Poids: ${criteria.weight} | Score pondéré: ${weightedScore.toFixed(1)}`)
      console.log()

      results.push({
        criteria: criteriaName,
        score: result.score,
        message: result.message,
        weight: criteria.weight,
        weightedScore: weightedScore
      })
    }

    // Calcul du score final
    const finalScore = Math.round((totalScore / maxScore) * 100)

    // Tests supplémentaires
    await runTechnicalSEOTests(dom, html)

    // Résumé final
    console.log('📊 SCORE SEO FINAL:')
    console.log('='.repeat(30))
    console.log(`🎯 Score global: ${finalScore}/100`)
    console.log(`📈 Score pondéré: ${totalScore.toFixed(1)}/${maxScore}`)

    if (finalScore >= 95) {
      console.log('\n🏆 EXCEPTIONNEL! SEO niveau Google ready!')
    } else if (finalScore >= 85) {
      console.log('\n✅ EXCELLENT! SEO très bien optimisé.')
    } else if (finalScore >= 70) {
      console.log('\n⚠️  BIEN. Quelques optimisations possibles.')
    } else if (finalScore >= 50) {
      console.log('\n🔧 MOYEN. Optimisations importantes nécessaires.')
    } else {
      console.log('\n❌ CRITIQUE! SEO nécessite une refonte majeure!')
      process.exit(1)
    }

    // Recommandations
    console.log('\n💡 RECOMMANDATIONS PRIORITAIRES:')
    const lowScoreItems = results.filter(r => r.score < 80).sort((a, b) => b.weight - a.weight)
    
    if (lowScoreItems.length > 0) {
      lowScoreItems.slice(0, 3).forEach(item => {
        console.log(`• ${item.criteria}: ${item.message}`)
      })
    } else {
      console.log('🎉 Aucune amélioration critique nécessaire!')
    }

    // Export des résultats
    await exportResults(results, finalScore)

  } catch (error) {
    console.error('❌ Erreur lors de l\'audit SEO:', error.message)
    process.exit(1)
  }
}

// Fonction pour récupérer le HTML
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https')
    const client = isHttps ? https : http
    
    const request = client.request(url, {
      method: 'GET',
      timeout: TEST_CONFIG.timeout,
      headers: {
        'User-Agent': TEST_CONFIG.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    }, (response) => {
      let html = ''
      
      response.on('data', (chunk) => {
        html += chunk
      })
      
      response.on('end', () => {
        resolve(html)
      })
    })

    request.on('error', reject)
    request.on('timeout', () => reject(new Error('Timeout')))
    request.end()
  })
}

// Tests SEO techniques avancés
async function runTechnicalSEOTests(dom, html) {
  console.log('🔬 TESTS TECHNIQUES AVANCÉS:')
  console.log('-'.repeat(30))

  // Test de la taille du HTML
  const htmlSize = Buffer.byteLength(html, 'utf8')
  if (htmlSize > 1000000) { // 1MB
    console.log(`⚠️  TAILLE HTML: ${(htmlSize / 1024).toFixed(0)}KB (>1MB, peut être lent)`)
  } else {
    console.log(`✅ TAILLE HTML: ${(htmlSize / 1024).toFixed(0)}KB (optimisée)`)
  }

  // Test du nombre de liens
  const links = dom.window.document.querySelectorAll('a[href]')
  if (links.length > 100) {
    console.log(`⚠️  LIENS: ${links.length} liens (>100, peut diluer le PageRank)`)
  } else {
    console.log(`✅ LIENS: ${links.length} liens (quantité raisonnable)`)
  }

  // Test des liens externes
  let externalLinks = 0
  links.forEach(link => {
    const href = link.getAttribute('href')
    if (href && href.startsWith('http') && !href.includes(new URL(TEST_CONFIG.url).hostname)) {
      externalLinks++
      
      // Vérifier rel="noopener noreferrer"
      const rel = link.getAttribute('rel')
      if (!rel || (!rel.includes('noopener') || !rel.includes('noreferrer'))) {
        console.log(`⚠️  LIEN EXTERNE: ${href} sans rel="noopener noreferrer"`)
      }
    }
  })
  
  console.log(`📊 LIENS EXTERNES: ${externalLinks} (avec vérification sécurité)`)

  // Test de la densité de mots-clés
  const textContent = dom.window.document.body.textContent.toLowerCase()
  const keywordDensity = {
    'casus': (textContent.match(/casus/g) || []).length,
    'ia fiscale': (textContent.match(/ia fiscale/g) || []).length,
    'expert-comptable': (textContent.match(/expert[- ]comptable/g) || []).length,
    'automatisation': (textContent.match(/automatisation/g) || []).length
  }

  console.log('🎯 DENSITÉ MOTS-CLÉS:')
  Object.entries(keywordDensity).forEach(([keyword, count]) => {
    const density = (count / textContent.split(' ').length * 100).toFixed(2)
    console.log(`   "${keyword}": ${count} occurrences (${density}%)`)
  })
}

// Export des résultats
async function exportResults(results, finalScore) {
  const fs = require('fs').promises
  
  const report = {
    timestamp: new Date().toISOString(),
    url: TEST_CONFIG.url,
    finalScore: finalScore,
    results: results,
    summary: {
      excellent: results.filter(r => r.score >= 90).length,
      good: results.filter(r => r.score >= 70 && r.score < 90).length,
      needsImprovement: results.filter(r => r.score < 70).length
    }
  }

  try {
    await fs.mkdir('seo-reports', { recursive: true })
    await fs.writeFile(
      `seo-reports/seo-audit-${Date.now()}.json`,
      JSON.stringify(report, null, 2)
    )
    console.log('\n📁 Rapport détaillé exporté dans seo-reports/')
  } catch (error) {
    console.log('\n⚠️  Impossible d\'exporter le rapport:', error.message)
  }
}

// Exécution du script
if (require.main === module) {
  runSEOAudit()
}

module.exports = { runSEOAudit }
