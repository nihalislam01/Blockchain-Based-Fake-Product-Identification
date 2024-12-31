
import Paragraph from "../../common/components/Paragraph/Paragraph";

const termsContent = [
    "By using our platform, you agree to comply with all applicable laws and regulations.",
    "Businesses are responsible for ensuring the accuracy of the data they upload. Blockchain records are immutable and cannot be changed once stored.",
    "Users must not misuse the platform or attempt to gain unauthorized access to any part of the system.",
    "We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activities.",
    "All intellectual property rights related to the platform remain the exclusive property of our company."
  ];
  
  const Term = () => {
    return (
      <>

        <Paragraph headline="Terms and Conditions" keys={termsContent} />
      </>
    );
  };
  
  export default Term;
