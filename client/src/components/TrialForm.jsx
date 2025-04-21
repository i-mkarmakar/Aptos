import React, { useState } from "react";
import { Buffer } from "buffer"; // Importing Buffer for browser support
import { Aptos, AptosConfig, Network, Account } from "@aptos-labs/ts-sdk"; // Removed HexString import

function TrialForm() {
    const [trialId, setTrialId] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        setMessage("");

        // Validate input values before proceeding
        if (!trialId || !description) {
            setMessage("Please fill in both Trial ID and Description.");
            setLoading(false);
            return;
        }

        try {
            // Initialize Aptos client
            const config = new AptosConfig({ network: Network.DEVNET });
            const aptos = new Aptos(config);

            // Use your existing account address (ensure private key is in the correct format)
            const privateKeyHex = "b893c949706f40c17528d95cb4a867969fb8fc39aed740c5823dacfe6068dd5f"; // Ensure this is a valid private key
            console.log("Private key:", privateKeyHex);

            const privateKeyBytes = Uint8Array.from(Buffer.from(privateKeyHex, "hex"));
            console.log("Private key bytes:", privateKeyBytes);

            const account = new Account(privateKeyBytes); // Use the Account constructor
            console.log("Account Address:", account.accountAddress);
            console.log("Account Public Key:", account.publicKey);

            if (!account.publicKey) {
                console.error("Account initialization failed. Public key is undefined.");
                setMessage("Error initializing the account.");
                setLoading(false);
                return;
            }

            // Fund the account using the faucet (only available on Devnet/Testnet)
            await aptos.fundAccount({
                accountAddress: account.accountAddress,
                amount: 100_000_000, // Amount in Octas (1 APT = 10^8 Octas)
            });

            // Build the transaction payload to interact with the deployed `ClinicalTrials` module
            const transaction = await aptos.transaction.build.simple({
                sender: account.accountAddress,
                data: {
                    function: "0xdfe22edf64f3c617091d3378313534c7df8e1e9864251b331bbe91b792ba0518::ClinicalTrials::register_trial",
                    typeArguments: [],
                    functionArguments: [trialId, description],
                },
            });

            // Sign and submit the transaction
            const committedTransaction = await aptos.signAndSubmitTransaction({
                signer: account,
                transaction,
            });

            // Wait for the transaction to be confirmed
            await aptos.waitForTransaction({ transactionHash: committedTransaction.hash });

            setMessage("Clinical Trial Registered Successfully!");
        } catch (error) {
            console.error("Error registering trial:", error);
            setMessage(`Error registering the trial: ${error.message}`);
        }

        setLoading(false);
    };

    return (
        <div>
            <h2>Register a Clinical Trial</h2>
            <input
                type="text"
                placeholder="Trial ID"
                value={trialId}
                onChange={(e) => setTrialId(e.target.value)}
                disabled={loading}
            />
            <br />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
            />
            <br />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default TrialForm;
