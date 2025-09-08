import React from 'react';
import { 
  Clock, 
  Coffee, 
  Utensils, 
  MapPin, 
  Music, 
  Drama, 
  Camera, 
  Spotlight, 
  Crown, 
  Gift,
  Calendar,
  PartyPopper 
} from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const Schedule = () => {
  const scheduleData = [
    {
      time: 'After Breakfast',
      category: 'Morning Activity',
      title: 'TREASURE HUNT',
      icon: MapPin,
      color: '#10b981', // emerald-500
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    {
      time: 'After Lunch',
      category: 'Performance Preparation',
      title: 'DANCE PROGRAMMES',
      icon: Music,
      color: '#f59e0b', // amber-500
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    {
      time: 'After Lunch',
      category: 'Theatre',
      title: 'DRAMA',
      icon: Drama,
      color: '#8b5cf6', // violet-500
      bgColor: 'rgba(139, 92, 246, 0.1)'
    },
    {
      time: 'After Lunch',
      category: 'Performance',
      title: 'STAND UP',
      icon: Spotlight,
      color: '#ef4444', // red-500
      bgColor: 'rgba(239, 68, 68, 0.1)'
    },
    {
      time: 'After Lunch',
      category: 'Photography',
      title: 'BRANCH WISE PHOTOGRAPH',
      icon: Camera,
      color: '#06b6d4', // cyan-500
      bgColor: 'rgba(6, 182, 212, 0.1)'
    },
    {
      time: 'After Lunch',
      category: 'Entertainment',
      title: 'SPOTLIGHT EVENTS',
      icon: Spotlight,
      color: '#f97316', // orange-500
      bgColor: 'rgba(249, 115, 22, 0.1)'
    },
    {
      time: 'After Dinner',
      category: 'Main Event',
      title: 'RHAPSODY CONCERT',
      icon: Music,
      color: '#ec4899', // pink-500
      bgColor: 'rgba(236, 72, 153, 0.1)'
    },
    {
      time: 'After Lunch',
      category: 'Competition',
      title: 'MR AND MRS FRESHIE',
      icon: Crown,
      color: '#eab308', // yellow-500
      bgColor: 'rgba(234, 179, 8, 0.1)'
    },
    {
      time: 'After Lunch',
      category: 'Celebration',
      title: 'RETURN GIFT DISTRIBUTION',
      icon: Gift,
      color: '#84cc16', // lime-500
      bgColor: 'rgba(132, 204, 22, 0.1)'
    },
    {
      time: 'After Dinner',
      category: 'Party Time',
      title: 'DJ NIGHT',
      icon: PartyPopper,
      color: '#a855f7', // purple-500
      bgColor: 'rgba(168, 85, 247, 0.1)'
    }
  ];

  const timeCategories = {
    'After Breakfast': {
      title: 'AFTER BREAKFAST',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      icon: Coffee
    },
    'After Lunch': {
      title: 'AFTER LUNCH',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      icon: Utensils
    },
    'After Dinner': {
      title: 'AFTER DINNER',
      color: '#8b5cf6',
      bgColor: 'rgba(139, 92, 246, 0.1)',
      icon: PartyPopper
    }
  };

  const groupedSchedule = scheduleData.reduce((acc, event) => {
    if (!acc[event.time]) {
      acc[event.time] = [];
    }
    acc[event.time].push(event);
    return acc;
  }, {});

  const CustomTimelineItem = ({ event, isLast = false, index }) => {
    const EventIcon = event.icon;
    
    return (
      <Motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative flex items-start space-x-3 sm:space-x-4 pb-6 sm:pb-8"
      >
        {/* Timeline Line */}
        {!isLast && (
          <div className="absolute left-4 sm:left-6 top-10 sm:top-12 w-0.5 h-full bg-slate-600"></div>
        )}
        
        {/* Icon */}
        <div
          className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full shadow-lg flex-shrink-0"
          style={{ backgroundColor: event.color }}
        >
          <EventIcon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div
            className="card p-3 sm:p-6 ml-0 border-l-2 sm:border-l-4 hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-300"
            style={{ 
              borderLeftColor: event.color,
              backgroundColor: event.bgColor 
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3">
              <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-2 sm:mb-0">
                {event.title}
              </h3>
              <span
                className="self-start sm:self-auto px-2 sm:px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide"
                style={{ 
                  backgroundColor: event.color + '20',
                  color: event.color 
                }}
              >
                {event.category}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Clock className="h-3 w-3" />
              <span>{event.time}</span>
            </div>
          </div>
        </div>
      </Motion.div>
    );
  };

  const TimeSlotHeader = ({ categoryInfo, index }) => {
    const CategoryIcon = categoryInfo.icon;
    
    return (
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
        className="relative flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8"
      >
        {/* Timeline Line for Header */}
        <div className="absolute left-4 sm:left-6 top-10 sm:top-12 w-0.5 h-6 sm:h-8 bg-slate-600"></div>
        
        {/* Header Icon */}
        <div
          className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full shadow-xl border-2 sm:border-4 border-slate-800 flex-shrink-0"
          style={{ backgroundColor: categoryInfo.color }}
        >
          <CategoryIcon className="h-4 w-4 sm:h-7 sm:w-7 text-white" />
        </div>

        {/* Header Content */}
        <div className="flex-1 min-w-0">
          <div
            className="card p-3 sm:p-4 border-2"
            style={{ 
              borderColor: categoryInfo.color,
              backgroundColor: categoryInfo.bgColor 
            }}
          >
            <h2
              className="text-lg sm:text-2xl font-bold tracking-wide"
              style={{ color: categoryInfo.color }}
            >
              {categoryInfo.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Multiple events scheduled during this time
            </p>
          </div>
        </div>
      </Motion.div>
    );
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24 px-3 sm:px-4 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-3 sm:mb-4">
            Freshers Party Schedule
          </h1>
          <p className="text-slate-300 text-base sm:text-lg px-2">
            Your complete guide to IIT Dharwad Freshers' 2025 events
          </p>
          <div className="flex items-center justify-center space-x-2 mt-3 sm:mt-4 text-xs sm:text-sm text-slate-400">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>December 15, 2025 • Full Day Event</span>
          </div>
        </Motion.div>

        {/* Custom Timeline */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          {Object.entries(groupedSchedule).map(([timeSlot, events], timeIndex) => {
            const categoryInfo = timeCategories[timeSlot];
            let eventIndex = 0;

            return (
              <div key={timeSlot} className="mb-8 sm:mb-12">
                {/* Time Slot Header */}
                <TimeSlotHeader 
                  categoryInfo={categoryInfo} 
                  index={timeIndex} 
                />

                {/* Events for this time slot */}
                <div className="ml-2 sm:ml-4">
                  {events.map((event, idx) => {
                    const isLast = timeIndex === Object.keys(groupedSchedule).length - 1 && idx === events.length - 1;
                    return (
                      <CustomTimelineItem
                        key={`${timeSlot}-${idx}`}
                        event={event}
                        isLast={isLast}
                        index={eventIndex++}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Final Timeline Element */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="relative flex items-center justify-center"
          >
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-xl">
              <PartyPopper className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div className="ml-3 sm:ml-4">
              <span className="text-base sm:text-lg font-bold gradient-text">
                End of Celebrations! 🎉
              </span>
            </div>
          </Motion.div>
        </Motion.div>

        {/* Footer Info */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 sm:mt-12 card text-center"
        >
          <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-3 sm:mb-4">
            Important Notes
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-sm text-slate-400">
            <div className="p-3 sm:p-4 bg-slate-800/50 rounded-lg">
              <h4 className="font-medium text-slate-300 mb-2">📍 Venue</h4>
              <p className="text-xs sm:text-sm">Main Auditorium, IIT Dharwad Campus</p>
            </div>
            <div className="p-3 sm:p-4 bg-slate-800/50 rounded-lg">
              <h4 className="font-medium text-slate-300 mb-2">🎯 Participation</h4>
              <p className="text-xs sm:text-sm">All events are open for freshers. Join the ones you're interested in!</p>
            </div>
            <div className="p-3 sm:p-4 bg-slate-800/50 rounded-lg sm:col-span-2 md:col-span-1">
              <h4 className="font-medium text-slate-300 mb-2">📞 Contact</h4>
              <p className="text-xs sm:text-sm">For any queries, approach the organizing committee</p>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default Schedule;
