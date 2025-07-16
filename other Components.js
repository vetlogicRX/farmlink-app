// src/components/Footer.js
import React from 'react';

export const Footer = () => (
    <footer className="text-center p-8 mt-16 border-t border-gray-200">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} FarmLink. All Rights Reserved.</p>
    </footer>
);

// ---

// src/components/AiHelpWidget.js
import React, { useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';

export const AiHelpWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen && (
                <div className="bg-white w-80 h-96 rounded-lg shadow-xl flex flex-col animate-fade-in">
                    <div className="bg-green-600 text-white p-3 rounded-t-lg">
                        <h3 className="font-bold">FarmLink AI Support</h3>
                    </div>
                    <div className="flex-grow p-4 text-sm text-gray-600">
                        Welcome! How can I help you today?
                    </div>
                    <div className="p-2 border-t flex gap-2">
                        <input placeholder="Type your question..." className="flex-grow p-2 border rounded-md text-sm" />
                        <button className="bg-green-600 text-white p-2 rounded-md"><Send size={18} /></button>
                    </div>
                </div>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-transform hover:scale-110">
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>
        </div>
    );
};

// ---

// src/components/AdSenseAd.js
import React from 'react';

export const AdSenseAd = ({ unit }) => (
  <div className="my-8 p-4 bg-gray-200 border border-gray-300 rounded-md text-center text-gray-500">
    <p className="font-bold">Advertisement</p>
    <p className="text-sm">(This space is for a Google Ad)</p>
    <p className="text-xs mt-1">Ad Unit: {unit}</p>
  </div>
);

// ---

// src/components/ChartCard.js
import React from 'react';

export const ChartCard = ({ title, className, children }) => (
  <div className={`bg-white p-6 rounded-lg shadow ${className}`}>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    {children}
  </div>
);

// ---

// src/components/CustomQRCodeGenerator.js
import React, { useState } from 'react';
import { Palette, Upload, Star } from 'lucide-react';
import { QRCodeComponent } from './QRCodeComponent';

