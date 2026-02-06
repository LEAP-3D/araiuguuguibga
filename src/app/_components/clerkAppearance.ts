const sharedAppearance = {
  variables: {
    colorPrimary: "#0d9488",
    colorBackground: "rgba(255, 255, 255, 0.2)",
    colorText: "#0f172a",
    colorTextSecondary: "#334155",
    borderRadius: "1rem",
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  },
  elements: {
    rootBox: "w-full",
    card: "rounded-2xl overflow-hidden bg-white/25 backdrop-blur-xl backdrop-saturate-150 border border-white/30 shadow-2xl",
    cardBox: "rounded-2xl bg-transparent",
    headerTitle: "text-slate-900 font-bold text-xl",
    headerSubtitle: "text-slate-600 font-medium",
    formFieldLabel: "text-slate-800 font-semibold",
    formFieldInput: "rounded-xl border-white/40 bg-white/20 text-slate-900 placeholder:text-slate-600 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/30 backdrop-blur-xl backdrop-saturate-150",
    formButtonPrimary: "bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl",
    footerActionLink: "text-teal-600 hover:text-teal-700 font-medium",
    footer: "bg-white/20 backdrop-blur-xl border-t border-white/25 text-slate-700",
    footerPages: "bg-transparent text-slate-600",
    dividerLine: "bg-slate-400/80",
    dividerText: "text-slate-600 font-medium",
    socialButtonsBlockButton: "border-white/40 rounded-xl bg-white/30 text-slate-800 hover:bg-white/40 backdrop-blur-sm font-medium",
  },
  layout: {
    showOptionalFields: true,
    socialButtonsPlacement: "bottom" as const,
    socialButtonsVariant: "blockButton" as const,
  },
};

export const signInAppearance = {
  ...sharedAppearance,
  elements: {
    ...sharedAppearance.elements,
    formButtonPrimary: "bg-teal-600 hover:bg-[#86D2D9] text-white font-semibold rounded-xl",
  },
};

export const signUpAppearance = {
  ...sharedAppearance,
  variables: { ...sharedAppearance.variables, colorPrimary: "#43342D" },
  elements: {
    ...sharedAppearance.elements,
    formButtonPrimary: "bg-[#43342D] hover:bg-[#524a3d] text-white font-semibold rounded-xl",
  },
};
