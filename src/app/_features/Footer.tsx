import { Heart, Mail, Phone, MapPin, PawPrint } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    adopt: [
      { label: "Available Pets", href: "#" },
      { label: "How to Adopt", href: "#" },
      { label: "Success Stories", href: "#" },
      { label: "Foster a Pet", href: "#" },
    ],
    resources: [
      { label: "Pet Care Tips", href: "#" },
      { label: "Training Guides", href: "#" },
      { label: "Health & Nutrition", href: "#" },
      { label: "Vet Directory", href: "#" },
    ],
    about: [
      { label: "Our Mission", href: "#" },
      { label: "Team", href: "#" },
      { label: "Partners", href: "#" },
      { label: "Careers", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  };

  return (
    <div className="bg-[#30241d] text-background relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">
                <PawPrint />
              </span>
              <span className="font-display text-2xl font-bold">PetCare</span>
            </div>
            <p className="text-background/70 mb-6 max-w-xs">
              Connecting rescue pets with loving homes and providing trusted
              veterinary care resources.
            </p>
            <div className="space-y-2 text-sm text-background/70">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                hello@petcare.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                (976) 99999999
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Ulaanbaatar, Mongolia
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div>
            <h4 className="font-display font-bold mb-4">Adopt</h4>
            <ul className="space-y-2">
              {footerLinks.adopt.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-background/10">
          <p className="text-background/50 text-sm">
            © 2026 PetCare. Made with{" "}
            <Heart className="w-4 h-4 inline text-white fill-white" /> for pets
            everywhere.
          </p>
        </div>
      </div>
    </div>
  );
}
