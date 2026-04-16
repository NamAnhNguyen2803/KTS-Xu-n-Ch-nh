import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { IMAGES } from "./constants";

type Tab = "Home" | "Công trình" | "Triết lý" | "Phòng trưng bày" | "Liên hệ";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("Home");
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Auto-slide hero image only on Home tab
  useEffect(() => {
    if (activeTab !== "Home") return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % IMAGES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return (
          <main className="flex-1 grid grid-cols-1 lg:grid-cols-[350px_1fr_300px] px-6 md:px-10 py-6 md:py-10 gap-6 md:gap-10 overflow-hidden">
            {/* Intro Column */}
            <section className="hidden lg:flex flex-col justify-center">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-[10px] uppercase tracking-[0.2em] text-gold mb-5"
              >
                Kiến trúc sư & Nhà thiết kế
              </motion.p>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="font-serif italic text-4xl xl:text-5xl leading-[1.1] mb-5"
              >
                Khai phóng<br />Sự phù phiếm<br />Lộng lẫy
              </motion.h1>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="font-sans font-bold text-sm uppercase tracking-[0.4em] text-gold"
              >
                Xuân Chính
              </motion.span>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="mt-10 text-sm leading-relaxed text-muted/80 max-w-[300px]"
              >
                Theo đuổi phong cách Maximalism, nơi mỗi chi tiết là một câu chuyện, mỗi không gian là một bảo tàng của cảm xúc và sự xa xỉ bậc nhất.
              </motion.p>
            </section>

            {/* Visual Column (Hero) */}
            <section className="relative h-full min-h-[400px] lg:min-h-0">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={heroIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full bg-[#111] border border-gold-dark/30 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                >
                  <img 
                    src={IMAGES[heroIndex]} 
                    alt="Architecture work" 
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700 cursor-pointer"
                    referrerPolicy="no-referrer"
                    onClick={() => setSelectedImage(IMAGES[heroIndex])}
                  />
                  <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 border border-gold/50 p-3 md:p-4 bg-bg/80 backdrop-blur-md">
                    <p className="text-[8px] tracking-[0.2em] uppercase mb-1 text-muted">Dự án tiêu biểu</p>
                    <p className="font-serif italic text-xs md:text-sm text-paper">Kiến trúc Maximalism {heroIndex + 1}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </section>

            {/* Gallery Column */}
            <section className="flex flex-col h-full overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[10px] uppercase tracking-[0.2em] text-gold">Tác phẩm mới nhất</h2>
                <span className="text-[8px] text-muted">{IMAGES.length} Ảnh</span>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4 mb-6">
                {IMAGES.slice(0, 12).map((img, i) => (
                  <motion.div 
                    key={img}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + (i % 10) * 0.05 }}
                    className={`relative aspect-[4/3] cursor-pointer overflow-hidden border ${heroIndex === i ? 'border-gold shadow-[0_0_15px_rgba(197,160,89,0.3)]' : 'border-gold-dark/20'} hover:border-gold/50 transition-all group`}
                    onClick={() => {
                      setHeroIndex(i);
                      setSelectedImage(img);
                    }}
                  >
                    <img src={img} alt={`Work ${i + 1}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>
              
              <div className="border-t border-gold/20 pt-6 space-y-4">
                <div className="space-y-1">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-gold">Triển lãm sắp tới</p>
                  <p className="font-serif italic text-xs text-paper">"Ánh sáng & Bóng đổ" — Paris 2024</p>
                </div>
                <button 
                  onClick={() => setActiveTab("Phòng trưng bày")}
                  className="w-full py-3 border border-gold/30 text-[9px] uppercase tracking-[0.3em] text-gold hover:bg-gold hover:text-bg transition-all duration-500"
                >
                  Xem toàn bộ thư viện
                </button>
              </div>
            </section>
          </main>
        );
      case "Công trình":
        return (
          <main className="flex-1 px-6 md:px-10 py-10 overflow-y-auto custom-scrollbar">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12 border-b border-gold/20 pb-8"
            >
              <h2 className="font-serif italic text-4xl md:text-6xl text-gold mb-4">Danh mục Tác phẩm</h2>
              <p className="text-muted max-w-2xl text-sm leading-relaxed uppercase tracking-widest">
                Tuyển tập những công trình tiêu biểu, nơi kiến trúc gặp gỡ nghệ thuật sắp đặt và sự xa hoa không giới hạn.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {[
                { title: "Dinh thự Ngọc Trai", loc: "Sài Gòn", img: IMAGES[27], desc: "Một kiệt tác ven sông với phong cách Tân cổ điển kết hợp các chi tiết trang trí thủ công tinh xảo.", year: "2023" },
                { title: "Penthouse Heritage", loc: "Hà Nội", img: IMAGES[15], desc: "Không gian sống trên cao tái hiện vẻ đẹp của di sản văn hóa Việt Nam trong bối cảnh đương đại.", year: "2022" },
                { title: "Villa de Romance", loc: "Paris", img: IMAGES[40], desc: "Sự lãng mạn kiểu Pháp được thổi hồn vào từng góc nhỏ, tạo nên một không gian sống đầy chất thơ.", year: "2023" },
                { title: "The Golden Lounge", loc: "Sài Gòn", img: IMAGES[10], desc: "Không gian giải trí thượng lưu với tone màu vàng kim chủ đạo, tôn vinh sự quyền quý.", year: "2021" },
                { title: "Atelier d'Art", loc: "Hà Nội", img: IMAGES[5], desc: "Nơi làm việc và sáng tạo của các nghệ sĩ, được thiết kế để khơi gợi mọi giác quan.", year: "2022" },
                { title: "Royal Suite", loc: "Paris", img: IMAGES[20], desc: "Căn hộ cao cấp dành cho những vị khách yêu thích sự sang trọng bậc nhất và tầm nhìn tuyệt mỹ.", year: "2024" },
                { title: "The Velvet House", loc: "Đà Lạt", img: IMAGES[32], desc: "Sự ấm áp của nhung lụa và gỗ quý trong không gian sương mù mộng mơ.", year: "2023" },
                { title: "Marble Palace", loc: "Sài Gòn", img: IMAGES[45], desc: "Sử dụng đá Marble nguyên khối, tạo nên vẻ đẹp vĩnh cửu và uy nghi.", year: "2022" },
                { title: "Zen Garden Villa", loc: "Hội An", img: IMAGES[55], desc: "Sự tĩnh lặng của thiền định hòa quyện cùng nét kiến trúc cổ kính miền Trung.", year: "2024" }
              ].map((project, i) => (
                <motion.div 
                  key={project.title}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(project.img)}
                >
                  <div className="relative aspect-[16/11] overflow-hidden border border-gold/20 mb-6 bg-[#111]">
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute top-4 right-4 bg-bg/80 backdrop-blur-md border border-gold/30 px-3 py-1">
                      <span className="text-[8px] text-gold tracking-widest uppercase">{project.year}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <span className="text-[9px] uppercase tracking-[0.3em] text-paper border border-paper/30 px-4 py-2 hover:bg-paper hover:text-bg transition-all">Khám phá tác phẩm</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif italic text-2xl text-gold group-hover:text-paper transition-colors">{project.title}</h3>
                    <span className="text-[8px] text-muted mt-2 uppercase tracking-widest">{project.loc}</span>
                  </div>
                  <p className="text-xs text-muted/70 leading-relaxed font-light">{project.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-20 py-20 border-t border-gold/10 text-center">
              <p className="font-serif italic text-2xl text-muted/50">"Mỗi công trình là một di sản để lại cho mai sau."</p>
            </div>
          </main>
        );
      case "Triết lý":
        return (
          <main className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-10 py-10">
            <div className="max-w-6xl mx-auto space-y-32">
              {/* Hero Philosophy */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="relative"
                >
                  <div className="relative aspect-[4/5] border border-gold/30 p-4 z-10 bg-bg">
                    <img src={IMAGES[35]} alt="Philosophy" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
                  </div>
                  <div className="absolute -top-10 -left-10 w-40 h-40 border-t border-l border-gold/20 -z-0" />
                  <div className="absolute -bottom-10 -right-10 w-60 h-60 border-b border-r border-gold/20 -z-0" />
                  <div className="absolute top-1/2 -left-20 -translate-y-1/2 text-vertical text-[8px] tracking-[1em] uppercase text-gold/30 pointer-events-none">
                    PHILOSOPHY OF BEAUTY
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-gold">Tuyên ngôn Nghệ thuật</span>
                    <h2 className="font-serif italic text-4xl md:text-6xl text-gold leading-tight">"Cuộc phiêu lưu với cái Đẹp"</h2>
                  </div>
                  
                  <div className="space-y-6 text-base leading-relaxed text-muted/90 font-light italic">
                    <p>
                      Xuân Chính quan niệm mỗi công trình không chỉ là một cấu trúc vật lý, mà là một cuộc phiêu lưu bất tận với cái đẹp. Đó là hành trình khai phá những tầng sâu của cảm xúc, nơi sự phù phiếm được nâng tầm thành nghệ thuật sống.
                    </p>
                    <p>
                      Chúng tôi không tìm kiếm sự tối giản để che giấu, chúng tôi tìm kiếm sự phong phú để phô diễn. Mỗi mảng tường, mỗi đường chỉ phào hay mỗi ánh đèn rơi xuống đều là một nốt nhạc trong bản giao hưởng của sự xa hoa.
                    </p>
                    <blockquote className="border-l-2 border-gold pl-8 py-2 italic font-serif text-2xl text-paper leading-snug">
                      "Maximalism là sự can đảm để bộc lộ bản ngã mạnh mẽ nhất, là sự tôn vinh sự trọn vẹn của tâm hồn trong từng không gian sống."
                    </blockquote>
                  </div>

                  <div className="pt-8 grid grid-cols-2 gap-10 border-t border-gold/10">
                    <div>
                      <div className="text-[9px] uppercase tracking-[0.2em] text-gold mb-2">Tầm nhìn</div>
                      <div className="font-serif italic text-xl text-paper">Độc bản & Vĩnh cửu</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-[0.2em] text-gold mb-2">Sứ mệnh</div>
                      <div className="font-serif italic text-xl text-paper">Hữu hình hóa giấc mơ</div>
                    </div>
                  </div>
                </motion.div>
              </section>

              {/* Designer Profile Section */}
              <section className="relative py-20 border-y border-gold/20">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.4em] text-gold">Người kiến tạo</span>
                      <h3 className="font-serif italic text-5xl text-paper">KTS. Xuân Chính</h3>
                    </div>
                    <div className="space-y-6 text-sm leading-relaxed text-muted/80 max-w-2xl">
                      <p>
                        Với hơn 14 năm miệt mài trong thế giới của những đường nét và hình khối, Xuân Chính đã xác lập một lối đi riêng biệt trong dòng chảy kiến trúc đương đại. Ông không chỉ là một kiến trúc sư, mà còn là một người kể chuyện bằng không gian, một nghệ sĩ sắp đặt những giấc mơ xa hoa nhất của con người.
                      </p>
                      <p>
                        Mỗi dự án dưới bàn tay của ông là một sự kết hợp tinh tế giữa tư duy logic của kỹ thuật và sự bay bổng của tâm hồn nghệ sĩ. Ông tin rằng, một không gian sống thực thụ phải là nơi chủ nhân tìm thấy chính mình trong sự lộng lẫy nhất, nơi mỗi chi tiết nhỏ nhất cũng mang hơi thở của sự quý phái và đẳng cấp.
                      </p>
                      <div className="flex gap-8 pt-4">
                        <div className="text-center">
                          <span className="block font-serif text-2xl text-gold">14+</span>
                          <span className="text-[8px] uppercase tracking-widest text-muted">Năm kinh nghiệm</span>
                        </div>
                        <div className="text-center">
                          <span className="block font-serif text-2xl text-gold">120+</span>
                          <span className="text-[8px] uppercase tracking-widest text-muted">Dự án tâm huyết</span>
                        </div>
                        <div className="text-center">
                          <span className="block font-serif text-2xl text-gold">03</span>
                          <span className="text-[8px] uppercase tracking-widest text-muted">Văn phòng quốc tế</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-[3/4] border border-gold/20 flex items-center justify-center bg-paper/5 overflow-hidden group"
                  >
                    {/* Placeholder for Designer Photo */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center space-y-4">
                      <div className="w-20 h-20 border border-gold/30 rounded-full flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity">
                        <span className="font-serif text-gold text-2xl italic">XC</span>
                      </div>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-gold/50 group-hover:text-gold transition-colors">
                        [ Hình ảnh Nhà thiết kế ]
                      </p>
                    </div>
                    {/* Decorative corners */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/30" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/30" />
                  </motion.div>
                </div>
              </section>

              {/* Values Section */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { title: "Độc bản", desc: "Mỗi thiết kế là một bản giao hưởng duy nhất, được may đo riêng biệt để tôn vinh bản ngã và phong cách sống độc tôn của gia chủ." },
                  { title: "Tinh hoa", desc: "Sự hội tụ của những vật liệu quý hiếm bậc nhất và kỹ thuật thi công thủ công từ những nghệ nhân tài hoa nhất." },
                  { title: "Cảm xúc", desc: "Không gian không chỉ là nơi để ở, mà là một thánh đường của cảm xúc, nơi mỗi góc nhỏ đều khơi gợi sự rung động mãnh liệt." }
                ].map((value, i) => (
                  <motion.div 
                    key={value.title}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="p-8 border border-gold/10 bg-paper/5 backdrop-blur-sm hover:border-gold/40 transition-colors group"
                  >
                    <span className="text-gold/30 font-serif italic text-4xl mb-4 block group-hover:text-gold transition-colors">0{i + 1}</span>
                    <h3 className="font-serif italic text-2xl text-gold mb-4">{value.title}</h3>
                    <p className="text-sm text-muted/80 leading-relaxed uppercase tracking-widest text-[10px]">{value.desc}</p>
                  </motion.div>
                ))}
              </section>

              {/* Signature Section */}
              <section className="relative py-20 bg-gold/5 border-y border-gold/10 overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <img src={IMAGES[64]} alt="Texture" className="w-full h-full object-cover mix-blend-overlay" referrerPolicy="no-referrer" />
                </div>
                <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
                  <h3 className="font-serif italic text-3xl md:text-4xl text-gold mb-8">Kiến tạo những biểu tượng vĩnh cửu</h3>
                  <p className="text-muted text-sm leading-relaxed mb-10 italic">
                    "Chúng tôi không chỉ xây dựng những ngôi nhà, chúng tôi kiến tạo những di sản văn hóa cá nhân. Mỗi chi tiết từ tay nắm cửa mạ vàng đến hệ thống ánh sáng huyền ảo đều được tính toán để tạo nên một tổng thể lộng lẫy, nơi cái đẹp ngự trị tuyệt đối."
                  </p>
                  <div className="flex justify-center">
                    <div className="w-40 h-[1px] bg-gold" />
                  </div>
                </div>
              </section>
            </div>
          </main>
        );
      case "Phòng trưng bày":
        return (
          <main className="flex-1 px-6 md:px-10 py-10 overflow-y-auto custom-scrollbar">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="font-serif italic text-4xl text-gold mb-2">Thư viện Tác phẩm</h2>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted">Ghi lại những khoảnh khắc đắt giá của kiến trúc</p>
              </div>
              <div className="flex gap-4 text-[9px] uppercase tracking-[0.2em] text-muted">
                <span className="text-gold border-b border-gold pb-1 cursor-pointer">Tất cả</span>
                <span className="hover:text-gold cursor-pointer transition-colors">Nội thất</span>
                <span className="hover:text-gold cursor-pointer transition-colors">Ngoại thất</span>
                <span className="hover:text-gold cursor-pointer transition-colors">Chi tiết</span>
              </div>
            </div>
            
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {IMAGES.map((img, i) => (
                <motion.div 
                  key={img}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: (i % 10) * 0.05 }}
                  className="relative break-inside-avoid cursor-pointer group border border-gold/10 overflow-hidden bg-[#111]"
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`Gallery ${i}`} 
                    className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                    referrerPolicy="no-referrer" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 border border-paper/50 rounded-full flex items-center justify-center text-paper text-xl font-light">+</div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-bg to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[8px] uppercase tracking-widest text-paper">Tác phẩm #{i + 1}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </main>
        );
      case "Liên hệ":
        return (
          <main className="flex-1 flex items-center justify-center px-6 md:px-10 py-10 overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-16"
              >
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gold">Bắt đầu hành trình</span>
                  <h2 className="font-serif italic text-5xl md:text-7xl text-gold leading-tight">Liên hệ với<br />Studio</h2>
                  <p className="text-muted max-w-md leading-relaxed text-sm uppercase tracking-widest">
                    Chúng tôi luôn sẵn lòng lắng nghe những ý tưởng táo bạo và hiện thực hóa chúng thành những kiệt tác kiến trúc.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  {[
                    { label: "Văn phòng Sài Gòn", value: "Quận 1, TP. Hồ Chí Minh", detail: "Hotline: +84 9xx xxx xxx" },
                    { label: "Văn phòng Hà Nội", value: "Quận Hoàn Kiếm, Hà Nội", detail: "Hotline: +84 8xx xxx xxx" },
                    { label: "Email Trực tiếp", value: "namanh8t@gmail.com", detail: "Phản hồi trong 24h" },
                    { label: "Mạng xã hội", value: "@xuan.chinh.810", detail: "Instagram / Facebook" }
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="text-[9px] uppercase tracking-[0.2em] text-gold">{item.label}</div>
                      <div className="font-serif italic text-xl text-paper">{item.value}</div>
                      <div className="text-[9px] text-muted uppercase tracking-widest">{item.detail}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-10 border-t border-gold/10 flex gap-6">
                  <div className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center hover:bg-gold hover:text-bg transition-all cursor-pointer">In</div>
                  <div className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center hover:bg-gold hover:text-bg transition-all cursor-pointer">Fb</div>
                  <div className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center hover:bg-gold hover:text-bg transition-all cursor-pointer">Be</div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="absolute -inset-4 border border-gold/10 -z-10" />
                <form 
                  className="bg-paper/5 p-8 md:p-12 border border-gold/20 space-y-8 backdrop-blur-md relative"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="absolute top-0 right-0 p-4">
                    <div className="w-8 h-8 border-t border-r border-gold/50" />
                  </div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <div className="w-8 h-8 border-b border-l border-gold/50" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.4em] text-gold">Họ và tên của bạn</label>
                    <input type="text" placeholder="Nguyễn Văn A" className="w-full bg-transparent border-b border-gold/30 py-3 focus:border-gold outline-none transition-colors text-paper placeholder:text-muted/30 font-light" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.4em] text-gold">Địa chỉ Email</label>
                    <input type="email" placeholder="email@example.com" className="w-full bg-transparent border-b border-gold/30 py-3 focus:border-gold outline-none transition-colors text-paper placeholder:text-muted/30 font-light" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.4em] text-gold">Dự án bạn đang quan tâm</label>
                    <select className="w-full bg-transparent border-b border-gold/30 py-3 focus:border-gold outline-none transition-colors text-paper font-light appearance-none">
                      <option className="bg-bg">Thiết kế Kiến trúc</option>
                      <option className="bg-bg">Thiết kế Nội thất</option>
                      <option className="bg-bg">Tư vấn Nghệ thuật</option>
                      <option className="bg-bg">Khác</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.4em] text-gold">Lời nhắn gửi đến chúng tôi</label>
                    <textarea rows={4} placeholder="Hãy chia sẻ về giấc mơ của bạn..." className="w-full bg-transparent border-b border-gold/30 py-3 focus:border-gold outline-none transition-colors text-paper resize-none placeholder:text-muted/30 font-light" />
                  </div>
                  <button className="w-full py-5 bg-gold text-bg uppercase tracking-[0.4em] text-[10px] font-bold hover:bg-paper transition-all duration-500 shadow-lg">
                    Gửi yêu cầu tư vấn
                  </button>
                </form>
              </motion.div>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="relative w-full h-screen bg-bg flex items-center justify-center overflow-hidden p-4 md:p-6">
      {/* Main Frame */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full h-full max-w-[1600px] max-h-[1000px] border-[12px] md:border-[24px] border-bg outline outline-1 outline-gold-dark/50 -outline-offset-[6px] md:-outline-offset-[12px] flex flex-col bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,#0a0a0a_100%)] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <header className="px-6 md:px-10 py-6 md:py-10 flex justify-between items-center border-b border-gold/10 z-20 bg-bg/40 backdrop-blur-md">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => setActiveTab("Home")}
          >
            <div className="w-10 h-10 border border-gold flex items-center justify-center font-serif text-xl text-gold group-hover:bg-gold group-hover:text-bg transition-all duration-500">XC</div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.1em] uppercase text-paper leading-none">Xuân Chính</span>
              <span className="text-[7px] tracking-[0.4em] uppercase text-gold">Architecture Studio</span>
            </div>
          </motion.div>
          <nav className="hidden md:flex gap-12 text-[9px] tracking-[0.3em] uppercase text-muted">
            {["Công trình", "Triết lý", "Phòng trưng bày", "Liên hệ"].map((item, i) => (
              <motion.span 
                key={item}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className={`hover:text-gold cursor-pointer transition-all relative group ${activeTab === item ? 'text-gold' : ''}`}
                onClick={() => setActiveTab(item as Tab)}
              >
                {item}
                <span className={`absolute -bottom-2 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full ${activeTab === item ? 'w-full' : ''}`} />
              </motion.span>
            ))}
          </nav>
        </header>

        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col overflow-hidden relative"
          >
            {/* Background Decorative Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif italic text-[20vw] text-gold/5 pointer-events-none whitespace-nowrap select-none z-0">
              {activeTab === "Home" ? "Excellence" : activeTab}
            </div>
            <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
              {renderContent()}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <footer className="px-6 md:px-10 py-6 md:py-8 flex justify-between items-center text-[7px] md:text-[8px] tracking-[0.2em] uppercase text-muted/60 z-20 border-t border-gold/10 bg-bg/40 backdrop-blur-md">
          <div className="hidden sm:block">Est. 2010 — All Rights Reserved</div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-[1px] bg-gold/30" />
            <div className="font-serif text-lg md:text-xl lowercase tracking-[0.3em] text-gold/40">
              xuan chinh
            </div>
            <div className="w-8 h-[1px] bg-gold/30" />
          </div>
          <div className="text-right">Sài Gòn • Hà Nội • Paris</div>
        </footer>

        {/* Decorative Ornaments */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-gold/50 to-transparent z-30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-t from-gold/50 to-transparent z-30" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-[1px] bg-gradient-to-r from-gold/50 to-transparent z-30" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-[1px] bg-gradient-to-l from-gold/50 to-transparent z-30" />
        
        <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-gold/30 z-30" />
        <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-gold/30 z-30" />
        <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-gold/30 z-30" />
        <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-gold/30 z-30" />

        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-vertical text-[7px] md:text-[8px] tracking-[0.6em] uppercase text-gold/40 whitespace-nowrap pointer-events-none z-30">
          MAXIMALISM IS THE ART OF ABUNDANCE
        </div>
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-vertical rotate-180 text-[7px] md:text-[8px] tracking-[0.6em] uppercase text-gold/40 whitespace-nowrap pointer-events-none z-30">
          CRAFTING DREAMS INTO REALITY
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-full border border-gold/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage} alt="Selected work" className="w-full h-auto max-h-[85vh] object-contain" referrerPolicy="no-referrer" />
              <button 
                className="absolute -top-12 right-0 text-gold hover:text-paper transition-colors text-xs tracking-widest uppercase"
                onClick={() => setSelectedImage(null)}
              >
                Đóng [x]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(197, 160, 89, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(197, 160, 89, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(197, 160, 89, 0.5);
        }
      `}</style>
    </div>
  );
}
