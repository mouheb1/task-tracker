// -- ./src/template/task-board/common/assign-members.tsx
"use client"
import { Avatar, AvatarFallback, AvatarImage } from "src/template/ui/avatar";
import { Button } from "src/template/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "src/template/ui/command";
import { Input } from "src/template/ui/input";
import { Label } from "src/template/ui/label";
import { CustomPopover, Popover, PopoverClose, PopoverContent, PopoverTrigger } from "src/template/ui/popover";
import { RadioGroup, RadioGroupItem } from "src/template/ui/radio-group";
import { faker } from "@faker-js/faker";
import { Icon } from "@iconify/react";
import { ClientPlus, X } from "lucide-react";
import { useState } from "react";
const members = [
  {
    name: "Nick Jonas",
    value: "id1",
    image: faker.image.avatarLegacy()
  },
  {
    name: "Fahim",
    value: "id2",
    image: faker.image.avatarLegacy()
  },
  {
    name: "Nayeem",
    value: "id3",
    image: faker.image.avatarLegacy()
  },
  {
    name: "Iftekhar",
    value: "id4",
    image: faker.image.avatarLegacy()
  },
]
const AssignMembers = ({ icon }: { icon?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const togglePopover = () => setOpen(!open);



  return (
    <CustomPopover
      trigger={
        <button
          className="h-5 w-5 rounded-full bg-default-100 grid place-content-center"
          onClick={togglePopover}
        >
          {
            icon ? icon :
              <ClientPlus className="w-3 h-3 text-primary" />
          }
        </button>
      }
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className="flex justify-between items-center bg-default-50  border-b border-default-300 px-3 py-2">
        <div className=" text-sm font-medium text-default-900 ">Assign Task To</div>
        <Button
          type="button"
          size="icon"
          className="w-6 h-6 bg-default-400 rounded-full"
          onClick={togglePopover}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="p-2">
        <Command>
          <CommandInput
            placeholder="Search By Name..."
            inputWrapper="border border-default-200 rounded-md"
            className="h-9"
          ></CommandInput>
          <CommandEmpty>No new members.</CommandEmpty>
          <CommandGroup>
            {
              members.map(item => (
                <CommandItem
                  key={`assigned-members-${item.value}`}
                  value={item.name}
                  className="gap-2"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={item.image} />
                    <AvatarFallback>SN</AvatarFallback>
                  </Avatar>
                  <span className="font-base capitalize text-default-900">
                    {item.name}
                  </span>
                </CommandItem>
              ))
            }
          </CommandGroup>
        </Command>
      </div>
    </CustomPopover>
  );
};

export default AssignMembers;