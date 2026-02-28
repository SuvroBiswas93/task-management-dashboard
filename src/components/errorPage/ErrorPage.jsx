import React from "react";
import { useRouteError, useNavigate } from "react-router";
import { ArrowLeft, Home } from "lucide-react";
import errorImg from "../../assets/errorImg.webp";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const message =
    error?.statusText || error?.message || "The page you are looking for is not available.";

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl rounded-3xl border border-[#e3ebe6] bg-[#f6f8f7] p-4 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <span className="inline-flex items-center rounded-full border border-[#b8dfcb] bg-[#edf8f2] px-3 py-1 text-xs font-semibold text-[#2f9a78]">
              Error 404
            </span>

            <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
              Page not found
            </h1>
            <p className="mt-2 text-sm md:text-base text-gray-600 max-w-md mx-auto lg:mx-0">
              {message}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 rounded-xl bg-[#2f9a78] hover:bg-[#288868] text-white px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                Go Home
              </button>
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#cfe9db] bg-white hover:bg-[#f3faf7] text-[#2f9a78] px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="group cursor-pointer"
            >
              <img
                src={errorImg}
                alt="Page not found"
                className="w-full max-w-sm rounded-2xl border border-[#e4ebe7] bg-white p-2 shadow-sm transition-transform group-hover:scale-[1.01]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}