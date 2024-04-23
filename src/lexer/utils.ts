export function is_digit(c: string): boolean {
    return c >= '0' && c <= '9';
}

export function is_lowercase(c: string): boolean {
    return c >= 'a' && c <= 'z';
}

export function is_uppercase(c: string): boolean {
    return c >= 'A' && c <= 'Z';
}

export function is_identifier_char(c: string): boolean {
    return is_lowercase(c) || is_uppercase(c) || is_digit(c) || c === '_';
}
