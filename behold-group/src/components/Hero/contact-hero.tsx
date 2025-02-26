import React from "react";
// import DefaultLayout from "@/layouts/default";
import ContactForm from "../Contact/contact-form";
import ContactInfo from "../Contact/contact-info";
import { FormErrors } from "@/types/form";
import { Card, CardBody, Button, Image } from "@heroui/react";
import { title, } from "@/components/primitives";

const Contact: React.FC = () => {
    const [formData, setFormData] = React.useState({
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: "",
      message: "",
    });

    // Use FormErrors from form.ts
    const [errors, setErrors] = React.useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const validateForm = (): boolean => {
      const newErrors: FormErrors = {};

      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        newErrors.email = "Invalid email address";
      }

      if (!formData.subject) {
        newErrors.subject = "Please select a subject";
      }

      if (!formData.message.trim()) {
        newErrors.message = "Message is required";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Clear the error for the current field if it exists
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    };

    const handleSelectChange = (value: string) => {
      setFormData((prev) => ({
        ...prev,
        subject: value,
      }));

      // Clear the subject error if it exists
      if (errors.subject) {
        setErrors((prev) => ({
          ...prev,
          subject: undefined,
        }));
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Form submitted:", formData);
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          subject: "",
          message: "",
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const subjects = [
      { value: "digital-transformation", label: "Digital Transformation" },
      { value: "exit-planning", label: "Exit Planning" },
      { value: "business-consulting", label: "Business Consulting" },
      { value: "partnership", label: "Partnership Opportunities" },
      { value: "other", label: "Other" },
    ];

    return (

        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="w-full max-w-7xl">
            <div className="grid md:grid-cols-2 gap-12">
              <ContactInfo />
              <ContactForm
                formData={formData}
                errors={errors}
                isSubmitting={isSubmitting}
                subjects={subjects}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
          <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10">

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className={title({ size: "sm", className: "mb-4" })}>
                    Become a Partner
                  </h2>
                  <p className="text-default-600 mb-4">
                    Interested in exploring partnership opportunities? Let's discuss
                    how we can create value together.
                  </p>
                  <Button color="primary" variant="shadow" size="lg">
                    Start the Conversation
                  </Button>
                </div>
                <div className="flex justify-center items-center">
                  <Image
                    alt="Partnership"
                    src="/api/placeholder/400/200"
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>

         </div>
        </section>

    );
  };

  export default Contact;
