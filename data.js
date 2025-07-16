export const mockAnalyticsData = {
  totalClicks: 12345,
  clicksOverTime: [
    { name: 'Mon', clicks: 400 }, { name: 'Tue', clicks: 300 },
    { name: 'Wed', clicks: 500 }, { name: 'Thu', clicks: 780 },
    { name: 'Fri', clicks: 600 }, { name: 'Sat', clicks: 950 },
    { name: 'Sun', clicks: 1200 },
  ],
  topReferrers: [
    { name: 'Facebook', value: 400 }, { name: 'Twitter', value: 300 },
    { name: 'Google', value: 250 }, { name: 'Direct', value: 200 },
  ],
  clicksByCountry: [
    { name: 'USA', value: 600 }, { name: 'India', value: 350 },
    { name: 'Brazil', value: 200 }, { name: 'UK', value: 150 },
    { name: 'Canada', value: 180 }, { name: 'Germany', value: 120 },
  ],
};

export const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const marketplacePartners = {
  ecommerce: [
    { name: 'Shopify', logo: 'shopify.com', description: 'The all-in-one e-commerce platform to start, run, and grow a business.', url: 'https://www.shopify.com' },
    { name: 'Squarespace', logo: 'squarespace.com', description: 'Build a beautiful website with award-winning templates and powerful marketing tools.', url: 'https://www.squarespace.com' },
    { name: 'Wix', logo: 'wix.com', description: 'A versatile website builder with strong e-commerce capabilities for any venture.', url: 'https://www.wix.com' },
  ],
  marketing: [
    { name: 'Mailchimp', logo: 'mailchimp.com', description: 'Engage your audience with the #1 email marketing and automation brand.', url: 'https://mailchimp.com' },
    { name: 'Adobe Express', logo: 'adobe.com', description: 'Quickly and easily make standout content from thousands of beautiful templates.', url: 'https://www.adobe.com/express/' },
    { name: '99designs', logo: '99designs.com', description: 'The global creative platform that makes it easy for designers and clients to work together.', url: 'https://99designs.com' },
  ],
  finance: [
    { name: 'QuickBooks', logo: 'intuit.com', description: 'Smart, simple online accounting software for small business.', url: 'https://quickbooks.intuit.com' },
    { name: 'FreshBooks', logo: 'freshbooks.com', description: 'Accounting software built for owners, saving you time and helping you get paid faster.', url: 'https://www.freshbooks.com' },
    { name: 'Wave', logo: 'waveapps.com', description: 'Free invoicing & accounting software with credit card processing & payroll services.', url: 'https://www.waveapps.com' },
  ],
  fundraising: [
    { name: 'Donorbox', logo: 'donorbox.org', description: 'Powerful fundraising software that’s simple and effective for nonprofits.', url: 'https://donorbox.org' },
    { name: 'Givebutter', logo: 'givebutter.com', description: 'The #1-rated free fundraising platform with all the tools you need to raise more.', url: 'https://givebutter.com' },
    { name: 'GoFundMe', logo: 'gofundme.com', description: 'The most trusted free online fundraising platform for any cause or project.', url: 'https://www.gofundme.com' },
  ]
};

export const freeResources = {
    training: [
        { name: 'State Extension Services', description: 'Find your local Cooperative Extension Service for practical, research-based information on agriculture, community development, and more.', url: 'https://www.nifa.usda.gov/land-grant-colleges-and-universities-partner-website-directory' },
        { name: 'Coursera', description: 'Access thousands of online courses from top universities in business, marketing, technology, and more.', url: 'https://www.coursera.org' },
    ],
    grants: [
        { name: 'Grants.gov', description: 'The official source to find and apply for federal grants. A central resource for NGOs and researchers.', url: 'https://www.grants.gov' },
        { name: 'USDA Grants & Loans', description: 'Specific funding opportunities from the USDA for farmers, ranchers, and rural communities.', url: 'https://www.usda.gov/topics/farming/grants-and-loans' },
    ],
    business: [
        { name: 'SBA: Start Your Business', description: 'The U.S. Small Business Administration\'s official guide to planning, launching, and managing your business.', url: 'https://www.sba.gov/business-guide/10-steps-start-your-business' },
        { name: 'SCORE Mentorship', description: 'Connect with a free business mentor for expert advice on everything from business planning to marketing.', url: 'https://www.score.org' },
    ]
};

export const successStories = [
    { id: 1, title: 'How a Local Farm Increased Market Sales by 30% with QR Codes', excerpt: 'Sunny Meadow Farms needed a way to bridge the gap between their physical farm stand and their online presence. By placing FarmLink QR codes on their produce bags, they directed customers to their website to see recipes and sign up for their newsletter...', image: 'https://placehold.co/600x400/a3e635/14532d?text=Sunny+Meadow+Farms' },
    { id: 2, title: 'NGO Tracks Donations for Clean Water Campaign', excerpt: 'The "Clear Water Initiative" used custom branded links in their social media campaign to track which platform drove the most donations. The analytics dashboard provided crucial insights for their marketing strategy...', image: 'https://placehold.co/600x400/38bdf8/1e3a8a?text=Clear+Water+Initiative' },
];
