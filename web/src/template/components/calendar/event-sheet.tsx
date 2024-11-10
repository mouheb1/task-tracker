// // -- ./src/template/components/calendar/event-sheet.tsx
// import React, { useState } from 'react';
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from 'src/template/ui/sheet';
// import DeleteConfirmationDialog from 'src/template/delete-confirmation-dialog';
// import toast from 'react-hot-toast';
// import EventForm from './event-form';
// import { useMutation } from '@redwoodjs/web';

// // GraphQL mutation for deleting a timetable
// const DELETE_TIMETABLE_MUTATION = gql`
//   mutation DeleteTimetableMutation($id: String!) {
//     deleteTimetable(id: $id) {
//       id
//     }
//   }
// `;

// const EventSheet = ({
//   open,
//   onClose,
//   categories,
//   event,
//   selectedDate,
//   refetch,
//   grade
// }) => {
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [eventIdToDelete, setEventIdToDelete] = useState(null);

//   const [deleteTimetable] = useMutation(DELETE_TIMETABLE_MUTATION, {
//     onCompleted: () => {
//       toast.success('Timetable deleted successfully');
//       refetch();
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     }
//   });

//   const handleOpenDeleteModal = (eventId: string) => {
//     setEventIdToDelete(eventId);
//     setDeleteModalOpen(true);
//     onClose();
//   };

//   const onDeleteEventAction = async () => {
//     try {
//       if (!eventIdToDelete) {
//         toast.error('Event ID not found');
//         return;
//       }
//       await deleteTimetable({ variables: { id: eventIdToDelete } }); // API call
//       toast.success('Timetable deleted successfully');
//       setDeleteModalOpen(false);
//       onClose();
//       refetch(); // Refresh the data after deletion
//     } catch (error) {
//       console.error('Error deleting timetable:', error);
//       toast.error('Something went wrong');
//     }
//   };


//   return (
//     <>
//       <DeleteConfirmationDialog
//         open={deleteModalOpen}
//         onClose={() => setDeleteModalOpen(false)}
//         onConfirm={onDeleteEventAction}
//         defaultToast={false}
//       />
//       <Sheet open={open}>
//         <SheetContent
//           onPointerDownOutside={onClose}
//           onClose={onClose}
//           className="px-0"
//         >
//           <SheetHeader className="px-6">
//             <SheetTitle>
//               {event ? 'Edit Event' : 'Create Event'}{' '}
//               {event?.event?.title}
//             </SheetTitle>
//           </SheetHeader>
//           <EventForm
//             grade={grade}
//             refetch={refetch}
//             event={{
//               ...event?.event,
//               ...event?.event?.extendedProps
//             }}
//             categories={categories}
//             selectedDate={selectedDate}
//             onClose={onClose}
//             handleOpenDeleteModal={handleOpenDeleteModal}
//           />
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// };

// export default EventSheet;
