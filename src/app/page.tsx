"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "ARTISANAL CAKES", img: "https://ext.same-assets.com/765638743/1105166514.webp" },
  { name: "CUPCAKES", img: "https://ext.same-assets.com/765638743/1025975378.webp" },
  { name: "BROWNIES & COOKIES", img: "https://ext.same-assets.com/765638743/1673140426.webp" },
  { name: "CUSTOM CELEBRATIONS", img: "https://ext.same-assets.com/765638743/4236784212.webp" },
  { name: "SINGAPORE PICKUP", img: "https://ext.same-assets.com/765638743/4268308614.webp" },
  { name: "BAKING WORKSHOPS", img: "https://ext.same-assets.com/765638743/2838148569.webp" },
  { name: "CLASS REGISTRATIONS", img: "https://ext.same-assets.com/765638743/3609213772.webp" },
  { name: "FESTIVE GIFT BOXES", img: "https://ext.same-assets.com/765638743/2108010311.webp" },
];

const features = [
  { icon: "https://ext.same-assets.com/765638743/3035081009.webp", text: "Order online with 1 week's notice" },
  { icon: "https://ext.same-assets.com/765638743/2844806230.webp", text: "Self-Pickup or Third-party courier booking (Lalamove/Grab)" },
  { icon: "https://ext.same-assets.com/765638743/838673282.webp", text: "Join Hands-on Interactive Baking Workshops & Classes" },
  { icon: "https://ext.same-assets.com/765638743/3170198716.webp", text: "High Standards Food Safety & Preparation Policy" },
];

const favourites = [
  { name: "Ultimate Birthday Cake", price: "S$38.00 – S$98.00", img: "https://ext.same-assets.com/765638743/1105166514.webp" },
  { name: "Seasonal Festive Gift Box", price: "S$25.00 – S$60.00", img: "https://ext.same-assets.com/765638743/2838148569.webp" },
  { name: "Mixed Cupcake Box", price: "S$24.00", img: "https://ext.same-assets.com/765638743/1025975378.webp" },
  { name: "Chocolate Fudge Brownie Cake", price: "S$38.00 – S$98.00", img: "https://ext.same-assets.com/765638743/1231863782.webp" },
  { name: "Carrot Cake", price: "S$38.00 – S$98.00", img: "https://ext.same-assets.com/765638743/829021797.webp" },
  { name: "Red Velvet Cake", price: "S$38.00 – S$98.00", img: "https://ext.same-assets.com/765638743/582779196.webp" },
  { name: "Victoria Sponge Cake", price: "S$38.00 – S$98.00", img: "https://ext.same-assets.com/765638743/3841681216.webp" },
  { name: "Vintage Heart Cake", price: "S$50.00 – S$95.00", img: "https://ext.same-assets.com/765638743/556842665.webp" },
];

const orderProducts = [
  { id: "bday-cake", name: "Ultimate Birthday Cake", price: 38.00 },
  { id: "festive-box", name: "Seasonal Festive Gift Box", price: 25.00 },
  { id: "cupcake-box", name: "Mixed Cupcake Box", price: 24.00 },
  { id: "brownie-cake", name: "Chocolate Fudge Brownie Cake", price: 38.00 },
  { id: "carrot-cake", name: "Carrot Cake", price: 38.00 },
  { id: "red-velvet", name: "Red Velvet Cake", price: 38.00 },
  { id: "victoria-sponge", name: "Victoria Sponge Cake", price: 38.00 },
  { id: "vintage-heart", name: "Vintage Heart Cake", price: 50.00 },
  { id: "workshop-seat", name: "Baking Workshop Slot", price: 90.00 },
];

const faqs = [
  {
    q: "How do I place an order at Mon Cheri Bake?",
    a: "You can use the 'WhatsApp Order Builder' on this website to select items and enter your details, then click send to connect directly to Frankie's WhatsApp chat. You can also chat with us directly for custom order designs."
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
    q: "Does Mon Cheri Bake host baking classes and workshops?",
    a: "Yes! We conduct Baking Workshops & Class Registrations guided directly by our Operations Manager, Frankie. The classes focus on hands-on techniques for cake decorating, cookies, and macarons."
  }
];

