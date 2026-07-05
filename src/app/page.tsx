"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { slug: "macarons", name: "Macarons", img: "/Feedback/word/media/macaronsbaru.jpeg" },
  { slug: "cakes", name: "Cakes", img: "/Feedback/word/media/cakebaru.jpeg" },
  { slug: "cookies", name: "Cookies", img: "/Feedback/word/media/cookiesbaru.jpeg" },
  { slug: "cupcakes", name: "Cupcakes", img: "/Feedback/word/media/cupcakesbaru.jpeg" },
  { slug: "cny-cookies", name: "Chinese New Year Cookies", img: "/Feedback/word/media/cnybaru.jpeg" },
  { slug: "christmas-treats", name: "Christmas Treats", img: "/Feedback/word/media/chritsmasttreatsbaryu.jpeg" },
  { slug: "special-occasions", name: "Special Occasions", img: "/Feedback/word/media/specialoccasionbaru.jpeg" },
  { slug: "handy-treats", name: "Handy Treats", img: "/Feedback/word/media/handytreatesbaru.jpeg" },
  { slug: "rollcake", name: "Roll Cakes", img: "/albums/rollcake/129056462_4641810775888832_2827320090733285357_n.jpg" },
];

const categoryDisplayNames: Record<string, string> = {
  macarons: "Macarons",
  cakes: "Cakes",
  cookies: "Cookies",
  cupcakes: "Cupcakes",
  "cny-cookies": "Chinese New Year Cookies",
  "christmas-treats": "Christmas Treats",
  "special-occasions": "Special Occasions",
  "handy-treats": "Handy Treats",
  rollcake: "Roll Cakes",
  workshops: "Workshops",
};

const albumPhotos: Record<string, string[]> = {
  macarons: [
    "/albums/macarons/101072984_3796324527104132_5188242037400403968_n.jpg",
    "/albums/macarons/107607873_3963516337051616_5476259058296997516_n.jpg",
    "/albums/macarons/117237500_4090345424368706_2073769802178012337_n.jpg",
    "/albums/macarons/93844868_3640421506027769_3156385226905616384_n.jpg",
  ],
  cakes: [
    "/albums/cakes/117590463_4128645447205370_28364431248957582_n.jpg",
    "/albums/cakes/118580616_4212054392197808_9025770118981895096_n.jpg",
    "/albums/cakes/135556712_4804755429594365_857285175300432791_n.jpg",
    "/albums/cakes/158212999_5070981869638385_6989175094749494404_n.jpg",
  ],
  cookies: [],
  cupcakes: [
    "/albums/cupcakes/119219289_4282165745186672_4960263698569376344_n.jpg",
    "/albums/cupcakes/121967186_4460236684046243_4742567535709393830_n.jpg",
    "/albums/cupcakes/124943328_4555548734515037_3116405311042009949_n.jpg",
    "/albums/cupcakes/557365500_31367953779514502_4802339777506547852_n.jpg",
  ],
  "cny-cookies": [
    "/albums/cny-cookies/49089386_2357568854313047_1001483706528956416_n.jpg",
    "/albums/cny-cookies/49129583_2361889227214343_4453225472079167488_n.jpg",
    "/albums/cny-cookies/49191245_2349112878491978_1681082545053106176_n.jpg",
    "/albums/cny-cookies/49380222_2350842108319055_5621501274315816960_n.jpg",
  ],
  "christmas-treats": [
    "/albums/christmas-treats/129056462_4641810775888832_2827320090733285357_n.jpg",
    "/albums/christmas-treats/131233438_4712961508773758_3992632452432737281_n.jpg",
    "/albums/christmas-treats/48407303_2337079029695363_2186716950183280640_n.jpg",
    "/albums/christmas-treats/48417425_2344757328927533_9092601621405237248_n.jpg",
  ],
  "special-occasions": [],
  "handy-treats": [],
  rollcake: [
    "/albums/rollcake/129056462_4641810775888832_2827320090733285357_n.jpg",
    "/albums/rollcake/131233438_4712961508773758_3992632452432737281_n.jpg",
    "/albums/rollcake/48407303_2337079029695363_2186716950183280640_n.jpg",
    "/albums/rollcake/48417425_2344757328927533_9092601621405237248_n.jpg",
  ],
  workshops: [],
};

