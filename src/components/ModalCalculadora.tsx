import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, CheckCircle2, User, Phone, Mail } from "lucide-react";

interface ModalCalculadoraProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  montoCalculado: number;
  numeroHijos: number;
  onSubmit: (data: WizardData) => void;
}

export interface WizardData {
  montoCalculado: number;
  numeroHijos: number;
  respuestas: {
    rol: string;
    gastosExtraordinarios: string;
    situacionLaboral: string;
    acuerdoPrevio: string;
  };
  contacto: {
    nombre: string;
    whatsapp: string;
    email: string;
  };
}

const ModalCalculadora: React.FC<ModalCalculadoraProps> = ({
  open,
  onOpenChange,
  montoCalculado,
  numeroHijos,
  onSubmit,
}) => {
  const [step, setStep] = useState(0);
  const [respuestas, setRespuestas] = useState({
    rol: "",
    gastosExtraordinarios: "",
    situacionLaboral: "",
    acuerdoPrevio: "",
  });
  const [contacto, setContacto] = useState({
    nombre: "",
    whatsapp: "+569",
    email: "",
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleOptionClick = (field: keyof typeof respuestas, value: string) => {
    setRespuestas((prev) => ({ ...prev, [field]: value }));
    nextStep();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      montoCalculado,
      numeroHijos,
      respuestas,
      contacto: {
        ...contacto,
        email: contacto.email.trim() === "" ? "test@test.cl" : contacto.email,
      },
    });
  };

  const steps = [
    // Paso 0: Resultado Inicial
    {
      title: "Resultado del Cálculo",
      content: (
        <div className="space-y-6">
          <div 
            className="text-center cursor-pointer group transition-transform active:scale-95"
            onClick={nextStep}
          >
            <p className="text-5xl font-extrabold text-primary mb-2 group-hover:scale-110 transition-transform">
              {formatCurrency(montoCalculado)}
            </p>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
              Pensión Estimada Mensual
            </p>
          </div>

          <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <p className="text-sm text-center text-muted-foreground italic">
              Este es un monto referencial basado en la ley vigente. Cada caso tiene particularidades que pueden aumentar o disminuir esta cifra.
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={nextStep}
              className="w-full h-16 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all group"
            >
              Iniciar Pre-Evaluación Gratuita
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button 
              asChild
              variant="outline"
              className="w-full h-14 text-base font-semibold rounded-2xl border-2 border-primary/20 hover:border-primary/40 transition-all"
            >
              <a 
                href={`https://wa.me/56990538001?text=Hola, acabo de usar la calculadora de pensión y me gustaría una consulta profesional. Monto estimado: ${formatCurrency(montoCalculado)} por ${numeroHijos} ${numeroHijos === 1 ? 'hijo' : 'hijos'}.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="w-5 h-5 mr-2 text-primary" />
                Háblanos por WhatsApp más rápido.
              </a>
            </Button>
          </div>
        </div>
      ),
    },
    // Paso 1: Rol
    {
      title: "¿Cuál es tu rol?",
      description: "Paso 1 de 4",
      content: (
        <div className="grid gap-3">
          {[
            "Soy quien va a solicitar la pensión",
            "Soy quien debe pagar la pensión",
          ].map((option) => (
            <Button
              key={option}
              variant="outline"
              className="h-auto min-h-[4rem] text-left justify-between px-6 py-4 rounded-xl border-2 hover:border-primary hover:bg-primary/5 transition-all whitespace-normal"
              onClick={() => handleOptionClick("rol", option)}
            >
              <span className="font-semibold text-sm leading-tight mr-4">{option}</span>
              <ChevronRight className="w-5 h-5 text-primary shrink-0" />
            </Button>
          ))}
        </div>
      ),
    },
    // Paso 2: Gastos extraordinarios
    {
      title: "¿Gastos extraordinarios regulares?",
      description: "Paso 2 de 4",
      content: (
        <div className="grid gap-3">
          {[
            "Sí (Salud, educación costosa, tratamientos)",
            "No, solo los gastos comunes del día a día",
          ].map((option) => (
            <Button
              key={option}
              variant="outline"
              className="h-auto min-h-[4rem] text-left justify-between px-6 py-4 rounded-xl border-2 hover:border-primary hover:bg-primary/5 transition-all whitespace-normal"
              onClick={() => handleOptionClick("gastosExtraordinarios", option)}
            >
              <span className="font-semibold text-sm leading-tight mr-4">{option}</span>
              <ChevronRight className="w-5 h-5 text-primary shrink-0" />
            </Button>
          ))}
        </div>
      ),
    },
    // Paso 3: Situación Laboral
    {
      title: "¿Situación laboral del alimentante?",
      description: "Paso 3 de 4",
      content: (
        <div className="grid gap-3">
          {[
            "Tiene contrato de trabajo / Sueldo fijo",
            "Es independiente o tiene negocio",
            "Está cesante o ingresos informales",
          ].map((option) => (
            <Button
              key={option}
              variant="outline"
              className="h-auto min-h-[4rem] text-left justify-between px-6 py-4 rounded-xl border-2 hover:border-primary hover:bg-primary/5 transition-all whitespace-normal"
              onClick={() => handleOptionClick("situacionLaboral", option)}
            >
              <span className="font-semibold text-sm leading-tight mr-4">{option}</span>
              <ChevronRight className="w-5 h-5 text-primary shrink-0" />
            </Button>
          ))}
        </div>
      ),
    },
    // Paso 4: Acuerdo Previo
    {
      title: "¿Acuerdo previo?",
      description: "Paso 4 de 4",
      content: (
        <div className="grid gap-3">
          {[
            "No, es la primera vez",
            "Hay un acuerdo de palabra de forma informal",
            "Sí, fijada por tribunal o mediación pero quiero modificarla",
          ].map((option) => (
            <Button
              key={option}
              variant="outline"
              className="h-auto min-h-[4rem] text-left justify-between px-6 py-4 rounded-xl border-2 hover:border-primary hover:bg-primary/5 transition-all whitespace-normal"
              onClick={() => handleOptionClick("acuerdoPrevio", option)}
            >
              <span className="font-semibold text-sm leading-tight mr-4">{option}</span>
              <ChevronRight className="w-5 h-5 text-primary shrink-0" />
            </Button>
          ))}
        </div>
      ),
    },
    // Paso 5: Contacto Final
    {
      title: "¡Último paso!",
      description: "Déjanos tus datos para enviarte el informe detallado",
      content: (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="nombre" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Nombre Completo</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="nombre"
                required
                placeholder="Ej: Juan Pérez"
                value={contacto.nombre}
                onChange={(e) => setContacto({ ...contacto, nombre: e.target.value })}
                className="h-11 pl-10 rounded-xl border-2 focus-visible:ring-primary text-sm"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="whatsapp" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">WhatsApp</Label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="whatsapp"
                required
                type="tel"
                placeholder="+569 1234 5678"
                value={contacto.whatsapp}
                onChange={(e) => setContacto({ ...contacto, whatsapp: e.target.value })}
                className="h-11 pl-10 rounded-xl border-2 focus-visible:ring-primary text-sm"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Email (Opcional)</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={contacto.email}
                onChange={(e) => setContacto({ ...contacto, email: e.target.value })}
                className="h-11 pl-10 rounded-xl border-2 focus-visible:ring-primary text-sm"
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full h-14 text-base font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all mt-2"
          >
            Obtener Evaluación Profesional
          </Button>
          <p className="text-[9px] text-center text-muted-foreground px-4 leading-tight">
            Al continuar, aceptas que un especialista te contacte para brindarte asesoría legal personalizada.
          </p>
        </form>
      ),
    },
  ];

  const currentStep = steps[step];

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) setStep(0); // Reset wizard on close
      onOpenChange(val);
    }}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none rounded-[2rem]">
        <div className="bg-white p-6 md:p-8">
          <DialogHeader className="mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <DialogTitle className="text-2xl font-extrabold text-foreground mb-1">
                  {currentStep.title}
                </DialogTitle>
                {currentStep.description && (
                  <DialogDescription className="text-primary font-bold uppercase tracking-tighter">
                    {currentStep.description}
                  </DialogDescription>
                )}
              </motion.div>
            </AnimatePresence>
          </DialogHeader>

          <div className="relative min-h-[300px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full"
              >
                {currentStep.content}
              </motion.div>
            </AnimatePresence>
          </div>

          {step > 0 && step < 5 && (
            <div className="mt-8 flex justify-center">
              <button 
                onClick={prevStep}
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                ← Volver al paso anterior
              </button>
            </div>
          )}
        </div>
        
        {/* Progress bar */}
        {step > 0 && (
          <div className="h-1.5 w-full bg-muted">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModalCalculadora;
