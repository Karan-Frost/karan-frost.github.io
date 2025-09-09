const data = {
    name: "Frost",
    role: "Student",
    interests: [
        "Open Source",
        "Custom ROMs",
        "Web Designing",
        "AI"
    ],
    location: "Virtual Space",
    githubUsername: "Karan-Frost",
    projects: [
        {
            name: "Voltage OS",
            description: "Custom Android ROM, actively maintained by me for specific devices.",
            link: "https://github.com/voltageos"
        },
        {
            name: "Frost's Testzone",
            description: "A collection of Android-related repositories, including device trees and kernel configurations.",
            link: "https://github.com/frost-testzone"
        },
        {
            name: "Keybox Converter",
            description: "A JavaScript tool to convert keybox files.",
            link: "https://frost.is-a.dev/keybox-converter/"
        }
    ],
    contact: {
        email: "frost.github@proton.me",
        github: "https://github.com/Karan-Frost",
        gitlab: "https://gitlab.com/Karan-Frost",
        telegram: "https://t.me/Under_Frost"
    },
    donations: {
        upi: "underfrost@upi",
        amazonPayGiftCard: {
            url: "https://amzn.to/4j7ztfy",
            guide: "https://telegra.ph/Payment-Guide-for-Amazon-Pay-eGift-Card-05-20"
        }
    }
};

function createSection(id, title, content, className = '') {
    const section = document.createElement('div');
    section.className = `section ${className}`;
    section.id = id;
    section.innerHTML = `<h2>// ${title}</h2><pre>${content}</pre>`;
    return section;
}

function aboutBlock(data) {
    const content = `
name = "${data.name}"
role = "${data.role}"
interests = ${JSON.stringify(data.interests, null, 4)}
location = "${data.location}"`.trim();
    return createSection("about", "about.config", content, "typing-effect");
}

function projectsBlock(data) {
    const list = data.projects.map(p => `"<a href="${p.link}" target="_blank">${p.name}</a>": "${p.description}"`).join("\n");
    const content = `[\n${list}\n]`;
    return createSection("projects", "projects.list", content, "typing-effect");
}


function contactBlock(data) {
    const contact = data.contact;
    const content = `// Connect with me:
email = "<a href='mailto:${contact.email}' target='_blank'>${contact.email}</a>"
github = "<a href='${contact.github}' target='_blank'>${contact.github}</a>"
gitlab = "<a href='${contact.gitlab}' target='_blank'>${contact.gitlab}</a>"
telegram = "<a href='${contact.telegram}' target='_blank'>${contact.telegram}</a>"`;
    return createSection("contact", "contact.methods", content, "typing-effect");
}

async function githubStatsBlock(username) {
    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        const profile = await res.json();
        const content = `// GitHub Profile
name = "${profile.name || username}"
public_repos = ${profile.public_repos}
followers = ${profile.followers}
following = ${profile.following}
profile = "<a href='${profile.html_url}' target='_blank'>${profile.html_url}</a>"`;
        return createSection("github", "github.stats", content, "typing-effect");
    } catch (error) {
        const content = `// GitHub Stats\nError fetching data.`;
        return createSection("github", "github.stats", content, "typing-effect");
    }
}

function donationBlock(data) {
    const content = `// Support my work:
upi = "<span class='copy-btn' onclick='copyToClipboard(\"${data.donations.upi}\")'>${data.donations.upi}</span>"
amazonPayGiftCard = "<a href='${data.donations.amazonPayGiftCard.url}' target='_blank'>${data.donations.amazonPayGiftCard.url}</a>"
guide = "<a href='${data.donations.amazonPayGiftCard.guide}' target='_blank'>Amazon Pay Gift Card donating guide</a>"`;
    return createSection("donations", "donations.support", content, "typing-effect");
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('UPI ID copied to clipboard!');
    });
}

async function initialize() {
    const container = document.getElementById('content');
    container.appendChild(aboutBlock(data));
    container.appendChild(projectsBlock(data));
    container.appendChild(contactBlock(data));
    container.appendChild(await githubStatsBlock(data.githubUsername));
    container.appendChild(donationBlock(data));
}

initialize();

const profilePic = document.querySelector('.profile-pic');
if (profilePic) {
    profilePic.title = "Frost - GitHub Profile";
}
