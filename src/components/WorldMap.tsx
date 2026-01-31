import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe } from 'lucide-react';
import { FlowerData } from './Garden';

interface WorldMapProps {
  isOpen: boolean;
  onClose: () => void;
  flowers: FlowerData[];
}

// Simplified world map projection (Mercator-like)
const projectToMap = (lat: number, lng: number): { x: number; y: number } => {
  // Normalize longitude to 0-100 (x axis)
  const x = ((lng + 180) / 360) * 100;
  
  // Mercator projection for latitude
  const latRad = (lat * Math.PI) / 180;
  const mercatorY = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  // Normalize to 0-100 (y axis), inverted for screen coordinates
  const y = 50 - (mercatorY / Math.PI) * 50;
  
  return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
};

// Group flowers by approximate location
const groupFlowersByLocation = (flowers: FlowerData[]) => {
  const groups: { lat: number; lng: number; count: number; flowers: FlowerData[] }[] = [];
  
  flowers.forEach((flower) => {
    if (flower.latitude == null || flower.longitude == null) return;
    
    // Find existing group within ~5 degrees
    const existingGroup = groups.find(
      (g) => 
        Math.abs(g.lat - flower.latitude!) < 5 && 
        Math.abs(g.lng - flower.longitude!) < 5
    );
    
    if (existingGroup) {
      existingGroup.count++;
      existingGroup.flowers.push(flower);
    } else {
      groups.push({
        lat: flower.latitude!,
        lng: flower.longitude!,
        count: 1,
        flowers: [flower],
      });
    }
  });
  
  return groups;
};

export const WorldMap = ({ isOpen, onClose, flowers }: WorldMapProps) => {
  const flowersWithLocation = flowers.filter(f => f.latitude != null && f.longitude != null);
  const locationGroups = groupFlowersByLocation(flowersWithLocation);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Map Container */}
          <motion.div
            className="relative z-10 w-full max-w-4xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div
              className="rounded-3xl overflow-hidden"
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
                className="px-6 py-4 flex items-center justify-between"
                style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-white" />
                  <div>
                    <h3 className="text-white font-display text-lg">
                      Global Garden
                    </h3>
                    <p className="text-white/60 text-xs font-body">
                      {flowersWithLocation.length} flowers from around the world
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Map Area */}
              <div className="relative aspect-[2/1] min-h-[300px]">
                {/* Simplified world map SVG */}
                <svg
                  viewBox="0 0 100 50"
                  className="absolute inset-0 w-full h-full"
                  style={{ opacity: 0.3 }}
                >
                  {/* Simplified continent outlines */}
                  <path
                    d="M10,15 Q15,10 25,12 L30,18 Q25,25 15,22 Z"
                    fill="white"
                    opacity="0.5"
                  />
                  <path
                    d="M45,8 Q55,5 65,10 L70,20 Q60,28 50,25 L45,15 Z"
                    fill="white"
                    opacity="0.5"
                  />
                  <path
                    d="M72,15 Q80,12 90,18 L88,30 Q80,35 75,28 Z"
                    fill="white"
                    opacity="0.5"
                  />
                  <path
                    d="M55,28 Q60,25 65,30 L62,40 Q55,42 52,35 Z"
                    fill="white"
                    opacity="0.5"
                  />
                  <path
                    d="M20,28 Q28,25 35,30 L38,42 Q25,48 18,38 Z"
                    fill="white"
                    opacity="0.5"
                  />
                  <path
                    d="M78,35 Q85,32 92,38 L90,45 Q82,48 78,42 Z"
                    fill="white"
                    opacity="0.5"
                  />
                </svg>

                {/* Flower markers */}
                {locationGroups.map((group, index) => {
                  const { x, y } = projectToMap(group.lat, group.lng);
                  return (
                    <motion.div
                      key={index}
                      className="absolute flex items-center justify-center"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <motion.div
                        className="relative"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      >
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center text-xs"
                          style={{
                            background: 'linear-gradient(135deg, #FF6B9D 0%, #C44DFF 100%)',
                            boxShadow: '0 0 20px rgba(255, 107, 157, 0.5)',
                          }}
                        >
                          🌸
                        </div>
                        {group.count > 1 && (
                          <div
                            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-xs flex items-center justify-center font-bold"
                            style={{ color: '#C44DFF', fontSize: '10px' }}
                          >
                            {group.count}
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Empty state */}
                {flowersWithLocation.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white/60">
                      <Globe className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="font-body">No location data yet</p>
                      <p className="text-sm">Plant a flower to add your location!</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Legend */}
              <div
                className="px-6 py-4 flex items-center justify-between"
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                }}
              >
                <p className="text-white/60 text-sm font-body">
                  🌸 Each dot represents flowers planted from that region
                </p>
                <p className="text-white/40 text-xs font-body">
                  Total: {flowers.length} flowers worldwide
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
