import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "../atoms/ui/shiny-text";
import { AnimatedGridPattern } from "../atoms/ui/animated-grid-pattern";

type WorkflowExample = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

export const SmoothWorkflowAnimation = () => {
  // Define workflow examples
  const workflowExamples: WorkflowExample[] = [
    {
      id: 1,
      title: "Web Scraper",
      description: "Scrape data from websites",
      icon: (
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      ),
      color:
        "bg-blue-500/10 border-blue-500/20 text-blue-600/90 dark:text-blue-400/90",
    },
    {
      id: 2,
      title: "Transform JSON",
      description: "Map and transform data",
      icon: (
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
      ),
      color:
        "bg-amber-500/10 border-amber-500/20 text-amber-600/90 dark:text-amber-400/90",
    },
    {
      id: 3,
      title: "SQL Query",
      description: "Query databases & APIs",
      icon: (
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
          <path d="M17 8h-6c-1 0-2 1-2 2v4c0 1 1 2 2 2h6" />
        </svg>
      ),
      color:
        "bg-green-500/10 border-green-500/20 text-green-600/90 dark:text-green-400/90",
    },
    {
      id: 4,
      title: "Filter Data",
      description: "Filter incoming data",
      icon: (
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
        </svg>
      ),
      color:
        "bg-purple-500/10 border-purple-500/20 text-purple-600/90 dark:text-purple-400/90",
    },
    {
      id: 5,
      title: "Parse HTML",
      description: "Extract with selectors",
      icon: (
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </svg>
      ),
      color:
        "bg-red-500/10 border-red-500/20 text-red-600/90 dark:text-red-400/90",
    },
    {
      id: 6,
      title: "API Connector",
      description: "Connect to external APIs",
      icon: (
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M8 9l3 3-3 3M16 9l-3 3 3 3M3 12h3m12 0h3" />
        </svg>
      ),
      color:
        "bg-cyan-500/10 border-cyan-500/20 text-cyan-600/90 dark:text-cyan-400/90",
    },
  ];

  // For smoother initialization of the animation
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {/* Background with subtle gradient */}
      <div>
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(450px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        />
      </div>

      {/* Beautiful catchphrase overlay with smoother animation */}
      <motion.div
        className="absolute z-30 top-12 left-0 right-0 flex justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <motion.div
          className="bg-black/10 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/20"
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1], // Smooth custom cubic bezier
            delay: 0.3,
          }}
        >
          <AnimatedShinyText className="inline-flex whitespace-nowrap text-base font-medium">
            Automate Once, Relax Forever
          </AnimatedShinyText>
        </motion.div>
      </motion.div>

      {/* Floating workflow boxes with smoother animations */}
      <AnimatePresence>
        {isLoaded && (
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
            {workflowExamples.map((workflow, index) => (
              <SmoothWorkflowBox
                key={workflow.id}
                workflow={workflow}
                index={index}
                total={workflowExamples.length}
              />
            ))}

            {/* Center node with smoother pulse animation */}
            <motion.div
              className="absolute z-10 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: [0.95, 1.05, 0.95],
                opacity: 1,
              }}
              transition={{
                scale: {
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                },
                opacity: {
                  duration: 1,
                  ease: "easeOut",
                },
              }}
              style={{ width: "3.5rem", height: "3.5rem" }}
            >
              <motion.div
                className="rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center"
                animate={{
                  scale: [1, 0.92, 1],
                }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: 0.5,
                }}
                style={{ width: "2.5rem", height: "2.5rem" }}
              >
                <motion.div
                  className="rounded-full bg-primary/10 flex items-center justify-center"
                  animate={{
                    scale: [1, 0.85, 1],
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: 1,
                  }}
                  style={{ width: "1.5rem", height: "1.5rem" }}
                >
                  <svg
                    className="size-3 text-primary/60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Connection effect using SVG radial gradient */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  <radialGradient
                    id="connectionGradient"
                    cx="50%"
                    cy="50%"
                    r="50%"
                    fx="50%"
                    fy="50%"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--primary)"
                      stopOpacity="0.08"
                    />
                    <stop
                      offset="70%"
                      stopColor="var(--primary)"
                      stopOpacity="0.03"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--primary)"
                      stopOpacity="0"
                    />
                  </radialGradient>
                </defs>
                <circle
                  cx="50%"
                  cy="50%"
                  r="35%"
                  fill="url(#connectionGradient)"
                />
              </svg>
            </motion.div>

            {/* Subtle connection lines - animated particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <ConnectionParticle key={i} index={i} />
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom tagline with smoother animation */}
      <motion.div
        className="absolute z-30 bottom-12 left-0 right-0 flex justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <motion.div
          className="px-6 py-2 rounded-lg"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 0.9 }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.8,
          }}
        >
          <AnimatedShinyText className="text-sm text-muted-foreground text-center">
            Life is easier when your data flows automatically
          </AnimatedShinyText>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Smoother workflow box animation
