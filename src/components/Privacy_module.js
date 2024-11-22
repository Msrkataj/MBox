import React from 'react';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

const PrivacyPolicy = () => {
    return (
        <div className="container">
            <Link href="/settings">
                <button className="settings__header-button">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
            </Link>
            <h1 className="title">Terms of Use</h1>
            <div className="content">
                <section>
                    <h2>1. Definitions:</h2>
                    <p><strong>Service Provider</strong> – dane firmy.</p>
                    <p><strong>User</strong> – any person using the Mobile Application.</p>
                    <p><strong>Mobile Application</strong> – the mobile application called "Driving Test Dates".</p>
                    <p><strong>Services</strong> – services available to the User in the Mobile Application.</p>
                    <p><strong>Terms of Use</strong> – these Terms of Use of the mobile application called "Driving Test Dates".</p>
                </section>
                <section>
                    <h2>2. General provisions:</h2>
                    <p>The Terms of Use specify the rights, obligations and restrictions regarding the use of the Mobile
                        Application. By accessing the Mobile App and/or using all or some of the Services, you agree to
                        these
                        Terms of Use and that you agree to be bound by them.</p> <br/>
                    <p>The mobile application is intended for personal, non-commercial use, for informational purposes
                        only. The
                        User may not use the Mobile Application or any of other intellectual property for commercial or
                        business
                        purposes, including marketing, advertising, offers to sell or promote products or services
                        Terms of Use and that you agree to be bound by them.</p> <br/>
                    <p>The Service Provider may change the Terms of Use at any time by posting changes online. It is the
                        User's
                        responsibility to review the information published online regularly to become aware of such
                        changes in a
                        timely manner. If the User continues to use the Mobile Application after changes are posted
                        online, it
                        means that the User accepts the Terms of Use as amended.</p><br/>
                </section>
                <section>
                    <h2>3. Access to the Mobile Application:</h2>
                    <p>The Mobile Application can be accessed free of charge by any User from anywhere with Internet
                        access.
                        Any costs incurred by the User to access the service (telephone, software, Internet connection,
                        etc.) are
                        the responsibility of the User.</p> <br/>
                    <p>In order to access the Mobile Application, the User must have a mobile device with Internet
                        access
                        equipped with the iOS system in the minimum version ... or Android in the minimum version ...
                        .</p> <br/>
                    <p>If the User accesses the Mobile Application via a mobile network, their operator or roaming
                        service provider
                        determines the rates and fees for messages, data transfer and other services. Downloading,
                        installing and
                        using some products or services may be limited or prohibited by the network operator. Some
                        services may
                        also not work on a given device or with a given network operator.</p><br/>
                    <p>By using the Mobile Application, the User may allow specific access to their device and/or account. On
                        most mobile device platforms, the User will find additional information regarding such permissions and
                        how - if possible - they can change their settings. By downloading, installing or using the Mobile
                        Application, the User agrees to receive automatic software updates (where applicable).</p> <br/>
                    <p>The Service Provider reserves the right to terminate, without notice or compensation, the User's access in
                        the event of use that violates or poses a risk of violating these Terms of Use, laws and regulations, morality
                        or public order.</p> <br/>
                    <p>The Service Provider reserves the right to terminate, without notice or compensation, the User's access in
                        the event of use that violates or poses a risk of violating these Terms of Use, laws and regulations, morality
                        or public order.</p><br/>
                </section>
                {/* Continue sections for each clause */}
                <section>
                    <h2>4. User Obligations:</h2>
                    <p>When using the Mobile Application, each User undertakes not to disturb public order and to comply with
                        applicable laws, respect the rights of third parties and the provisions of these Terms of Use.</p> <br/>
                    <p>Each User is obliged to:<br/>
                        - use the Mobile Application in accordance with its intended purpose,<br/>
                        - not change the purpose of the Mobile Application towards committing crimes, offences or
                        offences
                        punishable under criminal or other law,<br/>
                        - not seek to weaken the automated data processing systems implemented in the Mobile
                        Application.</p> <br/>
                    <p>The User is not allowed to:<br/>
                        - attempt to obtain unauthorized access to the IT system of the Mobile Application,<br/>
                        - use the Mobile Application by deliberately introducing malicious software,<br/>
                        - violate the intellectual property rights of the Service Provider.</p><br/>
                </section>
                <section>
                    <h2>5. Limitation of responsibility:</h2>
                    <p>The Service Provider makes every effort to ensure that the Mobile Application is available 24/7, regardless
                        of the maintenance work carried out on it. In this respect, the Service Provider has the right to suspend
                        access to all or part of the Mobile Application to carry out maintenance work and/or make improvements.</p> <br/>
                    <p>The Mobile Application and all services are provided on an "AS IS" and "AS AVAILABLE" basis without
                        any representations or warranties and without any kind of warranty, express or implied, including, but not
                        limited to, implied warranties of satisfactory quality, fitness for a particular purpose, non-infringement,
                        compatibility, security and accuracy.</p> <br/>
                    <p>The User agrees to use the Mobile Application at his/her own risk. The User bears full and exclusive
                        responsibility for using the services provided and for complying with the Terms of Use.</p><br/>
                    <p>To the fullest extent permitted by law, the Service Provider and/or third parties will not be liable for any
                        damages, including, but not limited to, indirect or consequential damages or any other damages resulting
                        from the use of or inability to use the services, loss of data or profits, whether in an action of contract,
                        negligence or other tort, arising from the use of the Mobile Application or services related to it. The Service
                        Provider does not warrant that the functions of the Mobile Application will be uninterrupted or error-free,
                        that errors will be corrected, or that the Mobile Application or the server on which it is available will be free
                        of viruses or worms, or that they reflect the full functionality, accuracy and reliability of the services.</p> <br/>
                </section>
                <section>
                    <h2>6. Intellectual Property:</h2>
                    <p>Trademarks, logos, as well as all content of the Mobile Application and software that can be used to
                        operate the Mobile Application are protected by copyright.</p> <br/>
                    <p>Reproduction and/or use of the Mobile Application, in whole or in part, of any kind and in any manner, is
                        strictly prohibited.</p> <br/>
                    <p>In particular, the User is expressly prohibited from extracting, by means of permanent or temporary
                        transfer, all or a qualitatively or quantitatively significant part of the contents of the database to another
                        medium, in any manner and in any form, as well as reusing, by making all or a qualitatively or quantitatively
                        significant part of the contents of the database publicly available, in any form.</p><br/>
                </section>
                <section>
                    <h2>7. License Terms:</h2>
                    <p>The Mobile Application (except for logos, names, trademarks) is provided on the basis of a non-
                        transferable, non-exclusive, non-commercial personal license. The license to install and use the Mobile

                        Application is valid from the moment of downloading the Mobile Application until the license is canceled.
                        The User may cancel the license at any time if he stops using the Mobile Application. If the User violates
                        the rules of using the Mobile Application, the Service Provider has the right to cancel the license due to
                        the User's fault. The license will be canceled after one month from the moment the User receives

                        notification of its cancellation due to his fault. In the event of cancellation of the granted license, the User
                        must permanently uninstall the Mobile Application.</p> <br/>
                </section>
                <section>
                    <h2>8. Additional provisions:</h2>
                    <p>If any provision of the Terms of Use is found to be illegal, invalid or otherwise unenforceable under any
                        law, then to the extent and in any jurisdiction where such provision is illegal, invalid or unenforceable, it
                        shall be severed and deleted from the Terms of Use and the remaining provisions shall remain in full force
                        and effect and shall continue to be binding and enforceable.</p> <br/>
                    <p>The Terms of Use shall be governed by and construed in accordance with British law. However, the choice
                        of law shall not affect any rights that the User may have as a consumer under the applicable laws of the
                        country in which they reside.</p> <br/>
                    <p>Disputes arising from these Terms of Use shall be subject to the exclusive jurisdiction of the courts having
                        jurisdiction for the registered office of the Service Provider, unless otherwise provided for by mandatory
                        provisions of applicable law.</p><br/>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
