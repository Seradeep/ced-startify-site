import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';

const events = [
  { category: 'Bootcamps', name: 'Bootcamp 1', dates: 'March 4, 5, 6', eventsHeld: 'Startup Cafe, Pitch-X, Guru\'s Pitch' },
  { category: 'Bootcamps', name: 'Bootcamp 2', dates: 'March 18, 19, 20', eventsHeld: 'Startup Cafe, Pitch-X, Guru\'s Pitch' },
  { category: 'Pre-Finals', name: 'Startup Cafe, GurusPitch, Pitch-X', dates: 'April 28, 29, 30' },
  { category: 'Finals', name: 'Startup Cafe', dates: 'May 3, 4' },
  { category: 'Finals', name: 'Pitch-X', dates: 'May 3, 4' },
  { category: 'Finals', name: 'GurusPitch', dates: 'May 3, 4' },
  { category: 'Finals', name: 'Scholar Spinoff', dates: 'May 3, 4' },
  { category: 'March Last Week Events', name: 'Startup Mughavari', dates: 'March Last Week' },
  { category: 'March Last Week Events', name: 'Startup Path Finder', dates: 'March Last Week' },
  { category: 'March Last Week Events', name: 'Intern Hunt', dates: 'March Last Week' },
  { category: 'March Last Week Events', name: 'Founder Find', dates: 'March Last Week' }
];

export default function AutoEventPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      {/* Fixed Button on Right Side */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-[#7E22CE] text-white px-2 py-4 md:px-3 md:py-6 rounded-l-lg hover:bg-[#6B21A8] transition-all shadow-lg flex flex-col items-center gap-2"
          whileHover={{ x: -5 }}
          initial={{ x: 0 }}
        >
          <Calendar className="w-5 h-5 md:w-6 md:h-6" />
          <span className="writing-mode-vertical text-xs md:text-sm font-medium hidden md:block">View Schedule</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg w-full max-w-2xl relative overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.3 }}
            >
              {/* Header */}
              <div className="bg-[#7E22CE] p-4 text-white">
                <h2 className="text-xl font-semibold text-center">Event Schedule</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 p-1 rounded-full hover:bg-[#6B21A8] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Table Container */}
              <div className="max-h-96 overflow-y-auto p-4">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="py-2 px-3 text-sm text-left text-gray-600">Event</th>
                      <th className="py-2 px-3 text-sm text-left text-gray-600">Date(s)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {events.map((event, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="hover:bg-purple-50 cursor-pointer group"
                      >
                        <td className="py-2 px-3">
                          <p className="font-medium text-gray-800">{event.name}</p>
                          <p className="text-sm text-gray-500">{event.category}</p>
                          {event.eventsHeld && (
                            <p className="text-xs text-purple-600 mt-1">Events: {event.eventsHeld}</p>
                          )}
                        </td>
                        <td className="py-2 px-3">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="text-gray-600 text-sm"
                          >
                            {event.dates}
                          </motion.div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </>
  );
}