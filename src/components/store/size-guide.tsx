"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ruler, Hand, CircleDot } from "lucide-react";
import { Modal } from "@/components/ui/modal";

type GuideTab = "bague" | "collier" | "bracelet";

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: GuideTab;
}

const ringData = [
  { size: "15mm", eu: "48", us: "4.5", circumference: "47.1mm" },
  { size: "16mm", eu: "50", us: "5.5", circumference: "50.3mm" },
  { size: "17mm", eu: "53", us: "6.5", circumference: "53.4mm" },
  { size: "18mm", eu: "56", us: "7.5", circumference: "56.5mm" },
  { size: "19mm", eu: "59", us: "8.5", circumference: "59.7mm" },
  { size: "20mm", eu: "62", us: "10", circumference: "62.8mm" },
];

const necklaceData = [
  { length: "40cm", name: "Ras de cou", description: "Tombe au niveau de la base du cou" },
  { length: "45cm", name: "Princesse", description: "Le classique, tombe sous la clavicule" },
  { length: "50cm", name: "Matinee", description: "Au-dessus de la poitrine" },
  { length: "55cm", name: "Opera", description: "Au niveau de la poitrine" },
];

const braceletData = [
  { size: "S", wrist: "14-15.5 cm", description: "Poignet fin" },
  { size: "M", wrist: "16-17 cm", description: "Poignet moyen" },
  { size: "L", wrist: "17.5-19 cm", description: "Poignet large" },
];

export function SizeGuide({ isOpen, onClose, defaultTab = "bague" }: SizeGuideProps) {
  const [activeTab, setActiveTab] = useState<GuideTab>(defaultTab);

  const tabs: { key: GuideTab; label: string; icon: React.ElementType }[] = [
    { key: "bague", label: "Bagues", icon: CircleDot },
    { key: "collier", label: "Colliers", icon: Ruler },
    { key: "bracelet", label: "Bracelets", icon: Hand },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Guide des tailles">
      <div>
        {/* Tabs */}
        <div className="flex border-b mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-brand-gold text-brand-gold"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "bague" && <RingSizeGuide />}
            {activeTab === "collier" && <NecklaceSizeGuide />}
            {activeTab === "bracelet" && <BraceletSizeGuide />}
          </motion.div>
        </AnimatePresence>
      </div>
    </Modal>
  );
}

