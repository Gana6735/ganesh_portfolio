import { useEffect, useState } from 'react';
import { usePortfolio } from '@/hooks/usePortfolio';

export const useEngagement = () => {
  const [modalType, setModalType] = useState<'welcome' | 'cta' | null>(null);
  const { config, isLoaded } = usePortfolio();

  useEffect(() => {
    if (!isLoaded) return;

    const hasSeenWelcome = localStorage.getItem('seen_welcome');
    
    // Welcome Modal Timer
    const welcomeTimer = setTimeout(() => {
      if (!hasSeenWelcome) {
        setModalType('welcome');
        localStorage.setItem('seen_welcome', 'true');
      }
    }, (config.contact.welcome_modal_delay || 60) * 1000);

    // Recurring CTA
    const ctaInterval = setInterval(() => {
      setModalType('cta');
    }, (config.contact.recurring_cta_interval || 180) * 1000);

    return () => {
      clearTimeout(welcomeTimer);
      clearInterval(ctaInterval);
    };
  }, [isLoaded, config.contact.welcome_modal_delay, config.contact.recurring_cta_interval]);

  return { modalType, setModalType };
};
