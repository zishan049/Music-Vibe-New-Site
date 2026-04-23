import { motion } from 'motion/react';

/**
 * ScrollReveal Component — Enhanced for Music Vibe
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} [props.delay=0] - Animation delay in seconds
 * @param {string} [props.direction='up'] - Animation direction ('up', 'down', 'left', 'right', 'none')
 * @param {number} [props.distance=30] - Distance to slide in pixels
 * @param {number} [props.duration=0.8] - Animation duration in seconds
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.once=true] - Whether to animate only once
 * @param {string} [props.revealType='slide'] - Type of reveal: 'slide', 'scale', 'blur', 'skew'
 */
export default function ScrollReveal({
    children,
    delay = 0,
    direction = 'up',
    distance = 32,
    duration = 0.9,
    className = '',
    once = true,
    revealType = 'slide',
    ...props
}) {
    const getInitialProps = () => {
        const initial = { opacity: 0 };
        
        if (revealType === 'blur') {
            initial.filter = 'blur(12px)';
        }
        
        if (revealType === 'scale') {
            initial.scale = 0.94;
        }

        if (revealType === 'skew') {
            initial.skewY = 3;
        }

        if (direction === 'none') return initial;

        switch (direction) {
            case 'up': initial.y = distance; break;
            case 'down': initial.y = -distance; break;
            case 'left': initial.x = distance; break;
            case 'right': initial.x = -distance; break;
            default: initial.y = distance;
        }
        
        return initial;
    };

    const getAnimateProps = () => {
        const animate = { opacity: 1 };
        
        if (revealType === 'blur') {
            animate.filter = 'blur(0px)';
        }
        
        if (revealType === 'scale') {
            animate.scale = 1;
        }

        if (revealType === 'skew') {
            animate.skewY = 0;
        }
        
        if (direction === 'none') return animate;
        
        if (direction === 'up' || direction === 'down') {
            animate.y = 0;
        } else {
            animate.x = 0;
        }
        
        return animate;
    };

    return (
        <motion.div
            className={className}
            initial={getInitialProps()}
            whileInView={getAnimateProps()}
            viewport={{ once, margin: '-60px' }}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1] // High-end cinematic easing
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
