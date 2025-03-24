import { Calendar, Clock } from "@phosphor-icons/react";
import { AlertTriangle } from "lucide-react";

interface Event {
  category: string;
  name: string;
  dates: string;
  mode?: string;
  time?: string;
  mandatory?: string;
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
    name: "Cohort 2 (Mar 7 - Mar 11, 2025)", 
    dates: "Mar 7 - Mar 11, 2025", 
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
    name: "Cohort 3,4 (Mar 19 - Mar 24, 2025)", 
    dates: "Mar 19 - Mar 24, 2025", 
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
    name: "Cohort 5 (Mar 24 - Mar 28, 2025)", 
    dates: "Mar 24 - Mar 28, 2025", 
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
    name: "Cohort 6 (Mar 25 - Mar 29, 2025)", 
    dates: "Mar 25 - Mar 29, 2025", 
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
    name: "Cohort 7", 
    dates: "To Be Announced", 
    mode: "Online", 
    time: "Schedule Pending", 
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
  { category: "Events", name: "Startup Mughavari", dates: "To Be Announced"},
  { category: "Events", name: "Startup Atlas", dates: "To Be Announced" },
  { category: "Events", name: "Intern Hunt", dates: "To Be Announced" },
  { category: "Events", name: "Founder Find", dates: "To Be Announced" },
  { category: "Pre-Finals", name: "Startup Cafe, GurusPitch, Pitch-X", dates: "April 28 - April 30, 2025" },
  { category: "Finals", name: "Startup Cafe", dates: "May 3 - May 4, 2025",mandatory: "📢 Place: CBE, Venue: To Be Announced" },
  { category: "Finals", name: "Pitch-X", dates: "May 3 - May 4, 2025",mandatory: "📢 Place: CBE, Venue: To Be Announced" },
  { category: "Finals", name: "GurusPitch", dates: "May 3 - May 4, 2025",mandatory: "📢 Place: CBE, Venue: To Be Announced" },
  { category: "Finals", name: "Scholar Spinoff", dates: "May 3 - May 4, 2025",mandatory: "📢 Place: CBE, Venue: To Be Announced" }
];
export default function EventSchedule() {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-[#7E22CE] rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold text-center mb-4">Event Schedule</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white text-black border border-gray-300 text-sm rounded-lg shadow-md">
          <thead>
            <tr className="bg-[#7E22CE] text-white text-left">
              <th className="border px-3 py-2">Category</th>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Dates</th>
              <th className="border px-3 py-2">Mode</th>
              <th className="border px-3 py-2">Time</th>
              <th className="border px-3 py-2">Mandatory</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr
                key={index}
                className="text-center border even:bg-gray-100 hover:bg-gray-300 transition-all duration-300"
              >
                <td className="border px-3 py-2 flex items-center justify-center gap-2 text-indigo-600 font-medium">
                  <Calendar size={18} weight="bold" className="text-blue-600" /> {event.category}
                </td>
                <td className="border px-3 py-2 font-semibold">{event.name}</td>
                <td className="border px-3 py-2 flex items-center justify-center gap-2 text-green-600 font-medium">
                  <Clock size={18} weight="bold" className="text-green-600" /> {event.dates}
                </td>
                <td className="border px-3 py-2 font-semibold text-purple-600">{event.mode}</td>
                <td className="border px-3 py-2 font-semibold text-red-600">{event.time}</td>
                <td className="border px-3 py-2 text-left whitespace-pre-wrap bg-red-50 p-2 rounded-lg relative">
                  <div className="max-h-20 overflow-y-auto pr-2 flex items-start gap-2">
                  <AlertTriangle size={18} className="text-red-600 mt-1" />
                    <span>{event.mandatory}</span>
                  </div>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
