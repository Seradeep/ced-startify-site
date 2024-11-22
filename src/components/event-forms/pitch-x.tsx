import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { apiCreatePitchXProject } from "@/api/events";
import {
  FormStepper,
  FormLayout,
  TextInput,
  RadioInput,
  FormActions,
  MemberDetails,
  FileInput,
} from "@/components/ui/form-components";
import { TypographyP } from "@/components/ui/typography";
import { UploadToCloudinary } from "@/lib/utils";

const teamMemberSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Invalid phone number." }),
});

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Invalid phone number." }),
  studentStatus: z.enum(["student", "alumni"], {
    required_error: "Please specify if you're a student or alumni.",
  }),
  collegeName: z
    .string()
    .min(2, { message: "College name is required." })
    .optional(),
  memberCount: z.string().refine((val) => ["1", "2", "3", "4"].includes(val), {
    message: "Please select the no. of team members.",
  }),
  teamMembers: z
    .array(teamMemberSchema)
    .min(1, { message: "At least 1 team member is required." })
    .max(4, { message: "Maximum 4 team members allowed." }),
  isStartupRegistered: z.enum(["yes", "no"], {
    required_error: "Please specify if your startup is registered.",
  }),
  registrationDetails: z.string().optional(),
  sdg: z.string().min(2, { message: "SDG selection is required." }),
  pitchDeck: z.string().url({ message: "Upload your Pitch Deck" }),
});

export type FormValues = z.infer<typeof formSchema>;

export default function PitchXForm({
  onPaymentBtnOpen,
}: {
  onPaymentBtnOpen: (value: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberCount: "1",
      teamMembers: [{}],
    },
  });

  const {
    fields: members,
    remove,
    append,
  } = useFieldArray({
    name: "teamMembers",
    control: form.control,
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
        return ["name", "email", "phone", "studentStatus", "collegeName"];
      case 2:
        return ["memberCount", "teamMembers"];
      case 3:
        return [
          "isStartupRegistered",
          "registrationDetails",
          "sdg",
          "pitchDeck",
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    const memberCount = parseInt(form.watch("memberCount"));
    const currentMembers = form.getValues("teamMembers").length;
    if (memberCount > currentMembers) {
      for (let i = currentMembers; i < memberCount; i++) {
        append({
          name: "",
          email: "",
          phone: "",
        });
      }
    } else if (memberCount < currentMembers) {
      for (let i = currentMembers - 1; i >= memberCount; i--) {
        remove(i);
      }
    }
  }, [form.watch("memberCount"), append, remove, form]);

  function handleSubmit(paymentId: string) {
    toast.promise(
      apiCreatePitchXProject({
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
      <h1 className="text-3xl font-bold mb-2">Pitch-X</h1>
      <TypographyP className="!mt-0 mb-4">
        You need to pay Event Registration fee of Rs.1250/-(including all taxes)
        at the time of submission of your applications
      </TypographyP>
      <FormStepper currentStep={step} totalSteps={totalSteps} />

      <FormLayout form={form}>
        {step === 1 && (
          <div className="space-y-4">
            <TextInput
              name="name"
              label="Name"
              placeholder="Enter your full name"
            />
            <TextInput
              name="email"
              label="Email ID"
              placeholder="Enter your email address"
            />
            <TextInput
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
            />
            <RadioInput
              name="studentStatus"
              label="Are you a Student or Alumni?"
              options={[
                { value: "student", label: "Student" },
                { value: "alumni", label: "Alumni" },
              ]}
            />
            {form.watch("studentStatus") === "student" && (
              <TextInput
                name="collegeName"
                label="College Name"
                placeholder="Enter your college name"
              />
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <RadioInput
              name="memberCount"
              label="Number of Team Members"
              options={[
                { value: "1", label: "1 Member" },
                { value: "2", label: "2 Members" },
                { value: "3", label: "3 Members" },
                { value: "4", label: "4 Members" },
              ]}
              description="Select the total number of members in your team (including yourself)"
            />
            {members.map((field, index) => (
              <MemberDetails
                key={field.id}
                prefix={`teamMembers.${index}`}
                label={`Team Member ${index + 1}`}
                description={
                  index === 0
                    ? "Details of the team leader"
                    : "Details of team member"
                }
                schema={teamMemberSchema}
              />
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <RadioInput
              name="isStartupRegistered"
              label="Have you registered as Startup/Firm?"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            {form.watch("isStartupRegistered") === "yes" && (
              <TextInput
                name="registrationDetails"
                label="Registration Details"
                placeholder="Provide your startup/firm registration details"
              />
            )}
            <TextInput
              name="sdg"
              label="Under which SDG does your Business Idea Apply to?"
              placeholder="Enter the relevant SDG"
            />
            <FileInput
              name="pitchDeck"
              label="Business Plan Pitch Deck"
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
            amount: "1250",
            name: "Pitch-X",
          }}
        />
      </FormLayout>
    </div>
  );
}
