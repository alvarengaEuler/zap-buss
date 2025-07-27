export interface UsefulInfo {
  id: string
  name: string
  category: string
  whatsapp: string
  instagram: string
  hours: string
  products: [string, string, string]
  sponsored: boolean // Nova propriedade
}

export const categories = [
  { id: "all", name: "Todos", icon: "📌" },
  { id: "padaria", name: "Padarias", icon: "🍞" },
  { id: "lanchonete", name: "Lanchonetes", icon: "🍔" },
  { id: "hamburgueria", name: "Hamburguerias", icon: "🍟" },
  { id: "loja", name: "Lojas", icon: "🛍️" },
  { id: "farmacia", name: "Farmácias", icon: "💊" },
  { id: "mercado", name: "Mercados", icon: "🛒" },
  { id: "restaurante", name: "Restaurantes", icon: "🍽️" },
]

// Atualizar os dados mock para incluir a propriedade sponsored
export const usefulInfoData: UsefulInfo[] = [
  {
    id: "1",
    name: "Pão Quente Padaria",
    category: "padaria",
    whatsapp: "https://wa.me/5531999999999",
    instagram: "https://instagram.com/paoquente",
    hours: "Seg a Sab - 06h às 20h",
    products: ["Pão de queijo", "Bolo de cenoura", "Café coado"],
    sponsored: true, // Estabelecimento patrocinado
  },
  {
    id: "2",
    name: "Burger Master",
    category: "hamburgueria",
    whatsapp: "https://wa.me/5531888888888",
    instagram: "https://instagram.com/burgermaster",
    hours: "Ter a Dom - 18h às 23h",
    products: ["X-Bacon", "Batata Frita", "Milkshake"],
    sponsored: false,
  },
  {
    id: "3",
    name: "Lanchonete do João",
    category: "lanchonete",
    whatsapp: "https://wa.me/5531777777777",
    instagram: "https://instagram.com/lanchonetejoao",
    hours: "Seg a Sex - 07h às 19h",
    products: ["Misto Quente", "Suco Natural", "Açaí"],
    sponsored: false,
  },
  {
    id: "4",
    name: "Moda & Estilo",
    category: "loja",
    whatsapp: "https://wa.me/5531666666666",
    instagram: "https://instagram.com/modaestilo",
    hours: "Seg a Sab - 09h às 18h",
    products: ["Roupas Femininas", "Acessórios", "Calçados"],
    sponsored: true, // Estabelecimento patrocinado
  },
  {
    id: "5",
    name: "Farmácia Saúde",
    category: "farmacia",
    whatsapp: "https://wa.me/5531555555555",
    instagram: "https://instagram.com/farmaciasaude",
    hours: "Seg a Dom - 07h às 22h",
    products: ["Medicamentos", "Cosméticos", "Suplementos"],
    sponsored: false,
  },
  {
    id: "6",
    name: "Mercado Central",
    category: "mercado",
    whatsapp: "https://wa.me/5531444444444",
    instagram: "https://instagram.com/mercadocentral",
    hours: "Seg a Dom - 06h às 22h",
    products: ["Frutas e Verduras", "Carnes", "Laticínios"],
    sponsored: false,
  },
]

export function getCategoryName(categoryId: string): string {
  const category = categories.find((cat) => cat.id === categoryId)
  return category ? category.name : categoryId
}

export function getCategoryIcon(categoryId: string): string {
  const category = categories.find((cat) => cat.id === categoryId)
  return category ? category.icon : "📌"
}
