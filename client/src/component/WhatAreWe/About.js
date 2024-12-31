
import Paragraph from '../../common/components/Paragraph/Paragraph';

const aboutContent = [
    "Our platform leverages blockchain technology to ensure product authenticity and combat counterfeiting.",
    "We empower businesses to securely store product data on the blockchain, making it immutable and tamper-proof.",
    "Consumers can verify the authenticity of products by scanning QR codes or entering product IDs.",
    "Our mission is to create trust between businesses and consumers by providing a transparent verification system.",
    "Founded with the vision to eliminate fake products, we combine cutting-edge technology with user-friendly solutions."
  ];
  
  const About = () => {
    return (
      <>
        <Paragraph headline="About Us" keys={aboutContent} />
      </>
    );
  };
  
  export default About;
  