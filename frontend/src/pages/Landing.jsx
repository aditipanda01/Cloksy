import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Bell, Target, Shield, Clock, Users } from 'lucide-react';
import API from '../api';

function Landing() {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await API.get('/internships');
        setInternships(res.data.slice(0, 4));
      }
    } catch (err) {
      console.error('Failed to fetch internships:', err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToInternships = () => {
    document.getElementById('internships')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3]" style={{ margin: 0, padding: 0 }}>
     {/* Navbar */}
<nav className="fixed top-0 left-0 right-0 bg-[#EAE3C9]/95 backdrop-blur-sm shadow-lg z-50">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
      <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center">
        <Bell className="w-6 h-6 text-black" />
      </div>
      <span className="text-2xl font-bold text-[#1a1a1a]">ProMinder</span>
    </div>

    <div className="flex items-center gap-8">
      <button 
        onClick={() => navigate('/dashboard')}
        className="text-[#1a1a1a] hover:text-[#D4AF37] transition font-medium"
      >
        Add Internships
      </button>
      <button 
        onClick={() => navigate('/login')}
        className="text-[#1a1a1a] hover:text-[#D4AF37] transition font-medium"
      >
        Profile
      </button>
      <button 
        onClick={() => navigate('/register')}
        className="bg-[#D4AF37] text-black px-6 py-2 rounded-full hover:bg-[#C5A028] transition font-semibold"
      >
        Get Started
      </button>
    </div>
  </div>
</nav>


   {/* Hero Section */}
<div className="relative pt-24 pb-32 overflow-hidden bg-black">

  {/* 🔹 Top Background (Beige Wave) */}
  <div className="absolute top-0 left-0 right-0 rotate-180 z-5">
    <svg viewBox="0 0 1440 320" className="w-full h-auto">
      <path
        fill="#020202ff"
        fillOpacity="1"
        d="M0,96L40,112C96,128,192,160,288,165.3C384,171,480,149,576,144C672,139,768,149,864,170.7C960,192,1056,224,1152,213.3C1248,203,1344,149,1392,122.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      ></path>
    </svg>
  </div>

  {/* 🔹 Hero Content */}
  <div className="relative max-w-7xl mx-auto px-6 py-20 text-center z-10 bg-transparent">
    {/* Gradient Blobs */}
    <div className="absolute top-20 right-10 w-72 h-72 bg-[#F5E6D3] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
    <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#F5E6D3] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>

    <h1 className="text-8xl font-extrabold mb-6 text-[#D4AF37] tracking-widest font-serif flex items-center justify-center">
  Pr
  <span className="relative inline-block w-20 h-20 mx-1">
    <img
      src="https://www.titan.co.in/on/demandware.static/-/Sites-titan-master-catalog/default/dwea111a2f/images/Titan/Catalog/W0065WA02_1.jpg"
      alt="O"
      className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-[#D4AF37]"
    />
  </span>
  Minder
</h1>


    <p className="text-3xl text-[#F5E6D3] mb-8 font-light">Professional Reminder</p>
    <p className="text-lg text-[#F5E6D3]/80 max-w-2xl mx-auto mb-8">
      Never miss an internship deadline again. Stay organized, get timely reminders, and land your dream opportunity.
    </p>
    <button 
      onClick={() => navigate('/register')}
      className="bg-[#D4AF37] text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#C5A028] transition transform hover:scale-105"
    >
      Start Tracking Now
    </button>
  </div>

  {/* 🔹 Bottom Background (Beige Wave) */}
  <div className="absolute bottom-0 left-0 right-0 z-5">
    <svg viewBox="0 0 1440 320" className="w-full h-auto">
      <path
        fill="#F5E6D3"
        fillOpacity="1"
        d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,144C672,139,768,149,864,170.7C960,192,1056,224,1152,213.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </div>
</div>


      {/* Saved Internships */}
      <div id="internships" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-[#1a1a1a] mb-3">Saved Internships</h2>
          <p className="text-gray-700 text-lg">Track your applications and never miss a deadline</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading internships...</p>
          </div>
        ) : internships.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No internships saved yet</p>
            <button 
              onClick={() => navigate('/register')}
              className="bg-[#1a1a1a] text-[#D4AF37] px-6 py-3 rounded-full font-semibold hover:bg-[#2a2a2a] transition"
            >
              Get Started & Add Internships
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {internships.map((internship) => (
                <div 
                  key={internship._id} 
                  className="min-w-[280px] bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex-shrink-0"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#D4AF37] to-[#C5A028]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Calendar className="w-20 h-20 text-black/20" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#D4AF37] mb-2">{internship.title}</h3>
                    <p className="text-[#F5E6D3]/80 mb-4 line-clamp-2">{internship.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-[#F5E6D3]/60">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(internship.deadline).toLocaleDateString()}</span>
                      </div>
                      <a 
                        href={internship.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#D4AF37] text-black px-4 py-2 rounded-lg text-sm hover:bg-[#C5A028] transition font-semibold"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button 
                onClick={() => navigate('/dashboard')}
                className="bg-[#1a1a1a] text-[#D4AF37] px-8 py-3 rounded-full font-semibold hover:bg-[#2a2a2a] transition border-2 border-[#1a1a1a]"
              >
                View All Internships
              </button>
            </div>
          </>
        )}
      </div>

      {/* Why Choose Us */}
      <div className="bg-[#1a1a1a] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#D4AF37] mb-3">Why Choose ProMinder?</h2>
            <p className="text-[#F5E6D3]/80 max-w-2xl mx-auto text-lg">
              The ultimate tool to manage your internship applications and never miss an opportunity
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: Bell, title: "Smart Reminders", desc: "Get timely SMS and email reminders before deadlines so you never miss an opportunity" },
              { icon: Target, title: "Organized Tracking", desc: "Keep all your internship applications organized in one place with easy management" },
              { icon: Clock, title: "Time Saver", desc: "Spend less time tracking deadlines and more time preparing for your dream internship" },
              { icon: Shield, title: "Secure & Private", desc: "Your data is encrypted and secure. We prioritize your privacy above everything" },
              { icon: Users, title: "Trusted by Students", desc: "Join thousands of students who landed their dream internships using ProMinder" },
              { icon: Calendar, title: "Calendar Integration", desc: "Sync with your calendar and get reminders across all your devices seamlessly" }
            ].map((item, index) => (
              <div key={index} className="bg-[#F5E6D3] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition text-center w-[calc(33.333%-1rem)] min-w-[280px]">
                <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-[#F5E6D3] py-12 border-t-4 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between gap-8 mb-8">
            <div className="min-w-[250px]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                  <Bell className="w-6 h-6 text-black" />
                </div>
                <span className="text-2xl font-bold text-[#D4AF37]">ProMinder</span>
              </div>
              <p className="text-[#F5E6D3]/70 text-sm">
                Your professional reminder system for internship applications and deadlines.
              </p>
            </div>

            <div className="min-w-[150px]">
              <h3 className="font-bold mb-4 text-[#D4AF37]">Products</h3>
              <ul className="space-y-2 text-[#F5E6D3]/70 text-sm">
                <li><button onClick={(scrollToInternships)} className="hover:text-[#D4AF37] transition">Dashboard</button></li>
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-[#D4AF37] transition">Internships</button></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Reminders</a></li>
              </ul>
            </div>

            <div className="min-w-[150px]">
              <h3 className="font-bold mb-4 text-[#D4AF37]">Company Info</h3>
              <ul className="space-y-2 text-[#F5E6D3]/70 text-sm">
                <li><a href="#" className="hover:text-[#D4AF37] transition">About Us</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Contact</a></li>
                <li><a href="#" className="hover:text-[#D4AF37] transition">Careers</a></li>
              </ul>
            </div>

            <div className="min-w-[150px]">
              <h3 className="font-bold mb-4 text-[#D4AF37]">Follow Us</h3>
              <div className="flex gap-4">
                {['FB', 'TW', 'IG'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 bg-[#F5E6D3]/10 rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition">
                    <span className="text-xs font-bold">{social}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[#F5E6D3]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#F5E6D3]/70 text-sm">© 2025 ProMinder. All rights reserved.</p>
            <div className="flex gap-6 text-[#F5E6D3]/70 text-sm">
              <a href="#" className="hover:text-[#D4AF37] transition">Terms of Service</a>
              <a href="#" className="hover:text-[#D4AF37] transition">Privacy Policy</a>
              <a href="#" className="hover:text-[#D4AF37] transition">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
