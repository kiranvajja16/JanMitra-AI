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
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Scheme Name */}
      <div>
        <label className="block mb-2 font-medium">Scheme Name</label>
        <input
          type="text"
          name="schemeName"
          value={formData.schemeName}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="Enter Scheme Name"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-2 font-medium">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="Agriculture, Health, Education..."
          required
        />
      </div>

      {/* State */}
      <div>
        <label className="block mb-2 font-medium">State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Maximum Income */}
      <div>
        <label className="block mb-2 font-medium">Maximum Income</label>
        <input
          type="number"
          name="maxIncome"
          value={formData.eligibility.maxIncome}
          onChange={handleEligibilityChange}
          className="w-full border rounded-lg p-3"
          placeholder="500000"
        />
      </div>

      {/* Minimum Age */}
      <div>
        <label className="block mb-2 font-medium">Minimum Age</label>
        <input
          type="number"
          name="minAge"
          value={formData.eligibility.minAge}
          onChange={handleEligibilityChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Maximum Age */}
      <div>
        <label className="block mb-2 font-medium">Maximum Age</label>
        <input
          type="number"
          name="maxAge"
          value={formData.eligibility.maxAge}
          onChange={handleEligibilityChange}
          className="w-full border rounded-lg p-3"
        />
      </div>

      {/* Occupation */}
      <div>
        <label className="block mb-2 font-medium">Occupation</label>
        <input
          type="text"
          name="occupation"
          value={formData.eligibility.occupation}
          onChange={handleEligibilityChange}
          className="w-full border rounded-lg p-3"
          placeholder="Farmer"
        />
      </div>

      {/* Education */}
      <div>
        <label className="block mb-2 font-medium">Education</label>
        <input
          type="text"
          name="education"
          value={formData.eligibility.education}
          onChange={handleEligibilityChange}
          className="w-full border rounded-lg p-3"
          placeholder="Graduate"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block mb-2 font-medium">Gender</label>
        <select
          name="gender"
          value={formData.eligibility.gender}
          onChange={handleEligibilityChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="Any">Any</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Eligibility Category */}
      <div>
        <label className="block mb-2 font-medium">
          Eligibility Category
        </label>
        <select
          name="category"
          value={formData.eligibility.category}
          onChange={handleEligibilityChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="Any">Any</option>
          <option value="General">General</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
        </select>
      </div>

      {/* Official Link */}
      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">Official Link</label>
        <input
          type="url"
          name="officialLink"
          value={formData.officialLink}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          placeholder="https://..."
        />
      </div>

      {/* Description */}
      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-lg p-3"
          placeholder="Enter scheme description..."
          required
        />
      </div>

      {/* Benefits */}
      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">
          Benefits (Comma Separated)
        </label>
        <textarea
          name="benefits"
          value={formData.benefits}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-lg p-3"
          placeholder="Benefit 1, Benefit 2, Benefit 3"
        />
      </div>

      {/* Required Documents */}
      <div className="md:col-span-2">
        <label className="block mb-2 font-medium">
          Required Documents (Comma Separated)
        </label>
        <textarea
          name="requiredDocuments"
          value={formData.requiredDocuments}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-lg p-3"
          placeholder="Aadhaar, Income Certificate, Bank Passbook"
        />
      </div>

      {/* Submit */}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default SchemeForm;