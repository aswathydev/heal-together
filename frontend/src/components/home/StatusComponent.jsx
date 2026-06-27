import {
    Headphones,
    ShieldCheck,
    Heart,
  } from "lucide-react";
  
  export default function Stats() {
    return (
      <div className="flex  items-center gap-10 pt-8">
        
        {/* 24/7 AI Support */}
        <div className="flex items-center gap-5 bg-white/70 backdrop-blur-md rounded-full px-6 py-4 shadow-lg">
          <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center">
            <Headphones className="w-10 h-10 text-violet-600" />
          </div>
  
          <div>
            <h3 className="text-5xl font-bold text-slate-900">24/7</h3>
            <p className="text-2xl text-slate-500">AI Support</p>
          </div>
        </div>
  
        {/* 100% Private */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>
  
          <div>
            <h3 className="text-5xl font-bold text-slate-900">100%</h3>
            <p className="text-2xl text-slate-500">Private</p>
          </div>
        </div>
  
        {/* Community */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center">
            <Heart className="w-10 h-10 text-pink-500 fill-current" />
          </div>
  
          <div>
            <h3 className="text-4xl font-bold text-slate-900">
              Community
            </h3>
            <p className="text-2xl text-slate-500">
              Care & Support
            </p>
          </div>
        </div>
      </div>
    );
  }