// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IUltraVerifier {
    function verify(
        bytes calldata _proof,
        bytes32[] calldata _publicInputs
    ) external view returns (bool);
}

contract ZKHiring {
    IUltraVerifier ultraVerifier;

    constructor(address verifierAddress) {
        ultraVerifier = IUltraVerifier(verifierAddress);
    }

    struct JobApplication {
        address applier;
        bytes proof;
    }
    struct JobDetails {
        address company;
        string title;
        string compensation;
        uint256 openings;
        uint8 assessmentType;
    }

    struct Company {
        string name;
        string established;
        uint employees;
    }

    struct Application {
        string jobId;
        bool accepted;
        bytes proof;
        bytes32[] publicInputs;
    }

    // Mapping of company addresses to company information
    mapping(address => Company) public companies;
    // companies open job postings mapping
    mapping(address => string[]) public companyOpenJobs;

    // company jobs openings(jobId to JobDetails)
    mapping(string => JobDetails) public jobs;

    // Array to store all jobIds for iteration
    string[] public allJobIds;

    // jobs applications for post(jobId to applications)
    mapping(string => JobApplication[]) public applications;

    // employer to applications accespeted
    mapping(address => Application) public applicationAccepted;

    // Event emitted when a job is offered
    event JobOffered(
        address indexed company,
        string indexed jobTitle,
        bytes proof,
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

    // Function to add a job to a company
    function addJob(
        string memory title,
        string memory compensation,
        uint256 openings,
        string memory jobId,
        uint8 assessmentType
    ) public {
        require(
            bytes(companies[msg.sender].name).length != 0,
            "Company not registered"
        );
        require(
            bytes(jobs[jobId].title).length == 0,
            "Job with this ID already exists!"
        );
        JobDetails storage jd = jobs[jobId];
        jd.company = msg.sender;
        jd.title = title;
        jd.compensation = compensation;
        jd.openings = openings;
        jd.assessmentType = assessmentType;
        companyOpenJobs[msg.sender].push(jobId);
        allJobIds.push(jobId);
    }

    // Function for a student to apply for a job with a zero-knowledge proof
    function applyForJob(
        address company,
        string memory jobId,
        bytes calldata _proof,
        bytes32[] calldata _publicInputs
    ) external {
        require(msg.sender != company, "Company cannot apply!");
        require(
            ultraVerifier.verify(_proof, _publicInputs),
            "Proof is not Valid!"
        );
        require(jobs[jobId].openings > 1, "No openings available!");
        JobDetails storage jd = jobs[jobId];
        jd.openings -= 1;
        JobApplication storage ja = applications[jobId].push();
        ja.applier = msg.sender;
        ja.proof = _proof;
        Application storage app = applicationAccepted[msg.sender];
        app.accepted = true;
        app.jobId = jobId;
        app.proof = _proof;
        emit JobOffered(company, jobs[jobId].title, _proof, msg.sender);
    }

    function verifyApplicant(
        address applier,
        string memory jobId
    ) public view returns (bool) {
        require(
            jobs[jobId].company == msg.sender,
            "Only Companies could verify proofs of their aplliers!"
        );
        return
            ultraVerifier.verify(
                applicationAccepted[applier].proof,
                applicationAccepted[applier].publicInputs
            );
    }

    struct allJobsReturn {
        string jobId;
        JobDetails jd;
    }

    // Function to loop through all JobDetails objs
    function getAllJobDetails() external view returns (allJobsReturn[] memory) {
        uint256 totalJobs = allJobIds.length;
        allJobsReturn[] memory allJobDetails = new allJobsReturn[](totalJobs);

        // Retrieve job details
        for (uint256 i = 0; i < totalJobs; i++) {
            string memory jobId = allJobIds[i];
            allJobDetails[i].jd = jobs[jobId];
            allJobDetails[i].jobId = jobId;
        }

        return allJobDetails;
    }

    // Function to loop through all Companny open jobs
    function getAllCompanyJobs(
        address companyAddress
    ) external view returns (JobDetails[] memory) {
        uint256 totalJobs = companyOpenJobs[companyAddress].length;
        JobDetails[] memory allCompanyJob = new JobDetails[](totalJobs);

        // Retrieve job details
        for (uint256 i = 0; i < totalJobs; i++) {
            string memory jobId = companyOpenJobs[msg.sender][i];
            allCompanyJob[i] = jobs[jobId];
        }

        return allCompanyJob;
    }
}
