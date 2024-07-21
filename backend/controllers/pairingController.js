const PairingRequest = require('../model/Pairing');
const Mentor = require('../model/Mentor');
const User = require('../model/User');

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

// change status of pairing request to approved
exports.approvePairingRequest = async (req, res) => {
    try {
        const pairingRequest = await PairingRequest.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
        if (!pairingRequest) {
            return res.status(404).json({ message: 'Pairing request not found' });
        }
        res.status(200).json({ message: 'Pairing request approved', pairingRequest });
    } catch (error) {
        console.error('Error approving pairing request:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

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