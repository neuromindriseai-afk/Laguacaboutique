/**
 * App.tsx — Raíz de La Guaca Boutique
 * - Rutas: / | /catalogo | /categoria/:nombre | /producto/:id | /contacto
 * - Contexto del carrito
 * - Layout global: Navbar + CartDrawer + Footer
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import PromoBanner from "./components/PromoBanner";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import ProductoDetalle from "./pages/ProductoDetalle";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/catalogo" component={Catalogo} />
      {/* Ruta de categoría — reutiliza el componente Catálogo */}
      <Route path="/categoria/:nombre" component={Catalogo} />
      <Route path="/producto/:id" component={ProductoDetalle} />
      <Route path="/contacto" component={Contacto} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <PromoBanner />
      <div className="flex-1">
        <Router />
      </div>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <CartProvider>
            <Layout />
            <Toaster />
          </CartProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
