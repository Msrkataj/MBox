import React from 'react';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

const Terms = () => {
    return (
        <div className="container">
            <Link href="/settings">
                <button className="settings__header-button">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
            </Link>
            <h1 className="title">PRIVACY POLICY</h1>
            <div className="content">
                <section>
                    <h2>1. General information.</h2>
                    <p>The Privacy Policy covers the services offered on the Mobile Application called “Driving Test
                        Dates”. The
                        Privacy Policy does not cover the services offered on the Mobile Application that are provided
                        by third
                        parties. These companies have their own privacy and cookie policies, so please remember that the
                        information you provide to them will be subject to their policies, not ours.</p> <br/>
                </section>
                <section>
                    <h2>2. What types of personal data do we collect in the Mobile Application?</h2>
                    <p>We may ask you to provide your name, contact details, date of birth or other details, depending
                        on the
                        services you use.</p> <br/>
                    <p>We automatically collect certain technical information from the devices you use. This information
                        may
                        include IP (Internet Protocol) address, device identifier, application identifier.</p> <br/>
                    <p>We collect information about your location when you use our services. This helps us determine if
                        you are
                        in a location where the services are available and helps us offer additional features when you
                        use our
                        services. The type of location data (for example, country, region or city) collected depends on
                        the service
                        you use, the device you use (for example, Apple or Android), and your device settings (whether
                        permissions are turned on or off). You can change which permissions you have turned on or off at
                        any
                        time in your device settings.</p><br/>
                </section>
                <section>
                    <h2>3. How do we use the information collected?</h2>
                    <p>We will only use your personal data when the law allows us to do so. Most commonly, we will use
                        your
                        personal data in the following circumstances:<br/>
                        - to perform our contract with you;<br/>
                        - to process your enquiries and respond to your requests;<br/>
                        - to provide you with offers related to the Services and additional marketing materials where
                        you have
                        consented to receive marketing from us;<br/>
                        - where we need to comply with a legal obligation;<br/>
                        - where it is necessary for our legitimate interests (or those of a third party);<br/>
                        - where we need to protect your interests (or the interests of someone else);<br/>
                        - where it is needed in the public interest or for official purposes.</p> <br/>
                    <p>In some cases, we may use your personal data to pursue our own legitimate interests or those of a
                        third
                        party, provided that your interests and fundamental rights do not override those interests. The
                        situations
                        in which we will process your personal data based on legitimate interests are set out
                        below:<br/>
                        - to optimise and improve the performance and content of the Services;<br/>
                        - to provide you with information about the Services, which may include marketing and
                        promotional
                        activities in relation to the Services; - to provide you, or allow selected third parties to
                        provide you, with
                        information about goods or services that we think may interest you;<br/>
                        - to notify you about changes to the Services;<br/>
                        - to ensure that content is presented in the most effective manner for you and your device;<br/>
                        - to prevent fraud or harm to us or any third party and to ensure the security of the Services
                        and our
                        network;<br/>
                        - where necessary to enforce our legal rights, for example enforcing claims we may have against
                        you<br/>
                        relating to your use of the Services.</p> <br/>
                </section>
                <section>
                    <h2>4. How long do we store personal data?</h2>
                    <p>We will only retain your personal information for as long as necessary to fulfill the purposes
                        for which we
                        collected it. Most often, we will delete your information when you stop using our services,
                        e.g., uninstall
                        the mobile application and delete your account.</p> <br/>
                    <p>In some circumstances, we may anonymize your personal information so that it can no longer be
                        associated with you, in which case we may use such information without further notice to
                        you.</p> <br/>
                </section>
                <section>
                    <h2>5. Where do we store personal data?</h2>
                    <p>We may store your personal data on our own servers as well as those operated by third party data
                        hosting
                        providers.</p> <br/>
                </section>
                <section>
                    <h2>6. Who do we share your personal data with?</h2>
                    <p>Automated decision-making or profiling occurs when an electronic system uses personal data to
                        decide
                        without human intervention. We may use automated decision-making in the following
                        circumstances:</p> <br/>
                    <p>- Where it is necessary to perform a contract with you and appropriate measures are in place to
                        protect
                        your rights.<br/>
                        - In limited circumstances, with your express written consent and where appropriate, measures
                        are in
                        place to protect your rights.</p> <br/>
                    <p>We use the information we hold about you to tailor the content of the communications that are
                        sent to you,
                        to make sure that offers are as relevant to you as possible and that you have exclusive access
                        to the best
                        offers.</p> <br/>
                    <p>You will not be subject to decisions that will significantly affect you solely based on automated
                        decision-
                        making unless we have a legal basis for doing so and have notified you of this.</p> <br/>
                </section>
                <section>
                    <h2>What are your rights?</h2>
                    <p>Remember, you have control over your personal data.</p> <br/>
                    <p>You have the right to:<br/>
                        - receive a copy of the information we have collected about you,<br/>
                        - block automated important decisions about you,<br/>
                        - ask us to correct inaccurate information, delete it or ask us to only use it for specific
                        purposes,<br/>
                        - change your mind and ask us to stop using your information. For example, unsubscribe from any
                        marketing emails or turn off personalisation</p> <br/>
                </section>
                <section>
                    <h2>How will I find out about changes to the Privacy Policy?</h2>
                    <p>We occasionally update this policy. If we make important changes, such as how we use your personal
                        information, we will notify you. This will be a notification. in your app.</p> <br/>
                    <p>If you do not agree to the changes, you can always stop using our services, delete your account, and stop
                        providing us with more personal information.</p> <br/>
                </section>
                <section>
                    <h2>How can you contact us?</h2>
                    <p>For any other questions or comments about this policy, please email us at ... .</p> <br/>
                    <p>We are regulated by the Information Commissioner’s Office. You can also contact them for advice and
                        support.</p> <br/>
                </section>
            </div>
        </div>
    );
};

export default Terms;
