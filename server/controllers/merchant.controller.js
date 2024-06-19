const { Users } = require('../models');

const beMerchant = async (req, res) => {
    try {
        const userId = req.user.userId; 

        console.log(req.user.userId);
        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.role = 'merchant';
        await user.save();

        res.status(200).json({ message: 'User role updated to merchant', user });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ error: 'Unable to update user role' });
    }
};

module.exports = { beMerchant };
