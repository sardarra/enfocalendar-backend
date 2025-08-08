import User from '../models/Users.js';

export default getUserData = async (req, res) => {
    const { userID, name, email, viewPreference } = req.params;
    try {
        const user = await User.findOne({ userID });
        if (!user) {

            // if not found, create a new user with default values
            const newUser = new User({
                userID,
                name: '',
                email: '',
                viewPreference: 'week'
            });
            await newUser.save();
            return res.status(201).json({ success: true, data: newUser });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};