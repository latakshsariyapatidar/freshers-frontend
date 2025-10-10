import React from 'react';
import { 
  Coffee, 
  Utensils, 
  MapPin, 
  Music, 
  Mic, 
  Camera, 
  Spotlight, 
  Crown, 
  Gift,
  Calendar,
  PartyPopper,
  Trophy,
  Dumbbell,
  Heart,
  Users,
  Star,
  Award
} from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const Schedule = () => {
  const scheduleData = [
    // October 11th Morning
    {
      day: 'October 11th',
      category: 'Adventure',
      title: 'Treasure Hunt Event',
      description: 'After breakfast - Winners awarded with incentives',
      icon: MapPin,
      color: '#84cc16', // lime-500
      bgColor: 'rgba(132, 204, 22, 0.1)'
    },

    // October 11th Afternoon F600
    {
      day: 'October 11th',
      category: 'Performances',
      title: 'Dance Performances Block 1',
      description: 'Dance by Mayank & crew, Antish & crew, Drama by Harshit & crew, Suchi & crew, Juniors',
      icon: Music,
      color: '#ec4899', // pink-500
      bgColor: 'rgba(236, 72, 153, 0.1)'
    },
    {
      day: 'October 11th',
      category: 'Introduction',
      title: 'Introduction of Judges',
      description: 'Meet the panel of judges for the day',
      icon: Users,
      color: '#eab308', // yellow-500
      bgColor: 'rgba(234, 179, 8, 0.1)'
    },
    {
      day: 'October 11th',
      category: 'Interactive',
      title: 'Spotlight Events and Dares',
      description: 'Confident performers will have an advantage',
      icon: Spotlight,
      color: '#f97316', // orange-500
      bgColor: 'rgba(249, 115, 22, 0.1)'
    },
    {
      day: 'October 11th',
      category: 'Performances',
      title: 'Dance Performances Block 2',
      description: 'Kishore & crew, Dance Drama by Anant & crew, Juniors, Apratim & crew, Surya & crew',
      icon: Music,
      color: '#8b5cf6', // violet-500
      bgColor: 'rgba(139, 92, 246, 0.1)'
    },
    {
      day: 'October 11th',
      category: 'Main Competition',
      title: 'Mr and Miss Freshie Live Decision',
      description: 'The ultimate competition with live events and decision',
      icon: Crown,
      color: '#eab308', // yellow-500
      bgColor: 'rgba(234, 179, 8, 0.1)'
    },
    {
      day: 'October 11th',
      category: 'Photography',
      title: 'Branch Wise Photograph & Return Gifts',
      description: 'Group photos and distribution of return gifts with refreshments',
      icon: Camera,
      color: '#06b6d4', // cyan-500
      bgColor: 'rgba(6, 182, 212, 0.1)'
    },

    // October 11th Evening
    {
      day: 'October 11th',
      category: 'Concert',
      title: 'Concert by Rhapsody',
      description: 'Live musical concert performance',
      icon: Star,
      color: '#ec4899', // pink-500
      bgColor: 'rgba(236, 72, 153, 0.1)'
    },
    {
      day: 'October 11th',
      category: 'Grand Finale',
      title: 'DJ Night Concluded',
      description: 'End the celebrations with an epic DJ night',
      icon: PartyPopper,
      color: '#a855f7', // purple-500
      bgColor: 'rgba(168, 85, 247, 0.1)'
    }
  ];

  const dayCategories = {
    'October 10th': {
      title: 'OCTOBER 10TH',
      subtitle: 'Opening Night Events',
      color: '#ec4899',
      bgColor: 'rgba(236, 72, 153, 0.1)',
      icon: PartyPopper
    },
    'October 11th': {
      title: 'OCTOBER 11TH',
      subtitle: 'Main Event Day',
      color: '#eab308',
      bgColor: 'rgba(234, 179, 8, 0.1)',
      icon: Trophy
    }
  };

  const groupedSchedule = scheduleData.reduce((acc, event) => {
    if (!acc[event.day]) {
      acc[event.day] = [];
    }
    acc[event.day].push(event);
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
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-2">
                  {event.title}
                </h3>
                {event.description && (
                  <p className="text-sm text-slate-300 mb-3">
                    {event.description}
                  </p>
                )}
              </div>
              <span
                className="self-start sm:self-auto px-2 sm:px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ml-0 sm:ml-3 mb-2 sm:mb-0"
                style={{ 
                  backgroundColor: event.color + '20',
                  color: event.color 
                }}
              >
                {event.category}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <span>
                  {event.time}
                  {event.endTime && ` - ${event.endTime}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Motion.div>
    );
  };

  const DayHeader = ({ categoryInfo, index }) => {
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
          className="relative z-10 flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full shadow-xl border-2 sm:border-4 border-slate-800 flex-shrink-0"
          style={{ backgroundColor: categoryInfo.color }}
        >
          <CategoryIcon className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
        </div>

        {/* Header Content */}
        <div className="flex-1 min-w-0">
          <div
            className="card p-4 sm:p-6 border-2"
            style={{ 
              borderColor: categoryInfo.color,
              backgroundColor: categoryInfo.bgColor 
            }}
          >
            <h2
              className="text-xl sm:text-3xl font-bold tracking-wide"
              style={{ color: categoryInfo.color }}
            >
              {categoryInfo.title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-1">
              {categoryInfo.subtitle}
            </p>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400 mt-2">
              <span>{categoryInfo.time}</span>
            </div>
          </div>
        </div>
      </Motion.div>
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-28 pb-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/60 text-slate-300 text-xs sm:text-sm uppercase tracking-[0.3em]">
            <Calendar className="h-4 w-4 text-pink-400" />
            <span>October 10 – 11, 2025</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-100 mt-6">
            Freshers Night 2025 Schedule
          </h1>
          <p className="text-slate-400 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
            A streamlined timeline covering every performance, competition, and celebration across both days.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-8 max-w-2xl mx-auto text-left">
            <div className="surface-soft border border-slate-800 rounded-xl px-4 py-3 flex items-center gap-3">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-[0.2em]">DAY ONE</p>
                <p className="text-sm text-slate-200">October 10 · 8:00 PM – 11:00 PM</p>
              </div>
            </div>
            <div className="surface-soft border border-slate-800 rounded-xl px-4 py-3 flex items-center gap-3">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-[0.2em]">DAY TWO</p>
                <p className="text-sm text-slate-200">October 11 · 9:00 AM – 11:00 PM</p>
              </div>
            </div>
          </div>
        </Motion.div>

        {/* Custom Timeline */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          {Object.entries(groupedSchedule).map(([day, events], dayIndex) => {
            const categoryInfo = dayCategories[day];
            let eventIndex = 0;

            return (
              <div key={day} className="mb-8 sm:mb-12">
                {/* Day Header */}
                <DayHeader 
                  categoryInfo={categoryInfo} 
                  index={dayIndex} 
                />

                {/* Events for this day */}
                <div className="ml-2 sm:ml-4">
                  {events.map((event, idx) => {
                    const isLast = dayIndex === Object.keys(groupedSchedule).length - 1 && idx === events.length - 1;
                    return (
                      <CustomTimelineItem
                        key={`${day}-${idx}`}
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
            className="relative flex flex-col items-center gap-3 py-6"
          >
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg">
              <PartyPopper className="h-6 w-6 sm:h-8 sm:w-8 text-pink-300" />
            </div>
            <span className="text-base sm:text-lg font-medium text-slate-200">
              End of celebrations! 🎉
            </span>
          </Motion.div>
        </Motion.div>

        {/* Important Notes */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 sm:mt-12 card"
        >
          <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-4 text-center">
            Important Information
          </h3>
          <div className="grid gap-4 sm:gap-6">
            <div className="p-4 bg-slate-800/50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-400 mb-2 flex items-center">
                <Award className="h-4 w-4 mr-2" />
                Badges & Points System
              </h4>
              <p className="text-sm text-slate-300">
                Winners of October 10th events receive badges giving extra points in the MR & MS Freshie competition.
              </p>
            </div>
            {/* <div className="p-4 bg-slate-800/50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-bold text-green-400 mb-2 flex items-center">
                <Mic className="h-4 w-4 mr-2" />
                Anchors & Equipment
              </h4>
              <p className="text-sm text-slate-300">
                Movable speakers with wireless mics available. Anchors play a crucial role in crowd engagement and building event hype.
              </p>
            </div> */}
            {/* <div className="p-4 bg-slate-800/50 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-bold text-yellow-400 mb-2 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Time Management
              </h4>
              <p className="text-sm text-slate-300">
                Time Management Team plays a very important role. All participants should be punctual and ready for their events.
              </p>
            </div> */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="font-medium text-slate-300 mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  📍 Venue
                </h4>
                <p className="text-xs sm:text-sm text-slate-400">F600 (Main events), Various locations for specific activities</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="font-medium text-slate-300 mb-2">📞 Contact</h4>
                <p className="text-xs sm:text-sm text-slate-400">Approach organizing committee for any queries</p>
              </div>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default Schedule;
