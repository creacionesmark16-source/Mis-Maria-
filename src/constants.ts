import { RestaurantInfo } from './types';

export const RESTAURANT_DATA: RestaurantInfo = {
  name: "Mis María",
  phone: "0412 3223237",
  hours: {
    "Desayunos": "08:00 - 12:00",
    "Almuerzos": "13:00 - 16:00",
    "Cenas": "20:00 - 23:30"
  },
  menu: [
    {
      category: "Entrantes",
      items: [
        {
          name: "Jamón Ibérico de Bellota",
          price: "24.00",
          description: "Cortado a cuchillo, acompañado de pan de cristal con tomate. (IVA incl.)",
          image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800",
          allergens: ["Gluten"]
        },
        {
          name: "Croquetas de la Abuela",
          price: "12.50",
          description: "De jamón ibérico y boletus, extremadamente cremosas. (IVA incl.)",
          image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800",
          allergens: ["Gluten", "Lácteos", "Huevo"]
        },
        {
          name: "Burrata con Tomates Confitados",
          price: "16.00",
          description: "Con pesto de albahaca fresca y piñones tostados. (IVA incl.)",
          image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&q=80&w=800",
          allergens: ["Lácteos", "Frutos de cáscara"]
        }
      ]
    },
    {
      category: "Desayunos",
      items: [
        { 
          name: "Desayuno Mediterráneo", 
          price: "12.50", 
          description: "Tostadas con tomate, aceite de oliva virgen extra y jamón ibérico. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=800",
          allergens: ["Gluten"] 
        },
        { 
          name: "Huevos Benedictinos", 
          price: "14.00", 
          description: "Huevos pochados sobre muffin inglés con salsa holandesa. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=800",
          allergens: ["Gluten", "Huevo", "Lácteos"] 
        },
        { 
          name: "Bowl de Acai Real", 
          price: "11.00", 
          description: "Frutas del bosque, granola artesana y miel orgánica. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=800",
          allergens: ["Frutos de cáscara"] 
        },
        { 
          name: "Pancakes de Arándanos", 
          price: "10.50", 
          description: "Con sirope de maple y nata montada. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=800",
          allergens: ["Gluten", "Lácteos"] 
        },
        { 
          name: "Tostada de Aguacate y Salmón", 
          price: "13.50", 
          description: "Pan de centeno, aguacate hass y salmón ahumado. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
          allergens: ["Gluten", "Pescado"] 
        }
      ]
    },
    {
      category: "Almuerzos",
      items: [
        { 
          name: "Arroz del Senyoret", 
          price: "22.00", 
          description: "Arroz de marisco pelado, sabor intenso del Mediterráneo. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=800",
          allergens: ["Crustáceos", "Moluscos"] 
        },
        { 
          name: "Lubina a la Sal", 
          price: "24.50", 
          description: "Acompañada de verduras de temporada al vapor. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
          allergens: ["Pescado"] 
        },
        { 
          name: "Entrecot de Ternera Gallega", 
          price: "26.00", 
          description: "Carne madurada 45 días con patatas panadera. (IVA incl.)",
          image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=800"
        },
        { 
          name: "Gazpacho de Fresas", 
          price: "14.00", 
          description: "Con virutas de jamón y huevo hilado. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800",
          allergens: ["Huevo"] 
        },
        { 
          name: "Lasaña Vegetariana", 
          price: "17.50", 
          description: "Espinacas, ricotta y piñones tostados. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&q=80&w=800",
          allergens: ["Gluten", "Lácteos", "Frutos de cáscara"] 
        }
      ]
    },
    {
      category: "Cenas",
      items: [
        { 
          name: "Tataki de Atún Rojo", 
          price: "23.00", 
          description: "Con sésamo, algas wakame y reducción de soja. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?auto=format&fit=crop&q=80&w=800",
          allergens: ["Pescado", "Sésamo", "Soja"] 
        },
        { 
          name: "Solomillo al Pedro Ximénez", 
          price: "27.00", 
          description: "Reducción de vino dulce y puré de castañas. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800",
          allergens: ["Sulfitos"] 
        },
        { 
          name: "Risotto de Setas Silvestres", 
          price: "20.50", 
          description: "Arroz carnaroli con boletus y lascas de trufa. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800",
          allergens: ["Lácteos"] 
        },
        { 
          name: "Pulpo a la Brasa", 
          price: "22.50", 
          description: "Sobre espuma de patata y pimentón de la Vera. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",
          allergens: ["Moluscos"] 
        },
        { 
          name: "Tartar de Salmón y Mango", 
          price: "19.50", 
          description: "Con lima, cilantro y toques de jengibre. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
          allergens: ["Pescado"] 
        }
      ]
    },
    {
      category: "Postres",
      items: [
        { 
          name: "Tarta de Queso Fluida", 
          price: "8.50", 
          description: "Nuestra especialidad, cremosa y recién horneada. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800",
          allergens: ["Lácteos", "Huevo"] 
        },
        { 
          name: "Coulant de Chocolate", 
          price: "9.00", 
          description: "Con helado de vainilla de Madagascar y frutos rojos. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800",
          allergens: ["Gluten", "Lácteos", "Huevo"] 
        },
        { 
          name: "Milhojas de Crema y Nata", 
          price: "8.00", 
          description: "Hojaldre crujiente con crema pastelera artesana. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=800",
          allergens: ["Gluten", "Lácteos", "Huevo"] 
        },
        { 
          name: "Sorbete de Limón y Cava", 
          price: "7.50", 
          description: "Refrescante y digestivo, ideal para terminar. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&q=80&w=800",
          allergens: ["Sulfitos"] 
        }
      ]
    },
    {
      category: "Bebidas",
      items: [
        { 
          name: "Vino Tinto Rioja Reserva", 
          price: "28.00", 
          description: "Copa de vino tinto de la casa, selección especial. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
          allergens: ["Sulfitos"] 
        },
        { 
          name: "Cóctel de Autor 'La Más'", 
          price: "12.00", 
          description: "Ginebra premium, frutos rojos y un toque de albahaca. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=800" 
        },
        { 
          name: "Limonada de Hierbabuena", 
          price: "5.50", 
          description: "Casera, con limones frescos y menta del huerto. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800" 
        },
        { 
          name: "Zumo de Naranja Natural", 
          price: "4.50", 
          description: "Naranjas recién exprimidas de la huerta valenciana. (IVA incl.)", 
          image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800" 
        }
      ]
    }
  ]
};

