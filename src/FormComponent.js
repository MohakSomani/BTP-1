import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    literacyLevel: '',
    pastExperience: '',
    interests: '',
    skills: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/.netlify/functions/submit', formData);
      alert('Form submitted successfully!');
      setFormData({
        name: '',
        literacyLevel: '',
        pastExperience: '',
        interests: '',
        skills: ''
      });
    } catch (error) {
      alert('Error submitting form');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Career Path Assessment</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </label>

        <label>
          Literacy Level:
          <select
            value={formData.literacyLevel}
            onChange={(e) => setFormData({ ...formData, literacyLevel: e.target.value })}
            required
          >
            <option value="">Select</option>
            <option value="basic">Basic Reading/Writing</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>

        <label>
          Past Experience:
          <textarea
            value={formData.pastExperience}
            onChange={(e) => setFormData({ ...formData, pastExperience: e.target.value })}
            rows="3"
          />
        </label>

        <label>
          Interests:
          <input
            type="text"
            value={formData.interests}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
            required
          />
        </label>

        <label>
          Skills:
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          />
        </label>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;