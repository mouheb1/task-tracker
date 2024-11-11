// -- ./src/selects/ClientSelection.tsx

import React, { useEffect, useState } from 'react'
import { Controller, Control, FieldErrors } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import { Label } from 'src/template/ui/label'
import { useQuery } from '@redwoodjs/web'
import { OptionType } from 'src/lib/type'

interface ClientSelectionProps {
  control: Control<any>
  errors: FieldErrors<any>
  defaultValue?: string
  hideLabel?: boolean
  required?: boolean
  onClientChange?: (client: OptionType | null) => void // Update interface
}

const GET_CLIENTS_QUERY = gql`
  query GetClients($searchTerm: String) {
    clients(
      filter: { fullTextSearch: $searchTerm },
      limit: 20
    ) {
      items {
        id
        givenName
        familyName
        email
      }
    }
  }
`

const ClientSelection: React.FC<ClientSelectionProps> = ({
  control,
  errors,
  defaultValue,
  hideLabel,
  required = false,
  onClientChange,
}) => {
  const { refetch } = useQuery(GET_CLIENTS_QUERY, {
    variables: { searchTerm: '' },
    skip: true,
  })

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null)

  useEffect(() => {
    if (defaultValue) {
      // Fetch the label for the default value
      const fetchDefaultOption = async () => {
        try {
          const { data } = await refetch({ searchTerm: '' })
          const client = data.clients.items.find((lvl: any) => lvl.id === defaultValue)
          if (client) {
            setSelectedOption({
              value: client.id,
              label: `${client.givenName} ${client.familyName} (${client.email})`,
             })
          }
        } catch (error) {
          console.error('Error fetching default client:', error)
        }
      }
      fetchDefaultOption()
    }
  }, [defaultValue, refetch])

  const loadClientOptions = async (inputValue: string): Promise<OptionType[]> => {
    try {
      const { data } = await refetch({ searchTerm: inputValue })
      return data.clients.items.map((client: any) => ({
        value: client.id,
        label: `${client.givenName} ${client.familyName} (${client.email})`,
      }))
    } catch (error) {
      console.error('Error fetching clients:', error)
      return []
    }
  }

  return (
    <div>
      {!hideLabel && <Label htmlFor="clientId">Client</Label>}
      <Controller
        name="clientId"
        control={control}
        rules={required ? { required: 'Client is required' } : {}}
        render={({ field }) => (
          <AsyncSelect
            {...field}
            id="clientId"
            cacheOptions
            defaultOptions
            loadOptions={loadClientOptions}
            isClearable
            placeholder="Select a client..."
            onChange={(option) => {
              field.onChange(option ? option.value : '')
              setSelectedOption(option)
              if (onClientChange) {
                onClientChange(option)
              }
            }}
            value={selectedOption}
            className="z-10"
          />
        )}
      />
      {required && errors.clientId && (
        <div className="text-destructive mt-2">{String(errors.clientId.message)}</div>
      )}
    </div>
  )
}

export default ClientSelection