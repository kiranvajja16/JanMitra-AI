import GlassButton from "./GlassButton";
import GlassInput from "./GlassInput";
import GlassSelect from "./GlassSelect";
import GlassTextarea from "./GlassTextarea";

const labelClass =
  "block mb-2 text-sm font-semibold text-white tracking-wide";

const sectionTitle =
  "text-2xl font-bold text-cyan-400 mb-6 border-b border-white/20 pb-3";

const SchemeForm = ({
  formData,
  handleChange,
  handleEligibilityChange,
  handleSubmit,
  submitText = "Save Scheme",
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10"
    >

      {/* ================= BASIC INFORMATION ================= */}

      <div
        className="
          bg-white/5
          border
          border-white/20
          rounded-2xl
          backdrop-blur-xl
          p-8
        "
      >
        <h2 className={sectionTitle}>
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className={labelClass}>
              Scheme Name
            </label>

            <GlassInput
              type="text"
              name="schemeName"
              value={formData.schemeName}
              onChange={handleChange}
              placeholder="Enter Scheme Name"
              required
            />
          </div>

          <div>
            <label className={labelClass}>
              Category
            </label>

            <GlassInput
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Agriculture, Health, Education..."
              required
            />
          </div>

          <div>
            <label className={labelClass}>
              State
            </label>

            <GlassInput
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={labelClass}>
              Official Website
            </label>

            <GlassInput
              type="url"
              name="officialLink"
              value={formData.officialLink}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

        </div>
      </div>

      {/* ================= ELIGIBILITY ================= */}

      <div
        className="
          bg-white/5
          border
          border-white/20
          rounded-2xl
          backdrop-blur-xl
          p-8
        "
      >
        <h2 className={sectionTitle}>
          Eligibility Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
            <label className={labelClass}>
              Minimum Age
            </label>

            <GlassInput
              type="number"
              name="minAge"
              value={formData.eligibility.minAge}
              onChange={handleEligibilityChange}
              placeholder="18"
            />
          </div>

          <div>
            <label className={labelClass}>
              Maximum Age
            </label>

            <GlassInput
              type="number"
              name="maxAge"
              value={formData.eligibility.maxAge}
              onChange={handleEligibilityChange}
              placeholder="60"
            />
          </div>

          <div>
            <label className={labelClass}>
              Maximum Annual Income
            </label>

            <GlassInput
              type="number"
              name="maxIncome"
              value={formData.eligibility.maxIncome}
              onChange={handleEligibilityChange}
              placeholder="500000"
            />
          </div>

          <div>
            <label className={labelClass}>
              Gender
            </label>

            <GlassSelect
              name="gender"
              value={formData.eligibility.gender}
              onChange={handleEligibilityChange}
            >
              <option value="Any" className="text-black">
                Any
              </option>

              <option value="Male" className="text-black">
                Male
              </option>

              <option value="Female" className="text-black">
                Female
              </option>
            </GlassSelect>
          </div>

          <div>
            <label className={labelClass}>
              Occupation
            </label>

            <GlassInput
              type="text"
              name="occupation"
              value={formData.eligibility.occupation}
              onChange={handleEligibilityChange}
              placeholder="Farmer, Student, Employee..."
            />
          </div>

          <div>
            <label className={labelClass}>
              Education
            </label>

            <GlassInput
              type="text"
              name="education"
              value={formData.eligibility.education}
              onChange={handleEligibilityChange}
              placeholder="Graduate"
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>
              Category
            </label>

            <GlassSelect
              name="category"
              value={formData.eligibility.category}
              onChange={handleEligibilityChange}
            >
              <option value="Any" className="text-black">
                Any
              </option>

              <option value="General" className="text-black">
                General
              </option>

              <option value="OBC" className="text-black">
                OBC
              </option>

              <option value="SC" className="text-black">
                SC
              </option>

              <option value="ST" className="text-black">
                ST
              </option>
            </GlassSelect>
          </div>

        </div>

      </div>

      {/* ================= SCHEME DETAILS ================= */}

      <div
        className="
          bg-white/5
          border
          border-white/20
          rounded-2xl
          backdrop-blur-xl
          p-8
        "
      >
        <h2 className={sectionTitle}>
          Scheme Details
        </h2>

        <div className="space-y-6">
                    <div>
            <label className={labelClass}>
              Description
            </label>

            <GlassTextarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Enter detailed description of the government scheme..."
              required
            />
          </div>

          <div>
            <label className={labelClass}>
              Benefits (Comma Separated)
            </label>

            <GlassTextarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              rows={4}
              placeholder="Financial Assistance, Free Training, Insurance Coverage"
            />
          </div>

          <div>
            <label className={labelClass}>
              Required Documents (Comma Separated)
            </label>

            <GlassTextarea
              name="requiredDocuments"
              value={formData.requiredDocuments}
              onChange={handleChange}
              rows={4}
              placeholder="Aadhaar Card, Income Certificate, Bank Passbook"
            />
          </div>
        </div>
      </div>

      {/* ================= SUBMIT BUTTON ================= */}

      <div className="flex justify-center pt-2">

        <GlassButton
          type="submit"
          className="
            w-full
            md:w-auto
            px-16
            py-4
            text-lg
            font-bold
            justify-center
          "
        >
          {submitText}
        </GlassButton>

      </div>

    </form>
  );
};

export default SchemeForm;