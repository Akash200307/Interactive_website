import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Menu, X, ChevronDown, Star, Clock, Users} from 'lucide-react';

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isLoading, setIsLoading] = useState(true);
    const [hoveredDish, setHoveredDish] = useState(null);

    const menuItems = [
        {
            name: "Stellar Sushi Platter",
            price: "$32",
            description: "Premium selection of fresh sushi with unique molecular gastronomy elements",
            category: "Signature Dishes",
            rating: 4.8,
            prepTime: "25 mins",
            dietary: ["GF", "DF"]
        },
        {
            name: "Quantum Quinoa Bowl",
            price: "$24",
            description: "Ancient grains meet modern technique with seasonal vegetables",
            category: "Main Course",
            rating: 4.6,
            prepTime: "20 mins",
            dietary: ["V", "GF"]
        },
        {
            name: "Neo Tokyo Ramen",
            price: "$28",
            description: "Signature black broth with hover-suspended ingredients",
            category: "Signature Dishes",
            rating: 4.9,
            prepTime: "22 mins",
            dietary: ["DF"]
        }
    ];

    const specialFeatures = [
        {
            title: "Interactive Tables",
            description: "Digital surface for real-time order customization",
            icon: "✨"
        },
        {
            title: "Ambient Lighting",
            description: "Responsive lighting that adapts to your dining experience",
            icon: "💡"
        },
        {
            title: "Holographic Menu",
            description: "3D visualization of every dish before ordering",
            icon: "🔮"
        }
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const initialLoadingAnimation = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    };

    const menuItemAnimation = {
        hidden: {y: 20, opacity: 0},
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    if (isLoading) {
        return (
            <div className="h-screen bg-black flex items-center justify-center">
                <motion.div
                    initial={{scale: 0.8, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    transition={{duration: 0.5, repeat: Infinity, repeatType: "reverse"}}
                    className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500"
                >
                    NOVA
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={initialLoadingAnimation}
            className="min-h-screen bg-black text-white"
        >
            {/* Navigation with Mobile Menu */}
            <motion.nav
                initial={{y: -100}}
                animate={{y: 0}}
                transition={{duration: 0.5, delay: 0.2}}
                className="fixed w-full z-50 bg-black/80 backdrop-blur-md"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <motion.div
                            whileHover={{scale: 1.05}}
                            className="flex items-center"
                        >
              <span
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
                NOVA
              </span>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {['home', 'menu', 'experience', 'reservations'].map((item) => (
                                    <motion.button
                                        key={item}
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                        onClick={() => setActiveSection(item)}
                                        className={`${
                                            activeSection === item
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        } px-3 py-2 rounded-md text-sm font-medium capitalize transition-all duration-300`}
                                    >
                                        {item}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <motion.button
                                whileTap={{scale: 0.95}}
                                onClick={toggleMobileMenu}
                                className="text-gray-300 hover:text-white"
                            >
                                {isMobileMenuOpen ? <X/> : <Menu/>}
                            </motion.button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{opacity: 0, height: 0}}
                                animate={{opacity: 1, height: 'auto'}}
                                exit={{opacity: 0, height: 0}}
                                className="md:hidden"
                            >
                                <div className="px-2 pt-2 pb-3 space-y-1">
                                    {['home', 'menu', 'experience', 'reservations'].map((item) => (
                                        <motion.button
                                            key={item}
                                            whileTap={{scale: 0.95}}
                                            onClick={() => {
                                                setActiveSection(item);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={`${
                                                activeSection === item
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                            } block px-3 py-2 rounded-md text-base font-medium capitalize w-full text-left`}
                                        >
                                            {item}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>

            {/* Menu Items Section */}
            <motion.div
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 0.8}}
                viewport={{once: true}}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {menuItems.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={menuItemAnimation}
                        whileHover={{
                            scale: 1.03,
                            transition: {duration: 0.2}
                        }}
                        className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"/>
                        <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                        <p className="text-gray-400 mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-cyan-500 font-bold">{item.price}</span>
                            <div className="flex items-center space-x-2">
                                <Star className="w-4 h-4 text-yellow-500"/>
                                <span className="text-gray-300">{item.rating}</span>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center space-x-4 text-sm">
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1"/>
                                <span>{item.prepTime}</span>
                            </div>
                            <div className="flex gap-2">
                                {item.dietary.map((diet, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                    {diet}
                  </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Hero Section */}
            <motion.section
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
                className="relative h-screen flex items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black/80"/>
                <motion.div
                    initial={{y: 50, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.8, delay: 0.5}}
                    className="relative z-10 text-center px-4"
                >
                    <motion.h1
                        initial={{scale: 0.8, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{duration: 0.8, delay: 0.8}}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        Welcome to
                        <motion.span
                            animate={{
                                backgroundPosition: ["0%", "100%"],
                                backgroundSize: ["100%", "200%"]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
                        >
                            NOVA
                        </motion.span>
                    </motion.h1>
                    <motion.p
                        initial={{y: 20, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{duration: 0.8, delay: 1}}
                        className="text-xl md:text-2xl mb-8 text-gray-300"
                    >
                        Experience dining in the next dimension
                    </motion.p>
                    <motion.button
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        onClick={() => setActiveSection('reservations')}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-3 rounded-full text-white font-semibold transition-transform duration-300"
                    >
                        Reserve Your Experience
                    </motion.button>
                </motion.div>
            </motion.section>

            {/* Menu Section */}
            <motion.section
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 0.8}}
                viewport={{once: true}}
                className="py-20 px-4 bg-gradient-to-b from-black to-gray-900"
            >
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{y: 20, opacity: 0}}
                        whileInView={{y: 0, opacity: 1}}
                        transition={{duration: 0.6}}
                        viewport={{once: true}}
                        className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500"
                    >
                        Curated Menu
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={menuItemAnimation}
                                whileHover={{
                                    scale: 1.03,
                                    transition: {duration: 0.2}
                                }}
                                onHoverStart={() => setHoveredDish(index)}
                                onHoverEnd={() => setHoveredDish(null)}
                                className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 overflow-hidden"
                            >
                                <div
                                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"/>
                                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                                <p className="text-gray-400 mb-4">{item.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-cyan-500 font-bold">{item.price}</span>
                                    <div className="flex items-center space-x-2">
                                        <Star className="w-4 h-4 text-yellow-500"/>
                                        <span className="text-gray-300">{item.rating}</span>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center space-x-4 text-sm">
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1"/>
                                        <span>{item.prepTime}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {item.dietary.map((diet, i) => (
                                            <span key={i} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                        {diet}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Experience Section */}
            <motion.section
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 0.8}}
                viewport={{once: true}}
                className="py-20 px-4 bg-black"
            >
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{y: 20, opacity: 0}}
                        whileInView={{y: 0, opacity: 1}}
                        transition={{duration: 0.6}}
                        viewport={{once: true}}
                        className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500"
                    >
                        The NOVA Experience
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {specialFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{y: 50, opacity: 0}}
                                whileInView={{y: 0, opacity: 1}}
                                transition={{duration: 0.6, delay: index * 0.2}}
                                viewport={{once: true}}
                                whileHover={{
                                    scale: 1.05,
                                    transition: {duration: 0.2}
                                }}
                                className="text-center p-6 bg-gradient-to-b from-gray-800/50 to-transparent rounded-lg"
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                    className="text-4xl mb-4"
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Reservation Section */}
            <motion.section
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 0.8}}
                viewport={{once: true}}
                className="py-20 px-4 bg-gradient-to-t from-black to-gray-900"
            >
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        initial={{y: 20, opacity: 0}}
                        whileInView={{y: 0, opacity: 1}}
                        transition={{duration: 0.6}}
                        viewport={{once: true}}
                        className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500"
                    >
                        Reserve Your Experience
                    </motion.h2>
                    <motion.form
                        initial={{y: 20, opacity: 0}}
                        whileInView={{y: 0, opacity: 1}}
                        transition={{duration: 0.6, delay: 0.2}}
                        viewport={{once: true}}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.input
                                whileFocus={{scale: 1.02}}
                                type="text"
                                placeholder="Name"
                                className="w-full px-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                            />
                            <motion.input
                                whileFocus={{scale: 1.02}}
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                            />
                            <motion.input
                                whileFocus={{scale: 1.02}}
                                type="date"
                                className="w-full px-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                            />
                            <motion.select
                                whileFocus={{scale: 1.02}}
                                className="w-full px-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                            >
                                <option value="" disabled>Select time</option>
                                <option>18:00</option>
                                <option>19:00</option>
                                <option>20:00</option>
                                <option>21:00</option>
                            </motion.select>
                        </div>
                        <motion.div className="flex gap-4">
                            <motion.select
                                whileFocus={{scale: 1.02}}
                                className="w-full px-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                            >
                                <option value="" disabled selected>Number of guests</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                    <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                                ))}
                            </motion.select>
                            <motion.select
                                whileFocus={{scale: 1.02}}
                                className="w-full px-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                            >
                                <option value="" disabled selected>Dining preference</option>
                                <option>Regular Dining</option>
                                <option>Interactive Experience</option>
                                <option>Chef's Table</option>
                            </motion.select>
                        </motion.div>
                        <motion.textarea
                            whileFocus={{scale: 1.02}}
                            placeholder="Special requests or dietary requirements"
                            className="w-full px-4 py-3 bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 h-24 resize-none"
                        />
                        <motion.button
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
                        >
                            Confirm Reservation
                        </motion.button>
                    </motion.form>
                </div>
            </motion.section>

            {/* Footer */}
            <motion.footer
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 0.8}}
                viewport={{once: true}}
                className="bg-black py-12 px-4"
            >
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div className="text-center md:text-left">
                            <motion.h3
                                whileHover={{scale: 1.05}}
                                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500 mb-4"
                            >
                                NOVA
                            </motion.h3>
                            <p className="text-gray-400">
                                Pioneering the future of culinary experiences
                            </p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-lg font-semibold mb-4">Hours</h4>
                            <div className="text-gray-400">
                                <p>Mon-Thu: 17:00 - 23:00</p>
                                <p>Fri-Sun: 17:00 - 00:00</p>
                            </div>
                        </div>
                        <div className="text-center md:text-right">
                            <h4 className="text-lg font-semibold mb-4">Contact</h4>
                            <div className="text-gray-400">
                                <p>info@novarestaurant.com</p>
                                <p>+1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <p className="text-gray-400 text-sm mb-4 md:mb-0">
                                NOVA Restaurant © 2024 | The Future of Dining
                            </p>
                            <div className="flex space-x-6">
                                {['Instagram', 'Twitter', 'Facebook'].map((social) => (
                                    <motion.a
                                        key={social}
                                        href="#"
                                        whileHover={{scale: 1.1, y: -2}}
                                        className="text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        {social}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.footer>

            {/* Scroll to top button */}
            <motion.button
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-lg z-50"
            >
                <ChevronDown className="w-6 h-6 transform rotate-180"/>
            </motion.button>
        </motion.div>
    );
};

export default App;