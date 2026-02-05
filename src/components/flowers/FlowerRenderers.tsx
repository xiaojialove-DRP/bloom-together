 import { motion } from 'framer-motion';
 
 export type FlowerStage = 'seed' | 'sprout' | 'bloom';
 
 export interface FlowerColors {
   primary: string;
   secondary: string;
   shadow: string;
 }
 
 interface RendererProps {
   stage: FlowerStage;
   colors: FlowerColors;
 }
 
 // Iris: Tall elegant sword-like petals
 export const IrisRenderer = ({ stage, colors }: RendererProps) => (
   <svg viewBox="0 0 100 130" className="w-full h-full">
     <motion.path
       d="M50 125 Q48 100 50 75 Q52 50 50 30"
       stroke="hsl(120, 40%, 30%)"
       strokeWidth="3"
       fill="none"
       strokeLinecap="round"
       initial={{ pathLength: 0 }}
       animate={{ pathLength: stage !== 'seed' ? 1 : 0 }}
       transition={{ duration: 0.6 }}
     />
     {stage !== 'seed' && (
       <>
         <motion.path
           d="M50 120 Q30 90 35 60"
           stroke="hsl(120, 45%, 35%)"
           strokeWidth="4"
           fill="none"
           initial={{ pathLength: 0 }}
           animate={{ pathLength: 1 }}
           transition={{ duration: 0.5, delay: 0.2 }}
         />
         <motion.path
           d="M50 110 Q70 85 65 55"
           stroke="hsl(125, 40%, 40%)"
           strokeWidth="4"
           fill="none"
           initial={{ pathLength: 0 }}
           animate={{ pathLength: 1 }}
           transition={{ duration: 0.5, delay: 0.3 }}
         />
       </>
     )}
     {stage === 'bloom' && (
       <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
         <motion.ellipse cx="35" cy="35" rx="6" ry="18" fill={colors.secondary} transform="rotate(-30 35 35)" />
         <motion.ellipse cx="65" cy="35" rx="6" ry="18" fill={colors.secondary} transform="rotate(30 65 35)" />
         <motion.ellipse cx="50" cy="45" rx="6" ry="16" fill={colors.secondary} />
         <motion.ellipse cx="40" cy="20" rx="5" ry="14" fill={colors.primary} transform="rotate(-15 40 20)" />
         <motion.ellipse cx="60" cy="20" rx="5" ry="14" fill={colors.primary} transform="rotate(15 60 20)" />
         <motion.ellipse cx="50" cy="15" rx="5" ry="12" fill={colors.primary} />
         <circle cx="50" cy="32" r="4" fill="hsl(45, 80%, 60%)" />
       </motion.g>
     )}
     {stage === 'seed' && <motion.ellipse cx="50" cy="115" rx="4" ry="6" fill="hsl(30, 50%, 30%)" initial={{ scale: 0 }} animate={{ scale: 1 }} />}
     {stage === 'sprout' && (
       <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
         <path d="M50 80 Q45 60 50 45" stroke="hsl(120, 50%, 45%)" strokeWidth="4" fill="none" />
       </motion.g>
     )}
   </svg>
 );
 
 // Poppy: Large cup-shaped petals with dark center
 export const PoppyRenderer = ({ stage, colors }: RendererProps) => (
   <svg viewBox="0 0 100 120" className="w-full h-full">
     <motion.path
       d="M50 115 Q47 95 50 75 Q53 55 50 40"
       stroke="hsl(120, 40%, 35%)"
       strokeWidth="2.5"
       fill="none"
       initial={{ pathLength: 0 }}
       animate={{ pathLength: stage !== 'seed' ? 1 : 0 }}
     />
     {stage !== 'seed' && (
       <motion.ellipse cx="40" cy="85" rx="8" ry="4" fill="hsl(120, 45%, 40%)" transform="rotate(-25 40 85)" initial={{ scale: 0 }} animate={{ scale: 1 }} />
     )}
     {stage === 'bloom' && (
       <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
         <motion.ellipse cx="35" cy="35" rx="18" ry="20" fill={colors.primary} opacity="0.9" transform="rotate(-20 35 35)" />
         <motion.ellipse cx="65" cy="35" rx="18" ry="20" fill={colors.secondary} opacity="0.9" transform="rotate(20 65 35)" />
         <motion.ellipse cx="50" cy="25" rx="16" ry="18" fill={colors.primary} opacity="0.95" />
         <motion.ellipse cx="50" cy="45" rx="14" ry="16" fill={colors.secondary} opacity="0.85" />
         <circle cx="50" cy="35" r="8" fill="hsl(0, 0%, 15%)" />
         <circle cx="48" cy="33" r="1.5" fill="hsl(45, 80%, 50%)" />
         <circle cx="52" cy="33" r="1.5" fill="hsl(45, 80%, 50%)" />
         <circle cx="50" cy="37" r="1.5" fill="hsl(45, 80%, 50%)" />
       </motion.g>
     )}
     {stage === 'seed' && <motion.ellipse cx="50" cy="105" rx="4" ry="6" fill="hsl(30, 50%, 30%)" initial={{ scale: 0 }} animate={{ scale: 1 }} />}
     {stage === 'sprout' && (
       <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
         <ellipse cx="45" cy="55" rx="6" ry="12" fill="hsl(120, 50%, 45%)" transform="rotate(-10 45 55)" />
         <ellipse cx="55" cy="55" rx="6" ry="12" fill="hsl(125, 45%, 50%)" transform="rotate(10 55 55)" />
       </motion.g>
     )}
   </svg>
 );
 
 // Rose: Spiral layered petals
 export const RoseRenderer = ({ stage, colors }: RendererProps) => (
   <svg viewBox="0 0 100 120" className="w-full h-full">
     <motion.path
       d="M50 115 Q45 95 50 75 Q55 60 50 45"
       stroke="hsl(120, 35%, 30%)"
       strokeWidth="3"
       fill="none"
       initial={{ pathLength: 0 }}
       animate={{ pathLength: stage !== 'seed' ? 1 : 0 }}
     />
     {stage !== 'seed' && (
       <>
         <motion.path d="M50 90 Q35 80 30 70 Q40 75 50 85" fill="hsl(120, 45%, 35%)" initial={{ scale: 0 }} animate={{ scale: 1 }} />
         <motion.path d="M50 80 Q65 70 70 60 Q60 68 50 75" fill="hsl(125, 40%, 40%)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} />
       </>
     )}
     {stage === 'bloom' && (
       <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
         {[0, 72, 144, 216, 288].map((angle, i) => (
           <motion.ellipse key={`outer-${i}`} cx="50" cy="28" rx="10" ry="16" fill={colors.primary} opacity={0.9 - i * 0.05} transform={`rotate(${angle} 50 35)`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }} />
         ))}
         {[30, 90, 150, 210, 270, 330].map((angle, i) => (
           <motion.ellipse key={`mid-${i}`} cx="50" cy="30" rx="7" ry="11" fill={colors.secondary} opacity={0.95} transform={`rotate(${angle} 50 35)`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.03 }} />
         ))}
         <circle cx="50" cy="35" r="6" fill={colors.primary} />
         <circle cx="50" cy="35" r="3" fill={colors.secondary} />
       </motion.g>
     )}
     {stage === 'seed' && <motion.ellipse cx="50" cy="105" rx="4" ry="6" fill="hsl(30, 50%, 30%)" initial={{ scale: 0 }} animate={{ scale: 1 }} />}
     {stage === 'sprout' && (
       <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
         <ellipse cx="46" cy="55" rx="5" ry="10" fill="hsl(120, 50%, 45%)" transform="rotate(-8 46 55)" />
         <ellipse cx="54" cy="55" rx="5" ry="10" fill="hsl(120, 45%, 50%)" transform="rotate(8 54 55)" />
       </motion.g>
     )}
   </svg>
 );
 
 // Sunflower (wildflower): Large round face with ray petals
 export const SunflowerRenderer = ({ stage, colors }: RendererProps) => (
   <svg viewBox="0 0 100 120" className="w-full h-full">
     <motion.path
       d="M50 118 Q48 100 50 80 Q52 60 50 45"
       stroke="hsl(100, 50%, 35%)"
       strokeWidth="4"
       fill="none"
       initial={{ pathLength: 0 }}
       animate={{ pathLength: stage !== 'seed' ? 1 : 0 }}
     />
     {stage !== 'seed' && (
       <>
         <motion.ellipse cx="35" cy="90" rx="12" ry="8" fill="hsl(110, 50%, 40%)" transform="rotate(-30 35 90)" initial={{ scale: 0 }} animate={{ scale: 1 }} />
         <motion.ellipse cx="65" cy="75" rx="10" ry="7" fill="hsl(115, 45%, 45%)" transform="rotate(25 65 75)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} />
       </>
     )}
     {stage === 'bloom' && (
       <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
         {Array.from({ length: 16 }).map((_, i) => (
           <motion.ellipse key={i} cx="50" cy="20" rx="4" ry="14" fill={i % 2 === 0 ? colors.primary : colors.secondary} transform={`rotate(${i * 22.5} 50 38)`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.02 }} />
         ))}
         <circle cx="50" cy="38" r="14" fill="hsl(30, 60%, 25%)" />
         {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
           <circle key={i} cx={50 + 6 * Math.cos(angle * Math.PI / 180)} cy={38 + 6 * Math.sin(angle * Math.PI / 180)} r="2" fill="hsl(35, 50%, 35%)" />
         ))}
       </motion.g>
     )}
     {stage === 'seed' && <motion.ellipse cx="50" cy="108" rx="5" ry="7" fill="hsl(35, 50%, 30%)" initial={{ scale: 0 }} animate={{ scale: 1 }} />}
     {stage === 'sprout' && (
       <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
         <ellipse cx="44" cy="60" rx="8" ry="14" fill="hsl(110, 50%, 45%)" transform="rotate(-10 44 60)" />
         <ellipse cx="56" cy="60" rx="8" ry="14" fill="hsl(115, 45%, 50%)" transform="rotate(10 56 60)" />
       </motion.g>
     )}
   </svg>
 );
 
 // Lavender: Multiple small flowers on spikes
 export const LavenderRenderer = ({ stage, colors }: RendererProps) => (
   <svg viewBox="0 0 100 130" className="w-full h-full">
     <motion.path d="M40 125 Q38 100 42 70" stroke="hsl(120, 35%, 40%)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: stage !== 'seed' ? 1 : 0 }} />
     <motion.path d="M50 125 Q50 95 50 60" stroke="hsl(120, 40%, 35%)" strokeWidth="2.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: stage !== 'seed' ? 1 : 0 }} transition={{ delay: 0.1 }} />
     <motion.path d="M60 125 Q62 100 58 70" stroke="hsl(125, 35%, 40%)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: stage !== 'seed' ? 1 : 0 }} transition={{ delay: 0.2 }} />
     {stage !== 'seed' && (
       <>
         <motion.path d="M40 115 Q25 105 30 95" stroke="hsl(120, 40%, 40%)" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
         <motion.path d="M60 115 Q75 105 70 95" stroke="hsl(125, 35%, 45%)" strokeWidth="3" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.1 }} />
       </>
     )}
     {stage === 'bloom' && (
       <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
         {[65, 58, 51, 44].map((y, i) => (
           <motion.ellipse key={`l-${i}`} cx="42" cy={y} rx="4" ry="3" fill={i % 2 === 0 ? colors.primary : colors.secondary} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }} />
         ))}
         {[55, 47, 39, 31, 24, 18].map((y, i) => (
           <motion.ellipse key={`c-${i}`} cx="50" cy={y} rx="5" ry="4" fill={i % 2 === 0 ? colors.primary : colors.secondary} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 + i * 0.04 }} />
         ))}
         {[65, 58, 51, 44].map((y, i) => (
           <motion.ellipse key={`r-${i}`} cx="58" cy={y} rx="4" ry="3" fill={i % 2 === 0 ? colors.secondary : colors.primary} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.05 }} />
         ))}
       </motion.g>
     )}
     {stage === 'seed' && <motion.ellipse cx="50" cy="115" rx="3" ry="5" fill="hsl(30, 50%, 30%)" initial={{ scale: 0 }} animate={{ scale: 1 }} />}
     {stage === 'sprout' && (
       <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
         <path d="M48 90 Q45 75 48 60" stroke="hsl(120, 45%, 50%)" strokeWidth="3" fill="none" />
         <path d="M52 90 Q55 75 52 60" stroke="hsl(125, 40%, 55%)" strokeWidth="3" fill="none" />
       </motion.g>
     )}
   </svg>
 );
 
 // Daisy: Simple white petals radiating from yellow center
 export const DaisyRenderer = ({ stage, colors }: RendererProps) => (
   <svg viewBox="0 0 100 120" className="w-full h-full">
     <motion.path
       d="M50 115 Q48 95 50 75 Q52 60 50 45"
       stroke="hsl(120, 45%, 40%)"
       strokeWidth="2"
       fill="none"
       initial={{ pathLength: 0 }}
       animate={{ pathLength: stage !== 'seed' ? 1 : 0 }}
     />
     {stage !== 'seed' && (
       <>
         <motion.ellipse cx="40" cy="90" rx="8" ry="4" fill="hsl(120, 50%, 45%)" transform="rotate(-35 40 90)" initial={{ scale: 0 }} animate={{ scale: 1 }} />
         <motion.ellipse cx="60" cy="80" rx="7" ry="4" fill="hsl(125, 45%, 50%)" transform="rotate(30 60 80)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} />
       </>
     )}
     {stage === 'bloom' && (
       <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
         {Array.from({ length: 12 }).map((_, i) => (
           <motion.ellipse key={i} cx="50" cy="28" rx="3.5" ry="12" fill={colors.primary} transform={`rotate(${i * 30} 50 38)`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.03 }} />
         ))}
         <circle cx="50" cy="38" r="8" fill={colors.secondary} />
         <circle cx="48" cy="36" r="1.5" fill="hsl(40, 90%, 45%)" />
         <circle cx="52" cy="37" r="1.5" fill="hsl(40, 90%, 45%)" />
         <circle cx="50" cy="40" r="1.5" fill="hsl(40, 90%, 45%)" />
       </motion.g>
     )}
     {stage === 'seed' && <motion.ellipse cx="50" cy="105" rx="3" ry="5" fill="hsl(30, 50%, 30%)" initial={{ scale: 0 }} animate={{ scale: 1 }} />}
     {stage === 'sprout' && (
       <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
         <ellipse cx="46" cy="60" rx="5" ry="10" fill="hsl(120, 50%, 50%)" transform="rotate(-10 46 60)" />
         <ellipse cx="54" cy="60" rx="5" ry="10" fill="hsl(125, 45%, 55%)" transform="rotate(10 54 60)" />
       </motion.g>
     )}
   </svg>
 );