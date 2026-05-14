/**
 * ReviewsSection Component
 * Muestra reseñas de Google Maps en la página de Contacto
 */
import { Star, MapPin, Phone, Clock } from "lucide-react";

interface Review {
  author: string;
  rating: number;
  text: string;
  timeAgo: string;
  hasImage?: boolean;
}

const REVIEWS: Review[] = [
  {
    author: "Sam Pamela",
    rating: 5,
    text: "Los vêtements para femmes y los parfums son espectaculares, el precio y la calidad son excelentes.",
    timeAgo: "hace 21 horas",
    hasImage: false,
  },
  {
    author: "MindRise AI",
    rating: 5,
    text: "¡Adoro, todos mis vêtements vienen de La Guaca 👑!",
    timeAgo: "hace 23 horas",
    hasImage: true,
  },
  {
    author: "Javier Antonio Sandoval Diaz",
    rating: 5,
    text: "Excelente servicio y productos de calidad.",
    timeAgo: "hace 5 años",
    hasImage: true,
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-16 bg-stone-50">
      <div className="container">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-playfair font-bold text-stone-900 mb-2">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-stone-600 font-sans">
            Reseñas verificadas de Google Maps
          </p>
        </div>

        {/* Rating Summary */}
        <div className="mb-12 flex flex-col sm:flex-row items-center justify-center gap-8 bg-white rounded-lg p-8 border border-stone-200">
          <div className="text-center">
            <div className="text-5xl font-playfair font-bold text-stone-900 mb-2">
              5.0
            </div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="text-sm text-stone-600">Basado en 4 reseñas</p>
          </div>

          <div className="hidden sm:block w-px h-24 bg-stone-200" />

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-stone-400" />
              <span className="text-sm text-stone-700">
                Cl. 37 #1w-105, Montería, Córdoba
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-stone-400" />
              <a
                href="tel:+573107873833"
                className="text-sm text-stone-700 hover:text-stone-900 transition-colors"
              >
                +57 310 7873833
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-stone-400" />
              <span className="text-sm text-stone-700">
                Abierto: 09:00 - 18:00 (Lunes a Sábado)
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-6 border border-stone-200 hover:border-stone-400 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-stone-700 text-sm mb-4 leading-relaxed">
                "{review.text}"
              </p>

              {/* Author & Time */}
              <div className="border-t border-stone-100 pt-4">
                <p className="font-sans font-semibold text-stone-900 text-sm">
                  {review.author}
                </p>
                <p className="text-xs text-stone-500">{review.timeAgo}</p>
                {review.hasImage && (
                  <p className="text-xs text-stone-400 mt-2">📷 Con fotos</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-stone-600 mb-4">
            ¿Quieres compartir tu experiencia?
          </p>
          <a
            href="https://maps.app.goo.gl/Tfw7D2W1Svp2rokq6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-stone-900 text-white font-sans font-semibold rounded-sm hover:bg-stone-800 transition-colors"
          >
            Dejar una reseña en Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
