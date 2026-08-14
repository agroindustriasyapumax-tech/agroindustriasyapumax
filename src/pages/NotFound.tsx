import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="container-custom py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <div className="text-8xl font-display font-bold text-primary/20 mb-4">404</div>
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">
        Página no encontrada
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Lo sentimos, la página que buscas no existe o fue movida.
      </p>
      <Button asChild size="lg">
        <Link to="/">
          <Home className="h-4 w-4 mr-2" />
          Volver al inicio
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
