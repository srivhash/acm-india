// components/PhDClinicForm.js
import { useState } from 'react';

const PhDClinicForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    affiliation: '',
    researchProblem: '',
    feedback: '',
    mentor: '',
    attendedBefore: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to the server
    console.log('Form data:', formData);

    const response = await fetch('/api/submitForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log('Result:', result);

    if (response.ok) {
      alert('Form submitted successfully');
    } else {
      alert('Failed to submit form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Your name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div> */}

      <div>
        <label>Your affiliation? Where your Ph.D. is registered?</label>
        <input
          type="text"
          name="affiliation"
          value={formData.affiliation}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Research problem that you are working on or interested in working?</label>
        <textarea
          name="researchProblem"
          value={formData.researchProblem}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>What specific feedback are you looking for in the Clinic?</label>
        <textarea
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Mentor that you would like to interact with?</label>
        <input
          type="text"
          name="mentor"
          value={formData.mentor}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>How many times have you attended #PhDClinic before?</label>
        <select
          name="attendedBefore"
          value={formData.attendedBefore}
          onChange={handleChange}
          required
        >
          <option value="">Select an option</option>
          <option value="Attending for the 1st time">Attending for the 1st time</option>
          <option value="Attending for the 2nd time">Attending for the 2nd time</option>
          <option value="Attending for the 3rd time">Attending for the 3rd time</option>
          <option value="More than thrice">More than thrice</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PhDClinicForm;