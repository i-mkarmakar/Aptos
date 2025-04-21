# 🧬 Blockchain-based Clinical Trials Registry

## 📌 Project Description
This project is a lightweight Move smart contract built on the Aptos blockchain that provides a secure and transparent registry system for clinical trials. It allows authorized users to register clinical trials and update their statuses (e.g., Registered, Ongoing, Completed, Terminated), ensuring data integrity and public traceability.

## 🎯 Project Vision
The goal is to create a decentralized, tamper-proof ledger for healthcare clinical trial records, enabling trust and transparency between researchers, healthcare professionals, regulators, and the public. With blockchain as the backbone, each trial record is verifiable and immutable.

## 🔭 Future Scope
- Enable public querying of trial statuses and details.
- Add role-based access (e.g., regulator, researcher).
- Store additional metadata (e.g., trial location, participants, dates).
- Implement multi-user trial support.
- Integrate with off-chain systems or web portals for real-world access.

## 📄 Contract Details
- **Module Name:** `MyModule::ClinicalTrials`
- **Main Functions:**
  - `register_trial`: Register a new clinical trial with a description and initial status.
  - `update_status`: Update the trial status using predefined numeric codes (0-3).
- **Trial Status Values:**
  - 0 → Registered  
  - 1 → Ongoing  
  - 2 → Completed  
  - 3 → Terminated

### 📬 Contract Address
> `0x8508ac155138e7b1ad64b639dbb9803c437686ccc78eddd6e2a90392c4a44f9d`  


---

