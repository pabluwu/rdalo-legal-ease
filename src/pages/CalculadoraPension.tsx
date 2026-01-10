import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, AlertCircle, MessageCircle, Mail, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Seo from "@/seo/Seo";

const INGRESO_MINIMO_2025 = 529000; // Ingreso mínimo mensual en Chile 2024

const emailSchema = z.string().email({ message: "Ingresa un correo válido" });

const CalculadoraPension = () => {
  const [cantidadHijos, setCantidadHijos] = useState<number>(1);
  const [ingresosPadre, setIngresosPadre] = useState<string>("");
  const [esPensionado, setEsPensionado] = useState<string>("no");
  const [tieneIngresoExtra, setTieneIngresoExtra] = useState<string>("no");
  const [resultado, setResultado] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPensionadoWarning, setShowPensionadoWarning] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { toast } = useToast();
  const calcularPension = () => {
    // Verificar si es pensionado sin ingresos extra
    if (esPensionado === "si" && tieneIngresoExtra === "no") {
      setShowPensionadoWarning(true);
      setResultado(null);
      return;
    }

    const ingresos = parseFloat(ingresosPadre);
    if (isNaN(ingresos) || ingresos <= 0) {
      toast({
        title: "Error",
        description: "Por favor ingresa un monto válido de ingresos",
        variant: "destructive",
      });
      return;
    }

    let porcentaje: number;
    if (cantidadHijos === 1) {
      porcentaje = 0.4; // 40% para 1 hijo
    } else {
      porcentaje = 0.3 * cantidadHijos; // 30% por cada hijo
    }

    // Limitar al 50% máximo
    const porcentajeMaximo = 0.5;
    const porcentajeFinal = Math.min(porcentaje, porcentajeMaximo);

    const pensionCalculada = ingresos * porcentajeFinal;
    const pensionMinima = INGRESO_MINIMO_2025 * porcentajeFinal;

    // La pensión no puede ser menor al porcentaje del ingreso mínimo
    const pensionFinal = Math.max(pensionCalculada, pensionMinima);

    setResultado(pensionFinal);
    setShowModal(true);
  };

  const handleEmailSubmit = () => {
    const validation = emailSchema.safeParse(email);
    if (!validation.success) {
      setEmailError(validation.error.errors[0].message);
      return;
    }
    setEmailError("");
    toast({
      title: "¡Gracias!",
      description: "Te contactaremos pronto para revisar tu caso.",
    });
    setShowModal(false);
    setEmail("");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Cómo calcular la pensión de alimentos en Chile | Calculadora 2025"
        description="Calculadora de pensión de alimentos en Chile 2025: cuánto me corresponde por hijo, deudor de alimento, retención y demanda de pensión."
      />
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 md:pt-32 md:pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Calculadora de Pensión de Alimentos
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Calcula un aproximado de la pensión de alimentos según la legislación chilena
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-8 space-y-6">
              {/* Cantidad de hijos */}
              <div className="space-y-3">
                <Label htmlFor="hijos" className="text-base font-medium">
                  ¿Cuántos hijos tiene?
                </Label>
                <Input
                  id="hijos"
                  type="number"
                  min={1}
                  max={10}
                  value={cantidadHijos}
                  onChange={(e) => setCantidadHijos(Math.max(1, parseInt(e.target.value) || 1))}
                  className="text-lg"
                />
              </div>

              {/* Es pensionado */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  ¿El padre/madre demandado(a) es pensionado(a)?
                </Label>
                <RadioGroup value={esPensionado} onValueChange={setEsPensionado}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no-pensionado" />
                    <Label htmlFor="no-pensionado" className="cursor-pointer">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="si" id="si-pensionado" />
                    <Label htmlFor="si-pensionado" className="cursor-pointer">Sí</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Tiene ingreso extra (solo si es pensionado) */}
              <AnimatePresence>
                {esPensionado === "si" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    <Label className="text-base font-medium">
                      ¿Tiene ingresos adicionales además de la pensión?
                    </Label>
                    <RadioGroup value={tieneIngresoExtra} onValueChange={setTieneIngresoExtra}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="si" id="si-extra" />
                        <Label htmlFor="si-extra" className="cursor-pointer">Sí, tiene otros ingresos</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no-extra" />
                        <Label htmlFor="no-extra" className="cursor-pointer">No, solo recibe pensión</Label>
                      </div>
                    </RadioGroup>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Ingresos del padre */}
              <div className="space-y-3">
                <Label htmlFor="ingresos" className="text-base font-medium">
                  Ingresos totales mensuales del demandado(a)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="ingresos"
                    type="number"
                    min={0}
                    placeholder="Ej: 800000"
                    value={ingresosPadre}
                    onChange={(e) => setIngresosPadre(e.target.value)}
                    className="pl-8 text-lg"
                  />
                </div>
                <div className="flex items-start gap-2 p-3 bg-accent/50 rounded-lg">
                  <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong>Importante:</strong> Debe incluir todos los ingresos (sueldo, honorarios, arriendos, 
                    inversiones, etc.), no solo la remuneración principal.
                  </p>
                </div>
              </div>

              {/* Botón calcular */}
              <Button
                onClick={calcularPension}
                className="w-full py-6 text-lg"
                size="lg"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calcular Pensión
              </Button>

              {/* Disclaimer */}
              <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg border border-border">
                <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Este cálculo es solo un <strong>aproximado</strong> basado en los porcentajes 
                  establecidos por la ley chilena. El monto final puede variar según las circunstancias 
                  específicas de cada caso y la decisión del tribunal.
                </p>
              </div>
            </div>

            {/* Info adicional */}
            <div className="mt-8 p-6 bg-card rounded-xl border border-border">
              <h3 className="font-semibold text-foreground mb-3">¿Cómo se calcula?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>1 hijo:</strong> 40% del ingreso mínimo mensual</li>
                <li>• <strong>2 o más hijos:</strong> 30% del ingreso mínimo mensual por cada hijo</li>
                <li>• <strong>Tope máximo:</strong> 50% de los ingresos del demandado</li>
                <li>• <strong>Ingreso mínimo 2024:</strong> {formatCurrency(INGRESO_MINIMO_2025)}</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal de resultado */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Resultado del Cálculo</DialogTitle>
            <DialogDescription className="text-center">
              Pensión aproximada para {cantidadHijos} {cantidadHijos === 1 ? "hijo" : "hijos"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            <div className="text-center mb-6">
              <p className="text-4xl font-bold text-primary">
                {resultado !== null && formatCurrency(resultado)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">mensuales aproximados</p>
            </div>

            <div className="p-4 bg-accent/50 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground text-center">
                ¿Quieres una evaluación profesional de tu caso con todos los antecedentes?
              </p>
            </div>

            <div className="space-y-4">
              <Button
                asChild
                className="w-full py-6"
                size="lg"
              >
                <a
                  href="https://wa.me/56912345678?text=Hola,%20acabo%20de%20usar%20la%20calculadora%20de%20pensión%20y%20me%20gustaría%20una%20consulta%20profesional."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Hablar por WhatsApp
                </a>
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">o déjanos tu correo</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="tu@correo.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    className={emailError ? "border-destructive" : ""}
                  />
                  <Button onClick={handleEmailSubmit} variant="secondary">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
                {emailError && (
                  <p className="text-sm text-destructive">{emailError}</p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para pensionados sin ingreso extra */}
      <Dialog open={showPensionadoWarning} onOpenChange={setShowPensionadoWarning}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Caso Especial</DialogTitle>
          </DialogHeader>
          
          <div className="py-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-amber-600" />
              </div>
            </div>
            
            <p className="text-center text-muted-foreground mb-6">
              Cuando el demandado es pensionado y no tiene ingresos adicionales, el cálculo de 
              pensión de alimentos requiere un análisis especial que debe ser revisado por un abogado, 
              ya que existen consideraciones legales particulares.
            </p>

            <div className="space-y-4">
              <Button
                asChild
                className="w-full py-6"
                size="lg"
              >
                <a
                  href="https://wa.me/56912345678?text=Hola,%20necesito%20consultar%20sobre%20pensión%20de%20alimentos%20para%20un%20caso%20donde%20el%20demandado%20es%20pensionado."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Consultar con un Abogado
                </a>
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowPensionadoWarning(false)}
              >
                Volver a la calculadora
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default CalculadoraPension;
