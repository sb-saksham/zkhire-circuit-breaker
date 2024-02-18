// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract ZKHiring {
    struct JobApplication {
        address applier;
        bytes32 proof;
    }
    struct JobDetails {
        string title;
        uint256 compensation;
        uint256 openings;
    }

    struct Company {
        string name;
        string established;
        uint employees;
    }

    struct Application {
        string jobId;
        bool accepted;
        bytes32[] proof;
    }

    // Mapping of company addresses to company information
    mapping(address => Company) public companies;

    // company jobs openings(jobId to JobDetails)
    mapping(string => JobDetails) public jobs;

    // jobs applications for post(jobId to applications)
    mapping(string => JobApplication) public applications;

    mapping(address => Application) public applicationAccepted;
    // Event emitted when a job is offered
    event JobOffered(
        address indexed company,
        string indexed jobTitle,
        bytes32[] proof,
        address indexed applier
    );

    function addCompany(
        string memory name,
        string memory established,
        uint256 employees
    ) public {
        require(
            bytes(companies[msg.sender].name).length == 0,
            "Company with this address already exists!"
        );
        require(
            bytes(established).length != 0,
            "Established details are required!"
        );
        require(bytes(name).length != 0, "Name is required!");
        require(employees > 0, "Please provide number of employees!");
        Company storage cmp = companies[msg.sender];
        cmp.name = name;
        cmp.established = established;
        cmp.employees = employees;
    }

    // Function to add a job to a company with a Merkle root
    function addJob(
        address company,
        string memory title,
        uint256 compensation,
        uint256 openings,
        string memory jobId
    ) public {
        require(msg.sender == company, "Only the company can add jobs.");
        require(
            bytes(companies[company].name).length != 0,
            "Company not registered"
        );
        require(
            bytes(jobs[jobId].title).length == 0,
            "Job with this ID already exists!"
        );
        JobDetails storage jd = jobs[jobId];
        jd.title = title;
        jd.compensation = compensation;
        jd.openings = openings;
    }

    // Function for a student to apply for a job with a zero-knowledge proof
    function applyForJob(
        address company,
        string memory jobTitle,
        bytes32[] calldata proof
    ) external {
        emit JobOffered(company, jobTitle, proof, msg.sender);
    }
}
