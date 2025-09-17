import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, Star, CheckCircle2,
  FileText, Search, Brain, MessageCircle, Scale, ShieldCheck, Clock, Monitor
} from 'lucide-react';

function MobileApp() {
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
              src="/logo-upupupfinal.png" 
              alt="UP UP UP Logo" 
              className="w-auto h-14 object-contain"
            />
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
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
            Audit gratuit
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
      
      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <div className="flex flex-col gap-10 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
             <h1 className="text-lg font-bold text-white mb-8 leading-tight px-2 whitespace-pre-line">
               Boostez vos performances et{' '}
               <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                 passez&nbsp;à&nbsp;la&nbsp;vitesse<br />supérieure
               </span>
             </h1>
             
             <p className="text-sm text-gray-300 mb-8 leading-relaxed px-2">
               <span className="text-purple-400 font-semibold">UP UP UP vous accompagne dans l'automatisation et le growth marketing</span> pour maximiser vos performances.
             </p>
            
            {/* Testimonial */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 backdrop-blur-sm">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
               <p className="text-sm text-gray-300 italic mb-2">
                 "UP UP UP nous a aidés à automatiser notre prospection et optimiser notre growth. De 50 leads/mois à 200+ leads qualifiés avec moins d'effort !"
               </p>
               <div className="text-xs text-gray-400">
                 Marc Dubois, Fondateur, TechStart
               </div>
            </div>
            
            {/* CTA */}
            <div className="space-y-4">
               <motion.button
                 className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 w-full"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 Automatisez et commencez à scaler dès maintenant
               </motion.button>
               
               <p className="text-white text-sm font-bold">
                 Accompagnement stratégique — 20 ans d'expérience
               </p>
            </div>
            
             {/* Metrics */}
             <div className="grid grid-cols-2 gap-4 mt-10">
               <div className="text-center">
                 <div className="text-2xl font-bold text-purple-400 mb-1">4x</div>
                 <div className="text-sm text-gray-300">Plus de leads qualifiés</div>
               </div>
               <div className="text-center">
                 <div className="text-2xl font-bold text-blue-400 mb-1">-60%</div>
                 <div className="text-sm text-gray-300">De temps de prospection</div>
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
            <div className="relative w-[300px] h-[300px]">
               {/* SOLEIL CENTRAL - LOGO UP UP UP DIRECT */}
               <div className="absolute inset-0 flex items-center justify-center">
                 <img 
                   src="/logo-upupupfinal.png" 
                   alt="UP UP UP Soleil" 
                   className="w-20 h-20 object-contain"
                 />
               </div>
 
               {/* Rails visibles rétablis (cercles parfaits) */}
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative">
                   {/* Rail 1 */}
                   <div style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }} className="absolute">
                     <div style={{ width: '140px', height: '140px' }} className="rounded-full border border-purple-500/30"></div>
                   </div>
                   {/* Rail 2 */}
                   <div style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }} className="absolute">
                     <div style={{ width: '200px', height: '200px' }} className="rounded-full border border-purple-500/30"></div>
                   </div>
                   {/* Rail 3 */}
                   <div style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }} className="absolute">
                     <div style={{ width: '260px', height: '260px' }} className="rounded-full border border-purple-500/30"></div>
                   </div>
                 </div>
               </div>
              
              {/* PLANÈTES EN ORBITE - ELLIPSES ÉLARGIES + STYLE DEMANDÉ */}
              <PlanetOrbit radiusPx={70} initialAngleDeg={0} periodSec={18} direction={1} scaleX={1}>
                <div className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-lg shadow-black/50">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
              </PlanetOrbit>

              <PlanetOrbit radiusPx={100} initialAngleDeg={20} periodSec={30} direction={1} scaleX={1}>
                <div className="w-8 h-8 flex items-center justify-center z-30">
                  <img src="/upupup-logocoupe-removebg-preview.png" alt="Logo UP UP UP Planète" className="w-6 h-6 object-contain" />
                </div>
              </PlanetOrbit>

              <PlanetOrbit radiusPx={130} initialAngleDeg={120} periodSec={42} direction={1} scaleX={1}>
                <div className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-lg shadow-black/50">
                  <Brain className="w-4 h-4 text-white" />
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
            Nos offres d'externalisation
          </h2>
          <p className="text-xl text-gray-300">
            Des solutions flexibles et rentables pour votre prospection commerciale
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Prospection Téléphonique */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(168,85,247,0.15)" }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-1">Prospection Téléphonique</h3>
            <div className="text-gray-300 mb-4">Le canal incontournable en B to B</div>
            <div className="text-5xl font-bold text-white mb-1">Sur devis</div>
            <div className="text-sm text-purple-300 mb-6">Contrat court de 3 mois</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                400 à 800 appels mensuels ciblés
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Business developer dédié basé en France
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Reporting hebdomadaire de 30 min
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Reporting stratégique mensuel de 1h
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Démarrage en 4 semaines
              </li>
            </ul>
            <button className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold">
              Demander un devis
            </button>
          </motion.div>

          {/* Conseil Commercial - Recommandé */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 50px rgba(168,85,247,0.25)" }}
            className="bg-gradient-to-br from-purple-500/15 to-blue-500/10 border-2 border-purple-500 rounded-2xl p-8 backdrop-blur-sm relative"
          >
            
            <h3 className="text-2xl font-bold text-white mb-1">Conseil Commercial</h3>
            <div className="text-gray-300 mb-4">Optimisation complète de votre process</div>
            <div className="text-5xl font-bold text-white mb-1">Sur devis</div>
            <div className="text-sm text-purple-200 mb-2">Audit + Stratégie + Déploiement</div>
            <div className="text-xs text-gray-400 mb-6">Accompagnement personnalisé</div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Audit stratégique commercial
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Structuration de l'offre
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Organisation optimale de la force de vente
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Méthodes de vente et outils intégrés
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Pilotage et animation du déploiement
              </li>
            </ul>
            <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-bold">
              Demander un audit gratuit
            </button>
          </motion.div>

          {/* Recrutement & Formation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(59,130,246,0.15)" }}
            className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-1">Recrutement & Formation</h3>
            <div className="text-gray-300 mb-4">Équipes de vente 100% opérationnelles</div>
            <div className="text-4xl font-bold text-blue-400 mb-6">Sur devis</div>
            <p className="text-gray-300 mb-8">Recrutement personnalisé et formation complète pour intégrer rapidement de nouveaux talents commerciaux</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Recherche de profils sur mesure
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Formation interne selon vos process
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Formation financée par OPCO
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Intégration 100% opérationnelle
              </li>
            </ul>
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold">
              Nous contacter
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
    <section id="services" className="py-20 bg-black relative overflow-hidden">
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
            Nos services d'expertise commerciale
          </h2>
          <p className="text-xl text-gray-300">
            Une approche complète pour optimiser votre process de vente de la stratégie à la mise en œuvre
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Conseil Commercial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Conseil Commercial</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Analyse de votre problématique commerciale et élaboration d'une stratégie personnalisée pour amplifier vos performances.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Diagnostic terrain complet
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Stratégie commerciale sur mesure
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Plan d'action opérationnel
              </li>
            </ul>
          </motion.div>

          {/* Prospection Externalisée */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4">
                <Search className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Prospection Externalisée</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Ciblage, pitch de vente, roadmap et funnel de vente. Un flux régulier de rendez-vous qualifiés pour votre agenda.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Business developer dédié
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                400-800 appels mensuels ciblés
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Reporting hebdomadaire
              </li>
            </ul>
          </motion.div>

          {/* Recrutement Commercial */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4">
                <Brain className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Recrutement Commercial</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Recrutement de votre équipe de vente selon des critères personnalisés et formation pour une intégration 100% opérationnelle.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Recherche de profils sur mesure
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Formation interne complète
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Intégration opérationnelle
              </li>
            </ul>
          </motion.div>

          {/* Formation Commerciale */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-2 border-orange-500/40 rounded-2xl p-8 backdrop-blur-sm relative"
          >
            <div className="absolute -top-3 -right-3">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                ⭐ POPULAIRE
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Formation Commerciale</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Formation de vos équipes de vente aux meilleures méthodes commerciales et à la maîtrise des pratiques digitales.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Méthodes commerciales 3.0
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Formation financée par OPCO
              </li>
              <li className="flex items-center text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                Consultant dédié
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
          {/* Gain de temps précieux */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Gain de temps précieux</h3>
            <p className="text-gray-300 text-sm mb-4">(Libérez vos ressources et concentrez-vous sur l'essentiel.)</p>
            <p className="text-gray-300">
              La régularité est une des clés de réussite : vous avez l'assurance d'un temps uniquement consacré à la prospection.
            </p>
          </motion.div>

          {/* Vraie expertise */}
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
            <h3 className="text-2xl font-bold text-white mb-2">Vraie expertise</h3>
            <p className="text-gray-300 text-sm mb-4">(Bénéficiez d'une équipe expérimentée et aguerrie)</p>
            <p className="text-gray-300">
              Vous bénéficiez de l'appui d'une équipe expérimentée, aguerrie aux méthodes traditionnelles de prospection et aux dernières pratiques digitales.
            </p>
          </motion.div>

          {/* Optimisation des coûts */}
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
            <h3 className="text-2xl font-bold text-white mb-2">Optimisation des coûts</h3>
            <p className="text-gray-300 text-sm mb-4">(Maîtrisez parfaitement vos coûts opérationnels)</p>
            <p className="text-gray-300">
              Vous évitez les coûts fixes d'une équipe interne et bénéficiez de toutes nos ressources avec un contrôle total sur vos budgets.
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
            Plus de 200 fondateurs et dirigeants ont transformé leur approche commerciale avec UP UP UP
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Marc Dubois",
              role: "Fondateur & CEO",
              company: "TechStart",
              content: "UP UP UP nous a permis de structurer notre approche commerciale et de multiplier nos rendez-vous qualifiés par 3. Leur expertise en prospection externalisée nous a fait gagner un temps précieux et nous a permis de nous concentrer sur notre cœur de métier. Une équipe professionnelle et des résultats concrets !",
              rating: 5
            },
            {
              name: "Sarah Chen",
              role: "Co-fondatrice",
              company: "InnovateLab",
              content: "L'accompagnement d'UP UP UP a transformé notre force de vente. Leur recrutement et formation nous ont permis d'intégrer des commerciaux 100% opérationnels en quelques semaines. Un investissement qui se rentabilise rapidement !",
              rating: 5
            },
            {
              name: "Thomas Moreau",
              role: "Fondateur",
              company: "ScaleUp Solutions",
              content: "Le conseil commercial d'UP UP UP nous a aidés à optimiser notre process de vente de A à Z. Leur diagnostic terrain et leur stratégie personnalisée ont boosté nos performances commerciales de manière significative.",
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
              src="/logo-upupupfinal.png" 
              alt="UP UP UP Logo" 
               className="w-auto h-40 object-contain"
            />
          </div>
          
          {/* Tagline */}
          <p className="text-xl text-gray-300 mb-4">
            L'expertise commerciale qui transforme votre business
          </p>
          <p className="text-gray-400 mb-8">
            Chez UP UP UP, nous sommes une équipe de professionnels du commerce passionnés dont la mission est d'optimiser votre process de vente de la stratégie à sa mise en œuvre opérationnelle
          </p>
          
          {/* Contact */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
            <a 
              href="https://www.linkedin.com/company/upupup.pro/" 
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
               href="mailto:adam.telmat@upupup.pro"
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              adam.telmat@upupup.pro
            </a>
          </div>
          
          {/* Copyright */}
          <div className="pt-8 border-t border-gray-800">
            <p className="text-gray-500">
              © 2025 UP UP UP. Tous droits réservés.
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
    // Pas de bouton sticky sur mobile
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

export default MobileApp;
