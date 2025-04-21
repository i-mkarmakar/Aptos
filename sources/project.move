module MyModule::ClinicalTrials {

    use aptos_framework::signer;

    /// Enum representing the trial status
    enum TrialStatus has store, drop {
        Registered,
        Ongoing,
        Completed,
        Terminated,
    }

    /// Struct representing a clinical trial
    struct Trial has key, store {
        id: u64,
        description: vector<u8>,
        status: TrialStatus,
    }

    /// Register a new clinical trial
    public fun register_trial(owner: &signer, id: u64, description: vector<u8>) {
        let trial = Trial {
            id,
            description,
            status: TrialStatus::Registered,
        };
        move_to(owner, trial);
    }

    /// Update the status of the trial using a numeric code
    public fun update_status(owner: &signer, new_status: u8) acquires Trial {
        let trial = borrow_global_mut<Trial>(signer::address_of(owner));
        if (new_status == 0) {
            trial.status = TrialStatus::Registered;
        } else if (new_status == 1) {
            trial.status = TrialStatus::Ongoing;
        } else if (new_status == 2) {
            trial.status = TrialStatus::Completed;
        } else if (new_status == 3) {
            trial.status = TrialStatus::Terminated;
        } else {
            assert!(false, 100); // Invalid status code
        }
    }
}
