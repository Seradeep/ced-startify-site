import { useState } from 'react';
import { Bell, X, MessageCircle, Download, ChevronDown } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    className="w-6 h-6" 
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface Notification {
  id: number;
  name: string;
  action: string;
  post?: string;
  group?: string;
  time: string;
  unread: boolean;
  message?: string;
  expanded?: boolean;
  fullDetails?: string;
  downloadLink?: string;
}

const notificationsData: Notification[] = [
  { 
    id: 1, 
    name: "Important Update!", 
    action: "", 
    post: "Startup Cafe registration", 
    time: "10/03/2025", 
    unread: true,
    fullDetails: "The Startup Cafe registration deadline has been extended to April 30, 2025. Don't miss this opportunity to register!",
  },
  {
    id: 2,
    name: "Important Update!",
    action: "",
    post: "Email Confirmation Update & WhatsApp Group Invitation",
    time: "01/04/2025",
    unread: true,
    fullDetails: `From: Austartify Team <no-reply@austartify.com>
To: Dear Participants
Subject: Email Confirmation Update & WhatsApp Group Invitation
Date: 01/04/2025
------------------------
Dear Participants,
We have received your responses, and email confirmation messages are being sent out. Some of you have already received them, while others will receive them by the end of this week.
If you have joined our WhatsApp group and filled out the form, rest assured that your confirmation is on the way.
For those who have only filled out the form but haven't joined the WhatsApp group yet, please join using the link we will send shortly and complete the form by Friday to receive your confirmation message along with your Team ID.
------------------------
Best Regards,
Austartify Team
🌐 Website: www.austartify.com`
  },

];

function NotificationMenu({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const toggleNotificationDetails = (notification: Notification) => {
    if (selectedNotification?.id === notification.id) {
      setSelectedNotification(null);
    } else {
      setSelectedNotification(notification);
      setNotifications((prev) => 
        prev.map((n) => 
          n.id === notification.id ? { ...n, unread: false } : n
        )
      );
    }
  };

  const formatNotificationDetails = (details: string) => {
    return details.split('\n').map((line, index) => (
      <div key={index} className="whitespace-pre-wrap">
        {line}
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl z-60 flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h4 className="text-2xl font-bold text-black flex items-center">
            <MessageCircle className="mr-3 w-7 h-7 text-blue-600" />
            Notifications
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm ml-3">
              {notifications.filter((n) => n.unread).length}
            </span>
          </h4>
          <div className="flex items-center space-x-4">
            <button 
              onClick={markAllAsRead} 
              className="text-gray-600 hover:text-black transition"
            >
              Mark all as read
            </button>
            <button 
              onClick={onClose} 
              className="text-gray-600 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg cursor-pointer transition 
                ${notification.unread ? "bg-blue-50" : "bg-gray-50"}
                hover:shadow-md`}
              onClick={() => toggleNotificationDetails(notification)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-base font-semibold text-black">
                    {notification.name} {notification.action}
                    {notification.unread && (
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full ml-2"></span>
                    )}
                  </p>
                  {notification.post && (
                    <p className="text-blue-600 text-sm">{notification.post}</p>
                  )}
                  <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                </div>
                <ChevronDown className="text-gray-500 w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        {selectedNotification && (
          <div className="absolute inset-0 bg-white rounded-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h4 className="text-2xl font-bold text-black">
                Notification Details
              </h4>
              <button 
                onClick={() => setSelectedNotification(null)} 
                className="text-gray-600 hover:text-black"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-grow">
              <div className="mb-6">
                <p className="text-xl font-semibold text-black mb-2">
                  {selectedNotification.name} {selectedNotification.action}
                </p>
                {selectedNotification.post && (
                  <p className="text-blue-600 text-base mb-2">
                    Post: {selectedNotification.post}
                  </p>
                )}
                <p className="text-gray-500 mb-4">{selectedNotification.time}</p>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg whitespace-pre-line font-mono text-sm">
                {formatNotificationDetails(selectedNotification.fullDetails || '')}
              </div>

              {selectedNotification.downloadLink && (
                <button 
                  onClick={() => window.open(selectedNotification.downloadLink!, '_blank')}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center mt-4"
                >
                  <Download className="mr-3 w-5 h-5" />
                  Download Full Details
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function NotificationButton() {
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [unreadCount] = useState<number>(3);

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+919363300704', '_blank');
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-4">
      <div 
        className="relative bg-green-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-green-600 transition-all group"
        onClick={handleWhatsAppClick}
      >
        <WhatsAppIcon />
      </div>
      
      <div 
        className="relative bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-all group"
        onClick={toggleNotifications}
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 group-hover:animate-pulse">
            {unreadCount}
          </span>
        )}
      </div>

      {isNotificationOpen && (
        <NotificationMenu onClose={() => setIsNotificationOpen(false)} />
      )}
    </div>
  );
}
