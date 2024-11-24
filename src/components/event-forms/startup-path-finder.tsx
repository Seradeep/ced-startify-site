import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import {
  FormStepper,
  FormLayout,
  TextInput,
  SelectInput,
  RadioInput,
  FormActions,
} from "@/components/ui/form-components";
import { TypographyP } from "@/components/ui/typography";
import { apiCreateStartupPathFinderProject } from "@/api/events";
import { events } from "@/data";

const baseSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(10, { message: "Invalid phone number" }),
});

const studentSchema = z.object({
  collegeName: z.string().min(2, { message: "College name is required" }),
  degree: z.string().min(2, { message: "Degree is required" }),
  department: z.string().min(2, { message: "Department is required" }),
  yearOfStudy: z.string().min(1, { message: "Year of study is required" }),
});

const professionalSchema = z.object({
  designation: z.string().min(2, { message: "Designation is required" }),
  companyName: z.string().min(2, { message: "Company name is required" }),
  sector: z.string().min(2, { message: "Sector is required" }),
});

const entrepreneurSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required" }),
  startupType: z.enum(["Manufacturing", "Services"]),
  sector: z.string().min(2, { message: "Sector is required" }),
});

const formSchema = z.discriminatedUnion("role", [
  z.object({
    ...baseSchema.shape,
    role: z.literal("Student"),
    ...studentSchema.shape,
  }),
  z.object({
    ...baseSchema.shape,
    role: z.literal("Professional"),
    ...professionalSchema.shape,
  }),
  z.object({
    ...baseSchema.shape,
    role: z.literal("Entrepreneur"),
    ...entrepreneurSchema.shape,
  }),
]);

export type FormValues = z.infer<typeof formSchema>;

export default function StartUpPathFinderForm({
  onPaymentBtnOpen,
}: {
  onPaymentBtnOpen: (value: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const totalSteps = 2;
  const event = events.find((event) => event.id === "path-finder");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
  });

  const role = form.watch("role");

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1:
        return ["name", "email", "phoneNumber", "role"];
      case 2:
        switch (form.getValues("role")) {
          case "Student":
            return ["collegeName", "degree", "department", "yearOfStudy"];
          case "Professional":
            return ["designation", "companyName", "sector"];
          case "Entrepreneur":
            return ["companyName", "startupType", "sector"];
          default:
            return [];
        }
      default:
        return [];
    }
  };

  const nextStep = async () => {
    const fields = getFieldsForStep(step);
    const isValid = await form.trigger(fields as (keyof FormValues)[]);
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = (paymentId: string) => {
    toast.promise(
      apiCreateStartupPathFinderProject({
        paymentId,
        ...form.getValues(),
      }),
      {
        loading: "Submitting...",
        success: () => {
          window.location.reload();
          return "Application submitted successfully!";
        },
        error: () => "Failed to submit your application",
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-2">
        StartUp Path Finder - AI Mentor Connect Panel Discussion
      </h1>
      <TypographyP className="!mt-0 mb-4">
        {`You need to pay Event Registration fee of Rs.${event?.regFee}/-(including all taxes)
        at the time of submission of your applications`}
      </TypographyP>
      <FormStepper currentStep={step} totalSteps={totalSteps} />

      <FormLayout form={form}>
        {step === 1 && (
          <div className="space-y-4">
            <TextInput name="name" label="Name" placeholder="Enter your name" />
            <TextInput
              name="email"
              label="Email ID"
              placeholder="Enter your email"
            />
            <TextInput
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter your phone number"
            />
            <RadioInput
              name="role"
              label="You are a"
              options={[
                { value: "Student", label: "Student" },
                { value: "Professional", label: "Professional" },
                { value: "Entrepreneur", label: "Entrepreneur" },
              ]}
            />
          </div>
        )}

        {step === 2 && role === "Student" && (
          <div className="space-y-4">
            <TextInput
              name="collegeName"
              label="College Name"
              placeholder="Enter your college name"
            />
            <TextInput
              name="degree"
              label="Degree"
              placeholder="Enter your degree"
            />
            <TextInput
              name="department"
              label="Department"
              placeholder="Enter your department"
            />
            <TextInput
              name="yearOfStudy"
              label="Year of Study"
              placeholder="Enter your year of study"
            />
          </div>
        )}

        {step === 2 && role === "Professional" && (
          <div className="space-y-4">
            <TextInput
              name="designation"
              label="Designation"
              placeholder="Enter your designation"
            />
            <TextInput
              name="companyName"
              label="Company Name"
              placeholder="Enter your company name"
            />
            <TextInput
              name="sector"
              label="Sector"
              placeholder="Enter your sector"
            />
          </div>
        )}

        {step === 2 && role === "Entrepreneur" && (
          <div className="space-y-4">
            <TextInput
              name="companyName"
              label="Company Name"
              placeholder="Enter your company name"
            />
            <SelectInput
              name="startupType"
              label="Startup Type"
              options={[
                { value: "Manufacturing", label: "Manufacturing" },
                { value: "Services", label: "Services" },
              ]}
            />
            <TextInput
              name="sector"
              label="Sector"
              placeholder="Enter your sector"
            />
          </div>
        )}

        <FormActions
          currentStep={step}
          totalSteps={totalSteps}
          onPrevious={prevStep}
          onNext={nextStep}
          onOpen={onPaymentBtnOpen}
          callbackFn={onSubmit}
          event={{
            amount: event?.regFee!,
            name: "StartUp Path Finder",
          }}
        />
      </FormLayout>
    </div>
  );
}
