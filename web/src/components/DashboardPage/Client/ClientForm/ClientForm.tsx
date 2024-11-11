// -- ./src/components/DashboardPage/Client/ClientForm/ClientForm.tsx

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

import type { EditClientById, UpdateClientInput } from 'types/graphql';

// Import subcomponents
import PersonalDetails from './PersonalDetails';
import ChangePassword from './ChangePassword';
import { Button } from 'src/template/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/template/ui/tabs';
import { ClientGender } from 'src/lib/type';
import { navigate, routes } from '@redwoodjs/router';

interface FormData {
  givenName: string;
  familyName: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: ClientGender;
  avatar: string;
  notes: string;
  role: string | null;
}

interface ClientFormProps {
  client?: EditClientById['client'];
  onSave: (data: UpdateClientInput, id?: string) => void;
  error: any;
  loading: boolean;
}



const ClientForm: React.FC<ClientFormProps> = (props) => {

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      givenName: props.client?.givenName || '',
      familyName: props.client?.familyName || '',
      email: props.client?.email || '',
      avatar: props.client?.avatar || '',
      gender: props.client?.gender as ClientGender || ClientGender.MALE,
      phone: props.client?.phone || '',
      notes: props.client?.notes || '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formattedData: UpdateClientInput = {
      givenName: data.givenName,
      familyName: data.familyName,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar,
      gender: data.gender,
      notes: data.notes,
    };
    props.onSave(formattedData, props?.client?.id);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {props.error && <div className="text-destructive mt-2">{props.error.message}</div>}
      <Tabs defaultValue="personal" className="p-0 px-1">

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
