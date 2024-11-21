import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { apiCreateStartupAtlasProject } from "@/api/events";
import {
  FormStepper,
  FormLayout,
  TextInput,
  RadioInput,
  SelectInput,
  FileInput,
  FormActions,
} from "@/components/ui/form-components";
import { TypographyP } from "@/components/ui/typography";
import { UploadToCloudinary } from "@/lib/utils";

const formSchema = z.object({
  isIndianStudent: z.enum(["yes", "no"], {
    required_error: "Please select if you are an Indian student.",
  }),
  nationality: z.string().min(2, { message: "Nationality is required." }),
  institution: z.object({
    name: z.string().min(2, { message: "Institution name is required." }),
    pocName: z
      .string()
      .min(2, { message: "Institution POC name is required." }),
    pocPhone: z.string().min(10, { message: "Invalid phone number." }),
    pocEmail: z.string().email({ message: "Invalid email address." }),
  }),
  student: z.object({
    name: z.string().min(2, { message: "Student name is required." }),
    phone: z.string().min(10, { message: "Invalid phone number." }),
    email: z.string().email({ message: "Invalid email address." }),
    degree: z.string().min(2, { message: "Degree of study is required." }),
    department: z.string().min(2, { message: "Department is required." }),
    yearOfStudy: z.enum(["1", "2", "3", "4", "5"], {
      required_error: "Year of study is required.",
    }),
  }),
  institutionBonafide: z
    .string({
      required_error: "Institution Bonafide is required",
    })
    .url(),
});

export type FormValues = z.infer<typeof formSchema>;

export default function StartupAtlasForm({
  onPaymentBtnOpen,
}: {
  onPaymentBtnOpen: (value: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isIndianStudent: "yes",
      student: {
        yearOfStudy: "1",
      },
    },
  });

  const nextStep = async () => {
    const fields = getFieldsForStep(step);
    const isValid = await form.trigger(fields as any);
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (step: number): (keyof FormValues)[] => {
    switch (step) {
      case 1:
        return ["isIndianStudent", "nationality"];
      case 2:
        return ["institution"];
      case 3:
        return ["student"];
      case 4:
        return ["institutionBonafide"];
      default:
        return [];
    }
  };

  function handleSubmit(paymentId: string) {
    toast.promise(
      apiCreateStartupAtlasProject({
        paymentId,
        ...form.getValues(),
      }),
      {
        loading: "Creating...",
        success: () => {
          window.location.reload();
          return "Application submitted successfully!!";
        },
        error: () => "Failed to submit your application",
      }
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-2">Startup Atlas</h1>
      <TypographyP className="!mt-0 mb-4">
        You need to pay Rs.625/-(including all taxes) at the time of submission
        of your applications
      </TypographyP>
      <FormStepper currentStep={step} totalSteps={totalSteps} />

      <FormLayout form={form}>
        {step === 1 && (
          <div className="space-y-4">
            <RadioInput
              name="isIndianStudent"
              label="Are you a student from India?"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            <TextInput
              name="nationality"
              label="Nationality"
              placeholder="Enter your nationality"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Institution Details</h2>
            <TextInput
              name="institution.name"
              label="Institution Name"
              placeholder="Enter your institution name"
            />
            <TextInput
              name="institution.pocName"
              label="Institution POC Name"
              placeholder="Enter POC name"
            />
            <TextInput
              name="institution.pocPhone"
              label="Institution POC Phone"
              placeholder="Enter POC phone number"
            />
            <TextInput
              name="institution.pocEmail"
              label="Institution POC Email"
              placeholder="Enter POC email"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Student Details</h2>
            <TextInput
              name="student.name"
              label="Student Name"
              placeholder="Enter your full name"
            />
            <TextInput
              name="student.phone"
              label="Phone Number"
              placeholder="Enter your phone number"
            />
            <TextInput
              name="student.email"
              label="Email"
              placeholder="Enter your email address"
            />
            <TextInput
              name="student.degree"
              label="Degree of Study"
              placeholder="Enter your degree"
            />
            <TextInput
              name="student.department"
              label="Department"
              placeholder="Enter your department"
            />
            <SelectInput
              name="student.yearOfStudy"
              label="Year of Study"
              options={[
                { value: "1", label: "1st Year" },
                { value: "2", label: "2nd Year" },
                { value: "3", label: "3rd Year" },
                { value: "4", label: "4th Year" },
                { value: "5", label: "5th Year" },
              ]}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Document Upload</h2>
            <FileInput
              name="institutionBonafide"
              label="Institution Bonafide"
              accept=".pdf"
              description="Upload your institution bonafide certificate (PDF only, max 5MB)"
              onFileSelect={async (file) => {
                const { success, url } = await UploadToCloudinary(file);
                if (success) {
                  form.setValue("institutionBonafide", url!);
                  toast.success("Bonafide uploaded successfully");
                } else {
                  toast.error("Failed to upload bonafide");
                }
              }}
            />
          </div>
        )}

        <FormActions
          currentStep={step}
          totalSteps={totalSteps}
          onPrevious={prevStep}
          onNext={nextStep}
          onOpen={onPaymentBtnOpen}
          callbackFn={handleSubmit}
          event={{
            amount: "625",
            name: "Startup Atlas",
          }}
        />
      </FormLayout>
    </div>
  );
}
