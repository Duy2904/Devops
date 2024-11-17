export function showLogError(message: unknown) {
    if (process.env.NODE_ENV === 'development') {
        console.error(message);
    }
}