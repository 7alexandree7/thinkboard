export function formateDate(date: Date): string {
    return date.toLocaleDateString('pt-br', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}