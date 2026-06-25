import type { ReactNode } from "react"

const LiquidGlassCard = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <>
            <svg width="0" height="0" className="absolute">
                <defs>
                    <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.01 0.01"
                            numOctaves="2"
                            seed="92"
                            result="noise"
                        />
                        <feGaussianBlur
                            in="noise"
                            stdDeviation="2"
                            result="blurred"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="blurred"
                            scale="55"
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>
                </defs>
            </svg>
            <div className={`liquid-glass-card ${className}`}>
                {children}
            </div>

        </>
    )
}

export default LiquidGlassCard