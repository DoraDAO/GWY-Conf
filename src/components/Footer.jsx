import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Twitter, Instagram, Heart, Youtube, Calendar, Mail, Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  const menuItems = [
    'About Girls Who Yap',
    'Speakers',
    'Ambassador Program',
    'Bounties',
    'Partners',
    'Contact'
  ];

  const socialLinks = [
    { name: 'YouTube', icon: <Youtube size={20} />, url: 'https://youtube.com/@connectdoradao' },
    { name: 'Instagram', icon: <Instagram size={20} />, url: 'https://instagram.com/connectdoradao' },
    { name: 'Twitter', icon: <Twitter size={20} />, url: 'https://x.com/connectdoradao' },
    { name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com/connectdoradao' },
    { name: 'Luma', icon: <Calendar size={20} />, url: 'https://lu.ma/connectdoradao' },
    { name: 'Substack', icon: <Mail size={20} />, url: 'https://doradao.substack.com' }
  ];

  return (
    <footer ref={footerRef} className="footer">
      <div className="container footer-container">
        <div className="footer-top">
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="footer-logo">Girls Who Yap</h3>
            <p className="footer-tagline">Powered by DoraDAO</p>
            <p className="footer-description">
              A women centric conference celebrating culture, career & creativity
            </p>
          </motion.div>

          <motion.div 
            className="footer-nav"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="footer-nav-title">Explore</h4>
            {menuItems.map((item, index) => (
              <a 
                key={index} 
                href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                className="footer-link"
              >
                {item}
              </a>
            ))}
          </motion.div>

          <motion.div 
            className="footer-newsletter"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="footer-newsletter-title">Join our newsletter</h4>
            <p className="footer-newsletter-text">
              Be the first to hear about speakers, bounties, and community updates.
            </p>
            <form className="footer-newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="footer-input"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>

            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="footer-copyright">
            © 2026 Girls Who Yap • Built with <Heart size={14} fill="currentColor" /> by DoraDAO
          </p>
          <div className="footer-legal">
            <a href="#privacy" className="footer-legal-link">Privacy Policy</a>
            <a href="#terms" className="footer-legal-link">Terms</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
