require('dotenv').config()

async function getZDArticle() {
    const response = await fetch(`https://${process.env.ZENDESK_SUBDOMAIN}.com/api/v2/help_center/en-us/articles/${process.env.ZENDESK_ARTICLE_ID}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Basic ${process.env.ZENDESK_CREDENTIALS}`,
        },
    });

    const data = await response.json();
    // Other useful properties returned: id, url, html_url, draft, name, title, label_names, body
    console.log(data.article.body)
}

async function authorizeSimpplr() {

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

