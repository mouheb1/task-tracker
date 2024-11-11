// -- ./src/components/DashboardPage/Client/ClientForm/PersonalDetails.tsx

import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';

import CustomInput from 'src/selects/CustomInput';
import CustomRadioGroup from 'src/selects/CustomRadioGroup';
import CustomFileUploader from 'src/selects/CustomFileUploader';
import { ClientGender } from 'src/lib/type';
import CustomTextarea from 'src/selects/CustomTextarea';

interface PersonalDetailsProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  loading: boolean;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  control,
  errors,
  loading,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 md:gap-8 gap-y-6">
      {/* Avatar */}
      <div className="col-span-3 lmd:col-span-2 flex justify-center">
        <div className="w-40 h-40 lg:w-60 lg:h-60 mx-auto md:mx-0">
          <CustomFileUploader
            control={control}
            errors={errors}
            name="avatar"
            label="Avatar"
            disabled={loading}
            existingFileUrl="" // Handle existing file URL if needed
          />
        </div>
      </div>

      <div className="col-span-9 lmd:col-span-10 grid grid-cols-1 md:grid-cols-2 md:gap-x-8 gap-y-6">
        {/* Given Name */}
        <CustomInput
          control={control}
          errors={errors}
          name="givenName"
          label="Given Name"
          placeholder="Enter given name"
          rules={{ required: 'Given name is required' }}
        />

        {/* Family Name */}
        <CustomInput
          control={control}
          errors={errors}
          name="familyName"
          label="Family Name"
          placeholder="Enter family name"
          rules={{ required: 'Family name is required' }}
        />

        {/* Email */}
        <CustomInput
          control={control}
          errors={errors}
          name="email"
          label="Email"
          placeholder="Enter email"
          rules={{
            // required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please enter a valid email address',
            },
          }}
        />

        {/* Phone Number */}
        <CustomInput
          control={control}
          errors={errors}
          name="phone"
          label="Phone Number"
          placeholder="Enter phone number"
          // rules={{ required: 'Phone number is required' }}
          inputType="tel"
        />

        {/* Gender */}
        <CustomRadioGroup
          control={control}
          errors={errors}
          name="gender"
          label="Gender"
          options={[
            { value: ClientGender.MALE, label: 'Male' },
            { value: ClientGender.FEMALE, label: 'Female' },
          ]}
          rules={{ required: 'Gender is required' }}
          disabled={loading}
        />

        {/* Note */}
        <CustomTextarea
          control={control}
          errors={errors}
          name="notes"
          label="Note"
          placeholder="Note"
        />
      </div>
    </div>
  );
};

export default PersonalDetails;
