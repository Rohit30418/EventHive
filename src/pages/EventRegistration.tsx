import type { CSSProperties } from "react";
import {
  AlertCircle,
  BadgeCheck,
  Briefcase,
  Calendar,
  Check,
  ImagePlus,
  Loader2,
  Mail,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TicketCheck,
  UploadCloud,
  User,
  X,
} from "lucide-react";
import StyledInput from "./event-registration/StyledInput";
import useEventRegistrationForm from "./event-registration/useEventRegistrationForm";
import { hexToRgba, interestsList, trustPoints } from "./event-registration/presentation";

interface EventRegistrationProps {
  primaryColor?: string;
  secondaryColor?: string;
}

const EventRegistration = ({
  primaryColor = "#4F46E5",
  secondaryColor = "#06B6D4",
}: EventRegistrationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    photoBase64,
    isSubmitting,
    serverError,
    handlePhotoChange,
    clearPhoto,
    onSubmit,
  } = useEventRegistrationForm();

  const gradientStyle = {
    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
  };

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:py-24">
      <div
        className="absolute -left-32 top-10 h-[30rem] w-[30rem] rounded-full blur-[130px]"
        style={{
          backgroundColor: hexToRgba(primaryColor, 0.12),
        }}
      />

      <div
        className="absolute -right-32 bottom-10 h-[30rem] w-[30rem] rounded-full blur-[130px]"
        style={{
          backgroundColor: hexToRgba(secondaryColor, 0.12),
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.2em] shadow-sm"
            style={{ color: primaryColor }}
          >
            <ShieldCheck size={14} />
            Secure Registration
          </span>

          <h2 className="mt-5 text-4xl font-black  text-slate-950 sm:text-5xl">
            Reserve your seat in a few simple steps.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
            Submit your attendee details. Your photo helps create a clean event
            identity and badge experience.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          {/* Left Info Panel */}
          <aside className="relative overflow-hidden rounded-[2.2rem] bg-slate-950 p-7 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] lg:sticky lg:top-24 lg:h-fit">
            <div
              className="absolute -right-20 -top-20 h-72 w-72 rounded-full blur-[100px]"
              style={{
                backgroundColor: hexToRgba(primaryColor, 0.45),
              }}
            />

            <div
              className="absolute -bottom-24 left-0 h-72 w-72 rounded-full blur-[100px]"
              style={{
                backgroundColor: hexToRgba(secondaryColor, 0.32),
              }}
            />

            <div className="relative z-10">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl">
                <TicketCheck size={26} />
              </div>

              <h3 className="text-3xl font-black tracking-tight">
                Your event pass starts here.
              </h3>

              <p className="mt-4 text-sm font-medium leading-7 text-slate-300">
                Complete this form carefully. These details can be used for
                attendee verification, registration records and event badge
                generation.
              </p>

              <div className="mt-8 space-y-3">
                {trustPoints.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl"
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
                      style={gradientStyle}
                    >
                      <Check size={16} />
                    </span>

                    <span className="text-sm font-bold text-slate-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                <div className="mb-3 flex items-center gap-2 text-cyan-100">
                  <Sparkles size={16} />
                  <span className="text-xs font-black uppercase tracking-[0.18em]">
                    Helpful tip
                  </span>
                </div>

                <p className="text-sm font-medium leading-7 text-slate-300">
                  Use a clear front-facing photo. This improves badge visibility
                  and check-in verification.
                </p>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div className="h-2 w-full" style={gradientStyle} />

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 p-5 sm:p-7 lg:p-9"
            >
              {serverError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
                  <div className="flex gap-3">
                    <AlertCircle size={18} className="shrink-0" />
                    {serverError}
                  </div>
                </div>
              )}

              <section className="rounded-[1.7rem] border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-white"
                    style={gradientStyle}
                  >
                    <User size={20} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-950">
                      Personal Information
                    </h3>
                    <p className="text-sm font-medium text-slate-500">
                      Basic attendee details for registration.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <StyledInput
                    label="Full Name"
                    name="fullName"
                    placeholder="Jane Doe"
                    register={register}
                    error={errors.fullName}
                    icon={User}
                    primaryColor={primaryColor}
                  />

                  <StyledInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    register={register}
                    error={errors.email}
                    icon={Mail}
                    primaryColor={primaryColor}
                  />

                  <StyledInput
                    label="Mobile Number"
                    name="mobile"
                    placeholder="9876543210"
                    register={register}
                    error={errors.mobile}
                    icon={Smartphone}
                    primaryColor={primaryColor}
                  />

                  <StyledInput
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    register={register}
                    error={errors.dob}
                    icon={Calendar}
                    primaryColor={primaryColor}
                  />
                </div>
              </section>

              <section className="rounded-[1.7rem] border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-white"
                    style={gradientStyle}
                  >
                    <Briefcase size={20} />
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-950">
                      Professional Details
                    </h3>
                    <p className="text-sm font-medium text-slate-500">
                      Helps us personalize your event experience.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <StyledInput
                    label="Designation / Role"
                    name="designation"
                    placeholder="Product Designer"
                    register={register}
                    error={errors.designation}
                    icon={Briefcase}
                    primaryColor={primaryColor}
                  />

                  <div className="space-y-2">
                    <label className="ml-1 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                      Gender
                    </label>

                    <div className="grid grid-cols-3 gap-3">
                      {["male", "female", "others"].map((gender) => (
                        <label key={gender} className="cursor-pointer">
                          <input
                            type="radio"
                            value={gender}
                            {...register("gender")}
                            className="peer sr-only"
                          />

                          <div
                            className="rounded-2xl border border-slate-200 bg-white py-4 text-center text-sm font-black capitalize text-slate-500 transition-all peer-checked:text-white"
                            style={
                              {
                                "--checked-bg": `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                              } as CSSProperties
                            }
                          >
                            <span className="peer-checked:hidden">{gender}</span>
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {["male", "female", "others"].map((gender) => (
                        <label key={`styled-${gender}`} className="-mt-[68px] cursor-pointer">
                          <input
                            type="radio"
                            value={gender}
                            {...register("gender")}
                            className="peer sr-only"
                          />

                          <div
                            className="rounded-2xl border border-slate-200 bg-white py-4 text-center text-sm font-black capitalize text-slate-500 transition-all peer-checked:border-transparent peer-checked:text-white"
                            style={
                              document
                                ? {
                                    background:
                                      errors.gender ? undefined : undefined,
                                  }
                                : undefined
                            }
                          >
                            <span
                              className="block rounded-none peer-checked:text-white"
                              style={{}}
                            >
                              {gender}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>

                    {errors.gender && (
                      <p className="ml-1 text-xs font-bold text-red-500">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="space-y-2 lg:col-span-5">
                  <label className="ml-1 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                    Profile Photo
                  </label>

                  <div
                    className={`relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-[1.7rem] border-2 border-dashed transition-all ${
                      errors.photo
                        ? "border-red-300 bg-red-50"
                        : "border-slate-300 bg-slate-50 hover:bg-white"
                    }`}
                  >
                    {photoBase64 ? (
                      <>
                        <img
                          src={photoBase64}
                          alt="Preview"
                          className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-slate-950/45" />

                        <button
                          type="button"
                          onClick={clearPhoto}
                          className="relative z-10 rounded-full border border-white/40 bg-white/20 p-3 text-white backdrop-blur-md transition-all hover:bg-red-500"
                        >
                          <X size={20} />
                        </button>
                      </>
                    ) : (
                      <>
                        <div
                          className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm"
                          style={{ color: primaryColor }}
                        >
                          <UploadCloud size={30} />
                        </div>

                        <p className="font-black text-slate-800">
                          Upload profile photo
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          Max 2MB · JPG, PNG or WebP
                        </p>

                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 cursor-pointer opacity-0"
                          {...register("photo")}
                          onChange={(e) => {
                            register("photo").onChange(e);
                            handlePhotoChange(e);
                          }}
                        />
                      </>
                    )}
                  </div>

                  {errors.photo && (
                    <p className="ml-1 text-xs font-bold text-red-500">
                      {String(errors.photo.message)}
                    </p>
                  )}
                </div>

                <div className="space-y-2 lg:col-span-7">
                  <label className="ml-1 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                    Areas of Interest
                  </label>

                  <div className="flex min-h-[280px] flex-col justify-center rounded-[1.7rem] border border-slate-200 bg-slate-50 p-6">
                    <div className="mb-5 flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-2xl text-white"
                        style={gradientStyle}
                      >
                        <ImagePlus size={18} />
                      </div>

                      <div>
                        <h4 className="text-base font-black text-slate-950">
                          Select your interests
                        </h4>
                        <p className="text-sm font-medium text-slate-500">
                          Pick at least one category.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {interestsList.map((interest) => (
                        <label key={interest} className="cursor-pointer">
                          <input
                            type="checkbox"
                            value={interest}
                            {...register("interests")}
                            className="peer sr-only"
                          />

                          <span
                            className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-600 shadow-sm transition-all peer-checked:text-white"
                            style={
                              {
                                "--chip-bg": `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                              } as CSSProperties
                            }
                          >
                            {interest}
                          </span>
                        </label>
                      ))}
                    </div>

                    <style>
                      {`
                        input:checked + span {
                          border-color: transparent;
                          background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
                        }

                        input[type="radio"]:checked + div {
                          border-color: transparent;
                          background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
                          color: #ffffff;
                        }
                      `}
                    </style>

                    {errors.interests && (
                      <p className="mt-4 text-xs font-bold text-red-500">
                        {errors.interests.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <section className="border-t border-slate-100 pt-7">
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-slate-50 p-4">
                  <span className="relative mt-0.5 flex items-center">
                    <input
                      type="checkbox"
                      {...register("consent")}
                      className="peer h-5 w-5 appearance-none rounded border border-slate-300 bg-white"
                      style={
                        {
                          "--checked-color": primaryColor,
                        } as CSSProperties
                      }
                    />

                    <Check
                      size={14}
                      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                    />
                  </span>

                  <span className="text-sm leading-6 text-slate-600">
                    I agree to the{" "}
                    <span className="font-black" style={{ color: primaryColor }}>
                      Terms & Conditions
                    </span>{" "}
                    and Privacy Policy.
                  </span>
                </label>

                <style>
                  {`
                    input[type="checkbox"]:checked {
                      border-color: ${primaryColor};
                      background-color: ${primaryColor};
                    }
                  `}
                </style>

                {errors.consent && (
                  <p className="ml-8 mt-2 text-xs font-bold text-red-500">
                    {errors.consent.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-black text-white shadow-xl transition-all hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  style={{
                    ...gradientStyle,
                    boxShadow: `0 18px 44px ${hexToRgba(primaryColor, 0.24)}`,
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <BadgeCheck size={19} />
                    </>
                  )}
                </button>
              </section>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventRegistration;
