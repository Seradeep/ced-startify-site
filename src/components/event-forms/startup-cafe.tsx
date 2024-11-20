"use client";

import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import {
  FormStepper,
  FormLayout,
  TextInput,
  RadioInput,
  TextareaInput,
  FormActions,
  MemberDetails,
} from "@/components/ui/form-components";
import { TypographyP } from "@/components/ui/typography";
import { apiCreateStartupCafeProject } from "@/api/events";

const teamMemberSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Invalid phone number." }),
  degree: z.string().min(2, { message: "Degree is required." }),
  department: z.string().min(2, { message: "Department is required." }),
  yearOfStudy: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Year of study is required.",
  }),
});

const formSchema = z.object({
  startupName: z
    .string()
    .min(2, { message: "Startup name must be at least 2 characters." }),
  collegeName: z.string().min(2, { message: "College name is required." }),
  collegeEmail: z.string().email({ message: "Invalid email address." }),
  collegePhone: z.string().min(10, { message: "Invalid phone number." }),
  sameInstitution: z.enum(["yes", "no"], {
    required_error:
      "Please select if all team members are from the same institution.",
  }),
  memberCount: z.string().refine((val) => ["3", "4"].includes(val), {
    message: "Please select either 3 or 4 team members.",
  }),
  teamMembers: z
    .array(teamMemberSchema)
    .min(3, { message: "At least three team members are required." })
    .max(4, { message: "Maximum 4 team members allowed." }),
  sdg: z
    .string()
    .min(2, { message: "Sustainable Development Goal is required." }),
  problemStatement: z
    .string()
    .max(100, { message: "Problem statement should not exceed 100 words." })
    .describe("textarea"),
  solution: z
    .string()
    .max(100, { message: "Solution should not exceed 100 words." })
    .describe("textarea"),
});

export type FormValues = z.infer<typeof formSchema>;

export default function StartupCafeForm({
  onPaymentBtnOpen,
}: {
  onPaymentBtnOpen: (value: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberCount: "3",
      teamMembers: [{}, {}, {}],
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
    const isValid = await form.trigger(fields);
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
          "startupName",
          "collegeName",
          "collegeEmail",
          "collegePhone",
          "sameInstitution",
        ];
      case 2:
        return ["memberCount", "teamMembers"];
      case 3:
        return ["sdg", "problemStatement", "solution"];
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
          degree: "",
          department: "",
          yearOfStudy: "1",
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
      apiCreateStartupCafeProject({
        paymentId,
        ...form.getValues(),
      }),
      {
        loading: "Creating...",
        success: () => {
          window.location.reload();
          return "Application submitted successfully!!"
        },
        error: () => "Failed to submit your application",
      }
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-2">Startup Cafe Application</h1>
      <TypographyP className="!mt-0 mb-4">
        You need to pay Rs.625/-(including all taxes) at the time of submission of
        your applications
      </TypographyP>
      <FormStepper currentStep={step} totalSteps={totalSteps} />

      <FormLayout form={form}>
        {step === 1 && (
          <div className="space-y-4">
            <TextInput
              name="startupName"
              label="Startup Cafe (Student Team)"
              placeholder="Enter startup name"
              description="The name of your student startup team"
            />
            <TextInput
              name="collegeName"
              label="College Name"
              placeholder="Enter your college name"
            />
            <TextInput
              name="collegeEmail"
              label="College Email ID"
              placeholder="Enter your college email"
              description="Official email address of the college"
            />
            <TextInput
              name="collegePhone"
              label="College Phone Number"
              placeholder="Enter your college phone number"
            />
            <RadioInput
              name="sameInstitution"
              label="Are All the Team Members from Same Institution?"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              description="Indicate if all team members are from the same college"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <RadioInput
              name="memberCount"
              label="Number of Team Members"
              options={[
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
            <TextInput
              name="sdg"
              label="Under which Sustainable Development Goal does your Idea Apply to?"
              placeholder="Enter your Sustainable Development Goal"
              description="Specify the Sustainable Development Goal that aligns with your idea"
            />
            <TextareaInput
              name="problemStatement"
              label="Problem Statement (Not more than 100 words)"
              placeholder="Describe the problem you're addressing"
              description="Clearly state the problem your startup aims to solve"
            />
            <TextareaInput
              name="solution"
              label="Solution (Not more than 100 words)"
              placeholder="Describe your proposed solution"
              description="Briefly explain your innovative solution to the stated problem"
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
            name: "Startup Cafe Prototyping Hackathon",
          }}
        />
      </FormLayout>
    </div>
  );
}
