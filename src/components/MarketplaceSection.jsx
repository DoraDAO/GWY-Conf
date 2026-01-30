import { motion } from 'framer-motion';
import './MarketplaceSection.css';

const MarketplaceSection = () => {
  const cards = [
    {
      id: 1,
      title: 'Meets',
      subtitle: 'new people',
      description: 'Creators and enthusiasts to share, discover, and purchase unique artworks.',
      buttonText: "Let's Meet",
      buttonLink: '#meet',
      background: 'linear-gradient(135deg, #C41E5B 0%, #E91E63 100%)',
      textColor: '#ffffff',
      icon: '✏️',
      imageType: 'person'
    },
    {
      id: 2,
      title: 'Archive',
      subtitle: 'of new arts',
      description: 'Canvas Carousel is the platform where artists can ride the wave of creativity, showcasing their work to a broad audience.',
      buttonText: 'Archives',
      buttonLink: '#archives',
      background: '#FAFAFA',
      textColor: '#000000',
      icon: '🎨',
      imageType: 'flower'
    }
  ];

  return (
    <section className="marketplace-section section">
      <div className="marketplace-cards-container">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="marketplace-feature-card"
            style={{
              background: card.background,
              color: card.textColor
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.2,
              ease: [0.4, 0, 0.2, 1] 
            }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Icon */}
            <motion.div 
              className="card-icon"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.2) }}
            >
              {card.icon}
            </motion.div>

            {/* Content */}
            <div className="card-content">
              <motion.h3 
                className="card-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + (index * 0.2) }}
              >
                {card.title}<br />
                {card.subtitle}
              </motion.h3>
              
              <motion.p 
                className="card-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + (index * 0.2) }}
              >
                {card.description}
              </motion.p>
              
              <motion.a
                href={card.buttonLink}
                className="card-button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.2) }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {card.buttonText}
              </motion.a>
            </div>

            {/* Decorative Image */}
            <div className={`card-image card-image-${card.imageType}`}></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MarketplaceSection;
