// // -- ./src/template/components/calendar/TimeTableManager.tsx
// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import FullCalendar from "@fullcalendar/react"; // must go before plugins
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import EventSheet from "./event-sheet";
// import { Plus } from "lucide-react";
// import {
//   EventContentArg,
// } from '@fullcalendar/core'
// import { Card, CardContent, CardHeader } from "src/template/ui/card";
// import { Button } from "src/template/ui/button";
// import { CalendarCategory, CalendarEvent } from "src/lib/interface";
// import GradeSelection from "src/selects/GradeSelection";
// import { useForm } from "@redwoodjs/forms";
// import { useMediaQuery } from "src/hooks/use-media-query";
// import { OptionType } from "src/lib/type";
// import { getDaysOfWeekPositions } from "src/lib/utils";

// const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

// interface CalendarViewProps {
//   events: any[];
//   categories: CalendarCategory[];
//   refetch: (e?: Record<string, any>) => void
// }

// // New optional prop for selected grade
// interface TimeTabelManagerProps extends CalendarViewProps {
//   selectedGradeId?: string;
// }

// interface FormData {
//   gradeId: string
// }

// export const calendarHandleClassName = (arg: EventContentArg): string => {
//   const calendarType = arg.event.extendedProps.calendar?.toLowerCase();

//   switch (calendarType?.toUpperCase()) {
//     case "CLASS_TIMETABLE":
//       return "primary";
//     case "EXAM_SCHEDULE":
//       return "success";
//     case "PARENT_TEACHER_MEETING":
//       return "destructive";
//     case "ASSEMBLY_SCHEDULE":
//       return "info";
//     // case "meeting":
//     //   return "warning";
//     default:
//       return "primary";
//   }
// };

// const TimeTabelManager: React.FC<TimeTabelManagerProps> = ({ events, categories, refetch = () => { }, selectedGradeId }) => {
//   const isMobile = useMediaQuery('(min-width: 768px)')
//   const [selectedCategory, setSelectedCategory] = useState<string[] | null>(null);
//   const [selectedEventDate, setSelectedEventDate] = useState<Date | null>(null);
//   const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
//   const [selectedGrade, setSelectedGrade] = useState<OptionType | null>(null);

//   // event canvas state
//   const [sheetOpen, setSheetOpen] = useState<boolean>(false);

//   const {
//     control,
//     watch,
//     formState: { errors },
//   } = useForm<FormData>({
//     mode: 'onBlur'
//   })

//   const gradeValueId = watch('gradeId');

//   useEffect(() => {
//     setSelectedCategory(categories?.map((c) => c.value));
//   }, [events, categories]);

//   // This function only calls refetch if it's defined
//   const refetchData = useCallback(() => {
//     if (gradeValueId && refetch) {
//       refetch({
//         filter: { gradeId: { eq: gradeValueId } },
//       })
//     } else if (refetch) {
//       // Optional: Refetch without filter if no grade is selected
//       refetch();
//     }
//   }, [gradeValueId])

//   useEffect(() => {
//     refetchData()
//   }, [refetchData])  // Only runs when refetchData changes

//   // event click
//   const handleEventClick = (arg: any) => {
//     setSelectedEventDate(null);
//     setSheetOpen(true);
//     setSelectedEvent(arg);
//     wait().then(() => (document.body.style.pointerEvents = "auto"));
//   };
//   // handle close modal
//   const handleCloseModal = () => {
//     setSheetOpen(false);
//     setSelectedEvent(null);
//     setSelectedEventDate(null);
//   };
//   const handleDateClick = (arg: any) => {
//     setSheetOpen(true);
//     setSelectedEventDate(arg);
//     setSelectedEvent(null);
//     wait().then(() => (document.body.style.pointerEvents = "auto"));
//   };

//   const filteredEvents = events
//     ?.map((event) => {
//       const daysOfWeek = getDaysOfWeekPositions(event.extendedProps.day);
//       return {
//         ...event,
//         daysOfWeek
//       };
//     })

//   // Select handler for date range selection
//   const handleSelect = (arg: any) => {
//     setSheetOpen(true);
//     setSelectedEventDate(arg);
//     setSelectedEvent(null);
//   };

//   // Callback to receive selected grade from GradeSelection
//   const handleGradeChange = (grade: OptionType) => {
//     setSelectedGrade(grade)
//   }

//   return (
//     <>
//       <div>
//         <Card className="col-span-12 lg:col-span-4 2xl:col-span-3">
//           <CardContent className="p-0">

//             <CardContent className="p-0">
//               <CardHeader className="flex flex-col md:flex-row border-none mb-2 pt-5 gap-5">
//                 <div className="flex-1">
//                   <GradeSelection
//                     control={control}
//                     errors={errors}
//                     hideLabel={true}
//                     // Pass the handleGradeChange callback to receive selected grade
//                     onGradeChange={handleGradeChange}
//                     defaultValue=""
//                   />
//                 </div>
//                 {isMobile && <div className="flex-1"></div>}
//                 <Button className="!mt-0" onClick={handleDateClick}>
//                   <Plus className="w-4 h-4 text-primary-foreground ltr:mr-1 rtl:ml-1" />
//                   Add Event
//                 </Button>
//               </CardHeader>
//             </CardContent>

//           </CardContent>
//         </Card>

//         <Card className="col-span-12 lg:col-span-8 2xl:col-span-9  pt-5">
//           <CardContent className="dash-tail-calendar">
//             <FullCalendar
//               weekNumberCalculation={'ISO'}
//               plugins={[
//                 timeGridPlugin,
//                 interactionPlugin,
//               ]}
//               headerToolbar={{
//                 left: "",
//                 center: "",
//                 right: "",
//               }}
//               events={filteredEvents}
//               slotDuration="00:15:00"
//               slotLabelInterval="01:00"
//               slotMinTime="07:00:00"
//               slotMaxTime="20:00:00"
//               allDaySlot={false}
//               editable={true}
//               rerenderDelay={10}
//               eventDurationEditable={false}

//               selectable={true}
//               select={handleSelect}

//               droppable={true}
//               eventClassNames={calendarHandleClassName}
//               // dateClick={handleDateClick}
//               eventClick={handleEventClick}
//               initialView="timeGridWeek"

//             />
//           </CardContent>
//         </Card>
//       </div>
//       <EventSheet
//         refetch={refetch}
//         open={sheetOpen}
//         onClose={handleCloseModal}
//         categories={categories}
//         event={selectedEvent}
//         selectedDate={selectedEventDate}
//         grade={selectedGrade}
//       />
//     </>
//   );
// };

// export default TimeTabelManager;
