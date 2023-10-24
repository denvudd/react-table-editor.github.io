import React from "react";
import { useRouter } from "next/navigation";

import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import axios from "@/lib/axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

import { Errors } from "@/constants/errors";
import { type TableSchema, TableValidator } from "@/lib/validators/table";

interface CreateRowFormProps {
  closeForm: () => void;
}

const CreateRowForm: React.FC<CreateRowFormProps> = ({ closeForm }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TableSchema>({
    resolver: zodResolver(TableValidator),
  });
  const router = useRouter();

  const createRow = React.useCallback(async (payload: TableSchema) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/table/", payload);

      if (data) {
        setIsLoading(false);
        toast.success(`Row with ID ${data.id} created successfully`);

        closeForm();
        router.refresh();
        reset();
      }

      return data;
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (error.response) {
          const prettifyErrors = Object.values(error.response.data) as string[];
          toast.error(
            prettifyErrors.map((error, index) => (
              <span key={index} className="w-full block">
                {error}
              </span>
            ))
          );
        } else {
          toast.error(Errors.Unknown);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onSubmit: SubmitHandler<TableSchema> = (data) => createRow(data);

  return (
    <div className="border rounded-md bg-muted p-4 mb-2">
      <h2 className="text-xl font-semibold mb-2">Create Row</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap items-start gap-4">
          <div className="space-y-2 md:flex-1">
            <Label>Name</Label>
            <Input placeholder="John Smith" id="name" {...register("name")} />
            {errors.name && (
              <span className="text-destructive text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="space-y-2 md:flex-1">
            <Label>Email</Label>
            <Input
              placeholder="example@gmail.com"
              id="email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-destructive text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-2 md:flex-1">
            <Label>Birthday Date</Label>
            <Input
              placeholder="2003-09-30"
              id="birthday_date"
              {...register("birthday_date")}
            />
            {errors.birthday_date && (
              <span className="text-destructive text-xs">
                {errors.birthday_date.message}
              </span>
            )}
          </div>

          <div className="space-y-2 md:flex-1">
            <Label>Phone Number</Label>
            <Input
              placeholder="+380939131341"
              id="phone_number"
              {...register("phone_number")}
            />
            {errors.phone_number && (
              <span className="text-destructive text-xs">
                {errors.phone_number.message}
              </span>
            )}
          </div>

          <div className="space-y-2 md:flex-1">
            <Label>Address</Label>
            <Input
              placeholder="188 Taylor Roads Apt. 509Port Rhondaport, AR 59017"
              id="address"
              {...register("address")}
            />
            {errors.address && (
              <span className="text-destructive text-xs">
                {errors.address.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end items-center gap-2 mt-4">
          <Button type="button" variant="destructive" onClick={closeForm}>
            Close
          </Button>
          <Button isLoading={isLoading} type="submit">
            {isLoading ? "Creating..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateRowForm;
