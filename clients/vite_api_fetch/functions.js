export function handleRequestError(response) {
    if (!response.ok) {
        throw new Error("Erro: " + response.status);
    }
}
// Capitaliza a primeira letra do nome
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}