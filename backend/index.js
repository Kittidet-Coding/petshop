const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Pet Adoption API is running');
});

// In-memory pet data
let pets = [
  {
    id: 1,
    name: 'Buddy',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '2 years',
    description: 'Friendly and energetic, loves playing fetch.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 2,
    name: 'Luna',
    species: 'Cat',
    breed: 'Persian',
    age: '1 year',
    description: 'Calm and affectionate, enjoys sunbathing.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 3,
    name: 'Milo',
    species: 'Rabbit',
    breed: 'Holland Lop',
    age: '6 months',
    description: 'Playful and curious, loves fresh veggies.',
    image: 'https://images.unsplash.com/photo-1585110396054-c8112c91b553?auto=format&fit=crop&q=80&w=400',
  }
];

// Get all pets
app.get('/api/pets', (req, res) => {
  res.json(pets);
});

// Add a new pet
app.post('/api/pets', (req, res) => {
  const newPet = {
    id: pets.length + 1,
    ...req.body
  };
  pets.push(newPet);
  res.status(201).json(newPet);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
