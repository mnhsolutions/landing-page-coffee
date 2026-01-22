export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: 'coffes' | 'smoothies' | 'baking' | 'snacks';
}

export interface MenuData {
  all: Product[];
  coffes: string[];   // aquí van los ids de 'all'
  smoothies: string[];
  baking: string[];
  snacks: string[];
}
