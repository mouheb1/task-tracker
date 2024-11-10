// // -- ./src/template/components/calendar/event-form.tsx
// // ./src/template/components/calendar/event-form.tsx

// import React, { useEffect, useState } from 'react'
// import { useForm, SubmitHandler } from 'react-hook-form'
// import { Button } from 'src/template/ui/button'
// import { Loader2 } from 'lucide-react'
// import { ScrollArea } from 'src/template/ui/scroll-area'
// import toast from 'react-hot-toast'
// import { useMutation, useQuery } from '@redwoodjs/web'


// import CustomInput from 'src/selects/CustomInput'
// import CustomSelect from 'src/selects/CustomSelect'
// import { OptionType } from 'src/lib/type'
// import { cleanObject } from 'src/tools/object'

// const CREATE_TIMETABLE_MUTATION = gql`
//   mutation CreateTimetable($input: CreateTimetableInput!) {
//     createTimetable(input: $input) {
//       id
//       title
//       type
//       day
//       startTime
//       endTime
//       taskId
//       teacherId
//       gradeId
//       roomId
//     }
//   }
// `

// const UPDATE_TIMETABLE_MUTATION = gql`
//   mutation UpdateTimetable($id: String!, $input: UpdateTimetableInput!) {
//     updateTimetable(id: $id, input: $input) {
//       id
//       title
//       type
//       day
//       startTime
//       endTime
//       taskId
//       teacherId
//       gradeId
//       roomId
//     }
//   }
// `

// const GET_GRADE_TASKS_QUERY = gql`
//   query GetGradeTasks($id: String!) {
//     grade(id: $id) {
//       tasks {
//         id
//       }
//     }
//   }
// `

// interface FormData {
//   id?: string
//   title: string
//   type: string
//   day: string
//   startTime: string
//   endTime: string
//   taskId: { value: string; label: string } | null
//   teacherId: { value: string; label: string } | null
//   gradeId: { value: string; label: string } | null
//   roomId: { value: string; label: string } | null
// }

// interface EventFormProps {
//   grade?: OptionType
//   event: any
//   categories: any
//   selectedDate: any
//   onClose: () => void
//   refetch: any,
//   handleOpenDeleteModal: (eventId: string) => void
// }

// // Create a formatter
// const formatter = new Intl.DateTimeFormat('default', {
//   hour: '2-digit',
//   minute: '2-digit',
//   hour12: false
// });

// const CATEGORY_OPTIONS = [
//   {
//     "value": "CLASS_TIMETABLE",
//     "label": "Class"
//   },
//   {
//     "value": "EXAM_SCHEDULE",
//     "label": "Exam Schedule"
//   },
//   {
//     "value": "ASSEMBLY_SCHEDULE",
//     "label": "Assembly Schedule"
//   },
//   {
//     "value": "PARENT_TEACHER_MEETING",
//     "label": "Parent-Teacher Meeting"
//   }
// ];


// // Create an Intl.DateTimeFormat instance for the desired locale and options
// const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });

// const EventForm: React.FC<EventFormProps> = ({
//   grade,
//   event,
//   categories,
//   selectedDate,
//   onClose,
//   refetch,
//   handleOpenDeleteModal
// }) => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<FormData>({
//     mode: 'all',
//     defaultValues: {
//       id: '',
//       title: '',
//       type: '',
//       day: dayFormatter.format(selectedDate?.start)?.toUpperCase(),
//       startTime: formatter.format(selectedDate?.start),
//       endTime: formatter.format(selectedDate?.end),
//       taskId: null,
//       teacherId: null,
//       gradeId: grade,
//       roomId: null,
//     },
//   })

//   const [availableTaskIds, setAvailableTaskIds] = useState<string[]>([])
//   const [selectedGradeId, setSelectedGradeId] = useState<string | null>(grade?.value || null)

//   const [createTimetable, { loading: createLoading, error: createError }] = useMutation(
//     CREATE_TIMETABLE_MUTATION,
//     {
//       refetchQueries: ['GetTimetables'],
//       awaitRefetchQueries: true,
//     }
//   )

//   const [updateTimetable, { loading, error }] = useMutation(
//     UPDATE_TIMETABLE_MUTATION,
//     {
//       refetchQueries: ['GetTimetables'],
//       awaitRefetchQueries: true,
//     }
//   )

//   const { refetch: refetchGradeTasks } = useQuery(GET_GRADE_TASKS_QUERY, {
//     variables: { id: selectedGradeId },
//     skip: true,
//   })

