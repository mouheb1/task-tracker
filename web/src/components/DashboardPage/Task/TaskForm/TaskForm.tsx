// src/components/TaskForm.tsx

import React from 'react';
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FormProvider,
} from 'react-hook-form';
import { Button } from 'src/template/ui/button';
import { Loader2 } from 'lucide-react';
import { navigate, routes } from '@redwoodjs/router';
import CustomInput from 'src/selects/CustomInput';
import CustomTextarea from 'src/selects/CustomTextarea';
import CustomSelect from 'src/selects/CustomSelect';
import CustomDatePicker from 'src/selects/CustomDatePicker';
import ClientSelection from 'src/selects/ClientSelection';
import { Task } from 'types/graphql';

import TaskReportExporter from './TaskReportExporter';

enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

enum TaskAction {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  ASSIGNED = 'ASSIGNED',
  MEETING = 'MEETING',
  PAYMENT = 'PAYMENT',
  COMMENTED = 'COMMENTED',
}

interface TaskHistoryFormData {
  id?: string;
  action: TaskAction;
  details?: string;
  createdAt?: Date;
}

interface FormData {
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: Date;
  clientId: string;
  taskHistories: TaskHistoryFormData[];
}

interface TaskFormProps {
  task?: Partial<Task>;
  onSave: (data: FormData, id?: string) => void;
  error: any;
  loading: boolean;
}

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

const TASK_ACTION_OPTIONS = [
  { value: 'CREATED', label: 'Created' },
  { value: 'UPDATED', label: 'Updated' },
  { value: 'ASSIGNED', label: 'Assigned' },
  { value: 'MEETING', label: 'Meeting' },
  { value: 'PAYMENT', label: 'Payment' },
  { value: 'COMMENTED', label: 'Commented' },
];

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  onSave,
  error,
  loading,
}) => {
  const methods = useForm<FormData>({
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      status: task?.status || TaskStatus.PENDING,
      dueDate: task?.dueDate ? new Date(task.dueDate) : undefined,
      clientId: task?.client?.id || '',
      taskHistories:
        task?.taskHistories?.length > 0
          ? task.taskHistories.map((th) => ({
              id: th.id,
              action: th.action as TaskAction,
              details: th.details || '',
              createdAt: th.createdAt ? new Date(th.createdAt) : undefined,
            }))
          : [
              {
                action: TaskAction.CREATED,
                details: '',
                createdAt: new Date(),
              },
            ],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'taskHistories',
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (data.taskHistories.length === 0) {
      alert('At least one task history is required.');
      return;
    }
    onSave(data, task?.id);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && <div className="text-destructive mt-2">{error.message}</div>}

        {/* Export Button at Top Right */}
        <div className="flex justify-end">
          {task && <TaskReportExporter task={task} />}
        </div>

        <div className="grid grid-cols-12 md:gap-x-12 gap-y-5">
          {/* Title */}
          <div className="col-span-12 md:col-span-6">
            <CustomInput
              control={control}
              errors={errors}
              name="title"
              label="Title"
              placeholder="Enter task title"
              rules={{ required: 'Title is required' }}
            />
          </div>

          {/* Status */}
          <div className="col-span-12 md:col-span-6">
            <CustomSelect
              control={control}
              errors={errors}
              name="status"
              label="Status"
              options={STATUS_OPTIONS}
              rules={{ required: 'Status is required' }}
            />
          </div>

          {/* Client */}
          <div className="col-span-12 md:col-span-6">
            <ClientSelection
              control={control}
              errors={errors}
              name="clientId"
              label="Client"
              required={true}
              defaultValue={task?.client?.id}
            />
          </div>

          {/* Due Date */}
          <div className="col-span-12 md:col-span-6">
            <CustomDatePicker
              control={control}
              errors={errors}
              name="dueDate"
              label="Due Date"
              placeholder="Select due date"
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div className="col-span-12">
            <CustomTextarea
              control={control}
              errors={errors}
              name="description"
              label="Description"
              placeholder="Enter task description"
            />
          </div>
        </div>

        {/* Task Histories Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Task Histories</h3>
          {fields.map((item, index) => (
            <div key={item.id} className="border p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-medium">Task History {index + 1}</h4>
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>

              {/* Action */}
              <CustomSelect
                control={control}
                errors={errors}
                name={`taskHistories.${index}.action` as const}
                label="Action"
                options={TASK_ACTION_OPTIONS}
                rules={{ required: 'Action is required' }}
              />

              {/* Details */}
              <CustomTextarea
                control={control}
                errors={errors}
                name={`taskHistories.${index}.details` as const}
                label="Details"
                placeholder="Enter details"
              />

              {/* CreatedAt */}
              <CustomDatePicker
                control={control}
                errors={errors}
                name={`taskHistories.${index}.createdAt` as const}
                label="Created At"
                placeholder="Select date"
                disabled={loading}
              />
            </div>
          ))}

          {/* Add New Task History Button */}
          <Button
            type="button"
            onClick={() =>
              append({
                action: TaskAction.CREATED,
                details: '',
                createdAt: new Date(),
              })
            }
            className="mt-4"
          >
            Add New History
          </Button>
        </div>

        {/* Submit Buttons */}
        <div className="mt-6 flex gap-5 justify-end">
          <Button
            color="secondary"
            type="button"
            onClick={() => navigate(routes.dashboardPageTasks())}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default TaskForm;
