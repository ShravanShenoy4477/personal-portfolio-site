// src/components/LoadingPage.jsx
import robotImg from '../assets/robot-loader.png'; // Make sure the new robot icon is named this

export default function LoadingPage() {

    return (
        <div className="h-screen w-screen bg-[#fefae0] flex items-center justify-center animate-fadeIn">
            <div className="text-black text-center px-4 w-full max-w-[600px]">
                <h1 className="text-2xl sm:text-3xl font-medium mb-8 leading-snug">
                    Hi! Welcome to my personal webpage.<br />
                    In a world full of robots, I hope this makes my application more human.
                </h1>

                <div className="relative w-full h-[80px] overflow-hidden">
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-600"></div>

                    {/* Slide + float with proper spacing */}
                    <div className="absolute bottom-[80px] left-0 right-0">
                        <img
                            src={robotImg}
                            alt="Robot"
                            className="w-14 animate-slide-and-float"
                        />
                    </div>

                    <p className="absolute bottom-0 w-full text-center text-sm text-gray-500 font-mono animate-pulse">
                        Connecting<span className="dot-1">.</span><span className="dot-2">.</span><span className="dot-3">.</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
