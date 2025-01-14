import {getSimpplrAccessToken, getSimpplrSites} from './request.js';

async function main() {
    try {
        const accessToken = await getSimpplrAccessToken();
        await getSimpplrSites(accessToken);
    } catch (error) {
        console.error("Error during the process:", error);
    }
}

main();