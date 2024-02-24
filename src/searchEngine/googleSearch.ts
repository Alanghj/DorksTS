import { updateData } from '../const'

export function searchQueries(userName: string) {
    const queries: string[] = [
        `"${userName}"`,
        `"${userName}" -site:linkedin.com`,
        `related:"${userName}"`,
        `"${userName}" + "contact information" | "email address" | "phone number"`,
        `"${userName}" site:linkedin.com | site:facebook.com | site:twitter.com`,
        `"${userName}" + "resume" | "CV" | "professional experience" filetype:pdf`,
        `"${userName}" + "articles" | "publications" filetype:pdf | site:scholar.google.com`,
        `"${userName}" + "interview" | "podcast" | "webinar"`,
        `"${userName}" + "legal documents" | "court case" | "patent"`,
        `"${userName}" + "university" | "thesis" | "dissertation"`,
        `"${userName}" site:reddit.com | site:quora.com`,
        `"${userName}" + "photos" | "videos"`,
        `"${userName}" + "startup" | "business venture" | "company founder"`,
        `"${userName}" + "personal blog" | "website"`,
        `"${userName}" + "property holdings" | "real estate"`,
        `filetype:pdf "${userName}"`
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

