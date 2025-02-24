import { useState, useEffect } from 'react';
import { X, Calendar, Clock, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Event {
  category: string;
  name: string;
  dates: string;
  mode?: string;
  time?: string;
  mandatory?: string;
}

interface MobileEventCardProps {
  event: Event;
}

const events: Event[] = [
  { 
    category: "Bootcamps(Round 1)", 
    name: "Cohort 1 (Feb 25 - Mar 1)", 
    dates: "Feb 25 - Mar 1, 2025", 
    mode: "Online", 
    time: "6:30 PM - 8:30 PM", 
    mandatory: `🎓 Important Attendance Requirements:

• All team members must attend every day
• Sessions run daily during the assigned dates
• Be online 5 minutes before start time (6:30 PM)
• Ensure you have a stable internet connection
• Check your assigned dates in the member list and verify your startup name in the previously shared name list on WhatsApp.
• Mark your calendar for all dates

Please confirm your attendance by responding to the cohort coordinator.
For any scheduling conflicts, inform organizers immediately.`
  },
  { 
    category: "Bootcamps(Round 1)", 
    name: "Cohort 2 ", 
    dates: "To Be Announced", 
    mode: "Online", 
    time: "6:30 PM - 8:30 PM", 
    mandatory: `🎓 Important Attendance Requirements:

• All team members must attend every day
• Sessions run daily during the assigned dates
• Be online 5 minutes before start time (6:30 PM)
• Ensure you have a stable internet connection
• The list will be released soon
• Mark your calendar for all dates

Please confirm your attendance by responding to the cohort coordinator.
For any scheduling conflicts, inform organizers immediately.`
  },
  { 
    category: "Bootcamps(Round 1)", 
    name: "Cohort 3", 
    dates: "To Be Announced", 
    mode: "Online", 
    time: "6:30 PM - 8:30 PM", 
    mandatory: `🎓 Important Attendance Requirements:

• All team members must attend every day
• Sessions run daily during the assigned dates
• Be online 5 minutes before start time (6:30 PM)
• Ensure you have a stable internet connection
• The list will be released soon
• Mark your calendar for all dates

Please confirm your attendance by responding to the cohort coordinator.
For any scheduling conflicts, inform organizers immediately.`
  },
  { 
    category: "Important Announcement", 
    name: "Round 2 Details", 
    dates: "To Be Announced", 
    mode: "Online", 
    time: "Schedule Pending", 
    mandatory: `📢 Round 2 Information:

Details for Round 2 will be announced shortly. All participants of Round 1 should:

• Complete their assigned Round 1 sessions
• Stay tuned for Round 2 dates and schedule
• Watch for official communications about Round 2 format
• Prepare to participate in advanced activities

Further information about Round 2 will be shared through official channels.
Teams must successfully complete their Round 1 sessions to be eligible for Round 2.`
  },
  { category: "Pre-Finals", name: "Startup Cafe, GurusPitch, Pitch-X", dates: "April 28 - April 30, 2025" },
  { category: "Finals", name: "Startup Cafe", dates: "May 3 - May 4, 2025" },
  { category: "Finals", name: "Pitch-X", dates: "May 3 - May 4, 2025" },
  { category: "Finals", name: "GurusPitch", dates: "May 3 - May 4, 2025" },
  { category: "Finals", name: "Scholar Spinoff", dates: "May 3 - May 4, 2025" },
  { category: "Events", name: "Startup Mughavari", dates: "March 31, 2025" },
  { category: "Events", name: "Startup Atlas", dates: "March 31, 2025" },
  { category: "Events", name: "Intern Hunt", dates: "March 31, 2025" },
  { category: "Events", name: "Founder Find", dates: "March 31, 2025" }
];

// Rest of the component remains unchanged
const MobileEventCard = ({ event }: MobileEventCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-800">{event.name}</h3>
          <p className="text-sm text-purple-600">{event.category}</p>
        </div>
        {event.mode && (
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
            {event.mode}
          </span>
        )}
      </div>
      
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          {event.dates}
        </div>
        
        {event.time && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 flex-shrink-0" />
            {event.time}
          </div>
        )}
        
        {event.mandatory && (
          <div className="space-y-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center justify-between w-full text-sm text-red-600 bg-red-50 p-2 rounded"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{expanded ? 'Hide Details' : 'View Requirements'}</span>
              </div>
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expanded && (
              <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded whitespace-pre-wrap">
                {event.mandatory}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function AutoEventPopup() {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#7E22CE] text-white px-2 py-4 md:px-3 md:py-6 rounded-l-lg hover:bg-[#6B21A8] transition-all shadow-lg flex flex-col items-center gap-2"
        >
          <Calendar className="w-5 h-5 md:w-6 md:h-6" />
          <span className="hidden md:block [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180 text-xs md:text-sm font-medium">
            View Schedule
          </span>
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 transition-opacity duration-300"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl relative overflow-hidden transform transition-transform duration-300">
            <div className="bg-[#7E22CE] p-4 text-white sticky top-0 z-10">
              <h2 className="text-lg sm:text-xl font-semibold text-center">Event Schedule</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-[#6B21A8] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[80vh] overflow-y-auto p-4">
              {/* Mobile View */}
              <div className="sm:hidden space-y-4">
                {events.map((event, index) => (
                  <MobileEventCard key={index} event={event} />
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden sm:block">
                <table className="w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="py-2 px-3 text-sm text-left text-gray-600">Event</th>
                      <th className="py-2 px-3 text-sm text-left text-gray-600">Date(s)</th>
                      <th className="py-2 px-3 text-sm text-left text-gray-600">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {events.map((event, index) => (
                      <tr
                        key={index}
                        className="hover:bg-purple-50 group transition-colors duration-200"
                      >
                        <td className="py-2 px-3">
                          <p className="font-medium text-gray-800">{event.name}</p>
                          <p className="text-sm text-gray-500">{event.category}</p>
                          {event.mode && (
                            <p className="text-xs text-purple-600 mt-1">{event.mode}</p>
                          )}
                        </td>
                        <td className="py-2 px-3">
                          <div className="text-gray-600 text-sm">
                            {event.dates}
                          </div>
                        </td>
                        <td className="py-2 px-3">
                          {event.time && (
                            <div className="flex items-center gap-1 text-gray-600 text-sm mb-1">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </div>
                          )}
                          {event.mandatory && (
                            <div className="text-sm">
                              <div className="flex items-center gap-1 text-red-600 mb-2">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>Requirements:</span>
                              </div>
                              <div className="bg-gray-50 p-3 rounded whitespace-pre-wrap text-gray-700">
                                {event.mandatory}
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}