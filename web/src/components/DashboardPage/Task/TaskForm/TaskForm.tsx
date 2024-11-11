import React, { useState } from 'react';
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
  price?: number;
  deletedAt?: Date | null;
}

interface FormData {
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: Date;
  clientId: string;
  price?: number;
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
      price: task?.price ? Number(task?.price) : 0,
      taskHistories:
        task?.taskHistories?.length > 0
          ? task.taskHistories.map((th) => ({
              id: th.id,
              action: th.action as TaskAction,
              details: th.details || '',
              createdAt: th.createdAt ? new Date(th.createdAt) : undefined,
              price: th.price ? Number(th.price) : 0,
              deletedAt: th.deletedAt ? new Date(th.deletedAt) : null,
            }))
          : [
              {
                action: TaskAction.CREATED,
                details: '',
                createdAt: new Date(),
                price: 0,
              },
            ],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'taskHistories',
    keyName: '_id'
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Convert prices to numbers
    console.log('data', data);

    data.price = parseFloat(data.price as unknown as string);
    data.taskHistories = data.taskHistories
    .filter((history) => !history.deletedAt) // keep items without deletedAt
    .map((history) => {
      const { _id, deletedAt, ...historyData } = history
      return {
        ...historyData,
        price: parseFloat(historyData.price as unknown as string),
      }
    });
    onSave(data, task?.id);
  };

  // Helper function to count non-deleted task histories
  const countNonDeletedHistories = () => {
    return fields.filter((item) => !item.deletedAt).length;
  };

  // Handler for delete action
  const handleDelete = (index: number) => {
    const item = fields[index];

    const nonDeletedCount = countNonDeletedHistories();

    if (nonDeletedCount <= 1) {
      // Show warning message
      alert('At least one task history is required.')
      return;
    }

    if (item.id) {
      // Existing task history, mark as deleted
      update(index, { ...item, deletedAt: new Date() });
    } else {
      // New task history, remove it completely
      remove(index);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && <div className="text-destructive mt-2">{error.message}</div>}

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

          {/* Price */}
          <div className="col-span-12 md:col-span-6">
            <CustomInput
              control={control}
              errors={errors}
              name="price"
              label="Price"
              placeholder="Enter task price"
              inputType="number"
              rules={{ required: 'Price is required' }}
            />
          </div>

          {/* Description */}
          <div className="col-span-12 md:col-span-6">
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
            <div
              key={item.id || index}
              className={`border p-4 mb-4 ${item.deletedAt ? 'bg-red-100' : ''}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-medium">
                  Task History {index + 1}
                </h4>
                {!item.deletedAt && (
                  <Button
                    color="destructive"
                    type="button"
                    onClick={() => handleDelete(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-12 md:gap-x-12 gap-y-5">
                {/* Action */}
                <div className="col-span-12 md:col-span-6">
                  <CustomSelect
                    control={control}
                    errors={errors}
                    name={`taskHistories.${index}.action` as const}
                    label="Action"
                    options={TASK_ACTION_OPTIONS}
                    rules={{ required: 'Action is required' }}
                  />
                </div>

                {/* Price */}
                <div className="col-span-12 md:col-span-6">
                  <CustomInput
                    control={control}
                    errors={errors}
                    name={`taskHistories.${index}.price` as const}
                    label="Price"
                    placeholder="Enter price"
                    inputType="number"
                    rules={{ required: 'Price is required' }}
                  />
                </div>

                {/* CreatedAt */}
                <div className="col-span-12 md:col-span-6">
                  <CustomDatePicker
                    control={control}
                    errors={errors}
                    name={`taskHistories.${index}.createdAt` as const}
                    label="Created At"
                    placeholder="Select date"
                    disabled={loading}
                  />
                </div>

                {/* Details */}
                <div className="col-span-12 md:col-span-6">
                  <CustomTextarea
                    control={control}
                    errors={errors}
                    name={`taskHistories.${index}.details` as const}
                    label="Details"
                    placeholder="Enter details"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            onClick={() =>
              append({
                action: TaskAction.CREATED,
                details: '',
                createdAt: new Date(),
                price: 0,
                deletedAt: null,
              })
            }
            className="mt-4"
          >
            Add New History
          </Button>
        </div>

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
