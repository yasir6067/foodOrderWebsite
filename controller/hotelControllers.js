const { Hotel } = require('../models/hotelmodel.js');

const createhotel = async (req, res) => {
    try {
        const userId = req.user; // Assuming req.user is populated by auth middleware

        const {
            name,
            address: { street, city, state, postalcode, country },
            phone,
            email,
            website,
            rating,
            cuisineType,
            openingHours: { open, close },
            fooditems,
            isActive
        } = req.body;

        // Image handling
        const image = req.file ? req.file.path : null; // Assuming multer is saving the file path

        // Required fields validation
        if (!name || !city || !country || !phone || !email) {
            return res.status(400).json({ message: 'Missing required fields: name, city, country, phone, and email are required.' });
        }

        // Check if hotel already exists
        const ishotelexist = await Hotel.findOne({ name });
        if (ishotelexist) {
            return res.status(400).json({ success: false, message: "Hotel already exists" });
        }

        // Create new hotel
        const newhotel = new Hotel({
            name,
            address: { street, city, state, postalcode, country },
            phone,
            email,
            website,
            rating,
            cuisineType,
            openingHours: { open, close },
            fooditems,
            isActive,
            image
        });

        // Assign admin if user is admin
        if (userId.role === 'admin') {
            newhotel.admin = userId.id;
        }

        const savedhotel = await newhotel.save();
        res.status(201).json(savedhotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create hotel", error: error.message });
    }
};

const getallhotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        if (!hotels || hotels.length === 0) {
            return res.status(200).json({ message: "Empty database" });
        }
        res.status(200).json(hotels);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve all hotels", error: err.message });
    }
};

const gethotelbyid = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id).populate('fooditems');
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve the hotel", error: error.message });
    }
};

const updatehotels = async (req, res, next) => {
    try {
        const {
            name,
            address: { street, city, state, postalcode, country },
            phone,
            email,
            website,
            rating,
            cuisineType,
            openingHours: { open, close },
            fooditems,
            isActive
        } = req.body;

        // Image handling
        const image = req.file ? req.file.path : null; // Assuming multer is saving the file path

        // Find and update the hotel
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {
            name,
            address: { street, city, state, postalcode, country },
            phone,
            email,
            website,
            rating,
            cuisineType,
            openingHours: { open, close },
            fooditems,
            isActive,
            ...(image && { image })
        }, { new: true, runValidators: true }).populate('fooditems');

        if (!updatedHotel) {
            return res.status(404).json({ error: 'Hotel not found' });
        }

        res.status(200).json(updatedHotel);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createhotel,
    getallhotels,
    gethotelbyid,
    updatehotels
};
