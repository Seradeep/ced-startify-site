import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { apiCreateGurusPitchProject } from "@/api/events";
import {
  FormStepper,
  FormLayout,
  TextInput,
  RadioInput,
  SelectInput,
  FileInput,
  FormActions,
  InfiniteMemberDetails,
} from "@/components/ui/form-components";
import { TypographyP } from "@/components/ui/typography";
import { UploadToCloudinary } from "@/lib/utils";

const formSchema = z.object({
  collegeName: z.string().min(2, { message: "College name is required." }),
  collegeDistrict: z
    .string()
    .min(2, { message: "College district is required." }),
  facultyName: z.string().min(2, { message: "Faculty name is required." }),
  facultyPhone: z.string().min(10, { message: "Invalid phone number." }),
  facultyEmail: z.string().email({ message: "Invalid email address." }),
  coFounders: z.array(
    z.object({
      name: z.string().min(2, { message: "Co-founder name is required." }),
      email: z.string().email({ message: "Invalid email address." }),
      phone: z.string().min(10, { message: "Invalid phone number." }),
    })
  ),
  startupName: z.string().min(2, { message: "Startup name is required." }),
  isStartupRegistered: z.enum(["yes", "no"], {
    required_error: "Please specify if the startup is registered.",
  }),
  yearsLeadingStartup: z
    .string()
    .min(1, { message: "Please specify the number of years." }),
  sdg: z.string().min(2, { message: "SDG selection is required." }),
  startupType: z.enum(["Manufacturing", "Services"], {
    required_error: "Startup type is required.",
  }),
  sector: z.string().min(2, { message: "Sector is required." }),
  pitchDeck: z.string().url({ message: "Upload your pitch deck" }),
});

export type FormValues = z.infer<typeof formSchema>;

export default function GurusPitchForm({
  onPaymentBtnOpen,
}: {
  onPaymentBtnOpen: (value: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coFounders: [],
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
        return [
          "collegeName",
          "collegeDistrict",
          "facultyName",
          "facultyPhone",
          "facultyEmail",
          "coFounders",
        ];
      case 2:
        return [
          "startupName",
          "isStartupRegistered",
          "yearsLeadingStartup",
          "sdg",
          "startupType",
          "sector",
        ];
      case 3:
        return ["pitchDeck"];
      default:
        return [];
    }
  };

  function handleSubmit(paymentId: string) {
    toast.promise(
      apiCreateGurusPitchProject({
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
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-2">Guru's Pitch</h1>
      <TypographyP className="!mt-0 mb-4">
        You need to pay Rs.625/-(including all taxes) at the time of submission
        of your applications
      </TypographyP>
      <FormStepper currentStep={step} totalSteps={totalSteps} />

      <FormLayout form={form}>
        {step === 1 && (
          <div className="space-y-4">
            <TextInput
              name="collegeName"
              label="College Name"
              placeholder="Enter your college name"
            />
            <TextInput
              name="collegeDistrict"
              label="College District"
              placeholder="Enter your college district"
            />
            <TextInput
              name="facultyName"
              label="Faculty Name"
              placeholder="Enter faculty name"
            />
            <TextInput
              name="facultyPhone"
              label="Faculty Phone Number"
              placeholder="Enter faculty phone number"
            />
            <TextInput
              name="facultyEmail"
              label="Faculty Email"
              placeholder="Enter faculty email"
            />
            <InfiniteMemberDetails
              name="coFounders"
              label="Co-founders"
              description="Add details of co-founders (if any)"
              schema={z.object({
                name: z
                  .string()
                  .min(2, { message: "Co-founder name is required." }),
                email: z.string().email({ message: "Invalid email address." }),
                phone: z.string().min(10, { message: "Invalid phone number." }),
              })}
              form={form}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <TextInput
              name="startupName"
              label="Startup Name"
              placeholder="Enter your startup name"
            />
            <RadioInput
              name="isStartupRegistered"
              label="Is your startup registered?"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            <TextInput
              name="yearsLeadingStartup"
              label="Number of years leading your Startup"
              placeholder="Enter number of years"
              type="number"
            />
            <TextInput
              name="sdg"
              label="Under which SDG does your Startup Idea Apply to?"
              placeholder="Enter the relevant SDG"
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
              placeholder="Enter your startup's sector"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <FileInput
              name="pitchDeck"
              label="Pitch Deck Submission"
              accept=".pdf"
              description="Upload your pitch deck (PDF only, max 5MB)"
              onFileSelect={async (file) => {
                const { success, url } = await UploadToCloudinary(file);
                if (success) {
                  form.setValue("pitchDeck", url!);
                  toast.success("Pitch deck uploaded successfully");
                } else {
                  toast.error("Failed to upload pitch deck");
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
            name: "Guru's Pitch",
          }}
        />
      </FormLayout>
    </div>
  );
}
