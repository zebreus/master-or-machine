import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';

interface Painting {
    paintingLabel: string;
    artistName: string;
    [key: string]: any;
}

interface PromptResult {
    paintingLabel: string;
    artistName: string;
    description: string;
}

function generatePrompt(painting: string, artist: string): string {
    const promptTemplate = `
        Write a prompt to be used in a Text to Image Generator, to generate a painting similar to the ${painting} by ${artist}. 
        I want you to only describe features of the artwork and not mention artist or title. 
        Only provide the prompt and refrain from putting out Here you go or Of course. Refrain from wording it like a prompt for example instructing the model with words like generate or create. 
        Provide more of a description of the painting.
    `;
    return promptTemplate.trim();
}

async function fetchPaintingDescriptions(directory: string): Promise<void> {
    const files = await fs.readdir(directory);

    for (const file of files) {
        if (path.extname(file) === '.json') {
            const filePath = path.join(directory, file);
            const data = await fs.readFile(filePath, 'utf-8');
            const paintings: Painting[] = JSON.parse(data);
            const results: PromptResult[] = [];

            for (const painting of paintings) {
                const prompt = generatePrompt(painting.paintingLabel, painting.artistName);

                const url = "http://localhost:11434/api/generate";
                const payload = {
                    model: "llama3",
                    prompt: prompt
                };

                try {
                    const response = await axios.post(url, payload, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        responseType: 'stream'
                    });

                    let fullResponse = '';

                    response.data.on('data', (chunk: Buffer) => {
                        const responsePart = JSON.parse(chunk.toString());
                        fullResponse += responsePart.response;
                    });

                    await new Promise<void>((resolve) => {
                        response.data.on('end', () => {
                            results.push({
                                paintingLabel: painting.paintingLabel,
                                artistName: painting.artistName,
                                description: fullResponse.replace(/\s+/g, ' ')
                            });
                            resolve();
                        });
                    });

                } catch (error) {
                    console.error(`Error making API request for "${painting.paintingLabel}" by ${painting.artistName}:`, error);
                }
            }

            const movementName = path.basename(file, '.json');
            const outputFilePath = path.join(__dirname, 'data', 'prompts-by-movement', `${movementName}_prompts.json`);
            await fs.writeFile(outputFilePath, JSON.stringify(results, null, 2), 'utf-8');
            console.log(`Prompts for movement "${movementName}" written to ${outputFilePath}`);
        }
    }
}

async function main() {
    const directoryPath = path.join(__dirname, 'data', 'by-movement');
    await fetchPaintingDescriptions(directoryPath);
}

main();
