import React, { createContext, useContext, useState, useEffect } from 'react';
import { NotificationItem, BookingSubmission } from '../types';

interface EmailPreviewData {
  recipientName: string;
  recipientEmail: string;
  subject: string;
  previewText: string;
  details: Record<string, string | number>;
  sentAt: string;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (title: string, message: string, type?: NotificationItem['type']) => void;
  pushEnabled: boolean;
  requestPushPermission: () => Promise<boolean>;
  activeEmailModal: EmailPreviewData | null;
  openEmailModal: (email: EmailPreviewData) => void;
  closeEmailModal: () => void;
  triggerBookingConfirmation: (booking: BookingSubmission) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Site Progress Milestone Updated',
    message: 'Surface prep & dustless sanding completed at Greenwood Villa (7.4% moisture verified).',
    timestamp: '15 mins ago',
    read: false,
    type: 'project',
  },
  {
    id: 'notif-2',
    title: 'Architectural Swatch Approved',
    message: 'Client approved Champagne Dune Italian Stucco for Living Room focal elevation.',
    timestamp: '2 hours ago',
    read: false,
    type: 'project',
  },
  {
    id: 'notif-3',
    title: 'Automated Estimate Dispatched',
    message: 'Instant quotation summary generated and emailed to your registered address.',
    timestamp: '1 day ago',
    read: true,
    type: 'email',
  },
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('trupaintz_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_NOTIFICATIONS;
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [pushEnabled, setPushEnabled] = useState<boolean>(() => {
    return localStorage.getItem('trupaintz_push_enabled') === 'true';
  });

  const [activeEmailModal, setActiveEmailModal] = useState<EmailPreviewData | null>(null);

  useEffect(() => {
    localStorage.setItem('trupaintz_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('trupaintz_push_enabled', String(pushEnabled));
  }, [pushEnabled]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (title: string, message: string, type: NotificationItem['type'] = 'system') => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      read: false,
      type,
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Send native browser notification if granted
    if (pushEnabled && typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body: message,
          icon: '/favicon.ico',
        });
      } catch {
        // Fallback gracefully
      }
    }
  };

  const requestPushPermission = async (): Promise<boolean> => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setPushEnabled(true);
          addNotification('Push Notifications Active', 'You will receive real-time site milestones and designer updates.', 'system');
          return true;
        }
      } catch {
        // Fallback for sandboxes where Notification.requestPermission is restricted
      }
    }
    // Simulation fallback toggle
    setPushEnabled(true);
    addNotification('Push Notifications Enabled', 'Simulation active: You will receive real-time project alerts in this browser.', 'system');
    return true;
  };

  const openEmailModal = (data: EmailPreviewData) => {
    setActiveEmailModal(data);
  };

  const closeEmailModal = () => {
    setActiveEmailModal(null);
  };

  const triggerBookingConfirmation = (booking: BookingSubmission) => {
    // 1. Add notification
    addNotification(
      'Site Consultation Scheduled',
      `Visit confirmed for ${booking.preferredDate} (${booking.preferredTime}) at ${booking.address}. Reference #${booking.id.slice(-6).toUpperCase()}`,
      'booking'
    );

    // 2. Open rich simulated automated email
    openEmailModal({
      recipientName: booking.fullName,
      recipientEmail: booking.email,
      subject: `[Confirmed] Site Visit & Estimation Appointment – TruPaintz & Interiors (#${booking.id.slice(-6).toUpperCase()})`,
      previewText: `Your interior design consultation and digital site inspection has been confirmed with our Senior Project Architect.`,
      details: {
        'Booking Reference': `#${booking.id.slice(-6).toUpperCase()}`,
        'Property Type': booking.propertyType,
        'Scope of Work': booking.serviceRequired,
        'Estimated Budget': `₹${booking.estimatedBudget.toLocaleString('en-IN')}`,
        'Approximate Area': `${booking.approxSqFt} sq. ft.`,
        'Scheduled Date': booking.preferredDate,
        'Time Slot': booking.preferredTime,
        'Inspection Site': booking.address,
        'Client Phone': booking.phone,
        'Assigned Lead': 'Arun Kumar (Site Architect)',
      },
      sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
        pushEnabled,
        requestPushPermission,
        activeEmailModal,
        openEmailModal,
        closeEmailModal,
        triggerBookingConfirmation,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
};
