import { Control, FieldPath } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up")

type Props = {
  control: Control<z.infer<typeof formSchema>>;
  label: string;
  name: FieldPath<z.infer<typeof formSchema>>;
  type: string;
  placeholder: string;
}

const CustomInput = ({
  control,
  label,
  name,
  type,
  placeholder,
}: Props) => {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <div className='form-item'>
        <FormLabel htmlFor={name} className='form-label'>
          {label}
        </FormLabel>
        <div className='flex w-full flex-col'>
          <FormControl>
            <Input
              id={name}
              placeholder={placeholder}
              className='input-class'
              type={type}
              {...field}
            />
          </FormControl>
          <FormMessage className='form-message mt-2' />
        </div>
      </div>
    )}
  />
  )
}

export default CustomInput;