const SmoothWorkflowBox = ({
  workflow,
  index,
  total,
}: {
  workflow: WorkflowExample;
  index: number;
  total: number;
}) => {
  // Calculate position in a circle with better distribution
  const angle = (index / total) * Math.PI * 2 + Math.PI / 6; // Add offset for better positioning
  const radius = 190; // Base radius - adjusted for typical screen sizes

  // Calculate base position
  const centerX = 0;
  const centerY = 0;
  const xPos = centerX + Math.cos(angle) * radius;
  const yPos = centerY + Math.sin(angle) * radius;

  // Smoother animation variables
  const randomOffset = React.useMemo(
    () => ({
      x: Math.random() * 10 + 5,
      y: Math.random() * 10 + 5,
      delay: Math.random() * 2,
      duration: 20 + Math.random() * 10,
    }),
    []
  );

  // Progress bar animation
  const [progressWidth, setProgressWidth] = useState(15);

  useEffect(() => {
    // Create smooth random progress bar movement
    let timeout: any;

    const animateProgress = () => {
      // Random target between 15% and 85%
      const target = Math.random() * 70 + 15;
      setProgressWidth(target);

      // Random time for next movement (3-8 seconds)
      timeout = setTimeout(animateProgress, Math.random() * 5000 + 3000);
    };

    animateProgress();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      className={cn(
        "absolute z-20 p-3 rounded-lg border shadow-sm",
        workflow.color
      )}
      style={{
        width: "200px",
        transformOrigin: "center center",
      }}
      initial={{
        x: xPos,
        y: yPos,
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        x: xPos,
        y: yPos,
        opacity: 0.95,
        scale: 1,
      }}
      transition={{
        opacity: { duration: 1, ease: "easeOut" },
        scale: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }, // Spring-like animation
      }}
    >
      {/* Box Content */}
      <div className="flex items-center gap-1.5 mb-1">
        <div className="flex items-center justify-center p-1 rounded bg-white/5">
          {workflow.icon}
        </div>
        <h3 className="font-medium text-xs">{workflow.title}</h3>
      </div>

      <div className="text-xs opacity-70">{workflow.description}</div>

      {/* Code example - simplified */}
      <div className="mt-2 bg-black/20 dark:bg-black/30 rounded px-2 py-1.5 font-mono text-[10px] text-white/80 overflow-hidden">
        {workflow.id === 1 && (
          <span>
            <span className="opacity-70">workflow</span>.scrape(url)
          </span>
        )}
        {workflow.id === 2 && (
          <span>
            <span className="opacity-70">data</span>.transform(json)
          </span>
        )}
        {workflow.id === 3 && <span>SELECT * FROM users</span>}
        {workflow.id === 4 && (
          <span>
            <span className="opacity-70">stream</span>.filter(x {`=>`} x.valid)
          </span>
        )}
        {workflow.id === 5 && (
          <span>
            <span className="opacity-70">html</span>.querySelector(selector)
          </span>
        )}
        {workflow.id === 6 && (
          <span>
            <span className="opacity-70">api</span>.get("/endpoint")
          </span>
        )}
      </div>

      {/* Smooth progress indicator with spring physics */}
      <div className="h-0.5 bg-black/10 dark:bg-white/5 rounded-full mt-2 overflow-hidden">
        <motion.div
          className="h-full bg-white/20 rounded-full"
          animate={{ width: `${progressWidth}%` }}
          transition={{
            duration: 1.5,
            ease: [0.34, 1.56, 0.64, 1], // Spring-like animation
          }}
        />
      </div>

      {/* Floating animation applied to the box */}
      <motion.div
        className="absolute inset-0 z-[-1]"
        animate={{
          x: [0, randomOffset.x, 0, -randomOffset.x, 0],
          y: [0, -randomOffset.y, 0, randomOffset.y, 0],
        }}
        transition={{
          duration: randomOffset.duration,
          ease: "easeInOut",
          repeat: Infinity,
          delay: randomOffset.delay,
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      />
    </motion.div>
  );
};

// Connection particle for more organic feel
const ConnectionParticle = ({ index }: { index: number }) => {
  const baseDelay = index * 0.5;
  const size = Math.random() * 2 + 1;

  // Random starting angle and distance from center
  const startAngle = Math.random() * Math.PI * 2;
  const startDistance = Math.random() * 30 + 20;
  const startX = Math.cos(startAngle) * startDistance;
  const startY = Math.sin(startAngle) * startDistance;

  // Random ending angle, but farther from center
  const endAngle = Math.random() * Math.PI * 2;
  const endDistance = Math.random() * 60 + 140;
  const endX = Math.cos(endAngle) * endDistance;
  const endY = Math.sin(endAngle) * endDistance;

  // Animation duration and delay
  const duration = Math.random() * 10 + 20;

  return (
    <motion.div
      className="absolute rounded-full bg-primary/30 z-[-1]"
      style={{
        width: size + "px",
        height: size + "px",
        top: "50%",
        left: "50%",
        marginLeft: -(size / 2) + "px",
        marginTop: -(size / 2) + "px",
      }}
      initial={{
        x: startX,
        y: startY,
        opacity: 0,
      }}
      animate={{
        x: endX,
        y: endY,
        opacity: [0, 0.2, 0],
      }}
      transition={{
        x: {
          duration: duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: baseDelay,
        },
        y: {
          duration: duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: baseDelay,
        },
        opacity: {
          duration: duration / 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: baseDelay,
        },
      }}
    />
  );
};

export default SmoothWorkflowAnimation;
