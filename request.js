import "dotenv/config.js";

async function getZDArticle() {
    let zendeskArticleData;
    const response = await fetch(`https://${process.env.ZENDESK_SUBDOMAIN}.com/api/v2/help_center/en-us/articles/${process.env.ZENDESK_ARTICLE_ID}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Basic ${process.env.ZENDESK_CREDENTIALS}`,
        },
    });

    const data = await response.json();

    zendeskArticleData = {
        articleBody: data.article.body,
        articleId: data.article.id,
        articleTitle: data.article.title,
        articleURL: data.article.html_url,
        articleJSON: data.article.url,

    }
    return zendeskArticleData;
}

export async function getSalesforceAccessToken() {
    const clientCredentials = btoa(`${process.env.SALESFORCE_CONSUMER_KEY}:${process.env.SALESFORCE_CLIENT_SECRET}`);
    const salesforceEndPoint = `${process.env.SALESFORCE_DOMAIN_URL}/services/oauth2/token`;
    const params = {
        grant_type: "client_credentials",
    }
    const response = await fetch(`${salesforceEndPoint}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": `Basic ${clientCredentials}`,
        },
        body: new URLSearchParams(params).toString(),
    });

    const data = await response.json();
    return data.access_token;
}
// Refer to steps in https://platform.simpplr.com/reference/authenticating-via-an-external-application-1
// Redirected after consent page to get authorization code from URL
export async function getSimpplrAccessToken() {

    const response = await fetch(`${process.env.SIMPPLR_TOKEN_URL}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            grant_type: "authorization_code",
            auth_code: `${process.env.SIMPPLR_AUTHORIZATION_CODE}`,
            client_id: `${process.env.SIMPPLR_CLIENT_ID}`,
            client_secret: `${process.env.SIMPPLR_CLIENT_SECRET}`,
        })
    });
    const data = await response.json();
    console.log(data)
}
async function getSimpplrSites() {

}
async function createSimpplrPage(content) {
    const encodedParams = new URLSearchParams();
    // Extract data from Zendesk response properties to add here
    encodedParams.set('content-sub-type', 'news');
    encodedParams.set('publish-at', '2022-02-12T00:00:00+05:30');
    encodedParams.set('body', '<p>This is the basic description text.</p>');
    encodedParams.set('summary', 'This is a custom summary text.');
    encodedParams.set('title', 'Page created from API Portal');
    encodedParams.set('is-feed-enabled', 'true');
    encodedParams.set('category-name', 'News');
    encodedParams.set('publishing-status', 'immediate');

    const response = await fetch(`https://api.ec.simpplr.com/api/contents/site/${process.env.SIMPPLR_SITE_ID}/page`, {
        method: "POST",
        headers: {
            accept: 'application/json',
            'x-user-email': `${process.env.SALESFORCE_USER_EMAIL}`,
            'content-type': 'application/x-www-form-urlencoded',
        },
        body: encodedParams
    });

    const data = await response.json();
    console.log(data)
}
