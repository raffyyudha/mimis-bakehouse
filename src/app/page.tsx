"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Macarons", img: "/fotobaru/mackaron.jpg" },
  { name: "Cakes", img: "/fotobaru/cakes.jpg" },
  { name: "Cookies", img: "/fotobaru/cookies.jpg" },
  { name: "Cupcakes", img: "/fotobaru/cupcake.jpg" },
  { name: "Chinese New Year Cookies", img: "/fotobaru/cnycookie.jpg" },
  { name: "Christmas Treats", img: "/fotobaru/christmasttreat.jpg" },
  { name: "Special Occasions (Valentine's Day, Mooncake Festival)", img: "/fotobaru/spessialcouction.jpg" },
  { name: "Wedding", img: "/fotobaru/weddingcake.jpg" },
];

const features = [
  { icon: "https://ext.same-assets.com/765638743/3035081009.webp", text: "Order online with 1 week's notice" },
  { icon: "https://ext.same-assets.com/765638743/2844806230.webp", text: "Self-Pickup or Third-party courier booking (Lalamove/Grab)" },
  { icon: "https://ext.same-assets.com/765638743/838673282.webp", text: "Join Hands-on Interactive Baking Workshops & Classes" },
  { icon: "https://ext.same-assets.com/765638743/3170198716.webp", text: "High Standards Food Safety & Preparation Policy" },
];



const faqs = [
  {
    q: "How do I place an order at Mon Chéri Bake?",
    a: "You can place an order directly via WhatsApp! Simply click on any of our specialty categories, favorite items, or the 'Order (WA)' buttons to open a chat directly with Frankie. We will discuss your design preferences, date availability, and confirm your order details."
  },
  {
    q: "What is the minimum pre-order lead time?",
    a: "Since all of our cakes and sweet creations are freshly handmade without preservatives in small batches, we require a minimum pre-order lead time of 1 week."
  },
  {
    q: "What delivery and pickup methods are supported?",
    a: "We offer Self-Pickup directly from our home bakery kitchen in Singapore. Alternatively, customers can independently book third-party courier services (such as GrabExpress Car or Lalamove) for collection."
  },
  {
    q: "What are your kitchen hygiene and food safety standards?",
    a: "We take food hygiene and safety very seriously. Our baking workspace is sanitised regularly, ingredients are stored under proper conditions, and we use dedicated baking equipment separate from regular household cooking utensils."
  },
  {
    q: "Does Mon Chéri Bake host baking classes and workshops?",
    a: "Yes! We conduct Baking Workshops & Class Registrations guided directly by our Operations Manager, Frankie. The classes focus on hands-on techniques for cake decorating, cookies, and macarons."
  }
];

