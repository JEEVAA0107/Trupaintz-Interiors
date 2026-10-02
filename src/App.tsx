import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ReviewsProvider } from './context/ReviewsContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectCarousel } from './components/ProjectCarousel';
import { RoomVisualizer3D } from './components/RoomVisualizer3D';
import { ServicesBento } from './components/ServicesBento';
import { MilestoneReviewsShowcase } from './components/MilestoneReviewsShowcase';
import { CostEstimatorBooking } from './components/CostEstimatorBooking';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { ProjectManagerDashboard } from './components/ProjectManagerDashboard';
import { ClientPortal } from './components/ClientPortal';
import { LiveChatConcierge } from './components/LiveChatConcierge';
import { AuthModal } from './components/AuthModal';
import { EmailModal } from './components/EmailModal';
import { Footer } from './components/Footer';

function MainContent() {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<'home' | 'portal' | 'dashboard'>('home');
  const [selectedServiceForEstimator, setSelectedServiceForEstimator] = useState<string>('Italian Stucco + Premium Painting');

  const scrollTo = (id: string) => {
    setActiveView('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForEstimator(serviceName);
    scrollTo('estimator');
  };

  const handleSelectPaletteForEstimate = (swatchName: string) => {
    setSelectedServiceForEstimator(`Italian Stucco (${swatchName})`);
    scrollTo('estimator');
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 transition-colors duration-200 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Top Bar Contract Navigation */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenBooking={() => scrollTo('estimator')}
      />

      <main className="flex-1">
        {activeView === 'dashboard' ? (
          <ProjectManagerDashboard onBackToHome={() => setActiveView('home')} />
        ) : activeView === 'portal' ? (
          <ClientPortal onBackToHome={() => setActiveView('home')} />
        ) : (
          <>
            {/* Hero with 3D Tilt & Instagram Trust */}
            <Hero
              onExploreProjects={() => scrollTo('portfolio')}
              onOpenBooking={() => scrollTo('estimator')}
              onOpenVisualizer={() => scrollTo('visualizer')}
            />


            {/* Interactive 3D Project Carousel */}
            <ProjectCarousel
              onSelectProjectForConsultation={(title) => {
                setSelectedServiceForEstimator(`Project Consultation (${title})`);
                scrollTo('estimator');
              }}
            />

            {/* Interactive 3D Material & Room Studio */}
            <RoomVisualizer3D onSelectPaletteForEstimate={handleSelectPaletteForEstimate} />

            {/* Bento Grid Services */}
            <ServicesBento onSelectService={handleSelectService} />

            {/* Verified Milestone Reviews & Client Testimonials */}
            <MilestoneReviewsShowcase onOpenClientPortal={() => setActiveView('portal')} />

            {/* Interactive Cost Estimator & Site Visit Booking */}
            <CostEstimatorBooking initialService={selectedServiceForEstimator} />

            {/* Design Journal & Renovation Tips */}
            <BlogSection />

            {/* Contact Inquiry Section */}
            <ContactSection />
          </>
        )}
      </main>

      {/* Editorial Footer */}
      <Footer onScrollTo={scrollTo} onOpenBooking={() => scrollTo('estimator')} />

      {/* Floating Real-time Live Chat Concierge */}
      <LiveChatConcierge onNavigateToBooking={() => scrollTo('estimator')} />

      {/* Modals */}
      <AuthModal />
      <EmailModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <ReviewsProvider>
            <MainContent />
          </ReviewsProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
