import { useState, useEffect } from 'react';
import DesktopApp from '../desktop/DesktopApp';
import TabletApp from '../tablet/TabletApp';
import MobileApp from '../mobile/MobileApp';

// Composant qui détecte la résolution et affiche la bonne version
const ResponsiveWrapper = () => {
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      
      // Ajustement pour les mobiles avec haute résolution comme Galaxy S8+
      if (width >= 1200) {
        setDeviceType('desktop');
      } else if (width >= 900) {
        setDeviceType('tablet');
      } else {
        setDeviceType('mobile');
      }
    };

    // Vérifier au chargement
    checkDeviceType();

    // Écouter les changements de taille
    window.addEventListener('resize', checkDeviceType);

    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // Afficher la bonne version selon la résolution
  if (deviceType === 'mobile') {
    return <MobileApp />;
  } else if (deviceType === 'tablet') {
    return <TabletApp />;
  } else {
    return <DesktopApp />;
  }
};

export default ResponsiveWrapper;
