// -- ./src/components/DashboardPage/Task/TaskForm/TaskForm.tsx
// src/components/DashboardPage/Task/TaskForm/TaskForm.tsx

import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useQuery } from '@redwoodjs/web'
import { Button } from 'src/template/ui/button'
import { Loader2 } from 'lucide-react'
import { navigate, routes } from '@redwoodjs/router'
import CustomInput from 'src/selects/CustomInput'
import CustomTextarea from 'src/selects/CustomTextarea'
import { OptionType } from 'src/lib/type'
import { Task } from 'types/graphql'

interface FormData {
  name: string
  description?: string
  gradeIds: string[]
}

interface TaskFormProps {
  task?: Partial<Task>
  onSave: (data: FormData, id?: string) => void
  error: any
  loading: boolean
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, error, loading }) => {
  const { refetch: refetchGrades } = useQuery(GET_GRADES_QUERY, {
    variables: { searchTerm: '' },
    skip: true,
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: task?.name || '',
      description: task?.description || '',
      gradeIds: task?.grades
        ? task.grades.map((grade: Partial<{ id: string }>) => grade.id)
        : [],
    },
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    onSave(data, task?.id)
  }

  // Load options for Grades AsyncSelect
  const loadGradesOptions = async (inputValue: string): Promise<OptionType[]> => {
    try {
      const { data } = await refetchGrades({ searchTerm: inputValue })
      return data.grades.items.map((grade: any) => ({
        value: grade.id,
        label: grade.name,
      }))
    } catch (error) {
      console.error('Error fetching grades:', error)
      return []
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && <div className="text-destructive mt-2">{error.message}</div>}

      <div className="grid grid-cols-12 md:gap-x-12 gap-y-5">
        {/* Name */}
        <div className="col-span-12 md:col-span-6">
          <CustomInput
            control={control}
            errors={errors}
            name="name"
            label="Name"
            placeholder="Enter task name"
            rules={{ required: 'Name is required' }}
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
  )
}

export default TaskForm
