import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClientReviewItem } from '../types';

interface ReviewsContextType {
  reviews: ClientReviewItem[];
  addMilestoneReview: (review: Omit<ClientReviewItem, 'id' | 'createdAt' | 'verified'>) => void;
  averageRating: number;
  totalReviews: number;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

const INITIAL_REVIEWS: ClientReviewItem[] = [
  {
    id: 'rev-1',
    clientName: 'Rajesh Sharma',
    projectName: 'Greenwood Heights 3BHK',
    milestoneReviewed: '01. Substrate Prep & Dustless Sanding',
    rating: 5,
    title: 'Zero plaster dust and 100% precision testing',
    comment: 'The Festool mechanized sanders made an unbelievable difference. We stayed in the adjacent room without smelling fumes or seeing fine chalk dust. The digital moisture reading was recorded right in front of us.',
    location: 'Sarjapur, Bengaluru',
    createdAt: '3 days ago',
    verified: true,
    aspects: { craftsmanship: 5, punctuality: 5, cleanliness: 5 },
  },
  {
    id: 'rev-2',
    clientName: 'Vikram & Ananya Sen',
    projectName: 'The Solarium Penthouse',
    milestoneReviewed: '03. Italian Stucco Living Elevation',
    rating: 5,
    title: 'The hand-burnished Champagne Dune wall looks like living stone',
    comment: 'Artisan Mohammed applied three separate trowel layers with gold mica flakes. When the indirect 2700K cove light turns on at dusk, the entire living room glows with European museum grandeur.',
    location: 'Indiranagar 100ft Rd',
    createdAt: '1 week ago',
    verified: true,
    aspects: { craftsmanship: 5, punctuality: 5, cleanliness: 5 },
  },
  {
    id: 'rev-3',
    clientName: 'Dr. Meera Nambiar',
    projectName: 'Imperial Verde Wall Studio',
    milestoneReviewed: '02. False Ceiling Framing & Magnetic Tracks',
    rating: 5,
    title: 'Laser alignment on magnetic tracks is flawless',
    comment: 'No light bleed, no uneven shadows along the perimeter. The architectural cove detail makes the 10-foot ceilings appear monolithic. TruPaintz delivered exactly as promised.',
    location: 'Lavelle Road',
    createdAt: '2 weeks ago',
    verified: true,
    aspects: { craftsmanship: 5, punctuality: 4, cleanliness: 5 },
  },
  {
    id: 'rev-4',
    clientName: 'Rohit Kulkarni',
    projectName: 'Graphite & Calacatta Modular Kitchen',
    milestoneReviewed: '04. Modular Joinery & Custom Wood Flutes',
    rating: 5,
    title: 'Blum servo mechanisms and anti-fingerprint acrylic are immaculate',
    comment: 'The factory-cut finish on the cabinetry shutters is razor sharp. The site installation team wrapped up two days ahead of schedule with zero damage to the Calacatta quartz.',
    location: 'Whitefield Boulevard',
    createdAt: '3 weeks ago',
    verified: true,
    aspects: { craftsmanship: 5, punctuality: 5, cleanliness: 5 },
  },
];

export const ReviewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<ClientReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('trupaintz_client_reviews');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('trupaintz_client_reviews', JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  const addMilestoneReview = (reviewData: Omit<ClientReviewItem, 'id' | 'createdAt' | 'verified'>) => {
    const newReview: ClientReviewItem = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      createdAt: 'Just now',
      verified: true,
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const totalReviews = reviews.length;
  const averageRating = reviews.length > 0
    ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2))
    : 5.0;

  return (
    <ReviewsContext.Provider value={{ reviews, addMilestoneReview, averageRating, totalReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) throw new Error('useReviews must be used within ReviewsProvider');
  return context;
};
