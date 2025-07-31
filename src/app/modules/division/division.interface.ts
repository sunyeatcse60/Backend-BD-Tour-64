export interface IDivision {
    name : string;
    slug : string;
    thumbnail ?: string;
    description ?: string;

}

/**
 * division name = dhaka division
 * 
 * slug = dhake-division
 * 
 * /:slug => /division/dhaka-division
 * 
 */