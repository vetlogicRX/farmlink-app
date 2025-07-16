// src/pages/HomePage.js
import React, { useState } from 'react';
import { Link, Copy, Check } from 'lucide-react';
import { CustomQRCodeGenerator } from '../components/CustomQRCodeGenerator';
import { AdSenseAd } from '../components/AdSenseAd';

export const HomePage = ({ user, navigateTo }) => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [utmParams, setUtmParams] = useState({ source: '', medium: '', campaign: '' });
    const [showUtm, setShowUtm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copiedItem, setCopiedItem] = useState(null);

    const handleUtmChange = (e) => {
        setUtmParams({ ...utmParams, [e.target.name]: e.target.value });
    };

    const generateUrlWithUtm = () => {
        if (!longUrl) return '';
        try {
            const url = new URL(longUrl.startsWith('http') ? longUrl : `https://${longUrl}`);
            Object.keys(utmParams).forEach(key => {
                if (utmParams[key]) {
                    url.searchParams.set(`utm_${key}`, utmParams[key]);
                }
            });
            return url.toString();
        } catch (e) {
            return longUrl;
        }
    };

    const shortenUrl = async () => {
        setIsLoading(true);
        setError('');
        setShortUrl('');
        await new Promise(resolve => setTimeout(resolve, 1000));

        const finalUrl = generateUrlWithUtm();
        if (!finalUrl || !/^(https?:\/\/)/.test(finalUrl)) {
            setError('Please enter a valid URL (e.g., https://example.com)');
            setIsLoading(false);
            return;
        }
        try {
            const mockShortId = Math.random().toString(36).substring(2, 8);
            const newShortUrl = `https://tinyfarm.io/${mockShortId}`;
            setShortUrl(newShortUrl);
        } catch (e) {
            setError('Failed to shorten URL. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const copyToClipboard = (text, itemName) => {
        if (!text) return;
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setCopiedItem(itemName);
            setTimeout(() => setCopiedItem(null), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
        document.body.removeChild(textArea);
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-green-700">Powerful Links for Growing Communities</h1>
                <p className="text-lg text-gray-600 mt-2">Shorten URLs, create QR codes, and track your performance.</p>
            </header>

            <main className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-4">Create a Short Link</h2>
                    <div className="flex flex-col gap-4">
                        <input type="url" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} placeholder="Enter your long URL here..." className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none transition" />
                        
                        <button onClick={() => setShowUtm(!showUtm)} className="text-sm text-green-600 hover:underline text-left">
                            {showUtm ? 'Hide' : 'Add'} UTM Tracking Parameters
                        </button>

                        {showUtm && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-3 bg-gray-50 rounded-md border animate-fade-in">
                                <input name="source" value={utmParams.source} onChange={handleUtmChange} placeholder="Source (e.g. facebook)" className="p-2 border rounded-md text-sm" />
                                <input name="medium" value={utmParams.medium} onChange={handleUtmChange} placeholder="Medium (e.g. social)" className="p-2 border rounded-md text-sm" />
                                <input name="campaign" value={utmParams.campaign} onChange={handleUtmChange} placeholder="Campaign (e.g. summer_sale)" className="p-2 border rounded-md text-sm" />
                            </div>
                        )}
                        
                        <button onClick={shortenUrl} disabled={isLoading || !longUrl} className="bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-700 disabled:bg-green-300 transition-colors duration-300 flex items-center justify-center">
                            {isLoading ? <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : 'Shorten'}
                        </button>
                    </div>
                    {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}

                    {shortUrl && (
                        <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200 animate-fade-in">
                             <label className="block text-sm font-medium text-gray-700 mb-1">Your Shortened Link</label>
                             <div className="flex items-center gap-2">
                                 <Link className="text-green-600 h-5 w-5" />
                                 <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold text-lg hover:underline">{shortUrl}</a>
                                 <button onClick={() => copyToClipboard(shortUrl, 'url')} className="p-2 text-gray-500 hover:text-green-700 rounded-full hover:bg-gray-200 transition">
                                     {copiedItem === 'url' ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                                 </button>
                             </div>
                        </div>
                    )}
                </div>
                <CustomQRCodeGenerator user={user} navigateTo={navigateTo} defaultUrl={generateUrlWithUtm() || 'https://farmlink.io'} />
            </main>
            {user.tier === 'free' && <AdSenseAd unit="homepage-banner" />}
        </div>
    );
};

// ---

// src/pages/Dashboard.js
import React from 'react';
import { BarChart2, Download, Map } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { mockAnalyticsData, PIE_COLORS } from '../data';
import { StatCard } from '../components/StatCard';
import { ChartCard } from '../components/ChartCard';
import { TeamManager } from '../components/TeamManager';
import { AdSenseAd } from '../components/AdSenseAd';

export const Dashboard = ({ user, navigateTo }) => {
  if (user.tier === 'free') {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="max-w-md mx-auto bg-white p-10 rounded-lg shadow-lg">
          <BarChart2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Unlock Your Analytics Dashboard</h2>
          <p className="text-gray-600 mb-6">Upgrade to a Premium plan to track link performance, see who's clicking, and where they're coming from.</p>
          <button onClick={() => navigateTo('pricing')} className="bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-700 transition-all">
            View Premium Plans
          </button>
        </div>
        <AdSenseAd unit="dashboard-promo" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8 flex flex-wrap justify-between items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold">Performance Dashboard</h1>
            <p className="text-gray-600">Analytics for all your FarmLinks.</p>
        </div>
        <div className="flex gap-4">
            <button onClick={() => navigateTo('tractor-page')} className="bg-white border border-green-600 text-green-600 font-bold py-2 px-4 rounded-md hover:bg-green-50 transition-all">
                Manage Tractor Page
            </button>
            <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-all flex items-center gap-2">
                <Download size={18} /> Download Report
            </button>
        </div>
      </header>
      
      {user.tier === 'business' && <TeamManager />}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <StatCard title="Total Clicks" value={mockAnalyticsData.totalClicks.toLocaleString()} />
        <StatCard title="Top Country" value={mockAnalyticsData.clicksByCountry[0].name} />
        <StatCard title="Top Referrer" value={mockAnalyticsData.topReferrers[0].name} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <ChartCard title="Clicks Over Time" className="lg:col-span-3">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={mockAnalyticsData.clicksOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="clicks" barSize={20} fill="#4ade80" />
              <Line type="monotone" dataKey="clicks" stroke="#16a34a" />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Top Referrers" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={mockAnalyticsData.topReferrers} cx="50%" cy="50%" outerRadius={100} dataKey="value" nameKey="name" label>
                {mockAnalyticsData.topReferrers.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
         <ChartCard title="Global Click Heatmap" className="lg:col-span-5">
            <div className="text-center text-gray-500 p-8">
                <Map size={64} className="mx-auto mb-4" />
                <p>(Heatmap component would render here)</p>
                <p className="text-sm">This would be a world map showing click density by region.</p>
            </div>
        </ChartCard>
      </div>
    </div>
  );
};

// ---

// src/pages/PricingPage.js
import React from 'react';
import { Globe, Shuffle, Clock } from 'lucide-react';
import { PricingCard } from '../components/PricingCard';
import { PowerUpCard } from '../components/PowerUpCard';

export const PricingPage = ({ navigateTo, upgradeUser }) => {
  return (
    <div className="container mx-auto p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Choose Your Plan</h1>
        <p className="text-gray-600 mt-2">Start for free, or unlock powerful features with our Pro and Business plans.</p>
      </header>
      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
        <PricingCard 
            tier="Free" 
            price="$0" 
            features={['Unlimited Links', 'Standard QR Codes', '1,000 Clicks/mo', 'Community Support']} 
        />
        <PricingCard 
          tier="Pro" 
          price="$10" 
          isFeatured={true}
          features={['Everything in Free, plus:', 'Advanced Analytics Dashboard', 'Custom Branded QR Codes', 'Premium Tractor Page', '10,000 Clicks/mo', 'Email Support']}
          onSelect={() => upgradeUser('pro')}
        />
        <PricingCard 
          tier="Business" 
          price="$29" 
          features={['Everything in Pro, plus:', 'Team Collaboration (5 users)', 'API Access', '50,000 Clicks/mo', 'Dedicated Account Manager']}
          onSelect={() => upgradeUser('business')}
        />
      </div>
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold">Or Power-Up Your Links Individually</h2>
        <p className="text-gray-600 mt-2 mb-6">Need a specific feature for just one link? No subscription required.</p>
        <div className="flex justify-center gap-4 flex-wrap">
            <PowerUpCard icon={<Globe />} title="Geotargeting" price="$2" description="Redirect users based on their country." />
            <PowerUpCard icon={<Shuffle />} title="A/B Testing" price="$3" description="Split traffic between two URLs." />
            <PowerUpCard icon={<Clock />} title="Link Scheduling" price="$1" description="Activate & deactivate links automatically." />
        </div>
      </div>
    </div>
  );
};

// ---

// src/pages/MarketplacePage.js
import React from 'react';
import { marketplacePartners } from '../data';
import { MarketplaceCard } from '../components/MarketplaceCard';

export const MarketplacePage = () => (
    <div className="container mx-auto p-8">
        <header className="text-center mb-12">
            <h1 className="text-4xl font-bold">FarmLink Marketplace</h1>
            <p className="text-gray-600 mt-2">Connect with trusted partners and services to grow your venture.</p>
        </header>
        
        <div className="space-y-12">
            <div>
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-green-600 pb-2">E-Commerce & Website Platforms</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {marketplacePartners.ecommerce.map(partner => <MarketplaceCard key={partner.name} {...partner} />)}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-green-600 pb-2">Marketing & Design</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {marketplacePartners.marketing.map(partner => <MarketplaceCard key={partner.name} {...partner} />)}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-green-600 pb-2">Business & Finance</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {marketplacePartners.finance.map(partner => <MarketplaceCard key={partner.name} {...partner} />)}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-6 border-b-2 border-green-600 pb-2">Fundraising for NGOs</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {marketplacePartners.fundraising.map(partner => <MarketplaceCard key={partner.name} {...partner} />)}
                </div>
            </div>
        </div>
    </div>
);

// ---

// src/pages/ResourcesPage.js
import React from 'react';
import { Award, DollarSign, Briefcase } from 'lucide-react';
import { freeResources } from '../data';
import { ResourceCard } from '../components/ResourceCard';

export const ResourcesPage = () => (
    <div className="container mx-auto p-8">
        <header className="text-center mb-12">
            <h1 className="text-4xl font-bold">Free Resources</h1>
            <p className="text-gray-600 mt-2">A curated list of tools and information to help you succeed.</p>
        </header>

        <div className="space-y-12">
            <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Award className="text-green-700" /> Training & Certification</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {freeResources.training.map(resource => <ResourceCard key={resource.name} {...resource} />)}
                </div>
            </div>
             <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><DollarSign className="text-green-700" /> Grant Opportunities</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {freeResources.grants.map(resource => <ResourceCard key={resource.name} {...resource} />)}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Briefcase className="text-green-700" /> Business Registration & Mentorship</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {freeResources.business.map(resource => <ResourceCard key={resource.name} {...resource} />)}
                </div>
            </div>
        </div>
    </div>
);

// ---

// src/pages/SuccessStoriesPage.js
import React from 'react';
import { successStories } from '../data';

export const SuccessStoriesPage = () => (
    <div className="container mx-auto p-8">
        <header className="text-center mb-12">
            <h1 className="text-4xl font-bold">Success Stories</h1>
            <p className="text-gray-600 mt-2">See how others are using FarmLink to achieve their goals.</p>
        </header>
        <div className="max-w-4xl mx-auto space-y-12">
            {successStories.map(story => (
                <div key={story.id} className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
                    <div className="md:w-1/3">
                        <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 md:w-2/3">
                        <h2 className="text-2xl font-bold mb-2">{story.title}</h2>
                        <p className="text-gray-700 mb-4">{story.excerpt}</p>
                        <button className="font-bold text-green-600 hover:underline">Read Full Story</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// ---

// src/pages/TractorPage.js
import React from 'react';
import { Tractor } from 'lucide-react';

export const TractorPage = ({ user, navigateTo }) => {
    if (user.tier === 'free') {
        return (
            <div className="container mx-auto p-8 text-center">
                <div className="max-w-md mx-auto bg-white p-10 rounded-lg shadow-lg">
                    <Tractor className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Build Your Premium Tractor Page</h2>
                    <p className="text-gray-600 mb-6">Upgrade to a Pro plan to create a beautiful "link-in-bio" page to house all your important links in one place.</p>
                    <button onClick={() => navigateTo('pricing')} className="bg-green-600 text-white font-bold py-3 px-6 rounded-md hover:bg-green-700 transition-all">
                        View Premium Plans
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-gray-100 p-8">
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-xl p-6 text-center">
                <img src="https://placehold.co/150x150/a3e635/14532d?text=Logo" alt="Profile" className="w-24 h-24 rounded-full mx-auto -mt-16 border-4 border-white" />
                <h1 className="text-2xl font-bold mt-4">Sunny Meadow Farms</h1>
                <p className="text-gray-600 mt-1">Fresh, organic produce delivered to your door.</p>
                <div className="mt-6 space-y-4">
                    <a href="#" className="block bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">Our Online Store</a>
                    <a href="#" className="block bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">This Week's Recipes</a>
                    <a href="#" className="block bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">Follow us on Instagram</a>
                </div>
            </div>
        </div>
    );
};