export default function Home() {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const openWhatsApp = (message?: string) => {
    window.open("https://wa.me/6597254135", "_blank");
  };

  return (
    <main className="min-h-screen relative">
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6597254135"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-[#25d366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl z-50 flex items-center justify-center transition-all hover:scale-110 group border-2 border-white/80"
        title="Chat with Frankie on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25d366] opacity-75 animate-ping -z-10 group-hover:opacity-0 transition-opacity"></span>
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute right-16 bg-gray-800 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none whitespace-nowrap font-semibold">
          Chat with Frankie
        </span>
      </a>

      {/* Top Banner */}
      {!bannerDismissed && (
        <div className="bg-[#ffe066] text-center py-2 text-sm px-4">
          <span>📍 Self-Pickup from Home Bakery Kitchen or Third-Party Courier (Lalamove/Grab) booking! </span>
          <button type="button" onClick={() => setBannerDismissed(true)} className="text-[#c084a0] hover:underline ml-1 font-bold">Dismiss</button>
        </div>
      )}

      {/* Blue Delivery Bar */}
      <div className="bg-[#6b8cae] text-white text-center py-2 text-xs font-medium tracking-wider px-4">
        PRE-ORDER TIMELINE: MINIMUM 1 WEEK IN ADVANCE
      </div>

      {/* Header */}
      <header className="bg-[#dbe3ee] py-4 relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Mon Chéri Bake Logo" width={60} height={60} className="rounded-full object-cover" />
            <span className="text-2xl font-bold text-[#5a4a3a] whitespace-nowrap leading-none tracking-wide">Mon Chéri Bake</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
            <a href="#specialties" className="hover:text-gray-900 font-medium">SPECIALTIES</a>
            <a href="#workshops" className="hover:text-gray-900 font-medium">WORKSHOPS</a>
            <button type="button" onClick={() => openWhatsApp("Hi Frankie, I'd like to request a quote for a custom cake.")} className="hover:text-gray-900 font-medium">CUSTOM CAKE</button>
            <a href="#about-mon-cheri" className="hover:text-gray-900">ABOUT MON CHÉRI BAKE</a>
            <a href="#contact" className="hover:text-gray-900">CONTACT</a>
          </nav>

          {/* Desktop Nav Right */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
            <button type="button" onClick={() => openWhatsApp("Hi Frankie, I'd like to make an inquiry with Mon Chéri Bake.")} className="text-[#c084a0] hover:text-[#a06080] flex items-center gap-2 font-medium">
              WHATSAPP CHAT <span>💬</span>
            </button>
          </div>

          {/* Mobile Hamburguer button (visible on mobile only) */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#dbe3ee] border-t border-gray-300/40 px-6 py-4 flex flex-col gap-3 relative z-15 shadow-inner">
          <a 
            href="#specialties" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="hover:text-[#c084a0] font-semibold text-sm text-left py-2 border-b border-white/20 text-gray-800"
          >
            SPECIALTIES
          </a>
          <a 
            href="#workshops" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="hover:text-[#c084a0] font-semibold text-sm text-left py-2 border-b border-white/20 text-gray-800"
          >
            WORKSHOPS
          </a>
          <button 
            type="button" 
            onClick={() => { openWhatsApp("Hi Frankie, I'd like to request a quote for a custom cake."); setIsMobileMenuOpen(false); }} 
            className="hover:text-[#c084a0] font-semibold text-sm text-left py-2 border-b border-white/20 text-gray-800 text-left"
          >
            CUSTOM CAKE
          </button>
          <a 
            href="#about-mon-cheri" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-[#c084a0] font-semibold text-sm text-left py-2 border-b border-white/20 text-gray-800"
          >
            ABOUT MON CHÉRI BAKE
          </a>
          <a 
            href="#contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-[#c084a0] font-semibold text-sm text-left py-2 border-b border-white/20 text-gray-800"
          >
            CONTACT
          </a>
          <button 
            type="button" 
            onClick={() => { openWhatsApp("Hi Frankie, I'd like to make an inquiry with Mon Chéri Bake."); setIsMobileMenuOpen(false); }} 
            className="text-[#c084a0] hover:text-[#a06080] font-bold text-sm text-left py-2 flex items-center gap-2"
          >
            WHATSAPP CHAT 💬
          </button>
        </div>
      )}

      {/* Hero Section - fully bright background (no dark overlay) */}
      <section 
        className="relative py-24 md:py-32 text-center bg-cover bg-center bg-no-repeat border-b border-[#e6dace]"
        style={{ 
          backgroundImage: `url('/heroimg.jpeg')` 
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-2xl font-semibold text-white mb-2 tracking-wide" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6), 2px 2px 10px rgba(0,0,0,0.4)' }}>Welcome to...</p>
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-wide uppercase whitespace-nowrap" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7), 0 0 15px rgba(0,0,0,0.5)' }}>
            MON CHÉRI BAKE
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 max-w-md mx-auto px-4">
            <button type="button" onClick={() => openWhatsApp("Hi Frankie, I'd like to place an order.")} className="w-full sm:w-auto bg-[#c084a0] text-white px-8 py-3 rounded hover:bg-[#a06080] transition uppercase font-semibold shadow-md">Order (WA)</button>
            <a href="#workshops" className="w-full sm:w-auto bg-[#c084a0] text-white px-8 py-3 rounded hover:bg-[#a06080] transition uppercase font-semibold shadow-md text-center">Workshops</a>
            <button type="button" onClick={() => openWhatsApp("Hi Frankie, I'd like to request a quote for a custom cake.")} className="w-full sm:w-auto bg-[#c084a0] text-white px-8 py-3 rounded hover:bg-[#a06080] transition uppercase font-semibold shadow-md">Quote Request</button>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="hero-bg confetti-bg py-16 text-center border-b border-[#e6dace]">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed text-sm md:text-base font-medium" id="about-mon-cheri">
            Established in 2015, Mon Chéri Bake is a home-based handmade baking journey where every creation is made with passion, care, and a sprinkle of love. Each treat is thoughtfully crafted in small batches, bringing together the joy of baking and the warmth of homemade goodness. We believe every bake tells a story — a story made with dedication, passion, and heart. Baked with joy, made with love, and created from the heart. ❤️
          </p>
        </div>
      </section>

      {/* It's All About the Cake */}
      <section id="specialties" className="py-16 bg-white border-b border-[#e6dace]/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#2e2b2d] mb-2 tracking-wide">Our Selected Specialties</h2>
          <p className="text-gray-600 mb-10">Baked with joy, made with love, and created from the heart. ❤️</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button type="button" onClick={() => openWhatsApp(`Hi Frankie, I'm interested in ordering ${cat.name}.`)} key={cat.name} className="group text-center w-full">
                <div className="aspect-square overflow-hidden rounded-lg mb-3">
                  <Image src={cat.img} alt={cat.name} width={300} height={300} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <h3 className="font-semibold text-sm text-gray-800 tracking-wide">{cat.name}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-[#dbe3ee] py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {features.map((f) => (
            <div key={f.text} className="flex flex-col items-center">
              <Image src={f.icon} alt="" width={100} height={100} className="mb-4" />
              <p className="text-sm text-gray-700">{f.text}</p>
            </div>
          ))}
        </div>
      </section>



      {/* Delivery & Pickup */}
      <section className="bg-[#dda9c3]/30 py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-[#2e2b2d] mb-6 tracking-wide">Delivery & Pickup</h2>
            <p className="text-gray-700 leading-relaxed">
              We offer self-pickup from our home bakery kitchen, or you can book third-party couriers such as Grab and Lalamove. As our creations are freshly made without preservatives, they are best enjoyed soon after pickup or delivery. Please note that all orders require a minimum of 1 week in advance.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-8 border-white/60 shadow-lg relative bg-white">
              <Image 
                src="/delivery_pickup_new.png" 
                alt="Singapore Delivery & Pickup Map Illustration" 
                width={320} 
                height={320} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Baking Workshops */}
      <section id="workshops" className="watercolor-bg py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-[#2e2b2d] mb-6 tracking-wide">Baking Workshops</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Learn the art of handcrafted baking! Join Operations Manager Frankie for hands-on, small-group baking workshops. We cover everything from piping techniques to cookies, macarons, and artisanal cake decoration. Register today!
            </p>
            <button type="button" onClick={() => openWhatsApp("Hi Frankie, I'd like to inquire about registering for a baking workshop.")} className="bg-[#c084a0] text-white px-6 py-3 rounded hover:bg-[#a06080] transition uppercase font-semibold">Browse Classes</button>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg border border-[#e6dace]">
            <Image src="/workshop.jpg" alt="Baking Workshop at Mon Chéri Bake" width={500} height={350} className="w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Food Safety Policy */}
      <section className="py-16 bg-white watercolor-bg">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center flex-shrink-0 mb-6 md:mb-0">
            <div className="w-72 h-72 rounded-full overflow-hidden border-8 border-[#dbe3ee] bg-white shadow-md">
              <Image src="/food_safety.png" alt="Food Safety" width={300} height={300} className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold text-[#2e2b2d] mb-6 tracking-wide">Food Safety Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              At Mon Chéri Bake, every creation is handmade with care, passion, and attention to quality. We are committed to maintaining a clean and organised baking workspace, using fresh and quality ingredients, proper handling and storage of ingredients, regular cleaning and sanitising of baking areas, and using dedicated baking equipment separated from regular household use to maintain the highest hygiene standards.
            </p>
            <button type="button" onClick={() => openWhatsApp("Hi Frankie, I'd like to contact you regarding food safety / other inquiries.")} className="bg-[#c084a0] text-white px-6 py-3 rounded hover:bg-[#a06080] transition uppercase font-semibold">Contact Us</button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#a5c79a] py-16 text-white" id="faq">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-2 tracking-wide drop-shadow-sm">Frequently Asked Questions (FAQ)</h2>
          <p className="text-center text-xs uppercase tracking-widest text-[#dbe3ee]/80 mb-10 font-bold">Frequently Asked Questions</p>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="border-b border-white/20 pb-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex justify-between items-center text-left py-3 focus:outline-none hover:text-[#dbe3ee] transition duration-200"
                  >
                    <span className="font-bold text-sm sm:text-base pr-4">{faq.q}</span>
                    <span className="text-xl font-bold flex-shrink-0">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs sm:text-sm text-white/90 leading-relaxed pl-1 animate-in fade-in slide-in-from-top duration-250">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Redesigned Premium Footer */}
      <footer id="contact" className="bg-[#2c1a17] text-[#faf6f0] py-16 border-t border-[#e6dace]/10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Mon Chéri Bake Logo" width={48} height={48} className="rounded-full object-cover bg-white/10 p-1" />
              <div className="text-left">
                <h3 className="text-2xl font-bold text-[#c084a0] leading-none tracking-wide">Mon Chéri Bake</h3>
                <p className="text-[10px] uppercase tracking-widest text-[#a5c79a] font-bold mt-1">Singapore</p>
              </div>
            </div>
            <p className="text-xs text-[#faf6f0]/70 leading-relaxed">
              A home-based handmade baking journey prepared with passion, care, and a sprinkle of love. We are committed to serving delicious treats and sharing joyful baking skills.
            </p>
            {/* Official SVG icons replacing standard emojis */}
            <div className="flex gap-3 pt-2">
              <a 
                href="https://www.facebook.com/i.love.moncheribake/" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#c084a0] flex items-center justify-center transition hover:scale-105 text-[#faf6f0]" 
                title="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com/i.love.moncheribake?igshid=1vgij421ryza4" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#c084a0] flex items-center justify-center transition hover:scale-105 text-[#faf6f0]" 
                title="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a 
                href="https://vt.tiktok.com/ZSQKXeco7/" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#c084a0] flex items-center justify-center transition hover:scale-105 text-[#faf6f0]" 
                title="TikTok"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.34a10.13 10.13 0 01-1.87-1.43v7.43c.02 1.5-.24 3.05-.98 4.39a8.62 8.62 0 01-3.09 3.56c-1.52.92-3.32 1.34-5.09 1.2-1.78-.1-3.53-.78-4.93-1.9a8.66 8.66 0 01-2.9-4.88c-.37-1.76-.2-3.61.49-5.24a8.6 8.6 0 014.28-4.52c1.61-.83 3.44-1.09 5.24-.76v4.08c-1.24-.26-2.58-.1-3.67.55a4.57 4.57 0 00-2.03 2.8c-.23 1.01-.02 2.11.58 2.98.6.89 1.56 1.49 2.62 1.67 1.06.19 2.2-.04 3.07-.68a4.58 4.58 0 001.79-3.21c.02-3.13.01-6.27.01-9.4z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm text-[#c084a0] uppercase tracking-wider mb-5 pb-1 border-b border-white/10">Mon Chéri</h4>
            <ul className="space-y-2.5 text-xs text-[#faf6f0]/80">
              <li><button type="button" onClick={() => openWhatsApp("Hi Frankie, I'd like to inquire about baking workshops.")} className="hover:text-[#c084a0] transition text-left">Workshops</button></li>
              <li><a href="#about-mon-cheri" className="hover:text-[#c084a0] transition block">Our Story</a></li>
              <li><a href="#contact" className="hover:text-[#c084a0] transition block">Self-Pickup</a></li>
              <li><button type="button" onClick={() => openWhatsApp("Hi Frankie, I'd like to ask about your food safety policy.")} className="hover:text-[#c084a0] transition text-left">Food Safety</button></li>
              <li><a href="#contact" className="hover:text-[#c084a0] transition block">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-[#c084a0] uppercase tracking-wider mb-5 pb-1 border-b border-white/10">Specialties</h4>
            <ul className="space-y-2.5 text-xs text-[#faf6f0]/80">
              <li><button type="button" onClick={() => openWhatsApp("Hi Frankie, I'd like to order a custom cake.")} className="hover:text-[#c084a0] transition text-left">Artisanal Cakes</button></li>
              <li><button type="button" onClick={() => openWhatsApp("Hi Frankie, I'd like to order a seasonal gift box.")} className="hover:text-[#c084a0] transition text-left">Seasonal Gift Boxes</button></li>
              <li><button type="button" onClick={() => openWhatsApp("Hi Frankie, I'd like to order cookies.")} className="hover:text-[#c084a0] transition text-left">Handcrafted Cookies</button></li>
              <li><button type="button" onClick={() => openWhatsApp("Hi Frankie, I'd like to order macarons.")} className="hover:text-[#c084a0] transition text-left">Premium Macarons</button></li>
              <li><button type="button" onClick={() => openWhatsApp("Hi Frankie, I'd like to order brownies.")} className="hover:text-[#c084a0] transition text-left">Fudgy Brownies</button></li>
              <li><button type="button" onClick={() => openWhatsApp("Hi Frankie, I'd like to order cupcakes.")} className="hover:text-[#c084a0] transition text-left">Cupcakes</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-[#c084a0] uppercase tracking-wider mb-5 pb-1 border-b border-white/10">Contact & Location</h4>
            <div className="space-y-4 text-xs text-[#faf6f0]/80">
              <div className="leading-relaxed">
                <span className="font-bold text-white">Main Kitchen:</span><br />
                Self-Pickup Singapore<br />
                (Home-based Kitchen)
              </div>
              <div className="space-y-1">
                <div>
                  <span className="font-bold text-white">Contact Frankie:</span><br />
                  <a href="https://wa.me/6597254135" target="_blank" rel="noreferrer" className="hover:text-[#c084a0] transition flex items-center gap-1.5 mt-0.5 font-semibold">
                    📞 +65 9725 4135 (WA)
                  </a>
                </div>
                <div className="pt-1.5">
                  <span className="font-bold text-white">Business Email:</span><br />
                  <a href="mailto:mon.cheri.bake@gmail.com" className="hover:text-[#c084a0] transition block mt-0.5">
                    ✉️ mon.cheri.bake@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-[#e6dace]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#faf6f0]/60 text-center md:text-left font-sans">
          <p>© 2026 Mon Chéri Bake. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
