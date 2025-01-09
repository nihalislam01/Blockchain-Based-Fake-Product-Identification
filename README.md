# Hexis - Blockchain Based Fake Product Identification

**Introduction**
---
Hexis is a decentralized web application that verifies product authenticity using the Ethereum Blockchain Network. The blockchain securely stores a product's hash, concatenated with company details, ensuring immutability and transparency. By employing blockchain's distributed ledger, Hexis eliminates the risk of fraud and counterfeit products. Users can easily validate product information through a user-friendly interface, which offers quick access to product hashes and related data. This decentralized approach empowers consumers and businesses with a reliable solution for ensuring the integrity of products across the supply chain.

**Video Walkthrough**
---
[![Video walkthrough](https://github.com/user-attachments/assets/5234df07-9621-49c9-8e44-ec477874ed55)](https://youtu.be/bpo6FgcF1R0)

**Functional Requirements**
---
**Product Authenticity**
- Users will be able to validate product authenticity scanning QR code or providing product ID
- Business users will be able to upload their own products to the blockchain network by providing CSV files
- Solidity Smart Contract uploads product Hash to the Ethereum Blockchain Netowrk

**User Management**
- Users will be able to sign up using Google OAuth for secured authentication
- Hexis implements Role Based Access Control for user authorization
- Business users have to subscribe to a payment plan in order to upload their own company products

**Admin Dashboard**
- Admin users will be manually verify business users after they apply for a business account
- Admin users will be able to create and manage subscription plans for the business users

**Data Driven Insights**
- Business users will have a data analytic dashbaord for product validation usage
- Users will be able to check their product verification data history
