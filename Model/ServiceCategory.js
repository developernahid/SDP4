import mongoose from 'mongoose';
const { Schema } = mongoose;

// This is a sub-document schema for the objects in the 'featured' array.
// It won't have its own collection.
const FeaturedServiceSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: [true, 'Featured service title is required']
    },
    description: {
        type: String,
        required: [true, 'Featured service description is required']
    },
    image: {
        type: String,
        required: true
    }
}, { _id: false }); // We use the 'id' field, so we can disable the default '_id' for sub-documents

// This is the main schema for the service category document.
const ServiceCategorySchema = new Schema({
    id: {
        type: String,
        required: [true, 'Category ID is required'],
        unique: true, // Ensures 'ac', 'plumbing', etc., are unique
        trim: true
    },
    title: {
        type: String,
        required: [true, 'Category title is required'],
        trim: true
    },
    featured: [FeaturedServiceSchema], // This embeds the schema above as an array
    all: [
        {
            type: String // An array of strings
        }
    ]
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create and export the model
export const ServiceCategory = mongoose.models.service || mongoose.model('service', ServiceCategorySchema);
