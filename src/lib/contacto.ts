/**
 * Contacto centralizado de Acuérdalo. Cualquier número o correo que se muestre
 * o enlace en el sitio sale de aquí.
 */
export const ABOGADOS = [
  { nombre: "Miguel Reyes Rojas", telefono: "+56 9 8242 3082", wa: "56982423082", email: "miguelreyes@acuerdalo.cl" },
  { nombre: "Michelle Álvarez Villalón", telefono: "+56 9 9775 7311", wa: "56997757311", email: "michellealvarez@acuerdalo.cl" },
];

export const WHATSAPP_PRINCIPAL = ABOGADOS[1].wa; // Michelle; cambiar aquí si se prefiere a Miguel

export const waLink = (texto?: string) =>
  `https://wa.me/${WHATSAPP_PRINCIPAL}${texto ? `?text=${encodeURIComponent(texto)}` : ""}`;

/** "+56 9 9775 7311" -> "tel:+56997757311" */
export const telLink = (telefono: string) => `tel:${telefono.replace(/\s/g, "")}`;
