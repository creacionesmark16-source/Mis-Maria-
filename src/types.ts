export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface RestaurantInfo {
  name: string;
  phone: string;
  hours: {
    [key: string]: string;
  };
  menu: {
    category: string;
    items: {
      name: string;
      price: string;
      description: string;
      image?: string;
      allergens?: string[];
    }[];
  }[];
}
