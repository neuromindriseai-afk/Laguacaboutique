/**
 * Contacto — Página de información de la tienda
 * - Sección "Cómo llegar" con enlace a Google Maps
 * - Redes sociales (Instagram, Facebook, WhatsApp)
 * - Imagen de fondo del local
 */
import { Instagram, Facebook, MessageCircle, MapPin, Clock, Phone } from "lucide-react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { STORE_CONFIG } from "@/lib/config";
import ReviewsSection from "@/components/ReviewsSection";

const CONTACT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663655771615/3fkX8eW2HZmRY4XUxmMmsm/contact-bg-daN9tcFz3UNLB3hdCrwNuc.webp";

export default function Contacto() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Contacto — {STORE_CONFIG.STORE_NAME}</title>
        <meta name="description" content={`Visítanos en ${STORE_CONFIG.STORE_CITY}. Encuentra nuestra ubicación y síguenos en redes sociales.`} />
      </Helmet>

      <main className="min-h-screen bg-white">
        {/* Hero de contacto */}
        <section className="relative h-[40vh] min-h-[280px] max-h-[480px] overflow-hidden">
          <img
            src={CONTACT_IMAGE}
            alt="La Guaca Boutique — Nuestra tienda"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10">
              <p className="text-stone-300 text-xs font-sans tracking-[0.3em] uppercase mb-2">
                Encuéntranos
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                Contáctanos
              </h1>
            </div>
          </div>
        </section>

        {/* Contenido */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

            {/* Columna izquierda — Ubicación */}
            <div>
              <p className="text-[11px] text-stone-400 font-sans tracking-[0.3em] uppercase mb-3">
                Dónde estamos
              </p>
              <h2 className="font-display text-3xl font-bold text-stone-900 mb-6">
                Cómo llegar
              </h2>

              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-stone-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900 font-sans mb-1">Dirección</p>
                    <p className="text-sm text-stone-500 font-sans leading-relaxed">
                      {STORE_CONFIG.STORE_CITY}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-stone-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900 font-sans mb-1">Horario</p>
                    <p className="text-sm text-stone-500 font-sans leading-relaxed">
                      Lunes a Sábado: 9:00 AM – 7:00 PM<br />
                      Domingo: 10:00 AM – 4:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-stone-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900 font-sans mb-1">WhatsApp</p>
                    <a
                      href={`https://wa.me/${STORE_CONFIG.WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-stone-500 font-sans hover:text-stone-900 transition-colors underline underline-offset-4"
                    >
                      Escribirnos ahora
                    </a>
                  </div>
                </div>
              </div>

              {/* Botón Google Maps */}
              <a
                href={STORE_CONFIG.GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-stone-900 text-white font-sans font-semibold text-sm tracking-wide hover:bg-stone-700 transition-all duration-200 active:scale-[0.98] rounded-sm"
              >
                <MapPin className="w-4 h-4" />
                Abrir en Google Maps
              </a>
            </div>

            {/* Columna derecha — Redes sociales */}
            <div>
              <p className="text-[11px] text-stone-400 font-sans tracking-[0.3em] uppercase mb-3">
                Redes sociales
              </p>
              <h2 className="font-display text-3xl font-bold text-stone-900 mb-6">
                Síguenos
              </h2>

              <p className="text-stone-500 font-sans text-sm leading-relaxed mb-8">
                Mantente al día con nuestras nuevas colecciones, promociones exclusivas y looks inspiradores. ¡Únete a nuestra comunidad!
              </p>

              <div className="space-y-4">
                {/* Instagram */}
                <a
                  href={STORE_CONFIG.INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-stone-100 rounded-sm hover:border-stone-300 hover:bg-stone-50 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900 font-sans group-hover:text-stone-700">
                      Instagram
                    </p>
                    <p className="text-xs text-stone-400 font-sans">
                      Nuevas colecciones y looks diarios
                    </p>
                  </div>
                </a>

                {/* Facebook */}
                <a
                  href={STORE_CONFIG.FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-stone-100 rounded-sm hover:border-stone-300 hover:bg-stone-50 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900 font-sans group-hover:text-stone-700">
                      Facebook
                    </p>
                    <p className="text-xs text-stone-400 font-sans">
                      Promociones y eventos especiales
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${STORE_CONFIG.WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-stone-100 rounded-sm hover:border-stone-300 hover:bg-stone-50 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900 font-sans group-hover:text-stone-700">
                      WhatsApp
                    </p>
                    <p className="text-xs text-stone-400 font-sans">
                      Atención personalizada y pedidos
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Reseñas de Google Maps */}
        <ReviewsSection />
      </main>
    </HelmetProvider>
  );
}
