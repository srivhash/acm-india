import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Import for react-router links

const About = () => {
  return (
    <div style={{ padding: '20px', color: '#fff', backgroundColor: '#121212' }}>
      <head>
        <title>PhD Clinic</title>
      </head>

      <main style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#00bfae', fontSize:32}}>About the PhD Clinic</h1>
        <p>
          The PhD Clinic, launched in September 2020 by the ACM India Council, facilitates CS PhD students from all over the country to obtain inputs and advice from expert mentors located in premier academic institutions and industry. Currently, about 25+ faculty from top-tier institutions and industry, including IISc, IITs, IIITs, CMI, IMSc, Microsoft Research and JNU have joined as mentors. Mentors spend a few hours each month talking to students and giving concrete and constructive suggestions on their work. Each clinic session is a one-on-one engagement, and a student gets to choose a mentor who works in his/her area from the available list of mentors.
        </p>
        <p>
          If interested in any topic in computing, register <RouterLink to="/register" style={{ color: '#00bfae' }}>here</RouterLink> to participate in the clinic. <a href="https://docs.google.com/presentation/d/1oL1I8l6LbGGCv1D2wxxsrancFEECah4yTjbxnyb8M44/edit#slide=id.g8e9de1b299_2_0" target="_blank" rel="noopener noreferrer" style={{ color: '#00bfae' }}>Here</a> is a deck of slides giving more details of the Clinic. For any questions, please write to <a href="mailto:pk.guru@iiit.ac.in" style={{ color: '#00bfae' }}>pk.guru@iiit.ac.in</a>.
        </p>

        <br/>

        <h2 style={{ borderBottom: '2px solid #00bfae' }}>Team</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Prof. Ponnurangam Kumaraguru “PK”, IIIT Hyderabad</li>
          <li>Prof. Mainack Mondal, IIT Kharagpur</li>
          <li>Dr. Niharika Sachdeva, InfoEdge</li>
        </ul>

        <br/>

        <h2 style={{ borderBottom: '2px solid #00bfae' }}>Interested in joining the community?</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><a href="https://groups.google.com/g/phdclinic" target="_blank" rel="noopener noreferrer" style={{ color: '#00bfae' }}>Join the mailing list</a></li>
          <li><a href="https://phdclinic.slack.com/join/shared_invite/zt-1f7e8wuo0-4z1JMmsq7hOBs0Lmr8jmww#/shared-invite/error" target="_blank" rel="noopener noreferrer" style={{ color: '#00bfae' }}>Join the Slack channel</a></li>
        </ul>

        <br/>

        <h2 style={{ borderBottom: '2px solid #00bfae' }}>Testimonials by students who attended the PhD Clinic:</h2>
        <blockquote style={{ borderLeft: '4px solid #00bfae', paddingLeft: '16px', margin: '16px 0', fontStyle: 'italic' }}>
          <p>"I am really thankful to PhDClinic to give me this opportunity to discuss with such an icon."</p>
          <footer>—PhD Student, SRM Institute of Science and Technology, Chennai</footer>
        </blockquote>
        <blockquote style={{ borderLeft: '4px solid #00bfae', paddingLeft: '16px', margin: '16px 0', fontStyle: 'italic' }}>
          <p>"The way she answered the questions was so good! She shared personal experiences as well and that made me connect to her."</p>
          <footer>—PhD Student, Netaji Subhas University of Technology (NSUT), Delhi</footer>
        </blockquote>
        <blockquote style={{ borderLeft: '4px solid #00bfae', paddingLeft: '16px', margin: '16px 0', fontStyle: 'italic' }}>
          <p>"He guided me in such a nice way about how to find a research topic, what areas can be there and how I should align my research in a proper manner."</p>
          <footer>—PhD Student, Rajasthan Technical University (RTU), Kota–Rajasthan</footer>
        </blockquote>
      </main>
    </div>
  );
};

export default About;