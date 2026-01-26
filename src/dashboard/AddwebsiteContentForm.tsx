import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../common/Input";
import { useForm } from "react-hook-form";
import z from "zod";
import AddSpeakersModal from "./AddSpeakersModal";
import { useState } from "react";

const AddwebsiteContentFormSchema = z.object({
  BannerTagLine: z.string().min(3, "Banner tagline must be at least 3 characters"),
  AboutArea: z.string().min(3, "About content must be at least 3 characters"),
});

type FormData = z.infer<typeof AddwebsiteContentFormSchema>;

const AddwebsiteContentForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(AddwebsiteContentFormSchema)
  });

  const [speakers, setSpeakers] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const onSubmit = (data: FormData) => {
    console.log({ ...data, speakers });
    reset();
    setSpeakers([]);
  };

  const handleAddOrEditSpeaker = (speakerData: any) => {
    if (editIndex !== null) {
      const updated = [...speakers];
      updated[editIndex] = speakerData;
      setSpeakers(updated);
      setEditIndex(null);
    } else {
      setSpeakers((prev) => [...prev, speakerData]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteSpeaker = (index: number) => {
    setSpeakers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEditSpeaker = (index: number) => {
    setEditIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800 border-b pb-2">Add Website Content</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          type="text"
          Inputname="BannerTagLine"
          placeholder="Banner Tagline"
          register={register}
          error={errors.BannerTagLine}
        />
        <Input
          type="textarea"
          Inputname="AboutArea"
          placeholder="About Section"
          register={register}
          error={errors.AboutArea}
        />

        {/* Speakers Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Speakers</h3>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              <i className="fa fa-plus"></i> Add Speaker
            </button>
          </div>

          {speakers.length > 0 ? (
            <ul className="divide-y divide-gray-200 bg-gray-50 rounded-lg shadow-sm">
              {speakers.map((spk, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center p-3 hover:bg-gray-100 transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">{spk.speakerName}</p>
                    <p className="text-sm text-gray-600">{spk.speakerDesignation}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleEditSpeaker(i)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit Speaker"
                    >
                      <i className="fa fa-pencil"></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSpeaker(i)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Speaker"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">No speakers added yet.</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>

      {isModalOpen && (
        <AddSpeakersModal
          onClose={() => { setIsModalOpen(false); setEditIndex(null); }}
          onSave={handleAddOrEditSpeaker}
          defaultData={editIndex !== null ? speakers[editIndex] : null}
        />
      )}
    </div>
  );
};

export default AddwebsiteContentForm;
