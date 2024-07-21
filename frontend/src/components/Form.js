import { useState, useEffect } from 'react';
import { Box, FormControl, FormLabel, Input, Textarea, Select, Button, VStack } from '@chakra-ui/react';
import axios from 'axios';
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
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/mentors'); // Adjust the API endpoint as needed
        const data = response.data;

        // Extract mentor names and values
        const mentorOptions = data.map((mentor) => ({
          name: mentor.name,
          value: mentor.name, // This assumes mentor.name is unique; adjust as needed
        }));

        setMentors(mentorOptions);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };

    fetchMentors();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);

    // const response = await fetch('/api/submitForm', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // });

    // const result = await response.json();
    // console.log('Result:', result);

    // if (response.ok) {
    //   alert('Form submitted successfully');
    // } else {
    //   alert('Failed to submit form');
    // }
  };

  return (
    <Box maxW="600px" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          {/* <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Your name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl> */}

          <FormControl isRequired>
            <FormLabel>Your affiliation? Where your Ph.D. is registered?</FormLabel>
            <Input
              type="text"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Research problem that you are working on or interested in working?</FormLabel>
            <Textarea
              name="researchProblem"
              value={formData.researchProblem}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>What specific feedback are you looking for in the Clinic?</FormLabel>
            <Textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Mentor that you would like to interact with?</FormLabel>
            <Select
              name="mentor"
              value={formData.mentor}
              onChange={handleChange}
            >
              <option value="">Select a mentor</option>
              {mentors.map((mentor) => (
                <option key={mentor._id} value={mentor.name}>
                  {mentor.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>How many times have you attended #PhDClinic before?</FormLabel>
            <Select
              name="attendedBefore"
              value={formData.attendedBefore}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="Attending for the 1st time">Attending for the 1st time</option>
              <option value="Attending for the 2nd time">Attending for the 2nd time</option>
              <option value="Attending for the 3rd time">Attending for the 3rd time</option>
              <option value="More than thrice">More than thrice</option>
            </Select>
          </FormControl>

          <Button colorScheme="teal" type="submit" width="full">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default PhDClinicForm;