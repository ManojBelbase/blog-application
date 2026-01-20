export const dateFormater = (date: string) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
}