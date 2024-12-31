
import Paragraph from '../../common/components/Paragraph/Paragraph';

const privacyContent = [
    "We collect only the necessary information to provide our services effectively, such as email addresses for account creation.",
    "All product-related data is hashed and stored securely on the blockchain, ensuring it is tamper-proof and private.",
    "We do not share user data with third parties except as required by law.",
    "Cookies may be used to enhance the user experience, such as tracking verification limits for non-logged-in users.",
    "You have the right to access, update, or delete your personal data stored on our platform."
  ];
  
  const Privacy = () => {
    return (
      <>

        <Paragraph headline="Privacy Policy" keys={privacyContent} />
      </>
    );
  };
  
  export default Privacy;
  