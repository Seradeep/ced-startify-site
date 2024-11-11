import { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  FormStepper,
  FormLayout,
  TextInput,
  RadioInput,
  TextareaInput,
  FormActions,
  ReviewSection,
  SelectInput,
  MemberDetails,
} from "@/components/ui/form-components";

const teamMemberSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Invalid phone number." }),
  degree: z.string().min(2, { message: "Degree is required." }),
  department: z.string().min(2, { message: "Department is required." }),
  yearOfStudy: z.enum(["1", "2", "3", "4"], {
    required_error: "Year of study is required.",
  }),
  bio: z.string().min(10).max(200).describe("textarea"),
});

const formSchema = z.object({
  startupName: z
    .string()
    .min(2, { message: "Startup name must be at least 2 characters." }),
  collegeName: z.string().min(2, { message: "College name is required." }),
  collegeDistrict: z
    .string()
    .min(2, { message: "College district is required." }),
  collegeEmail: z.string().email({ message: "Invalid email address." }),
  collegePhone: z.string().min(10, { message: "Invalid phone number." }),
  sameInstitution: z.enum(["yes", "no"], {
    required_error:
      "Please select if all team members are from the same institution.",
  }),
  memberCount: z
    .string()
    .min(1, { message: "Please select the number of team members." }),
  teamMembers: z
    .array(teamMemberSchema)
    .min(1, { message: "At least one team member is required." })
    .max(3, { message: "Maximum 3 team members allowed." }),
  sdg: z.string().min(2, { message: "SDG is required." }),
  problemStatement: z
    .string()
    .max(100, { message: "Problem statement should not exceed 100 words." })
    .describe("textarea"),
  solution: z
    .string()
    .max(100, { message: "Solution should not exceed 100 words." })
    .describe("textarea"),
});

type FormValues = z.infer<typeof formSchema>;

export default function StartupCafeForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberCount: "1",
      teamMembers: [{}],
    },
  });

  const { fields: members } = useFieldArray({
    name: "teamMembers",
    control: form.control,
  });

  // function onSubmit(values: FormValues) {
  //   console.log(values);
  //   alert("Form submitted successfully!");
  // }

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
          "collegeDistrict",
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
        form.setValue(`teamMembers.${i}`, {
          name: "",
          email: "",
          phone: "",
          degree: "",
          department: "",
          yearOfStudy: "1",
          bio: "",
        });
      }
    } else if (memberCount < currentMembers) {
      for (let i = currentMembers - 1; i >= memberCount; i--) {
        form.unregister(`teamMembers.${i}`);
      }
    }
  }, [form.watch("memberCount")]);

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6">Startup Cafe Application</h1>
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
              label="College Name (Team Leader Institution)"
              placeholder="Enter college name"
              description="The name of the institution of the team leader"
            />
            <TextInput
              name="collegeDistrict"
              label="College District"
              placeholder="Enter college district"
            />
            <TextInput
              name="collegeEmail"
              label="College Email ID"
              placeholder="Enter college email"
              description="Official email address of the college"
            />
            <TextInput
              name="collegePhone"
              label="College Phone Number"
              placeholder="Enter college phone number"
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
            <SelectInput
              name="memberCount"
              label="Number of Team Members"
              options={[
                { value: "1", label: "1 Member" },
                { value: "2", label: "2 Members" },
                { value: "3", label: "3 Members" },
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

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Review and Submit</h2>
            <p className="text-muted-foreground mb-4">
              Please review your application before submitting. If you need to
              make changes, use the "Previous" button to go back to the relevant
              section.
            </p>

            <ReviewSection
              title="Startup Information"
              data={{
                "Startup Name": form.getValues("startupName"),
                "College Name": form.getValues("collegeName"),
                "College District": form.getValues("collegeDistrict"),
                "College Email": form.getValues("collegeEmail"),
                "College Phone": form.getValues("collegePhone"),
                "Same Institution": form.getValues("sameInstitution"),
              }}
            />

            <ReviewSection
              title="Team Members"
              data={form
                .getValues("teamMembers")
                .reduce((acc: Record<string, string>, member, index) => {
                  acc[`Member ${index + 1}`] =
                    `${member.name} (${member.email})`;
                  return acc;
                }, {})}
            />

            <ReviewSection
              title="Project Details"
              data={{
                "Sustainable Development Goal": form.getValues("sdg"),
                "Problem Statement": form.getValues("problemStatement"),
                Solution: form.getValues("solution"),
              }}
              className="sm:grid-cols-1"
            />
          </div>
        )}

        <FormActions
          currentStep={step}
          totalSteps={totalSteps}
          onPrevious={prevStep}
          onNext={nextStep}
        />
      </FormLayout>
    </div>
  );
}
