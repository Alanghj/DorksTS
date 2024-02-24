import { updateData } from '../const'

export function searchQueries(userName:string) {
    const queries: string[] = [
        `"${userName}" OR "${userName}"`,
        `"${userName}" -"LinkedIn"`,
        `related:"${userName}"`,
        ];
    return queries;
}

export async function performGoogleSearch(query: string): Promise<void> {
    try {
        const encodedQuery = encodeURIComponent(query);
        const searchUrl = `http://www.google.com/search?q=${encodedQuery}`;
        const response = await fetch(searchUrl);

        if (!response.ok) {
            throw new Error('Failed to perform Google search');
        }
        const responseData = await response.text();

        const regex = /q=(?:#|http)[^&]+/g;
        const matches = responseData.match(regex);

        if (matches) {
            const cleanedMatches = matches.map(match => match.replace('q=', ''));
            for (const cleaned of cleanedMatches) { 
                let Data = `${cleaned}\n`
                updateData(Data)
            }
        } else {
            console.log("No elements found...");
        }
    } catch (error) {
        console.error('Error performing Google search:', error);
    }
}