const features = [
  { icon: "https://ext.same-assets.com/765638743/3035081009.webp", text: "Order online with 1 week's notice" },
  { icon: "https://ext.same-assets.com/765638743/2844806230.webp", text: "Self-Pickup or Third-party courier booking (Lalamove/Grab)" },
  { icon: "https://ext.same-assets.com/765638743/838673282.webp", text: "Join Hands-on Interactive Baking Workshops & Classes" },
  { icon: "https://ext.same-assets.com/765638743/3170198716.webp", text: "High Standards Food Safety & Preparation Policy" },
];



const faqs = [
  {
    q: "How do I place an order at Mon Chéri Bake?",
    a: "Contact Mon Chéri Bake directly via WhatsApp or Email. We'll assist you with your order, discuss your requirements, confirm availability, and finalize the details with you."
  },
  {
    q: "What is the minimum pre-order lead time?",
    a: "Each Mon Chéri Bake creation is handcrafted to order using fresh ingredients and made in small batches. To ensure every order receives the attention it deserves, we recommend placing your order at least one week in advance."
  },
  {
    q: "What delivery and pickup options are available?",
    a: "We offer self-pickup from our home bakery in Singapore. If you prefer delivery, you may arrange a third-party courier service, such as GrabExpress or Lalamove, to collect your order on your behalf."
  },
  {
    q: "What are your kitchen hygiene and food safety standards?",
    a: "Every Mon Chéri Bake creation is prepared with the highest standards of hygiene and care. Our baking workspace is regularly cleaned and sanitised, ingredients are stored under proper conditions to preserve freshness, and dedicated baking equipment is used to ensure a safe and hygienic preparation process."
  },
  {
    q: "Does Mon Chéri Bake host baking classes and workshops?",
    a: "Absolutely! We offer engaging, hands-on baking workshops designed for beginners and baking enthusiasts alike. Our classes include cake decorating, cookie baking, and macaron-making, with private sessions available for children's parties, small corporate team-building events, and special occasions. Get in touch with us via WhatsApp or Email for more information and bookings."
  }
];

