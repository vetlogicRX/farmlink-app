import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { Dashboard } from './pages/Dashboard';
import { PricingPage } from './pages/PricingPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ResourcesPage } from './pages/ResourcesPage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';
import { TractorPage } from './pages/TractorPage';
import { Footer } from './components/Footer';
import { AiHelpWidget } from './components/AiHelpWidget';

export default function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState({ tier: 'free', name: 'Guest User' });

  const navigateTo = (newPage) => {
      setPage(newPage);
      window.scrollTo(0, 0);
  };
  
  const upgradeUser = (tier) => {
    setUser({ tier: tier, name: 'Premium User' });
    alert(`Congratulations! You've successfully upgraded to the ${tier} plan.`);
    navigateTo('dashboard');
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard user={user} navigateTo={navigateTo} />;
      case 'pricing':
        return <PricingPage navigateTo={navigateTo} upgradeUser={upgradeUser} />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'resources':
        return <ResourcesPage />;
      case 'stories':
        return <SuccessStoriesPage />;
      case 'tractor-page':
        return <TractorPage user={user} navigateTo={navigateTo} />;
      case 'home':
      default:
        return <HomePage user={user} navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Navbar user={user} navigateTo={navigateTo} />
      {renderPage()}
      <Footer />
      <AiHelpWidget />
    </div>
  );
}
