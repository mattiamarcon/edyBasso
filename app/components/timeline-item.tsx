import type { FC } from "react"

interface TimelineItemProps {
  date: string
  title: string
  place:string
  description: string
  position: "left" | "right"
}

const TimelineItem: FC<TimelineItemProps> = ({ date, title,place, description, position }) => {
  return (
    <div
      className={`timeline-item relative mb-16 opacity-0 translate-y-10 transition-all duration-700 ease-in-out ${
        position === "left" ? "sm:pr-8" : "sm:pl-8"
      }`}
    >
      <div className={`flex flex-col sm:flex-row items-start ${position === "left" ? "sm:flex-row-reverse" : ""}`}>
        {/* Date circle */}
        <div className="absolute left-0 sm:left-1/2 w-8 h-8 bg-slate-700 rounded-full transform -translate-x-1/2 flex items-center justify-center z-10">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>

        {/* Content */}
        <div className={`pl-12 sm:pl-0 sm:w-1/2 ${position === "left" ? "sm:pr-12" : "sm:pl-12"}`}>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-600 rounded-full mb-2">
              {date}
            </span>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
            <h3 className="text-sm text-slate-400 mb-2">{place}</h3>
            <p className="text-slate-600 font-medium">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineItem

