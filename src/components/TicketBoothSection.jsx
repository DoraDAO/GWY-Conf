import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, LayoutTemplate, Stamp, Sparkles, MessageCircle, Twitter, Linkedin, Instagram, Share2, Ticket } from 'lucide-react';
import './TicketBoothSection.css'; 

const TicketBoothSection = () => {
  const [step, setStep] = useState('input');
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [layout, setLayout] = useState('ticket'); 
  const [language, setLanguage] = useState('en');
  
  const translations = {
    en: { 
        member: "MEMBER",
        admit: "ADMIT ONE • OFFICIAL PASS",
        font: "bold 40px sans-serif",
        tagFont: "bold 50px 'Permanent Marker', cursive",
        tags: { peach: "MAIN CHARACTER", baddie: "CERTIFIED BADDIE", golden: "GLOW UP", graffiti: "STREET VIBE" }
    },
    jp: { 
        member: "メンバー",
        admit: "入場券 • 公式パス",
        font: "bold 40px 'Noto Sans JP', sans-serif",
        tagFont: "bold 50px 'Noto Sans JP', sans-serif",
        tags: { peach: "主役", baddie: "悪女", golden: "輝き", graffiti: "ストリート" }
    },
    kr: { 
        member: "멤버",
        admit: "입장권 • 공식 패스",
        font: "bold 40px 'Noto Sans KR', sans-serif",
        tagFont: "bold 50px 'Noto Sans KR', sans-serif",
        tags: { peach: "주인공", baddie: "센 언니", golden: "레벨업", graffiti: "스트릿" }
    },
    hi: { 
        member: "सदस्य",
        admit: "एक प्रवेश • आधिकारिक पास",
        font: "bold 50px 'Tiro Devanagari Hindi', serif",
        tagFont: "bold 60px 'Tiro Devanagari Hindi', serif",
        tags: { peach: "मुख्य पात्र", baddie: "बिंदास", golden: "निखार", graffiti: "देसी वाइब" }
    },
    pu: { 
        member: "ਮੈਂਬਰ",
        admit: "ਇਕ ਦਾਖਲਾ • ਅਧਿਕਾਰਤ ਪਾਸ",
        font: "bold 40px 'Tiro Gurmukhi', serif",
        tagFont: "bold 50px 'Tiro Gurmukhi', serif",
        tags: { peach: "ਮੁੱਖ ਪਾਤਰ", baddie: "ਅੱਤ", golden: "ਚਮਕ", graffiti: "ਦੇਸੀ" }
    }
  };

  const backgrounds = [
    { id: 'peach', name: 'Peach Fuzz', type: 'css', css: 'bg-peach', colors: ['#FFDAB9', '#FFF0E5', '#FFB6C1'], tagColor: "#db2777" },
    { id: 'baddie', name: 'High Key', type: 'css', css: 'bg-baddie', colors: ['#FF00CC', '#333399', '#FF00CC'], tagColor: "#ffffff" },
    { id: 'golden', name: 'Golden Hour', type: 'css', css: 'bg-golden', colors: ['#FDC830', '#F37335', '#FDC830'], tagColor: "#78350f" },
    { id: 'graffiti', name: 'Street Art', type: 'image', css: 'bg-graffiti', imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop', tagColor: "#FFFFFF" }
  ];
  const [selectedBg, setSelectedBg] = useState(backgrounds[0]);

  const cardRef = useRef(null);
  const downloadCanvasRef = useRef(null);

  const handleMouseMove = (e) => {
    const gsapLib = window.gsap; 
    if (!cardRef.current || !gsapLib) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const intensity = layout === 'stamp' ? 5 : 10;
    const rotateX = ((y - centerY) / centerY) * -intensity; 
    const rotateY = ((x - centerX) / centerX) * intensity;

    gsapLib.to(cardRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
      transformStyle: "preserve-3d"
    });
  };

  const handleMouseLeave = () => {
    const gsapLib = window.gsap;
    if (!gsapLib || !cardRef.current) return;
    gsapLib.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAndDownload = async () => {
    if (!image || !name) {
      alert("Please upload a photo and enter your name!");
      return;
    }
    setStep('generating');
    setTimeout(() => {
        setStep('result');
    }, 1500);
  };

  const downloadImage = () => {
    const canvas = downloadCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    if (layout === 'ticket') { width = 600; height = 900; }
    else if (layout === 'stamp') { width = 600; height = 700; }
    else { width = 1000; height = 400; } // Horizontal dimensions
    
    canvas.width = width;
    canvas.height = height;

    const userImg = new Image();
    userImg.src = image;
    userImg.crossOrigin = "anonymous";
    
    userImg.onload = () => {
        if (selectedBg.type === 'image') {
            const bgImg = new Image();
            bgImg.src = selectedBg.imageUrl;
            bgImg.crossOrigin = "anonymous";
            
            bgImg.onload = () => {
                finishDrawing(ctx, width, height, userImg, canvas, bgImg);
            };
            bgImg.onerror = () => {
                finishDrawing(ctx, width, height, userImg, canvas, null);
            };
        } else {
            finishDrawing(ctx, width, height, userImg, canvas, null);
        }
    };
  };

  const finishDrawing = (ctx, width, height, userImg, canvas, bgImg) => {
      if (layout === 'ticket') {
          if(bgImg) ctx.drawImage(bgImg, 0, 0, width, height);
          else {
             ctx.fillStyle = "#FFF0E5";
             ctx.fillRect(0, 0, width, height);
          }
          drawTicket(ctx, width, height, userImg);
      } else if (layout === 'stamp') {
          drawStamp(ctx, width, height, userImg);
      } else {
          drawHorizontalTicket(ctx, width, height, userImg, bgImg);
      }

      try {
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = `yap-${layout}-${name.replace(/\s+/g, '-').toLowerCase() || 'avatar'}.png`;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      } catch (e) {
          console.error("Download failed", e);
          alert("Could not download image. Please try again.");
      }
  }

  const drawTicket = (ctx, w, h, img) => {
      ctx.save();
      ctx.roundRect(40, 180, 520, 520, 20); 
      if (selectedBg.type === 'image') {
          ctx.fillStyle = "rgba(255,255,255,0.2)";
      } else {
          const bgGrad = ctx.createLinearGradient(0, 0, w, h);
          bgGrad.addColorStop(0, selectedBg.colors[0]);
          bgGrad.addColorStop(1, selectedBg.colors[2]);
          ctx.fillStyle = bgGrad;
      }
      ctx.fill();
      ctx.clip(); 
      const scale = Math.max(520 / img.width, 520 / img.height);
      const x = (520 - img.width * scale) / 2;
      const y = (520 - img.height * scale) / 2;
      ctx.globalAlpha = 0.9; 
      ctx.drawImage(img, 40 + x, 180 + y, img.width * scale, img.height * scale);
      ctx.globalAlpha = 1.0;
      ctx.restore();

      const currentLang = translations[language];
      const currentTag = currentLang.tags[selectedBg.id];
      
      ctx.fillStyle = selectedBg.type === 'image' ? "#FFFFFF" : "#1F1F1F";
      if(selectedBg.type === 'image') { ctx.shadowBlur = 5; ctx.shadowColor = "black"; }

      ctx.font = "bold 40px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("GIRLS WHO YAP", w / 2, 80);
      
      ctx.save();
      ctx.translate(w / 2, 650);
      ctx.rotate(-0.1);
      ctx.font = currentLang.tagFont;
      ctx.fillStyle = selectedBg.tagColor; 
      ctx.shadowColor="rgba(0,0,0,0.8)";
      ctx.shadowBlur=10;
      ctx.fillText(currentTag, 0, 0);
      ctx.restore();

      ctx.shadowBlur = 0;
      ctx.fillStyle = selectedBg.type === 'image' ? "#FFFFFF" : "#1F1F1F";
      ctx.font = "bold 60px sans-serif";
      ctx.fillText(name.toUpperCase(), w / 2, 780);
      
      ctx.font = "20px monospace";
      ctx.fillStyle = selectedBg.type === 'image' ? "#DDD" : "#666";
      ctx.fillText(currentLang.admit, w / 2, 830);
  };

  const drawStamp = (ctx, w, h, img) => {
      if (selectedBg.type !== 'image') {
          ctx.fillStyle = "#FFF0E5";
          ctx.fillRect(0, 0, w, h);
      }
      const margin = 20;
      const innerW = w - (margin * 2);
      const innerH = h - (margin * 2);

      if (selectedBg.type !== 'image') {
          const bgGrad = ctx.createLinearGradient(0, 0, w, h);
          bgGrad.addColorStop(0, selectedBg.colors[0]);
          bgGrad.addColorStop(1, selectedBg.colors[2]);
          ctx.fillStyle = bgGrad;
          ctx.fillRect(margin, margin, innerW, innerH);
      } else {
          ctx.fillStyle = "rgba(0,0,0,0.3)";
          ctx.fillRect(margin, margin, innerW, innerH);
      }

      ctx.save();
      ctx.beginPath();
      ctx.rect(margin + 20, margin + 80, innerW - 40, innerH - 160);
      ctx.clip();
      const scale = Math.max((innerW - 40) / img.width, (innerH - 160) / img.height);
      const ix = ((innerW - 40) - img.width * scale) / 2;
      const iy = ((innerH - 160) - img.height * scale) / 2;
      ctx.drawImage(img, margin + 20 + ix, margin + 80 + iy, img.width * scale, img.height * scale);
      ctx.restore();

      ctx.globalCompositeOperation = 'destination-out';
      const holeRadius = 12;
      const spacing = 36;
      for (let i = 0; i <= w; i += spacing) {
          ctx.beginPath(); ctx.arc(i, 0, holeRadius, 0, Math.PI*2); ctx.fill();
          ctx.beginPath(); ctx.arc(i, h, holeRadius, 0, Math.PI*2); ctx.fill();
      }
      for (let i = 0; i <= h; i += spacing) {
          ctx.beginPath(); ctx.arc(0, i, holeRadius, 0, Math.PI*2); ctx.fill();
          ctx.beginPath(); ctx.arc(w, i, holeRadius, 0, Math.PI*2); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';

      const currentLang = translations[language];
      const currentTag = currentLang.tags[selectedBg.id];

      ctx.textAlign = "center";
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 30px sans-serif";
      ctx.shadowColor="rgba(0,0,0,0.8)";
      ctx.shadowBlur=4;
      ctx.fillText("GIRLS WHO YAP", w / 2, margin + 50);

      ctx.save();
      ctx.translate(w / 2, h - 120);
      ctx.rotate(-0.05);
      ctx.font = currentLang.tagFont.replace('50px', '40px');
      ctx.fillStyle = selectedBg.tagColor;
      ctx.fillText(currentTag, 0, 0);
      ctx.restore();

      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "bold 40px sans-serif";
      ctx.fillText(name.toUpperCase(), w / 2, h - 50);
  };

  const drawHorizontalTicket = (ctx, w, h, img, bgImg) => {
    const splitX = w * 0.70; 
    const currentLang = translations[language];
    const currentTag = currentLang.tags[selectedBg.id];
    const themeColor = selectedBg.colors[0]; 

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(splitX, 0, w - splitX, h);

    if (bgImg) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, splitX, h);
        ctx.clip();
        ctx.drawImage(bgImg, 0, 0, splitX, h);
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(0,0,splitX,h);
        ctx.restore();
    } else {
        const bgGrad = ctx.createLinearGradient(0, 0, splitX, h);
        bgGrad.addColorStop(0, selectedBg.colors[0]);
        bgGrad.addColorStop(1, selectedBg.colors[2]);
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, splitX, h);
    }

    ctx.beginPath();
    ctx.setLineDash([12, 12]);
    ctx.moveTo(splitX, 0);
    ctx.lineTo(splitX, h);
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = "#FFF0E5"; 
    ctx.beginPath(); ctx.arc(splitX, 0, 15, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(splitX, h, 15, 0, Math.PI*2); ctx.fill();

    const margin = 50;
    
    ctx.textAlign = "left";
    ctx.font = "bold 16px 'Montserrat', sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText("OFFICIAL MEMBER PASS", margin, 60);

    ctx.font = "900 70px 'Montserrat', sans-serif"; // Reduced from 80px
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 10;
    ctx.fillText("GIRLS", margin, 135);
    ctx.fillText("WHO YAP", margin, 205);
    ctx.shadowBlur = 0;

    // Name & Tag
    ctx.font = "bold 35px 'Montserrat', sans-serif";
    ctx.fillText(name.toUpperCase(), margin, 265);
    
    ctx.font = currentLang.tagFont.replace('50px', '28px');
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillText(currentTag, margin, 305);

    //Date Box (Fixed Overlap)
    const boxY = 330;
    const boxWidth = 270; // Widened from 240
    const lineX = margin + 100; // Moved line right
    
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 3;
    ctx.strokeRect(margin, boxY, boxWidth, 50);
    
    // Separator Line
    ctx.beginPath();
    ctx.moveTo(lineX, boxY);
    ctx.lineTo(lineX, boxY + 50);
    ctx.stroke();

    // Text inside box
    ctx.font = "bold 24px monospace";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("24 • 07", margin + 10, boxY + 33); // Adjusted X
    
    ctx.font = "bold 20px monospace";
    ctx.fillText("09:00 - 12:00", lineX + 15, boxY + 33); // Adjusted X relative to line

    // PHOTO (Resized and moved to prevent overshadowing)
    const photoSize = 170; // Reduced from 200
    const photoX = splitX - photoSize - 30; // Pushed slightly closer to tear line
    const photoY = (h - photoSize) / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(photoX + photoSize/2, photoY + photoSize/2, photoSize/2, 0, Math.PI * 2);
    ctx.clip();
    
    const scale = Math.max(photoSize / img.width, photoSize / img.height);
    const ix = (photoSize - img.width * scale) / 2;
    const iy = (photoSize - img.height * scale) / 2;
    ctx.drawImage(img, photoX + ix, photoY + iy, img.width * scale, img.height * scale);
    
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.restore();

    
    // Vertical Title (Moved to avoid barcode)
    ctx.save();
    ctx.translate(splitX + 65, h - 80); // Moved up (Y is inverted in rotation)
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "left";
    
    ctx.font = "900 36px 'Montserrat', sans-serif"; // Slightly smaller
    ctx.fillStyle = themeColor;
    ctx.fillText("GIRLS WHO YAP", 0, 0);
    
    // Subtext (Moved further away)
    ctx.font = "bold 12px sans-serif";
    ctx.fillStyle = "#999";
    ctx.fillText("OFFICIAL BOOTH TICKET", 0, -45);
    ctx.restore();

    // Vertical Date Box
    ctx.save();
    ctx.translate(w - 50, 50);
    ctx.rotate(Math.PI / 2);
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, 120, 40);
    
    ctx.font = "bold 20px monospace";
    ctx.fillStyle = themeColor;
    ctx.textAlign = "center";
    ctx.fillText("NO SKIPS", 60, 27);
    ctx.restore();

    // Barcode (Shortened height to avoid text overlap)
    const barcodeX = splitX + 20;
    const barcodeY = h - 50; // Moved down
    const barcodeH = 35; // Shortened height
    const barcodeW = (w - splitX) - 40;
    
    ctx.fillStyle = "#000";
    for(let i=0; i<barcodeW; i+=4) {
        if(Math.random() > 0.2) {
            ctx.fillRect(barcodeX + i, barcodeY, 2, barcodeH);
        }
    }
  };

  const MARQUEE_TEXT = "• YAPPING SINCE BIRTH • MAIN CHARACTER ENERGY • NO SKIPS • GIRLS WHO YAP • BUILD FOR THE WORLD • JOIN THE CONVERSATION •";

  return (
    <div className="booth-container">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

      <div className="marquee-container">
        <div className="marquee-track">
          <span className="marquee-text">{MARQUEE_TEXT}</span>
          <span className="marquee-text">{MARQUEE_TEXT}</span>
        </div>
      </div>

      <div className="booth-content-wrapper">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>

        <div className="booth-hero">
            <div className="booth-badge">
                <MessageCircle size={16} fill="white" /> OFFICIAL BOOTH
            </div>
            
            <h2 className="booth-title">
                GET YOUR <br/>
                <span>AVATAR</span>
            </h2>
            
            <p className="booth-subtitle">
                "It's not just a ticket, it's a lifestyle. Print it, Stamp it, Own it."
            </p>

            <div className="social-links-container">
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-btn" title="Share on X">
                    <Twitter size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn" title="Share on LinkedIn">
                    <Linkedin size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn" title="Instagram">
                    <Instagram size={20} />
                </a>
                {/* <button className="social-btn" title="More Options">
                    <Share2 size={20} />
                </button> */}
            </div>
        </div>

        <div className="booth-machine-container">
            <div 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="booth-card"
            >
                <div className="booth-card-header">
                    <span style={{fontSize:'0.75rem', fontWeight:'bold', letterSpacing:'0.1em', textTransform:'uppercase'}}>Booth #08</span>
                </div>

                {step === 'input' && (
                    <div className="booth-input-group">
                        <input 
                            type="text"
                            placeholder="YOUR NAME"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="booth-text-input"
                        />

                        <div className="booth-toggle-group">
                             <button 
                                onClick={() => setLayout('ticket')}
                                className={`booth-toggle-btn ${layout === 'ticket' ? 'active' : 'inactive'}`}
                             >
                                <LayoutTemplate size={14} /> Vertical
                             </button>
                             <button 
                                onClick={() => setLayout('horizontal')}
                                className={`booth-toggle-btn ${layout === 'horizontal' ? 'active' : 'inactive'}`}
                             >
                                <Ticket size={14} /> Horizontal
                             </button>
                             <button 
                                onClick={() => setLayout('stamp')}
                                className={`booth-toggle-btn ${layout === 'stamp' ? 'active' : 'inactive'}`}
                             >
                                <Stamp size={14} /> Stamp
                             </button>
                        </div>

                        <label className={`booth-upload-label ${image ? 'has-image' : ''}`}>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            
                            {image ? (
                                <div className="booth-upload-preview-container" style={{width:'100%', height:'100%', position:'relative'}}>
                                    <div className={`absolute inset-0 ${selectedBg.css} opacity-20`} style={{position:'absolute', width:'100%', height:'100%'}}></div>
                                    <img src={image} className="booth-upload-preview" alt="Preview" />
                                </div>
                            ) : (
                                <div className="booth-upload-placeholder">
                                    <Upload size={32} style={{marginBottom:'0.5rem'}} />
                                    <span style={{fontSize:'0.75rem', fontWeight:'bold', textTransform:'uppercase'}}>Upload Photo</span>
                                </div>
                            )}
                        </label>

                        <button 
                            onClick={generateAndDownload}
                            className={`booth-action-btn ${image && name ? 'ready' : ''}`}
                        >
                            Mint {layout === 'stamp' ? 'Stamp' : 'Pass'} <Sparkles size={18} />
                        </button>
                    </div>
                )}

                {step === 'generating' && (
                    <div style={{aspectRatio:'3/4', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'white'}}>
                        <div style={{width:'5rem', height:'5rem', border:'4px solid #333', borderTopColor:'#FF8C00', borderRadius:'50%', animation:'spin 1s linear infinite'}}></div>
                        <div style={{textAlign:'center', marginTop:'1rem'}}>
                            <h3 style={{fontWeight:'bold', fontSize:'1.25rem'}}>GLITCHING...</h3>
                        </div>
                        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                )}

                {step === 'result' && (
                    <div className="booth-result-container">
                        <div className={`booth-result-card ${layout} ${layout === 'stamp' ? 'stamp-edges' : ''}`}>
                            
                            {layout === 'ticket' && (
                                <>
                                    <div className={`absolute inset-0 ${selectedBg.css}`} style={{position:'absolute', width:'100%', height:'100%', zIndex:0}}></div>
                                    <div style={{position:'absolute', inset:'1rem', bottom:'6rem', borderRadius:'0.75rem', overflow:'hidden', border:'1px solid rgba(255,255,255,0.2)', zIndex:1}}>
                                        <img src={image} style={{width:'100%', height:'100%', objectFit:'cover', mixBlendMode:'multiply', opacity:0.9}} />
                                        <div style={{position:'absolute', bottom:'1rem', right:'1rem', transform:'rotate(-6deg)'}}>
                                            <span style={{
                                                fontFamily: translations[language].tagFont, 
                                                fontSize:'1.8rem', 
                                                color: selectedBg.tagColor, 
                                                textShadow:'0 2px 4px rgba(0,0,0,0.5)'
                                            }}>
                                                {translations[language].tags[selectedBg.id]}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{position:'absolute', top:0, left:0, width:'100%', height:'4rem', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2, background:'rgba(255,255,255,0.1)', backdropFilter:'blur(4px)'}}>
                                        <span style={{fontWeight:'900', color:'#1F1F1F', fontSize:'1.25rem'}}>
                                            GIRLS WHO YAP
                                        </span>
                                    </div>
                                    <div style={{position:'absolute', bottom:0, left:0, width:'100%', height:'6rem', background:'white', padding:'1rem', display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:2}}>
                                        <div>
                                            <p style={{fontSize:'0.65rem', color:'#999', fontWeight:'bold', textTransform:'uppercase'}}>
                                                {translations[language].member}
                                            </p>
                                            <p style={{fontWeight:'900', fontSize:'1.5rem', color:'#1F1F1F', fontFamily:"'Permanent Marker', cursive"}}>{name}</p>
                                        </div>
                                        <div style={{background:'black', color:'white', fontSize:'0.75rem', fontWeight:'bold', padding:'0.25rem 0.75rem', borderRadius:'999px'}}>
                                            #081
                                        </div>
                                    </div>
                                </>
                            )}

                            {layout === 'stamp' && (
                                <>
                                    <div className={`absolute inset-0 ${selectedBg.css}`} style={{position:'absolute', width:'100%', height:'100%', zIndex:0}}></div>
                                    <div style={{width:'100%', height:'100%', position:'relative', zIndex:1, display:'flex', flexDirection:'column'}}>
                                        <div style={{flexGrow:1, position:'relative', overflow:'hidden', border:'1px solid rgba(255,255,255,0.3)', margin:'0.5rem'}}>
                                            <img src={image} style={{width:'100%', height:'100%', objectFit:'cover', mixBlendMode:'overlay', opacity:0.9}} />
                                            <div style={{position:'absolute', bottom:'0.5rem', right:'0.5rem', transform:'rotate(-6deg)'}}>
                                                <span style={{
                                                    fontFamily: translations[language].tagFont, 
                                                    fontSize:'1.5rem', 
                                                    color: selectedBg.tagColor, 
                                                    textShadow:'0 2px 4px rgba(0,0,0,0.8)'
                                                }}>
                                                    {translations[language].tags[selectedBg.id]}
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{height:'3rem', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 0.5rem'}}>
                                            <span style={{fontWeight:'900', color:'white', fontSize:'1rem', textShadow:'0 2px 4px rgba(0,0,0,0.5)'}}>
                                                GIRLS WHO YAP
                                            </span>
                                            <span style={{fontFamily:"'Permanent Marker', cursive", color:'white', fontSize:'1.2rem'}}>{name}</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {layout === 'horizontal' && (
                                <>
                                    <div className={`horizontal-left ${selectedBg.css}`}>
                                        <div className="horizontal-text-content">
                                            <span className="h-label">OFFICIAL MEMBER PASS</span>
                                            <h2 className="h-title">
                                                GIRLS<br/>WHO YAP
                                            </h2>
                                            <h3 className="h-name">{name || "YOUR NAME"}</h3>
                                            <p className="h-tag" style={{fontFamily: translations[language].tagFont}}>
                                                {translations[language].tags[selectedBg.id]}
                                            </p>
                                            
                                            {/* Date Box */}
                                            <div className="h-date-box">
                                                <span className="date">24 • 07</span>
                                                <span className="line"></span>
                                                <span className="time">09:00 - 12:00</span>
                                            </div>
                                        </div>

                                        {/* Photo Container (Right Aligned within colored section) */}
                                        <div className="horizontal-photo-container">
                                            <img src={image} alt="User" />
                                        </div>
                                    </div>

                                    {/* Right Side (White Stub) */}
                                    <div className="horizontal-right">
                                        <div className="h-stub-top">
                                            <div className="h-stub-box" style={{borderColor: selectedBg.colors[0], color: selectedBg.colors[0]}}>
                                                NO SKIPS
                                            </div>
                                        </div>
                                        <div className="h-stub-center">
                                            <span className="h-vertical-text" style={{color: selectedBg.colors[0]}}>
                                                GIRLS WHO YAP
                                            </span>
                                        </div>
                                        <div className="barcode"></div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="booth-controls">
                            {/* Vibe Selector */}
                            <div className="booth-vibe-list scrollbar-hide">
                                {backgrounds.map((bg) => (
                                    <button
                                        key={bg.id}
                                        onClick={() => setSelectedBg(bg)}
                                        className={`booth-vibe-btn ${selectedBg.id === bg.id ? 'active' : ''} ${bg.css}`}
                                        title={bg.name}
                                    />
                                ))}
                            </div>

                            {/* Language Selector */}
                            <div className="booth-lang-list scrollbar-hide">
                                <button onClick={() => setLanguage('en')} className={`booth-lang-btn ${language === 'en' ? 'active' : ''}`}>ENG</button>
                                <button onClick={() => setLanguage('jp')} className={`booth-lang-btn ${language === 'jp' ? 'active' : ''}`}>JPN</button>
                                <button onClick={() => setLanguage('kr')} className={`booth-lang-btn ${language === 'kr' ? 'active' : ''}`}>KOR</button>
                                <button onClick={() => setLanguage('hi')} className={`booth-lang-btn ${language === 'hi' ? 'active' : ''}`}>HIN</button>
                                <button onClick={() => setLanguage('pu')} className={`booth-lang-btn ${language === 'pu' ? 'active' : ''}`}>PUN</button>
                            </div>
                            
                            {/* Layout Selector */}
                             <div className="booth-toggle-group" style={{background:'black', padding:'0.25rem'}}>
                                <button 
                                    onClick={() => setLayout('ticket')}
                                    className={`booth-toggle-btn ${layout === 'ticket' ? 'active' : 'inactive'}`}
                                    style={{fontSize:'0.65rem', padding:'0.5rem'}}
                                >
                                    Vertical
                                </button>
                                <button 
                                    onClick={() => setLayout('horizontal')}
                                    className={`booth-toggle-btn ${layout === 'horizontal' ? 'active' : 'inactive'}`}
                                    style={{fontSize:'0.65rem', padding:'0.5rem'}}
                                >
                                    Horizontal
                                </button>
                                <button 
                                    onClick={() => setLayout('stamp')}
                                    className={`booth-toggle-btn ${layout === 'stamp' ? 'active' : 'inactive'}`}
                                    style={{fontSize:'0.65rem', padding:'0.5rem'}}
                                >
                                    Stamp
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="booth-result-actions">
                            <button 
                                onClick={downloadImage}
                                className="booth-save-btn"
                            >
                                <Download size={18} /> Save
                            </button>
                            <button 
                                onClick={() => setStep('input')}
                                className="booth-reset-btn"
                            >
                                <RefreshCw size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

        <canvas ref={downloadCanvasRef} className="hidden"></canvas>
      </div>
    </div>
  );
};

export default TicketBoothSection;