exports.seed = function (knex, Promise) {
    var moment = require('moment');

    return knex('policy').del()
        .then(function () {
            return knex('policy').insert([{
                description: `<p>Uphony LLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our open music marketplace platform. Please read this policy carefully to understand our practices regarding your information.</p>

<hr />
<h2><strong>1. Information We Collect</strong></h2>

<p>We collect the following types of information when you use our platform:</p>

<h3><strong>1.1 Personal Information</strong></h3>

<ul>
	<li><strong>Account Information</strong>: When you register, we collect your name, email address, username, and password.</li>
	<li><strong>Transaction Information</strong>: If you make purchases or sales on the platform, we collect billing information, payment method details, and transaction history.</li>
</ul>

<h3><strong>1.2 Non-Personal Information</strong></h3>

<ul>
	<li><strong>Usage Data</strong>: Includes your interactions with the platform, such as search queries, browsing history, and purchase patterns.</li>
	<li><strong>Device Information</strong>: Includes device type, operating system, browser type, and IP address.</li>
	<li><strong>Cookies and Similar Technologies</strong>: Used to enhance your experience and track activity on the platform.</li>
</ul>

<hr />
<h2><strong>2. How We Use Your Information</strong></h2>

<p>We use your information for the following purposes:</p>

<ul>
	<li>To create and manage your account.</li>
	<li>To facilitate transactions between users.</li>
	<li>To provide customer support.</li>
	<li>To send notifications about platform updates, transactions, or promotional content (with your consent).</li>
	<li>To analyze trends and improve platform functionality.</li>
	<li>To ensure compliance with legal obligations and enforce our terms of service.</li>
</ul>

<hr />
<h2><strong>3. How We Share Your Information</strong></h2>

<p>We do not sell your information. However, we may share it in the following circumstances:</p>

<ul>
	<li><strong>With Other Users</strong>: Public profiles, uploaded music, pricing, and transaction data are visible to other users as part of the marketplace experience.</li>
	<li><strong>With Third-Party Service Providers</strong>: For payment processing, hosting services, analytics, and other necessary operations.</li>
	<li><strong>Legal Requirements</strong>: To comply with applicable laws, regulations, or legal proceedings.</li>
	<li><strong>Business Transfers</strong>: In the event of a merger, sale, or acquisition, your information may be transferred.</li>
</ul>

<hr />
<h2><strong>4. Your Rights and Choices</strong></h2>

<h3><strong>4.1 Managing Your Information</strong></h3>

<ul>
	<li>You can access and update your personal information in your account settings.</li>
	<li>You can delete your account by contacting us at&nbsp;<strong>uphonyinquiries@gmail.com</strong>.</li>
</ul>

<h3><strong>4.2 Opt-Out Options</strong></h3>

<ul>
	<li>You may opt-out of receiving promotional emails by clicking the &quot;unsubscribe&quot; link in our emails.</li>
	<li>You can manage cookies and similar technologies through your browser settings.</li>
</ul>

<hr />
<h2><strong>5. Data Security</strong></h2>

<p>We implement industry-standard measures to protect your information. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>

<hr />
<h2><strong>6. Data Retention</strong></h2>

<p>We retain your information for as long as your account is active or as needed to fulfill our obligations. When your information is no longer necessary, we will securely delete or anonymize it.</p>

<hr />
<h2><strong>7. Third-Party Links</strong></h2>

<p>Our platform may include links to third-party websites or services. This Privacy Policy does not apply to those third parties, and we encourage you to review their privacy practices.</p>

<hr />
<h2><strong>8. Children&rsquo;s Privacy</strong></h2>

<p>Our platform is not intended for individuals under the age of 13, and we do not knowingly collect information from children.</p>

<hr />
<h2><strong>9. Changes to This Privacy Policy</strong></h2>

<p>We may update this Privacy Policy periodically. Changes will be posted with the &quot;Effective Date&quot; at the top. We encourage you to review this policy regularly.</p>

<hr />
<h2><strong>10. Contact Us</strong></h2>

<p>If you have questions or concerns about this Privacy Policy, please contact us at:<br />
<strong>Uphony LLC</strong><br />
<strong>Email</strong>:&nbsp;uphonyinquiries@gmail.com</p>
`,
                createdAt: moment().utc().format('YY-MM-DD HH:mm:ss'),
                updatedAt: moment().utc().format('YY-MM-DD HH:mm:ss'),
            }]);
        });
};