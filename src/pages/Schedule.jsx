import React from 'react';
import { 
  Clock, 
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
    // September 12th Events
    {
      day: 'September 12th',
      time: '8:00 PM',
      endTime: '11:00 PM',
      category: 'Opening Night',
      title: 'Dance by Mayank',
      description: 'Opening performance to kick off the celebrations',
      icon: Music,
      color: '#ec4899', // pink-500
      bgColor: 'rgba(236, 72, 153, 0.1)'
    },
    {
      day: 'September 12th',
      time: '8:15 PM',
      category: 'Musical Performance',
      title: 'Duet by L.Shreya and Pritika',
      description: 'Beautiful duet performance',
      icon: Music,
      color: '#f59e0b', // amber-500
      bgColor: 'rgba(245, 158, 11, 0.1)'
    },
    {
      day: 'September 12th',
      time: '8:30 PM',
      category: 'Dance Competition',
      title: 'Street Dance (King of Dance)',
      description: 'Street dance competition to find the ultimate dancer',
      icon: Users,
      color: '#10b981', // emerald-500
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    {
      day: 'September 12th',
      time: '9:00 PM',
      category: 'Strength Challenge',
      title: 'Planck Holding Challenge',
      description: 'Strong man champion - test your endurance!',
      icon: Dumbbell,
      color: '#ef4444', // red-500
      bgColor: 'rgba(239, 68, 68, 0.1)'
    },
    {
      day: 'September 12th',
      time: '9:30 PM',
      category: 'Rap Competition',
      title: 'Rap Battle (Rapper in the Town)',
      description: 'Battle it out with your best rap skills',
      icon: Mic,
      color: '#8b5cf6', // violet-500
      bgColor: 'rgba(139, 92, 246, 0.1)'
    },
    {
      day: 'September 12th',
      time: '10:00 PM',
      category: 'Fun Contest',
      title: 'Pick Up Lines Contest',
      description: 'Playboy / Playgirl contest - show your charm!',
      icon: Heart,
      color: '#f97316', // orange-500
      bgColor: 'rgba(249, 115, 22, 0.1)'
    },
    {
      day: 'September 12th',
      time: '10:30 PM',
      category: 'Open Stage',
      title: 'Open Mic Invites',
      description: 'Special badges for spontaneous talented performers',
      icon: Spotlight,
      color: '#06b6d4', // cyan-500
      bgColor: 'rgba(6, 182, 212, 0.1)'
    },

    // September 13th Morning
    {
      day: 'September 13th',
      time: '9:00 AM',
      endTime: '12:00 PM',
      category: 'Adventure',
      title: 'Treasure Hunt Event',
      description: 'After breakfast - Winners awarded with incentives',
      icon: MapPin,
      color: '#84cc16', // lime-500
      bgColor: 'rgba(132, 204, 22, 0.1)'
    },

    // September 13th Afternoon F600
    {
      day: 'September 13th',
      time: '2:00 PM',
      endTime: '3:00 PM',
      category: 'Performances',
      title: 'Dance Performances Block 1',
      description: 'Dance by Mayank & crew, Antish & crew, Drama by Harshit & crew, Suchi & crew, Juniors',
      icon: Music,
      color: '#ec4899', // pink-500
      bgColor: 'rgba(236, 72, 153, 0.1)'
    },
    {
      day: 'September 13th',
      time: '3:00 PM',
      endTime: '3:15 PM',
      category: 'Introduction',
      title: 'Introduction of Judges',
      description: 'Meet the panel of judges for the day',
      icon: Users,
      color: '#eab308', // yellow-500
      bgColor: 'rgba(234, 179, 8, 0.1)'
    },
    {
      day: 'September 13th',
      time: '3:15 PM',
      endTime: '4:00 PM',
      category: 'Interactive',
      title: 'Spotlight Events and Dares',
      description: 'Confident performers will have an advantage',
      icon: Spotlight,
      color: '#f97316', // orange-500
      bgColor: 'rgba(249, 115, 22, 0.1)'
    },
    {
      day: 'September 13th',
      time: '4:00 PM',
      endTime: '5:00 PM',
      category: 'Performances',
      title: 'Dance Performances Block 2',
      description: 'Kishore & crew, Dance Drama by Anant & crew, Juniors, Apratim & crew, Surya & crew',
      icon: Music,
      color: '#8b5cf6', // violet-500
      bgColor: 'rgba(139, 92, 246, 0.1)'
    },
    {
      day: 'September 13th',
      time: '5:00 PM',
      endTime: '6:00 PM',
      category: 'Main Competition',
      title: 'Mr and Miss Freshie Live Decision',
      description: 'The ultimate competition with live events and decision',
      icon: Crown,
      color: '#eab308', // yellow-500
      bgColor: 'rgba(234, 179, 8, 0.1)'
    },
    {
      day: 'September 13th',
      time: '6:00 PM',
      endTime: '6:30 PM',
      category: 'Photography',
      title: 'Branch Wise Photograph & Return Gifts',
      description: 'Group photos and distribution of return gifts with refreshments',
      icon: Camera,
      color: '#06b6d4', // cyan-500
      bgColor: 'rgba(6, 182, 212, 0.1)'
    },

    // September 13th Evening
    {
      day: 'September 13th',
      time: '8:15 PM',
      endTime: '8:30 PM',
      category: 'Concert',
      title: 'Concert by Rhapsody',
      description: 'Live musical concert performance',
      icon: Star,
      color: '#ec4899', // pink-500
      bgColor: 'rgba(236, 72, 153, 0.1)'
    },
    {
      day: 'September 13th',
      time: '8:30 PM',
      endTime: '11:00 PM',
      category: 'Grand Finale',
      title: 'DJ Night Concluded',
      description: 'End the celebrations with an epic DJ night',
      icon: PartyPopper,
      color: '#a855f7', // purple-500
      bgColor: 'rgba(168, 85, 247, 0.1)'
    }
  ];

  const dayCategories = {
    'September 12th': {
      title: 'SEPTEMBER 12TH',
      subtitle: 'Opening Night Events',
      time: '8:00 PM - 11:00 PM',
      color: '#ec4899',
      bgColor: 'rgba(236, 72, 153, 0.1)',
      icon: PartyPopper
    },
    'September 13th': {
      title: 'SEPTEMBER 13TH',
      subtitle: 'Main Event Day',
      time: '9:00 AM - 11:00 PM',
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
                <Clock className="h-3 w-3" />
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
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{categoryInfo.time}</span>
            </div>
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
            Freshers Day Final Draft
          </h1>
          <p className="text-slate-300 text-base sm:text-lg px-2 mb-4">
            Complete schedule for IIT Dharwad Freshers' 2025
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 p-3 bg-slate-800/30 rounded-lg">
              <Clock className="h-4 w-4 text-pink-400" />
              <span className="text-sm text-slate-300">
                <strong className="text-pink-400">Sept 12:</strong> 8:00 PM - 11:00 PM
              </span>
            </div>
            <div className="flex items-center justify-center space-x-2 p-3 bg-slate-800/30 rounded-lg">
              <Clock className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-slate-300">
                <strong className="text-yellow-400">Sept 13:</strong> 9:00 AM - 11:00 PM
              </span>
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
                Winners of September 12th events receive badges giving extra points in the MR & MS Freshie competition.
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
