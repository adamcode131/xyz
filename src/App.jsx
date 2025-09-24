import { useState } from 'react'
import propertiesData from './properties.json'

// Import images
import villaImg from './assets/image2.webp'
import appartmentImg from './assets/appt2.png' 
import { useNavigate } from 'react-router-dom'

const properties = propertiesData.map(p => ({
  ...p,
  image: p.id === 1 ? villaImg : appartmentImg
})) 


export default function App() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [property, setProperty] = useState(null)
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('property', property);
    localStorage.setItem('checkin', checkin);
    localStorage.setItem('checkout', checkout);  
    navigate('/instructions')
  } 




  return (
<div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 fixed inset-0 overflow-y-auto">      
  <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Book Your Stay</h1>
          <p className="text-indigo-100">Find your perfect getaway and reserve with ease</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="your.email@example.com"
              required
            />
          </div>

          {/* Property Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Select Property
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {properties.map(p => (
                <div 
                  key={p.id} 
                  className={`relative cursor-pointer transition-all duration-200 ${
                    property?.id === p.id 
                      ? 'ring-2 ring-indigo-500 scale-105' 
                      : 'hover:scale-102'
                  }`}
                  onClick={() => setProperty(p)}
                >
                  <div className={`bg-white rounded-xl shadow-md overflow-hidden border-2 ${
                    property?.id === p.id ? 'border-indigo-500' : 'border-gray-200'
                  }`}>
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{p.title}</h3>
                      <p className="text-indigo-600 font-medium">${p.price}/night</p>
                    </div>
                    {property?.id === p.id && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-indigo-500 text-white p-1 rounded-full">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in Date
              </label>
              <input 
                type="date" 
                value={checkin} 
                onChange={e => setCheckin(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-out Date
              </label>
              <input 
                type="date" 
                value={checkout} 
                onChange={e => setCheckout(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  )
}