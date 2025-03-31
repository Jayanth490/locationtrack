import User from '../models/User.js'; // Ensure correct model path

export const getUserLocation = async (req, res) => {
    try {
        const { phone } = req.params;
        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            latitude: user.latitude,
            longitude: user.longitude,
            address: user.address || "Address not available",
        });
    } catch (error) {
        console.error("❌ Error fetching location:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
