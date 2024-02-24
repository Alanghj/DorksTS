import * as fs from 'fs';

function getCurrentDateTimeBRL(): string {
    const now: Date = new Date();
    return `${now.toLocaleDateString('pt-BR').replace(/\//g, '_')}_${now.toLocaleTimeString('pt-BR')}`;
}

export function saveToFile(content: string, userName:string) {
    console.log(content)
    const firstData = `${userName.split(' ')[0]}-${getCurrentDateTimeBRL()}` 
    const filePath = `src/DorkGenerated/${firstData}.txt`

   const fileDescriptor = fs.openSync(filePath, 'w');

   try {
       fs.writeSync(fileDescriptor, content);
       console.log('Data has been written to', filePath);
   } finally {
       fs.closeSync(fileDescriptor);
   }
}