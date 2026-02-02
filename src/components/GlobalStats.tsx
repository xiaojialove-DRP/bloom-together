import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, X } from 'lucide-react';
import { FlowerData } from '@/hooks/useGlobalFlowers';
import { useLanguage } from '@/hooks/useLanguage';
import { Language, languageNames } from '@/lib/i18n';

interface GlobalStatsProps {
  flowerCount: number;
  flowers: FlowerData[];
}

// Simplified world map projection
const projectToMap = (lat: number, lng: number): { x: number; y: number } => {
  const x = ((lng + 180) / 360) * 100;
  const latRad = (lat * Math.PI) / 180;
  const mercatorY = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = 50 - (mercatorY / Math.PI) * 50;
  return { x: Math.max(0, Math.min(100, x)), y: Math.max(5, Math.min(95, y)) };
};

// Group flowers by location
const groupFlowersByLocation = (flowers: FlowerData[]) => {
  const groups: { lat: number; lng: number; count: number }[] = [];
  
  flowers.forEach((flower) => {
    if (flower.latitude == null || flower.longitude == null) return;
    
    const existingGroup = groups.find(
      (g) => Math.abs(g.lat - flower.latitude!) < 8 && Math.abs(g.lng - flower.longitude!) < 8
    );
    
    if (existingGroup) {
      existingGroup.count++;
    } else {
      groups.push({ lat: flower.latitude!, lng: flower.longitude!, count: 1 });
    }
  });
  
  return groups;
};

export const GlobalStats = ({ flowerCount, flowers }: GlobalStatsProps) => {
  const { language, setLanguage, t } = useLanguage();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const flowersWithLocation = flowers.filter(f => f.latitude != null && f.longitude != null);
  const locationGroups = groupFlowersByLocation(flowersWithLocation);

  return (
    <>
      {/* Compact Stats Button - Top Right */}
      <motion.div 
        className="fixed top-4 right-4 z-30 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Language Selector - Mini */}
        <div className="relative">
          <motion.button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xs font-body">{language.toUpperCase()}</span>
          </motion.button>
          
          <AnimatePresence>
            {isLangOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 rounded-xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  minWidth: '100px',
                }}
              >
                {(Object.keys(languageNames) as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setIsLangOpen(false); }}
                    className={`w-full px-3 py-1.5 text-left text-xs font-body transition-colors ${
                      language === lang ? 'text-white bg-white/20' : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {languageNames[lang]}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Flower Count - Click to open map */}
        <motion.button
          onClick={() => setIsMapOpen(true)}
          className="px-3 py-1.5 rounded-full flex items-center gap-2"
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
          whileHover={{ scale: 1.03, background: 'rgba(255, 255, 255, 0.18)' }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="text-base">🌸</span>
          <span className="text-white font-body text-sm" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
            {flowerCount}
          </span>
        </motion.button>
      </motion.div>

      {/* Map Modal */}
      <AnimatePresence>
        {isMapOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMapOpen(false)}
            />

            <motion.div
              className="relative z-10 w-full max-w-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(40px)',
                  WebkitBackdropFilter: 'blur(40px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}
              >
                {/* Header */}
                <div
                  className="px-4 py-3 flex items-center justify-between"
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                    background: 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-white/80" />
                    <h3 className="text-white font-display text-sm">{t.globalGarden}</h3>
                    <span className="text-white/50 text-xs font-body">
                      · {flowersWithLocation.length} {t.flowersFromWorld}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMapOpen(false)}
                    className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/10"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Map Area */}
                <div className="relative aspect-[2/1] min-h-[200px]">
                  {/* Simplified world map */}
                  <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full" style={{ opacity: 0.2 }}>
                    <path d="M10,15 Q15,10 25,12 L30,18 Q25,25 15,22 Z" fill="white" />
                    <path d="M45,8 Q55,5 65,10 L70,20 Q60,28 50,25 L45,15 Z" fill="white" />
                    <path d="M72,15 Q80,12 90,18 L88,30 Q80,35 75,28 Z" fill="white" />
                    <path d="M55,28 Q60,25 65,30 L62,40 Q55,42 52,35 Z" fill="white" />
                    <path d="M20,28 Q28,25 35,30 L38,42 Q25,48 18,38 Z" fill="white" />
                    <path d="M78,35 Q85,32 92,38 L90,45 Q82,48 78,42 Z" fill="white" />
                  </svg>

                  {/* Flower markers */}
                  {locationGroups.map((group, index) => {
                    const { x, y } = projectToMap(group.lat, group.lng);
                    return (
                      <motion.div
                        key={index}
                        className="absolute"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.02 }}
                      >
                        <motion.div
                          className="relative"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.1 }}
                        >
                          <div
                            className="w-2.5 h-2.5 rounded-full flex items-center justify-center"
                            style={{
                              background: 'linear-gradient(135deg, #FF6B9D 0%, #C44DFF 100%)',
                              boxShadow: '0 0 10px rgba(255, 107, 157, 0.5)',
                              fontSize: '7px',
                            }}
                          >
                            🌸
                          </div>
                          {group.count > 1 && (
                            <div
                              className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white flex items-center justify-center font-bold"
                              style={{ color: '#C44DFF', fontSize: '7px' }}
                            >
                              {group.count > 9 ? '+' : group.count}
                            </div>
                          )}
                        </motion.div>
                      </motion.div>
                    );
                  })}

                  {/* Empty state */}
                  {flowersWithLocation.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white/50">
                        <Globe className="w-8 h-8 mx-auto mb-2 opacity-40" />
                        <p className="font-body text-xs">{t.noLocationData}</p>
                        <p className="text-xs opacity-60">{t.plantToAdd}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div
                  className="px-4 py-2 flex items-center justify-between"
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <p className="text-white/40 text-xs font-body">
                    🌸 {t.eachDotRepresents}
                  </p>
                  <p className="text-white/50 text-xs font-body">
                    {t.totalFlowers}: {flowerCount}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