export default function Home() {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Interactive Modals State
  const [isOrderBuilderOpen, setIsOrderBuilderOpen] = useState(false);
  const [isCustomQuoteOpen, setIsCustomQuoteOpen] = useState(false);

  // Form states - Order Builder
  const [orderQtns, setOrderQtns] = useState<{ [key: string]: number }>({});
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [method, setMethod] = useState("Self-Pickup");
  const [notes, setNotes] = useState("");

  // Form states - Custom Quote
  const [quoteName, setQuoteName] = useState("");
  const [quoteDate, setQuoteDate] = useState("");
  const [quoteServings, setQuoteServings] = useState("12-15 servings");
  const [quoteFlavor, setQuoteFlavor] = useState("Signature Chocolate Ganache");
  const [quoteTheme, setQuoteTheme] = useState("");
  const [fileObj, setFileObj] = useState<{ name: string; size: string } | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const [minDate, setMinDate] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const dt = new Date();
    dt.setDate(dt.getDate() + 7);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const handleUpdateQty = (productId: string, amount: number) => {
    setOrderQtns(prev => {
      const val = (prev[productId] || 0) + amount;
      const copy = { ...prev };
      if (val <= 0) {
        delete copy[productId];
      } else {
        copy[productId] = val;
      }
      return copy;
    });
  };

  const calculateTotal = () => {
    return Object.entries(orderQtns).reduce((sum, [id, qty]) => {
      const p = orderProducts.find(x => x.id === id);
      return sum + (p ? p.price * qty : 0);
    }, 0);
  };

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!date) {
      alert("Please select a pickup/delivery date.");
      return;
    }
    if (Object.keys(orderQtns).length === 0) {
      alert("Your order summary is empty. Please select at least one item.");
      return;
    }

    let itemsStr = "";
    Object.entries(orderQtns).forEach(([id, qty]) => {
      const p = orderProducts.find(x => x.id === id);
      if (p) {
        itemsStr += `- ${qty}x ${p.name} ($${(p.price * qty).toFixed(2)})\n`;
      }
    });

    const formattedDate = new Date(date).toLocaleDateString("en-SG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const message = `*MON CHERI BAKE - NEW ORDER*\n` +
      `-------------------------------------------\n` +
      `👤 *Name:* ${name}\n` +
      `📅 *Date:* ${formattedDate}\n` +
      `🚚 *Method:* ${method}\n` +
      `-------------------------------------------\n` +
      `📋 *Order Items:*\n${itemsStr}` +
      `-------------------------------------------\n` +
      `💰 *Total:* S$ ${calculateTotal().toFixed(2)}\n\n` +
      (notes.trim() ? `📝 *Special Notes:* ${notes}\n\n` : "") +
      `Hi Frankie, I'd like to check if these items are available for my date. Thank you!`;

    window.open(`https://wa.me/6597254135?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!quoteDate) {
      alert("Please select your event date.");
      return;
    }
    if (!quoteTheme.trim()) {
      alert("Please describe your custom design theme/details.");
      return;
    }

    const formattedDate = new Date(quoteDate).toLocaleDateString("en-SG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const message = `*MON CHERI BAKE - CUSTOM QUOTE REQUEST*\n` +
      `-------------------------------------------\n` +
      `👤 *Contact Name:* ${quoteName}\n` +
      `📅 *Event Date:* ${formattedDate}\n` +
      `👥 *Servings:* ${quoteServings}\n` +
      `🍰 *Preferred Flavor:* ${quoteFlavor}\n` +
      `💬 *Design & Theme Description:*\n${quoteTheme}\n` +
      `-------------------------------------------\n` +
      (fileObj ? `📸 *Reference Photo:* ${fileObj.name} (Ready to send in WhatsApp)\n` : "") +
      `\nHi Frankie, I would like to get a quote for a custom cake with the details above. I will send the reference photo directly here. Thanks!`;

    window.open(`https://wa.me/6597254135?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileObj({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
      });
      const url = URL.createObjectURL(file);
      setFilePreview(url);
    }
  };

  const handleRemoveFile = () => {
    setFileObj(null);
    setFilePreview(null);
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
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
            <button type="button" onClick={() => setIsOrderBuilderOpen(true)} className="hover:text-gray-900 flex items-center gap-1 font-medium">SPECIALTIES <span className="text-xs">▼</span></button>
            <button type="button" onClick={() => setIsOrderBuilderOpen(true)} className="hover:text-gray-900 flex items-center gap-1 font-medium">WORKSHOPS <span className="text-xs">▼</span></button>
            <button type="button" onClick={() => setIsCustomQuoteOpen(true)} className="hover:text-gray-900 flex items-center gap-1 font-medium">CUSTOM CAKE <span className="text-xs">▼</span></button>
          </nav>

          <Link href="/" className="lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 z-10">
            <div className="text-center">
              <h1 className="font-script text-4xl text-[#5a4a3a]">Mon Cheri</h1>
              <p className="text-[#c084a0] text-xs tracking-[0.3em] font-medium">BAKE</p>
            </div>
          </Link>

          {/* Desktop Nav Right */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
            <a href="#about-mon-cheri" className="hover:text-gray-900">ABOUT MON CHERI</a>
            <a href="#contact" className="hover:text-gray-900">CONTACT</a>
            <button type="button" onClick={() => setIsOrderBuilderOpen(true)} className="text-[#c084a0] hover:text-[#a06080] flex items-center gap-2 font-medium">
              WHATSAPP CHAT <span>🛒</span>
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
          <button 
            type="button" 
            onClick={() => { setIsOrderBuilderOpen(true); setIsMobileMenuOpen(false); }} 
            className="hover:text-[#c084a0] font-semibold text-sm text-left py-2 border-b border-white/20 text-gray-800"
          >
            SPECIALTIES
          </button>
          <button 
            type="button" 
            onClick={() => { setIsOrderBuilderOpen(true); setIsMobileMenuOpen(false); }} 
            className="hover:text-[#c084a0] font-semibold text-sm text-left py-2 border-b border-white/20 text-gray-800"
          >
            WORKSHOPS
          </button>
          <button 
            type="button" 
            onClick={() => { setIsCustomQuoteOpen(true); setIsMobileMenuOpen(false); }} 
            className="hover:text-[#c084a0] font-semibold text-sm text-left py-2 border-b border-white/20 text-gray-800"
          >
            CUSTOM CAKE
          </button>
          <a 
            href="#about-mon-cheri" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-[#c084a0] font-semibold text-sm text-left py-2 border-b border-white/20 text-gray-800"
          >
            ABOUT MON CHERI
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
            onClick={() => { setIsOrderBuilderOpen(true); setIsMobileMenuOpen(false); }} 
            className="text-[#c084a0] hover:text-[#a06080] font-bold text-sm text-left py-2 flex items-center gap-2"
          >
            WHATSAPP CHAT 🛒
          </button>
        </div>
      )}

      {/* Hero Section - fully bright background (no dark overlay) */}
      <section 
        className="relative py-24 md:py-32 text-center bg-cover bg-center bg-no-repeat border-b border-[#e6dace]"
        style={{ 
          backgroundImage: `url('/Remake_foto_background_tanpa_teks_202606221519.jpeg')` 
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-script text-4xl text-white mb-2" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6), 2px 2px 10px rgba(0,0,0,0.4)' }}>Welcome to...</p>
          <h2 className="text-5xl md:text-8xl font-extrabold text-white tracking-wide uppercase" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7), 0 0 15px rgba(0,0,0,0.5)' }}>
            MON CHERI<br />BAKE
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 max-w-md mx-auto px-4">
            <button type="button" onClick={() => setIsOrderBuilderOpen(true)} className="w-full sm:w-auto bg-[#c084a0] text-white px-8 py-3 rounded hover:bg-[#a06080] transition uppercase font-semibold shadow-md">Order (WA)</button>
            <button type="button" onClick={() => setIsOrderBuilderOpen(true)} className="w-full sm:w-auto bg-[#c084a0] text-white px-8 py-3 rounded hover:bg-[#a06080] transition uppercase font-semibold shadow-md">Workshops</button>
            <button type="button" onClick={() => setIsCustomQuoteOpen(true)} className="w-full sm:w-auto bg-[#c084a0] text-white px-8 py-3 rounded hover:bg-[#a06080] transition uppercase font-semibold shadow-md">Quote Request</button>
          </div>
        </div>
      </section>

      {/* Description Section with sprinkles background (below the hero background image) */}
      <section className="hero-bg confetti-bg py-16 text-center border-b border-[#e6dace]">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed text-sm md:text-base font-medium" id="about-mon-cheri">
            Established in 2015, Mon Cheri Bake is a home-based handmade baking journey where every creation is made with passion, care, and a sprinkle of love. Each treat is thoughtfully crafted in small batches, bringing together the joy of baking and the warmth of homemade goodness. We believe every bake tells a story — a story made with dedication, passion, and heart. Baked with joy, made with love, and created from the heart. ❤️
          </p>
        </div>
      </section>

      {/* It's All About the Cake */}
      <section className="py-16 bg-white border-b border-[#e6dace]/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-script text-5xl text-[#2e2b2d] mb-2">Our Selected Specialties</h2>
          <p className="text-gray-600 mb-10">Baked with joy, made with love, and created from the heart. ❤️</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button type="button" onClick={() => setIsOrderBuilderOpen(true)} key={cat.name} className="group text-center w-full">
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

      {/* Mimi's Favourites */}
      <section className="py-16 bg-white border-b border-[#e6dace]/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-script text-5xl text-[#2e2b2d] mb-2">Mon Cheri Favourites</h2>
          <p className="text-gray-600 mb-10">Our handcrafted specialties since 2015</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {favourites.map((p) => (
              <button type="button" onClick={() => setIsOrderBuilderOpen(true)} key={p.name} className="group text-center w-full">
                <div className="aspect-square overflow-hidden rounded-lg mb-3 bg-pink-50">
                  <Image src={p.img} alt={p.name} width={300} height={300} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <h3 className="text-[#7a9ec2] hover:text-[#5a7ea2] text-sm mb-1">{p.name}</h3>
                <p className="text-gray-800 font-medium text-sm">{p.price}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Where We Deliver */}
      <section className="bg-[#dda9c3]/30 py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-script text-5xl text-[#2e2b2d] mb-6">Delivery & Pickup</h2>
            <p className="text-gray-700 leading-relaxed">
              We offer self-pickup from our home bakery kitchen, or you can book third-party couriers such as Grab and Lalamove. As our creations are freshly made without preservatives, they are best enjoyed soon after pickup or delivery. Please note that all orders require a minimum of 1 week in advance.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-8 border-white/60 shadow-lg relative bg-white">
              <Image 
                src="/delivery_pickup.png" 
                alt="Singapore Delivery & Pickup Map Illustration" 
                width={320} 
                height={320} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visit Section */}
      <section className="watercolor-bg py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-script text-5xl text-[#2e2b2d] mb-6">Baking Workshops</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Learn the art of handcrafted baking! Join Operations Manager Frankie for hands-on, small-group baking workshops. We cover everything from piping techniques to cookies, macarons, and artisanal cake decoration. Register today!
            </p>
            <button type="button" onClick={() => setIsOrderBuilderOpen(true)} className="bg-[#c084a0] text-white px-6 py-3 rounded hover:bg-[#a06080] transition uppercase font-semibold">Browse Classes</button>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg border border-[#e6dace]">
            <Image src="/baking_workshop.png" alt="Baking Workshop at Mon Cheri" width={500} height={350} className="w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Book Afternoon Tea */}
      <section className="py-16 bg-white watercolor-bg">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center flex-shrink-0 mb-6 md:mb-0">
            <div className="w-72 h-72 rounded-full overflow-hidden border-8 border-[#dbe3ee] bg-white shadow-md">
              <Image src="/food_safety.png" alt="Food Safety" width={300} height={300} className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <h2 className="font-script text-5xl text-[#2e2b2d] mb-6">Food Safety Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              At Mon Cheri Bake, every creation is handmade with care, passion, and attention to quality. We are committed to maintaining a clean and organised baking workspace, using fresh and quality ingredients, proper handling and storage of ingredients, regular cleaning and sanitising of baking areas, and using dedicated baking equipment separated from regular household use to maintain the highest hygiene standards.
            </p>
            <button type="button" onClick={() => setIsCustomQuoteOpen(true)} className="bg-[#c084a0] text-white px-6 py-3 rounded hover:bg-[#a06080] transition uppercase font-semibold">Contact Us</button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#a5c79a] py-16 text-white" id="faq">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-script text-5xl text-center text-white mb-2 drop-shadow-sm">Frequently Asked Questions (FAQ)</h2>
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
            <div>
              <h3 className="font-script text-4xl text-[#c084a0] font-bold">Mon Cheri</h3>
              <p className="text-[10px] uppercase tracking-widest text-[#a5c79a] font-bold">Bake • Singapore</p>
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
            <h4 className="font-bold text-sm text-[#c084a0] uppercase tracking-wider mb-5 pb-1 border-b border-white/10">Mon Cheri</h4>
            <ul className="space-y-2.5 text-xs text-[#faf6f0]/80">
              <li><button type="button" onClick={() => setIsOrderBuilderOpen(true)} className="hover:text-[#c084a0] transition text-left">Workshops</button></li>
              <li><a href="#about-mon-cheri" className="hover:text-[#c084a0] transition block">Our Story</a></li>
              <li><a href="#contact" className="hover:text-[#c084a0] transition block">Self-Pickup</a></li>
              <li><button type="button" onClick={() => setIsCustomQuoteOpen(true)} className="hover:text-[#c084a0] transition text-left">Food Safety</button></li>
              <li><a href="#contact" className="hover:text-[#c084a0] transition block">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-[#c084a0] uppercase tracking-wider mb-5 pb-1 border-b border-white/10">Specialties</h4>
            <ul className="space-y-2.5 text-xs text-[#faf6f0]/80">
              <li><button type="button" onClick={() => setIsOrderBuilderOpen(true)} className="hover:text-[#c084a0] transition text-left">Artisanal Cakes</button></li>
              <li><button type="button" onClick={() => setIsOrderBuilderOpen(true)} className="hover:text-[#c084a0] transition text-left">Seasonal Gift Boxes</button></li>
              <li><button type="button" onClick={() => setIsOrderBuilderOpen(true)} className="hover:text-[#c084a0] transition text-left">Handcrafted Cookies</button></li>
              <li><button type="button" onClick={() => setIsOrderBuilderOpen(true)} className="hover:text-[#c084a0] transition text-left">Premium Macarons</button></li>
              <li><button type="button" onClick={() => setIsOrderBuilderOpen(true)} className="hover:text-[#c084a0] transition text-left">Fudgy Brownies</button></li>
              <li><button type="button" onClick={() => setIsOrderBuilderOpen(true)} className="hover:text-[#c084a0] transition text-left">Cupcakes</button></li>
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

        <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#faf6f0]/60 text-center md:text-left">
          <p>Copyright 2026 © Mon Cheri Bake · Site by 8th Row</p>
          
          {/* Official copyright row social SVGs replacing basic text/emojis */}
          <div className="flex gap-5 items-center">
            <a href="https://www.facebook.com/i.love.moncheribake/" target="_blank" rel="noreferrer" className="text-[#faf6f0] hover:text-[#c084a0] transition" title="Facebook">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://instagram.com/i.love.moncheribake?igshid=1vgij421ryza4" target="_blank" rel="noreferrer" className="text-[#faf6f0] hover:text-[#c084a0] transition" title="Instagram">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="https://vt.tiktok.com/ZSQKXeco7/" target="_blank" rel="noreferrer" className="text-[#faf6f0] hover:text-[#c084a0] transition" title="TikTok">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.34a10.13 10.13 0 01-1.87-1.43v7.43c.02 1.5-.24 3.05-.98 4.39a8.62 8.62 0 01-3.09 3.56c-1.52.92-3.32 1.34-5.09 1.2-1.78-.1-3.53-.78-4.93-1.9a8.66 8.66 0 01-2.9-4.88c-.37-1.76-.2-3.61.49-5.24a8.6 8.6 0 014.28-4.52c1.61-.83 3.44-1.09 5.24-.76v4.08c-1.24-.26-2.58-.1-3.67.55a4.57 4.57 0 00-2.03 2.8c-.23 1.01-.02 2.11.58 2.98.6.89 1.56 1.49 2.62 1.67 1.06.19 2.2-.04 3.07-.68a4.58 4.58 0 001.79-3.21c.02-3.13.01-6.27.01-9.4z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* MODAL 1: WHATSAPP ORDER BUILDER */}
      {/* ======================================================== */}
      {isOrderBuilderOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 relative shadow-2xl transition-all max-h-[90vh] overflow-y-auto text-left">
            <button 
              type="button" 
              onClick={() => setIsOrderBuilderOpen(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              ✕
            </button>
            <h3 className="font-script text-4xl text-[#5a4a3a] mb-1">WhatsApp Order Builder</h3>
            <p className="text-xs text-[#c084a0] uppercase tracking-wider mb-4 font-semibold">Pre-order minimum 1 week in advance</p>
            
            {/* Scrollable list of products */}
            <div className="max-h-60 overflow-y-auto mb-6 border border-gray-200 rounded-lg p-3 space-y-3 bg-gray-50">
              {orderProducts.map(p => (
                <div key={p.id} className="flex justify-between items-center text-sm border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-gray-800">{p.name}</p>
                    <p className="text-xs text-gray-500 font-medium">S$ {p.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      type="button" 
                      onClick={() => handleUpdateQty(p.id, -1)}
                      className="w-7 h-7 bg-white hover:bg-gray-100 border border-gray-300 text-gray-850 rounded font-extrabold flex items-center justify-center text-sm transition"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-bold text-gray-800">{orderQtns[p.id] || 0}</span>
                    <button 
                      type="button" 
                      onClick={() => handleUpdateQty(p.id, 1)}
                      className="w-7 h-7 bg-white hover:bg-gray-100 border border-gray-300 text-gray-850 rounded font-extrabold flex items-center justify-center text-sm transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Form */}
            <form onSubmit={handleSendOrder} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Name *</label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="Enter your name" 
                  className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c084a0]/50 text-gray-850 bg-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Date (Min 1 week) *</label>
                  <input 
                    type="date" 
                    required 
                    min={minDate}
                    value={date} 
                    onChange={e => setDate(e.target.value)} 
                    className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c084a0]/50 text-gray-850 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Method *</label>
                  <select 
                    value={method} 
                    onChange={e => setMethod(e.target.value)} 
                    className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c084a0]/50 text-gray-850 bg-white"
                  >
                    <option value="Self-Pickup">Self-Pickup (Home Bakery Kitchen)</option>
                    <option value="Third-party Courier">Courier Delivery (Grab/Lalamove)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Special Notes (Cake Writing / Allergies)</label>
                <textarea 
                  value={notes} 
                  onChange={e => setNotes(e.target.value)} 
                  placeholder="e.g. Write 'Happy Birthday Frank' on the cake" 
                  className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c084a0]/50 text-gray-850 bg-white"
                  rows={2}
                />
              </div>
              
              <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-sm font-bold text-gray-800">
                <span>Subtotal:</span>
                <span className="text-base text-[#c084a0]">S$ {calculateTotal().toFixed(2)}</span>
              </div>
              
              <button 
                type="submit" 
                disabled={Object.keys(orderQtns).length === 0}
                className={`w-full p-3.5 rounded-lg font-bold text-sm tracking-wider uppercase transition mt-4 ${
                  Object.keys(orderQtns).length > 0 
                    ? "bg-[#25d366] hover:bg-[#20ba5a] text-white shadow-md"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Send Order to WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: CUSTOM CAKE QUOTE REQUEST */}
      {/* ======================================================== */}
      {isCustomQuoteOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 relative shadow-2xl transition-all max-h-[90vh] overflow-y-auto text-left">
            <button 
              type="button" 
              onClick={() => setIsCustomQuoteOpen(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              ✕
            </button>
            <h3 className="font-script text-4xl text-[#5a4a3a] mb-1">Custom Cake Quote</h3>
            <p className="text-xs text-[#c084a0] uppercase tracking-wider mb-4 font-semibold">Share your custom cake design with Frankie</p>
            
            <form onSubmit={handleSendQuote} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Name *</label>
                <input 
                  type="text" 
                  required 
                  value={quoteName} 
                  onChange={e => setQuoteName(e.target.value)} 
                  placeholder="Enter your name" 
                  className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c084a0]/50 text-gray-850 bg-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Event Date (Min 1 week) *</label>
                  <input 
                    type="date" 
                    required 
                    min={minDate}
                    value={quoteDate} 
                    onChange={e => setQuoteDate(e.target.value)} 
                    className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c084a0]/50 text-gray-850 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Servings *</label>
                  <select 
                    value={quoteServings} 
                    onChange={e => setQuoteServings(e.target.value)} 
                    className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c084a0]/50 text-gray-850 bg-white"
                  >
                    <option value="6-8 servings">6-8 servings (Mini 4\")</option>
                    <option value="12-15 servings">12-15 servings (Standard 6\")</option>
                    <option value="20-25 servings">20-25 servings (Large 8\")</option>
                    <option value="30+ servings">Multi-tier / Wedding (30+ servings)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Preferred Flavor</label>
                <select 
                  value={quoteFlavor} 
                  onChange={e => setQuoteFlavor(e.target.value)} 
                  className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c084a0]/50 text-gray-850 bg-white"
                >
                  <option value="Signature Chocolate Ganache">Signature Chocolate Ganache</option>
                  <option value="Vanilla Raspberry Bliss">Vanilla Raspberry Bliss</option>
                  <option value="Red Velvet Classic">Red Velvet Classic</option>
                  <option value="Matcha White Chocolate">Matcha White Chocolate</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Design & Theme details *</label>
                <textarea 
                  required 
                  value={quoteTheme} 
                  onChange={e => setQuoteTheme(e.target.value)} 
                  placeholder="Describe your design (e.g. pastel floral garden theme with gold flakes)" 
                  className="w-full text-sm p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c084a0]/50 text-gray-850 bg-white"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Inspiration Image Reference</label>
                {!fileObj ? (
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 relative cursor-pointer hover:bg-gray-100 transition">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 font-bold">Select reference photo</p>
                    <p className="text-[10px] text-gray-400">PNG, JPG up to 5MB</p>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-lg p-2.5 flex justify-between items-center text-xs bg-gray-50">
                    <div className="flex items-center gap-2 truncate">
                      {filePreview && (
                        <div className="w-8 h-8 rounded overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                          <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <span className="truncate font-semibold text-gray-700">{fileObj.name} ({fileObj.size})</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={handleRemoveFile} 
                      className="text-red-500 hover:text-red-700 font-bold px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <p className="text-[10px] text-gray-500 mt-1.5 italic">
                  * Note: After clicking submit, please also send the reference image file directly in the WhatsApp chat.
                </p>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white p-3.5 rounded-lg font-bold text-sm tracking-wider uppercase transition mt-4 shadow-md"
              >
                Send Quote Request to WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
