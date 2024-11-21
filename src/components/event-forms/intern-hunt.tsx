import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { apiCreateInternHuntProject } from "@/api/events";
import {
  FormStepper,
  FormLayout,
  TextInput,
  RadioInput,
  SelectInput,
  TextareaInput,
  FileInput,
  DatePicker,
  FormActions,
} from "@/components/ui/form-components";
import { TypographyP } from "@/components/ui/typography";
import { UploadToCloudinary } from "@/lib/utils";

const startupSchema = z.object({
  startupName: z.string().min(1, "Startup name is required"),
  founderName: z.string().min(1, "Founder name is required"),
  designation: z.string().min(1, "Designation is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Invalid mobile number"),
  website: z.string().url().optional(),
  location: z.string().min(1, "Location is required"),
  industryDomain: z.enum([
    "Technology",
    "Healthcare",
    "Education",
    "E-commerce",
    "Fintech",
    "Social Impact",
    "Manufacturing",
    "Other",
  ]),
  otherIndustryDomain: z.string().optional(),
  internshipRoles: z.array(
    z.enum([
      "Business Development",
      "Marketing & Social Media",
      "Web Development & UI/UX Design",
      "Data Science & Analytics",
      "Finance & Accounting",
      "Operations & Supply Chain",
      "HR & Talent Management",
      "Product Management",
      "Other",
    ])
  ),
  otherInternshipRole: z.string().optional(),
  preferredSkills: z.string().min(1, "Preferred skills are required"),
  internshipPositions: z.number().min(1, "Number of positions is required"),
  internshipDuration: z.enum([
    "Less than 1 month",
    "1-3 months",
    "3-6 months",
    "More than 6 months",
  ]),
  internshipMode: z.enum(["On-site", "Remote", "Hybrid"]),
  stipendDetails: z.string().optional(),
  isPaid: z.enum(["Paid", "Unpaid"]),
});

const studentSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Invalid mobile number"),
  gender: z.enum(["Male", "Female", "Other"]),
  institutionName: z.string().min(1, "Institution name is required"),
  course: z.string().min(1, "Course/Program is required"),
  yearOfStudy: z.enum([
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
    "Other",
  ]),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  preferredDomain: z.enum([
    "Business Development",
    "Marketing & Social Media",
    "Web Development & UI/UX Design",
    "Data Science & Analytics",
    "Finance & Accounting",
    "Operations & Supply Chain",
    "HR & Talent Management",
    "Product Management",
    "Other",
  ]),
  otherPreferredDomain: z.string().optional(),
  preferredInternshipType: z.enum([
    "Virtual Internship",
    "On-site Internship",
    "Both Virtual and On-site",
  ]),
  availability: z.enum([
    "Full-time (3 months or more)",
    "Part-time (3-6 months)",
    "Short-term (1-3 months)",
    "Long Term (More than 6 Months)",
  ]),
  openToUnpaid: z.enum([
    "Yes",
    "No",
    "Open to both paid and unpaid internships",
  ]),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  otherSkills: z.string().optional(),
  previousExperience: z.string().optional(),
  resume: z.string().url().optional(),
  participationReason: z.string().min(1, "Participation reason is required"),
  preferredStartupType: z.enum([
    "Technology",
    "Healthcare",
    "E-commerce",
    "Fintech",
    "Social Impact",
    "Manufacturing",
    "Education",
    "Other",
  ]),
  otherPreferredStartupType: z.string().optional(),
});

const formSchema = z.discriminatedUnion("userType", [
  z.object({ userType: z.literal("startup"), ...startupSchema.shape }),
  z.object({ userType: z.literal("student"), ...studentSchema.shape }),
]);

export type FormValues = z.infer<typeof formSchema>;

