const PairingRequest = require('../model/Pairing');
const Mentor = require('../model/Mentor');
const User = require('../model/User');
const nodemailer = require('nodemailer');
const ical = require('ical-generator').default;
require('dotenv').config();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // your email address
    pass: process.env.EMAIL_PASSWORD, // your email password
  }
});


const sendMeetingLinkEmail = (menteeEmail, mentorName, meetingLink) => {
  // Generate a random date and time for the meeting (within the next 7 days)
  const now = new Date();
  const randomMinutes = Math.floor(Math.random() * (60 * 24 * 7));
  const meetingStart = new Date(now.getTime() + randomMinutes * 60000);
  const meetingEnd = new Date(meetingStart.getTime() + 60 * 60000); // 1 hour meeting

  const meetingDetails = {
    subject: 'Meeting with Mentor',
    description: `Online meeting with ${mentorName}`,
    location: meetingLink,
    start: meetingStart.toISOString(),
    end: meetingEnd.toISOString()
  };

  // Create a calendar event
  const cal = ical({ domain: 'example.com', name: 'Meeting with Mentor' });
  cal.createEvent({
    start: new Date(meetingDetails.start),
    end: new Date(meetingDetails.end),
    summary: meetingDetails.subject,
    description: meetingDetails.description,
    location: meetingDetails.location,
    organizer: { name: 'Your Team', email: process.env.EMAIL }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: menteeEmail,
    subject: 'Your Meeting Link with Mentor',
    text: `Hello,

Your pairing request has been approved. You can join the meeting with ${mentorName} using the following link:

${meetingLink}

Meeting Details:
- Date: ${meetingStart.toDateString()}
- Time: ${meetingStart.toLocaleTimeString()} - ${meetingEnd.toLocaleTimeString()}

Best regards,
Your Team`,
    attachments: [
      {
        filename: 'meeting.ics',
        content: cal.toString(),
        contentType: 'text/calendar'
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

exports.createPairingRequest = async (req, res) => {
    try {
        const { affiliation, researchProblem,  mentor, attendedBefore } = req.body;
        const mentee_id = req.user.id; // Assuming the user's ID is available from auth middleware

        // Find the mentor by name
        const mentorDoc = await Mentor.findOne({ name: mentor });
        if (!mentorDoc) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        // Create a new pairing request
        const pairingRequest = new PairingRequest({
            mentee_id,
            mentor_id: mentorDoc._id,
            affiliation: affiliation,
            researchProblem: researchProblem,
            attendedBefore: attendedBefore
        });

        await pairingRequest.save();

        res.status(201).json({ message: 'Pairing request created successfully', pairingRequest });
    } catch (error) {
        console.error('Error creating pairing request:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getPairingRequests = async (req, res) => {
    try {
        const pairingRequests = await PairingRequest.find({ mentee_id: req.user.id });
        res.status(200).json(pairingRequests);
    } catch (error) {
        console.error('Error fetching pairing requests:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// get all requests with status pending
// Get all requests with status pending
exports.getAllPendingRequests = async (req, res) => {
    try {
        const pairingRequests = await PairingRequest.find({ status: 'pending' });

        const requestsWithDetails = await Promise.all(pairingRequests.map(async (request) => {
            const mentee = await User.findById(request.mentee_id);
            const mentor = await Mentor.findById(request.mentor_id);

            return {
                ...request.toObject(),
                menteeName: `${mentee.firstname} ${mentee.lastname}`,
                mentorName: mentor.name,
            };
        }));

        res.status(200).json(requestsWithDetails);
    } catch (error) {
        console.error('Error fetching pairing requests:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller to approve pairing request
exports.approvePairingRequest = async (req, res) => {
    try {
      const pairingRequest = await PairingRequest.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
      if (!pairingRequest) {
        return res.status(404).json({ message: 'Pairing request not found' });
      }
  
      // Fetch mentee and mentor details
      const mentee = await User.findById(pairingRequest.mentee_id);
      const mentor = await Mentor.findById(pairingRequest.mentor_id);
  
      // Generate meeting link (this can be a link to a Zoom/Google Meet/Teams meeting, etc.)
      const meetingLink = 'https://example.com/meeting-link';  // Replace with actual meeting link generation logic
  
      // Send email to mentee
      sendMeetingLinkEmail(mentee.email, mentor.name, meetingLink);
  
      res.status(200).json({ message: 'Pairing request approved and email sent', pairingRequest });
    } catch (error) {
      console.error('Error approving pairing request:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// change status of pairing request to rejected
exports.rejectPairingRequest = async (req, res) => {
    try {
        const pairingRequest = await PairingRequest.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
        if (!pairingRequest) {
            return res.status(404).json({ message: 'Pairing request not found' });
        }
        res.status(200).json({ message: 'Pairing request rejected', pairingRequest });
    } catch (error) {
        console.error('Error rejecting pairing request:', error);
        res.status(500).json({ message: 'Server error' });
    }
}