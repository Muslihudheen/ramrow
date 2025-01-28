import mongoose from 'mongoose';

const homepageSchema = new mongoose.Schema({
  banners: [{
    type: String,
  }],
  trendingProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  newArrivals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  videos: [{
    type: String,
  }],
  newsletterEmails: [{
    type: String,
  }],
}, {
  timestamps: true,
});

export const Homepage = mongoose.model('Homepage', homepageSchema);