export default function Home() {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeAlbum, setActiveAlbum] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (activeAlbum || selectedPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeAlbum, selectedPhoto]);

  const openWhatsApp = (message?: string) => {
    const url = message 
      ? `https://wa.me/6597254135?text=${encodeURIComponent(message)}` 
      : "https://wa.me/6597254135";
    window.open(url, "_blank");
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
            <a href="#about-mon-cheri" className="hover:text-gray-900 font-medium">ABOUT MON CHÉRI BAKE</a>
            <a href="#our-creations" className="hover:text-gray-900 font-medium">OUR CREATIONS</a>
            <a href="#workshops" className="hover:text-gray-900 font-medium">WORKSHOPS</a>
            <a href="#faq" className="hover:text-gray-900 font-medium">FAQ</a>
            <a href="#contact" className="hover:text-gray-900 font-medium">CONTACT</a>
          </nav>

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
            href="#about-mon-cheri" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-[#c084a0] font-semibold text-sm text-left py-2 border-b border-white/20 text-gray-800"
          >
            ABOUT MON CHÉRI BAKE
          </a>
          <a 
            href="#our-creations" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="hover:text-[#c084a0] font-semibold text-sm text-left py-2 border-b border-white/20 text-gray-800"
          >
            OUR CREATIONS
          </a>
          <a 
            href="#workshops" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="hover:text-[#c084a0] font-semibold text-sm text-left py-2 border-b border-white/20 text-gray-800"
          >
            WORKSHOPS
          </a>
          <a 
            href="#faq" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-[#c084a0] font-semibold text-sm text-left py-2 border-b border-white/20 text-gray-800"
          >
            FAQ
          </a>
          <a 
            href="#contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-[#c084a0] font-semibold text-sm text-left py-2 border-b border-white/20 text-gray-800"
          >
            CONTACT
          </a>
        </div>
      )}

      {/* Hero Section - complete image without overlay text/buttons, full screen */}
      <section 
        className="w-full h-[calc(100vh-124px)] min-h-[450px] bg-cover bg-center bg-no-repeat border-b border-[#e6dace]"
        style={{ 
          backgroundImage: `url('/heroimg.jpeg')` 
        }}
      />

      {/* Description Section */}
      <section className="hero-bg confetti-bg py-16 text-center border-b border-[#e6dace]">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed text-sm md:text-base font-medium" id="about-mon-cheri">
            Established in 2015, Mon Chéri Bake is a home-based handmade baking journey where every creation is made with passion, care, and a sprinkle of love. Each treat is thoughtfully crafted in small batches, bringing together the joy of baking and the warmth of homemade goodness. We believe every bake tells a story — a story made with dedication, passion, and heart. Baked with joy, made with love, and created from the heart. ❤️
          </p>
        </div>
      </section>

      {/* Our Creations Section */}
      <section id="our-creations" className="py-16 bg-white border-b border-[#e6dace]/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#2e2b2d] mb-2 tracking-wide">Our Creations</h2>
          <p className="text-gray-600 mb-10">Baked with joy, made with love, and created from the heart. ❤️</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button 
                type="button"
                onClick={() => setActiveAlbum(cat.slug)}
                key={cat.slug} 
                className="group text-center w-full block text-decoration-none focus:outline-none"
              >
                <div className="aspect-square overflow-hidden rounded-lg mb-3">
                  <Image src={cat.img} alt={cat.name} width={300} height={300} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <h3 className="font-semibold text-sm text-gray-800 tracking-wide group-hover:text-[#c084a0] transition">{cat.name}</h3>
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
            <p className="text-gray-700 leading-relaxed mb-4">
              Whether you&apos;re looking for a fun family activity, a unique children&apos;s party, or a memorable corporate team-building experience, Mon Chéri Bake offers hands-on baking workshops for all ages and skill levels. Our small-group sessions provide a relaxed and interactive environment where participants can learn baking and decorating techniques while creating delicious treats together. Workshops can be tailored for families, children, friends, schools, and small corporate teams, making every session a fun, creative, and rewarding experience.
            </p>
            <div className="mb-4 text-gray-700">
              <p className="font-bold mb-2">Perfect for:</p>
              <ul className="space-y-1.5 pl-1">
                <li>👨‍👩‍👧‍👦 Family Bonding</li>
                <li>🎂 Children&apos;s Birthday Parties</li>
                <li>🏢 Small Corporate Team Building</li>
                <li>👩‍🍳 Friends &amp; Private Groups</li>
                <li>🎓 Schools &amp; Community Groups</li>
                <li>🎉 Special Celebrations</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Workshops are conducted in small groups to ensure a personalised and enjoyable learning experience. Contact us via WhatsApp or Email to discuss your preferred workshop and group size.
            </p>
          </div>
          <div 
            onClick={() => setActiveAlbum("workshops")}
            className="rounded-lg overflow-hidden shadow-lg border border-[#e6dace] hover:scale-[1.02] transition duration-300 cursor-pointer"
          >
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
            <p className="text-gray-700 leading-relaxed">
              At Mon Chéri Bake, every creation is handmade with care, passion, and attention to quality. We are committed to maintaining a clean and organised baking workspace, using fresh and quality ingredients, proper handling and storage of ingredients, regular cleaning and sanitising of baking areas, and using dedicated baking equipment separated from regular household use to maintain the highest hygiene standards.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#b2cbe3] py-16 text-[#1c2e40]" id="faq">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#1c2e40] mb-2 tracking-wide drop-shadow-sm">Frequently Asked Questions (FAQ)</h2>
          <p className="text-center text-xs uppercase tracking-widest text-[#5c7080] mb-10 font-bold">Frequently Asked Questions</p>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="border-b border-black/10 pb-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex justify-between items-center text-left py-3 focus:outline-none hover:text-[#c084a0] transition duration-200 text-[#1c2e40]"
                  >
                    <span className="font-bold text-sm sm:text-base pr-4">{faq.q}</span>
                    <span className="text-xl font-bold flex-shrink-0">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs sm:text-sm text-[#2c3e50] leading-relaxed pl-1 animate-in fade-in slide-in-from-top duration-250">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Simplified Footer */}
      <footer id="contact" className="bg-[#2c1a17] text-[#faf6f0] py-16 border-t border-[#e6dace]/10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Mon Chéri Bake Logo" width={48} height={48} className="rounded-full object-cover bg-white/10 p-1" />
              <div className="text-left">
                <h3 className="text-2xl font-bold text-[#faf6f0] leading-none tracking-wide">Mon Chéri Bake</h3>
                <p className="text-[10px] uppercase tracking-widest text-[#a5c79a] font-bold mt-1">Singapore</p>
              </div>
            </div>
            
            {/* Social Icons */}
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

          <div className="space-y-4">
            <h4 className="font-bold text-lg text-[#faf6f0] uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm text-[#faf6f0]/90">
              <div>
                <a 
                  href="https://wa.me/6597254135?text=Hi%20Mon%20Ch%C3%A9ri%20Bake!%20I%20would%20like%20to%20..." 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-[#c084a0] transition flex items-center gap-2 font-semibold"
                >
                  📞 +65 9725 4135 (WhatsApp)
                </a>
              </div>
              <div>
                <a 
                  href="mailto:mon.cheri.bake@gmail.com?subject=Hi%20Mon%20Ch%C3%A9ri%20Bake!%20I%20would%20like%20to%20..." 
                  className="hover:text-[#c084a0] transition flex items-center gap-2 font-semibold"
                >
                  ✉️ mon.cheri.bake@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-[#e6dace]/10 flex justify-between items-center text-xs text-[#faf6f0]/60">
          <p>© 2026 Mon Chéri Bake. All rights reserved.</p>
        </div>
      </footer>

      {/* Album Gallery Modal */}
      {activeAlbum && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[50] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
          onClick={() => setActiveAlbum(null)}
        >
          <div 
            className="bg-[#faf6f0] text-gray-800 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-[#e6dace]/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#dbe3ee]/60 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-[#e6dace]/40 flex-shrink-0">
              <div className="text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-[#2e2b2d] tracking-wide">
                  {categoryDisplayNames[activeAlbum] || activeAlbum}
                </h2>
                <p className="text-gray-500 text-xs font-medium mt-0.5">
                  {albumPhotos[activeAlbum]?.length === 0 
                    ? "Coming Soon" 
                    : `${albumPhotos[activeAlbum]?.length || 0} photo${(albumPhotos[activeAlbum]?.length || 0) === 1 ? "" : "s"} in this album`}
                </p>
              </div>
              <button 
                type="button" 
                onClick={() => setActiveAlbum(null)}
                className="w-10 h-10 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-500 hover:text-gray-800 transition text-2xl font-light focus:outline-none"
              >
                &times;
              </button>
            </div>

            {/* Modal Content / Photo Grid */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {(!albumPhotos[activeAlbum] || albumPhotos[activeAlbum].length === 0) ? (
                <div className="max-w-md mx-auto bg-white/60 backdrop-blur-sm border border-dashed border-[#e6dace] rounded-2xl p-10 text-center shadow-sm my-12">
                  <div className="text-4xl mb-4">🥐</div>
                  <h3 className="text-lg font-bold text-gray-700 mb-2">Fresh Bakes Coming Soon!</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    We are currently baking and preparing photos for this category. Stay tuned for fresh creations! ❤️
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {albumPhotos[activeAlbum].map((photo, index) => (
                    <div 
                      key={photo}
                      onClick={() => setSelectedPhoto(photo)}
                      className="group relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.03] transition-all duration-300 cursor-pointer border border-gray-100 animate-in fade-in zoom-in duration-300"
                    >
                      <Image 
                        src={photo} 
                        alt={`${categoryDisplayNames[activeAlbum]} photo ${index + 1}`} 
                        fill
                        className="object-cover group-hover:brightness-95 transition-all duration-300"
                        sizes="(max-w-768px) 50vw, (max-w-1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-white/90 text-gray-800 text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          View Photo 🔍
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          <button 
            type="button" 
            className="absolute top-6 right-6 text-white hover:text-gray-300 text-3xl font-light focus:outline-none transition z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            &times;
          </button>
          
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center">
            <Image 
              src={selectedPhoto} 
              alt="Fullscreen photo" 
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </main>
  );
}
