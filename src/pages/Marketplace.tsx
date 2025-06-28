import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star, Coins, Package, Sparkles, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Type definitions
interface MarketplaceItem {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  rarity: string;
  image: string;
  profilePic: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  purchased: boolean;
}

// Mock marketplace data
const marketplaceItems: MarketplaceItem[] = [
  {
    id: 1,
    name: 'Rare Pet Egg',
    description: 'A mysterious egg that might hatch into a legendary pet',
    price: 50,
    currency: 'Scolar Stones',
    category: 'Pets',
    rarity: 'Rare',
    image: '🥚',
    profilePic: '/profile1.png',
    inStock: true,
    rating: 4.8,
    reviews: 124,
    purchased: false
  },
  {
    id: 2,
    name: 'XP Boost Potion',
    description: 'Doubles your XP gain for 1 hour',
    price: 25,
    currency: 'Scolar Stones',
    category: 'Consumables',
    rarity: 'Common',
    image: '🧪',
    profilePic: '/profile2.png',
    inStock: true,
    rating: 4.5,
    reviews: 89,
    purchased: false
  },
  {
    id: 3,
    name: 'Cosmic Armor Set',
    description: 'Legendary armor that protects against all elements',
    price: 150,
    currency: 'Scolar Stones',
    category: 'Equipment',
    rarity: 'Legendary',
    image: '🛡️',
    profilePic: '/profile3.png',
    inStock: false,
    rating: 4.9,
    reviews: 67,
    purchased: false
  },
  {
    id: 4,
    name: 'Pet Food Bundle',
    description: 'Premium food that makes your pet stronger',
    price: 30,
    currency: 'Scolar Stones',
    category: 'Pets',
    rarity: 'Common',
    image: '🍖',
    profilePic: '/profile1.png',
    inStock: true,
    rating: 4.2,
    reviews: 156,
    purchased: false
  },
  {
    id: 5,
    name: 'Time Warp Scroll',
    description: 'Skip quest cooldowns and start immediately',
    price: 75,
    currency: 'Scolar Stones',
    category: 'Consumables',
    rarity: 'Epic',
    image: '📜',
    profilePic: '/profile2.png',
    inStock: true,
    rating: 4.7,
    reviews: 43,
    purchased: false
  },
  {
    id: 6,
    name: 'Mystery Box',
    description: 'Contains random rare items and surprises',
    price: 100,
    currency: 'Scolar Stones',
    category: 'Mystery',
    rarity: 'Epic',
    image: '🎁',
    profilePic: '/profile3.png',
    inStock: true,
    rating: 4.6,
    reviews: 234,
    purchased: false
  }
];

const categories = ['All', 'Pets', 'Consumables', 'Equipment', 'Mystery'];
const rarities = ['All', 'Common', 'Rare', 'Epic', 'Legendary'];

export default function Marketplace() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRarity, setSelectedRarity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [userScolarStones, setUserScolarStones] = useState(125);
  const [items, setItems] = useState<MarketplaceItem[]>(marketplaceItems);
  const [purchasedItems, setPurchasedItems] = useState<MarketplaceItem[]>([]);

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesRarity = selectedRarity === 'All' || item.rarity === selectedRarity;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesRarity && matchesSearch;
  });

  const handlePurchase = (item: MarketplaceItem) => {
    if (userScolarStones >= item.price && item.inStock && !item.purchased) {
      setUserScolarStones(prev => prev - item.price);
      setItems(prev => prev.map(i => 
        i.id === item.id ? { ...i, purchased: true } : i
      ));
      setPurchasedItems(prev => [...prev, item]);
      alert(`Successfully purchased ${item.name}!`);
    } else if (item.purchased) {
      alert('You already own this item!');
    } else if (!item.inStock) {
      alert('This item is out of stock!');
    } else {
      alert('Not enough Scolar Stones!');
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400';
      case 'Rare': return 'text-blue-400';
      case 'Epic': return 'text-purple-400';
      case 'Legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/student-dashboard')}
                className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-2 text-white hover:bg-purple-900/40 transition-all duration-200 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-8 w-8 text-purple-400" />
                <div>
                  <h1 className="text-xl font-bold text-white">Cosmic Marketplace</h1>
                  <p className="text-sm text-purple-200">Trade your Scolar Stones for amazing items</p>
                </div>
              </div>
            </div>
            
            {/* Scolar Stones Display */}
            <div className="flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
              <span className="text-yellow-400 text-lg">💎</span>
              <span className="text-white font-semibold">{userScolarStones}</span>
              <span className="text-gray-300 text-sm">Scolar Stones</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/20 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Rarity Filter */}
            <div className="flex flex-wrap gap-2">
              {rarities.map(rarity => (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarity(rarity)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedRarity === rarity
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {rarity}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300"
            >
              {/* Item Image and Profile */}
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <div className="text-6xl mb-2">{item.image}</div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <img 
                      src={item.profilePic} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const nextSibling = target.nextSibling as HTMLElement;
                        if (nextSibling) {
                          nextSibling.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold" style={{ display: 'none' }}>
                      {item.profilePic.includes('1') ? '1' : item.profilePic.includes('2') ? '2' : '3'}
                    </div>
                  </div>
                </div>
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getRarityColor(item.rarity)} bg-black/30`}>
                  {item.rarity}
                </div>
              </div>

              {/* Item Info */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white">{item.name}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">{item.rating} ({item.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-lg">💎</span>
                    <span className="text-white font-bold text-lg">{item.price}</span>
                    <span className="text-gray-400 text-sm">Scolar Stones</span>
                  </div>
                  
                  {/* Stock Status */}
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    item.purchased 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : item.inStock 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {item.purchased ? 'Owned' : item.inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>

                {/* Purchase Button */}
                <button
                  onClick={() => handlePurchase(item)}
                  disabled={!item.inStock || userScolarStones < item.price || item.purchased}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    item.purchased
                      ? 'bg-green-600 text-white cursor-not-allowed'
                      : item.inStock && userScolarStones >= item.price
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {item.purchased ? 'Already Owned' : 
                   !item.inStock ? 'Out of Stock' : 
                   userScolarStones < item.price ? 'Not Enough Stones' : 'Purchase'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No items found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Purchased Items Summary */}
        {purchasedItems.length > 0 && (
          <div className="mt-8 bg-black/30 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">Your Purchases</h2>
            <div className="flex flex-wrap gap-4">
              {purchasedItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                  <div className="text-2xl">{item.image}</div>
                  <div>
                    <h4 className="text-white font-semibold">{item.name}</h4>
                    <p className="text-gray-400 text-sm">{item.rarity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 