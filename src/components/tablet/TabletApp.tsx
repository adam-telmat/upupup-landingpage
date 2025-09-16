import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, Star, CheckCircle2,
  FileText, Search, Brain, MessageCircle, Scale, ShieldCheck, Clock, Monitor
} from 'lucide-react';

function TabletApp() {
  type PlanetOrbitProps = {
    radiusPx: number; // rayon vertical (semi-minor)
    initialAngleDeg: number;
    periodSec: number;
    direction?: 1 | -1;
    scaleX?: number; // élargissement horizontal (semi-major = radiusPx * scaleX)
    scaleY?: number; // optionnel si on veut aussi comprimer verticalement
    children: ReactNode;
  };

  const PlanetOrbit = ({ radiusPx, initialAngleDeg, periodSec, direction = 1, scaleX = 1, scaleY = 1, children }: PlanetOrbitProps) => (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ transform: 'translate(-50%, -50%)' }}
      animate={{ rotate: [initialAngleDeg, initialAngleDeg + 360 * direction] }}
      transition={{ repeat: Infinity, repeatType: 'loop', ease: 'linear', duration: periodSec }}
    >
      {/* Scale crée une ellipse; on contre-scale le contenu pour garder la taille du logo */}
      <div style={{ transform: `scale(${scaleX}, ${scaleY})` }}>
        <div style={{ transform: `translateY(-${radiusPx}px)` }} className="relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30" style={{ transform: `translate(-50%, -50%) scale(${1/scaleX}, ${1/scaleY})` }}>
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
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
            Essayez gratuitement
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
        <div className="flex flex-col gap-8 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-2xl font-bold text-white mb-6 leading-tight px-4">
              L'IA fiscale qui libère{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                60% de votre temps
              </span>{' '}
              de recherche.
            </h1>
            
            <p className="text-base text-gray-300 mb-6 leading-relaxed px-4">
              Automatisez vos recherches fiscales et générez des consultations expertes en quelques minutes. 
              La solution IA conçue spécifiquement pour les experts-comptables français.
            </p>
            
            {/* Testimonial */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6 backdrop-blur-sm">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-base text-gray-300 italic mb-3">
                "Une capacité décuplée à modéliser, comparer, anticiper les conséquences fiscales de différentes options pour mes clients"
              </p>
              <div className="text-sm text-gray-400">
                — Kadi SEYDI, Expert-Comptable, Beyond Numbers
              </div>
            </div>
            
            {/* CTA */}
            <div className="space-y-4">
              <motion.button
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 w-full"
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
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">60%</div>
                <div className="text-base text-gray-300">Gain de temps</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">3 min</div>
                <div className="text-base text-gray-300">Consultation générée</div>
              </div>
            </div>
          </motion.div>
          
          {/* Animation Planètes */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center transform md:translate-x-6 lg:translate-x-12"
          >
            <div className="relative w-[500px] h-[500px]">
               {/* SOLEIL CENTRAL - LOGO CASUS DIRECT */}
               <div className="absolute inset-0 flex items-center justify-center">
                 <img 
                   src="/logo-casus.jpeg" 
                   alt="Casus Soleil" 
                   className="w-16 h-16 object-contain"
                 />
               </div>
 
               {/* Rails visibles rétablis (cercles parfaits) */}
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative">
                   {/* Rail 1 */}
                   <div style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }} className="absolute">
                     <div style={{ width: '200px', height: '200px' }} className="rounded-full border border-purple-500/30"></div>
                   </div>
                   {/* Rail 2 */}
                   <div style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }} className="absolute">
                     <div style={{ width: '300px', height: '300px' }} className="rounded-full border border-purple-500/30"></div>
                   </div>
                   {/* Rail 3 */}
                   <div style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }} className="absolute">
                     <div style={{ width: '400px', height: '400px' }} className="rounded-full border border-purple-500/30"></div>
                   </div>
                 </div>
               </div>
              
              {/* PLANÈTES EN ORBITE - ELLIPSES ÉLARGIES + STYLE DEMANDÉ */}
              <PlanetOrbit radiusPx={100} initialAngleDeg={0} periodSec={18} direction={1} scaleX={1}>
                <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-lg shadow-black/50">
                  <Scale className="w-6 h-6 text-white" />
                </div>
              </PlanetOrbit>

              <PlanetOrbit radiusPx={150} initialAngleDeg={20} periodSec={30} direction={1} scaleX={1}>
                <div className="w-12 h-12 flex items-center justify-center z-30">
                  <img src="/logo-c-sun.jpeg" alt="Logo C Planète" className="w-10 h-10 object-contain" />
                </div>
              </PlanetOrbit>

              <PlanetOrbit radiusPx={200} initialAngleDeg={120} periodSec={42} direction={1} scaleX={1}>
                <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-lg shadow-black/50">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
              </PlanetOrbit>
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
            whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(168,85,247,0.15)" }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-1">Starter</h3>
            <div className="text-gray-300 mb-4">Pour un usage modéré</div>
            <div className="text-5xl font-bold text-white mb-1">€99</div>
            <div className="text-sm text-purple-300 mb-6">/mois/utilisateur (HT)</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                30 recherches fiscales / mois
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                10 consultations automatisées
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Casus Genius illimité
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Historique des requêtes en ligne (pas de téléchargement ou d'exportation)
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Support standard (réponse sous 48h)
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
            whileHover={{ scale: 1.03, boxShadow: "0 10px 50px rgba(168,85,247,0.25)" }}
            className="bg-gradient-to-br from-purple-500/15 to-blue-500/10 border-2 border-purple-500 rounded-2xl p-8 backdrop-blur-sm relative"
          >
            <div className="absolute top-4 right-4">
              <div className="bg-purple-600/80 text-white px-3 py-1 rounded-full text-xs font-bold">
                Recommandé
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-1">Pro</h3>
            <div className="text-gray-300 mb-4">Pour les utilisateurs réguliers</div>
            <div className="flex items-baseline mb-1">
              <div className="text-5xl font-bold text-white mr-3 line-through opacity-80">€149</div>
              <div className="text-green-400 font-semibold">1 mois offert</div>
            </div>
            <div className="text-sm text-purple-200 mb-2">/mois/utilisateur (HT)</div>
            <div className="text-xs text-gray-400 mb-6">sans engagement — en 1 clic</div>
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
                Casus Genius illimité
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Historique des requêtes exportable en Word ou PDF
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Support prioritaire (réponse sous 24h)
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
            whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(59,130,246,0.15)" }}
            className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-1">Business</h3>
            <div className="text-gray-300 mb-4">Pour les équipes et les professionnels exigeants</div>
            <div className="text-4xl font-bold text-blue-400 mb-6">Sur mesure</div>
            <p className="text-gray-300 mb-8">Prenez rendez-vous avec l'un de nos experts, établissez un devis sur mesure en fonction de vos besoins</p>
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
  // AVANTAGES SECTION
  // ==================================================================================
  const AvantagesSection = () => (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:80px_80px] animate-pulse" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Gain de temps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Gain de temps</h3>
            <p className="text-gray-300 text-sm mb-4">(Libérez vos ressources et concentrez-vous sur l'essentiel.)</p>
            <p className="text-gray-300">
              Diminuez de 60 % le temps consacré aux recherches et à la rédaction de vos conseils fiscaux.
            </p>
          </motion.div>

          {/* Sécurité & Conformité */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Sécurité & Conformité</h3>
            <p className="text-gray-300 text-sm mb-4">(Recherchez en toute sécurité, garantissez votre conformité)</p>
            <p className="text-gray-300">
              Assurez la sécurité et la conformité de vos données avec notre infrastructure hébergée et protégée en France
            </p>
          </motion.div>

          {/* Interface intuitive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Interface intuitive</h3>
            <p className="text-gray-300 text-sm mb-4">(Une ergonomie pensée pour une utilisation simple et efficace)</p>
            <p className="text-gray-300">
              Profitez d'une plateforme ergonomique, conçue spécialement pour les professionnels exigeants.
            </p>
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
              name: "Kadi SEYDI",
              role: "Expert-Comptable",
              company: "Beyond Numbers",
              content: "Depuis quelques mois, j'ai intégré Casus à ma pratique quotidienne d'expert-comptable. Il s'agit d'une IA spécialisée dans l'analyse fiscale. Résultat ? Une capacité décuplée à modéliser, comparer, anticiper les conséquences fiscales de différentes options pour mes clients. En quelques minutes, je peux aider mes clients à mieux comprendre les options qui s'offrent à eux, et surtout à saisir les risques et opportunités qui pointent à l'horizon. C'est rapide, clair et incroyablement pédagogique !",
              rating: 5
            },
            {
              name: "Jean Martin",
              role: "Avocat Fiscaliste",
              company: "Cabinet Martin & Associés",
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
          <p className="text-xl text-gray-300 mb-4">
            L'IA experte qui optimise vos conseils
          </p>
          <p className="text-gray-400 mb-8">
            Chez Casus, nous sommes une équipe de professionnels du droit passionnés et de spécialistes de l'IA dont la mission est de révolutionner la façon dont les conseils fiscaux sont fournis
          </p>
          
          {/* Contact */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
            <a 
              href="https://www.linkedin.com/company/wearecasus/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <div className="w-5 h-5 mr-2 bg-[#0077B5] rounded flex items-center justify-center">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
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
              © 2025 Casus. Tous droits réservés.
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
    // Pas de bouton sticky sur tablette
    return null;
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
      <AvantagesSection />
      <TemoignagesSection />
      <Footer />
      <StickyCTAButton />
    </div>
  );
}

export default TabletApp;
