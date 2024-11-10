// // -- ./src/template/components/calendar/calender-view.tsx
// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import FullCalendar from "@fullcalendar/react"; // must go before plugins
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
// import listPlugin from "@fullcalendar/list";
// import EventSheet from "./event-sheet";
// import ExternalDraggingevent from "./dragging-events";
// import { Plus } from "lucide-react";
// import {
//   EventContentArg,
// } from '@fullcalendar/core'
// import { Card, CardContent, CardHeader } from "src/template/ui/card";
// import { Button } from "src/template/ui/button";
// import { Checkbox } from "src/template/ui/checkbox";
// import { Label } from "src/template/ui/label";
// import { CalendarCategory, CalendarEvent } from "src/lib/interface";
// import GradeSelection from "src/selects/GradeSelection";
// import { useForm } from "@redwoodjs/forms";
// const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));
// interface CalendarViewProps {
//   events: CalendarEvent[];
//   categories: CalendarCategory[];
//   refetch: (e?: Record<string, any>) => void
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


// const CalendarView = ({ events, categories, refetch = () => { } }: CalendarViewProps) => {
//   const [selectedCategory, setSelectedCategory] = useState<string[] | null>(null);
//   const [selectedEventDate, setSelectedEventDate] = useState<Date | null>(null);
//   const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
//   const [draggableInitialized, setDraggableInitialized] = useState<boolean>(false);

//   // event canvas state
//   const [sheetOpen, setSheetOpen] = useState<boolean>(false);

//   const [dragEvents] = useState([
//     { title: "New Event Planning", id: "101", tag: "business" },
//     { title: "Meeting", id: "102", tag: "meeting" },
//     { title: "Generating Reports", id: "103", tag: "holiday" },
//     { title: "Create New theme", id: "104", tag: "etc" },
//   ]);

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

//   useEffect(() => {
//     const draggableEl = document.getElementById("external-events");

//     const initDraggable = () => {
//       if (draggableEl) {
//         new Draggable(draggableEl, {
//           itemSelector: ".fc-event",
//           eventData: function (eventEl) {
//             let title = eventEl.getAttribute("title");
//             let id = eventEl.getAttribute("data");
//             let event = dragEvents.find((e) => e.id === id);
//             let tag = event ? event.tag : "";
//             return {
//               title: title,
//               id: id,
//               extendedProps: {
//                 calendar: tag,
//               },
//             };
//           },
//         });
//       }
//     };

//     if (dragEvents.length > 0) {
//       initDraggable();
//     }

//     return () => {
//       draggableEl?.removeEventListener("mousedown", initDraggable);
//     };
//   }, [dragEvents]);

//   // This function only calls refetch if it's defined
//   const refetchData = useCallback(() => {
//     if (gradeValueId && refetch) {
//       refetch({
//         filter: { gradeId: { eq: gradeValueId } },
//       })
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

//   const handleCategorySelection = (category: string) => {
//     if (selectedCategory && selectedCategory.includes(category)) {
//       setSelectedCategory(selectedCategory.filter((c) => c !== category));
//     } else {
//       setSelectedCategory([...selectedCategory || [], category]);
//     }
//   };

//   const filteredEvents = events?.filter((event) =>
//     selectedCategory?.includes(event.extendedProps.calendar)
//   );

//   return (
//     <>
//       <div className=" grid grid-cols-12 gap-6 divide-x  divide-border">
//         <Card className="col-span-12 lg:col-span-4 2xl:col-span-3  pb-5">
//           <CardContent className="p-0">
//             <CardHeader className="border-none mb-2 pt-5 flex flex-col gap-5">
//               <Button onClick={handleDateClick}>
//                 <Plus className="w-4 h-4 text-primary-foreground ltr:mr-1 rtl:ml-1" />
//                 Add Event
//               </Button>
//               <div>
//                 <GradeSelection
//                   control={control}
//                   errors={errors}
//                   hideLabel={true}
//                 />
//               </div>
//             </CardHeader>
//             {/* <div className="px-3">
//               <Calendar
//                 mode="single"
//                 selected={date}
//                 onSelect={(s) => {
//                   handleDateClick(s);
//                 }}
//                 className="rounded-md border w-full p-0 border-none"
//               />
//             </div> */}

//             <div id="external-events" className=" space-y-1.5 mt-6 px-4">
//               <p className=" text-sm font-medium text-default-700 pb-2">
//                 Drag and drop your event or click in the calendar
//               </p>
//               {dragEvents.map((event) => (
//                 <ExternalDraggingevent key={event.id} event={event} />
//               ))}
//             </div>
//             <div className="py-4 text-default-800  font-semibold text-xs uppercase mt-4 px-4">
//               FILTER
//             </div>
//             <ul className=" space-y-2 px-4">
//               <li className=" flex gap-3">
//                 <Checkbox
//                   checked={selectedCategory?.length === categories?.length}
//                   onClick={() => {
//                     if (selectedCategory?.length === categories?.length) {
//                       setSelectedCategory([]);
//                     } else {
//                       setSelectedCategory(categories.map((c) => c.value));
//                     }
//                   }}
//                 />
//                 <Label>All</Label>
//               </li>
//               {categories?.map((category) => (
//                 <li className=" flex gap-3 " key={category.value}>
//                   <Checkbox
//                     className={category.gradeName}
//                     id={category.label}
//                     checked={selectedCategory?.includes(category.value)}
//                     onClick={() => handleCategorySelection(category.value)}
//                   />
//                   <Label htmlFor={category.label}>{category.label}</Label>
//                 </li>
//               ))}
//             </ul>
//           </CardContent>
//         </Card>

//         <Card className="col-span-12 lg:col-span-8 2xl:col-span-9  pt-5">
//           <CardContent className="dash-tail-calendar">
//             <FullCalendar
//               weekNumberCalculation={'ISO'}
//               plugins={[
//                 dayGridPlugin,
//                 timeGridPlugin,
//                 interactionPlugin,
//                 listPlugin,
//               ]}
//               headerToolbar={{
//                 left: "prev,next today",
//                 center: "title",
//                 right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
//               }}
//               events={filteredEvents}
//               editable={true}
//               rerenderDelay={10}
//               eventDurationEditable={false}
//               selectable={true}
//               selectMirror={true}
//               droppable={true}
//               dayMaxEvents={2}
//               weekends={true}
//               eventClassNames={calendarHandleClassName}
//               dateClick={handleDateClick}
//               eventClick={handleEventClick}
//               initialView="dayGridMonth"
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
//       />
//     </>
//   );
// };

// export default CalendarView;
