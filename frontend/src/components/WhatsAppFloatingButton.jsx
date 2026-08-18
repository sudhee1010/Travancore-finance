import React, { useState, useEffect } from 'react';


const WhatsAppFloatingButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile for better UX
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll to show/hide button
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // WhatsApp number (replace with your number)
  const phoneNumber = '+91 85907 23351'; // Replace with your WhatsApp number
  const message = 'Hello! I have a question about your services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // For desktop, open in new tab; for mobile, use native app
  const handleClick = () => {
    if (isMobile) {
      window.location.href = whatsappUrl;
    } else {
      window.open(whatsappUrl, '_blank');
    }
  };

  // Styles
  const styles = {
    container: {
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 9999,
      transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
      opacity: isVisible ? 1 : 0,
      pointerEvents: isVisible ? 'auto' : 'none',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#25D366',
      color: 'white',
      border: 'none',
      boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
      outline: 'none',
      position: 'relative',
    },
    pulseRing: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      backgroundColor: '#25D366',
      opacity: 0.3,
      animation: 'pulse 2s infinite',
      pointerEvents: 'none',
    },
    tooltip: {
      position: 'absolute',
      right: '75px',
      backgroundColor: 'white',
      color: '#333',
      padding: '8px 16px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      whiteSpace: 'nowrap',
      opacity: isHovered ? 1 : 0,
      transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
      transition: 'all 0.3s ease',
      pointerEvents: 'none',
    },
    tooltipArrow: {
      position: 'absolute',
      right: '-6px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '0',
      height: '0',
      borderLeft: '6px solid white',
      borderTop: '6px solid transparent',
      borderBottom: '6px solid transparent',
    },
    svg: {
      width: '32px',
      height: '32px',
      fill: 'white',
      position: 'relative',
      zIndex: 1,
    },
    badge: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      backgroundColor: '#ff4444',
      color: 'white',
      borderRadius: '50%',
      width: '22px',
      height: '22px',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      boxShadow: '0 2px 8px rgba(255, 68, 68, 0.4)',
      zIndex: 2,
    }
  };

  return (
    <div style={styles.container}>
      {/* Tooltip */}
      <div style={styles.tooltip}>
        Chat with us on WhatsApp
        <div style={styles.tooltipArrow} />
      </div>

      {/* Main Button */}
      <button
        style={styles.button}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse Animation Ring */}
        <div style={styles.pulseRing} />
        
        {/* WhatsApp SVG Icon */}
        <svg 
          style={styles.svg}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>

        {/* Optional Badge for unread messages */}
        <div style={styles.badge}>1</div>
      </button>

      {/* Inject Keyframes Animation */}
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 0.3;
            }
            50% {
              transform: scale(1.3);
              opacity: 0;
            }
            100% {
              transform: scale(1.6);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default WhatsAppFloatingButton;