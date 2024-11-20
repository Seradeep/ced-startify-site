import * as React from "react";
import {
  UseFormReturn,
  FieldValues,
  useFieldArray,
  ArrayPath,
  Path,
} from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn, SeparateAndCapitalize } from "@/lib/utils";
import PaymentButton from "../payment-button";

export const FormStepper = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) => (
  <div className="mb-8">
    <div className="flex justify-between mb-2">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div
          key={i}
          className={`w-full h-2 rounded ${
            i + 1 <= currentStep ? "bg-purple-500" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
    <p className="text-sm text-gray-500">
      Step {currentStep} of {totalSteps}
    </p>
  </div>
);

export const FormLayout = <T extends FieldValues>({
  children,
  form,
  // onSubmit,
}: {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  // onSubmit: (values: T) => void;
}) => (
  <Form {...form}>
    <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
      {children}
    </form>
  </Form>
);

export const FormActions = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onOpen,
  callbackFn,
  event,
}: {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  event: {
    amount: string;
    name: string;
  };
  onOpen: (value: boolean) => void;
  callbackFn: (paymentId: string) => void;
}) => (
  <div className="flex justify-between mt-8">
    {currentStep > 1 && (
      <Button type="button" variant="outline" onClick={onPrevious}>
        Previous
      </Button>
    )}
    {currentStep < totalSteps ? (
      <Button type="button" onClick={onNext}>
        Next
      </Button>
    ) : (
      <PaymentButton
        amount={event.amount}
        onOpen={onOpen}
        callbackFn={callbackFn}
        eventName={event.name}
      />
    )}
  </div>
);

export const ReviewSection = ({
  title,
  data,
  className,
}: {
  title: string;
  data: Record<string, any>;
  className?: string;
}) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <dl
        className={cn(
          "grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2",
          className
        )}
      >
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500 underline underline-offset-1 decoration-gray-400">{`${key}:`}</dt>
            <dd className="mt-1 text-sm text-gray-900">{value}</dd>
          </div>
        ))}
      </dl>
    </CardContent>
  </Card>
);

export const TextInput = ({
  name,
  label,
  placeholder,
  description,
}: {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
}) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            className="placeholder:max-sm:text-sm"
            {...field}
          />
        </FormControl>
        {description && (
          <FormDescription className="max-sm:text-sm">
            {description}
          </FormDescription>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
);

export const RadioInput = ({
  name,
  label,
  options,
  description,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  description?: string;
}) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-3">
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex flex-col space-y-1"
          >
            {options.map((option) => (
              <FormItem
                key={option.value}
                className="flex items-center space-x-3 space-y-0"
              >
                <FormControl>
                  <RadioGroupItem value={option.value} />
                </FormControl>
                <FormLabel className="font-normal">{option.label}</FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
        {description && (
          <FormDescription className="max-sm:text-sm">
            {description}
          </FormDescription>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
);

export const TextareaInput = ({
  name,
  label,
  placeholder,
  description,
}: {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
}) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Textarea
            placeholder={placeholder}
            className="placeholder:max-sm:text-sm resize-vertical"
            {...field}
          />
        </FormControl>
        {description && (
          <FormDescription className="max-sm:text-sm">
            {description}
          </FormDescription>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
);

export const SelectInput = <T extends FieldValues>({
  name,
  label,
  options,
  description,
}: {
  name: Path<T>;
  label: string;
  options: { value: string; label: string }[];
  description?: string;
}) => (
  <FormField
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue
                className="max-sm:text-sm"
                placeholder={`Select ${label.toLowerCase()}`}
              />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {description && (
          <FormDescription className="max-sm:text-sm">
            {description}
          </FormDescription>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
);

export const FileInput = ({
  name,
  label,
  accept,
  description,
}: {
  name: string;
  label: string;
  accept: string;
  description?: string;
}) => (
  <FormField
    name={name}
    render={({ field: { value, onChange, ...field } }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            type="file"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files?.[0];
              onChange(file);
            }}
            {...field}
          />
        </FormControl>
        {description && (
          <FormDescription className="max-sm:text-sm">
            {description}
          </FormDescription>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
);

export const MemberDetails = <T extends FieldValues>({
  prefix,
  label,
  description,
  canRemove = false,
  onRemove,
  schema,
}: {
  prefix: string;
  label: string;
  description?: string;
  canRemove?: boolean;
  onRemove?: () => void;
  schema: z.ZodObject<any>;
}) => {
  const shape = schema.shape;

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-col items-start justify-between pb-0">
        <CardTitle>{label}</CardTitle>
        {canRemove && (
          <Button variant="destructive" size="sm" onClick={onRemove}>
            Remove
          </Button>
        )}
        <CardDescription>
          {description && (
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(shape).map(([fieldName, fieldSchema]) => {
          const name = `${prefix}.${fieldName}` as Path<T>;

          fieldName = SeparateAndCapitalize(fieldName);

          if (fieldSchema instanceof z.ZodString) {
            if (fieldSchema.description === "file") {
              return (
                <FileInput
                  key={name}
                  name={name}
                  label={fieldName}
                  accept="*/*"
                />
              );
            } else if (fieldSchema.description === "textarea") {
              return (
                <TextareaInput
                  key={name}
                  name={name}
                  label={fieldName}
                  placeholder={`Enter ${fieldName.toLowerCase()}`}
                />
              );
            } else {
              return (
                <TextInput
                  key={name}
                  name={name}
                  label={fieldName}
                  placeholder={`Enter ${fieldName.toLowerCase()}`}
                />
              );
            }
          } else if (fieldSchema instanceof z.ZodEnum) {
            const options = fieldSchema._def.values.map((value: string) => ({
              value,
              label: value,
            }));
            if (options.length <= 3) {
              return (
                <RadioInput
                  key={name}
                  name={name}
                  label={fieldName}
                  options={options}
                />
              );
            } else {
              return (
                <SelectInput
                  key={name}
                  name={name}
                  label={fieldName}
                  options={options}
                />
              );
            }
          }
          return null;
        })}
      </CardContent>
    </Card>
  );
};

export const InfiniteMemberDetails = <T extends FieldValues>({
  name,
  label,
  description,
  schema,
  form,
}: {
  name: ArrayPath<T>;
  label: string;
  description?: string;
  schema: z.ZodObject<any>;
  form: UseFormReturn<T>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: name,
  });

  function appendMember() {
    append(
      Object.fromEntries(
        Object.keys(schema.shape).map((key) => [key, ""])
      ) as any
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{label}</h3>
        <Button type="button" onClick={appendMember}>
          Add Member
        </Button>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}
      {fields.map((field, index) => (
        <MemberDetails
          key={field.id}
          prefix={`${name}.${index}`}
          label={`${label} ${index + 1}`}
          canRemove={index > 0}
          onRemove={() => remove(index)}
          schema={schema}
        />
      ))}
    </div>
  );
};
