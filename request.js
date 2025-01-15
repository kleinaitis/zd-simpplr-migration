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

// Refer to steps in https://platform.simpplr.com/reference/authenticating-via-an-external-application-1
// Redirected after consent page to get authorization code from URL
// Current refresh token expires 90 days after 01/14/2025
export async function getSimpplrRefreshToken() {

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
    const accessToken = data.access_token
    const refreshToken = data.refresh_token

    return { accessToken, refreshToken }
}

// Returns access token
// Refresh token is valid for 90 days at a time as per documentation
export async function getSimpplrAccessToken() {

    const response = await fetch(`${process.env.SIMPPLR_TOKEN_URL}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${process.env.SIMPPLR_REFRESH_TOKEN}`
        },
        body: JSON.stringify({
            grant_type: 'refresh_token',
            client_id: `${process.env.SIMPPLR_CLIENT_ID}`,
            client_secret: `${process.env.SIMPPLR_CLIENT_SECRET}`,
        })
    });
    const data = await response.json();
    return data.access_token
}

export async function getSimpplrSites(accessToken) {

    const response = await fetch(`https://platform.app.simpplr.com/v1/content/sites/list`, {
        method: "POST",
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
    });

    const data = await response.json();
    console.log(data.result.listOfItems)
}