function RingSizeGuide() {
  return (
    <div>
      {/* Visual hand diagram */}
      <div className="bg-brand-cream/50 rounded-xl p-4 mb-5">
        <div className="flex items-center gap-4">
          {/* SVG hand with ring */}
          <div className="flex-shrink-0">
            <svg
              width="80"
              height="100"
              viewBox="0 0 80 100"
              fill="none"
              className="text-brand-gold"
            >
              {/* Simplified hand shape */}
              <path
                d="M25 95 L25 45 C25 40 20 35 20 25 C20 15 28 10 33 15 L33 30 M33 95 L33 20 C33 10 43 10 43 20 L43 95 M43 25 C43 15 53 15 53 25 L53 95 M53 30 C53 20 63 22 63 32 L63 95"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Ring on finger */}
              <ellipse
                cx="38"
                cy="55"
                rx="8"
                ry="5"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Arrow for diameter */}
              <line
                x1="30"
                y1="55"
                x2="46"
                y2="55"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-display font-bold text-brand-black text-sm mb-1">
              Comment mesurer ?
            </h4>
            <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
              <li>Prenez un fil ou une bande de papier</li>
              <li>Enroulez-le autour de votre doigt</li>
              <li>Marquez le point de croisement</li>
              <li>Mesurez la longueur en mm</li>
              <li>Consultez le tableau ci-dessous</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Size table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-2 text-xs font-bold text-gray-500 uppercase">
                Diametre
              </th>
              <th className="text-left py-2 px-2 text-xs font-bold text-gray-500 uppercase">
                Taille EU
              </th>
              <th className="text-left py-2 px-2 text-xs font-bold text-gray-500 uppercase">
                Taille US
              </th>
              <th className="text-left py-2 px-2 text-xs font-bold text-gray-500 uppercase">
                Tour de doigt
              </th>
            </tr>
          </thead>
          <tbody>
            {ringData.map((row, i) => (
              <tr
                key={i}
                className={`border-b last:border-0 ${
                  i % 2 === 0 ? "bg-brand-cream/30" : ""
                }`}
              >
                <td className="py-2 px-2 font-medium text-brand-black">
                  {row.size}
                </td>
                <td className="py-2 px-2 text-gray-600">{row.eu}</td>
                <td className="py-2 px-2 text-gray-600">{row.us}</td>
                <td className="py-2 px-2 text-gray-600">{row.circumference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-3 italic">
        Astuce : Mesurez en fin de journee quand vos doigts sont legerement
        gonfles pour un ajustement optimal.
      </p>
    </div>
  );
}

function NecklaceSizeGuide() {
  return (
    <div>
      {/* Visual necklace length diagram */}
      <div className="bg-brand-cream/50 rounded-xl p-4 mb-5">
        <div className="flex justify-center">
          <svg
            width="160"
            height="140"
            viewBox="0 0 160 140"
            fill="none"
            className="text-brand-gold"
          >
            {/* Neck/chest silhouette */}
            <path
              d="M50 10 C50 10 60 0 80 0 C100 0 110 10 110 10 L120 30 L130 140 L30 140 L40 30 Z"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="1.5"
            />
            {/* 40cm - ras de cou */}
            <path
              d="M52 15 Q80 28 108 15"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <text x="135" y="20" fontSize="8" fill="currentColor" fontWeight="bold">
              40cm
            </text>
            {/* 45cm - princesse */}
            <path
              d="M48 22 Q80 45 112 22"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4,2"
            />
            <text x="135" y="36" fontSize="8" fill="currentColor" fontWeight="bold">
              45cm
            </text>
            {/* 50cm - matinee */}
            <path
              d="M44 30 Q80 65 116 30"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6,3"
            />
            <text x="135" y="52" fontSize="8" fill="currentColor" fontWeight="bold">
              50cm
            </text>
            {/* 55cm - opera */}
            <path
              d="M40 38 Q80 85 120 38"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8,4"
            />
            <text x="135" y="68" fontSize="8" fill="currentColor" fontWeight="bold">
              55cm
            </text>
          </svg>
        </div>
      </div>

      {/* Length table */}
      <div className="space-y-3">
        {necklaceData.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 p-3 rounded-lg ${
              i % 2 === 0 ? "bg-brand-cream/30" : ""
            }`}
          >
            <span className="font-display font-bold text-brand-gold text-lg w-14">
              {item.length}
            </span>
            <div>
              <p className="font-medium text-brand-black text-sm">
                {item.name}
              </p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-3 italic">
        Conseil : La longueur 45cm (Princesse) est la plus polyvalente et
        convient a la plupart des tenues.
      </p>
    </div>
  );
}

function BraceletSizeGuide() {
  return (
    <div>
      {/* Visual wrist measurement */}
      <div className="bg-brand-cream/50 rounded-xl p-4 mb-5">
        <div className="flex items-center gap-4">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            className="text-brand-gold flex-shrink-0"
          >
            {/* Wrist circle */}
            <circle
              cx="40"
              cy="40"
              r="30"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            {/* Bracelet */}
            <circle
              cx="40"
              cy="40"
              r="30"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray="12,4"
            />
            {/* Measurement arrow */}
            <line
              x1="10"
              y1="40"
              x2="70"
              y2="40"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
            <polygon points="12,37 8,40 12,43" fill="currentColor" />
            <polygon points="68,37 72,40 68,43" fill="currentColor" />
          </svg>
          <div>
            <h4 className="font-display font-bold text-brand-black text-sm mb-1">
              Comment mesurer ?
            </h4>
            <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
              <li>Mesurez votre poignet avec un metre souple</li>
              <li>Placez-le juste au-dessus de l&apos;os du poignet</li>
              <li>Notez la mesure en centimetres</li>
              <li>Ajoutez 1 cm pour le confort</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Size table */}
      <div className="space-y-3">
        {braceletData.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 p-3 rounded-lg ${
              i % 2 === 0 ? "bg-brand-cream/30" : ""
            }`}
          >
            <span className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center font-display font-bold text-brand-gold">
              {item.size}
            </span>
            <div>
              <p className="font-medium text-brand-black text-sm">
                Tour de poignet : {item.wrist}
              </p>
              <p className="text-xs text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-3 italic">
        Astuce : Si vous hesitez entre deux tailles, choisissez la plus grande
        pour plus de confort.
      </p>
    </div>
  );
}
