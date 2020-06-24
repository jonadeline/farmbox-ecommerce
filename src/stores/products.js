import { readable } from 'svelte/store';

export const products = readable([
  {
    id: 'XMAS-SMALL-PLATTER',
    name: 'Small Luxury Cheese Platter',
    image: 'cheese-platter-3-4',
    price: 289,
    qty: 0,
    short_desc: '3-5ppl - 1.22kg',
    description: ['Comté Réserve 18M - 200g',
      'Gruyère Suisse Réserve - 200g',
      'Tomette Espelette Pepper - 200g',
      'Salers AOP - 200g',
      'Brillat Savarin Mini AOP - 100g',
      'Brie with truffles - 200g',
      'Condiment Jam - 120g'
    ]
  },
  {
    id: 'XMAS-MEDIUM-PLATTER',
    name: 'Medium Luxury Cheese Platter',
    image: 'cheese-platter-5-7',
    price: 449,
    qty: 0,
    short_desc: '5-7ppl - 2.07kg',
    description: ['Comté Réserve 18M AOP - 250g',
      'Gruyère Suisse Réserve - 250g',
      'Tomette Espelette Pepper - 250g',
      'Salers AOP - 250g',
      'Brillat Savarin Mini AOP (x2) - 200g',
      'Brie with truffles - 200g',
      'Sainte-Maure de Touraine AOP - 280g',
      'Gouda Tartufo - 150g',
      'Condiment Jam (x2) - 240g'
    ]
  },
  {
    id: 'XMAS-LARGE-PLATTER',
    name: 'Large Luxury Cheese Platter',
    image: 'cheese-platter-8-10',
    price: 649,
    qty: 0,
    short_desc: '8-10ppl - 3.09kg',
    description: ['Comté Réserve 18M AOP - 250g',
      'Gruyère Suisse Réserve - 250g',
      'Tomette Espelette Pepper - 250g',
      'Salers AOP - 250g',
      'Brillat Savarin Mini AOP (x3) - 300g',
      'Brie with truffles - 250g',
      'Sainte-Maure de Touraine AOP - 280g',
      'Gouda Tartufo - 250g',
      'Valencay Traditionnel AOP - 280g',
      'Crémeux des Citeaux with Truffles - 300g',
      'Manchego Montescusa - 250g',
      'Condiment Jam (x2) - 240g'
    ]
  }
]);
