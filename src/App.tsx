import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, BarChart3, Star, CheckCircle2,
  FileText, Search, Brain, MessageCircle
} from 'lucide-react';

function App() {
  // ==================================================================================
  // HEADER COMPONENT - NAVIGATION PRINCIPALE
  // ==================================================================================
  const Header = () => (
    <header className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/logo-casus.jpeg" 
              alt="Casus Logo" 
              className="w-auto h-8 object-contain"
            />
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#solutions" className="text-gray-300 hover:text-white transition-colors">Solutions</a>
            <a href="#tarifs" className="text-gray-300 hover:text-white transition-colors">Tarifs</a>
            <a href="#temoignages" className="text-gray-300 hover:text-white transition-colors">Témoignages</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </nav>
          
          {/* CTA */}
          <motion.button
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-purple-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Essai 30 jours
          </motion.button>
        </div>
      </div>
    </header>
  );

  // ==================================================================================
  // HERO SECTION - SECTION PRINCIPALE
  // ==================================================================================
  const HeroSection = () => (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden flex items-center">
      {/* Background Effects Avancés */}
      <div className="absolute inset-0">
        {/* Particules animées */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:50px_50px] animate-pulse" />
        </div>
        
        {/* Orbes lumineux multiples */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Gradient overlay dynamique */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              L'IA fiscale qui libère{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                60% de votre temps
              </span>{' '}
              de recherche.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Automatisez vos recherches fiscales et générez des consultations expertes en quelques minutes. 
              La solution IA conçue spécifiquement pour les experts-comptables français.
            </p>
            
            {/* Testimonial */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 backdrop-blur-sm">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-3">
                "Casus nous fait gagner 3h/jour sur la recherche fiscale"
              </p>
              <div className="text-sm text-gray-400">
                — Pierre M., Expert-Comptable, Cabinet Comptable Parisien
              </div>
            </div>
            
            {/* CTA */}
            <div className="space-y-4">
              <motion.button
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 w-full md:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tester 1 mois offert — sans engagement
              </motion.button>
              
              <p className="text-gray-400 text-sm">
                Carte requise — aucun prélèvement avant la fin de l'essai
              </p>
            </div>
            
            {/* Metrics */}
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">60%</div>
                <div className="text-gray-300">Gain de temps</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">3 min</div>
                <div className="text-gray-300">Consultation générée</div>
              </div>
            </div>
          </motion.div>
          
          {/* Animation Planètes */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center"
          >
            <div className="relative w-[500px] h-[500px] lg:w-[600px] lg:h-[600px]">
              {/* Logo Casus Central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20">
                  <img 
                    src="/logo-casus.jpeg" 
                    alt="Casus" 
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover"
                  />
                </div>
              </div>
              
              {/* ORBITES MOBILES - VERSION MOBILE */}
              {/* Logo 1 - Orbite 1 (100px radius) */}
              <motion.div
                className="absolute w-12 h-12 lg:hidden"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  transformOrigin: "250px 250px",
                  left: "150px",
                  top: "250px"
                }}
              >
                <div className="w-full h-full rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/40 flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <img 
                    src="/logo-casus.jpeg" 
                    alt="Casus" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Logo 2 - Orbite 2 (150px radius) - Reverse */}
              <motion.div
                className="absolute w-12 h-12 lg:hidden"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  transformOrigin: "250px 250px",
                  left: "100px",
                  top: "250px"
                }}
              >
                <div className="w-full h-full rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/40 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <img 
                    src="/logo-casus.jpeg" 
                    alt="Casus" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Logo 3 - Orbite 3 (200px radius) */}
              <motion.div
                className="absolute w-12 h-12 lg:hidden"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  transformOrigin: "250px 250px",
                  left: "50px",
                  top: "250px"
                }}
              >
                <div className="w-full h-full rounded-full bg-green-500/20 backdrop-blur-sm border border-green-500/40 flex items-center justify-center shadow-lg shadow-green-500/25">
                  <img 
                    src="/logo-casus.jpeg" 
                    alt="Casus" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
              </motion.div>
              
              {/* ORBITES DESKTOP - VERSION DESKTOP */}
              {/* Logo 1 - Orbite 1 (120px radius) */}
              <motion.div
                className="absolute w-14 h-14 hidden lg:block"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  transformOrigin: "300px 300px",
                  left: "180px",
                  top: "300px"
                }}
              >
                <div className="w-full h-full rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/40 flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <img 
                    src="/logo-casus.jpeg" 
                    alt="Casus" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Logo 2 - Orbite 2 (180px radius) - Reverse */}
              <motion.div
                className="absolute w-14 h-14 hidden lg:block"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  transformOrigin: "300px 300px",
                  left: "120px",
                  top: "300px"
                }}
              >
                <div className="w-full h-full rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/40 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <img 
                    src="/logo-casus.jpeg" 
                    alt="Casus" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Logo 3 - Orbite 3 (240px radius) */}
              <motion.div
                className="absolute w-14 h-14 hidden lg:block"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  transformOrigin: "300px 300px",
                  left: "60px",
                  top: "300px"
                }}
              >
                <div className="w-full h-full rounded-full bg-green-500/20 backdrop-blur-sm border border-green-500/40 flex items-center justify-center shadow-lg shadow-green-500/25">
                  <img 
                    src="/logo-casus.jpeg" 
                    alt="Casus" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  // ==================================================================================
  // TARIFICATION SECTION
  // ==================================================================================
  const TarificationSection = () => (
    <section id="tarifs" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,white_2px,transparent_0)] [background-size:100px_100px] animate-pulse" />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tarifs transparents
          </h2>
          <p className="text-xl text-gray-300">
            Choisissez l'offre qui correspond à vos besoins
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Starter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Starter</h3>
            <div className="text-4xl font-bold text-purple-400 mb-6">99€<span className="text-lg text-gray-400">/mois</span></div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                30 recherches fiscales / mois
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                10 consultations automatisées
              </li>
            </ul>
            <button className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold">
              Choisir Starter
            </button>
          </motion.div>

          {/* Pro - Recommandé avec 1 MOIS OFFERT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-500 rounded-2xl p-8 backdrop-blur-sm relative transform scale-105"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                1 MOIS OFFERT
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
            <div className="flex items-center mb-6">
              <div className="text-4xl font-bold text-gray-500 line-through mr-4">149€</div>
              <div className="text-4xl font-bold text-green-400">0€</div>
              <span className="text-lg text-gray-400 ml-2">/1er mois</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                100 recherches fiscales / mois
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                25 consultations automatisées
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Support prioritaire (24h)
              </li>
            </ul>
            <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-bold">
              Commencer maintenant
            </button>
          </motion.div>

          {/* Business */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Business</h3>
            <div className="text-4xl font-bold text-blue-400 mb-6">Sur mesure</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Volume illimité
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                API & intégrations
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Support dédié
              </li>
            </ul>
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold">
              Choisir Business
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );

  // ==================================================================================
  // SOLUTIONS SECTION
  // ==================================================================================
  const SolutionsSection = () => (
    <section id="solutions" className="py-20 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:80px_80px] animate-pulse" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Découvrez les modules Casus
          </h2>
          <p className="text-xl text-gray-300">
            Une suite complète d'outils IA pour révolutionner votre approche du conseil fiscal
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Casus Research */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                <Search className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Casus Research</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Recherches fiscales automatisées avec analyse contextuelle et recommandations personnalisées.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Interface et sécurité
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Gain de temps
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Interface intuitive
              </li>
            </ul>
          </motion.div>

          {/* Casus Genius */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Casus Genius</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Assistant IA expert qui comprend vos questions et fournit des réponses fiscales précises.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Réponses instantanées
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Expertise approfondie
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Mise à jour continue
              </li>
            </ul>
          </motion.div>

          {/* Casus Draft */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Casus Draft</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Génération automatique de consultations fiscales professionnelles et personnalisées.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Rédaction automatique
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Format professionnel
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Personnalisation complète
              </li>
            </ul>
          </motion.div>

          {/* Casus Analyse - NOUVEAU */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-2 border-green-500/40 rounded-2xl p-8 backdrop-blur-sm relative"
          >
            <div className="absolute -top-3 -right-3">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                🆕 NOUVEAU
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mr-4">
                <BarChart3 className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Casus Analyse</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Analysez vos liasses fiscales avec l'IA. Détection automatique des optimisations et sécurisation de vos analyses.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Analyse automatique des liasses
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Détection d'optimisations
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Sécurisation fiscale
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );

  // ==================================================================================
  // TÉMOIGNAGES SECTION
  // ==================================================================================
  const TemoignagesSection = () => (
    <section id="temoignages" className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-20 w-72 h-72 bg-green-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-20 w-72 h-72 bg-yellow-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_3px_3px,white_1px,transparent_0)] [background-size:60px_60px] animate-pulse" />
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-gray-300">
            Plus de 500 experts-comptables utilisent déjà Casus
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Marie Dubois",
              role: "Expert-Comptable",
              company: "Cabinet Dubois & Associés",
              content: "Casus a révolutionné notre approche. 60% de temps économisé sur nos recherches fiscales.",
              rating: 5
            },
            {
              name: "Jean Martin",
              role: "Directeur Associé",
              company: "Expertise Comptable Martin",
              content: "L'IA de Casus nous permet de proposer un service premium à nos clients. Indispensable !",
              rating: 5
            },
            {
              name: "Sophie Laurent",
              role: "Expert-Comptable",
              company: "Laurent Conseil",
              content: "Interface intuitive et résultats bluffants. Nos clients sont impressionnés par notre réactivité.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-sm text-gray-400">{testimonial.role}</div>
                <div className="text-sm text-purple-400">{testimonial.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // ==================================================================================
  // FOOTER COMPONENT
  // ==================================================================================
  const Footer = () => (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src="/logo-casus.jpeg" 
              alt="Casus Logo" 
              className="w-auto h-12 object-contain"
            />
          </div>
          
          {/* Tagline */}
          <p className="text-xl text-gray-300 mb-8">
            L'IA experte qui optimise vos conseils
          </p>
          
          {/* Contact */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
            <a 
              href="https://www.linkedin.com/company/wearecasus/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              LinkedIn
            </a>
            <a 
              href="mailto:adam.telmat@wearecasus.co"
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              adam.telmat@wearecasus.co
            </a>
          </div>
          
          {/* Copyright */}
          <div className="pt-8 border-t border-gray-800">
            <p className="text-gray-500">
              © 2024 Casus. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );

  // ==================================================================================
  // STICKY CTA BUTTON
  // ==================================================================================
  const StickyCTAButton = () => {
    const [showSticky, setShowSticky] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setShowSticky(window.scrollY > 500);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTarification = () => {
      document.getElementById('tarifs')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (!showSticky) return null;

    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50"
      >
        <motion.button
          onClick={scrollToTarification}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-4 rounded-full font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 flex items-center space-x-2 relative overflow-hidden"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(168, 85, 247, 0.3)",
              "0 0 30px rgba(168, 85, 247, 0.5)",
              "0 0 20px rgba(168, 85, 247, 0.3)"
            ]
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity }
          }}
        >
          <span>1 mois offert</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>
    );
  };

  // ==================================================================================
  // MAIN APP COMPONENT
  // ==================================================================================
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <HeroSection />
      <TarificationSection />
      <SolutionsSection />
      <TemoignagesSection />
      <Footer />
      <StickyCTAButton />
    </div>
  );
}

export default App;
