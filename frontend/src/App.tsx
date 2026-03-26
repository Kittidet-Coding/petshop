import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged } from './firebase';
import { PawPrint, LogIn, LogOut, Heart, Search, MapPin, PlusCircle } from 'lucide-react';
import './App.css';

// --- Types ---
interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: string;
  description: string;
  image: string;
}

// --- Components ---

const PetForm = ({ onPetAdded }: { onPetAdded: (pet: Pet) => void }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    species: 'Dog',
    breed: '',
    age: '',
    description: '',
    image: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const newPet = await response.json();
        onPetAdded(newPet);
        navigate('/pets');
      }
    } catch (error) {
      console.error("Failed to add pet:", error);
    }
  };

  return (
    <div className="container pet-form-container animate-fade">
      <h2>Add a <span className="highlight">New Pet</span></h2>
      <form onSubmit={handleSubmit} className="card pet-form">
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            required 
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Species</label>
            <select 
              value={formData.species}
              onChange={e => setFormData({ ...formData, species: e.target.value })}
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Breed</label>
            <input 
              type="text" 
              required 
              value={formData.breed}
              onChange={e => setFormData({ ...formData, breed: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Age</label>
          <input 
            type="text" 
            required 
            placeholder="e.g., 2 years"
            value={formData.age}
            onChange={e => setFormData({ ...formData, age: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input 
            type="url" 
            required 
            placeholder="https://..."
            value={formData.image}
            onChange={e => setFormData({ ...formData, image: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea 
            required 
            rows={4}
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          <PlusCircle size={18} /> Add Pet
        </button>
      </form>
    </div>
  );
};

const Navbar = ({ user, handleLogin, handleLogout }: { user: any, handleLogin: () => void, handleLogout: () => void }) => (
  <nav className="navbar">
    <div className="container nav-content">
      <Link to="/" className="logo">
        <PawPrint size={32} color="var(--primary)" />
        <span>PetAdopt</span>
      </Link>
      <div className="nav-links">
        <Link to="/pets">Browse Pets</Link>
        {user && <Link to="/add-pet">Add Pet</Link>}
        {user ? (
          <div className="user-menu">
            <img src={user.photoURL || ''} alt={user.displayName || ''} className="user-avatar" />
            <button onClick={handleLogout} className="btn btn-outline">
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        ) : (
          <button onClick={handleLogin} className="btn btn-primary">
            <LogIn size={18} /> Sign In with Google
          </button>
        )}
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="hero">
    <div className="container hero-content animate-fade">
      <h1>Find Your New <span className="highlight">Best Friend</span></h1>
      <p>Give a loving home to a pet in need. Browse our curated list of adoptable animals today.</p>
      <div className="hero-actions">
        <Link to="/pets" className="btn btn-primary btn-large">Browse Pets</Link>
        <button className="btn btn-outline btn-large">Learn More</button>
      </div>
    </div>
  </section>
);

const PetCard = ({ pet }: { pet: Pet }) => (
  <div className="card pet-card animate-fade">
    <div className="pet-image" style={{ backgroundImage: `url(${pet.image})` }}>
      <button className="favorite-btn"><Heart size={20} /></button>
    </div>
    <div className="pet-info">
      <div className="pet-header">
        <h3>{pet.name}</h3>
        <span className="pet-age">{pet.age}</span>
      </div>
      <p className="pet-breed">{pet.breed}</p>
      <div className="pet-footer">
        <span className="pet-location"><MapPin size={14} /> Springfield Shelter</span>
        <Link to={`/pets/${pet.id}`} className="view-details">View Details</Link>
      </div>
    </div>
  </div>
);

const PetList = ({ pets, loading, searchQuery, setSearchQuery }: { pets: Pet[], loading: boolean, searchQuery: string, setSearchQuery: (query: string) => void }) => (
  <section className="pet-list-section container">
    <div className="section-header">
      <h2>Meet Our <span className="highlight">Furry Friends</span></h2>
      <div className="search-bar">
        <Search size={20} color="var(--gray)" />
        <input 
          type="text" 
          placeholder="Search by breed or species..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
    {loading ? (
      <div className="loading">Loading adorable pets...</div>
    ) : (
      <div className="pet-grid">
        {pets.length > 0 ? (
          pets.map(pet => <PetCard key={pet.id} pet={pet} />)
        ) : (
          <div className="no-results">No pets found matching your search.</div>
        )}
      </div>
    )}
  </section>
);

// --- Main App ---

function App() {
  const [user, setUser] = useState<any>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth as any, (currentUser: any) => {
      setUser(currentUser);
    });

    // Fetch pets from our backend
    fetch('http://localhost:5000/api/pets')
      .then(res => res.json())
      .then(data => {
        setPets(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching pets:", err);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth as any, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth as any);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const filteredPets = pets.filter(pet => 
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.species.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div className="app">
        <Navbar user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <PetList 
                pets={filteredPets} 
                loading={loading} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
              />
            </>
          } />
          <Route path="/pets" element={
            <PetList 
              pets={filteredPets} 
              loading={loading} 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
          } />
          <Route path="/add-pet" element={
            user ? <PetForm onPetAdded={(newPet) => setPets([...pets, newPet])} /> : <div className="container">Please sign in to add a pet.</div>
          } />
          <Route path="/pets/:id" element={<div className="container">Pet details page (Coming soon)</div>} />
        </Routes>
        <footer className="footer container">
          <p>&copy; 2026 PetAdopt. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
