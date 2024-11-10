// -- ./src/components/DashboardPage/Client/ClientForm/ClientForm.tsx

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

import type { EditClientById, UpdateClientInput, ClientRole } from 'types/graphql';

// Import subcomponents
import PersonalDetails from './PersonalDetails';
import ChangePassword from './ChangePassword';
import { Button } from 'src/template/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/template/ui/tabs';
import { OptionType, ClientGender } from 'src/lib/type';
import { navigate, routes } from '@redwoodjs/router';

import { useQuery } from '@redwoodjs/web';

interface FormData {
  givenName: string;
  familyName: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: ClientGender;
  avatar: string;
  role: string | null;
}

interface ClientFormProps {
  client?: EditClientById['client'];
  onSave: (data: UpdateClientInput, id?: string) => void;
  error: any;
  loading: boolean;
}

const tabs = [
  {
    label: 'Personal Details',
    value: 'personal',
  },
  {
    label: 'Relations',
    value: 'relations',
  },
];


const ClientForm: React.FC<ClientFormProps> = (props) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(props.client?.role || null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      givenName: props.client?.givenName || '',
      familyName: props.client?.familyName || '',
      email: props.client?.email || '',
      avatar: props.client?.avatar || '',
      gender: props.client?.gender as ClientGender || ClientGender.MALE,
      phone: props.client?.phone || '',
    },
  });

  // Watch for role changes
  const roleValue = watch('role');

  useEffect(() => {
    if (roleValue !== selectedRole) {
      setSelectedRole(roleValue);
    }
  }, [roleValue, selectedRole, setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formattedData: UpdateClientInput = {
      givenName: data.givenName,
      familyName: data.familyName,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar,
      gender: data.gender,
    };
    props.onSave(formattedData, props?.client?.id);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {props.error && <div className="text-destructive mt-2">{props.error.message}</div>}
      <Tabs defaultValue="personal" className="p-0 px-1">
        <TabsList className="bg-card flex-1 overflow-x-auto md:overflow-hidden w-full px-5 pt-6 pb-2.5 h-fit border-b border-default-200 rounded-none justify-start gap-12 rounded-t-md">
          {tabs.map((tab, index) => (
            <TabsTrigger
              className="capitalize px-0 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-primary transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:-bottom-[11px] before:h-[2px] before:-translate-x-1/2 before:w-0 data-[state=active]:before:bg-primary data-[state=active]:before:w-full"
              value={tab.value}
              key={`tab-${index}`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="personal" className="mt-6">
          {/* Personal Details */}
          <PersonalDetails control={control} errors={errors} loading={props.loading} />
        </TabsContent>

        <TabsContent value="change-password" className="mt-6">
          {/* Change Password Details */}
          <ChangePassword />
        </TabsContent>

      </Tabs>

      {/* Submit Button */}
      <div className="mt-6 flex gap-5 justify-end">
        <Button color="secondary" type="button" onClick={() => navigate(routes.dashboard())}>
          Cancel
        </Button>
        <Button type="submit" disabled={props.loading}>
          {props.loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {props.loading ? 'Loading...' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;
