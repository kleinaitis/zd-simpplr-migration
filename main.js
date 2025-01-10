import { getSalesforceAccessToken, authorizeSimpplr } from './request.js';

async function main() {
    try {
        const accessToken = await getSalesforceAccessToken();
        await authorizeSimpplr(accessToken);
    } catch (error) {
        console.error("Error during the process:", error);
    }
}

main();