export default function InternHuntForm({
  onPaymentBtnOpen,
}: {
  onPaymentBtnOpen: (value: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userType: "startup",
    },
  });

  const userType = form.watch("userType");
  const totalSteps = userType === "startup" ? 3 : 4;

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

  const getFieldsForStep = (step: number) => {
    if (step === 1) return ["userType"];

    if (userType === "startup") {
      if (step === 2) {
        return [
          "startupName",
          "founderName",
          "designation",
          "email",
          "mobile",
          "website",
          "location",
          "industryDomain",
          "otherIndustryDomain",
        ];
      } else if (step === 3) {
        return [
          "internshipRoles",
          "otherInternshipRole",
          "preferredSkills",
          "internshipPositions",
          "internshipDuration",
          "internshipMode",
          "stipendDetails",
          "isPaid",
        ];
      }
    } else {
      if (step === 2) {
        return [
          "fullName",
          "email",
          "mobile",
          "gender",
          "institutionName",
          "course",
          "yearOfStudy",
          "dateOfBirth",
        ];
      } else if (step === 3) {
        return [
          "preferredDomain",
          "otherPreferredDomain",
          "preferredInternshipType",
          "availability",
          "openToUnpaid",
        ];
      } else if (step === 4) {
        return [
          "skills",
          "otherSkills",
          "previousExperience",
          "resume",
          "participationReason",
          "preferredStartupType",
          "otherPreferredStartupType",
        ];
      }
    }
    return [];
  };

  function handleSubmit(paymentId: string) {
    toast.promise(
      apiCreateInternHuntProject({
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
      <h1 className="text-3xl font-bold mb-2">Intern Hunt Application</h1>
      <TypographyP className="!mt-0 mb-4">
        You need to pay Rs.625/-(including all taxes) at the time of submission
        of your applications
      </TypographyP>
      <FormStepper currentStep={step} totalSteps={totalSteps} />
      <FormLayout form={form}>
        {step === 1 && (
          <RadioInput
            name="userType"
            label="Are you a"
            options={[
              { value: "startup", label: "Startup looking for Interns" },
              {
                value: "student",
                label:
                  "Student looking for Internship Opportunities in Startups",
              },
            ]}
          />
        )}

        {userType === "startup" && step === 2 && (
          <div className="space-y-4">
            <TextInput
              name="startupName"
              label="Startup Name"
              placeholder="Enter startup name"
            />
            <TextInput
              name="founderName"
              label="Founder/Representative Name"
              placeholder="Enter founder name"
            />
            <TextInput
              name="designation"
              label="Designation of Representative"
              placeholder="Enter designation"
            />
            <TextInput
              name="email"
              label="Email Address"
              placeholder="Enter email address"
            />
            <TextInput
              name="mobile"
              label="Mobile Number"
              placeholder="Enter mobile number"
            />
            <TextInput
              name="website"
              label="Startup Website"
              placeholder="Enter website URL (optional)"
            />
            <TextInput
              name="location"
              label="Startup Location"
              placeholder="Enter city/state"
            />
            <SelectInput
              name="industryDomain"
              label="Industry Domain"
              options={[
                { value: "Technology", label: "Technology" },
                { value: "Healthcare", label: "Healthcare" },
                { value: "Education", label: "Education" },
                { value: "E-commerce", label: "E-commerce" },
                { value: "Fintech", label: "Fintech" },
                { value: "Social Impact", label: "Social Impact" },
                { value: "Manufacturing", label: "Manufacturing" },
                { value: "Other", label: "Other" },
              ]}
            />
            {form.watch("industryDomain") === "Other" && (
              <TextInput
                name="otherIndustryDomain"
                label="Other Industry Domain"
                placeholder="Please specify"
              />
            )}
          </div>
        )}

        {userType === "startup" && step === 3 && (
          <div className="space-y-4">
            <SelectInput
              name="internshipRoles"
              label="Internship Role(s) Offered"
              options={[
                {
                  value: "Business Development",
                  label: "Business Development",
                },
                {
                  value: "Marketing & Social Media",
                  label: "Marketing & Social Media",
                },
                {
                  value: "Web Development & UI/UX Design",
                  label: "Web Development & UI/UX Design",
                },
                {
                  value: "Data Science & Analytics",
                  label: "Data Science & Analytics",
                },
                {
                  value: "Finance & Accounting",
                  label: "Finance & Accounting",
                },
                {
                  value: "Operations & Supply Chain",
                  label: "Operations & Supply Chain",
                },
                {
                  value: "HR & Talent Management",
                  label: "HR & Talent Management",
                },
                { value: "Product Management", label: "Product Management" },
                { value: "Other", label: "Other" },
              ]}
            />
            {form.watch("internshipRoles")?.includes("Other") && (
              <TextInput
                name="otherInternshipRole"
                label="Other Internship Role"
                placeholder="Please specify"
              />
            )}
            <TextareaInput
              name="preferredSkills"
              label="Preferred Skills for Interns"
              placeholder="Enter preferred skills"
            />
            <TextInput
              name="internshipPositions"
              label="Number of Internship Positions Available"
              placeholder="Enter number of positions"
            />
            <SelectInput
              name="internshipDuration"
              label="Duration of Internship"
              options={[
                { value: "Less than 1 month", label: "Less than 1 month" },
                { value: "1-3 months", label: "1-3 months" },
                { value: "3-6 months", label: "3-6 months" },
                { value: "More than 6 months", label: "More than 6 months" },
              ]}
            />
            <RadioInput
              name="internshipMode"
              label="Internship Mode"
              options={[
                { value: "On-site", label: "On-site" },
                { value: "Remote", label: "Remote" },
                { value: "Hybrid", label: "Hybrid" },
              ]}
            />
            <TextareaInput
              name="stipendDetails"
              label="Stipend Details (if applicable)"
              placeholder="Enter stipend details"
            />
            <RadioInput
              name="isPaid"
              label="Is the internship paid or unpaid?"
              options={[
                { value: "Paid", label: "Paid" },
                { value: "Unpaid", label: "Unpaid" },
              ]}
            />
          </div>
        )}

        {userType === "student" && step === 2 && (
          <div className="space-y-4">
            <TextInput
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
            />
            <TextInput
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
            />
            <TextInput
              name="mobile"
              label="Mobile Number"
              placeholder="Enter your mobile number"
            />
            <RadioInput
              name="gender"
              label="Gender"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
            />
            <TextInput
              name="institutionName"
              label="Institution Name"
              placeholder="Enter your institution name"
            />
            <TextInput
              name="course"
              label="Course/Program"
              placeholder="Enter your course/program"
            />
            <SelectInput
              name="yearOfStudy"
              label="Year of Study"
              options={[
                { value: "1st Year", label: "1st Year" },
                { value: "2nd Year", label: "2nd Year" },
                { value: "3rd Year", label: "3rd Year" },
                { value: "4th Year", label: "4th Year" },
                { value: "Other", label: "Other" },
              ]}
            />
            <DatePicker
              name="dateOfBirth"
              label="Date of Birth"
              placeholder="Select date of birth"
              onChange={(date) =>
                form.setValue("dateOfBirth", date ? date.toISOString() : "")
              }
            />
          </div>
        )}

        {userType === "student" && step === 3 && (
          <div className="space-y-4">
            <SelectInput
              name="preferredDomain"
              label="Preferred Internship Domain"
              options={[
                {
                  value: "Business Development",
                  label: "Business Development",
                },
                {
                  value: "Marketing & Social Media",
                  label: "Marketing & Social Media",
                },
                {
                  value: "Web Development & UI/UX Design",
                  label: "Web Development & UI/UX Design",
                },
                {
                  value: "Data Science & Analytics",
                  label: "Data Science & Analytics",
                },
                {
                  value: "Finance & Accounting",
                  label: "Finance & Accounting",
                },
                {
                  value: "Operations & Supply Chain",
                  label: "Operations & Supply Chain",
                },
                {
                  value: "HR & Talent Management",
                  label: "HR & Talent Management",
                },
                { value: "Product Management", label: "Product Management" },
                { value: "Other", label: "Other" },
              ]}
            />
            {form.watch("preferredDomain") === "Other" && (
              <TextInput
                name="otherPreferredDomain"
                label="Other Preferred Domain"
                placeholder="Please specify"
              />
            )}
            <RadioInput
              name="preferredInternshipType"
              label="Preferred Type of Internship"
              options={[
                { value: "Virtual Internship", label: "Virtual Internship" },
                { value: "On-site Internship", label: "On-site Internship" },
                {
                  value: "Both Virtual and On-site",
                  label: "Both Virtual and On-site",
                },
              ]}
            />
            <SelectInput
              name="availability"
              label="Availability for Internship"
              options={[
                {
                  value: "Full-time (3 months or more)",
                  label: "Full-time (3 months or more)",
                },
                {
                  value: "Part-time (3-6 months)",
                  label: "Part-time (3-6 months)",
                },
                {
                  value: "Short-term (1-3 months)",
                  label: "Short-term (1-3 months)",
                },
                {
                  value: "Long Term (More than 6 Months)",
                  label: "Long Term (More than 6 Months)",
                },
              ]}
            />
            <RadioInput
              name="openToUnpaid"
              label="Are you open to an unpaid internship?"
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
                {
                  value: "Open to both paid and unpaid internships",
                  label: "Open to both paid and unpaid internships",
                },
              ]}
            />
          </div>
        )}

        {userType === "student" && step === 4 && (
          <div className="space-y-4">
            <SelectInput
              name="skills"
              label="Skills and Areas of Expertise"
              options={[
                { value: "Communication", label: "Communication" },
                { value: "Graphic Design", label: "Graphic Design" },
                { value: "Project Management", label: "Project Management" },
                {
                  value: "Programming",
                  label: "Programming (e.g., Python, JavaScript)",
                },
                { value: "Data Analysis", label: "Data Analysis" },
                { value: "Content Creation", label: "Content Creation" },
                {
                  value: "Social Media Marketing",
                  label: "Social Media Marketing",
                },
                { value: "Financial Analysis", label: "Financial Analysis" },
                {
                  value: "Research & Development",
                  label: "Research & Development",
                },
                { value: "Other", label: "Other" },
              ]}
            />
            {form.watch("skills")?.includes("Other") && (
              <TextInput
                name="otherSkills"
                label="Other Skills"
                placeholder="Please specify"
              />
            )}
            <TextareaInput
              name="previousExperience"
              label="Previous Internship Experience (if any)"
              placeholder="Describe your previous internship experience"
            />
            <FileInput
              name="resume"
              label="Resume or Portfolio (Optional)"
              accept=".pdf"
              description="Upload your institution bonafide certificate (PDF only, max 5MB)"
              onFileSelect={async (file) => {
                const { success, url } = await UploadToCloudinary(file);
                if (success) {
                  form.setValue("resume", url!);
                  toast.success("Resume uploaded successfully");
                } else {
                  toast.error("Failed to upload resume");
                }
              }}
            />
            <TextareaInput
              name="participationReason"
              label="Why are you interested in participating in the Startup Internship Hunt?"
              placeholder="Enter your reason for participation"
            />
            <SelectInput
              name="preferredStartupType"
              label="Preferred Type of Startup"
              options={[
                { value: "Technology", label: "Technology" },
                { value: "Healthcare", label: "Healthcare" },
                { value: "E-commerce", label: "E-commerce" },
                { value: "Fintech", label: "Fintech" },
                { value: "Social Impact", label: "Social Impact" },
                { value: "Manufacturing", label: "Manufacturing" },
                { value: "Education", label: "Education" },
                { value: "Other", label: "Other" },
              ]}
            />
            {form.watch("preferredStartupType") === "Other" && (
              <TextInput
                name="otherPreferredStartupType"
                label="Other Preferred Startup Type"
                placeholder="Please specify"
              />
            )}
          </div>
        )}

        <FormActions
          currentStep={step}
          totalSteps={totalSteps}
          onPrevious={prevStep}
          onNext={nextStep}
          onOpen={onPaymentBtnOpen}
          callbackFn={handleSubmit}
          event={{ amount: "625", name: "Startup Internship Hunt" }}
        />
      </FormLayout>
    </div>
  );
}
