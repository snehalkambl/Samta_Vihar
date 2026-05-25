import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type AppLanguage = 'mr' | 'en';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private platformId = inject(PLATFORM_ID);
    private isBrowser = isPlatformBrowser(this.platformId);

    currentLang = signal<AppLanguage>('mr');

    constructor() {
        if (this.isBrowser) {
            const savedLang = localStorage.getItem('appLanguage') as AppLanguage;

            if (savedLang === 'mr' || savedLang === 'en') {
                this.currentLang.set(savedLang);
            }
        }
    }

    private translations: Record<string, Record<AppLanguage, string>> = {

        /* ===== HEADER ===== */
        brandName: {
            mr: 'समता बुद्धविहार',
            en: 'Samata Buddhavihar'
        },

        home: {
            mr: 'मुख्यपृष्ठ',
            en: 'Home'
        },

        about: {
            mr: 'आमच्याविषयी',
            en: 'About Us'
        },

        events: {
            mr: 'कार्यक्रम',
            en: 'Events'
        },

        membership: {
            mr: 'सदस्य',
            en: 'Membership'
        },

        contact: {
            mr: 'संपर्क',
            en: 'Contact'
        },

        admin: {
            mr: 'Admin',
            en: 'Admin'
        },

        login: {
            mr: 'Login',
            en: 'Login'
        },

        logout: {
            mr: 'Logout',
            en: 'Logout'
        },

        developedBy: {
            mr: 'Developed By',
            en: 'Developed By'
        },

        languageBtn: {
            mr: 'English',
            en: 'मराठी'
        },

        /* ===== HOME PAGE ===== */

        'home.heroTitle1': {
            mr: 'समता बुद्धविहार,',
            en: 'Samata Buddhavihar,'
        },

        'home.heroTitle2': {
            mr: 'ममतानगर येथे स्वागत',
            en: 'Welcome to Mamatanagar'
        },

        'home.heroSubtitle': {
            mr: 'धम्म, प्रज्ञा, करुणा आणि समाजसेवेच्या भावनेतून एकत्र येणारे आपले पवित्र स्थळ.',
            en: 'A sacred place that brings people together through Dhamma, wisdom, compassion and social service.'
        },

        'home.viewEvents': {
            mr: 'कार्यक्रम पहा',
            en: 'View Events'
        },

        'home.aboutUs': {
            mr: 'आमच्याविषयी',
            en: 'About Us'
        },

        'home.donate': {
            mr: 'धम्म दान करा',
            en: 'Donate'
        },

        'home.badge': {
            mr: 'समता • धम्म • बंधुता',
            en: 'Equality • Dhamma • Fraternity'
        },

        'home.aboutTitle': {
            mr: 'समता बुद्धविहार बद्दल',
            en: 'About Samata Buddhavihar'
        },

        'home.aboutPara1': {
            mr: 'समता बुद्धविहार हे समाजातील बंधुता, समता आणि मानवतेचा संदेश पोहोचविणारे प्रेरणास्थान आहे.',
            en: 'Samata Buddhavihar is an inspiring place that spreads the message of fraternity, equality and humanity.'
        },

        'home.aboutPara2': {
            mr: 'येथे धार्मिक, सामाजिक आणि सांस्कृतिक कार्यक्रमांचे आयोजन केले जाते. धम्माच्या विचारांद्वारे समाजात जागृती निर्माण करणे हे आमचे ध्येय आहे.',
            en: 'Religious, social and cultural programs are organized here. Our aim is to create awareness through the thoughts of Dhamma.'
        },

        'home.feature1Title': {
            mr: 'धम्म कार्यक्रम',
            en: 'Dhamma Programs'
        },

        'home.feature1Text': {
            mr: 'बुद्ध जयंती, धम्म प्रवचने आणि सामूहिक कार्यक्रम.',
            en: 'Buddha Jayanti, Dhamma discourses and community programs.'
        },

        'home.feature2Title': {
            mr: 'सामाजिक उपक्रम',
            en: 'Social Initiatives'
        },

        'home.feature2Text': {
            mr: 'समाज एकोपा, शैक्षणिक मदत आणि जनजागृती उपक्रम.',
            en: 'Community unity, educational support and awareness initiatives.'
        },

        'home.feature3Title': {
            mr: 'सदस्य नोंदणी',
            en: 'Membership Registration'
        },

        'home.feature3Text': {
            mr: 'विहाराशी जोडले जाऊन विविध उपक्रमांत सहभागी व्हा.',
            en: 'Join the Vihar and participate in various activities.'
        },
        /* ===== ABOUT PAGE ===== */

        'about.bannerTag': {
            mr: 'विहार परिचय',
            en: 'Vihar Introduction'
        },

        'about.title': {
            mr: 'आमच्याविषयी',
            en: 'About Us'
        },

        'about.subtitle': {
            mr: 'समता, बंधुता, धम्म आणि समाजसेवेच्या मूल्यांवर उभे असलेले प्रेरणास्थान.',
            en: 'An inspiring place built on the values of equality, fraternity, Dhamma and social service.'
        },

        'about.mainTitle': {
            mr: 'समता बुद्धविहार, ममतानगर',
            en: 'Samata Buddhavihar, Mamatanagar'
        },

        'about.para1': {
            mr: 'समता बुद्धविहार हे धम्म, समता, बंधुता आणि समाजजागृतीच्या मूल्यांवर आधारित एक पवित्र आणि सामाजिक केंद्र आहे. हे केवळ धार्मिक स्थळ नसून समाजाला एकत्र आणणारे, प्रेरणा देणारे आणि सजग विचारांचा प्रसार करणारे स्थान आहे.',
            en: 'Samata Buddhavihar is a sacred and social center based on the values of Dhamma, equality, fraternity and social awareness. It is not only a religious place, but also a place that brings society together, inspires people and spreads thoughtful awareness.'
        },

        'about.para2': {
            mr: 'येथे विविध धार्मिक, सामाजिक, सांस्कृतिक आणि शैक्षणिक उपक्रम आयोजित केले जातात. बुद्ध जयंती, धम्मचक्र प्रवर्तन दिन, प्रवचने, समाजोपयोगी कार्यक्रम, युवकांसाठी प्रेरणादायी उपक्रम आणि समाज एकोपा वाढविणारे अनेक उपक्रम नियमितपणे घेतले जातात.',
            en: 'Various religious, social, cultural and educational activities are organized here. Buddha Jayanti, Dhammachakra Pravartan Day, discourses, social welfare programs, youth inspiration activities and initiatives that strengthen social unity are conducted regularly.'
        },

        'about.para3': {
            mr: 'आमचे ध्येय म्हणजे समाजात करुणा, प्रज्ञा आणि समतेचे विचार रुजवणे, तसेच भावी पिढ्यांना संघटित, सजग आणि सकारात्मक दिशेने प्रेरित करणे.',
            en: 'Our mission is to cultivate the values of compassion, wisdom and equality in society, and to inspire future generations toward unity, awareness and positive growth.'
        },

        'about.valuesTitle': {
            mr: 'आमची मूल्ये',
            en: 'Our Values'
        },

        'about.value1Title': {
            mr: 'समता',
            en: 'Equality'
        },

        'about.value1Text': {
            mr: 'सर्वांसाठी समान आदर आणि समान संधी.',
            en: 'Equal respect and equal opportunities for everyone.'
        },

        'about.value2Title': {
            mr: 'बंधुता',
            en: 'Fraternity'
        },

        'about.value2Text': {
            mr: 'समाजात एकोपा, सहकार्य आणि परस्पर विश्वास.',
            en: 'Unity, cooperation and mutual trust in society.'
        },

        'about.value3Title': {
            mr: 'धम्म',
            en: 'Dhamma'
        },

        'about.value3Text': {
            mr: 'प्रज्ञा, करुणा आणि सत्याचा मार्ग.',
            en: 'The path of wisdom, compassion and truth.'
        },
        /* ===== EVENTS PAGE ===== */

        'events.bannerTag': {
            mr: 'विहार कार्यक्रम',
            en: 'Vihar Events'
        },

        'events.title': {
            mr: 'महत्त्वाचे कार्यक्रम',
            en: 'Important Events'
        },

        'events.subtitle': {
            mr: 'धम्म, समाजसेवा आणि सांस्कृतिक उपक्रमांची माहिती येथे पहा.',
            en: 'View information about Dhamma, social service and cultural activities here.'
        },

        'events.listTitle': {
            mr: 'कार्यक्रम यादी',
            en: 'Event List'
        },

        'events.listSubtitle': {
            mr: 'उपलब्ध कार्यक्रमांची संपूर्ण माहिती',
            en: 'Complete information about available events'
        },

        'events.createEvent': {
            mr: 'कार्यक्रम तयार करा',
            en: 'Create Event'
        },

        'events.loading': {
            mr: 'कार्यक्रम लोड होत आहेत...',
            en: 'Loading events...'
        },

        'events.emptyTitle': {
            mr: 'सध्या कोणतेही कार्यक्रम उपलब्ध नाहीत.',
            en: 'No events are currently available.'
        },

        'events.emptyText': {
            mr: 'नवीन कार्यक्रम उपलब्ध झाल्यावर येथे दिसतील.',
            en: 'New events will appear here once available.'
        },

        'events.paid': {
            mr: 'सशुल्क',
            en: 'Paid'
        },

        'events.free': {
            mr: 'विनामूल्य',
            en: 'Free'
        },

        'events.date': {
            mr: 'तारीख',
            en: 'Date'
        },

        'events.time': {
            mr: 'वेळ',
            en: 'Time'
        },

        'events.location': {
            mr: 'स्थळ',
            en: 'Location'
        },

        'events.fee': {
            mr: 'शुल्क',
            en: 'Fee'
        },

        'events.entry': {
            mr: 'प्रवेश',
            en: 'Entry'
        },

        'events.contribute': {
            mr: 'योगदान द्या',
            en: 'Contribute'
        },

        'events.moreInfo': {
            mr: 'अधिक माहिती',
            en: 'More Info'
        },

        'events.previous': {
            mr: 'मागील',
            en: 'Previous'
        },

        'events.next': {
            mr: 'पुढील',
            en: 'Next'
        },
        /* ===== CONTACT PAGE ===== */

        'contact.bannerTag': {
            mr: 'संपर्क',
            en: 'Contact'
        },

        'contact.title': {
            mr: 'संपर्क',
            en: 'Contact'
        },

        'contact.subtitle': {
            mr: 'समता बुद्धविहार, ममतानगर यांच्याशी संपर्क साधण्यासाठी खालील माहिती वापरा.',
            en: 'Use the information below to contact Samata Buddhavihar, Mamatanagar.'
        },

        'contact.infoTitle': {
            mr: 'संपर्क माहिती',
            en: 'Contact Information'
        },

        'contact.addressLabel': {
            mr: 'पत्ता',
            en: 'Address'
        },

        'contact.address': {
            mr: 'समता बुद्धविहार, ममतानगर, पुणे',
            en: 'Samata Buddhavihar, Mamatanagar, Pune'
        },

        'contact.mobileLabel': {
            mr: 'मोबाईल',
            en: 'Mobile'
        },

        'contact.emailLabel': {
            mr: 'ई-मेल',
            en: 'Email'
        },

        'contact.adminWhatsappTitle': {
            mr: 'Admin WhatsApp संपर्क',
            en: 'Admin WhatsApp Contact'
        },

        'contact.adminWhatsappText': {
            mr: 'नवीन सदस्य असल्यास प्रथम Admin ला WhatsApp वर संदेश पाठवा. Admin verification नंतर group invite link देईल.',
            en: 'If you are a new member, first send a WhatsApp message to the admin. After verification, the admin will share the group invite link.'
        },

        'contact.adminWhatsappBtn': {
            mr: 'Admin ला WhatsApp करा',
            en: 'WhatsApp Admin'
        },

        'contact.groupTitle': {
            mr: 'WhatsApp Group Join',
            en: 'Join WhatsApp Group'
        },

        'contact.groupText': {
            mr: 'आपण आधीच परिचित/verified member असाल तर खालील बटण वापरून WhatsApp group join करा.',
            en: 'If you are already known or a verified member, use the button below to join the WhatsApp group.'
        },

        'contact.groupBtn': {
            mr: 'WhatsApp Group Join करा',
            en: 'Join WhatsApp Group'
        },

        'contact.groupNote': {
            mr: 'टीप: group मध्ये join करण्यापूर्वी Admin approval आवश्यक असू शकते.',
            en: 'Note: Admin approval may be required before joining the group.'
        },
        /* ===== MEMBERSHIP PAGE ===== */

        'membership.bannerTag': {
            mr: 'सदस्य नोंदणी',
            en: 'Membership Registration'
        },

        'membership.title': {
            mr: 'सदस्य नोंदणी',
            en: 'Membership Registration'
        },

        'membership.subtitle': {
            mr: 'विहाराशी जोडले जाऊन विविध उपक्रमांत सहभागी व्हा.',
            en: 'Join the Vihar and participate in various activities.'
        },

        'membership.fullName': {
            mr: 'पूर्ण नाव',
            en: 'Full Name'
        },

        'membership.mobile': {
            mr: 'मोबाईल क्रमांक',
            en: 'Mobile Number'
        },

        'membership.address': {
            mr: 'पत्ता',
            en: 'Address'
        },

        'membership.paymentStatus': {
            mr: 'पेमेंट स्थिती',
            en: 'Payment Status'
        },

        'membership.paymentMode': {
            mr: 'पेमेंट मोड',
            en: 'Payment Mode'
        },

        'membership.paid': {
            mr: 'Paid',
            en: 'Paid'
        },

        'membership.unpaid': {
            mr: 'Unpaid',
            en: 'Unpaid'
        },

        'membership.cash': {
            mr: 'Cash',
            en: 'Cash'
        },

        'membership.online': {
            mr: 'Online',
            en: 'Online'
        },

        'membership.registering': {
            mr: 'नोंदणी होत आहे...',
            en: 'Registering...'
        },

        'membership.register': {
            mr: 'नोंदणी करा',
            en: 'Register'
        },

        'membership.benefitsTitle': {
            mr: 'सदस्यत्वाचे फायदे',
            en: 'Membership Benefits'
        },

        'membership.benefit1': {
            mr: 'विहारातील सर्व कार्यक्रमांमध्ये सहभाग',
            en: 'Participation in all Vihar programs'
        },

        'membership.benefit2': {
            mr: 'सामाजिक आणि सांस्कृतिक उपक्रमांत भाग',
            en: 'Participation in social and cultural activities'
        },

        'membership.benefit3': {
            mr: 'समाजाशी जोडलेले नेटवर्क',
            en: 'A network connected with the community'
        },

        'membership.benefit4': {
            mr: 'धम्म आणि सामाजिक कार्यात योगदान',
            en: 'Contribution to Dhamma and social work'
        },

        'membership.note': {
            mr: 'टीप',
            en: 'Note'
        },

        'membership.noteText': {
            mr: 'नोंदणी केल्यानंतर admin द्वारे तुमची माहिती verify केली जाईल.',
            en: 'After registration, your information will be verified by the admin.'
        },
        /* ===== LOGIN PAGE ===== */

        'login.title': {
            mr: 'लॉगिन',
            en: 'Login'
        },

        'login.username': {
            mr: 'वापरकर्ता नाव / ई-मेल',
            en: 'Username / Email'
        },

        'login.password': {
            mr: 'पासवर्ड',
            en: 'Password'
        },

        'login.loading': {
            mr: 'लॉगिन होत आहे...',
            en: 'Logging in...'
        },

        'login.button': {
            mr: 'लॉगिन करा',
            en: 'Login'
        },

        'login.forgotPassword': {
            mr: 'पासवर्ड विसरलात?',
            en: 'Forgot Password?'
        },
        /* ===== FOOTER ===== */

        'footer.title': {
            mr: 'समता बुद्धविहार, ममतानगर',
            en: 'Samata Buddhavihar, Mamatanagar'
        },

        'footer.subtitle': {
            mr: 'धम्म, सेवा आणि समाज एकता',
            en: 'Dhamma, Service and Social Unity'
        },

        'footer.copyright': {
            mr: '© 2026 सर्व हक्क राखीव.',
            en: '© 2026 All Rights Reserved.'
        },
        /* ===== EVENT DETAILS PAGE ===== */

        'eventDetails.bannerTag': {
            mr: 'कार्यक्रम तपशील',
            en: 'Event Details'
        },

        'eventDetails.title': {
            mr: 'अधिक माहिती',
            en: 'More Information'
        },

        'eventDetails.subtitle': {
            mr: 'कार्यक्रमाची संपूर्ण माहिती, फोटो आणि संपर्क तपशील येथे पहा.',
            en: 'View complete event information, photos and contact details here.'
        },

        'eventDetails.loading': {
            mr: 'कार्यक्रमाची माहिती लोड होत आहे...',
            en: 'Loading event details...'
        },

        'eventDetails.paid': {
            mr: 'सशुल्क',
            en: 'Paid'
        },

        'eventDetails.free': {
            mr: 'विनामूल्य',
            en: 'Free'
        },

        'eventDetails.payFee': {
            mr: 'शुल्क भरा',
            en: 'Pay Fee'
        },

        'eventDetails.back': {
            mr: 'कार्यक्रम यादी',
            en: 'Event List'
        },

        'eventDetails.mainInfo': {
            mr: 'मुख्य माहिती',
            en: 'Main Information'
        },

        'eventDetails.date': {
            mr: 'तारीख',
            en: 'Date'
        },

        'eventDetails.time': {
            mr: 'वेळ',
            en: 'Time'
        },

        'eventDetails.location': {
            mr: 'स्थळ',
            en: 'Location'
        },

        'eventDetails.fee': {
            mr: 'शुल्क',
            en: 'Fee'
        },

        'eventDetails.organizerInfo': {
            mr: 'आयोजन माहिती',
            en: 'Organizer Information'
        },

        'eventDetails.organizer': {
            mr: 'आयोजक',
            en: 'Organizer'
        },

        'eventDetails.speaker': {
            mr: 'मुख्य वक्ते',
            en: 'Main Speaker'
        },

        'eventDetails.contactPerson': {
            mr: 'संपर्क व्यक्ती',
            en: 'Contact Person'
        },

        'eventDetails.contactMobile': {
            mr: 'संपर्क मोबाईल',
            en: 'Contact Mobile'
        },

        'eventDetails.description': {
            mr: 'सविस्तर वर्णन',
            en: 'Detailed Description'
        },

        'eventDetails.rules': {
            mr: 'सूचना / नियम',
            en: 'Instructions / Rules'
        },
        /* ===== PAYMENT PAGE ===== */

        'payment.bannerTag': {
            mr: 'सुरक्षित पेमेंट',
            en: 'Secure Payment'
        },

        'payment.title': {
            mr: 'पेमेंट करा',
            en: 'Make Payment'
        },

        'payment.subtitle': {
            mr: 'कार्यक्रम, सदस्य शुल्क किंवा धम्म दानासाठी आपली पेमेंट नोंद येथे करा.',
            en: 'Record your payment for events, membership fees or Dhamma donation here.'
        },

        'payment.eventContribution': {
            mr: 'कार्यक्रमासाठी योगदान',
            en: 'Contribution for Event'
        },

        'payment.membershipFee': {
            mr: 'सदस्य शुल्क',
            en: 'Membership Fee'
        },

        'payment.dhammaDonation': {
            mr: 'धम्म दान',
            en: 'Dhamma Donation'
        },

        'payment.formInstruction': {
            mr: 'कृपया खालील माहिती भरून पेमेंट नोंद पूर्ण करा.',
            en: 'Please fill in the details below to complete the payment record.'
        },

        'payment.name': {
            mr: 'नाव',
            en: 'Name'
        },

        'payment.mobile': {
            mr: 'मोबाईल नंबर',
            en: 'Mobile Number'
        },

        'payment.amount': {
            mr: 'रक्कम',
            en: 'Amount'
        },

        'payment.paymentMode': {
            mr: 'पेमेंट मोड',
            en: 'Payment Mode'
        },

        'payment.scanQr': {
            mr: 'QR स्कॅन करून पेमेंट करा',
            en: 'Scan QR to Make Payment'
        },

        'payment.qrInstruction': {
            mr: 'पेमेंट पूर्ण झाल्यावर Transaction ID भरा.',
            en: 'Enter the Transaction ID after completing the payment.'
        },

        'payment.remarks': {
            mr: 'Remarks',
            en: 'Remarks'
        },

        'payment.saving': {
            mr: 'पेमेंट जतन होत आहे...',
            en: 'Saving payment...'
        },

        'payment.submit': {
            mr: 'पेमेंट सबमिट करा',
            en: 'Submit Payment'
        },

        'payment.infoTitle': {
            mr: 'पेमेंट माहिती',
            en: 'Payment Information'
        },

        'payment.info1': {
            mr: 'रोख, GPay किंवा UPI द्वारे पेमेंट करता येईल.',
            en: 'Payment can be made through Cash, GPay or UPI.'
        },

        'payment.info2': {
            mr: 'GPay / UPI निवडल्यास QR स्कॅन करून पेमेंट करा.',
            en: 'If GPay / UPI is selected, scan the QR code to pay.'
        },

        'payment.info3': {
            mr: 'पेमेंट केल्यानंतर Transaction ID टाकणे आवश्यक आहे.',
            en: 'After payment, entering the Transaction ID is required.'
        },

        'payment.info4': {
            mr: 'नोंद जतन झाल्यावर पावती स्क्रीन दिसेल.',
            en: 'After saving the record, the receipt screen will be displayed.'
        },

        'payment.note': {
            mr: 'टीप',
            en: 'Note'
        },

        'payment.noteText': {
            mr: 'धम्म दान आणि कार्यक्रम शुल्काची नोंद admin ला लगेच दिसेल.',
            en: 'Dhamma donation and event fee records will be visible to the admin immediately.'
        },
        /* ===== FORGOT PASSWORD PAGE ===== */

        'forgot.title': {
            mr: 'पासवर्ड रीसेट',
            en: 'Reset Password'
        },

        'forgot.subtitle': {
            mr: 'Admin email वर OTP पाठवून password reset करा.',
            en: 'Reset your password by sending an OTP to the admin email.'
        },

        'forgot.username': {
            mr: 'Admin Username',
            en: 'Admin Username'
        },

        'forgot.sendOtp': {
            mr: 'OTP पाठवा',
            en: 'Send OTP'
        },

        'forgot.sendingOtp': {
            mr: 'OTP पाठवत आहे...',
            en: 'Sending OTP...'
        },

        'forgot.newPassword': {
            mr: 'नवीन पासवर्ड',
            en: 'New Password'
        },

        'forgot.confirmPassword': {
            mr: 'Confirm Password',
            en: 'Confirm Password'
        },

        'forgot.resetting': {
            mr: 'Reset होत आहे...',
            en: 'Resetting...'
        },

        'forgot.resetPassword': {
            mr: 'पासवर्ड Reset करा',
            en: 'Reset Password'
        },

        'forgot.backToLogin': {
            mr: 'Login ला परत जा',
            en: 'Back to Login'
        },
        /* ===== ADMIN DASHBOARD ===== */

        'admin.bannerTag': { mr: 'Admin Panel', en: 'Admin Panel' },
        'admin.dashboardTitle': { mr: 'Admin Dashboard', en: 'Admin Dashboard' },
        'admin.dashboardSubtitle': {
            mr: 'विहारातील सर्व नोंदी, आर्थिक सारांश आणि व्यवस्थापन येथे पाहा.',
            en: 'View all Vihar records, financial summary and management here.'
        },
        'admin.totalIncome': { mr: 'एकूण उत्पन्न', en: 'Total Income' },
        'admin.totalPaymentAmount': { mr: 'एकूण पेमेंट रक्कम', en: 'Total Payment Amount' },
        'admin.eventPayment': { mr: 'कार्यक्रम पेमेंट', en: 'Event Payments' },
        'admin.dhammaDonation': { mr: 'धम्म दान', en: 'Dhamma Donation' },
        'admin.totalExpense': { mr: 'एकूण खर्च', en: 'Total Expense' },
        'admin.balance': { mr: 'शिल्लक', en: 'Balance' },
        'admin.totalMembers': { mr: 'एकूण सदस्य', en: 'Total Members' },
        'admin.totalEvents': { mr: 'एकूण कार्यक्रम', en: 'Total Events' },
        'admin.quickActions': { mr: 'Quick Actions', en: 'Quick Actions' },
        'admin.quickCreateEvent': { mr: 'कार्यक्रम तयार करा', en: 'Create Event' },
        'admin.quickAddIncome': { mr: 'उत्पन्न जोडा', en: 'Add Income' },
        'admin.quickAddExpense': { mr: 'खर्च जोडा', en: 'Add Expense' },
        'admin.quickMemberList': { mr: 'सदस्य यादी', en: 'Member List' },
        'admin.paymentRecords': { mr: 'पेमेंट नोंदी', en: 'Payment Records' },
        'admin.paymentRecordsText': {
            mr: 'कार्यक्रम, सदस्य शुल्क आणि धम्म दान पेमेंट तपशील पहा.',
            en: 'View event, membership fee and Dhamma donation payment details.'
        },
        'admin.viewPayments': { mr: 'पेमेंट पहा', en: 'View Payments' },
        'admin.incomeRecords': { mr: 'उत्पन्न नोंदी', en: 'Income Records' },
        'admin.incomeRecordsText': {
            mr: 'विहारातील सर्व उत्पन्न नोंदी आणि एकूण रक्कम पहा.',
            en: 'View all Vihar income records and total amount.'
        },
        'admin.viewIncome': { mr: 'उत्पन्न पहा', en: 'View Income' },
        'admin.expenseRecords': { mr: 'खर्च नोंदी', en: 'Expense Records' },
        'admin.expenseRecordsText': {
            mr: 'विहारातील सर्व खर्च नोंदी आणि एकूण खर्च पहा.',
            en: 'View all Vihar expense records and total expenses.'
        },
        'admin.viewExpenses': { mr: 'खर्च पहा', en: 'View Expenses' },
        'admin.financeSummary': { mr: 'आर्थिक सारांश', en: 'Financial Summary' },
        'admin.financeSummaryText': {
            mr: 'एकूण उत्पन्न, खर्च आणि शिल्लक रक्कम पहा.',
            en: 'View total income, expenses and balance amount.'
        },
        'admin.viewSummary': { mr: 'सारांश पहा', en: 'View Summary' },
        'admin.memberList': { mr: 'सदस्य यादी', en: 'Member List' },
        'admin.memberListText': {
            mr: 'नोंदणीकृत सदस्यांची यादी पहा आणि Excel डाउनलोड करा.',
            en: 'View registered members and download Excel.'
        },
        'admin.viewMembers': { mr: 'सदस्य पहा', en: 'View Members' },
        'admin.events': { mr: 'कार्यक्रम', en: 'Events' },
        'admin.eventsText': {
            mr: 'कार्यक्रम तयार करा आणि उपलब्ध कार्यक्रम व्यवस्थापित करा.',
            en: 'Create events and manage available events.'
        },
        'admin.viewEvents': { mr: 'कार्यक्रम पहा', en: 'View Events' },
        'admin.recentPayments': { mr: 'Recent Payments', en: 'Recent Payments' },
        'admin.noPayments': { mr: 'कोणतीही पेमेंट नोंद नाही.', en: 'No payment records found.' },
        'admin.recentEvents': { mr: 'Recent Events', en: 'Recent Events' },
        'admin.noEvents': { mr: 'कोणताही कार्यक्रम नाही.', en: 'No events found.' },
        'admin.paid': { mr: 'सशुल्क', en: 'Paid' },
        'admin.free': { mr: 'विनामूल्य', en: 'Free' },
        /* ===== CREATE EVENT ===== */

        'createEvent.bannerTag': {
            mr: 'कार्यक्रम व्यवस्थापन',
            en: 'Event Management'
        },

        'createEvent.updateTitle': {
            mr: 'कार्यक्रम अपडेट करा',
            en: 'Update Event'
        },

        'createEvent.createTitle': {
            mr: 'नवीन कार्यक्रम तयार करा',
            en: 'Create New Event'
        },

        'createEvent.updateSubtitle': {
            mr: 'कार्यक्रमाची माहिती बदलून अपडेट करा.',
            en: 'Update the event information.'
        },

        'createEvent.createSubtitle': {
            mr: 'नवीन कार्यक्रमाची माहिती, फोटो आणि इतर तपशील येथे भरा.',
            en: 'Enter event information, photos and other details here.'
        },

        'createEvent.eventName': {
            mr: 'कार्यक्रमाचे नाव',
            en: 'Event Name'
        },

        'createEvent.shortDescription': {
            mr: 'लघु वर्णन',
            en: 'Short Description'
        },

        'createEvent.fullDescription': {
            mr: 'सविस्तर वर्णन',
            en: 'Detailed Description'
        },

        'createEvent.date': {
            mr: 'तारीख',
            en: 'Date'
        },

        'createEvent.time': {
            mr: 'वेळ',
            en: 'Time'
        },

        'createEvent.location': {
            mr: 'स्थळ',
            en: 'Location'
        },

        'createEvent.organizer': {
            mr: 'आयोजक',
            en: 'Organizer'
        },

        'createEvent.mainSpeaker': {
            mr: 'मुख्य वक्ते',
            en: 'Main Speaker'
        },

        'createEvent.contactPerson': {
            mr: 'संपर्क व्यक्ती',
            en: 'Contact Person'
        },

        'createEvent.contactMobile': {
            mr: 'संपर्क मोबाईल',
            en: 'Contact Mobile'
        },

        'createEvent.rules': {
            mr: 'सूचना / नियम',
            en: 'Instructions / Rules'
        },

        'createEvent.changeMainPhoto': {
            mr: 'मुख्य फोटो बदला',
            en: 'Change Main Photo'
        },

        'createEvent.uploadMainPhoto': {
            mr: 'मुख्य फोटो अपलोड करा',
            en: 'Upload Main Photo'
        },

        'createEvent.uploadOtherPhotos': {
            mr: 'इतर फोटो अपलोड करा',
            en: 'Upload Other Photos'
        },

        'createEvent.fee': {
            mr: 'शुल्क',
            en: 'Fee'
        },

        'createEvent.paidEvent': {
            mr: 'सशुल्क कार्यक्रम',
            en: 'Paid Event'
        },

        'createEvent.status': {
            mr: 'स्थिती',
            en: 'Status'
        },

        'createEvent.saving': {
            mr: 'जतन होत आहे...',
            en: 'Saving...'
        },

        'createEvent.updateButton': {
            mr: 'कार्यक्रम अपडेट करा',
            en: 'Update Event'
        },

        'createEvent.saveButton': {
            mr: 'कार्यक्रम जतन करा',
            en: 'Save Event'
        },

        'createEvent.cancel': {
            mr: 'रद्द करा',
            en: 'Cancel'
        },
        /* ===== MEMBER LIST PAGE ===== */

        'memberList.bannerTag': {
            mr: 'सदस्य माहिती',
            en: 'Member Information'
        },

        'memberList.title': {
            mr: 'नोंदणीकृत सदस्य',
            en: 'Registered Members'
        },

        'memberList.subtitle': {
            mr: 'विहाराशी जोडलेल्या सर्व सदस्यांची यादी येथे पाहू शकता.',
            en: 'You can view the list of all members connected with the Vihar here.'
        },

        'memberList.totalMembers': {
            mr: 'एकूण सदस्य',
            en: 'Total Members'
        },

        'memberList.totalMembersText': {
            mr: 'नोंदणीकृत सदस्यांची संख्या',
            en: 'Number of registered members'
        },

        'memberList.downloadExcel': {
            mr: 'सदस्य Excel डाउनलोड',
            en: 'Download Members Excel'
        },

        'memberList.loading': {
            mr: 'सदस्यांची माहिती लोड होत आहे...',
            en: 'Loading member information...'
        },

        'memberList.empty': {
            mr: 'कोणताही सदस्य उपलब्ध नाही.',
            en: 'No members available.'
        },

        'memberList.srNo': {
            mr: 'क्रमांक',
            en: 'Sr. No.'
        },

        'memberList.fullName': {
            mr: 'पूर्ण नाव',
            en: 'Full Name'
        },

        'memberList.mobile': {
            mr: 'मोबाईल क्रमांक',
            en: 'Mobile Number'
        },

        'memberList.address': {
            mr: 'पत्ता',
            en: 'Address'
        },

        'memberList.paymentStatus': {
            mr: 'पेमेंट स्थिती',
            en: 'Payment Status'
        },

        'memberList.paymentMode': {
            mr: 'पेमेंट मोड',
            en: 'Payment Mode'
        },
        /* ===== PAYMENT LIST PAGE ===== */

        'paymentList.bannerTag': {
            mr: 'Admin Panel',
            en: 'Admin Panel'
        },

        'paymentList.title': {
            mr: 'पेमेंट नोंदी',
            en: 'Payment Records'
        },

        'paymentList.subtitle': {
            mr: 'कार्यक्रम, सदस्य शुल्क आणि धम्म दान पेमेंट तपशील येथे पहा.',
            en: 'View event, membership fee and Dhamma donation payment details here.'
        },

        'paymentList.addTitle': {
            mr: 'नवीन पेमेंट नोंद जोडा',
            en: 'Add New Payment Record'
        },

        'paymentList.addSubtitle': {
            mr: 'Admin कडून Cash / UPI / GPay पेमेंट manually add करा.',
            en: 'Manually add Cash / UPI / GPay payments from admin.'
        },

        'paymentList.name': {
            mr: 'नाव',
            en: 'Name'
        },

        'paymentList.mobile': {
            mr: 'मोबाईल नंबर',
            en: 'Mobile Number'
        },

        'paymentList.paymentType': {
            mr: 'पेमेंट प्रकार',
            en: 'Payment Type'
        },

        'paymentList.donation': {
            mr: 'धम्म दान',
            en: 'Dhamma Donation'
        },

        'paymentList.event': {
            mr: 'कार्यक्रम',
            en: 'Event'
        },

        'paymentList.membership': {
            mr: 'सदस्य शुल्क',
            en: 'Membership Fee'
        },

        'paymentList.amount': {
            mr: 'रक्कम',
            en: 'Amount'
        },

        'paymentList.paymentMode': {
            mr: 'पेमेंट मोड',
            en: 'Payment Mode'
        },

        'paymentList.saving': {
            mr: 'जतन होत आहे...',
            en: 'Saving...'
        },

        'paymentList.addPayment': {
            mr: 'पेमेंट नोंद जोडा',
            en: 'Add Payment Record'
        },

        'paymentList.allPayments': {
            mr: 'सर्व पेमेंट यादी',
            en: 'All Payment List'
        },

        'paymentList.totalPrefix': {
            mr: 'एकूण',
            en: 'Total'
        },

        'paymentList.totalSuffix': {
            mr: 'पेमेंट नोंदी',
            en: 'payment records'
        },

        'paymentList.totalAmount': {
            mr: 'एकूण रक्कम',
            en: 'Total Amount'
        },

        'paymentList.loading': {
            mr: 'पेमेंट नोंदी लोड होत आहेत...',
            en: 'Loading payment records...'
        },

        'paymentList.empty': {
            mr: 'कोणतीही पेमेंट नोंद उपलब्ध नाही.',
            en: 'No payment records available.'
        },

        'paymentList.type': {
            mr: 'प्रकार',
            en: 'Type'
        },

        'paymentList.backDashboard': {
            mr: 'Dashboard ला परत जा',
            en: 'Back to Dashboard'
        },
        /* ===== INCOME LIST PAGE ===== */

        'incomeList.bannerTag': {
            mr: 'Admin Panel',
            en: 'Admin Panel'
        },

        'incomeList.title': {
            mr: 'उत्पन्न नोंदी',
            en: 'Income Records'
        },

        'incomeList.subtitle': {
            mr: 'विहारातील सर्व उत्पन्न नोंदी आणि एकूण रक्कम येथे पहा.',
            en: 'View all income records and total income of the Vihar here.'
        },

        'incomeList.allIncome': {
            mr: 'सर्व उत्पन्न यादी',
            en: 'All Income List'
        },

        'incomeList.totalPrefix': {
            mr: 'एकूण',
            en: 'Total'
        },

        'incomeList.totalSuffix': {
            mr: 'उत्पन्न नोंदी',
            en: 'income records'
        },

        'incomeList.totalIncome': {
            mr: 'एकूण उत्पन्न',
            en: 'Total Income'
        },

        'incomeList.loading': {
            mr: 'उत्पन्न नोंदी लोड होत आहेत...',
            en: 'Loading income records...'
        },

        'incomeList.empty': {
            mr: 'कोणतीही उत्पन्न नोंद उपलब्ध नाही.',
            en: 'No income records available.'
        },

        'incomeList.heading': {
            mr: 'शीर्षक',
            en: 'Title'
        },

        'incomeList.type': {
            mr: 'प्रकार',
            en: 'Type'
        },

        'incomeList.amount': {
            mr: 'रक्कम',
            en: 'Amount'
        },

        'incomeList.date': {
            mr: 'तारीख',
            en: 'Date'
        },

        'incomeList.note': {
            mr: 'नोंद',
            en: 'Remark'
        },

        'incomeList.backDashboard': {
            mr: 'Dashboard ला परत जा',
            en: 'Back to Dashboard'
        },

        'incomeList.addIncome': {
            mr: 'उत्पन्न जोडा',
            en: 'Add Income'
        },
        /* ===== EXPENSE LIST ===== */

'expenseList.bannerTag': {
  mr: 'Admin Panel',
  en: 'Admin Panel'
},

'expenseList.title': {
  mr: 'खर्च नोंदी',
  en: 'Expense Records'
},

'expenseList.subtitle': {
  mr: 'विहारातील सर्व खर्च नोंदी आणि एकूण खर्च येथे पहा.',
  en: 'View all expense records and total expenses here.'
},

'expenseList.allExpenses': {
  mr: 'सर्व खर्च यादी',
  en: 'All Expense List'
},

'expenseList.totalPrefix': {
  mr: 'एकूण',
  en: 'Total'
},

'expenseList.totalSuffix': {
  mr: 'खर्च नोंदी',
  en: 'expense records'
},

'expenseList.totalExpense': {
  mr: 'एकूण खर्च',
  en: 'Total Expense'
},

'expenseList.loading': {
  mr: 'खर्च नोंदी लोड होत आहेत...',
  en: 'Loading expense records...'
},

'expenseList.empty': {
  mr: 'कोणतीही खर्च नोंद उपलब्ध नाही.',
  en: 'No expense records available.'
},

'expenseList.heading': {
  mr: 'शीर्षक',
  en: 'Title'
},

'expenseList.type': {
  mr: 'प्रकार',
  en: 'Type'
},

'expenseList.amount': {
  mr: 'रक्कम',
  en: 'Amount'
},

'expenseList.date': {
  mr: 'तारीख',
  en: 'Date'
},

'expenseList.note': {
  mr: 'नोंद',
  en: 'Remark'
},

'expenseList.backDashboard': {
  mr: 'Dashboard ला परत जा',
  en: 'Back to Dashboard'
},

'expenseList.addExpense': {
  mr: 'खर्च जोडा',
  en: 'Add Expense'
},
/* ===== FINANCE SUMMARY ===== */

'finance.bannerTag': {
  mr: 'Admin Dashboard',
  en: 'Admin Dashboard'
},

'finance.title': {
  mr: 'आर्थिक सारांश',
  en: 'Finance Summary'
},

'finance.subtitle': {
  mr: 'विहाराचे एकूण उत्पन्न, एकूण खर्च आणि उर्वरित शिल्लक येथे पाहा.',
  en: 'View total income, total expenses and remaining balance here.'
},

'finance.loading': {
  mr: 'आर्थिक माहिती लोड होत आहे...',
  en: 'Loading finance information...'
},

'finance.incomeCard': {
  mr: 'उत्पन्न',
  en: 'Income'
},

'finance.expenseCard': {
  mr: 'खर्च',
  en: 'Expense'
},

'finance.balanceCard': {
  mr: 'शिल्लक',
  en: 'Balance'
},

'finance.totalIncome': {
  mr: 'एकूण उत्पन्न',
  en: 'Total Income'
},

'finance.totalExpense': {
  mr: 'एकूण खर्च',
  en: 'Total Expense'
},

'finance.balance': {
  mr: 'शिल्लक',
  en: 'Balance'
},

'finance.incomeNote': {
  mr: 'नोंदवलेले सर्व उत्पन्न',
  en: 'All recorded income'
},

'finance.expenseNote': {
  mr: 'नोंदवलेले सर्व खर्च',
  en: 'All recorded expenses'
},

'finance.balanceNote': {
  mr: 'उत्पन्न - खर्च',
  en: 'Income - Expense'
},

'finance.downloadTitle': {
  mr: 'Excel डाउनलोड',
  en: 'Excel Download'
},

'finance.downloadSubtitle': {
  mr: 'एकाच sheet मध्ये आर्थिक सारांश, income list आणि expense list डाउनलोड करा.',
  en: 'Download finance summary, income list and expense list in one sheet.'
},

'finance.downloadBtn': {
  mr: 'पूर्ण आर्थिक अहवाल डाउनलोड',
  en: 'Download Full Finance Report'
},
/* ===== CREATE INCOME ===== */

'createIncome.bannerTag': {
  mr: 'Admin Entry',
  en: 'Admin Entry'
},

'createIncome.title': {
  mr: 'नवीन उत्पन्न नोंद',
  en: 'New Income Entry'
},

'createIncome.subtitle': {
  mr: 'विहारातील नवीन उत्पन्न नोंद अचूक तपशीलांसह येथे जतन करा.',
  en: 'Save new income records with accurate details here.'
},

'createIncome.incomeType': {
  mr: 'उत्पन्न प्रकार',
  en: 'Income Type'
},

'createIncome.marriage': {
  mr: 'लग्न समारंभ',
  en: 'Marriage Ceremony'
},

'createIncome.smruti': {
  mr: 'स्मृतीदिन',
  en: 'Memorial Day'
},

'createIncome.birthday': {
  mr: 'वाढदिवस',
  en: 'Birthday'
},

'createIncome.naming': {
  mr: 'बारसे / नामकरण',
  en: 'Naming Ceremony'
},

'createIncome.meeting': {
  mr: 'सभा / मिटिंग',
  en: 'Meeting'
},

'createIncome.hallRent': {
  mr: 'हॉल भाडे',
  en: 'Hall Rent'
},

'createIncome.donation': {
  mr: 'देणगी',
  en: 'Donation'
},

'createIncome.other': {
  mr: 'इतर',
  en: 'Other'
},

'createIncome.name': {
  mr: 'नाव',
  en: 'Name'
},

'createIncome.mobile': {
  mr: 'मोबाईल नंबर',
  en: 'Mobile Number'
},

'createIncome.description': {
  mr: 'वर्णन',
  en: 'Description'
},

'createIncome.amount': {
  mr: 'रक्कम',
  en: 'Amount'
},

'createIncome.date': {
  mr: 'दिनांक',
  en: 'Date'
},

'createIncome.paymentMode': {
  mr: 'पेमेंट मोड',
  en: 'Payment Mode'
},

'createIncome.remarks': {
  mr: 'Remarks',
  en: 'Remarks'
},

'createIncome.saving': {
  mr: 'जतन होत आहे...',
  en: 'Saving...'
},

'createIncome.saveBtn': {
  mr: 'उत्पन्न नोंद जतन करा',
  en: 'Save Income Record'
},

'createIncome.infoTitle': {
  mr: 'नोंद करताना लक्षात ठेवा',
  en: 'Things to Remember'
},

'createIncome.info1': {
  mr: 'उत्पन्न प्रकार योग्य निवडा.',
  en: 'Select the correct income type.'
},

'createIncome.info2': {
  mr: 'रक्कम आणि दिनांक अचूक भरा.',
  en: 'Enter accurate amount and date.'
},

'createIncome.info3': {
  mr: 'पेमेंट मोड नोंदवल्यास नंतरचा हिशोब सोपा होतो.',
  en: 'Recording payment mode helps future accounting.'
},

'createIncome.info4': {
  mr: 'Remarks मध्ये अतिरिक्त माहिती टाकू शकता.',
  en: 'You can add extra details in remarks.'
},

'createIncome.exampleTitle': {
  mr: 'उदाहरणे:',
  en: 'Examples:'
},

'createIncome.exampleText': {
  mr: 'लग्न समारंभ, स्मृतीदिन, वाढदिवस, हॉल भाडे, देणगी इ.',
  en: 'Marriage ceremony, memorial day, birthday, hall rent, donation etc.'
},
/* ===== CREATE EXPENSE ===== */

'createExpense.bannerTag': {
  mr: 'Admin Entry',
  en: 'Admin Entry'
},

'createExpense.title': {
  mr: 'नवीन खर्च नोंद',
  en: 'New Expense Entry'
},

'createExpense.subtitle': {
  mr: 'विहारातील नवीन खर्च नोंद अचूक तपशीलांसह येथे जतन करा.',
  en: 'Save new expense records with accurate details here.'
},

'createExpense.expenseType': {
  mr: 'खर्च प्रकार',
  en: 'Expense Type'
},

'createExpense.electricity': {
  mr: 'वीज बिल',
  en: 'Electricity Bill'
},

'createExpense.waterBill': {
  mr: 'पाणी बिल',
  en: 'Water Bill'
},

'createExpense.cleaning': {
  mr: 'स्वच्छता',
  en: 'Cleaning'
},

'createExpense.decoration': {
  mr: 'सजावट',
  en: 'Decoration'
},

'createExpense.food': {
  mr: 'भोजन',
  en: 'Food'
},

'createExpense.maintenance': {
  mr: 'देखभाल',
  en: 'Maintenance'
},

'createExpense.salary': {
  mr: 'पगार',
  en: 'Salary'
},

'createExpense.programExpense': {
  mr: 'कार्यक्रम खर्च',
  en: 'Program Expense'
},

'createExpense.repair': {
  mr: 'दुरुस्ती',
  en: 'Repair'
},

'createExpense.other': {
  mr: 'इतर',
  en: 'Other'
},

'createExpense.name': {
  mr: 'नाव',
  en: 'Name'
},

'createExpense.mobile': {
  mr: 'मोबाईल नंबर',
  en: 'Mobile Number'
},

'createExpense.description': {
  mr: 'वर्णन',
  en: 'Description'
},

'createExpense.amount': {
  mr: 'रक्कम',
  en: 'Amount'
},

'createExpense.date': {
  mr: 'दिनांक',
  en: 'Date'
},

'createExpense.paymentMode': {
  mr: 'पेमेंट मोड',
  en: 'Payment Mode'
},

'createExpense.remarks': {
  mr: 'Remarks',
  en: 'Remarks'
},

'createExpense.saving': {
  mr: 'जतन होत आहे...',
  en: 'Saving...'
},

'createExpense.saveBtn': {
  mr: 'खर्च नोंद जतन करा',
  en: 'Save Expense Record'
},

'createExpense.infoTitle': {
  mr: 'नोंद करताना लक्षात ठेवा',
  en: 'Things to Remember'
},

'createExpense.info1': {
  mr: 'खर्च प्रकार योग्य निवडा.',
  en: 'Select the correct expense type.'
},

'createExpense.info2': {
  mr: 'रक्कम आणि दिनांक अचूक भरा.',
  en: 'Enter accurate amount and date.'
},

'createExpense.info3': {
  mr: 'पेमेंट मोड नोंदवल्यास पुढील आर्थिक हिशोब सोपा होतो.',
  en: 'Recording payment mode helps future accounting.'
},

'createExpense.info4': {
  mr: 'Remarks मध्ये अतिरिक्त माहिती टाकू शकता.',
  en: 'You can add extra details in remarks.'
},

'createExpense.exampleTitle': {
  mr: 'उदाहरणे:',
  en: 'Examples:'
},

'createExpense.exampleText': {
  mr: 'वीज बिल, पाणी बिल, स्वच्छता, कार्यक्रम खर्च, दुरुस्ती, सजावट इ.',
  en: 'Electricity bill, water bill, cleaning, program expense, repair, decoration etc.'
},
/* ===== POSTER PREVIEW ===== */

'poster.tag': {
  mr: 'कार्यक्रम पोस्टर',
  en: 'Event Poster'
},

'poster.title': {
  mr: 'WhatsApp Poster Preview',
  en: 'WhatsApp Poster Preview'
},

'poster.subtitle': {
  mr: 'हा poster download करून WhatsApp group मध्ये share करा.',
  en: 'Download this poster and share it in the WhatsApp group.'
},

'poster.backBtn': {
  mr: 'कार्यक्रम यादी',
  en: 'Events List'
},

'poster.loading': {
  mr: 'Poster तयार होत आहे...',
  en: 'Generating poster...'
},

'poster.howToTitle': {
  mr: 'WhatsApp वर कसे पाठवायचे?',
  en: 'How to Share on WhatsApp?'
},

'poster.step1': {
  mr: 'सर्वप्रथम Download Poster वर क्लिक करा.',
  en: 'First click on Download Poster.'
},

'poster.step2': {
  mr: 'नंतर WhatsApp Open करा वर क्लिक करा.',
  en: 'Then click on Open WhatsApp.'
},

'poster.step3': {
  mr: 'WhatsApp group select करा.',
  en: 'Select the WhatsApp group.'
},

'poster.step4': {
  mr: 'Download केलेला poster attach करा.',
  en: 'Attach the downloaded poster.'
},

'poster.step5': {
  mr: 'Send बटणावर क्लिक करा.',
  en: 'Click on the Send button.'
},

'poster.downloadBtn': {
  mr: 'Download Poster',
  en: 'Download Poster'
},

'poster.whatsappBtn': {
  mr: 'WhatsApp Open करा',
  en: 'Open WhatsApp'
},
/* ===== PAYMENT SUCCESS ===== */

'paymentSuccess.bannerTag': {
  mr: 'पेमेंट पुष्टी',
  en: 'Payment Confirmation'
},

'paymentSuccess.title': {
  mr: 'पेमेंट यशस्वी',
  en: 'Payment Successful'
},

'paymentSuccess.subtitle': {
  mr: 'आपले पेमेंट सुरक्षितरीत्या नोंदवले गेले आहे.',
  en: 'Your payment has been recorded successfully.'
},

'paymentSuccess.successMessage': {
  mr: 'आपले पेमेंट यशस्वीरीत्या नोंदवले गेले आहे',
  en: 'Your payment has been recorded successfully'
},

'paymentSuccess.thankYou': {
  mr: 'धन्यवाद! आपला सहभाग आमच्यासाठी महत्त्वाचा आहे.',
  en: 'Thank you! Your participation is important to us.'
},

'paymentSuccess.name': {
  mr: 'नाव',
  en: 'Name'
},

'paymentSuccess.mobile': {
  mr: 'मोबाईल',
  en: 'Mobile'
},

'paymentSuccess.paymentType': {
  mr: 'पेमेंट प्रकार',
  en: 'Payment Type'
},

'paymentSuccess.amount': {
  mr: 'रक्कम',
  en: 'Amount'
},

'paymentSuccess.paymentMode': {
  mr: 'पेमेंट मोड',
  en: 'Payment Mode'
},

'paymentSuccess.status': {
  mr: 'स्थिती',
  en: 'Status'
},

'paymentSuccess.eventsPage': {
  mr: 'कार्यक्रम पानावर जा',
  en: 'Go to Events Page'
},

'paymentSuccess.home': {
  mr: 'मुख्यपृष्ठ',
  en: 'Home'
},

'paymentSuccess.noDataTitle': {
  mr: 'पेमेंट तपशील उपलब्ध नाहीत',
  en: 'Payment details are not available'
},

'paymentSuccess.noDataText': {
  mr: 'कृपया पेमेंट पानावरून पुन्हा प्रयत्न करा.',
  en: 'Please try again from the payment page.'
},

'paymentSuccess.paymentPage': {
  mr: 'पेमेंट पानावर जा',
  en: 'Go to Payment Page'
}
    };

    translate(key: string): string {
        const lang = this.currentLang();
        return this.translations[key]?.[lang] || key;
    }

    toggleLanguage(): void {
        const nextLang: AppLanguage =
            this.currentLang() === 'mr' ? 'en' : 'mr';

        this.currentLang.set(nextLang);

        if (this.isBrowser) {
            localStorage.setItem('appLanguage', nextLang);
        }
    }
}