import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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

const ContactForm = () => {
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

  return (
    <section id="contacto" className="py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Contáctanos
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Estamos aquí para ayudarte. Déjanos tus datos y te responderemos pronto
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Nombre completo</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Juan Pérez" 
                        {...field} 
                        className="bg-card border-border focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Correo electrónico</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="juan@ejemplo.com" 
                        {...field} 
                        className="bg-card border-border focus:ring-primary"
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
                        className="bg-card border-border focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Mensaje</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Cuéntanos en qué podemos ayudarte..."
                        className="min-h-[150px] bg-card border-border focus:ring-primary resize-none"
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
                {sendContactMutation.isPending ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
