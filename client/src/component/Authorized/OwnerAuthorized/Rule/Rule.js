import CommonHelmet from "../../../../common/components/Head/CommonHelmet";
import Paragraph from "../../../../common/components/Paragraph/Paragraph";

const rules = [
    "When uploading a CSV file, the file must contain the following headers: productId, name, price, description. Additional columns are allowed, but these headers are mandatory.",
    "QR codes generated must have text values formatted as: '<CompanyName>,<ProductId>'. This ensures uniformity and easy verification.",
    "Ensure all product details are accurate before uploading. Once data is hashed and stored on the blockchain, it cannot be altered.",
    "Verify the CSV data before uploading to ensure no invalid product IDs are included.",
    "Ensure all uploaded product information complies with local laws and company regulations to avoid legal issues.",
    "Periodically review and audit the blockchain data to ensure the integrity of the product information.",
    "Test the QR code scanning functionality regularly to ensure compatibility with supported devices and browsers."
  ];
const Rule = () => {
    return (
        <>
        <CommonHelmet title="Hexis - Rule Book" />
        <Paragraph headline="Rule Book" keys={rules} />
        </>
    )
}

export default Rule;