import { searchQueries, performGoogleSearch } from '../searchEngine/googleSearch'
import { saveToFile } from '../settings/saveData'
import { DataToFile } from '../const'
import readline from 'readline';


export function getDataUser() {
    const userFullName = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    userFullName.question('Enter your Full Name: ', (userName) => {
        userFullName.close();

        const defineSearchQuery = searchQueries(userName);
        const promises = [];

        for (let pos = 0; pos < defineSearchQuery.length; pos++) {
            promises.push(performGoogleSearch(defineSearchQuery[pos]));
        }

        Promise.all(promises)
            .then(() => {
                saveToFile(DataToFile, userName);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
}