export const CustomQRCodeGenerator = ({ user, navigateTo, defaultUrl }) => {
    const [logo, setLogo] = useState(null);
    const [logoUrl, setLogoUrl] = useState('');
    const [mainColor, setMainColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");

    const handleUpgrade = () => navigateTo('pricing');
    
    const handleLogoUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setLogo(file);
            setLogoUrl(URL.createObjectURL(file));
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Palette size={24} /> Custom QR Code
                {user.tier === 'free' && <span className="text-xs bg-yellow-200 text-yellow-800 font-bold px-2 py-1 rounded-full">PRO</span>}
            </h2>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Main Color</label>
                    <input type="color" value={mainColor} onChange={(e) => setMainColor(e.target.value)} className="w-full h-10 p-1 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 p-1 border border-gray-300 rounded-md" />
                </div>
                <div className="col-span-2">
                    <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">Upload Logo</label>
                    <label htmlFor="file-upload" className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-green-500">
                        <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="text-sm text-gray-600">
                                {logo ? logo.name : 'Click to upload a file'}
                            </p>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleLogoUpload} accept="image/png, image/jpeg" />
                        </div>
                    </label>
                </div>
            </div>
            <div className="mt-6 text-center">
                <div className="p-3 bg-white rounded-md shadow-sm inline-block">
                    <QRCodeComponent value={defaultUrl} size={160} mainColor={mainColor} bgColor={bgColor} logoUrl={logoUrl} />
                </div>
            </div>
            {user.tier === 'free' && (
                <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                    <div className="flex">
                        <div className="flex-shrink-0"><Star className="h-5 w-5 text-yellow-400" /></div>
                        <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                                Custom QR Codes are a premium feature.
                                <button onClick={handleUpgrade} className="font-bold underline ml-2">Upgrade to Pro to download.</button>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ---

// src/components/MarketplaceCard.js
import React from 'react';
import { ExternalLink } from 'lucide-react';

export const MarketplaceCard = ({ name, logo, description, url }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col">
        <div className="flex items-center mb-4">
            <img 
                src={`https://logo.clearbit.com/${logo}`} 
                alt={`${name} logo`} 
                className="w-12 h-12 mr-4 object-contain"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/e2e8f0/e2e8f0?text=Logo'; }}
            />
            <h3 className="text-xl font-bold">{name}</h3>
        </div>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="w-full bg-gray-800 text-white font-bold py-2 rounded-md hover:bg-black transition-all text-center flex items-center justify-center gap-2">
            Visit Site <ExternalLink size={16} />
        </a>
    </div>
);

// ---

// src/components/PowerUpCard.js
import React from 'react';

export const PowerUpCard = ({ icon, title, price, description }) => (
    <div className="bg-white p-4 rounded-lg shadow-md border w-60 text-center">
        <div className="text-green-600 mx-auto w-fit mb-2">{icon}</div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{description}</p>
        <p className="font-bold text-lg">{price}<span className="font-normal text-sm">/link</span></p>
    </div>
);

// ---

// src/components/PricingCard.js
import React from 'react';
import { Check } from 'lucide-react';

export const PricingCard = ({ tier, price, features, isFeatured = false, onSelect }) => (
  <div className={`bg-white p-8 rounded-lg shadow-lg w-full border-t-4 ${isFeatured ? 'border-green-600 transform scale-105' : 'border-gray-200'}`}>
    <h2 className="text-2xl font-bold text-center">{tier}</h2>
    <p className="text-5xl font-bold text-center my-4">{price}<span className="text-lg font-normal">/mo</span></p>
    <ul className="space-y-3 my-8">
      {features.map((feat, i) => <li key={i} className="flex items-start gap-3"><Check className="text-green-500 h-5 w-5 flex-shrink-0 mt-1" /><span>{feat}</span></li>)}
    </ul>
    {onSelect && (
      <button onClick={onSelect} className="w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition-all">
        Get Started with {tier}
      </button>
    )}
  </div>
);

// ---

// src/components/QRCodeComponent.js
import React from 'react';

export const QRCodeComponent = ({ value, size = 128, mainColor = "#000000", bgColor = "#ffffff", logoUrl }) => {
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&color=${mainColor.substring(1)}&bgcolor=${bgColor.substring(1)}&qzone=1`;

    return (
        <div style={{ position: 'relative', width: size, height: size }}>
            <img 
                src={qrApiUrl} 
                alt="Generated QR Code" 
                width={size} 
                height={size} 
                style={{ borderRadius: '8px' }}
            />
            {logoUrl && (
                <img 
                    src={logoUrl} 
                    alt="Custom Logo" 
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: size * 0.25,
                        height: size * 0.25,
                        borderRadius: '4px',
                        backgroundColor: 'white',
                        padding: '2px',
                        boxShadow: '0 0 5px rgba(0,0,0,0.5)'
                    }}
                />
            )}
        </div>
    );
};

// ---

// src/components/ResourceCard.js
import React from 'react';
import { ExternalLink } from 'lucide-react';

export const ResourceCard = ({ name, description, url }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-green-600 font-bold hover:underline flex items-center gap-2">
            Go to Resource <ExternalLink size={16} />
        </a>
    </div>
);

// ---

// src/components/StatCard.js
import React from 'react';

export const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-gray-500 text-sm font-medium uppercase">{title}</h3>
    <p className="text-3xl font-bold text-green-700">{value}</p>
  </div>
);

// ---

// src/components/TeamManager.js
import React from 'react';
import { Briefcase } from 'lucide-react';

export const TeamManager = () => (
    <div className="bg-white p-4 rounded-lg shadow-md border mb-6">
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Briefcase size={20} /> Team Management</h3>
        <div className="flex gap-2">
            <input type="email" placeholder="invite.member@example.com" className="flex-grow p-2 border rounded-md text-sm" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">Invite</button>
        </div>
    </div>
);
