import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Send } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre es muy largo"),
  email: z.string().email("Correo electrónico inválido").max(255, "El correo es muy largo"),
  phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos").max(20, "El teléfono es muy largo"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(1000, "El mensaje es muy largo"),
});

const FinalCTA = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const sendContactMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch("https://api.acuerdalo.cl/api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nombre: values.name,
          correo: values.email,
          telefono: values.phone,
          mensaje: values.message,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        throw new Error(errorText || "No se pudo enviar el mensaje. Intenta nuevamente.");
      }

      return response.json().catch(() => null);
    },
    onSuccess: () => {
      toast({
        title: "¡Mensaje enviado!",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      form.reset();
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "No se pudo enviar el mensaje. Intenta nuevamente.";
      toast({
        title: "No pudimos enviar tu mensaje",
        description: message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await sendContactMutation.mutateAsync(values);
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/56912345678?text=Hola,%20necesito%20asesoría%20legal", "_blank");
  };

  return (
    <section id="contacto" className="py-20 px-6 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            ¿Lista/o para resolver tu caso?
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            Escríbenos por WhatsApp para respuesta inmediata o déjanos tus datos
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 border border-border shadow-soft"
          >
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                <MessageCircle className="h-10 w-10 text-[#25D366]" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">
                Respuesta inmediata
              </h3>
              <p className="text-muted-foreground mb-6">
                Escríbenos por WhatsApp y te respondemos en minutos durante horario de atención
              </p>
              <Button 
                onClick={openWhatsApp}
                size="lg" 
                className="bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg rounded-full px-8 py-6 text-lg font-medium transition-all hover:scale-105 w-full"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Abrir WhatsApp
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Lunes a Viernes, 9:00 - 18:00
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-2xl p-8 border border-border shadow-soft"
          >
            <h3 className="text-xl font-semibold mb-6 text-foreground text-center">
              O déjanos tus datos
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Nombre</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tu nombre" 
                          {...field} 
                          className="bg-background border-border focus:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="tu@email.com" 
                            {...field} 
                            className="bg-background border-border focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Teléfono</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="+56 9 1234 5678" 
                            {...field} 
                            className="bg-background border-border focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">¿En qué podemos ayudarte?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Cuéntanos brevemente tu situación..."
                          className="min-h-[100px] bg-background border-border focus:ring-primary resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft rounded-full py-6 text-lg font-medium transition-all hover:scale-105"
                  disabled={sendContactMutation.isPending}
                >
                  {sendContactMutation.isPending ? "Enviando..." : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Enviar mensaje
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
