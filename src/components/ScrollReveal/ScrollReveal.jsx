import { motion } from 'motion/react';

/**
 * ScrollReveal Component
 * 
 * A reusable component that animates its children as they enter the viewport.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {number} [props.delay=0] - Animation delay in seconds
 * @param {string} [props.direction='up'] - Animation direction ('up', 'down', 'left', 'right', 'none')
 * @param {number} [props.distance=30] - Distance to slide in pixels
 * @param {number} [props.duration=0.6] - Animation duration in seconds
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.once=true] - Whether to animate only once
 */
export default function ScrollReveal({
    children,
    delay = 0,
    direction = 'up',
    distance = 30,
    duration = 0.6,
    className = '',
    once = true,
    ...props
}) {
    const getInitialProps = () => {
        const initial = { opacity: 0 };
        
        if (direction === 'none') return initial;

        switch (direction) {
            case 'up':
                initial.y = distance;
                break;
            case 'down':
                initial.y = -distance;
                break;
            case 'left':
                initial.x = distance;
                break;
            case 'right':
                initial.x = -distance;
                break;
            default:
                initial.y = distance;
        }
        
        return initial;
    };

    const getAnimateProps = () => {
        const animate = { opacity: 1 };
        
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
            viewport={{ once, margin: '-50px' }}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98] // Smooth power4-like ease
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
