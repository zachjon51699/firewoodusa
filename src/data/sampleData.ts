import { Supplier } from '../types/supplier';

// Sample data - replace this with your CSV data processing
export const sampleSuppliers: Supplier[] = [
  {
    id: '1',
    businessName: 'Mountain View Firewood',
    ownerName: 'John Smith',
    email: 'john@mountainviewfirewood.com',
    phone: '(555) 123-4567',
    address: {
      street: '123 Oak Street',
      city: 'Denver',
      state: 'Colorado',
      zipCode: '80201'
    },
    coordinates: {
      lat: 39.7392,
      lng: -104.9903
    },
    woodTypes: ['Oak', 'Pine', 'Aspen', 'Cottonwood'],
    deliveryRadius: 25,
    pricing: {
      cordPrice: 350,
      halfCordPrice: 200,
      faceChordPrice: 120
    },
    services: ['Delivery', 'Stacking', 'Splitting'],
    businessDescription: 'Family-owned business providing premium seasoned firewood to the Denver metro area for over 15 years.',
    established: 2008,
    website: 'https://mountainviewfirewood.com',
    rating: 4.8,
    reviewCount: 127,
    isVerified: true,
    imageUrl: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    businessName: 'Pacific Coast Wood Co.',
    ownerName: 'Sarah Johnson',
    email: 'sarah@pacificcoastwood.com',
    phone: '(555) 987-6543',
    address: {
      street: '456 Cedar Avenue',
      city: 'Portland',
      state: 'Oregon',
      zipCode: '97201'
    },
    coordinates: {
      lat: 45.5152,
      lng: -122.6784
    },
    woodTypes: ['Douglas Fir', 'Maple', 'Alder', 'Cherry'],
    deliveryRadius: 30,
    pricing: {
      cordPrice: 380,
      halfCordPrice: 220,
      faceChordPrice: 140
    },
    services: ['Delivery', 'Kiln Dried', 'Custom Cutting'],
    businessDescription: 'Sustainable firewood harvested from local forests. We specialize in premium kiln-dried hardwoods.',
    established: 2012,
    website: 'https://pacificcoastwood.com',
    socialMedia: {
      facebook: 'https://facebook.com/pacificcoastwood',
      instagram: 'https://instagram.com/pacificcoastwood'
    },
    rating: 4.9,
    reviewCount: 89,
    isVerified: true,
    imageUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    businessName: 'Lone Star Firewood',
    ownerName: 'Mike Rodriguez',
    email: 'mike@lonestarfirewood.com',
    phone: '(555) 456-7890',
    address: {
      street: '789 Mesquite Road',
      city: 'Austin',
      state: 'Texas',
      zipCode: '78701'
    },
    coordinates: {
      lat: 30.2672,
      lng: -97.7431
    },
    woodTypes: ['Oak', 'Mesquite', 'Pecan', 'Cedar'],
    deliveryRadius: 40,
    pricing: {
      cordPrice: 320,
      halfCordPrice: 180,
      faceChordPrice: 100
    },
    services: ['Delivery', 'Stacking', 'Same Day Delivery'],
    businessDescription: 'Texas-grown hardwoods perfect for BBQ and heating. Fast delivery across the Austin metro area.',
    established: 2015,
    rating: 4.7,
    reviewCount: 203,
    isVerified: false,
    imageUrl: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const woodTypes = [
  'Oak', 'Pine', 'Maple', 'Cherry', 'Birch', 'Ash', 'Hickory', 
  'Douglas Fir', 'Cedar', 'Aspen', 'Cottonwood', 'Alder', 'Mesquite', 'Pecan'
];

export const services = [
  'Delivery', 'Stacking', 'Splitting', 'Kiln Dried', 'Custom Cutting', 
  'Same Day Delivery', 'Bulk Orders', 'Seasoned Wood'
];

export const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];