export interface User {
    id: string; // uuid
    email: string;
    display_name: string;
    first_name: string;
    last_name: string;
    description: string;
    avatar_url: string;
    created_at: string; // timestamp without time zone
    stripe_customer_id: string | null; // ID del cliente Stripe associato all'utente

    
}

