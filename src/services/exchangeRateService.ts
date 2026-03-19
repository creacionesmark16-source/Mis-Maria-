export interface ExchangeRate {
  price: number;
  last_update: string;
}

export async function getExchangeRate(): Promise<ExchangeRate> {
  try {
    // Fetching directly from a reliable public source (DolarAPI)
    // This API supports CORS and is reliable for BCV rates.
    const response = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
    if (!response.ok) throw new Error('Failed to fetch from primary source');
    
    const data = await response.json();
    
    // DolarAPI structure: { "moneda": "USD", "nombre": "Oficial", "promedio": 36.50, "fechaActualizacion": "..." }
    if (data && data.promedio) {
      return {
        price: data.promedio,
        last_update: data.fechaActualizacion || new Date().toLocaleDateString()
      };
    }
    
    throw new Error('Invalid data structure from primary source');
  } catch (error) {
    console.warn('Exchange rate fetch failed, using fallback:', error);
    
    // Try secondary source (PyDolarVE)
    try {
      const response = await fetch('https://pydolarve.org/api/v1/dollar?monitor=bcv');
      if (response.ok) {
        const data = await response.json();
        if (data && data.monitors && data.monitors.bcv) {
          return {
            price: data.monitors.bcv.price,
            last_update: data.monitors.bcv.last_update || new Date().toLocaleDateString()
          };
        }
      }
    } catch (secondaryError) {
      console.error('Secondary source also failed:', secondaryError);
    }

    // Return a default rate if all APIs are down
    return { price: 36.50, last_update: new Date().toLocaleDateString() };
  }
}
