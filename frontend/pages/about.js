// pages/phd-clinic.js
import Head from 'next/head';
import Link from 'next/link'; // Import Link

export default function PhDClinic() {
  return (
    <div>
      <Head>
        <title>PhD Clinic</title>
      </Head>
      <main>
        <h1>About the PhD Clinic</h1>
        <p>
          The PhD Clinic, launched in September 2020 by the ACM India Council, facilitates CS PhD students from all over the country to obtain inputs and advice from expert mentors located in premier academic institutions and industry. Currently, about 25+ faculty from top-tier institutions and industry, including IISc, IITs, IIITs, CMI, IMSc, Microsoft Research and JNU have joined as mentors. Mentors spend a few hours each month talking to students and giving concrete and constructive suggestions on their work. Each clinic session is a one-on-one engagement, and a student gets to choose a mentor who works in his/her area from the available list of mentors.
        </p>
        <p>
          If interested in any topic in computing, register <a href="/register">here</a> to participate in the clinic. <a href="https://docs.google.com/presentation/d/1oL1I8l6LbGGCv1D2wxxsrancFEECah4yTjbxnyb8M44/edit#slide=id.g8e9de1b299_2_0">Here</a> is a deck of slides giving more details of the Clinic. For any questions, please write to <a href="mailto:pk.guru@iiit.ac.in">pk.guru@iiit.ac.in</a>.
        </p>

        <h2>Team</h2>
        <ul>
          <li>Prof. Ponnurangam Kumaraguru “PK”, IIIT Hyderabad</li>
          <li>Prof. Mainack Mondal, IIT Kharagpur</li>
          <li>Dr. Niharika Sachdeva, InfoEdge</li>
        </ul>

        <h2>Interested in joining the community?</h2>
        <ul>
          <li><a href="https://groups.google.com/g/phdclinic">Join the mailing list</a></li>
          <li><a href="https://phdclinic.slack.com/join/shared_invite/zt-1f7e8wuo0-4z1JMmsq7hOBs0Lmr8jmww#/shared-invite/error">Join the Slack channel</a></li>
        </ul>

        <h2>Testimonials by students who attended the PhD Clinic:</h2>
        <blockquote>
          <p>"I am really thankful to PhDClinic to give me this opportunity to discuss with such an icon."</p>
          <footer>—PhD Student, SRM Institute of Science and Technology, Chennai</footer>
        </blockquote>
        <blockquote>
          <p>"The way she answered the questions was so good! She shared personal experiences as well and that made me connect to her."</p>
          <footer>—PhD Student, Netaji Subhas University of Technology (NSUT), Delhi</footer>
        </blockquote>
        <blockquote>
          <p>"He guided me in such a nice way about how to find a research topic, what areas can be there and how I should align my research in a proper manner."</p>
          <footer>—PhD Student, Rajasthan Technical University (RTU), Kota–Rajasthan</footer>
        </blockquote>
      </main>
    </div>
  );
}