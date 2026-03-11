exports.seed = function (knex, Promise) {
    var moment = require('moment');

    return knex('terms').del()
        .then(function () {
            return knex('terms').insert([{
                description: `<p><strong>Effective Date:</strong> January 5th 2025</p>

<p>This User Agreement ("Agreement") is a legally binding contract between you ("Use" or "you") and Uphony LLC ("Uphony," "we," "us," or "our") that governs your use of the Uphony platform, including any applications, websites, or services provided by Uphony (collectively, the "Platform"). By registering for, accessing, or using the Platform, you acknowledge that you have read, understood, and agree to be bound by this Agreement. If you do not agree to these terms, you may not access or use the Platform.</p>

<h3>Ownership and Authorization of Uploaded Content</h3>

<p><strong>(a) User Representations:</strong> By uploading, posting, or otherwise submitting audio, video, or other content (collectively, "Content") to the Platform, you represent and warrant that:</p>
<ul>
  <li>You are the sole and exclusive owner of the Content or have obtained all necessary rights, licenses, consents, and permissions to upload, display, distribute, and sell the Content on the Platform.</li>
  <li>To the best of your knowledge, the Content does not infringe, violate, or misappropriate any intellectual property rights, privacy rights, publicity rights, or other legal rights of any third party.</li>
</ul>

<p><strong>(b) Indemnification:</strong> You agree to indemnify and hold harmless Uphony, its affiliates, and their respective officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or related to:</p>
<ul>
  <li>Your breach of the representations and warranties set forth in this Agreement.</li>
  <li>Any claim that your Content infringes or violates the rights of a third party.</li>
</ul>

<h3>Prohibited Content and Behavior</h3>

<p><strong>(a) No Tolerance for Objectionable Content:</strong> Uphony has a zero-tolerance policy for Content or behavior that is objectionable, harmful, or abusive. You may not upload, post, or otherwise submit Content that:</p>
<ul>
  <li>Contains viruses, malware, or harmful components that could disrupt, damage, or impair the Platform or its users.</li>
  <li>Promotes or incites violence, hate speech, discrimination, harassment, or any illegal activity.</li>
  <li>Is defamatory, obscene, sexually explicit, or otherwise objectionable, as determined by Uphony in its sole discretion.</li>
</ul>

<p><strong>(b) Filtering and Reporting Mechanisms:</strong> To ensure the Platform remains safe and respectful, Uphony has implemented:</p>
<ul>
  <li><strong>Content Filtering Mechanisms:</strong> The Platform uses automated and manual review processes to identify and remove objectionable Content before or shortly after it is made public.</li>
  <li><strong>Flagging System:</strong> Users can report objectionable Content directly through the Platform.</li>
  <li><strong>Blocking System:</strong> Users can block abusive or harmful accounts to prevent further interaction.</li>
</ul>

<p><strong>(c) Developer Action on Objectionable Content Reports:</strong> Uphony will investigate all reports of objectionable Content within 24 hours. If the reported Content is determined to violate this Agreement, Uphony will:</p>
<ul>
  <li>Immediately remove the Content.</li>
  <li>Suspend or terminate the account of the offending user.</li>
</ul>

<h3>Copyright and Intellectual Property Compliance</h3>

<p><strong>(a) Pirated or Stolen Content:</strong> Uphony strictly prohibits the upload of pirated, stolen, or otherwise unauthorized Content. By using the Platform, you acknowledge and agree that Uphony may take any of the following actions to ensure compliance with copyright and intellectual property laws:</p>
<ul>
  <li>Remove or disable access to any Content suspected of infringing third-party rights.</li>
  <li>Suspend or terminate accounts of repeat infringers.</li>
  <li>Cooperate with copyright holders, legal authorities, or third-party investigators in addressing alleged violations.</li>
</ul>

<p><strong>(b) DMCA Compliance:</strong> Uphony complies with the Digital Millennium Copyright Act (DMCA). If you believe that your copyrighted work has been infringed upon, you may submit a DMCA takedown notice to Uphony. Similarly, if your Content is removed due to a DMCA claim, you may file a counter-notice to dispute the claim. For further details, refer to Uphony’s DMCA Policy, accessible via [link or contact method].</p>

<h3>Platform Use and Account Responsibility</h3>

<p><strong>(a) Eligibility:</strong> By using the Platform, you represent that you are at least 18 years old or have obtained the consent of a parent or legal guardian to enter into this Agreement.</p>

<p><strong>(b) Account Security:</strong> You are solely responsible for maintaining the confidentiality of your account credentials and for all activities conducted through your account. You agree to notify Uphony immediately of any unauthorized access to your account.</p>

<h3>Termination and Suspension</h3>

<p>Uphony reserves the right to suspend or terminate your access to the Platform, with or without notice, if you:</p>
<ul>
  <li>Violate any provision of this Agreement.</li>
  <li>Engage in conduct that Uphony determines to be harmful to its interests, the Platform, or other users.</li>
</ul>

<h3>Limitation of Liability</h3>

<p>To the fullest extent permitted by applicable law:</p>
<ul>
  <li>Uphony shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Platform.</li>
  <li>Uphony’s total liability to you for any claim arising out of or related to this Agreement or the Platform shall not exceed the amount paid by you to Uphony, if any, in the 12 months preceding the claim.</li>
</ul>

<h3>Governing Law and Dispute Resolution</h3>

<p>This Agreement shall be governed by and construed in accordance with the laws of the State of [Insert State], without regard to its conflict of laws principles. Any disputes arising under this Agreement shall be resolved exclusively in the state or federal courts located in [Insert County and State], and you consent to the personal jurisdiction of such courts.</p>

<h3>Modification of Agreement</h3>

<p>Uphony reserves the right to modify this Agreement at any time. Changes will be effective immediately upon posting the updated Agreement on the Platform. Your continued use of the Platform after such changes constitutes your acceptance of the revised Agreement.</p>

<h3>Acknowledgment and Acceptance</h3>

<p>By checking the box provided below, you acknowledge that you have read, understood, and agree to be bound by this Agreement.</p>

<p>For any questions regarding this Agreement, please contact Uphony LLC at <strong>uphonyinquiries@gmail.com</strong>.</p>

`,
                createdAt: moment().utc().format('YY-MM-DD HH:mm:ss'),
                updatedAt: moment().utc().format('YY-MM-DD HH:mm:ss'),
            }
            ]);
        });
};