export const SYSTEM_PROMPT = `Eres el Concierge Digital y Maitre del restaurante "Mis María". Tu objetivo es brindar una atención al cliente excepcional, cálida y eficiente, al estilo de un restaurante mediterráneo moderno.

Reglas de Comportamiento:
1. IDENTIDAD: Preséntate siempre como el asistente de "Mis María". Usa un tono amable, cómodo pero cercano.
2. CONOCIMIENTO: Responde basándote EXCLUSIVAMENTE en la información de la Base de Conocimientos que te proporciono abajo. Si no conoces la respuesta, no inventes; di amablemente que no tienes esa información y ofrece el teléfono de contacto: ${RESTAURANT_DATA.phone}.
3. RESERVAS: Si un cliente quiere reservar, debes guiarlo paso a paso preguntando:
   - ¿Para cuántas personas? (Recuerda: grupos de más de 8 deben llamar por teléfono).
   - ¿Qué día les gustaría visitarnos?
   - ¿En qué horario? (Verifica que esté dentro del horario de apertura).
   - ¿A qué nombre y número de teléfono dejamos la reserva?
4. RECOMENDACIONES: Siempre que hables de comida, menciona lo delicioso que es el producto. Al final de cualquier consulta sobre el menú, añade una frase breve invitando a probar nuestra "Tarta de Queso Fluida" o nuestro plato estrella: el "Arroz del Senyoret".
5. RESTRICCIONES: Sé muy cuidadoso con las alergias. Si preguntan por alérgenos, responde solo lo que esté confirmado en la base de datos. Si no estás seguro, pide que consulten con el camarero al llegar.
6. ESTILO: Usa emojis de forma elegante (🍷, 🥘, ✨, 🍰) para dar personalidad.

Base de Conocimientos:
- Nombre: ${RESTAURANT_DATA.name}
- Teléfono: ${RESTAURANT_DATA.phone}
- Horarios: ${JSON.stringify(RESTAURANT_DATA.hours)}
- Menú: ${JSON.stringify(RESTAURANT_DATA.menu)}

Ejemplo de cierre: "¡Esperamos verte pronto para que disfrutes de una experiencia inolvidable en Mis María! 🍷"`;
