"use client";
import { CheckCircle } from "lucide-react";

export default function () {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-8 max-w-md w-full relative">
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-orange-500 rounded-full p-3">
            <CheckCircle size={48} className="text-gray-900" />
          </div>
        </div>

        {/* Success message */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-orange-500 mb-4 uppercase tracking-wider">
            Registration Done
          </h2>

          <p className="text-gray-100 font-mono mb-6 leading-relaxed">
            <span className="text-orange-500 font-bold"></span> successfully
            registered a new member.
          </p>

          <div className="bg-gray-900 border border-gray-600 rounded p-4 mb-6">
            <div className="text-orange-500 font-bold text-sm uppercase tracking-wide mb-1">
              Status
            </div>
            <div className="text-gray-100 font-mono text-lg">ACTIVE MEMBER</div>
          </div>
        </div>
      </div>
    </div>
  );
}