//   useEffect(() => {
//     if (event) {
//       reset({
//         title: event.title,
//         type: event.type,
//         day: event.day,
//         startTime: event.startTime,
//         endTime: event.endTime,
//         taskId: event.taskId,
//         teacherId: event.teacherId,
//         gradeId: event.gradeId,
//         roomId: event.roomId
//       });
//     }
//   }, [event, reset]);


//   useEffect(() => {
//     if (grade) {
//       const fetchInitialTasks = async () => {
//         try {
//           const { data } = await refetchGradeTasks({ id: grade.value });
//           const taskIds = data.grade.tasks.map((task: any) => task.id);
//           setAvailableTaskIds(taskIds);
//         } catch (error) {
//           console.error('Error fetching initial tasks for grade:', error);
//           setAvailableTaskIds([]);
//         }
//       };
//       fetchInitialTasks();
//     }
//   }, [grade]);

//   const handleGradeChange = async (gradeOption: OptionType | null) => {
//     const gradeId = gradeOption ? gradeOption.value : null
//     setSelectedGradeId(gradeId)
//     if (gradeId) {
//       try {
//         const { data } = await refetchGradeTasks({ id: gradeId })
//         const taskIds = data.grade.tasks.map((task: any) => task.id)
//         setAvailableTaskIds(taskIds)
//       } catch (error) {
//         console.error('Error fetching tasks for grade:', error)
//         setAvailableTaskIds([])
//       }
//     } else {
//       // If no grade is selected, reset availableTaskIds
//       setAvailableTaskIds([])
//     }
//   }

//   const onSubmitHandler: SubmitHandler<FormData> = async (data) => {
//     try {
//       const variables = {
//         input: {
//           ...cleanObject(data),
//           type: data.type || CATEGORY_OPTIONS[0].value,
//           gradeId: typeof data.gradeId === 'string' ? data.gradeId : data.gradeId.value,
//         },
//       }

//       if (event.id) {
//         await updateTimetable({
//           variables: {
//             id: event.id,
//             input: variables.input
//           }
//         })
//       } else {
//         await createTimetable({ variables })
//       }

//       toast.success(`Timetable ${event ? 'updated' : 'created'} successfully`)
//       reset()
//       onClose()
//       refetch()
//     } catch (e) {
//       console.error('Error creating timetable:', e)
//       toast.error('Error creating timetable')
//     }
//   }

//   return (
//     <div className="mt-6 h-full">
//       <form className="h-full" onSubmit={handleSubmit(onSubmitHandler)}>
//         <div className="h-[calc(100vh-130px)]">
//           <ScrollArea className="h-full">
//             <div className="space-y-4 pb-5 px-6">
//               {error && <div className="text-destructive">{error.message}</div>}

//               <div className="space-y-1.5">
//                 <CustomInput
//                   control={control}
//                   errors={errors}
//                   name="title"
//                   label="Title"
//                   placeholder="Enter title"
//                 // rules={{ required: 'Title is required' }}
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <CustomSelect
//                   control={control}
//                   errors={errors}
//                   name="type"
//                   label="Category"
//                   options={CATEGORY_OPTIONS}
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <DaySelection control={control} errors={errors} />
//               </div>

//               <div className="space-y-1.5">
//                 <CustomInput
//                   control={control}
//                   errors={errors}
//                   name="startTime"
//                   label="Start Time"
//                   inputType="time"
//                   rules={{ required: 'Start time is required' }}
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <CustomInput
//                   control={control}
//                   errors={errors}
//                   name="endTime"
//                   label="End Time"
//                   inputType="time"
//                   rules={{ required: 'End time is required' }}
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <GradeSelection
//                   control={control}
//                   errors={errors}
//                   defaultValue={event?.gradeId || grade?.value}
//                   onGradeChange={handleGradeChange} // Pass the handler
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <TaskSelection
//                   control={control}
//                   errors={errors}
//                   defaultValue={event?.taskId}
//                   availableIds={availableTaskIds} // Pass available IDs
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <TeacherSelection control={control} errors={errors} defaultValue={event?.teacherId} />
//               </div>

//               <div className="space-y-1.5">
//                 <RoomSelection control={control} errors={errors} defaultValue={event?.roomId} />
//               </div>
//             </div>
//           </ScrollArea>
//         </div>
//         <div className="pb-12 flex flex-wrap gap-2 px-6">
//           <Button type="submit" disabled={loading} className="flex-1">
//             {loading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               'Save'
//             )}
//           </Button>
//           {/* Add Delete Button */}
//           {event && event.id && (
//             <Button
//               disabled={loading}
//               className="flex-1 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 transition"
//               onClick={() => handleOpenDeleteModal(event.id)}
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 'Delete'
//               )}
//             </Button>
//           )}
//         </div>
//       </form>
//     </div>
//   )
// }

// export default EventForm
